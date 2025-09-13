import { ReactNode } from 'react';

interface StructuredDataProps {
  data: Record<string, unknown>;
  children?: ReactNode;
}

export function StructuredData({ data, children }: StructuredDataProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data),
        }}
      />
      {children}
    </>
  );
}

// Composant pour les données structurées de FAQ
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQStructuredDataProps {
  faqs: FAQItem[];
}

export function FAQStructuredData({ faqs }: FAQStructuredDataProps) {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return <StructuredData data={faqData} />;
}

// Composant pour les données structurées de Breadcrumb
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbStructuredDataProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredDataProps) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return <StructuredData data={breadcrumbData} />;
}

// Composant pour les données structurées d'Article/Blog
interface ArticleStructuredDataProps {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}

export function ArticleStructuredData({
  title,
  description,
  author,
  datePublished,
  dateModified,
  image,
  url
}: ArticleStructuredDataProps) {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    author: {
      "@type": "Person",
      name: author
    },
    publisher: {
      "@type": "Organization",
      name: "MyDiscordBot",
      logo: {
        "@type": "ImageObject",
        url: "https://mydiscordbot.com/logo.ico"
      }
    },
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    image: image || "https://mydiscordbot.com/img/bot.webp",
    url: url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    }
  };

  return <StructuredData data={articleData} />;
}

// Composant pour les données structurées de Service
interface ServiceStructuredDataProps {
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
}

export function ServiceStructuredData({
  name,
  description,
  provider,
  areaServed = "Worldwide",
  serviceType = "Discord Bot Development",
  offers = []
}: ServiceStructuredDataProps) {
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: name,
    description: description,
    provider: {
      "@type": "Organization",
      name: provider,
      url: "https://mydiscordbot.com"
    },
    areaServed: areaServed,
    serviceType: serviceType,
    hasOfferCatalog: offers.length > 0 ? {
      "@type": "OfferCatalog",
      name: `${name} Services`,
      itemListElement: offers.map(offer => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: offer.name
        },
        price: offer.price || "0",
        priceCurrency: offer.priceCurrency || "EUR"
      }))
    } : undefined
  };

  return <StructuredData data={serviceData} />;
}
