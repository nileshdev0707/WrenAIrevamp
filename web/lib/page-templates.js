/**
 * Page Templates
 * Common templates for converting pages to use static data
 */

const { createGetStaticProps } = require("./getStaticProps");

/**
 * Template for converting a page to use static data
 *
 * Usage:
 * 1. Replace getServerSideProps with getStaticProps
 * 2. Import the appropriate getStaticProps function
 * 3. Update the component props to match the new data structure
 *
 * Example:
 *
 * // OLD (getServerSideProps):
 * export async function getServerSideProps(context) {
 *   // API calls here
 *   return { props: { data } };
 * }
 *
 * // NEW (getStaticProps):
 * const { createCustomGetStaticProps } = require("../lib/getStaticProps");
 * export const getStaticProps = createCustomGetStaticProps("your-content-type");
 *
 * // Update component props:
 * export default function YourPage({ yourContentTypeData }) {
 *   // Use yourContentTypeData instead of the old prop name
 * }
 */

/**
 * Common content types and their corresponding getStaticProps functions
 */
const contentTypeMappings = {
  "home-page": "createHomePageGetStaticProps",
  navigation: "createNavigationGetStaticProps",
  "product-page": "createProductPageGetStaticProps",
  pricing: "createPricingGetStaticProps",
  "blog-posts": "createBlogPostsGetStaticProps",
  "blog-categories": "createBlogCategoriesGetStaticProps",
};

/**
 * Get the appropriate getStaticProps function for a content type
 */
function getGetStaticPropsForContentType(contentType) {
  const mapping = contentTypeMappings[contentType];
  if (mapping) {
    return `const { ${mapping} } = require("../lib/getStaticProps");\nexport const getStaticProps = ${mapping}();`;
  } else {
    return `const { createCustomGetStaticProps } = require("../lib/getStaticProps");\nexport const getStaticProps = createCustomGetStaticProps("${contentType}");`;
  }
}

/**
 * Generate the prop name for a content type
 */
function getPropNameForContentType(contentType) {
  return `${contentType.replace("-", "")}Data`;
}

module.exports = {
  contentTypeMappings,
  getGetStaticPropsForContentType,
  getPropNameForContentType,
};

