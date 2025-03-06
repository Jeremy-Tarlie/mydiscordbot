import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { Buffer } from "buffer";

const transporter = nodemailer.createTransport({
    // host: process.env.SMTP_HOST || "smtp.gmail.com",
    // port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE || "gmail",
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const RECAPTCHA_SECRET_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_PRIVATE_KEY;

export async function POST(req: NextRequest) {
    if (req.method === "POST") {
        try {
            const bot = await req.json();
            const { recaptchaToken, bot_view, command, price } = bot;
            const {
                name: nameBot,
                description: descriptionBot,
                host: hostBot,
                comment: commentBot,
                img: imgBot,
                discord,
                email: mail, // Adresse email du client
            } = bot_view;

            
            const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
            });

            const result = await response.json();


            if (!result.success || result.score < 0.5) {
                // Échec si le score est trop bas (reCAPTCHA v3 utilise un score)
                return NextResponse.json({ error: "CAPTCHA validation failed" }, { status: 400 });
            }


            // Validation des champs obligatoires
            if (!mail || !discord || !nameBot) {
                throw new Error("Email, Discord, et Nom du bot sont obligatoires.");
            }

            if (!isValidEmail(mail)) {
                throw new Error("Email invalide.");
            }



            // Formater les commandes
            const formattedCommands = command.map(
                (cmd: { name: string; description: string }, index: number) =>
                    `<li>${index + 1}. ${cmd.name} : ${cmd.description}</li>`
            ).join("");


            const priceMounth = hostBot === "true" ? "10€/mois" : "0€/mois";



            // Options pour l'email principal
            const mailOptions = {
                from: process.env.SMTP_USER,
                to: [process.env.SMTP_USER, "contact@tarlie.fr"].filter(Boolean) as string[],
                subject: "Commande d'un bot",
                attachments: !!imgBot
                    ? [
                        {
                            filename: "image.png",
                            content: Buffer.from(imgBot, "base64"),
                            contentType: "image/png",
                        },
                    ]
                    : [],
                html: `
            <div>
              <h1>Nom du bot : ${nameBot}</h1>
              <h2>${hostBot === "true" ? "Le bot sera hébergé" : "Pas d'hébergement"}</h2>
            </div>
            <h3>Le prix est de ${price}€ ${hostBot === "true" ? `avec un hébergement à ${priceMounth}` : ""}</h3>
            <p><strong>Commentaire supplémentaire :</strong> ${commentBot || "Aucun"}</p>
            <p><strong>Description du bot :</strong> ${descriptionBot}</p>
         
            <p><strong>Commandes :</strong></p>
            <ul>${formattedCommands}</ul>
            <p><strong>Commande passée par :</strong> ${discord} (${mail})</p>
          `,
            };

            // Options pour l'email de confirmation au client
            const mailOptionsConfirmation = {
                from: process.env.SMTP_USER,
                to: mail, // Destination : Email client
                subject: "Confirmation de la commande",
                text: `
            Bonjour,
            Votre commande pour le bot "${nameBot}" a bien été reçue.
            Le paiement s'effectuera via PayPal et aura lieu à la fin du projet, juste avant la livraison.
            Nous vous recontacterons prochainement.
            Bien cordialement,
          `,
            };

            // Envoyer les emails
            await sendEmail(mailOptions);
            await sendEmail(mailOptionsConfirmation);

            return NextResponse.json({ success: true });
        } catch (error) {
            console.error("Error processing email:", error);
            if (error instanceof Error) {
                return NextResponse.json({ error: error.message }, { status: 500 });
            } else {
                return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
            }
        }
    } else {
        return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
    }
}


async function sendEmail(mailOptions: nodemailer.SendMailOptions) {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
            if (error) {
                console.error("Error sending email:", error);
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
}


function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
