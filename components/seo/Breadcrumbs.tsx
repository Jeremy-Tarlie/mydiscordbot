import Link from 'next/link';
import { BreadcrumbStructuredData } from './StructuredData';

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
        className={`breadcrumbs ${className}`}
        role="navigation"
      >
        <ol className="breadcrumb-list" itemScope itemType="https://schema.org/BreadcrumbList">
          {items.map((item, index) => (
            <li 
              key={index}
              className={`breadcrumb-item ${item.current ? 'current' : ''}`}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {item.current ? (
                <span 
                  className="breadcrumb-link current"
                  aria-current="page"
                  itemProp="name"
                >
                  {item.name}
                </span>
              ) : (
                <Link 
                  href={item.url}
                  className="breadcrumb-link"
                  itemProp="item"
                >
                  <span itemProp="name">{item.name}</span>
                </Link>
              )}
              <meta itemProp="position" content={String(index + 1)} />
              {index < items.length - 1 && (
                <span className="breadcrumb-separator" aria-hidden="true">
                  ›
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      
      <style jsx>{`
        .breadcrumbs {
          margin: 1rem 0;
          font-size: 0.875rem;
        }
        
        .breadcrumb-list {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 0.5rem;
        }
        
        .breadcrumb-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .breadcrumb-link {
          color: #5865F2;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        .breadcrumb-link:hover {
          color: #4752C4;
          text-decoration: underline;
        }
        
        .breadcrumb-link.current {
          color: #2F3136;
          font-weight: 500;
        }
        
        .breadcrumb-separator {
          color: #72767D;
          font-weight: bold;
        }
        
        @media (max-width: 768px) {
          .breadcrumbs {
            font-size: 0.75rem;
          }
          
          .breadcrumb-list {
            gap: 0.25rem;
          }
          
          .breadcrumb-item {
            gap: 0.25rem;
          }
        }
      `}</style>
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
