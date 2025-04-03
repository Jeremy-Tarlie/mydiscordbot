const i18nextConfig = {
  locales: ["fr", "en"], // Langues disponibles
  defaultLocale: "fr", // Langue par défaut
  localePrefix: "always", // Définir comme un littéral TypeScript
  namespaces: [
    "home",
    "command",
    "command_finish",
    "404",
    "mention_legal",
    "navigation",
    "footer",
    "list_command"
  ],
  localePath: "./public/locale" // Chemin vers les fichiers de traduction
};

export default i18nextConfig;