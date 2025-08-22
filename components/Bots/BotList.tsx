"use client";
import React, { useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Card from "@/components/Bots/Cards";
import style from "@/public/style/botList.module.css";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Bot {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface BotListProps {
  data: {
    bots: Bot[];
    currentPage: number;
    totalPages: number;
    total: number;
    botsPerPage: number;
  };
}

const BotList = React.memo(({ data }: BotListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = params.locale as string;

  const t = useTranslations("bots");

  // Mémoisation des fonctions de pagination pour éviter les re-renders
  const goToPage = useCallback((pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    router.push(`?${params.toString()}`);
  }, [searchParams, router]);

  const goToPreviousPage = useCallback(() => {
    if (data.currentPage > 1) {
      goToPage(data.currentPage - 1);
    }
  }, [data.currentPage, goToPage]);

  const goToNextPage = useCallback(() => {
    if (data.currentPage < data.totalPages) {
      goToPage(data.currentPage + 1);
    }
  }, [data.currentPage, data.totalPages, goToPage]);

  // Mémoisation des éléments de pagination
  const paginationElements = useMemo(() => {
    const elements = [];

    // Show first page
    if (data.currentPage > 2) {
      elements.push(
        <button
          key="first"
          onClick={() => goToPage(1)}
          className={style.pagination_number}
        >
          1
        </button>
      );
    }

    // Show ellipsis if needed
    if (data.currentPage > 3) {
      elements.push(
        <span key="ellipsis1" className={style.pagination_ellipsis}>
          ...
        </span>
      );
    }

    // Show previous page if not first
    if (data.currentPage > 1) {
      elements.push(
        <button
          key="prev"
          onClick={() => goToPage(data.currentPage - 1)}
          className={style.pagination_number}
        >
          {data.currentPage - 1}
        </button>
      );
    }

    // Current page
    elements.push(
      <button
        key="current"
        className={`${style.pagination_number} ${style.pagination_active}`}
      >
        {data.currentPage}
      </button>
    );

    // Show next page if not last
    if (data.currentPage < data.totalPages) {
      elements.push(
        <button
          key="next"
          onClick={() => goToPage(data.currentPage + 1)}
          className={style.pagination_number}
        >
          {data.currentPage + 1}
        </button>
      );
    }

    // Show ellipsis if needed
    if (data.currentPage < data.totalPages - 2) {
      elements.push(
        <span key="ellipsis2" className={style.pagination_ellipsis}>
          ...
        </span>
      );
    }

    // Show last page
    if (data.currentPage < data.totalPages - 1) {
      elements.push(
        <button
          key="last"
          onClick={() => goToPage(data.totalPages)}
          className={style.pagination_number}
        >
          {data.totalPages}
        </button>
      );
    }

    return elements;
  }, [data.currentPage, data.totalPages, goToPage]);

  // Mémoisation des bots pour éviter les re-renders inutiles
  const botCards = useMemo(() => {
    console.log(data);
    return data.bots.map((bot) => (
      <Card
        key={bot.id}
        id={bot.id}
        title={bot.name}
        description={bot.description}
        image={bot.image}
      />
    ));
  }, [data.bots]);

  return (
    <div className={style.main_content}>
      {/* Introduction section */}
      <section className={style.intro_section}>
        <h2 className={style.intro_section_title}>
          {t("intro_section_title")}
        </h2>
        <p className={style.intro_section_description}>
          {t("intro_section_description")}
        </p>
      </section>

      {/* Bots grid */}
      <section>
        <h2 className={style.section_title}>Bots en vedette</h2>
        <div className={style.bots_grid}>
          {botCards}
        </div>

        {/* Pagination optimisée */}
        <div className={style.pagination}>
          <button
            onClick={goToPreviousPage}
            disabled={data.currentPage === 1}
            className={style.pagination_button}
            aria-label={t("pagination_button_previous")}
          >
            &laquo; {t("pagination_button_previous")}
          </button>

          <div className={style.pagination_numbers}>
            {paginationElements}
          </div>

          <button
            onClick={goToNextPage}
            disabled={data.currentPage === data.totalPages}
            className={style.pagination_button}
            aria-label={t("pagination_button_next")}
          >
            {t("pagination_button_next")} &raquo;
          </button>
        </div>
      </section>

      {/* Call to action */}
      <section className={style.call_to_action}>
        <h2 className={style.call_to_action_title}>
          {t("call_to_action_title")}
        </h2>
        <p className={style.call_to_action_description}>
          {t("call_to_action_description")}
        </p>
        <Link
          href={`/${locale}/command`}
          className={style.call_to_action_button}
          prefetch={false} // Désactiver le prefetch pour améliorer les performances
        >
          {t("call_to_action_button")}
        </Link>
      </section>
    </div>
  );
});

BotList.displayName = 'BotList';

export default BotList;
