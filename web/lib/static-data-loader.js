/**
 * Static Data Loader
 * Loads data from the static JSON file instead of making API calls
 */

const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(
  process.cwd(),
  "public/static-data/all-content.json"
);

let cachedData = null;

/**
 * Load all static data
 */
function loadAllData() {
  if (cachedData) {
    return cachedData;
  }

  try {
    if (!fs.existsSync(DATA_FILE)) {
      console.warn(
        "Static data file not found. Run 'npm run fetch-data' first."
      );
      return {};
    }

    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    cachedData = data;
    return data;
  } catch (error) {
    console.error("Error loading static data:", error);
    return {};
  }
}

/**
 * Get data for a specific content type
 */
function getData(contentType) {
  const allData = loadAllData();

  // Handle the nested structure: allData.en[contentType] or allData.zh[contentType]
  // For now, default to 'en' locale
  const localeData = allData.en || allData.zh || {};
  return localeData[contentType] || { data: [] };
}

/**
 * Get home page data
 */
function getHomePage() {
  return getData("home-page");
}

/**
 * Get navigation data
 */
function getNavigation() {
  return getData("navigation");
}

/**
 * Get product page data
 */
function getProductPage() {
  return getData("product-page");
}

/**
 * Get pricing data
 */
function getPricing() {
  return getData("pricing");
}

/**
 * Get blog posts
 */
function getBlogPosts() {
  return getData("blog-posts");
}

/**
 * Get blog categories
 */
function getBlogCategories() {
  return getData("blog-categories");
}

/**
 * Get any content type data
 */
function getContentType(contentType) {
  return getData(contentType);
}

module.exports = {
  loadAllData,
  getData,
  getHomePage,
  getNavigation,
  getProductPage,
  getPricing,
  getBlogPosts,
  getBlogCategories,
  getContentType,
};
