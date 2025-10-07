/**
 * Static Data Library
 * Provides utilities for loading and accessing static data generated at build time
 */

const fs = require("fs");
const path = require("path");

const STATIC_DATA_DIR = path.join(process.cwd(), "public/static-data");

/**
 * Load static data for a specific locale
 */
function loadStaticData(locale = "en") {
  try {
    const dataPath = path.join(STATIC_DATA_DIR, `${locale}.json`);

    if (!fs.existsSync(dataPath)) {
      console.warn(`Static data not found for locale: ${locale}`);
      return null;
    }

    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    return data;
  } catch (error) {
    console.error(`Error loading static data for ${locale}:`, error);
    return null;
  }
}

/**
 * Load all static data
 */
function loadAllStaticData() {
  try {
    const dataPath = path.join(STATIC_DATA_DIR, "all-content.json");

    if (!fs.existsSync(dataPath)) {
      console.warn("Combined static data not found");
      return null;
    }

    const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    return data;
  } catch (error) {
    console.error("Error loading all static data:", error);
    return null;
  }
}

/**
 * Load static paths for dynamic routes
 */
function loadStaticPaths() {
  try {
    const pathsPath = path.join(STATIC_DATA_DIR, "static-paths.json");

    if (!fs.existsSync(pathsPath)) {
      console.warn("Static paths not found");
      return { pages: [], blog: [] };
    }

    const paths = JSON.parse(fs.readFileSync(pathsPath, "utf8"));
    return paths;
  } catch (error) {
    console.error("Error loading static paths:", error);
    return { pages: [], blog: [] };
  }
}

/**
 * Get page data by slug
 */
function getPageBySlug(slug, locale = "en") {
  const data = loadStaticData(locale);
  if (!data || !data.pages) return null;

  return data.pages.find((page) => {
    const pageSlug = page.attributes?.slug || page.slug;
    return pageSlug === slug;
  });
}

/**
 * Get blog post by slug
 */
function getBlogPostBySlug(slug, locale = "en") {
  const data = loadStaticData(locale);
  if (!data || !data.blog?.posts) return null;

  return data.blog.posts.find((post) => {
    const postSlug = post.attributes?.slug || post.slug;
    return postSlug === slug;
  });
}

/**
 * Get all blog posts for a locale
 */
function getAllBlogPosts(locale = "en") {
  const data = loadStaticData(locale);
  return data?.blog?.posts || [];
}

/**
 * Get blog categories for a locale
 */
function getBlogCategories(locale = "en") {
  const data = loadStaticData(locale);
  return data?.blog?.categories || [];
}

/**
 * Get navigation data for a locale
 */
function getNavigation(locale = "en") {
  const data = loadStaticData(locale);
  return data?.navigation || null;
}

/**
 * Get home page data for a locale
 */
function getHomePage(locale = "en") {
  const data = loadStaticData(locale);

  // Handle real Strapi data structure
  if (data?.["home-page"]?.data) {
    return data["home-page"].data;
  }

  // Handle mock data structure
  return data?.homePage || null;
}

/**
 * Get specific page type data (e.g., solutions-page, pricing, etc.)
 */
function getPageType(pageType, locale = "en") {
  const data = loadStaticData(locale);
  return data?.[pageType] || null;
}

/**
 * Check if static data exists
 */
function hasStaticData(locale = "en") {
  const dataPath = path.join(STATIC_DATA_DIR, `${locale}.json`);
  return fs.existsSync(dataPath);
}

/**
 * Get build info
 */
function getBuildInfo() {
  try {
    const buildInfoPath = path.join(STATIC_DATA_DIR, "build-info.json");

    if (!fs.existsSync(buildInfoPath)) {
      return null;
    }

    const buildInfo = JSON.parse(fs.readFileSync(buildInfoPath, "utf8"));
    return buildInfo;
  } catch (error) {
    console.error("Error loading build info:", error);
    return null;
  }
}

// CommonJS exports
module.exports = {
  loadStaticData,
  loadAllStaticData,
  loadStaticPaths,
  getPageBySlug,
  getBlogPostBySlug,
  getAllBlogPosts,
  getBlogCategories,
  getNavigation,
  getHomePage,
  getPageType,
  hasStaticData,
  getBuildInfo,
};
