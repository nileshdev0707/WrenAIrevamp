import ProductHero from "../components/product/productHero";
import WhatIsWrenAI from "../components/product/whatIsWrenAI";
import ContentBlock from "../components/product/contentBlock";
import WhyWrenSection from "../components/product/whyWrenSection";
import Footer from "../components/footer";
import { base } from "../service/serviceConfig";
import Layout from "./layout";
import { safeBackgroundImage } from "../utils/ssrHelpers";
import { createServerSideProps } from "../utils/ssrHelpers";
import { useRouter } from "next/router";

export default function Product({ product }) {
  const heroImage = product?.productHero?.[0]?.backgroundimage?.url;
  const router = useRouter();
  const { tab } = router.query

  // Extract SEO data from product page data
  const seoData = product?.seo;

  return (
    <Layout
      seoData={seoData}
      pageTitle="Product - Wren AI"
      pageDescription="Discover Wren AI's powerful features and capabilities for data analytics and business intelligence."
    >
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
          {product?.productHero?.length && (
            <ProductHero data={product?.productHero} />
          )}
        </div>
        {/* What is Wren AI */}
        {product?.WhatIsWrenAI?.length && (
          <WhatIsWrenAI data={product?.WhatIsWrenAI} />
        )}
        {/* Content Block */}
        {product?.ContentBlock?.length && (
          <ContentBlock product={product?.ContentBlock} tab={tab} />
        )}
      </div>
      {/* Why Wren Section */}
      {product?.WhyWrenSection?.length && (
        <WhyWrenSection data={product?.WhyWrenSection} />
      )}
      {/* Footer */}
      {product?.bottomContentBlock?.length && (
        <Footer data={product?.bottomContentBlock} />
      )}
    </Layout>
  );
}

// Server-side rendering function
export const getServerSideProps = createServerSideProps(
  "/api/product-page",
  "product"
);
