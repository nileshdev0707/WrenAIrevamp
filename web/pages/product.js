import axios from "axios";
import ProductHero from "../components/product/productHero";
import WhatIsWrenAI from "../components/product/whatIsWrenAI";
import ContentBlock from "../components/product/contentBlock";
import WhyWrenSection from "../components/product/whyWrenSection";
import Footer from "../components/footer";
import { base } from "../service/serviceConfig";
import Layout from "./layout";

export default function Product({ product }) {
  const heroImage = product?.productHero?.[0]?.backgroundimage?.url;
  
  return (
   <Layout>
      <div className="max-w-6xl mx-auto px-6">
        <div
          style={{
            backgroundImage: `url(${
              heroImage?.startsWith("http") ? "" : base
            }${heroImage})`,
          }}
          className="bg-no-repeat pt-24 pb-10 max-w-6xl mx-auto bg-contain"
        >
          {/* Product Hero */}
          {product?.productHero?.length && (
            <ProductHero data={product?.productHero} />
          )}
         
         {/* What is Wren AI */}
         {product?.WhatIsWrenAI?.length && (
          <WhatIsWrenAI data={product?.WhatIsWrenAI} />
         )}
        </div>
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

export async function getStaticProps() {
  const STRAPI = process.env.STRAPI_URL;
  const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
  const api = axios.create({
    baseURL: STRAPI,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const [prodRes] = await Promise.all([
    api
      .get("/api/product-page?populate=*")
      .then((r) => r.data)
      .catch(() => null),
    ]);
  return {
    props: {
      product: prodRes?.data?.attributes ?? prodRes?.data ?? null,
    },
    revalidate: 10,
  };
}
