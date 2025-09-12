import axios from "axios";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";

export default function Page({ page, navigation }) {
  if (!page) return <div />;
  return (
    <div>
      <Navbar navigation={navigation} />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold">{page.title}</h1>
        {page.content && (
          <div
            className="prose prose-slate mt-6"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

export async function getStaticPaths() {
  const STRAPI = process.env.STRAPI_URL || "http://localhost:1337";
  const token = process.env.STRAPI_TOKEN;
  const api = axios.create({
    baseURL: STRAPI,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const res = await api
    .get("/api/pages?fields=slug")
    .then((r) => r.data)
    .catch(() => null);
  const paths = Array.isArray(res?.data)
    ? res.data.map((p) => ({ params: { slug: p.attributes?.slug || p.slug } }))
    : [];
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const STRAPI = process.env.STRAPI_URL || "http://localhost:1337";
  const token = process.env.STRAPI_TOKEN;
  const api = axios.create({
    baseURL: STRAPI,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const [pageRes, navRes] = await Promise.all([
    api
      .get(`/api/pages?filters[slug][$eq]=${params.slug}`)
      .then((r) => r.data)
      .catch(() => null),
    api
      .get(`/api/navigation?populate=*`)
      .then((r) => r.data)
      .catch(() => null),
  ]);
  const pageData = Array.isArray(pageRes?.data)
    ? pageRes.data[0]?.attributes ?? pageRes.data[0]
    : null;
  return {
    props: {
      page: pageData,
      navigation: navRes?.data?.attributes ?? navRes?.data ?? null,
    },
    revalidate: 10,
  };
}
