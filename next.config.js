/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")("./i18n.ts");

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Désactive l'optimisation des images pour éviter les soucis de chargement
  },
  webpack: (config) => {
    return config; // Force l'utilisation de Webpack au lieu de Turbopack
  },
  env: {
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY, // Ajout de la variable d'environnement
  },
};

module.exports = withNextIntl(nextConfig);