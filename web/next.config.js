/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: { unoptimized: true },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    localeDetection: false,
  },
  
  // Add the redirects function here
  async redirects() {
    return [
      {
        source: '/product',
        destination: '/genbi',
        permanent: true, // Use a permanent redirect (308 status code) for SEO
      },
      {
        source: '/embedded',
        destination: '/genbi',
        permanent: true, // Use a permanent redirect (308 status code) for SEO
      },
      {
        source: '/business-analytics',
        destination: '/genbi',
        permanent: true, // Use a permanent redirect (308 status code) for SEO
      },
      {
        source: '/product-analytics',
        destination: '/genbi',
        permanent: true, // Use a permanent redirect (308 status code) for SEO
      },
      {
        source: '/cs-analytics',
        destination: '/genbi',
        permanent: true, // Use a permanent redirect (308 status code) for SEO
      },
    ];
  },
};

module.exports = nextConfig;
