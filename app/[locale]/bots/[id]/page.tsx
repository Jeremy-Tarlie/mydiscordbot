"use client";
import React, {
  Suspense,
  useEffect,
  useState,
  useTransition,
  cache,
} from "react";
import Image from "next/image";
import style from "@/public/style/botDetail.module.css";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
interface BotDetails {
  id: string;
  name: string;
  description: string;
  image: string;
  commands: Array<{
    name: string;
    description: string;
  }>;
  link: string;
  tags: string[];
  createdBy: string;
  servers: number;
  rating: number;
}

// Cache de la fonction de fetch
const fetchBotDetails = cache(async (botId: string) => {
  const res = await fetch(`/api/bots`, {
    method: "POST",
    body: JSON.stringify({ id: botId }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch bot details");
  }

  return res.json();
});


// Composant de chargement
function LoadingSpinner() {
  const t = useTranslations("bot_detail");
  return (
    <div className={style.loading}>
      <div className={style.loading_spinner}></div>
      <p>{t("loading_spinner")}</p>
    </div>
  );
}

// Composant d'erreur
function ErrorMessage() {
  const t = useTranslations("bot_detail");
  return (
    <div className={style.error_container}>
      <h2 className={style.error_title}>Erreur</h2>
      <p className={style.error_message}>{t("error_message")}</p>
      <button
        className={style.back_button}
        onClick={() => window.history.back()}
      >
        {t("back_button")}
      </button>
    </div>
  );
}

// Composant des commandes avec pagination
function CommandsList({
  commands,
}: {
  commands: Array<{ name: string; description: string }>;
}) {
  const [displayCount, setDisplayCount] = useState(10);
  const t = useTranslations("bot_detail");

  const showMore = () => {
    setDisplayCount((prev) => Math.min(prev + 10, commands.length));
  };

  return (
    <div className={style.commands_section}>
      <div className={style.commands_list}>
        {commands.slice(0, displayCount).map((command, index) => (
          <div key={index} className={style.command_item}>
            <div className={style.command_name}>{"/" + command.name}</div>
            <div className={style.command_description}>
              {command.description}
            </div>
          </div>
        ))}
      </div>

      {displayCount < commands.length && (
        <button onClick={showMore} className={style.show_more_button}>
          {t("show_more_commands")} ({commands.length - displayCount}{" "}
          {t("remaining")})
        </button>
      )}
    </div>
  );
}

// Composant des détails du bot
function BotDetailsContent({ botId }: { botId: string }) {
  const [botDetails, setBotDetails] = useState<BotDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("bot_detail");

  useEffect(() => {
    startTransition(async () => {
      try {
        const data = await fetchBotDetails(botId);
        setBotDetails(data);
      } catch (err) {
        console.error("Error fetching bot details:", err);
        setError("Une erreur est survenue");
      }
    });
  }, [botId]);

  const handleInvite = () => {
    if (botDetails) {
      window.open(botDetails?.link || "", "_blank");
    }
  };

  if (error) {
    return <ErrorMessage />;
  }

  if (!botDetails) {
    return null;
  }

  return (
    <div className={style.main_content}>
      <div className={style.bot_header}>
        <div className={style.bot_image_container}>
          <Image
            src={botDetails.image || "/api/placeholder/500/300"}
            alt={botDetails.name || "Bot Image"}
            width={500}
            height={300}
            className={style.bot_image}
          />
        </div>

        <div className={style.bot_info}>
          <h1 className={style.bot_name}>{botDetails.name}</h1>

          <div className={style.bot_tags}>
            {botDetails.tags?.map((tag, index) => (
              <span key={index} className={style.tag}>
                {tag}
              </span>
            ))}
          </div>

          <p className={style.bot_description}>{botDetails.description}</p>

          <button className={style.invite_button} onClick={handleInvite}>
            {t("invite_button")}
          </button>
        </div>
      </div>

      <div className={style.bot_details_section}>
        <h2 className={style.section_title}>{t("commands_section_title")}</h2>
        <CommandsList commands={botDetails.commands} />
      </div>

      <div className={style.bot_details_section}>
        <h2 className={style.section_title}>{t("usage_section_title")}</h2>
        <div className={style.usage_steps}>
          <div className={style.step}>
            <div className={style.step_number}>1</div>
            <div className={style.step_content}>
              <h3>{t("usage_step_1_title")}</h3>
              <p>{t("usage_step_1_description")}</p>
            </div>
          </div>

          <div className={style.step}>
            <div className={style.step_number}>2</div>
            <div className={style.step_content}>
              <h3>{t("usage_step_2_title")}</h3>
              <p>{t("usage_step_2_description")}</p>
            </div>
          </div>

          <div className={style.step}>
            <div className={style.step_number}>3</div>
            <div className={style.step_content}>
              <h3>{t("usage_step_3_title")}</h3>
              <p>{t("usage_step_3_description")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Page principale
export default function BotPage() {
  const { id } = useParams();
  return (
    <div className="bot-page-container">
      <Suspense fallback={<LoadingSpinner />}>
        <BotDetailsContent botId={id as string} />
      </Suspense>
    </div>
  );
}
