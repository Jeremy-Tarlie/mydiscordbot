import { useTranslations } from "next-intl";
import { Metadata } from "next";
import styles from "@/public/style/cookiePolicy.module.css";
import CookieSettings from "@/components/CookieSettings";

export const metadata: Metadata = {
  title: "Politique de Cookies",
  description: "Politique de cookies de MyDiscordBot - Découvrez comment nous utilisons les cookies sur notre site web.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiePolicy() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Politique de Cookies</h1>
        
        <div className={styles.section}>
          <h2>{`Qu'est-ce qu'un cookie ?`}</h2>
          <p>
            Un cookie est un petit fichier texte stocké sur votre ordinateur ou appareil mobile 
            lorsque vous visitez un site web. Les cookies sont largement utilisés pour faire 
            fonctionner les sites web ou les faire fonctionner plus efficacement, ainsi que pour 
            fournir des informations aux propriétaires du site.
          </p>
        </div>

        <div className={styles.section}>
          <h2>Comment utilisons-nous les cookies ?</h2>
          <p>
            MyDiscordBot utilise les cookies pour plusieurs raisons :
          </p>
          <ul>
            <li><strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site</li>
            <li><strong>Cookies de performance :</strong>{` Pour analyser l'utilisation du site et améliorer nos services`}</li>
            <li><strong>Cookies de fonctionnalité :</strong> Pour mémoriser vos préférences</li>
            <li><strong>Cookies de marketing :</strong> Pour vous proposer du contenu personnalisé</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>Types de cookies que nous utilisons</h2>
          
          <div className={styles.cookieType}>
            <h3>Cookies essentiels</h3>
            <p>
              Ces cookies sont nécessaires au fonctionnement du site web et ne peuvent pas être désactivés. 
              Ils ne stockent généralement aucune information personnelle identifiante.
            </p>
            <ul>
              <li>Cookies de sécurité pour protéger contre les attaques</li>
              <li>Cookies de préférences linguistiques</li>
            </ul>
          </div>

          <div className={styles.cookieType}>
            <h3>Cookies de performance</h3>
            <p>
              {`Ces cookies nous permettent de compter les visites et les sources de trafic afin de 
              mesurer et d'améliorer les performances de notre site.`}
            </p>
            <ul>
              <li>{`Google Analytics pour analyser l'utilisation du site`}</li>
              <li>Cookies de performance pour optimiser la vitesse de chargement</li>
            </ul>
          </div>

          <div className={styles.cookieType}>
            <h3>Cookies de fonctionnalité</h3>
            <p>
              Ces cookies permettent au site web de fournir des fonctionnalités et une personnalisation 
              améliorées.
            </p>
            <ul>
              <li>{`Préférences d'interface utilisateur`}</li>
              <li>Paramètres de langue et de région</li>
              <li>Historique des commandes</li>
            </ul>
          </div>

          <div className={styles.cookieType}>
            <h3>Cookies de marketing</h3>
            <p>
              Ces cookies peuvent être définis par nos partenaires publicitaires pour créer un profil 
              de vos intérêts et vous montrer des publicités pertinentes.
            </p>
            <ul>
              <li>Google Ads pour la publicité ciblée</li>
              <li>Cookies de réseaux sociaux pour le partage</li>
            </ul>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Gestion des cookies</h2>
          <p>
           {` Vous pouvez contrôler et/ou supprimer des cookies comme vous le souhaitez. 
            Vous pouvez supprimer tous les cookies déjà présents sur votre ordinateur et 
            configurer la plupart des navigateurs pour les empêcher d'en enregistrer.`}
          </p>
          <p>
            {`Cependant, cela peut vous obliger à ajuster manuellement certaines préférences 
            à chaque visite d'un site, et certains services et fonctionnalités peuvent ne pas fonctionner.`}
          </p>
        </div>

        <div className={styles.section}>
          <h2>Cookies tiers</h2>
          <p>
            {`En plus de nos propres cookies, nous pouvons également utiliser divers cookies 
            de tiers pour nous aider à analyser l'utilisation du site et à améliorer nos services :`}
          </p>
          <ul>
            <li><strong>Google Analytics :</strong>{` Pour analyser l'utilisation du site`}</li>
            <li><strong>Google Ads :</strong>{` Pour la publicité ciblée`}</li>
            <li><strong>Discord :</strong>{` Pour l'intégration avec Discord`}</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>Mise à jour de cette politique</h2>
          <p>
            Nous pouvons mettre à jour cette politique de cookies de temps à autre. 
            Nous vous encourageons à consulter régulièrement cette page pour rester 
            informé de la façon dont nous utilisons les cookies.
          </p>
          <p>
            <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>

        <div className={styles.section}>
          <h2>Gérer vos paramètres de cookies</h2>
          <p>
            Vous pouvez modifier vos préférences de cookies à tout moment en utilisant 
            le panneau de paramètres ci-dessous :
          </p>
          <div className={styles.settingsContainer}>
            <CookieSettings />
          </div>
        </div>

        <div className={styles.section}>
          <h2>Nous contacter</h2>
          <p>
            Si vous avez des questions concernant notre politique de cookies, 
            n&apos;hésitez pas à nous contacter :
          </p>
          <ul>
            <li>Email : contact@mydiscordbot.com</li>
            <li>Discord : discord.gg/bhfFEwpkBK</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 