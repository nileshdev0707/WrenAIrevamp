import axios from "axios";
import Navbar from "../components/Navbar";
import Capabilities from "../components/Capabilities";
import SiteFooter from "../components/SiteFooter";

export default function Product({ product, navigation }) {
  return (
    <div>
      <Navbar navigation={navigation} />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <section className="text-center">
          <div className="inline-block bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm">
            Product
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
            {product?.title || "Product"}
          </h1>
          <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
            {product?.summary}
          </p>
        </section>
        <div className="mt-10">
          <Capabilities
            data={{
              title: "What you get",
              subtitle: "",
              features: product?.features || [],
            }}
          />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export async function getStaticProps() {
  const STRAPI = process.env.STRAPI_URL
  const token = process.env.STRAPI_TOKEN;
  const api = axios.create({
    baseURL: STRAPI,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const [prodRes, navBundle] = await Promise.all([
    api
      .get("/api/product?populate=*")
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
