#!/usr/bin/env node

/**
 * Real Strapi Data Fetcher
 * Fetches all content from your Strapi CMS and saves it as static JSON files
 */

const fs = require("fs");
const path = require("path");
const axios = require("axios");

// Load environment variables from .env.local
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join("=").trim();
    }
  });
}

// Configuration
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
const OUTPUT_DIR = path.join(process.cwd(), "public/static-data");
const LOCALES = ["en", "zh"];

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Fetch data from Strapi API with proper error handling
 */
async function fetchFromStrapi(endpoint, params = {}) {
  try {
    const url = `${STRAPI_URL}/api/${endpoint}`;
    console.log(`📡 Fetching: ${url}`);

    const headers = {};
    // Only add auth header if token is provided and not empty
    if (STRAPI_TOKEN && STRAPI_TOKEN.trim() !== "") {
      headers.Authorization = `Bearer ${STRAPI_TOKEN}`;
    }

    const response = await axios.get(url, {
      headers,
      params: {
        populate: "*",
        ...params,
      },
      timeout: 30000, // 30 second timeout
    });

    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching ${endpoint}:`, error.message, error);
    return null;
  }
}

/**
 * Fetch all content types from Strapi and save as separate files
 */
async function fetchAllContent() {
  console.log("🚀 Starting real Strapi data fetch...");
  console.log(`📡 Strapi URL: ${STRAPI_URL}`);

  const allContent = {};

  // Define all the content types you want to fetch
  const contentTypes = [
    "home-page",
    "solutions-page",
    "pricing",
    "product-page",
    "contact-page",
    "developers-page",
    "docs-page",
    "privacy-policy-page",
    "terms-page",
    "sla-page",
    "request-page",
    "solutions-industries-page",
    "affiliate-program",
    "security-policy-page",
    "support-page",
    "blogs",
    "categories",
    "blog-page",
  ];

  for (const locale of LOCALES) {
    console.log(`\n📝 Fetching content for ${locale}...`);
    allContent[locale] = {};

    // Create locale-specific directory
    const localeDir = path.join(OUTPUT_DIR, "locals", locale);
    if (!fs.existsSync(localeDir)) {
      fs.mkdirSync(localeDir, { recursive: true });
    }

    for (const contentType of contentTypes) {
      try {
        const params = {
          "filters[locale][$eq]": locale,
          populate: "*",
        };

        // Add pagination for blogs to fetch all data
        if (contentType === "blogs") {
          params["pagination[page]"] = 1;
          params["pagination[pageSize]"] = 1000;
          params["sort"] = "publishedDate:desc";
        }

        const data = await fetchFromStrapi(contentType, params);

        if (data && data.data) {
          allContent[locale][contentType] = data;

          // Save individual content type file
          const contentTypeFile = path.join(localeDir, `${contentType}.json`);
          fs.writeFileSync(contentTypeFile, JSON.stringify(data, null, 2));

          console.log(
            `  ✅ ${contentType}: ${
              Array.isArray(data.data) ? data.data.length : 1
            } items → ${contentTypeFile}`
          );
        } else {
          console.log(`  ⚠️  ${contentType}: No data found`);
          allContent[locale][contentType] = { data: [] };

          // Save empty file for consistency
          const contentTypeFile = path.join(localeDir, `${contentType}.json`);
          fs.writeFileSync(
            contentTypeFile,
            JSON.stringify({ data: [] }, null, 2)
          );
        }
      } catch (error) {
        console.log(`  ❌ ${contentType}: Failed to fetch`);
        allContent[locale][contentType] = { data: [] };

        // Save empty file for consistency
        const contentTypeFile = path.join(localeDir, `${contentType}.json`);
        fs.writeFileSync(
          contentTypeFile,
          JSON.stringify({ data: [] }, null, 2)
        );
      }
    }

    // Add timestamp
    allContent[locale].timestamp = new Date().toISOString();
    allContent[locale].locale = locale;
  }

  return allContent;
}

/**
 * Generate static paths for dynamic routes
 */
function generateStaticPaths(allContent) {
  const paths = {
    pages: [],
    blog: [],
  };

  // Generate page paths
  Object.values(allContent).forEach((localeData) => {
    if (localeData.page && localeData.page.data) {
      localeData.page.data.forEach((page) => {
        const slug = page.attributes?.slug || page.slug;
        if (slug) {
          paths.pages.push({ params: { slug } });
        }
      });
    }

    // Generate blog paths
    if (localeData["blog-posts"] && localeData["blog-posts"].data) {
      localeData["blog-posts"].data.forEach((post) => {
        const slug = post.attributes?.slug || post.slug;
        if (slug) {
          paths.blog.push({ params: { slug } });
        }
      });
    }
  });

  return paths;
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log("🎯 Fetching real Strapi data...");

    if (!STRAPI_TOKEN || STRAPI_TOKEN.trim() === "") {
      console.log("📡 Fetching data without authentication (public access)");
    } else {
      console.log("🔑 Using Strapi authentication token");
    }

    // Fetch all content
    const allContent = await fetchAllContent();

    // Generate static paths
    const staticPaths = generateStaticPaths(allContent);

    // Save individual locale files (combined)
    for (const locale of LOCALES) {
      const localeFile = path.join(OUTPUT_DIR, `${locale}.json`);
      fs.writeFileSync(localeFile, JSON.stringify(allContent[locale], null, 2));
      console.log(`💾 Saved ${locale} combined data to ${localeFile}`);
    }

    // Save combined data
    const combinedFile = path.join(OUTPUT_DIR, "all-content.json");
    fs.writeFileSync(combinedFile, JSON.stringify(allContent, null, 2));
    console.log(`💾 Saved combined data to ${combinedFile}`);

    // Save static paths
    const pathsFile = path.join(OUTPUT_DIR, "static-paths.json");
    fs.writeFileSync(pathsFile, JSON.stringify(staticPaths, null, 2));
    console.log(`💾 Saved static paths to ${pathsFile}`);

    // Count individual files created
    let totalIndividualFiles = 0;
    for (const locale of LOCALES) {
      const localeDir = path.join(OUTPUT_DIR, "locals", locale);
      if (fs.existsSync(localeDir)) {
        const files = fs
          .readdirSync(localeDir)
          .filter((file) => file.endsWith(".json"));
        totalIndividualFiles += files.length;
      }
    }

    // Save build info
    const buildInfo = {
      timestamp: new Date().toISOString(),
      strapiUrl: STRAPI_URL,
      totalContentSize: JSON.stringify(allContent).length,
      mockData: false,
      locales: LOCALES,
      contentTypes: Object.keys(allContent[LOCALES[0]] || {}),
      staticPaths: {
        pages: staticPaths.pages.length,
        blog: staticPaths.blog.length,
      },
      individualFiles: {
        total: totalIndividualFiles,
        perLocale: LOCALES.map((locale) => {
          const localeDir = path.join(OUTPUT_DIR, "locals", locale);
          const count = fs.existsSync(localeDir)
            ? fs.readdirSync(localeDir).filter((file) => file.endsWith(".json"))
                .length
            : 0;
          return { locale, count };
        }),
      },
    };

    const buildInfoFile = path.join(OUTPUT_DIR, "build-info.json");
    fs.writeFileSync(buildInfoFile, JSON.stringify(buildInfo, null, 2));
    console.log(`💾 Saved build info to ${buildInfoFile}`);

    console.log("\n🎉 Real Strapi data fetch completed successfully!");
    console.log(`📁 All files saved to: ${OUTPUT_DIR}`);
    console.log(`📁 Individual files saved to: ${OUTPUT_DIR}/locals/`);
    console.log(
      `📊 Total content size: ${(
        buildInfo.totalContentSize /
        1024 /
        1024
      ).toFixed(2)} MB`
    );
    console.log(`🌐 Locales: ${LOCALES.join(", ")}`);
    console.log(`📄 Content types: ${buildInfo.contentTypes.length}`);
    console.log(`📄 Individual files created: ${totalIndividualFiles}`);
    console.log(
      `🔗 Static paths: ${staticPaths.pages.length} pages, ${staticPaths.blog.length} blog posts`
    );
  } catch (error) {
    console.error("💥 Real data fetch failed:", error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { fetchAllContent, generateStaticPaths };
