"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/Bots/Cards";
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

const BotList = ({ data }: BotListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const locale = params.locale as string;

  const t = useTranslations("bots");

  // Pagination handlers
  const goToPage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    router.push(`?${params.toString()}`);
  };

  const goToPreviousPage = () => {
    if (data.currentPage > 1) {
      goToPage(data.currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (data.currentPage < data.totalPages) {
      goToPage(data.currentPage + 1);
    }
  };

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
          {data.bots.map((bot) => (
            <Card
              key={bot.id}
              id={bot.id}
              title={bot.name}
              description={bot.description}
              image={bot.image}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className={style.pagination}>
          <button
            onClick={goToPreviousPage}
            disabled={data.currentPage === 1}
            className={style.pagination_button}
          >
            &laquo; {t("pagination_button_previous")}
          </button>

          <div className={style.pagination_numbers}>
            {/* Show first page */}
            {data.currentPage > 2 && (
              <button
                onClick={() => goToPage(1)}
                className={style.pagination_number}
              >
                1
              </button>
            )}

            {/* Show ellipsis if needed */}
            {data.currentPage > 3 && (
              <span className={style.pagination_ellipsis}>...</span>
            )}

            {/* Show previous page if not first */}
            {data.currentPage > 1 && (
              <button
                onClick={() => goToPage(data.currentPage - 1)}
                className={style.pagination_number}
              >
                {data.currentPage - 1}
              </button>
            )}

            {/* Current page */}
            <button
              className={`${style.pagination_number} ${style.pagination_active}`}
            >
              {data.currentPage}
            </button>

            {/* Show next page if not last */}
            {data.currentPage < data.totalPages && (
              <button
                onClick={() => goToPage(data.currentPage + 1)}
                className={style.pagination_number}
              >
                {data.currentPage + 1}
              </button>
            )}

            {/* Show ellipsis if needed */}
            {data.currentPage < data.totalPages - 2 && (
              <span className={style.pagination_ellipsis}>...</span>
            )}

            {/* Show last page */}
            {data.currentPage < data.totalPages - 1 && (
              <button
                onClick={() => goToPage(data.totalPages)}
                className={style.pagination_number}
              >
                {data.totalPages}
              </button>
            )}
          </div>

          <button
            onClick={goToNextPage}
            disabled={data.currentPage === data.totalPages}
            className={style.pagination_button}
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
        >
          {t("call_to_action_button")}
        </Link>
      </section>
    </div>
  );
};

export default BotList;
