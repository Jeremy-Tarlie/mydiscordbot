import Link from 'next/link';
import { BreadcrumbStructuredData } from './StructuredData';
import styles from '@/public/style/breadcrumbs.module.css';

interface BreadcrumbItem {
  name: string;
  url: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <>
      <BreadcrumbStructuredData items={items} />
      <nav 
        aria-label="Fil d'Ariane" 
        className={`${styles.breadcrumbs} ${className}`}
        role="navigation"
      >
        <ol className={styles.breadcrumbList} itemScope itemType="https://schema.org/BreadcrumbList">
          {items.map((item, index) => (
            <li 
              key={index}
              className={`${styles.breadcrumbItem} ${item.current ? 'current' : ''}`}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {item.current ? (
                <span 
                  className={`${styles.breadcrumbLink} ${styles.current}`}
                  aria-current="page"
                  itemProp="name"
                >
                  {item.name}
                </span>
              ) : (
                <Link 
                  href={item.url}
                  className={styles.breadcrumbLink}
                  itemProp="item"
                >
                  <span itemProp="name">{item.name}</span>
                </Link>
              )}
              <meta itemProp="position" content={String(index + 1)} />
              {index < items.length - 1 && (
                <span className={styles.breadcrumbSeparator} aria-hidden="true">
                  ›
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

// Hook pour générer automatiquement les breadcrumbs
export function useBreadcrumbs(pathname: string, locale: string = 'fr') {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    {
      name: locale === 'fr' ? 'Accueil' : 'Home',
      url: `/${locale}`,
    }
  ];

  let currentPath = `/${locale}`;

  segments.forEach((segment, index) => {
    if (segment === locale) return; // Skip locale segment
    
    currentPath += `/${segment}`;
    
    let name = segment;
    
    // Traduire les segments connus
    switch (segment) {
      case 'bots':
        name = locale === 'fr' ? 'Bots' : 'Bots';
        break;
      case 'command':
        name = locale === 'fr' ? 'Créer un Bot' : 'Create Bot';
        break;
      case 'command_finish':
        name = locale === 'fr' ? 'Bot Créé' : 'Bot Created';
        break;
      case 'privacy-policy':
        name = locale === 'fr' ? 'Politique de Confidentialité' : 'Privacy Policy';
        break;
      default:
        // Si c'est un ID de bot, essayer de récupérer le nom
        if (segments[index - 1] === 'bots' && segment.match(/^[0-9]+$/)) {
          name = `Bot ${segment}`;
        }
        break;
    }

    breadcrumbs.push({
      name,
      url: currentPath,
      current: index === segments.length - 1
    });
  });

  return breadcrumbs;
}

