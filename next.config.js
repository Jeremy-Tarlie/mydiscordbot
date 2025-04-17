/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")("./i18n.ts");

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Désactive l'optimisation des images pour éviter les soucis de chargement
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ne pas inclure zlib-sync dans le bundle client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "zlib-sync": false,
      };
    }
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
