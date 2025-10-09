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

/**
 * Create getStaticProps for blog pages that loads both blog page data and blog posts
 */
function createBlogGetStaticProps(options = {}) {
  return async function getStaticProps() {
    try {
      // Load blog page data using the standard pattern
      const blogPageData = getContentType("blog-page");
      const blogsData = getContentType("blogs");
      const categoriesData = getContentType("categories");

      // Extract the actual data from Strapi response structure
      const pageData =
        blogPageData?.data?.attributes ?? blogPageData?.data ?? null;
      const blogs = blogsData?.data || [];
      const categories = categoriesData?.data || [];

      // Build dynamic categories array
      const dynamicCategories = [
        { key: "all", label: "All", shortLabel: "All" },
        ...categories.map((cat) => {
          const name = cat.attributes?.name || cat.name;
          return {
            key: name,
            label: name,
            shortLabel: name?.substring(0, 8) || "Cat",
          };
        }),
      ];

      return {
        props: {
          blogPageData: pageData,
          initialBlogs: blogs,
          dynamicCategories,
          serverLanguage: "en",
          ...options.additionalProps,
        },
        // Add revalidate if specified
        ...(options.revalidate && { revalidate: options.revalidate }),
      };
    } catch (error) {
      console.error("Error loading blog data:", error);
      return {
        props: {
          blogPageData: null,
          initialBlogs: [],
          dynamicCategories: [],
          serverLanguage: "en",
          ...options.additionalProps,
        },
      };
    }
  };
}

/**
 * Create getStaticProps for dynamic routes (like [slug].js pages)
 * @param {string} contentType - The Strapi content type to fetch
 * @param {string} slugField - The field to match against params.slug (default: 'slug')
 * @param {object} options - Additional options
 * @returns {Function} getStaticProps function
 */
function createDynamicGetStaticProps(
  contentType,
  slugField = "slug",
  options = {}
) {
  return async function getStaticProps({ params, locale }) {
    try {
      const selectedLang = locale || "en";

      // Get the data for the specified content type
      const data = getContentType(contentType);
      const items = data?.data || [];

      // Find the specific item by slug
      const item = items.find(
        (item) =>
          item[slugField] === params.slug ||
          item.attributes?.[slugField] === params.slug
      );

      if (!item) {
        return {
          notFound: true,
        };
      }

      // Extract the actual data from Strapi response structure
      const itemData = item.attributes ?? item;

      // Add any additional props
      const additionalProps = options.additionalProps || {};

      // Convert content type to camelCase for prop name
      const propName =
        contentType.replace(/-([a-z])/g, (g) => g[1].toUpperCase()) + "Data";

      return {
        props: {
          [propName]: itemData,
          serverLanguage: selectedLang,
          ...additionalProps,
        },
        // No revalidation needed for static export
      };
    } catch (error) {
      console.error(`Error loading ${contentType} item:`, error);
      return {
        notFound: true,
      };
    }
  };
}

/**
 * Get blogs data from static files
 * @returns {Array} Array of blog posts
 */
function getBlogsData() {
  try {
    const blogsData = getContentType("blogs");
    return blogsData?.data || [];
  } catch (error) {
    console.error("Error loading blogs data:", error);
    return [];
  }
}

/**
 * Generate static paths for blog posts
 * @returns {Array} Array of blog paths for getStaticPaths
 */
function generateBlogPaths() {
  try {
    const blogs = getBlogsData();

    // Generate paths dynamically from actual blog data
    const blogPaths = blogs.map((blog) => {
      const slug = blog.slug || blog.attributes?.slug;
      return {
        params: { slug },
      };
    });

    return blogPaths;
  } catch (error) {
    console.error("Error generating blog paths:", error);
    return [];
  }
}

/**
 * Create getStaticPaths function for blog posts
 * @returns {Function} getStaticPaths function
 */
function createBlogGetStaticPaths() {
  return async function getStaticPaths() {
    try {
      // Generate paths dynamically from actual blog data
      const blogPaths = generateBlogPaths();

      return {
        paths: blogPaths,
        fallback: "blocking", // Allow dynamic generation for invalid slugs to redirect
      };
    } catch (error) {
      console.error("Error loading blog paths:", error);
      return {
        paths: [],
        fallback: false,
      };
    }
  };
}

/**
 * Create both getStaticProps and getStaticPaths for dynamic routes
 * @param {string} contentType - The Strapi content type to fetch
 * @param {string} slugField - The field to match against params.slug (default: 'slug')
 * @param {object} options - Additional options
 * @returns {Object} Object with getStaticProps and getStaticPaths functions
 */
function createDynamicRoute(contentType, slugField = "slug", options = {}) {
  return {
    getStaticProps: createDynamicGetStaticProps(
      contentType,
      slugField,
      options
    ),
    getStaticPaths: async function getStaticPaths() {
      try {
        const items = getContentType(contentType)?.data || [];
        const paths = items.map((item) => {
          const slug = item[slugField] || item.attributes?.[slugField];
          return { params: { slug } };
        });

        return {
          paths,
          fallback: false,
        };
      } catch (error) {
        console.error(`Error generating paths for ${contentType}:`, error);
        return {
          paths: [],
          fallback: false,
        };
      }
    },
  };
}

/**
 * Create getStaticProps for blog slug pages (dynamic routes)
 * @deprecated Use createDynamicGetStaticProps instead
 */
function createBlogsSlugGetStaticProps(options = {}) {
  return async function getStaticProps({ params, locale }) {
    try {
      const selectedLang = locale || "en";

      // Load blog posts and find the specific post
      const blogsData = getContentType("blogs");
      const blogPageData = getContentType("blog-page");

      const blogs = blogsData?.data || [];
      const post = blogs.find(
        (blog) =>
          blog.slug === params.slug || blog.attributes?.slug === params.slug
      );

      if (!post) {
        return {
          redirect: {
            destination: "/blog",
            permanent: false,
          },
        };
      }

      // Use manually selected related posts from Strapi
      const relatedPosts = post.relatedPosts || [];

      return {
        props: {
          post,
          relatedPosts,
          blogPageData:
            blogPageData?.data?.attributes ?? blogPageData?.data ?? null,
          serverLanguage: selectedLang,
          ...options.additionalProps,
        },
        // No revalidation needed for static export
      };
    } catch (error) {
      console.error("Error loading blog post:", error);
      return {
        redirect: {
          destination: "/blog",
          permanent: false,
        },
      };
    }
  };
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
  getContentType,
  createBlogGetStaticProps,
  createBlogsSlugGetStaticProps,
  createBlogGetStaticPaths,
  createDynamicRoute,
};
