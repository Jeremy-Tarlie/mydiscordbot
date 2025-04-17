import { NextResponse } from 'next/server';
import { Client, GatewayIntentBits } from 'discord.js';

// Configuration des bots
const bots = [
    {
        token: process.env.BOT1_TOKEN,
        clientId: process.env.BOT1_CLIENT_ID
    },
    // Ajoutez d'autres bots selon vos besoins
];

// Gestionnaire de la route GET
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '6');
        const start = (page - 1) * limit;
        const end = start + limit;

        const botsInfo = [];

        for (const botConfig of bots) {
            const client = new Client({
                intents: [
                    GatewayIntentBits.Guilds,
                    GatewayIntentBits.GuildMessages
                ]
            });

            await client.login(botConfig.token);

            // Récupérer les informations du bot
            const botUser = client.user;
            const application = await client.application?.fetch();
            const commands = await application?.commands.fetch();

            const botInfo = {
                id: botUser?.id,
                name: botUser?.username,
                description: application?.description,
                image: botUser?.displayAvatarURL(),
                commands: commands?.map(cmd => ({
                    name: cmd.name,
                    description: cmd.description
                }))
            };

            botsInfo.push(botInfo);
            client.destroy(); // Déconnexion du bot après avoir récupéré les informations
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