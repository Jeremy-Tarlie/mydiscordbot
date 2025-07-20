"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import styles from "@/public/style/footer.module.css";
import { useParams } from 'next/navigation';

const Footer = () => {
  const t = useTranslations("footer");
  const params = useParams();
  const locale = params.locale as string;
  
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <h3>MyDiscordBot</h3>
            <p>© {new Date().getFullYear()} MyDiscordBot</p>
          </div>
          
          <div className={styles.footerLinks}>
            <Link href={`/${locale}/privacy-policy`}>
              {t("privacy")}
            </Link>
            <Link href={`/${locale}/privacy-policy`}>
              {t("terms")}
            </Link>
            <Link href={`/${locale}/cookie-policy`}>
              {t("cookies")}
            </Link>
            <Link href={`/${locale}/privacy-policy`}>
              {t("contact")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;