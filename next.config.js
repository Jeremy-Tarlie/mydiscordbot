/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")("./i18n.ts");

const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["mydiscordbot.com"],
  },
};

module.exports = withNextIntl(nextConfig);
