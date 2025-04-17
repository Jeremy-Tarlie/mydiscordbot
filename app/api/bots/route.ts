import { NextResponse } from 'next/server';

interface DiscordCommand {
    name: string;
    description: string;
}

// Configuration des bots
const bots = [
    {
        token: process.env.BOT1_TOKEN,
        clientId: process.env.BOT1_CLIENT_ID
    },
    // Ajoutez d'autres bots selon vos besoins
];

async function fetchBotInfo(botToken: string) {
    try {
        // Récupérer les informations du bot via l'API Discord
        const response = await fetch('https://discord.com/api/v10/users/@me', {
            headers: {
                'Authorization': `Bot ${botToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch bot info');
        }

        const botData = await response.json();

        // Récupérer les commandes du bot
        const applicationResponse = await fetch(`https://discord.com/api/v10/applications/${botData.id}/commands`, {
            headers: {
                'Authorization': `Bot ${botToken}`,
                'Content-Type': 'application/json',
            },
        });

        const commands = await applicationResponse.json();

        return {
            id: botData.id,
            name: botData.username,
            description: botData.bio || "Description non disponible",
            image: `https://cdn.discordapp.com/avatars/${botData.id}/${botData.avatar}.png`,
            commands: commands.map((cmd: DiscordCommand) => ({
                name: cmd.name,
                description: cmd.description
            }))
        };
    } catch (error) {
        console.error('Erreur lors de la récupération des informations du bot:', error);
        return null;
    }
}

// Gestionnaire de la route GET
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '6');
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
            botsPerPage: limit
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des informations des bots:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la récupération des informations des bots' },
            { status: 500 }
        );
    }
}