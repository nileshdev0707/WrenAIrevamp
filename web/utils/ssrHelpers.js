import axios from "axios";
import { base } from "../service/serviceConfig";

/**
 * Safely generates background image URL for SSR compatibility
 * @param {string} imageUrl - The image URL from API
 * @returns {string|undefined} - Safe background image URL or undefined
 */
export const safeBackgroundImage = (imageUrl) => {
  if (!imageUrl || typeof imageUrl !== "string") return undefined;
  const prefix = imageUrl.startsWith("http") ? "" : base;
  return `url(${prefix}${imageUrl})`;
};

/**
 * Safely generates image source URL for SSR compatibility
 * @param {string} imageUrl - The image URL from API
 * @returns {string|undefined} - Safe image source URL or undefined
 */
export const safeImageSrc = (imageUrl) => {
  if (!imageUrl || typeof imageUrl !== "string") return undefined;
  const prefix = imageUrl.startsWith("http") ? "" : base;
  return `${prefix}${imageUrl}`;
};

/**
 * Enhanced page style generator with background image support
 * @param {Object} options - Style options
 * @param {string} options.backgroundImage - Background image URL
 * @param {string} options.backgroundSize - Background size (default: '100%')
 * @param {string} options.backgroundPosition - Background position (default: 'center')
 * @param {string} options.backgroundRepeat - Background repeat (default: 'no-repeat')
 * @param {Object} options.additionalStyles - Additional CSS styles
 * @returns {Object} - Style object for React components
 */
export const createPageStyle = ({
  backgroundImage,
  backgroundSize = "100%",
  backgroundPosition = "center",
  backgroundRepeat = "no-repeat",
  additionalStyles = {},
}) => {
  const baseStyle = {
    backgroundSize,
    backgroundPosition,
    backgroundRepeat,
    ...additionalStyles,
  };

  if (backgroundImage) {
    baseStyle.backgroundImage = safeBackgroundImage(backgroundImage);
  }

  return baseStyle;
};

/**
 * Helper function for Server-Side Rendering data fetching from static files
 * @param {Object} context - Next.js context object
 * @param {string} endpoint - API endpoint to fetch from (e.g., 'home-page', 'navigation')
 * @returns {Object} Props object for the page
 */
export async function fetchPageData(context, endpoint) {
  const { locale, defaultLocale } = context;

  // Use Next.js i18n locale
  const selectedLang = locale || defaultLocale || "en";

  try {
    // Only run on server side
    if (typeof window !== "undefined") {
      console.warn("fetchPageData should only be called on the server side");
      return {
        props: {
          data: null,
          serverLanguage: selectedLang,
        },
      };
    }

    // Use the browser-compatible static data loader
    const { getContentTypeData } = await import(
      "../lib/static-data-browser.js"
      );

    // Clean the endpoint to remove API path if present
    const cleanEndpoint = endpoint.replace(/^\/api\//, "").replace(/^\//, "");

    // Get the data for the specified content type
    const data = await getContentTypeData(cleanEndpoint, selectedLang);

    // Extract the actual data from Strapi response structure
    const pageData = data?.data?.attributes ?? data?.data ?? null;

    return {
      props: {
        data: pageData,
        serverLanguage: selectedLang,
      },
    };
  } catch (error) {
    console.error(`Error loading static data from ${endpoint}:`, error);
    return {
      props: {
        data: null,
        serverLanguage: selectedLang,
      },
    };
  }
}

/**
 * Create a standardized getServerSideProps function for static data
 * @param {string} endpoint - Static data file name (e.g., 'home-page', 'navigation')
 * @param {string} propName - Name of the prop to pass to the component (default: 'data')
 * @returns {Function} getServerSideProps function
 */
export function createServerSideProps(endpoint, propName = "data") {
  return async function getServerSideProps(context) {
    const result = await fetchPageData(context, endpoint);

    // Rename the data prop if needed
    if (propName !== "data") {
      result.props[propName] = result.props.data;
      delete result.props.data;
    }

    return result;
  };
}
