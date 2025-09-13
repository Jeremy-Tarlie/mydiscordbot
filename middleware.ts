import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

// Définir le type LocalePrefix explicitement
type LocalePrefix = 'as-needed' | 'always' | 'never';

const intlMiddleware = createMiddleware({
  // Les locales supportées
  locales: ['fr', 'en'],
  // La locale par défaut
  defaultLocale: 'fr',
  // Utiliser le type correct pour localePrefix
  localePrefix: 'always' as LocalePrefix
});

export default function middleware(req: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com https://www.google-analytics.com https://www.gstatic.com https: http: 'unsafe-inline' ${process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : ""};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://cdn.discordapp.com https://www.google-analytics.com https://www.googletagmanager.com;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    frame-src 'self' https://challenges.cloudflare.com https://www.google.com;
    connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com;
  `.replace(/\s{2,}/g, ' ').trim();

  const response = intlMiddleware(req);

  response.headers.set('x-nonce', nonce);
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)', '/']
};