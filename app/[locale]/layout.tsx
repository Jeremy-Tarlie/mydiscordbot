import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Viewport } from "next";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { useMessages } from "next-intl";
import "./global.css";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import CookieConsent from "@/components/CookieConsent";
import { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";

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
      "MyDiscordBot - Créateur de Bots Discord Personnalisés | Service Professionnel",
    template: "%s | MyDiscordBot",
  },
  description:
    "MyDiscordBot est le service officiel de création de bots Discord personnalisés. Créez votre bot sur mesure pour la modération, les mini-jeux et la gestion de communauté. Service professionnel, hébergement disponible et support 24/7.",
  keywords: [
    "mydiscordbot",
    "my discord bot", 
    "bot discord",
    "création bot discord",
    "bot discord personnalisé",
    "bot modération discord",
    "bot sur mesure",
    "développement bot discord",
    "discord bot maker",
    "discord bot creator",
    "bot discord gratuit",
    "bot discord premium",
    "hébergement bot discord",
    "service bot discord",
    "commande bot discord",
    "bot discord français",
    "bot discord modération",
    "bot discord mini-jeux",
    "bot discord musique",
    "bot discord gestion",
    "bot discord automatique",
    "discord bot development",
    "custom discord bot",
    "discord bot hosting"
  ],
  authors: [{ name: "khraii - Créateur de MyDiscordBot", url: "https://mydiscordbot.com/about" }],
  creator: "MyDiscordBot",
  publisher: "MyDiscordBot",
  applicationName: "MyDiscordBot",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://mydiscordbot.com",
    siteName: "MyDiscordBot",
    title: "MyDiscordBot - Créateur de Bots Discord Personnalisés | Service Professionnel",
    description: "MyDiscordBot est le service officiel de création de bots Discord personnalisés. Créez votre bot sur mesure pour la modération, les mini-jeux et la gestion de communauté.",
    images: [
      {
        url: "https://mydiscordbot.com/img/bot.webp",
        width: 1200,
        height: 630,
        alt: "MyDiscordBot - Créateur de Bots Discord Personnalisés",
        type: "image/webp",
      },
      {
        url: "https://mydiscordbot.com/img/bot-og.png",
        width: 1200,
        height: 630,
        alt: "MyDiscordBot - Service de Création de Bots Discord",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MyDiscordBot - Créateur de Bots Discord Personnalisés",
    description: "Service professionnel de création de bots Discord personnalisés. Modération, mini-jeux, gestion de communauté.",
    images: ["https://mydiscordbot.com/img/bot-twitter.webp"],
    creator: "@khraii",
    site: "@MyDiscordBot",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#5865F2" },
    ],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://mydiscordbot.com",
    languages: {
      fr: "https://mydiscordbot.com/fr",
      en: "https://mydiscordbot.com/en",
    },
  },
  category: "technology",
  classification: "Business",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "theme-color": "#5865F2",
    "msapplication-TileColor": "#5865F2",
    "msapplication-config": "/browserconfig.xml",
  },
};

async function HeadContent() {
  const headersList = await headers();
  const nonce = headersList.get('x-nonce') || '';

  return (
    <>
      <script
        type="application/ld+json"
        nonce={nonce}
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
            description: "Service officiel de création de bots Discord personnalisés. Créez votre bot sur mesure pour la modération, les mini-jeux et la gestion de communauté.",
            inLanguage: ["fr-FR", "en-US"],
            copyrightYear: 2024,
            dateCreated: "2024-01-01",
            dateModified: new Date().toISOString().split('T')[0],
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://mydiscordbot.com/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string",
            },
            sameAs: [
              "https://discord.gg/bhfFEwpkBK",
              "https://github.com/Jeremy-Tarlie",
            ],
            mainEntity: {
              "@type": "SoftwareApplication",
              name: "MyDiscordBot",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Discord",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR",
                availability: "https://schema.org/InStock",
                validFrom: "2024-01-01"
              }
            }
          }),
        }}
      />
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "MyDiscordBot",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Discord",
            softwareVersion: "2.0",
            releaseNotes: "Service de création de bots Discord personnalisés avec hébergement et support",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              validFrom: "2024-01-01",
              category: "Free",
              priceValidUntil: "2025-12-31"
            },
            description: "Service officiel de création de bots Discord personnalisés. Créez votre bot sur mesure pour la modération, les mini-jeux et la gestion de communauté.",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "150",
              bestRating: "5",
              worstRating: "1"
            },
            author: {
              "@type": "Person",
              name: "khraii",
              url: "https://mydiscordbot.com/about",
              jobTitle: "Développeur Full-Stack",
              worksFor: {
                "@type": "Organization",
                name: "MyDiscordBot"
              }
            },
            brand: {
              "@type": "Brand",
              name: "MyDiscordBot",
              logo: "https://mydiscordbot.com/logo.ico",
            },
            featureList: [
              "Création de bots personnalisés",
              "Modération automatique",
              "Mini-jeux intégrés",
              "Gestion de communauté",
              "Hébergement 24/7",
              "Support technique"
            ],
            screenshot: "https://mydiscordbot.com/img/bot.webp",
            downloadUrl: "https://mydiscordbot.com/command",
            installUrl: "https://mydiscordbot.com/command",
            softwareRequirements: "Discord",
            memoryRequirements: "512MB RAM",
            storageRequirements: "1GB",
            permissions: "Discord Bot Token"
          }),
        }}
      />
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "MyDiscordBot",
            url: "https://mydiscordbot.com",
            logo: {
              "@type": "ImageObject",
              url: "https://mydiscordbot.com/logo.ico",
              width: 512,
              height: 512
            },
            description: "Service officiel de création de bots Discord personnalisés. Créez votre bot sur mesure pour la modération, les mini-jeux et la gestion de communauté.",
            foundingDate: "2024-01-01",
            founder: {
              "@type": "Person",
              name: "khraii",
              jobTitle: "Fondateur & Développeur",
              url: "https://mydiscordbot.com/about"
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              availableLanguage: ["French", "English"],
              url: "https://discord.gg/bhfFEwpkBK"
            },
            address: {
              "@type": "PostalAddress",
              addressCountry: "FR"
            },
            sameAs: [
              "https://discord.gg/bhfFEwpkBK",
              "https://github.com/Jeremy-Tarlie",
            ],
            serviceType: "Discord Bot Development",
            areaServed: "Worldwide",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Discord Bot Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Bot Discord Personnalisé",
                    description: "Création de bot Discord sur mesure"
                  }
                },
                {
                  "@type": "Offer", 
                  itemOffered: {
                    "@type": "Service",
                    name: "Hébergement Bot",
                    description: "Hébergement 24/7 pour votre bot Discord"
                  }
                }
              ]
            }
          }),
        }}
      />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-16998998043"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16998998043');
        `}
      </Script>
    </>
  );
}

function LayoutContent({ children }: LayoutProps) {
  const messages = useMessages();
  const locale = useLocale();

  return (
    <NextIntlClientProvider locale={locale || "fr"} messages={messages}>
      <body suppressHydrationWarning>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <div className="container">
          <Header locale={locale || "fr"} />
          {children}
          <Footer />
          <CookieConsent />
        </div>
      </body>
    </NextIntlClientProvider>
  );
}

export default async function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="fr" className={inter.className}>
      <head>
        <HeadContent />
      </head>
      <LayoutContent>{children}</LayoutContent>
    </html>
  );
}
