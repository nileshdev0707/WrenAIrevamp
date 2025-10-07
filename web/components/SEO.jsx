import Head from 'next/head';

export default function SEO({ seoData, fallbackTitle = "Wren AI", fallbackDescription = "GenBI (Generative BI) & Embedded Analytics for Smarter Decisions" }) {
  // Handle both array format and direct object format
  const seo = Array.isArray(seoData) ? seoData[0] : seoData;
  
  // Extract SEO data with fallbacks
  const title = seo?.metaTitle || fallbackTitle;
  const description = seo?.metaDescription || fallbackDescription;
  const keywords = seo?.keywords;
  const robots = seo?.metaRobots;
  const viewport = seo?.metaViewport || "width=device-width, initial-scale=1";
  const canonicalURL = seo?.canonicalURL;
  const structuredData = seo?.structuredData;
  
  // Handle meta image
  const metaImage = seo?.metaImage || "https://capable-butterfly-84cab64826.media.strapiapp.com/OG_Website_be62e2caae.png";
  const imageUrl = metaImage?.url ? 
    (metaImage.url.startsWith('http') ? metaImage.url : `${process.env.NEXT_PUBLIC_STRAPI_URL || ''}${metaImage.url}`) 
    : null;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {robots && <meta name="robots" content={robots} />}
      <meta name="viewport" content={viewport} />
      
      {/* Canonical URL */}
      {canonicalURL && <link rel="canonical" href={canonicalURL} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {imageUrl && (
        <>
          <meta property="og:image" content={imageUrl} />
          <meta property="og:image:alt" content={metaImage?.alternativeText || title} />
          {metaImage?.width && <meta property="og:image:width" content={metaImage.width} />}
          {metaImage?.height && <meta property="og:image:height" content={metaImage.height} />}
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: typeof structuredData === 'string' ? structuredData : JSON.stringify(structuredData)
          }}
        />
      )}      
      {/* Favicon and App Icons */}
      <link rel="icon" href="/favicon_io/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
    </Head>
  );
}
