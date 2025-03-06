import { useTranslations } from "next-intl";
import Link from "next/link";
import styles from "@/public/style/footer.module.css";

const Footer = () => {
  const t = useTranslations("footer");
  
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <h3>MyDiscordBot</h3>
            <p>© {new Date().getFullYear()} MyDiscordBot</p>
          </div>
          
          <div className={styles.footerLinks}>
            <Link href="/privacy-policy">
              {t("privacy")}
            </Link>
            <Link href="/privacy-policy">
              {t("terms")}
            </Link>
            <Link href="/privacy-policy">
              {t("contact")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;