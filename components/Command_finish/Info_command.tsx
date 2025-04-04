import React from "react";
import style from "@/public/style/info_command.module.css";
import { useTranslations } from "next-intl";
import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";
import toast from "react-hot-toast";

type Bot = {
  bot_view: {
    name: string;
    img?: string;
    img_url?: string;
    host: string;
    description: string;
    comment: string;
    discord: string;
    email: string;
  };
  command?: Array<{ name: string; description: string; custom?: boolean }>;
  price: number;
};

const Info_command = ({
  bot,
  setBot,
}: {
  bot: Bot;
  setBot: React.Dispatch<React.SetStateAction<Bot>>;
}) => {
  const t = useTranslations("command_finish");
  const prefixe = "/";
  const [turnstileToken, setTurnstileToken] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
  
    // Vérifiez si le champ username est rempli
    if (username) {
      return; // Arrête l'exécution si le champ username est rempli
    }

    if (!bot.bot_view.discord || !bot.bot_view.email) {
      toast.error(t("error.fill_all_fields"));
      return;
    }

    if (!bot.command || bot.command.length === 0) {
      toast.error(t("error.select_commands"));
      return;
    }

    if (!turnstileToken) {
      toast.error("Veuillez valider le CAPTCHA.");
      return;
    }

    toast.loading(t("submitting"), { id: "submit" });

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...bot, recaptchaToken: turnstileToken }),
      });

      toast.dismiss("submit");

      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

      toast.success(t("success.success_submit"));
    } catch (error) {
      toast.error(t("error.error_submit"));
      console.error(error);
    }
  };

  

  return (
    <div className={style.info_commande}>
      <div className={style.info_card}>
        <div className={style.card_header}>
          <div className={style.header_icon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h2>{t("order_summary")}</h2>
        </div>

        <div className={style.card_content}>
          <div className={style.info_item}>
            <span className={style.info_label}>{t("bot_name")}</span>
            <span className={style.info_value}>
              {bot.bot_view.name || t("not_specified")}
            </span>
          </div>

          <div className={style.info_item}>
            <span className={style.info_label}>{t("commands_count")}</span>
            <span className={style.info_value}>
              <span className={style.count_badge}>
                {bot.command?.length || 0}
              </span>
            </span>
          </div>

          <div className={style.info_item}>
            <span className={style.info_label}>{t("hosting")}</span>
            <span className={style.info_value}>
              {bot.bot_view.host === "true" ? (
                <span className={style.host_badge_self}>{t("hosted")}</span>
              ) : (
                <span className={style.host_badge_service}>
                  {t("no_hosted")}
                </span>
              )}
            </span>
          </div>

          <div className={style.info_item}>
            <span className={style.info_label}>{t("prefixe")}</span>
            <span className={style.info_value}>
              <code className={style.prefix_code}>{prefixe}</code>
            </span>
          </div>

          <div className={style.price_info}>
            <span className={style.price_label}>{t("price")}</span>
            <div className={style.price_container}>
              <span className={style.price_value}>{bot.price} €</span>
              {bot.bot_view.host === "true" && (
                <span className={style.price_period}>{t("price_mounth")}</span>
              )}
            </div>
          </div>
        </div>

        <div className={style.tech_info}>
          <h3>
            <svg
              className={style.tech_icon}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z"
                fill="currentColor"
              />
            </svg>
            {t("technical_info")}
          </h3>
          <ul className={style.tech_list}>
            <li>{t("info.partie1")}</li>
            <li>{t("info.partie2")}</li>
            <li>{t("info.partie3")}</li>
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.form_header}>
          <svg
            className={style.contact_icon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
              fill="currentColor"
            />
          </svg>
          <h3>{t("contact_info")}</h3>
        </div>

        <div className={style.contact}>
          <div className={style.username_group}>
            <input
              type="text"
              id="username"
              name="username"
            />
          </div>
          <div className={style.form_group}>
            <label htmlFor="discord">
              Discord <span className="required">*</span>
            </label>
            <div className={style.input_container}>
              <div className={style.input_icon}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4C14.89 4.23 14.76 4.57 14.68 4.85C13.09 4.61 11.51 4.61 9.95 4.85C9.87 4.57 9.73 4.23 9.62 4C8.12 4.26 6.67 4.71 5.34 5.33C2.22 9.97 1.33 14.5 1.77 18.97C3.49 20.29 5.33 21 7.24 21.33C7.76 20.61 8.21 19.84 8.58 19.03C7.94 18.79 7.33 18.5 6.76 18.15C6.94 18.01 7.12 17.86 7.29 17.71C10.84 19.35 14.73 19.35 18.24 17.71C18.42 17.86 18.59 18.01 18.77 18.15C18.2 18.5 17.59 18.79 16.95 19.03C17.32 19.84 17.76 20.61 18.29 21.33C20.2 21 22.04 20.29 23.76 18.97C24.28 13.87 22.89 9.37 19.27 5.33ZM8.55 16.01C7.43 16.01 6.5 14.95 6.5 13.66C6.5 12.37 7.4 11.31 8.55 11.31C9.7 11.31 10.63 12.37 10.6 13.66C10.6 14.95 9.7 16.01 8.55 16.01ZM15.45 16.01C14.33 16.01 13.4 14.95 13.4 13.66C13.4 12.37 14.3 11.31 15.45 11.31C16.6 11.31 17.53 12.37 17.5 13.66C17.5 14.95 16.6 16.01 15.45 16.01Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="discord"
                name="discord"
                required
                placeholder="username"
                value={bot.bot_view.discord || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setBot((prevData: Bot) => ({
                    ...prevData,
                    bot_view: {
                      ...prevData.bot_view,
                      discord: e.target.value,
                    },
                  }));
                }}
              />
            </div>
          </div>

          <div className={style.form_group}>
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <div className={style.input_container}>
              <div className={style.input_icon}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="your.email@example.com"
                value={bot.bot_view.email || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setBot((prevData: Bot) => ({
                    ...prevData,
                    bot_view: {
                      ...prevData.bot_view,
                      email: e.target.value,
                    },
                  }));
                }}
              />
            </div>
          </div>
        </div>

        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""} // Clé publique Turnstile
          onSuccess={(token) => setTurnstileToken(token)} // Stocke le token
          onError={() => toast.error("Erreur CAPTCHA.")}
        />

        <div className={style.terms_container}>
          <input type="checkbox" id="terms" required />
          <label htmlFor="terms">{t("terms_agreement")}</label>
        </div>

        <button type="submit" className={style.submit_button}>
          <span>{t("finish")}</span>
          <svg
            className={style.button_icon}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Info_command;
