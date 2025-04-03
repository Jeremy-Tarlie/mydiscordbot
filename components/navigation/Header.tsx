"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/public/style/header.module.css";

interface HeaderProps {
  locale: string;
}

const Header: React.FC<HeaderProps> = ({ locale }) => {
  const router = useRouter();
  const t = useTranslations("navigation");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocale = event.target.value;
    router.push("/", { locale: selectedLocale });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link href={`/${locale}/`} className={styles.logoContainer}>
          <Image
            src="/img/bot-discord-logo.png"
            alt="My Discord Bot Logo"
            width={50}
            height={50}
            className={styles.logo}
          />
          <span className={styles.logoText}>MyDiscordBot</span>
        </Link>

        <button
          className={styles.mobileMenuButton}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}></span>
        </button>

        <nav className={`${styles.navigation} ${isMenuOpen ? styles.active : ''}`}>

          <div className={styles.languageSelector}>
            <label htmlFor="language-select">{t("language")}</label>
            <select
              id="language-select"
              onChange={handleChange}
              value={locale}
              className={styles.languageSelect}
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;