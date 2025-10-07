/**
 * Browser-compatible static data loader
 * This version works in both server and browser environments
 */

/**
 * Load static data from the public directory
 * This works by making HTTP requests to the static files
 */
async function loadStaticDataFromPublic(locale = "en", endpoint) {
  try {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      // Browser environment - use relative path
      const dataUrl = `/static-data/locals/${locale}/${endpoint}.json`;
      console.log({dataUrl})
      console.log(`🔍 Loading static data from: ${dataUrl}`);

      const response = await fetch(dataUrl);
      console.log(`📡 Response status: ${response.status} for ${dataUrl}`);

      if (!response.ok) {
        console.warn(`⚠️ Static data file not found: ${dataUrl}`);
        return null;
      }

      const data = await response.json();
      console.log(`✅ Successfully loaded data for ${endpoint}`);
      return data;
    } else {
      // Server environment - use Node.js fs module
      const fs = await import("fs");
      const path = await import("path");

      const dataPath = path.join(
        process.cwd(),
        "public/static-data/locals",
        locale,
        `${endpoint}.json`
      );

      console.log(`🔍 Loading static data from: ${dataPath}`);

      if (!fs.existsSync(dataPath)) {
        console.warn(`⚠️ Static data file not found: ${dataPath}`);
        return null;
      }

      const fileContent = fs.readFileSync(dataPath, "utf8");
      const data = JSON.parse(fileContent);
      console.log(`✅ Successfully loaded data for ${endpoint}`);
      return data;
    }
  } catch (error) {
    console.error(`❌ Error loading static data from ${endpoint}:`, error);
    return null;
  }
}

/**
 * Get data for a specific content type
 * @param {string} contentType - The content type to fetch
 * @param {string} locale - The locale (default: 'en')
 * @returns {Object|null} The data for the content type
 */
export async function getContentTypeData(contentType, locale = "en") {
  const data = await loadStaticDataFromPublic(locale, contentType);

  if (!data) {
    return { data: [] };
  }

  return data;
}