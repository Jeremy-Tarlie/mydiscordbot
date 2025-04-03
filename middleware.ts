import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

// Définir le type LocalePrefix explicitement
type LocalePrefix = 'as-needed' | 'always' | 'never';

export default createMiddleware({
  // Les locales supportées
  locales: ['fr', 'en'],
  // La locale par défaut
  defaultLocale: 'fr',
  // Utiliser le type correct pour localePrefix
  localePrefix: 'always' as LocalePrefix
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)', '/']
};