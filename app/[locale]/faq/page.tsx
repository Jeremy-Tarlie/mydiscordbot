import { Metadata } from 'next';
import { FAQStructuredData } from '@/components/seo/StructuredData';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { generateSEOMetadata } from '@/utils/seo';
import { faqData } from '@/data/faq';
import { getTranslations } from 'next-intl/server';
import styles from '@/public/style/faq.module.css';

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
    <main className={styles.faqPage}>
      <div className={styles.container}>
        <Breadcrumbs 
          items={[
            { name: locale === 'fr' ? 'Accueil' : 'Home', url: `/${locale}` },
            { name: locale === 'fr' ? 'FAQ' : 'FAQ', url: `/${locale}/faq`, current: true }
          ]} 
        />
        
        <header className={styles.faqHeader}>
          <h1 className={styles.faqTitle}>
            {locale === 'fr' ? 'Questions Fréquentes' : 'Frequently Asked Questions'}
          </h1>
          <p className={styles.faqDescription}>
            {locale === 'fr' 
              ? 'Trouvez les réponses à toutes vos questions sur MyDiscordBot et la création de bots Discord personnalisés.'
              : 'Find answers to all your questions about MyDiscordBot and creating custom Discord bots.'
            }
          </p>
        </header>

        <FAQStructuredData faqs={faqData} />

        <section className={styles.faqContent}>
          <div className={styles.faqGrid}>
            {faqData.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <h2 className={styles.faqQuestion} id={`faq-${index}`}>
                  {faq.question}
                </h2>
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.faqContact}>
          <h2 className={styles.contactTitle}>
            {locale === 'fr' ? 'Vous ne trouvez pas votre réponse ?' : "Can't find your answer?"}
          </h2>
          <p className={styles.contactDescription}>
            {locale === 'fr' 
              ? 'Notre équipe de support est là pour vous aider. Contactez-nous via Discord ou par email.'
              : 'Our support team is here to help. Contact us via Discord or email.'
            }
          </p>
          <div className={styles.contactButtons}>
            <a 
              href="https://discord.gg/bhfFEwpkBK" 
              className={`${styles.contactButton} ${styles.discord}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={locale === 'fr' ? 'Rejoindre notre serveur Discord' : 'Join our Discord server'}
            >
              {locale === 'fr' ? 'Serveur Discord' : 'Discord Server'}
            </a>
            <a 
              href="mailto:support@mydiscordbot.com" 
              className={`${styles.contactButton} ${styles.email}`}
              aria-label={locale === 'fr' ? 'Nous envoyer un email' : 'Send us an email'}
            >
              {locale === 'fr' ? 'Email Support' : 'Email Support'}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

