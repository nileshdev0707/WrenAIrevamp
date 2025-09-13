import axios from "axios";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import ProductHero from "../components/product/productHero";
import WhatIsWrenAI from "../components/product/whatIsWrenAI";
import ContentBlock from "../components/product/contentBlock";
export default function Product({ product, navigation }) {
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || "";
  const heroImage = product?.productHero?.[0]?.backgroundimage?.url;
  console.log("product --------==> ", product);
  return (
    <div>
      <Navbar navigation={navigation} />
      <main className="max-w-6xl mx-auto px-6">
        <div
          style={{
            backgroundImage: `url(${
              heroImage?.startsWith("http") ? "" : base
            }${heroImage})`,
          }}
          className="bg-no-repeat pt-24 pb-10 max-w-6xl mx-auto"
        >
          {/* Product Hero */}
          {product?.productHero?.length && (
            <ProductHero product={product?.productHero?.[0]} />
          )}
         
         {/* What is Wren AI */}
         {product?.WhatIsWrenAI?.length && (
          <WhatIsWrenAI product={product?.WhatIsWrenAI?.[0]} />
         )}
        </div>
       {/* Content Block */}
       {product?.ContentBlock?.length && (
        <ContentBlock product={product?.ContentBlock} />
       )}
       
      </main>
      <SiteFooter />
    </div>
  );
}

export async function getStaticProps() {
  const STRAPI = process.env.STRAPI_URL;
  const token = process.env.STRAPI_TOKEN;
  const api = axios.create({
    baseURL: STRAPI,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const [prodRes, navBundle] = await Promise.all([
    api
      .get("/api/product-page?populate=*")
      .then((r) => r.data)
      .catch(() => null),
    Promise.all([
      api
        .get(`/api/navigation?populate=*`)
        .then((r) => r.data)
        .catch(() => null),
      api
        .get(`/api/pages?fields=slug,navLabel,title,showInNav,navOrder`)
        .then((r) => r.data)
        .catch(() => null),
    ]).then(([nav, pages]) => ({ nav, pages })),
  ]);
  return {
    props: {
      product: prodRes?.data?.attributes ?? prodRes?.data ?? null,
      navigation: {
        ...(navBundle?.nav?.data?.attributes ?? navBundle?.nav?.data ?? {}),
        pages: Array.isArray(navBundle?.pages?.data)
          ? navBundle.pages.data
              .map((p) => p.attributes ?? p)
              .filter((p) => p.showInNav)
              .sort((a, b) => (a.navOrder || 0) - (b.navOrder || 0))
          : [],
      },
    },
    revalidate: 10,
  };
}
