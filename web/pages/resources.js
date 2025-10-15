import DocumentHero from "../components/document/hero";
import ContentBlock from "../components/document/contentBlock";
import Layout from "./layout";
import { safeBackgroundImage } from "../utils/ssrHelpers";
import OpenSourceDetails from "../components/document/openSourceDetails";
import Footer from "../components/footer";
import PublicRoadmap from "../components/document/publicRoadmap";
import { createCustomGetStaticProps } from "../lib/getStaticProps";

export default function Resources({ docsPageData }) {
  const heroImage = docsPageData?.hero?.[0]?.backgroundimage?.url;

  // Extract SEO data from product page data
  const seoData = docsPageData?.seo;
  return (
    <Layout
      seoData={seoData}
      pageTitle="Wren AI | Documentation"
      pageDescription="Everything you need to install, customize, and scale Wren AI’s Agentic Analytics Platform — from self-hosting guides to release notes and our public roadmap.">
      <div className="max-w-7xl mx-auto">
        {/* Product Hero */}
        <div
          style={{
            backgroundImage: safeBackgroundImage(heroImage),
            WebkitBackgroundSize: "contain",
          }}
          className="bg-no-repeat py-16 max-w-7xl mx-auto bg-contain"
        >
        {docsPageData?.hero?.length && (
          <DocumentHero data={docsPageData?.hero} />
        )}
        {/* Content Block */}
        {docsPageData?.ContentBlock?.length && (
          <ContentBlock data={docsPageData?.ContentBlock} />
        )}
        </div>
      </div>
      {docsPageData?.openSourceProject?.length && (
        <OpenSourceDetails data={docsPageData?.openSourceProject} />
      )}
      {docsPageData?.publicRoadmap?.length && (
        <PublicRoadmap data={docsPageData?.publicRoadmap} />
      )}
      {/* Footer banner */}
      {docsPageData?.BottomContentBlock?.length && (
        <Footer data={docsPageData?.BottomContentBlock} />
      )}
    </Layout>
  );
}

// Static data loading function
export const getStaticProps = createCustomGetStaticProps("docs-page");
