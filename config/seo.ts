// Configuration SEO pour MyDiscordBot
export const seoConfig = {
  // Informations de base
  siteName: 'MyDiscordBot',
  siteUrl: 'https://mydiscordbot.com',
  defaultLocale: 'fr',
  supportedLocales: ['fr', 'en'],
  
  // Métadonnées par défaut
  defaultTitle: 'MyDiscordBot - Créateur de Bots Discord Personnalisés',
  defaultDescription: 'Service officiel de création de bots Discord personnalisés. Créez votre bot sur mesure pour la modération, les mini-jeux et la gestion de communauté.',
  defaultKeywords: [
    'mydiscordbot',
    'bot discord',
    'création bot discord',
    'bot discord personnalisé',
    'discord bot maker',
    'discord bot creator',
    'bot discord gratuit',
    'bot discord premium',
    'hébergement bot discord',
    'service bot discord',
    'commande bot discord',
    'bot discord français',
    'bot discord modération',
    'bot discord mini-jeux',
    'bot discord musique',
    'bot discord gestion',
    'bot discord automatique',
    'discord bot development',
    'custom discord bot',
    'discord bot hosting'
  ],
  
  // Images par défaut
  defaultImage: 'https://mydiscordbot.com/img/bot.webp',
  defaultImageWidth: 1200,
  defaultImageHeight: 630,
  
  // Réseaux sociaux
  social: {
    twitter: {
      creator: '@khraii',
      site: '@MyDiscordBot'
    },
    discord: 'https://discord.gg/bhfFEwpkBK',
    github: 'https://github.com/Jeremy-Tarlie'
  },
  
  // Auteur
  author: {
    name: 'khraii',
    url: 'https://mydiscordbot.com/about',
    jobTitle: 'Développeur Full-Stack'
  },
  
  // Organisation
  organization: {
    name: 'MyDiscordBot',
    url: 'https://mydiscordbot.com',
    logo: 'https://mydiscordbot.com/logo.ico',
    foundingDate: '2024-01-01',
    address: {
      country: 'FR'
    }
  },
  
  // Configuration des pages
  pages: {
    home: {
      title: 'MyDiscordBot - Créateur de Bots Discord Personnalisés',
      description: 'Service officiel de création de bots Discord personnalisés. Créez votre bot sur mesure pour la modération, les mini-jeux et la gestion de communauté.',
      priority: 1.0,
      changeFrequency: 'weekly'
    },
    command: {
      title: 'Créer un Bot Discord Personnalisé',
      description: 'Créez votre bot Discord personnalisé en quelques clics. Service professionnel avec hébergement 24/7, modération automatique et mini-jeux intégrés.',
      priority: 0.9,
      changeFrequency: 'weekly'
    },
    bots: {
      title: 'Bots Discord Disponibles',
      description: 'Découvrez tous nos bots Discord personnalisés. Modération, mini-jeux, gestion de communauté et bien plus encore.',
      priority: 0.8,
      changeFrequency: 'daily'
    },
    faq: {
      title: 'FAQ - Questions Fréquentes',
      description: 'Trouvez les réponses à toutes vos questions sur MyDiscordBot et la création de bots Discord personnalisés.',
      priority: 0.8,
      changeFrequency: 'monthly'
    },
    privacy: {
      title: 'Politique de Confidentialité',
      description: 'Politique de confidentialité de MyDiscordBot. Découvrez comment nous protégeons vos données personnelles.',
      priority: 0.7,
      changeFrequency: 'monthly'
    }
  },
  
  // Configuration des données structurées
  structuredData: {
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'MyDiscordBot',
      url: 'https://mydiscordbot.com',
      description: 'Service officiel de création de bots Discord personnalisés',
      inLanguage: ['fr-FR', 'en-US'],
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://mydiscordbot.com/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    },
    
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'MyDiscordBot',
      url: 'https://mydiscordbot.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://mydiscordbot.com/logo.ico',
        width: 512,
        height: 512
      },
      description: 'Service officiel de création de bots Discord personnalisés',
      foundingDate: '2024-01-01',
      founder: {
        '@type': 'Person',
        name: 'khraii',
        jobTitle: 'Fondateur & Développeur'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['French', 'English'],
        url: 'https://discord.gg/bhfFEwpkBK'
      },
      sameAs: [
        'https://discord.gg/bhfFEwpkBK',
        'https://github.com/Jeremy-Tarlie'
      ]
    },
    
    softwareApplication: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'MyDiscordBot',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Discord',
      softwareVersion: '2.0',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock'
      },
      description: 'Service officiel de création de bots Discord personnalisés',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '150',
        bestRating: '5',
        worstRating: '1'
      },
      author: {
        '@type': 'Person',
        name: 'khraii',
        jobTitle: 'Développeur Full-Stack'
      }
    }
  },
  
  // Configuration des performances
  performance: {
    // Images
    imageFormats: ['image/webp', 'image/avif'],
    imageQuality: 85,
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // Cache
    cacheTTL: {
      static: 31536000, // 1 an
      dynamic: 3600,    // 1 heure
      api: 300          // 5 minutes
    },
    
    // Preconnect
    preconnectDomains: [
      'https://cdn.discordapp.com',
      'https://www.googletagmanager.com',
      'https://analytics.google.com'
    ]
  },
  
  // Configuration des analytics
  analytics: {
    googleAnalytics: 'AW-16998998043',
    googleTagManager: 'AW-16998998043'
  }
};

// Fonction utilitaire pour générer les URLs canoniques
export function generateCanonicalUrl(path: string, locale?: string): string {
  const baseUrl = seoConfig.siteUrl;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  if (locale && locale !== seoConfig.defaultLocale) {
    return `${baseUrl}/${locale}${cleanPath}`;
  }
  
  return `${baseUrl}${cleanPath}`;
}

// Fonction utilitaire pour générer les métadonnées de page
export function generatePageMetadata(pageKey: keyof typeof seoConfig.pages, locale?: string) {
  const page = seoConfig.pages[pageKey];
  const actualLocale = locale || seoConfig.defaultLocale;
  
  return {
    title: page.title,
    description: page.description,
    priority: page.priority,
    changeFrequency: page.changeFrequency,
    locale: actualLocale
  };
}

// Fonction utilitaire pour valider les métadonnées SEO
export function validateSEOMetadata(metadata: {
  title?: string;
  description?: string;
  keywords?: string[];
}) {
  const errors: string[] = [];
  
  if (!metadata.title || metadata.title.length < 30) {
    errors.push('Le titre doit contenir au moins 30 caractères');
  }
  
  if (metadata.title && metadata.title.length > 60) {
    errors.push('Le titre ne doit pas dépasser 60 caractères');
  }
  
  if (!metadata.description || metadata.description.length < 120) {
    errors.push('La description doit contenir au moins 120 caractères');
  }
  
  if (metadata.description && metadata.description.length > 160) {
    errors.push('La description ne doit pas dépasser 160 caractères');
  }
  
  if (!metadata.keywords || metadata.keywords.length < 5) {
    errors.push('Il faut au moins 5 mots-clés');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
