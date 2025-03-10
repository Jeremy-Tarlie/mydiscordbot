/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")("./i18n.ts");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["mydiscordbot.com"],
  },
  webpack: (config) => {
    return config; // Force l'utilisation de Webpack au lieu de Turbopack
  },
};

module.exports = withNextIntl(nextConfig);
