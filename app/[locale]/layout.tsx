import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Viewport } from "next";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { useMessages } from "next-intl";
import "./global.css";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

interface LayoutProps {
  children?: ReactNode;
}

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "My Discord Bot - Créez votre bot Discord personnalisé",
    template: "%s | My Discord Bot",
  },
  description:
    "Créez votre bot Discord personnalisé avec My Discord Bot. Solutions sur mesure pour la modération, les mini-jeux et la gestion de communauté. Service professionnel et hébergement disponible.",
  keywords:
    "discord bot, bot discord personnalisé, création bot discord, bot modération discord, bot sur mesure, développement bot discord",
  authors: [{ name: "khraii" }],
  creator: "khraii",
  publisher: "My Discord Bot",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://mydiscordbot.com",
    siteName: "My Discord Bot",
    title: "My Discord Bot - Créez votre bot Discord personnalisé",
    description:
      "Créez votre bot Discord personnalisé avec My Discord Bot. Solutions sur mesure pour la modération, les mini-jeux et la gestion de communauté.",
    images: [
      {
        url: "/img/bot.webp",
        width: 600,
        height: 600,
        alt: "My Discord Bot Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Discord Bot - Créez votre bot Discord personnalisé",
    description:
      "Créez votre bot Discord personnalisé avec My Discord Bot. Solutions sur mesure pour la modération, les mini-jeux et la gestion de communauté.",
    images: ["/img/bot.webp"],
    creator: "@khraii",
  },
  icons: {
    icon: "/logo.ico",
    apple: [{ url: "/apple-icon.png" }],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://mydiscordbot.com",
    languages: {
      fr: "https://mydiscordbot.com/fr",
      en: "https://mydiscordbot.com/en",
    },
  },
};

export default function RootLayout({ children }: LayoutProps) {
  const messages = useMessages();
  const locale = useLocale();

  return (
    <html lang={locale || "fr"} className={inter.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "My Discord Bot",
              url: "https://mydiscordbot.com",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://mydiscordbot.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              sameAs: [
                "https://twitter.com/khraii",
                "https://discord.gg/mydiscordbot",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "My Discord Bot",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Discord",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR",
              },
              description: "Service de création de bots Discord personnalisés",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "150",
              },
            }),
          }}
        />
      </head>

      <NextIntlClientProvider locale={locale || "fr"} messages={messages}>
        <body suppressHydrationWarning>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <div className="container">
            <Header locale={locale || "fr"} />
            {children}
            <Footer />
          </div>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
