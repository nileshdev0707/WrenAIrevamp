import Navbar from "../components/Navbar";
import Script from 'next/script';
import SiteFooter from "../components/SiteFooter";
import SEO from "../components/SEO";

export default function Layout({
  children,
  seoData,
  pageTitle,
  pageDescription,
}) {
  const GA_ID = 'G-7V36KLWTSL';
  return (
    <>
      <SEO
        seoData={seoData}
        fallbackTitle={pageTitle}
        fallbackDescription={pageDescription}
      />
      <Script
        id="hs-script-loader"
        strategy="lazyOnload" // Use a loading strategy appropriate for your script
        src="//js-na2.hs-scripts.com/19644562.js"
        // 'async' and 'defer' are handled by the 'strategy' prop and are not needed here.
      />

      {/* 1. Rewardful Loader Function (Runs before page is interactive) */}
      <Script
        id="rewardful-loader"
        strategy="beforeInteractive" // Ensures the function is defined early
        dangerouslySetInnerHTML={{
          __html: `(function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');`,
        }}
      />

      {/* 2. Rewardful Main Script (Loads asynchronously) */}
      <Script
        id="rewardful-main"
        strategy="lazyOnload" // Use lazyOnload to prioritize page content
        src="https://r.wdfl.co/rw.js"
        data-rewardful="e1a414"
        data-domains="getwren.ai, cloud.getwren.ai"
        // 'async' is handled by the 'strategy' prop
      />
      
      {/* 1. Google Tag Manager (GTM) External Script */}
      <Script
        strategy="afterInteractive" // Loads after the page is interactive, good for analytics
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />

      {/* 2. Google Analytics Inline Configuration Script */}
      <Script
        id="google-analytics-config"
        strategy="afterInteractive" // Should run after the external script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_ID}');
          `,
        }}
      />
      <div className="max-h-screen h-full justify-between flex flex-col">
        <div>
          <Navbar />
          {children}
        </div>
        <SiteFooter />
      </div>
    </>
  );
}
