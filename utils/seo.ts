import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  locale?: string;
  noindex?: boolean;
  canonical?: string;
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  image = 'https://mydiscordbot.com/img/bot.webp',
  url = 'https://mydiscordbot.com',
  type = 'website',
  locale = 'fr',
  noindex = false,
  canonical
}: SEOProps): Metadata {
  const fullTitle = title ? `${title} | MyDiscordBot` : 'MyDiscordBot - Créateur de Bots Discord Personnalisés';
  const fullDescription = description || 'Service officiel de création de bots Discord personnalisés. Créez votre bot sur mesure pour la modération, les mini-jeux et la gestion de communauté.';
  const fullUrl = canonical || url;
  
  const baseKeywords = [
    'mydiscordbot',
    'bot discord',
    'création bot discord',
    'bot discord personnalisé',
    'discord bot maker',
    'discord bot creator'
  ];
  
  const allKeywords = [...baseKeywords, ...keywords];

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: allKeywords,
    authors: [{ name: 'khraii - Créateur de MyDiscordBot', url: 'https://mydiscordbot.com/about' }],
    creator: 'MyDiscordBot',
    publisher: 'MyDiscordBot',
    robots: {
      index: !noindex,
      follow: !noindex,
      nocache: false,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: type,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      url: fullUrl,
      siteName: 'MyDiscordBot',
      title: fullTitle,
      description: fullDescription,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
          type: 'image/webp',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [image],
      creator: '@khraii',
      site: '@MyDiscordBot',
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        fr: fullUrl.replace('/en/', '/fr/'),
        en: fullUrl.replace('/fr/', '/en/'),
      },
    },
    other: {
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'theme-color': '#5865F2',
    },
  };
}

// Fonction pour générer les métadonnées pour les pages de bots
export function generateBotPageMetadata(bot: {
  name: string;
  description: string;
  id: string;
  locale?: string;
}): Metadata {
  return generateSEOMetadata({
    title: `Bot Discord ${bot.name} - ${bot.description}`,
    description: `Découvrez le bot Discord ${bot.name}. ${bot.description}. Créé avec MyDiscordBot, le service officiel de création de bots Discord personnalisés.`,
    keywords: [
      'bot discord',
      bot.name.toLowerCase(),
      'discord bot',
      'bot personnalisé',
      'modération discord',
      'gestion communauté'
    ],
    url: `https://mydiscordbot.com/${bot.locale || 'fr'}/bots/${bot.id}`,
    type: 'website',
    locale: bot.locale || 'fr',
    canonical: `https://mydiscordbot.com/${bot.locale || 'fr'}/bots/${bot.id}`
  });
}

// Fonction pour générer les métadonnées pour les pages de commandes
export function generateCommandPageMetadata(locale: string = 'fr'): Metadata {
  return generateSEOMetadata({
    title: 'Créer un Bot Discord Personnalisé',
    description: 'Créez votre bot Discord personnalisé en quelques clics. Service professionnel avec hébergement 24/7, modération automatique et mini-jeux intégrés.',
    keywords: [
      'créer bot discord',
      'bot discord personnalisé',
      'discord bot maker',
      'création bot discord',
      'bot discord gratuit',
      'hébergement bot discord'
    ],
    url: `https://mydiscordbot.com/${locale}/command`,
    type: 'website',
    locale,
    canonical: `https://mydiscordbot.com/${locale}/command`
  });
}

// Fonction pour générer les métadonnées pour les pages de liste de bots
export function generateBotsListPageMetadata(locale: string = 'fr'): Metadata {
  return generateSEOMetadata({
    title: 'Bots Discord Disponibles',
    description: 'Découvrez tous nos bots Discord personnalisés. Modération, mini-jeux, gestion de communauté et bien plus encore. Tous nos bots sont gratuits et prêts à utiliser.',
    keywords: [
      'bots discord',
      'liste bots discord',
      'bots discord gratuits',
      'modération discord',
      'mini-jeux discord',
      'gestion communauté discord'
    ],
    url: `https://mydiscordbot.com/${locale}/bots`,
    type: 'website',
    locale,
    canonical: `https://mydiscordbot.com/${locale}/bots`
  });
}

// Fonction pour générer les métadonnées pour les pages de politique de confidentialité
export function generatePrivacyPageMetadata(locale: string = 'fr'): Metadata {
  return generateSEOMetadata({
    title: 'Politique de Confidentialité',
    description: 'Politique de confidentialité de MyDiscordBot. Découvrez comment nous protégeons vos données personnelles et respectons votre vie privée.',
    keywords: [
      'politique confidentialité',
      'protection données',
      'vie privée',
      'RGPD',
      'données personnelles'
    ],
    url: `https://mydiscordbot.com/${locale}/privacy-policy`,
    type: 'website',
    locale,
    canonical: `https://mydiscordbot.com/${locale}/privacy-policy`
  });
}
