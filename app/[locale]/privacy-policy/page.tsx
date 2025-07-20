import { useTranslations } from "next-intl";
import style from "@/public/style/mention_legal.module.css";

export default function MentionLegalPage() {
  const t = useTranslations("mention_legal");

  return (
    <main className={style.container_mention_legal}>
      <section>
        <h2>{t("editor.title")}</h2>
        <ul>
          <li>
            <strong>{t("editor.nameOrPseudonymTitle")}</strong>{" "}
            {t("editor.nameOrPseudonym")}
          </li>
          <li>
            <strong>{t("editor.emailTitle")}</strong>{" "}
            <a href="mailto:command@mydiscordbot.com">{t("editor.email")}</a>
          </li>
          <li>
            <strong>{t("editor.contactDiscordTitle")}</strong>{" "}
            {t("editor.contactDiscord")}
          </li>
          <li>
            <strong>{t("editor.statusTitle")}</strong>{" "}
            {t("editor.status")}
          </li>
          <li><strong>SIRET :</strong> 944 788 330 00016</li>
        </ul>
      </section>

      <section>
        <h2>{t("activity.title")}</h2>
        <p>
          {t("activity.description.partie1")}{" "}
          <strong>{t("activity.description.partie2")}</strong>{" "}
          {t("activity.description.partie3")}{" "}
          <strong>{t("activity.description.partie4")}</strong>{" "}
          {t("activity.description.partie5")}
        </p>
        <ul>
          <li>
            <strong>{t("activity.conditions.commande.condition")}</strong>{" "}
            {t("activity.conditions.commande.details")}
          </li>
          <li>
            <strong>{t("activity.conditions.paiement.condition")}</strong>{" "}
            {t("activity.conditions.paiement.details")}
          </li>
          <li>
            <strong>{t("activity.conditions.hebergement.condition")}</strong>{" "}
            {t("activity.conditions.hebergement.details")}
            <strong>{t("activity.conditions.hebergement.between")}</strong>{" "}
            {t("activity.conditions.hebergement.mounth")}
          </li>
          <li>
            <strong>{t("activity.conditions.suspension.condition")}</strong>{" "}
            {t("activity.conditions.suspension.details")}
          </li>
        </ul>
      </section>

      <section>
        <h2>{t("privacyPolicy.title")}</h2>
        <p>
          {t("privacyPolicy.description.partie1")}{" "}
          <strong>{t("privacyPolicy.description.partie2")} </strong>
          {t("privacyPolicy.description.partie3")}
        </p>
        <h3>{t("privacyPolicy.dataCollected.title")}</h3>
        <ul>
          <li>{t("privacyPolicy.dataCollected.items.name")}</li>
          <li>{t("privacyPolicy.dataCollected.items.email")}</li>
          <li>{t("privacyPolicy.dataCollected.items.discord")}</li>
          <li>{t("privacyPolicy.dataCollected.items.paypal")}</li>
        </ul>
        <h3>{t("privacyPolicy.purpose.title")}</h3>
        <p>{t("privacyPolicy.purpose.description")}</p>
        <ul>
          <li>{t("privacyPolicy.purpose.items.commandes")}</li>
          <li>{t("privacyPolicy.purpose.items.facturation")}</li>
          <li>{t("privacyPolicy.purpose.items.communication")}</li>
        </ul>
        <h3>{t("privacyPolicy.yourRights.title")}</h3>
        <p>{t("privacyPolicy.yourRights.description")}</p>
        <ul>
          <li>
            <strong>{t("privacyPolicy.yourRights.rights.acces.name")}</strong>{" "}
            {t("privacyPolicy.yourRights.rights.acces.details")}
          </li>
          <li>
            <strong>
              {t("privacyPolicy.yourRights.rights.rectification.name")}
            </strong>{" "}
            {t("privacyPolicy.yourRights.rights.rectification.details")}
          </li>
          <li>
            <strong>
              {t("privacyPolicy.yourRights.rights.effacement.name")}
            </strong>{" "}
            {t("privacyPolicy.yourRights.rights.effacement.details")}
          </li>
          <li>
            <strong>
              {t("privacyPolicy.yourRights.rights.opposition.name")}
            </strong>{" "}
            {t("privacyPolicy.yourRights.rights.opposition.details")}
          </li>
        </ul>
        <p>
          {t("privacyPolicy.contact.title")}{" "}
          <a href="mailto:command@mydiscordbot.com">
            {t("privacyPolicy.contact.email")}
          </a>{" "}
          {t("privacyPolicy.contact.or")} {t("privacyPolicy.contact.discord")}
        </p>
      </section>

      <section>
        <h2>{t("disputes.title")}</h2>
        <p>{t("disputes.description")}</p>
      </section>
    </main>
  );
}