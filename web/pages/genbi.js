import ProductHero from "../components/product/productHero";
import WhatIsWrenAI from "../components/product/whatIsWrenAI";
import ContentBlock from "../components/product/contentBlock";
import WhyWrenSection from "../components/product/whyWrenSection";
import Footer from "../components/footer";
import { base } from "../service/serviceConfig";
import Layout from "./layout";
import { safeBackgroundImage } from "../utils/ssrHelpers";
const { createProductPageGetStaticProps } = require("../lib/getStaticProps");
import { useRouter } from "next/router";

export default function Product({ productPageData }) {
  const heroImage = productPageData?.productHero?.[0]?.backgroundimage?.url;
  const router = useRouter();
  const { tab } = router.query;

  // Extract SEO data from product page data
  const seoData = productPageData?.seo;

  return (
    <Layout
      seoData={seoData}
      pageTitle="Wren AI | The #1 Generative BI Platform"
      pageDescription="Wren AI transforms how teams query, analyze, and act on data — powered by Intelligent AI Modeling, agent-driven analytics, and enterprise-grade security. Get governed, explainable insights at the speed of thought."
    >
      <div className="max-w-6xl mx-auto">
        <div
          style={{
            backgroundImage: safeBackgroundImage(heroImage),
            WebkitBackgroundSize: "100% 100%",
            backgroundPosition: "center top",
          }}
          className="bg-no-repeat pt-24 max-w-6xl mx-auto bg-content"
        >
          {/* Product Hero */}
          {productPageData?.productHero?.length && (
            <ProductHero data={productPageData?.productHero} />
          )}
        </div>
        {/* What is Wren AI */}
        {productPageData?.WhatIsWrenAI?.length && (
          <WhatIsWrenAI data={productPageData?.WhatIsWrenAI} />
        )}
        {/* Content Block */}
        {productPageData?.ContentBlock?.length && (
          <ContentBlock product={productPageData?.ContentBlock} tab={tab} />
        )}
      </div>
      {/* Why Wren Section */}
      {productPageData?.WhyWrenSection?.length && (
        <WhyWrenSection data={productPageData?.WhyWrenSection} />
      )}
      {/* Footer */}
      {productPageData?.bottomContentBlock?.length && (
        <Footer data={productPageData?.bottomContentBlock} />
      )}
    </Layout>
  );
}

// Static data loading function
export const getStaticProps = createProductPageGetStaticProps();
