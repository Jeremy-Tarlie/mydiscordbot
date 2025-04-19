import { NextResponse } from "next/server";

interface DiscordCommand {
  name: string;
  description: string;
}

// Configuration des bots
const bots = [
  {
    token: process.env.BOT1_TOKEN,
    clientId: process.env.BOT1_CLIENT_ID,
  },
  // Ajoutez d'autres bots selon vos besoins
];

function getBotToken(id: string) {
  const bot = bots.find((bot) => bot.clientId === id);
  if (!bot) {
    throw new Error("Bot non trouvé");
  }
  return bot.token;
}

async function fetchBotInfo(botToken: string) {
  try {
    // 1. Récupère l'utilisateur du bot
    const userResponse = await fetch("https://discord.com/api/v10/users/@me", {
      headers: {
        Authorization: `Bot ${botToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!userResponse.ok) {
      throw new Error("Failed to fetch bot user info");
    }

    const userData = await userResponse.json();

    // 2. Récupère les infos de l'application (avec description visible sur le panel)
    const appResponse = await fetch(
      `https://discord.com/api/v10/applications/${userData.id}`,
      {
        headers: {
          Authorization: `Bot ${botToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const appData = await appResponse.json();

    // 3. Récupère les commandes
    const commandsResponse = await fetch(
      `https://discord.com/api/v10/applications/${userData.id}/commands`,
      {
        headers: {
          Authorization: `Bot ${botToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const commands = await commandsResponse.json();
    const link = appData.description.includes("https://discord.gg/")
      ? ""
      : `https://discord.com/oauth2/authorize?client_id=${userData.id}&permissions=8&scope=bot`;

    return {
      id: userData.id,
      name: userData.username,
      tags: appData.tags,
      link: link,
      description: appData.description || "Description non disponible",
      image: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`,
      commands: commands.map((cmd: DiscordCommand) => ({
        name: cmd.name,
        description: cmd.description,
      })),
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des infos du bot:", error);
    return null;
  }
}

// Gestionnaire de la route GET
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");
    const start = (page - 1) * limit;
    const end = start + limit;

    const botsInfo = [];

    // Récupérer les informations de tous les bots
    for (const botConfig of bots) {
      if (botConfig.token) {
        const botInfo = await fetchBotInfo(botConfig.token);
        if (botInfo) {
          botsInfo.push(botInfo);
        }
      }
    }

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
  const { id } = await request.json();
  const botInfo = await fetchBotInfo(getBotToken(id) || "");
  return NextResponse.json(botInfo);
}
