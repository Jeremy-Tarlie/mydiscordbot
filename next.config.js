const withNextIntl = require("next-intl/plugin")("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Utiliser Turbopack au lieu de webpack
  turbopack: {
    // Configuration Turbopack
  },
  
  // Désactiver les optimisations webpack problématiques
  experimental: {
    optimizeCss: false,
  },
  
  // Configuration minimale pour les images
  images: {
    domains: ['cdn.discordapp.com'],
  },

  // Désactiver ESLint temporairement pour le build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withNextIntl(nextConfig);
