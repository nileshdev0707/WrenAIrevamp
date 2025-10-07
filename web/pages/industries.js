import Layout from "./layout";
import { safeBackgroundImage } from "../utils/ssrHelpers";
import SolutionsIndustriesHero from "../components/solutionsIndustries/hero";
import ContentBlock from "../components/solutionsIndustries/contentBlock";
import Footer from "../components/footer";
import { useRouter } from "next/router";
import { createCustomGetStaticProps } from "../lib/getStaticProps";

export default function Industries({ solutionsIndustriesPageData }) {
  const heroImage =
    solutionsIndustriesPageData?.hero?.[0]?.backgroundImage?.url;
  const router = useRouter();
  const { tab } = router.query;

  // Extract SEO data from product page data
  const seoData = solutionsIndustriesPageData?.seo;

  return (
    <Layout
      seoData={seoData}
      pageTitle="Wren AI | GenBI Empowering Industries with AI-Driven Insights"
      pageDescription="Wren AI transforms data into actionable intelligence across industries with an open-source Generative Business Intelligence platform. Explore how we solve unique challenges for each sector.">
      <div className="max-w-6xl mx-auto">
        <div
          style={{
            backgroundImage: safeBackgroundImage(heroImage),
            WebkitBackgroundSize: "100%",
            backgroundPosition: "center top",
          }}
          className="bg-no-repeat pt-24 max-w-6xl mx-auto px-5"
        >
          {/* Solutions Industries Hero */}
          {solutionsIndustriesPageData?.hero?.length > 0 && (
            <SolutionsIndustriesHero
              solutionsIndustries={solutionsIndustriesPageData?.hero}
            />
          )}
        </div>
        {/* Solutions Industries Content Block */}
        {solutionsIndustriesPageData?.solutionIndustriesTab?.length > 0 && (
          <ContentBlock
            solutionsIndustries={
              solutionsIndustriesPageData?.solutionIndustriesTab
            }
            tab={tab}
          />
        )}
        {/* Solutions Industries Footer */}
        {solutionsIndustriesPageData?.bottomContentBlock?.length > 0 && (
          <Footer data={solutionsIndustriesPageData?.bottomContentBlock} />
        )}
      </div>
    </Layout>
  );
}

// Static data loading function
export const getStaticProps = createCustomGetStaticProps(
  "solutions-industries-page"
);
