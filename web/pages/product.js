import ProductHero from "../components/product/productHero";
import WhatIsWrenAI from "../components/product/whatIsWrenAI";
import ContentBlock from "../components/product/contentBlock";
import WhyWrenSection from "../components/product/whyWrenSection";
import Footer from "../components/footer";
import { base } from "../service/serviceConfig";
import Layout from "./layout";
import { safeBackgroundImage } from "../utils/ssrHelpers";
import { createServerSideProps } from "../utils/ssrHelpers";

export default function Product({ product }) {
  const heroImage = product?.productHero?.[0]?.backgroundimage?.url;

  return (
    <Layout>
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
          <ContentBlock product={product?.ContentBlock} />
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
