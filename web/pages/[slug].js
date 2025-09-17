import axios from "axios";
import CTA from "../components/CTA";
import Hero from "../components/Hero";
import FeatureShowcase from "../components/FeatureShowcase";
import Logos from "../components/Logos";
import Layout from "./layout";
export default function Page({ page, navigation }) {
  if (!page) return <div />;
  return (
    <Layout navigation={navigation}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold">{page.title}</h1>
        {page.content && (
          <div
            className="prose prose-slate mt-6"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        )}
        {Array.isArray(page.sections) &&
          page.sections.map((sec, i) => {
            if (sec.__component === "sections.hero-section") {
              return (
                <Hero
                  key={i}
                  data={{
                    badge: sec.badge,
                    headline: sec.title,
                    subheadline: sec.subtitle,
                    buttons: sec.buttons,
                    heroImage: sec.image,
                  }}
                />
              );
            }
            if (sec.__component === "sections.feature-grid") {
              return (
                <section key={i} className="mt-12">
                  <FeatureShowcase data={{ cards: sec.items }} />
                </section>
              );
            }
            if (sec.__component === "sections.logos-section") {
              return (
                <section key={i} className="mt-12">
                  <Logos items={[]} />
                </section>
              );
            }
            if (sec.__component === "sections.cta-section") {
              return (
                <section key={i} className="mt-12">
                  <CTA
                    data={{
                      title: sec.title,
                      primaryLabel: sec.primaryLabel,
                      primaryUrl: sec.primaryUrl,
                      secondaryLabel: sec.secondaryLabel,
                      secondaryUrl: sec.secondaryUrl,
                    }}
                  />
                </section>
              );
            }
            return null;
          })}
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const STRAPI = process.env.STRAPI_URL
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
  const STRAPI = process.env.STRAPI_URL
  const token = process.env.STRAPI_TOKEN;
  const api = axios.create({
    baseURL: STRAPI,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const [pageRes, navRes] = await Promise.all([
    api
      .get(
        `/api/pages?filters[slug][$eq]=${params.slug}&populate=sections.items,sections.buttons,sections.image`
      )
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
  const safePage = JSON.parse(JSON.stringify(pageData ?? null));
  return {
    props: {
      page: safePage,
      navigation: navRes?.data?.attributes ?? navRes?.data ?? null,
    },
    revalidate: 10,
  };
}
