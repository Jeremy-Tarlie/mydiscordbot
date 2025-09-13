import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mydiscordbot.com'
  const currentDate = new Date().toISOString()

  // Pages statiques principales
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/fr`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/fr/command`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr/command`,
          en: `${baseUrl}/en/command`,
        },
      },
    },
    {
      url: `${baseUrl}/en/command`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fr/bots`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr/bots`,
          en: `${baseUrl}/en/bots`,
        },
      },
    },
    {
      url: `${baseUrl}/en/bots`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/fr/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr/privacy-policy`,
          en: `${baseUrl}/en/privacy-policy`,
        },
      },
    },
    {
      url: `${baseUrl}/en/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/fr/command_finish`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr/command_finish`,
          en: `${baseUrl}/en/command_finish`,
        },
      },
    },
    {
      url: `${baseUrl}/en/command_finish`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/fr/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr/faq`,
          en: `${baseUrl}/en/faq`,
        },
      },
    },
    {
      url: `${baseUrl}/en/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  // Pages dynamiques des bots (si vous avez une API)
  const dynamicPages: MetadataRoute.Sitemap = []
  
  try {
    // Récupérer les bots depuis votre API
    const response = await fetch(`${baseUrl}/api/bots`, {
      next: { revalidate: 3600 } // Cache pendant 1 heure
    })
    
    if (response.ok) {
      const data = await response.json()
      const bots = data.bots || []
      
      // Ajouter les pages individuelles des bots
      bots.forEach((bot: { id: string; updatedAt?: string }) => {
        if (bot.id) {
          dynamicPages.push(
            {
              url: `${baseUrl}/fr/bots/${bot.id}`,
              lastModified: bot.updatedAt || currentDate,
              changeFrequency: 'weekly' as const,
              priority: 0.7,
              alternates: {
                languages: {
                  fr: `${baseUrl}/fr/bots/${bot.id}`,
                  en: `${baseUrl}/en/bots/${bot.id}`,
                },
              },
            },
            {
              url: `${baseUrl}/en/bots/${bot.id}`,
              lastModified: bot.updatedAt || currentDate,
              changeFrequency: 'weekly' as const,
              priority: 0.7,
            }
          )
        }
      })
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des bots pour le sitemap:', error)
  }

  return [...staticPages, ...dynamicPages]
}
