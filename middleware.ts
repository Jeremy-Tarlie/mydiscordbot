//middleware.ts
import createMiddleware from "next-intl/middleware";
import { localePrefix, locales, pathnames } from "./navigation";

// Middleware pour gérer les locales avec next-intl
export default createMiddleware({
  locales,
  localePrefix: localePrefix as any,
  defaultLocale: "fr", // Locale par défaut (à ajuster si nécessaire)
  pathnames, // Définir les chemins où ce middleware s'applique
});

console.log("localePrefix:", localePrefix);

// Ne s'applique qu'aux fichiers dans le répertoire 'app'
export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // Exclure les chemins d'API et les assets
};
