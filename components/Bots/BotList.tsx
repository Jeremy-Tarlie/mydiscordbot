"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/Bots/Cards";
import style from "@/public/style/botList.module.css";

interface Bot {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface BotShowcaseProps {
  data: {
    nbr_bot_max?: number;
    bots?: Bot[];
  };
}

export const BotShowcase = ({ data }: BotShowcaseProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const botsPerPage = 6;

  // Get current page from URL query or default to 1
  const currentPage = parseInt(searchParams.get("page") || "1");

  // Calculate total pages based on data
  const totalBots = data?.nbr_bot_max || data?.bots?.length || 0;
  const totalPages = Math.ceil(totalBots / botsPerPage);

  // Get current bots to display
  const indexOfLastBot = currentPage * botsPerPage;
  const indexOfFirstBot = indexOfLastBot - botsPerPage;
  const currentBots =
    data?.bots?.slice(indexOfFirstBot, indexOfFirstBot + botsPerPage) || [];

  // Pagination handlers - Next.js App Router way
  const goToPage = (pageNumber: number) => {
    // Create new URLSearchParams
    const params = new URLSearchParams(searchParams.toString());
    // Set the page parameter
    params.set("page", pageNumber.toString());
    // Navigate with the updated search params
    router.push(`?${params.toString()}`);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Sample data for development/testing
  const sampleData = {
    nbr_bot_max: 24,
    bots: [
      {
        id: "1",
        title: "Customer Support Bot",
        description:
          "AI-powered assistant to handle customer inquiries and support tickets 24/7.",
        image: "/api/placeholder/300/200",
      },
      {
        id: "2",
        title: "Social Media Manager",
        description:
          "Automate your social media posting and engagement with this intelligent bot.",
        image: "/api/placeholder/300/200",
      },
      {
        id: "3",
        title: "Data Analysis Bot",
        description:
          "Process large datasets and generate insights automatically on schedule.",
        image: "/api/placeholder/300/200",
      },
      {
        id: "4",
        title: "Trading Bot",
        description:
          "Execute trading strategies based on market conditions and custom parameters.",
        image: "/api/placeholder/300/200",
      },
      {
        id: "5",
        title: "Content Creation Bot",
        description:
          "Generate blog posts, articles and marketing copy with AI assistance.",
        image: "/api/placeholder/300/200",
      },
      {
        id: "6",
        title: "Email Marketing Bot",
        description:
          "Schedule and optimize email campaigns with personalized content.",
        image: "/api/placeholder/300/200",
      },
      {
        id: "7",
        title: "Language Translation Bot",
        description:
          "Translate content between multiple languages with high accuracy.",
        image: "/api/placeholder/300/200",
      },
      {
        id: "8",
        title: "Research Assistant Bot",
        description:
          "Collect and summarize information from multiple sources automatically.",
        image: "/api/placeholder/300/200",
      },
    ],
  };

  // Use sample data if no data is provided (for development)
  const displayData = data || sampleData;
  const displayBots =
    currentBots.length > 0
      ? currentBots
      : (displayData.bots ?? []).slice(0, botsPerPage);

  return (
    <div className={style.main_content}>
      {/* Introduction section */}
      <section className={style.intro_section}>
        <h2 className={style.intro_section_title}>Automate Your Workflow</h2>
        <p className={style.intro_section_description}>
          Our bots are designed to handle repetitive tasks, process information,
          and help you focus on what matters most. Browse our collection and
          find the perfect automated assistant for your needs.
        </p>
      </section>

      {/* Bots grid */}
      <section>
        <h2 className={style.section_title}>Featured Bots</h2>
        <div className={style.bots_grid}>
          {displayBots.map((bot) => (
            <Card
              key={bot.id}
              id={bot.id}
              title={bot.title}
              description={bot.description}
              image={bot.image}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={style.pagination}>
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={style.pagination_button}
            >
              &laquo; Previous
            </button>

            <div className={style.pagination_numbers}>
              {/* Show first page */}
              {currentPage > 2 && (
                <button
                  onClick={() => goToPage(1)}
                  className={style.pagination_number}
                >
                  1
                </button>
              )}

              {/* Show ellipsis if needed */}
              {currentPage > 3 && (
                <span className={style.pagination_ellipsis}>...</span>
              )}

              {/* Show previous page if not first */}
              {currentPage > 1 && (
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  className={style.pagination_number}
                >
                  {currentPage - 1}
                </button>
              )}

              {/* Current page */}
              <button
                className={`${style.pagination_number} ${style.pagination_active}`}
              >
                {currentPage}
              </button>

              {/* Show next page if not last */}
              {currentPage < totalPages && (
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  className={style.pagination_number}
                >
                  {currentPage + 1}
                </button>
              )}

              {/* Show ellipsis if needed */}
              {currentPage < totalPages - 2 && (
                <span className={style.pagination_ellipsis}>...</span>
              )}

              {/* Show last page */}
              {currentPage < totalPages - 1 && (
                <button
                  onClick={() => goToPage(totalPages)}
                  className={style.pagination_number}
                >
                  {totalPages}
                </button>
              )}
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={style.pagination_button}
            >
              Next &raquo;
            </button>
          </div>
        )}
      </section>

      {/* Call to action */}
      <section className={style.call_to_action}>
        <h2 className={style.call_to_action_tittle}>Create Your Own Bot</h2>
        <p className={style.call_to_action_description}>
          {`Can't find what you're looking for? Build a custom bot tailored to your specific requirements.`}
        </p>
        <button className={style.call_to_action_button}>Start Building</button>
      </section>
    </div>
  );
};

export default BotShowcase;