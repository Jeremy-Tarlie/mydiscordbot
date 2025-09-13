import { Metadata } from 'next';
import { FAQStructuredData } from '@/components/seo/StructuredData';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { generateSEOMetadata } from '@/utils/seo';
import { faqData } from '@/data/faq';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  
  return generateSEOMetadata({
    title: 'FAQ - Questions Fréquentes',
    description: 'Trouvez les réponses à toutes vos questions sur MyDiscordBot. Comment créer un bot Discord, fonctionnalités disponibles, hébergement, et bien plus encore.',
    keywords: [
      'faq mydiscordbot',
      'questions fréquentes',
      'aide bot discord',
      'support mydiscordbot',
      'comment créer bot discord',
      'bot discord gratuit',
      'hébergement bot discord'
    ],
    url: `https://mydiscordbot.com/${locale}/faq`,
    type: 'website',
    locale,
    canonical: `https://mydiscordbot.com/${locale}/faq`
  });
}

export default async function FAQPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations('faq');

  return (
    <main className="faq-page">
      <div className="container">
        <Breadcrumbs 
          items={[
            { name: locale === 'fr' ? 'Accueil' : 'Home', url: `/${locale}` },
            { name: locale === 'fr' ? 'FAQ' : 'FAQ', url: `/${locale}/faq`, current: true }
          ]} 
        />
        
        <header className="faq-header">
          <h1 className="faq-title">
            {locale === 'fr' ? 'Questions Fréquentes' : 'Frequently Asked Questions'}
          </h1>
          <p className="faq-description">
            {locale === 'fr' 
              ? 'Trouvez les réponses à toutes vos questions sur MyDiscordBot et la création de bots Discord personnalisés.'
              : 'Find answers to all your questions about MyDiscordBot and creating custom Discord bots.'
            }
          </p>
        </header>

        <FAQStructuredData faqs={faqData} />

        <section className="faq-content">
          <div className="faq-grid">
            {faqData.map((faq, index) => (
              <div key={index} className="faq-item">
                <h2 className="faq-question" id={`faq-${index}`}>
                  {faq.question}
                </h2>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="faq-contact">
          <h2 className="contact-title">
            {locale === 'fr' ? 'Vous ne trouvez pas votre réponse ?' : "Can't find your answer?"}
          </h2>
          <p className="contact-description">
            {locale === 'fr' 
              ? 'Notre équipe de support est là pour vous aider. Contactez-nous via Discord ou par email.'
              : 'Our support team is here to help. Contact us via Discord or email.'
            }
          </p>
          <div className="contact-buttons">
            <a 
              href="https://discord.gg/bhfFEwpkBK" 
              className="contact-button discord"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={locale === 'fr' ? 'Rejoindre notre serveur Discord' : 'Join our Discord server'}
            >
              {locale === 'fr' ? 'Serveur Discord' : 'Discord Server'}
            </a>
            <a 
              href="mailto:support@mydiscordbot.com" 
              className="contact-button email"
              aria-label={locale === 'fr' ? 'Nous envoyer un email' : 'Send us an email'}
            >
              {locale === 'fr' ? 'Email Support' : 'Email Support'}
            </a>
          </div>
        </section>
      </div>

      <style jsx>{`
        .faq-page {
          min-height: 100vh;
          padding: 2rem 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .faq-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2F3136;
          margin-bottom: 1rem;
        }

        .faq-description {
          font-size: 1.125rem;
          color: #72767D;
          max-width: 600px;
          margin: 0 auto;
        }

        .faq-content {
          margin-bottom: 4rem;
        }

        .faq-grid {
          display: grid;
          gap: 2rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .faq-item {
          background: #fff;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
        }

        .faq-question {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2F3136;
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .faq-answer {
          color: #4b5563;
          line-height: 1.6;
        }

        .faq-answer p {
          margin: 0;
        }

        .faq-contact {
          text-align: center;
          background: linear-gradient(135deg, #5865F2 0%, #4752C4 100%);
          color: white;
          padding: 3rem 2rem;
          border-radius: 16px;
          margin-top: 4rem;
        }

        .contact-title {
          font-size: 1.875rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .contact-description {
          font-size: 1.125rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .contact-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .contact-button {
          display: inline-flex;
          align-items: center;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s ease;
          border: 2px solid transparent;
        }

        .contact-button.discord {
          background: #7289DA;
          color: white;
        }

        .contact-button.discord:hover {
          background: #5B6EBB;
          transform: translateY(-2px);
        }

        .contact-button.email {
          background: transparent;
          color: white;
          border-color: white;
        }

        .contact-button.email:hover {
          background: white;
          color: #5865F2;
        }

        @media (max-width: 768px) {
          .faq-title {
            font-size: 2rem;
          }

          .faq-item {
            padding: 1.5rem;
          }

          .contact-buttons {
            flex-direction: column;
            align-items: center;
          }

          .contact-button {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }
        }
      `}</style>
    </main>
  );
}
