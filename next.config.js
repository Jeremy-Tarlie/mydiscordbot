const withNextIntl = require("next-intl/plugin")("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
  images: {
    unoptimized: true, // Désactive l'optimisation des images pour éviter les soucis de chargement
    domains: ['cdn.discordapp.com'],
  },
  
  // Désactiver les optimisations webpack problématiques
  experimental: {
    optimizeCss: false,
  },

  // Désactiver ESLint temporairement pour le build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withNextIntl(nextConfig);
