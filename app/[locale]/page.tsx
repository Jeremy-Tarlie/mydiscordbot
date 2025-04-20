"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import styles from "@/public/style/home.module.css";
import { useParams } from "next/navigation";

export default function HomePage() {
  const t = useTranslations("home");
  const params = useParams();
  const locale = params.locale as string;

  return (
    <main className={styles.main}>
      <section className={styles.hero} role="banner">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle} itemProp="headline">
            {t("home_title")}
          </h1>
          <p className={styles.heroDescription} itemProp="description">
            {t("home_description")}
          </p>
          <Link
            href={`/${locale}/bots`}
            className={styles.ctaButton}
            role="button"
            aria-label={t("home_description_button")}
          >
            {t("home_description_button")}
          </Link>
        </div>
        <div className={styles.heroImageContainer}>
          <Image
            src="/img/bot.webp"
            alt="Bot Discord personnalisé - Image d'illustration"
            width={600}
            height={600}
            className={styles.heroImage}
            priority
            loading="eager"
          />
        </div>
      </section>

      <h2 className={styles.sectionTitle} itemProp="about">
        {t("features_title")}
      </h2>
      <section
        className={styles.features}
        role="region"
        aria-label={t("features_title")}
      >
        <div
          className={styles.featureCard}
          itemScope
          itemType="http://schema.org/Service"
        >
          <div className={styles.featureImageWrapper}>
            <Image
              src="/img/bot-view.svg"
              alt="Interface de configuration du bot Discord"
              width={500}
              height={500}
              className={styles.featureImage}
            />
          </div>
          <div className={styles.featureContent}>
            <h3 itemProp="name">{t("bubble1.title")}</h3>
            <p itemProp="description">{t("bubble1.description")}</p>
          </div>
        </div>

        <div
          className={`${styles.featureCard} ${styles.reverse}`}
          itemScope
          itemType="http://schema.org/Service"
        >
          <div className={styles.featureContent}>
            <h3 itemProp="name">{t("bubble2.title")}</h3>
            <p itemProp="description">{t("bubble2.description")}</p>
          </div>
          <div className={styles.featureImageWrapper}>
            <Image
              src="/img/bot-chat.svg"
              alt="Interface de chat du bot Discord"
              width={500}
              height={500}
              className={styles.featureImage}
            />
          </div>
        </div>

        <div
          className={styles.featureCard}
          itemScope
          itemType="http://schema.org/Service"
        >
          <div className={styles.featureImageWrapper}>
            <Image
              src="/img/bot-command.svg"
              alt="Interface de commandes du bot Discord"
              width={500}
              height={500}
              className={styles.featureImage}
            />
          </div>
          <div className={styles.featureContent}>
            <h3 itemProp="name">{t("bubble3.title")}</h3>
            <p itemProp="description">{t("bubble3.description")}</p>
          </div>
        </div>
      </section>

      <section className={styles.callToAction} role="complementary">
        <h2 itemProp="offers">{t("cta_title")}</h2>
        <p>{t("cta_description")}</p>
        <Link
          href={`/${locale}/command`}
          className={styles.ctaButton}
          role="button"
          aria-label={t("home_description_button")}
        >
          {t("home_description_button")}
        </Link>
      </section>
    </main>
  );
}
