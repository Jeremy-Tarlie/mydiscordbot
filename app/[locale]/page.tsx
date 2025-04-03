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
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{t("home_title")}</h1>
          <p className={styles.heroDescription}>{t("home_description")}</p>
          <Link href={`/${locale}/command`} className={styles.ctaButton}>
            {t("home_description_button")}
          </Link>
        </div>
        <div className={styles.heroImageContainer}>
          <Image
            src="/img/bot.webp"
            alt="Image hero"
            width={600}
            height={600}
            className={styles.heroImage}
            priority
          />
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>{t("features_title")}</h2>

        <div className={styles.featureCard}>
          <div className={styles.featureImageWrapper}>
            <Image
              src="/img/bot-view.svg"
              alt="Bot view"
              width={500}
              height={500}
              className={styles.featureImage}
            />
          </div>
          <div className={styles.featureContent}>
            <h3>{t("bubble1.title")}</h3>
            <p>{t("bubble1.description")}</p>
          </div>
        </div>

        <div className={`${styles.featureCard} ${styles.reverse}`}>
          <div className={styles.featureContent}>
            <h3>{t("bubble2.title")}</h3>
            <p>{t("bubble2.description")}</p>
          </div>
          <div className={styles.featureImageWrapper}>
            <Image
              src="/img/bot-chat.svg"
              alt="Bot chat"
              width={500}
              height={500}
              className={styles.featureImage}
            />
          </div>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.featureImageWrapper}>
            <Image
              src="/img/bot-command.svg"
              alt="Bot command"
              width={500}
              height={500}
              className={styles.featureImage}
            />
          </div>
          <div className={styles.featureContent}>
            <h3>{t("bubble3.title")}</h3>
            <p>{t("bubble3.description")}</p>
          </div>
        </div>
      </section>

      <section className={styles.callToAction}>
        <h2>{t("cta_title")}</h2>
        <p>{t("cta_description")}</p>
        <Link href={`/${locale}/command`} className={styles.ctaButton}>
          {t("home_description_button")}
        </Link>
      </section>
    </main>
  );
}
