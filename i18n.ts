import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  try {
    // Chargez tous les namespaces nécessaires
    const messages = {
      home: (await import(`./public/locale/${locale}/home.json`)).default,
      footer: (await import(`./public/locale/${locale}/footer.json`)).default,
      navigation: (await import(`./public/locale/${locale}/navigation.json`)).default,
      command: (await import(`./public/locale/${locale}/command.json`)).default,
      command_finish: (await import(`./public/locale/${locale}/command_finish.json`)).default,
      mention_legal: (await import(`./public/locale/${locale}/mention_legal.json`)).default,
      list_command: (await import(`./public/locale/${locale}/list_command.json`)).default,
      404: (await import(`./public/locale/${locale}/404.json`)).default,
    };

    return {
      messages,
      locale // Retournez la locale ici
    };
  } catch (error) {
    console.error(`Error loading messages for locale "${locale}":`, error);
    throw error;
  }
});

// Exportez les configurations de locale
export const locales = ['fr', 'en'] as const;
export const defaultLocale = 'fr' as const;