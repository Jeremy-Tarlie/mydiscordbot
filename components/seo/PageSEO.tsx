import { ReactNode } from 'react';
import Head from 'next/head';
import { FAQStructuredData, ServiceStructuredData } from './StructuredData';
import { faqData } from '@/data/faq';

interface PageSEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url: string;
  type?: 'website' | 'article' | 'product';
  locale?: string;
  noindex?: boolean;
  canonical?: string;
  children?: ReactNode;
  faq?: boolean;
  service?: {
    name: string;
    description: string;
    provider: string;
    areaServed?: string;
    serviceType?: string;
    offers?: Array<{
      name: string;
      price?: string;
      priceCurrency?: string;
    }>;
  };
}

export function PageSEO({
  title,
  description,
  keywords = [],
  image = 'https://mydiscordbot.com/img/bot.webp',
  url,
  type = 'website',
  locale = 'fr',
  noindex = false,
  canonical,
  children,
  faq = false,
  service
}: PageSEOProps) {
  const fullTitle = title.includes('MyDiscordBot') ? title : `${title} | MyDiscordBot`;
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

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={allKeywords.join(', ')} />
        <meta name="author" content="khraii - Créateur de MyDiscordBot" />
        <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
        <meta name="googlebot" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
        
        {/* Open Graph */}
        <meta property="og:type" content={type} />
        <meta property="og:locale" content={locale === 'fr' ? 'fr_FR' : 'en_US'} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:site_name" content="MyDiscordBot" />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={fullTitle} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:creator" content="@khraii" />
        <meta name="twitter:site" content="@MyDiscordBot" />
        
        {/* Canonical */}
        <link rel="canonical" href={fullUrl} />
        
        {/* Alternate languages */}
        <link rel="alternate" hrefLang="fr" href={fullUrl.replace('/en/', '/fr/')} />
        <link rel="alternate" hrefLang="en" href={fullUrl.replace('/fr/', '/en/')} />
        <link rel="alternate" hrefLang="x-default" href={fullUrl.replace(/\/[a-z]{2}\//, '/')} />
        
        {/* Additional SEO meta tags */}
        <meta name="theme-color" content="#5865F2" />
        <meta name="msapplication-TileColor" content="#5865F2" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MyDiscordBot" />
        
        {/* Performance hints */}
        <link rel="preconnect" href="https://cdn.discordapp.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://analytics.google.com" />
      </Head>
      
      {/* Structured Data */}
      {faq && <FAQStructuredData faqs={faqData} />}
      {service && (
        <ServiceStructuredData
          name={service.name}
          description={service.description}
          provider={service.provider}
          areaServed={service.areaServed}
          serviceType={service.serviceType}
          offers={service.offers}
        />
      )}
      
      {children}
    </>
  );
}

// Hook pour générer automatiquement les métadonnées SEO
export function usePageSEO(pageData: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url: string;
  type?: 'website' | 'article' | 'product';
  locale?: string;
  noindex?: boolean;
  canonical?: string;
}) {
  return {
    title: pageData.title.includes('MyDiscordBot') ? pageData.title : `${pageData.title} | MyDiscordBot`,
    description: pageData.description,
    keywords: [
      'mydiscordbot',
      'bot discord',
      'création bot discord',
      'bot discord personnalisé',
      'discord bot maker',
      'discord bot creator',
      ...(pageData.keywords || [])
    ],
    image: pageData.image || 'https://mydiscordbot.com/img/bot.webp',
    url: pageData.canonical || pageData.url,
    type: pageData.type || 'website',
    locale: pageData.locale || 'fr',
    noindex: pageData.noindex || false
  };
}
