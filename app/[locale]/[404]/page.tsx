import { useTranslations } from "next-intl";
import Image from "next/image";
import style from "@/public/style/404.module.css";
import Link from "next/link";

export default function LocalePage() {
  const t = useTranslations("404");

  return (
    <main className={style.container_error}>
      <Image
        src="/img/error-404.png"
        width={200}
        height={200}
        alt="error 404"
        className={style.img_404}
      />
      <p className={style.title}>{t("title")}</p>
      <p className={style.description}>{t("description")}</p>
      <Link href="/" className={style.link}>
        {t("back")}
      </Link>
    </main>
  );
}
