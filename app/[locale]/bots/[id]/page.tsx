"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import style from "@/public/style/botDetail.module.css";
import { useTranslations } from "next-intl";

interface BotData {
  id: string;
  name: string;
  description: string;
  image: string;
  commands: { name: string; description: string }[];
  tags: string[];
  createdBy: string;
  servers: number;
  rating: number;
}

const BotDetailPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [botData, setBotData] = useState<BotData | null>(null);
  const t = useTranslations("bot_detail");

  useEffect(() => {
    const fetchBotData = async () => {
      try {
        // Récupérer l'ID du bot depuis l'URL
        const botId = params.id;

        // Dans un environnement réel, vous feriez un appel API ici
        // Par exemple: const response = await fetch(`/api/bots/${botId}`);

        // Simulons une réponse d'API pour l'exemple
        setTimeout(() => {
          // Données fictives pour un seul bot
          const mockBotData = {
            id: botId,
            name: "Customer Support Bot",
            description:
              "AI-powered assistant to handle customer inquiries and support tickets 24/7. This bot can automatically categorize issues, provide instant responses to common questions, and escalate complex problems to human agents when necessary.",
            image: "/api/placeholder/500/300",
            commands: [
              {
                name: "/help",
                description: "Affiche la liste des commandes disponibles",
              },
              {
                name: "/ticket",
                description: "Crée un nouveau ticket de support",
              },
              {
                name: "/faq",
                description: "Affiche les questions fréquemment posées",
              },
              {
                name: "/status",
                description: "Vérifie le statut d'un ticket existant",
              },
              {
                name: "/escalate",
                description: "Transfère le ticket à un agent humain",
              },
            ],
            tags: ["Support", "AI", "Automation", "Customer Service"],
          };

          setBotData(mockBotData as BotData);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError("Erreur lors du chargement des données du bot");
        console.log(err);
        setLoading(false);
      }
    };

    fetchBotData();
  }, [params.id]);

  if (loading) {
    return (
      <div className={style.main_content}>
        <div className={style.loading}>
          <div className={style.loading_spinner}></div>
          <p>{t("loading_spinner")}</p>
        </div>
      </div>
    );
  }

  if (error || !botData) {
    return (
      <div className={style.main_content}>
        <div className={style.error_container}>
          <h2 className={style.error_title}>Erreur</h2>
          <p className={style.error_message}>{error || t("error_message")}</p>
          <button
            className={style.back_button}
            onClick={() => window.history.back()}
          >
            {t("back_button")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={style.main_content}>
      <div className={style.bot_header}>
        <div className={style.bot_image_container}>
          <Image
            src={botData?.image || "/api/placeholder/500/300"}
            alt={botData?.name || "Bot Image"}
            width={500}
            height={300}
            className={style.bot_image}
          />
        </div>

        <div className={style.bot_info}>
          <h1 className={style.bot_name}>{botData?.name}</h1>

          <div className={style.bot_tags}>
            {botData?.tags?.map((tag, index) => (
              <span key={index} className={style.tag}>
                {tag}
              </span>
            ))}
          </div>

          <p className={style.bot_description}>{botData?.description}</p>

          <button className={style.invite_button}>
            {t("invite_button")}
          </button>
        </div>
      </div>

      <div className={style.bot_details_section}>
        <h2 className={style.section_title}>{t("commands_section_title")}</h2>
        <div className={style.commands_list}>
          {botData?.commands?.map((command, index) => (
            <div key={index} className={style.command_item}>
              <div className={style.command_name}>{command.name}</div>
              <div className={style.command_description}>
                {command.description}
              </div>
            </div>
          ))}
        </div>
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
              <p>
                {t("usage_step_2_description")}
              </p>
            </div>
          </div>

          <div className={style.step}>
            <div className={style.step_number}>3</div>
            <div className={style.step_content}>
              <h3>{t("usage_step_3_title")}</h3>
              <p>
                {t("usage_step_3_description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotDetailPage;
