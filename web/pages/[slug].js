import axios from "axios";
import ReactMarkdown from "react-markdown";
import CTA from "../components/CTA";
import Hero from "../components/Hero";
import FeatureShowcase from "../components/FeatureShowcase";
import Logos from "../components/Logos";
import Layout from "./layout";
export default function Page({ page }) {
  if (!page) return {notFound: true};

  // Extract SEO data from page sections
  const seoData = page.sections?.find(
    (section) => section.__component === "shared.seo"
  );

  return (
    <Layout
      seoData={seoData}
      pageTitle={`Wren AI Blog | ${page.title}`}
      pageDescription={page.excerpt || `Wren AI Blog | ${page.title}`}
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold">{page.title}</h1>
        {page.content && (
          <div className="prose prose-slate mt-6">
            <ReactMarkdown>{page.content}</ReactMarkdown>
          </div>
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
  const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;
  const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
  const api = axios.create({
    baseURL: STRAPI,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const res = await api
    .get("/api/pages?fields=slug")
    .then((r) => r.data)
    .catch(() => null);
  // Generate paths for all locales
  const locales = ["en", "zh"];
  const paths = [];

  if (Array.isArray(res?.data)) {
    res.data.forEach((page) => {
      const slug = page.attributes?.slug || page.slug;
      if (slug) {
        locales.forEach((locale) => {
          paths.push({ params: { slug }, locale });
        });
      }
    });
  }

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params, locale }) {
  const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;
  const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
  const api = axios.create({
    baseURL: STRAPI,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const selectedLang = locale || "en";
  const [pageRes, navRes] = await Promise.all([
    api
      .get(
        `/api/pages?filters[slug][$eq]=${params.slug}&populate=sections.items,sections.buttons,sections.image,sections.metaImage&lang=${selectedLang}`
      )
      .then((r) => r.data)
      .catch(() => null),
  ]);
  const pageData = Array.isArray(pageRes?.data)
    ? pageRes.data[0]?.attributes ?? pageRes.data[0]
    : null;

  // --------------------------------------------------------
  // 1. Check if pageData is null (i.e., post was not found)
  if (!pageData) {
    // Return notFound: true to serve the 404 page
    return {
      notFound: true,
      revalidate: 10, // Keep revalidate in case the page is created later
    };
  }
  // --------------------------------------------------------

  const safePage = JSON.parse(JSON.stringify(pageData ?? null));
  return {
    props: {
      page: safePage,
    },
    revalidate: 10,
  };
}
