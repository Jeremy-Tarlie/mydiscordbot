//i18n.ts
import { getRequestConfig, setRequestLocale } from "next-intl/server";
import i18nextConfig from "@/next-i18n.config";

const { defaultLocale, namespaces } = i18nextConfig;

// Cette fonction charge les messages pour un namespace donné
export async function getNSMessages({ ns }: { ns: string }) {
  const locale = setRequestLocale(defaultLocale); // ✅ On définit le locale ici
  console.log("locale:", locale);
  console.log("namespace:", ns);
  

  try {
    return (await import(`./public/locale/${locale}/${ns}.json`)).default;
  } catch (e) {
    console.error(e);
    // Si la localisation est introuvable, on charge la localisation par défaut
    return (await import(`./public/locale/${defaultLocale}/${ns}.json`)).default;
  }
}

// Configuration du serveur pour retourner les messages nécessaires
export default getRequestConfig(async () => {
  const locale = defaultLocale; // Locale par défaut

  const allMessages = await Promise.all(
    namespaces.map((ns) =>
      getNSMessages({ ns }).then((messages) => ({ ns, messages }))
    )
  );

  const messages = allMessages.reduce(
    (acc: any, cur: any) => ({ ...acc, [cur.ns]: cur.messages }),
    {}
  );

  return { locale, messages };
});
