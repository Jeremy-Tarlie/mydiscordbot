"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/Bots/Cards";
import style from "@/public/style/botList.module.css";

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
        <h2 className={style.intro_section_title}>Automatisez votre workflow</h2>
        <p className={style.intro_section_description}>
          {`Nos bots sont conçus pour gérer les tâches répétitives, traiter l'information,
          et vous aider à vous concentrer sur l'essentiel. Parcourez notre collection et
          trouvez l'assistant automatisé parfait pour vos besoins.`}
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
            &laquo; Précédent
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
            Suivant &raquo;
          </button>
        </div>
      </section>

      {/* Call to action */}
      <section className={style.call_to_action}>
        <h2 className={style.call_to_action_title}>Créez votre propre bot</h2>
        <p className={style.call_to_action_description}>
          Vous ne trouvez pas ce que vous cherchez ? Construisez un bot personnalisé adapté à vos besoins spécifiques.
        </p>
        <button className={style.call_to_action_button}>Commencer la création</button>
      </section>
    </div>
  );
};

export default BotList;