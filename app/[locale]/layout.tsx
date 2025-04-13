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
    default:
      "MyDiscordBot - Le Créateur de Bots Discord Personnalisés | Service Officiel",
    template: "%s | MyDiscordBot",
  },
  description:
    "MyDiscordBot est le service officiel de création de bots Discord personnalisés. Créez votre bot sur mesure pour la modération, les mini-jeux et la gestion de communauté. Service professionnel et hébergement disponible.",
  keywords:
    "mydiscordbot, my discord bot, bot discord, création bot discord, bot discord personnalisé, bot modération discord, bot sur mesure, développement bot discord, discord bot maker, discord bot creator",
  authors: [{ name: "khraii - Créateur de MyDiscordBot" }],
  creator: "MyDiscordBot",
  publisher: "MyDiscordBot",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://mydiscordbot.com",
    siteName: "MyDiscordBot",
    title:
      "MyDiscordBot - Le Créateur de Bots Discord Personnalisés | Service Officiel",
    description:
      "MyDiscordBot est le service officiel de création de bots Discord personnalisés. Créez votre bot sur mesure pour la modération, les mini-jeux et la gestion de communauté.",
    images: [
      {
        url: "/img/bot.webp",
        width: 600,
        height: 600,
        alt: "MyDiscordBot - Logo Officiel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "MyDiscordBot - Le Créateur de Bots Discord Personnalisés | Service Officiel",
    description:
      "MyDiscordBot est le service officiel de création de bots Discord personnalisés. Créez votre bot sur mesure pour la modération, les mini-jeux et la gestion de communauté.",
    images: ["/img/bot.webp"],
    creator: "@khraii",
    site: "@MyDiscordBot",
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
              name: "MyDiscordBot",
              alternateName: [
                "My Discord Bot",
                "MyDiscordBot.com",
                "mydiscordbot.com",
                "my discord bot",
                "my discord bot creator",
                "my discord bot maker",
                "my discord bot modération",
                "my discord bot mini-jeux",
                "my discord bot gestion de communauté",
                "mydiscordbot",
                "mydiscordbot creator",
                "mydiscordbot maker",
                "mydiscordbot modération",
                "mydiscordbot mini-jeux",
                "mydiscordbot gestion de communauté",
              ],
              url: "https://mydiscordbot.com",
              description:
                "Service officiel de création de bots Discord personnalisés",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://mydiscordbot.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              sameAs: [
                "https://twitter.com/khraii",
                "https://discord.gg/mydiscordbot",
                "https://github.com/mydiscordbot",
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
              name: "MyDiscordBot",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Discord",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR",
              },
              description:
                "Service officiel de création de bots Discord personnalisés",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "150",
              },
              author: {
                "@type": "Person",
                name: "khraii",
                url: "https://mydiscordbot.com/about",
              },
              brand: {
                "@type": "Brand",
                name: "MyDiscordBot",
                logo: "https://mydiscordbot.com/logo.ico",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "MyDiscordBot",
              url: "https://mydiscordbot.com",
              logo: "https://mydiscordbot.com/logo.ico",
              description:
                "Service officiel de création de bots Discord personnalisés",
              founder: {
                "@type": "Person",
                name: "khraii",
              },
              sameAs: [
                "https://twitter.com/khraii",
                "https://discord.gg/mydiscordbot",
                "https://github.com/mydiscordbot",
              ],
            }),
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16998998043"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-16998998043');
    `,
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
