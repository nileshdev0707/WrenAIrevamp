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
 * Helper function for Server-Side Rendering data fetching
 * @param {Object} context - Next.js context object
 * @param {string} endpoint - API endpoint to fetch from
 * @returns {Object} Props object for the page
 */
export async function fetchPageData(context, endpoint) {
  const { req } = context;

  // Detect language from Accept-Language header or use default
  const acceptLanguage = req.headers["accept-language"] || "en";
  const detectedLang = acceptLanguage.startsWith("zh") ? "zh" : "en";

  try {
    const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;
    const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

    const api = axios.create({
      baseURL: STRAPI,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    const { data } = await api.get(
      `${endpoint}?populate=*&lang=${detectedLang}`
    );
    const pageData = data?.data?.attributes ?? data?.data ?? null;

    return {
      props: {
        data: pageData,
        serverLanguage: detectedLang,
      },
    };
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    return {
      props: {
        data: null,
        serverLanguage: detectedLang,
      },
    };
  }
}

/**
 * Create a standardized getServerSideProps function
 * @param {string} endpoint - API endpoint to fetch from
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
