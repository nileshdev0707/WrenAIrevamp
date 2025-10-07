/**
 * Common getStaticProps utility
 * Provides a standardized way to load static data for all pages
 */

const { getContentType } = require("./static-data-loader");

/**
 * Create getStaticProps function for any content type
 * @param {string} contentType - The Strapi content type to fetch
 * @param {object} options - Additional options
 * @returns {Function} getStaticProps function
 */
function createGetStaticProps(contentType, options = {}) {
  return async function getStaticProps() {
    try {
      // Get the data for the specified content type
      const data = getContentType(contentType);

      // Extract the actual data from Strapi response structure
      const pageData = data?.data?.attributes ?? data?.data ?? null;

      // Add any additional props
      const additionalProps = options.additionalProps || {};

      // Convert content type to camelCase for prop name
      const propName =
        contentType.replace(/-([a-z])/g, (g) => g[1].toUpperCase()) + "Data";

      return {
        props: {
          [propName]: pageData,
          serverLanguage: "en",
          ...additionalProps,
        },
        // Add revalidate if specified
        ...(options.revalidate && { revalidate: options.revalidate }),
      };
    } catch (error) {
      console.error(`Error loading ${contentType} data:`, error);
      // Convert content type to camelCase for prop name
      const propName =
        contentType.replace(/-([a-z])/g, (g) => g[1].toUpperCase()) + "Data";

      return {
        props: {
          [propName]: null,
          serverLanguage: "en",
        },
      };
    }
  };
}

/**
 * Create getStaticProps for home page
 */
function createHomePageGetStaticProps() {
  return createGetStaticProps("home-page", {
    additionalProps: {
      // Add any home page specific props here
    },
  });
}

/**
 * Create getStaticProps for navigation
 */
function createNavigationGetStaticProps() {
  return createGetStaticProps("navigation");
}

/**
 * Create getStaticProps for product page
 */
function createProductPageGetStaticProps() {
  return createGetStaticProps("product-page");
}

/**
 * Create getStaticProps for pricing
 */
function createPricingGetStaticProps() {
  return createGetStaticProps("pricing");
}

/**
 * Create getStaticProps for blog posts
 */
function createBlogPostsGetStaticProps() {
  return createGetStaticProps("blog-posts");
}

/**
 * Create getStaticProps for blog categories
 */
function createBlogCategoriesGetStaticProps() {
  return createGetStaticProps("blog-categories");
}

/**
 * Create getStaticProps for any content type
 */
function createCustomGetStaticProps(contentType, options = {}) {
  return createGetStaticProps(contentType, options);
}

module.exports = {
  createGetStaticProps,
  createHomePageGetStaticProps,
  createNavigationGetStaticProps,
  createProductPageGetStaticProps,
  createPricingGetStaticProps,
  createBlogPostsGetStaticProps,
  createBlogCategoriesGetStaticProps,
  createCustomGetStaticProps,
};
