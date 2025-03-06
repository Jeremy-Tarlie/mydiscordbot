/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")("./i18n.ts");

const path = require("path");

const nextConfig = {
  reactStrictMode: true,
 
};

module.exports = withNextIntl(nextConfig);
