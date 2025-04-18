import { getRequestConfig } from 'next-intl/server';
import type { AbstractIntlMessages } from 'next-intl';

export default getRequestConfig(async ({ locale }) => {
  const messages = {
    home: (await import(`./public/locale/${locale}/home.json`)).default,
    footer: (await import(`./public/locale/${locale}/footer.json`)).default,
    navigation: (await import(`./public/locale/${locale}/navigation.json`)).default,
    command: (await import(`./public/locale/${locale}/command.json`)).default,
    command_finish: (await import(`./public/locale/${locale}/command_finish.json`)).default,
    mention_legal: (await import(`./public/locale/${locale}/mention_legal.json`)).default,
    list_command: (await import(`./public/locale/${locale}/list_command.json`)).default,
    404: (await import(`./public/locale/${locale}/404.json`)).default,
    bots: (await import(`./public/locale/${locale}/bots.json`)).default,
    bot_detail: (await import(`./public/locale/${locale}/bot_detail.json`)).default,
  } as AbstractIntlMessages;

  return {
    messages,
    timeZone: 'Europe/Paris',
    defaultLocale: 'fr',
    locales: ['fr', 'en']
  };
});

// Exportez les configurations de locale
export const locales = ['fr', 'en'] as const;
export const defaultLocale = 'fr' as const;