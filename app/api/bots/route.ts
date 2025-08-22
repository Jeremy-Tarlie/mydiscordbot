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
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes (augmenté pour réduire les requêtes)
const STALE_TTL = 2 * 60 * 1000; // 2 minutes pour les données "stale"

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

// Préchargement des données au démarrage
let isPreloading = false;
let preloadPromise: Promise<void> | null = null;

async function preloadBotData() {
  if (isPreloading || preloadPromise) {
    return preloadPromise;
  }

  isPreloading = true;
  preloadPromise = (async () => {
    console.log('🔄 Préchargement des données des bots...');
    
    const preloadPromises = bots.map(async (botConfig) => {
      if (botConfig.token && botConfig.clientId) {
        try {
          await fetchBotInfo(botConfig.token, botConfig.clientId);
        } catch (error) {
          console.warn(`Erreur lors du préchargement du bot ${botConfig.clientId}:`, error);
        }
      }
    });

    await Promise.allSettled(preloadPromises);
    console.log('✅ Préchargement des données des bots terminé');
  })();

  return preloadPromise;
}

// Démarrer le préchargement immédiatement
if (bots.length > 0) {
  preloadBotData().catch(console.error);
}

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
  const now = Date.now();
  
  // Vérifier le cache - retourner les données même si elles sont un peu anciennes
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  // Si on a des données en cache mais qu'elles sont un peu anciennes, les retourner en arrière-plan
  if (cached && now - cached.timestamp < CACHE_TTL + STALE_TTL) {
    // Rafraîchir en arrière-plan
    refreshBotInfoInBackground(botToken, botId, cacheKey);
    return cached.data;
  }

  try {
    // Créer un AbortController pour gérer les timeouts
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // Réduit à 5 secondes

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

    // Gestion de l'image du bot avec fallback
    let botImage = "/img/profile-bot.png"; // Image par défaut
    if (userData.avatar) {
      botImage = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;
    }

    const botInfo: BotInfo = {
      id: userData.id,
      name: userData.username,
      tags: appData.tags || [],
      link: link,
      description: description,
      image: botImage,
      commands: Array.isArray(commands) ? commands.map((cmd: DiscordCommand) => ({
        name: cmd.name,
        description: cmd.description,
      })) : [],
    };

    // Mettre en cache
    botCache.set(cacheKey, { data: botInfo, timestamp: now });

    return botInfo;
  } catch (error) {
    console.error("Erreur lors de la récupération des infos du bot:", error);
    
    // Retourner des données en cache même si elles sont expirées
    if (cached) {
      console.log(`Utilisation des données en cache pour le bot ${botId}`);
      return cached.data;
    }
    
    return null;
  }
}

// Fonction pour rafraîchir les données en arrière-plan
async function refreshBotInfoInBackground(botToken: string, botId: string, cacheKey: string) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // Timeout court pour le background

    const userResponse = await fetch("https://discord.com/api/v10/users/@me", {
      headers: {
        Authorization: `Bot ${botToken}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (userResponse.ok) {
      const userData = await userResponse.json();
      
      // Mettre à jour le cache avec les nouvelles données
      const existingData = botCache.get(cacheKey);
      if (existingData) {
        existingData.timestamp = Date.now();
        if (userData.avatar) {
          existingData.data.image = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;
        }
        existingData.data.name = userData.username;
      }
    }
  } catch (error) {
    // Ignorer les erreurs de rafraîchissement en arrière-plan
    console.debug(`Erreur lors du rafraîchissement en arrière-plan pour le bot ${botId}:`, error);
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

    // Vérifier d'abord si on a des données en cache pour tous les bots
    const cachedBots = Array.from(botCache.values()).map(cache => cache.data);
    
    if (cachedBots.length >= bots.length) {
      // Utiliser le cache si on a toutes les données
      const allBots = [...cachedBots];
      const paginatedBots = allBots.slice(start, end);

      // Rafraîchir en arrière-plan si nécessaire
      refreshAllBotsInBackground();

      return NextResponse.json({
        bots: paginatedBots,
        total: allBots.length,
        currentPage: page,
        totalPages: Math.ceil(allBots.length / limit),
        botsPerPage: limit,
      });
    }

    // Si on a des données partielles, les retourner immédiatement
    if (cachedBots.length > 0) {
      const allBots = [...cachedBots];
      const paginatedBots = allBots.slice(start, end);

      // Continuer le préchargement en arrière-plan
      if (!isPreloading) {
        preloadBotData().catch(console.error);
      }

      return NextResponse.json({
        bots: paginatedBots,
        total: allBots.length,
        currentPage: page,
        totalPages: Math.ceil(allBots.length / limit),
        botsPerPage: limit,
      });
    }

    // Si aucune donnée n'est disponible, attendre le préchargement ou récupérer immédiatement
    if (isPreloading && preloadPromise) {
      // Attendre un peu le préchargement
      try {
        await Promise.race([
          preloadPromise,
          new Promise(resolve => setTimeout(resolve, 1000)) // Timeout de 1 seconde
        ]);
        
        // Vérifier si on a maintenant des données
        const updatedCachedBots = Array.from(botCache.values()).map(cache => cache.data);
        if (updatedCachedBots.length > 0) {
          const allBots = [...updatedCachedBots];
          const paginatedBots = allBots.slice(start, end);

          return NextResponse.json({
            bots: paginatedBots,
            total: allBots.length,
            currentPage: page,
            totalPages: Math.ceil(allBots.length / limit),
            botsPerPage: limit,
          });
        }
      } catch (error) {
        console.warn('Erreur lors de l\'attente du préchargement:', error);
      }
    }

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

    // Dédupliquer les bots basé sur leur ID
    const uniqueBots = botsInfo.reduce((acc, bot) => {
      if (!acc.find(existingBot => existingBot.id === bot.id)) {
        acc.push(bot);
      }
      return acc;
    }, [] as BotInfo[]);

    const allBots = [...uniqueBots];
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

// Fonction pour rafraîchir tous les bots en arrière-plan
async function refreshAllBotsInBackground() {
  bots.forEach(async (botConfig) => {
    if (botConfig.token && botConfig.clientId) {
      const cacheKey = `bot-${botConfig.clientId}`;
      const cached = botCache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp > STALE_TTL) {
        refreshBotInfoInBackground(botConfig.token, botConfig.clientId, cacheKey);
      }
    }
  });
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
