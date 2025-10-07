import Hero from "../components/Hero";
import Logos from "../components/Logos";
import Capabilities from "../components/Capabilities";
import Work from "../components/Work";
import Stories from "../components/Stories";
import Stats from "../components/Stats";
import HomeCTA from "../components/homeCTA";
import Layout from "./layout";
import { safeBackgroundImage } from "../utils/ssrHelpers";

export default function Home({ homePageData }) {
  const heroImage = homePageData?.hero?.backgroundimage?.url;
  const hero = homePageData?.hero;
  const logos = Array.isArray(homePageData?.TrustedBy)
    ? homePageData.TrustedBy.map((l) => l?.attributes ?? l)
    : [];

  // Extract SEO data from home page data
  const seoData = homePageData?.seo;

  return (
    <Layout
      seoData={seoData}
      pageTitle="Wren AI | GenBI (Generative BI) & Embedded Analytics for Smarter Decisions"
      pageDescription="Turn plain‑language questions into SQL, charts, and insights. Empower your teams and SaaS customers with conversational analytics — secure, accurate, and instantly deployable."
    >
      <div
        style={{
          backgroundImage: safeBackgroundImage(heroImage),
          WebkitBackgroundSize: "100% 100%",
          backgroundPosition: "center bottom",
          backgroundColor: "rgba(255,255,255,0.4)", // white layer
          backgroundBlendMode: "lighten", // blend with image
        }}
        className="bg-cover bg-no-repeat"
      >
        <Hero data={hero} />
        <Logos items={logos} />
      </div>
      {homePageData?.coreCapabilities?.length > 0 && (
        <Capabilities data={homePageData?.coreCapabilities} />
      )}
      {homePageData && (
        <>
          <Work data={homePageData} />
          <Stories data={homePageData} />
          <Stats data={homePageData} />
          <HomeCTA data={homePageData?.getStartedWithWrenAI} />
        </>
      )}
    </Layout>
  );
}

// Static data loading function
const { createHomePageGetStaticProps } = require("../lib/getStaticProps");

export const getStaticProps = createHomePageGetStaticProps();
