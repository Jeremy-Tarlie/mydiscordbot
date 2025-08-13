import { NextResponse } from "next/server";

interface DiscordCommand {
  name: string;
  description: string;
}

interface BotInfo {
  id: string;
  name: string;
  tags: string[];
  link: string;
  description: string;
  image: string;
  commands: DiscordCommand[];
}

// Cache pour les données des bots
const botCache = new Map<string, { data: BotInfo; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Fonction pour récupérer dynamiquement les bots depuis les variables d'environnement
function getBotsFromEnv() {
  const bots = [];
  let index = 1;

  while (process.env[`BOT${index}_TOKEN`] && process.env[`BOT${index}_CLIENT_ID`]) {
    bots.push({
      token: process.env[`BOT${index}_TOKEN`],
      clientId: process.env[`BOT${index}_CLIENT_ID`],
    });
    index++;
  }

  return bots;
}

// Configuration des bots
const bots = getBotsFromEnv();

function getBotToken(id: string) {
  const bot = bots.find((bot) => bot.clientId === id);
  if (!bot) {
    throw new Error("Bot non trouvé");
  }
  return bot.token;
}

async function fetchBotInfo(botToken: string, botId: string): Promise<BotInfo | null> {
  const cacheKey = `bot-${botId}`;
  const cached = botCache.get(cacheKey);
  
  // Vérifier le cache
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  try {
    // Créer un AbortController pour gérer les timeouts
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 secondes timeout

    // 1. Récupère l'utilisateur du bot
    const userResponse = await fetch("https://discord.com/api/v10/users/@me", {
      headers: {
        Authorization: `Bot ${botToken}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!userResponse.ok) {
      throw new Error(`Failed to fetch bot user info: ${userResponse.status}`);
    }

    const userData = await userResponse.json();

    // 2. Récupère les infos de l'application et les commandes en parallèle
    const [appResponse, commandsResponse] = await Promise.all([
      fetch(`https://discord.com/api/v10/applications/${userData.id}`, {
        headers: {
          Authorization: `Bot ${botToken}`,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      }),
      fetch(`https://discord.com/api/v10/applications/${userData.id}/commands`, {
        headers: {
          Authorization: `Bot ${botToken}`,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      }),
    ]);

    const [appData, commands] = await Promise.all([
      appResponse.json(),
      commandsResponse.json(),
    ]);

    const link = appData.description?.includes("https://discord.gg/")
      ? ""
      : `https://discord.com/oauth2/authorize?client_id=${userData.id}&permissions=8&scope=bot`;

    const description = appData.description
      ?.replace(/https:\/\/discord\.com\/oauth2\/authorize\S*$/, "")
      .trim() || "Description non disponible";

    const botInfo: BotInfo = {
      id: userData.id,
      name: userData.username,
      tags: appData.tags || [],
      link: link,
      description: description,
      image: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`,
      commands: Array.isArray(commands) ? commands.map((cmd: DiscordCommand) => ({
        name: cmd.name,
        description: cmd.description,
      })) : [],
    };

    // Mettre en cache
    botCache.set(cacheKey, { data: botInfo, timestamp: Date.now() });

    return botInfo;
  } catch (error) {
    console.error("Erreur lors de la récupération des infos du bot:", error);
    
    // Retourner des données de fallback si possible
    if (error instanceof Error && error.name === 'AbortError') {
      console.error("Timeout lors de la récupération des infos du bot");
    }
    
    return null;
  }
}

// Gestionnaire de la route GET optimisé
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");
    const start = (page - 1) * limit;
    const end = start + limit;

    // Récupérer les informations de tous les bots en parallèle
    const botPromises = bots.map(async (botConfig) => {
      if (botConfig.token && botConfig.clientId) {
        return fetchBotInfo(botConfig.token, botConfig.clientId);
      }
      return null;
    });

    const botsResults = await Promise.allSettled(botPromises);
    const botsInfo = botsResults
      .filter((result): result is PromiseFulfilledResult<BotInfo | null> => 
        result.status === 'fulfilled' && result.value !== null
      )
      .map(result => result.value)
      .filter((bot): bot is BotInfo => bot !== null);

    const allBots = [...botsInfo];
    const paginatedBots = allBots.slice(start, end);

    return NextResponse.json({
      bots: paginatedBots,
      total: allBots.length,
      currentPage: page,
      totalPages: Math.ceil(allBots.length / limit),
      botsPerPage: limit,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations des bots:",
      error
    );
    return NextResponse.json(
      { error: "Erreur lors de la récupération des informations des bots" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    const botInfo = await fetchBotInfo(getBotToken(id) || "", id);
    
    if (!botInfo) {
      return NextResponse.json(
        { error: "Bot non trouvé ou erreur lors de la récupération" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(botInfo);
  } catch (error) {
    console.error("Erreur lors de la récupération du bot:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du bot" },
      { status: 500 }
    );
  }
}
