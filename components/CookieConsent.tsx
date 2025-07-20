"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCookies } from "@/utils/useCookies";
import styles from "@/public/style/cookieConsent.module.css";

const CookieConsent = () => {
  const { consent, isLoaded, updateConsent } = useCookies();
  const params = useParams();
  const locale = params.locale as string;

  const acceptAll = () => {
    updateConsent("all");
  };

  const acceptEssential = () => {
    updateConsent("essential");
  };

  const decline = () => {
    updateConsent("declined");
  };

  // Ne pas afficher la bannière si le consentement a déjà été donné ou si le hook n'est pas encore chargé
  if (consent !== null || !isLoaded) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.banner}>
        <div className={styles.content}>
          <div className={styles.icon}>
            🍪
          </div>
          <div className={styles.text}>
            <h3>Nous utilisons des cookies</h3>
            <p>
              Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic 
              et personnaliser le contenu. En continuant à utiliser notre site, vous acceptez 
              notre utilisation des cookies.
            </p>
            <div className={styles.links}>
              <Link href={`/${locale}/cookie-policy`} className={styles.link}>
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
        
        <div className={styles.actions}>
          <button 
            onClick={decline} 
            className={`${styles.button} ${styles.decline}`}
          >
            Refuser
          </button>
          <button 
            onClick={acceptEssential} 
            className={`${styles.button} ${styles.essential}`}
          >
            Essentiels uniquement
          </button>
          <button 
            onClick={acceptAll} 
            className={`${styles.button} ${styles.accept}`}
          >
            Accepter tout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent; 