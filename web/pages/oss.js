import DevelopersHero from "../components/developers/hero";
import ContentBlock from "../components/developers/contentBlock";
import WrenEngine from "../components/developers/wrenEngine";
import WhyWrenAI from "../components/developers/whyWrenAI";
import Layout from "./layout";
import { safeBackgroundImage } from "../utils/ssrHelpers";
import { createCustomGetStaticProps } from "../lib/getStaticProps";

export default function OSS({ developersPageData }) {
  const heroImage = developersPageData?.hero?.[0]?.backgroundimage?.url;

  // Extract SEO data from product page data
  const seoData = developersPageData?.seo;

  return (
    <Layout
      seoData={seoData}
      pageTitle="Wren AI | #1 Generative BI Open-source Solution"
      pageDescription="Transform how your team explores data. Wren AI’s open-source GenBI platform lets you chat with your data, generate SQL, build charts, and create insights—all with natural language.">
      <div className="max-w-6xl mx-auto">
        <div
          style={{
            backgroundImage: safeBackgroundImage(heroImage),
            WebkitBackgroundSize: "100% 100%",
            backgroundPosition: "center top",
          }}
          className="bg-no-repeat pt-24 max-w-6xl mx-auto"
        >
          {/* Product Hero */}
          {developersPageData?.hero?.length && (
            <DevelopersHero data={developersPageData?.hero} />
          )}
        </div>
        {/* Content Block */}
        {developersPageData?.ContentBlock?.length && (
          <ContentBlock data={developersPageData?.ContentBlock} />
        )}
      </div>
      {developersPageData?.wrenEngine?.length && (
        <WrenEngine data={developersPageData?.wrenEngine} />
      )}
      {developersPageData?.whyWrenAI?.length && (
        <WhyWrenAI data={developersPageData?.whyWrenAI} />
      )}
    </Layout>
  );
}

// Static data loading function
export const getStaticProps = createCustomGetStaticProps("developers-page");
