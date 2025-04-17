import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { Buffer } from "buffer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST?.trim(), // Ajout de trim() pour enlever les espaces
  port: parseInt(process.env.SMTP_PORT || "465"), // Changement du port par défaut à 465 si vous utilisez SSL/TLS
  secure: true, // true pour 465, false pour les autres ports comme 587
  auth: {
    user: process.env.SMTP_USER?.trim(),
    pass: process.env.SMTP_PASS?.trim(),
  },
  tls: {
    rejectUnauthorized: false, // Ajoutez cette option si vous avez des problèmes de certificat
  },
});
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY;

export async function POST(req: NextRequest) {
  console.log("SMTP Configuration:", {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
  });

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

      // Vérification du CAPTCHA avec Cloudflare Turnstile
      const turnstileResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            secret: TURNSTILE_SECRET_KEY,
            response: recaptchaToken,
          }),
        }
      );

      const turnstileResult = await turnstileResponse.json();

      if (!turnstileResult.success) {
        // Si Cloudflare Turnstile échoue, on renvoie une erreur
        return NextResponse.json(
          { error: "CAPTCHA validation failed" },
          { status: 400 }
        );
      }

      // Validation des champs obligatoires
      if (!mail || !discord || !nameBot) {
        throw new Error("Email, Discord, et Nom du bot sont obligatoires.");
      }

      if (!isValidEmail(mail)) {
        throw new Error("Email invalide.");
      }

      // Formater les commandes
      const formattedCommands = command
        .map(
          (cmd: { name: string; description: string }, index: number) =>
            `<li>${index + 1}. ${cmd.name} : ${cmd.description}</li>`
        )
        .join("");

      const priceMounth = hostBot === "true" ? "5€/mois" : "0€/mois";

      // Options pour l'email principal
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: [process.env.SMTP_USER, process.env.USER2].filter(
          Boolean
        ) as string[],
        subject: "Commande d'un bot",
        attachments: imgBot
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
                      <h2>${
                        hostBot === "true"
                          ? "Le bot sera hébergé"
                          : "Pas d'hébergement"
                      }</h2>
                    </div>
                    <h3>Le prix est de ${price}€ ${
          hostBot === "true" ? `avec un hébergement à ${priceMounth}` : ""
        }</h3>
                    <p><strong>Commentaire supplémentaire :</strong> ${
                      commentBot || "Aucun"
                    }</p>
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
            Votre demande concernant le bot "${nameBot}" a bien été enregistrée.
            Nous reviendrons vers vous dans les plus brefs délais afin de discuter de la faisabilité de votre projet.
            Cordialement,
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
        return NextResponse.json(
          { error: "An unknown error occurred" },
          { status: 500 }
        );
      }
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }
}

async function sendEmail(mailOptions: nodemailer.SendMailOptions) {
  console.log("Attempting to send email with options:", {
    from: mailOptions.from,
    to: mailOptions.to,
    subject: mailOptions.subject,
  });

  return new Promise((resolve, reject) => {
    transporter.verify((error) => {
      if (error) {
        console.error("Transporter verification failed:", error);
        reject(error);
        return;
      }

      console.log("Transporter verified successfully");

      transporter.sendMail(
        mailOptions,
        (error: Error | null, info: nodemailer.SentMessageInfo) => {
          if (error) {
            console.error("Error sending email:", error);
            reject(error);
          } else {
            console.log("Email sent successfully:", info);
            resolve(info);
          }
        }
      );
    });
  });
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
