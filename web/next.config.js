/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: { unoptimized: true },
  i18n: {
    locales: ["en", "zh"],
    defaultLocale: "en",
    localeDetection: true,
  },
};
module.exports = nextConfig;
