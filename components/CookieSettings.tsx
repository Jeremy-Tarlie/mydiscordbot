"use client";
import { useState } from "react";
import { useCookies } from "@/utils/useCookies";
import styles from "@/public/style/cookieSettings.module.css";

const CookieSettings = () => {
  const { consent, updateConsent, resetConsent } = useCookies();
  const [showSettings, setShowSettings] = useState(false);

  const handleSaveSettings = () => {
    // Ici vous pouvez ajouter une logique pour sauvegarder les paramètres personnalisés
    setShowSettings(false);
  };

  const handleResetSettings = () => {
    resetConsent();
    setShowSettings(false);
  };

  return (
    <div className={styles.container}>
      <button 
        onClick={() => setShowSettings(!showSettings)}
        className={styles.toggleButton}
      >
        ⚙️ Paramètres des cookies
      </button>

      {showSettings && (
        <div className={styles.settingsPanel}>
          <div className={styles.header}>
            <h3>Paramètres des cookies</h3>
            <button 
              onClick={() => setShowSettings(false)}
              className={styles.closeButton}
            >
              ✕
            </button>
          </div>

          <div className={styles.section}>
            <div className={styles.cookieType}>
              <div className={styles.cookieInfo}>
                <h4>Cookies essentiels</h4>
                <p>Nécessaires au fonctionnement du site</p>
              </div>
              <div className={styles.toggle}>
                <input 
                  type="checkbox" 
                  checked={true} 
                  disabled 
                  className={styles.checkbox}
                />
                <span className={styles.slider}></span>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.cookieType}>
              <div className={styles.cookieInfo}>
                <h4>Cookies de performance</h4>
                <p>Pour analyser l&apos;utilisation du site et améliorer nos services</p>
              </div>
              <div className={styles.toggle}>
                <input 
                  type="checkbox" 
                  checked={consent === "all"}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateConsent("all");
                    } else {
                      updateConsent("essential");
                    }
                  }}
                  className={styles.checkbox}
                />
                <span className={styles.slider}></span>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.cookieType}>
              <div className={styles.cookieInfo}>
                <h4>Cookies de marketing</h4>
                <p>Pour vous proposer du contenu personnalisé</p>
              </div>
              <div className={styles.toggle}>
                <input 
                  type="checkbox" 
                  checked={consent === "all"}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateConsent("all");
                    } else {
                      updateConsent("essential");
                    }
                  }}
                  className={styles.checkbox}
                />
                <span className={styles.slider}></span>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button 
              onClick={handleResetSettings}
              className={`${styles.button} ${styles.reset}`}
            >
              Réinitialiser
            </button>
            <button 
              onClick={handleSaveSettings}
              className={`${styles.button} ${styles.save}`}
            >
              Sauvegarder
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookieSettings; 