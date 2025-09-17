import axios from "axios";
import DevelopersHero from "../components/developers/hero";
import ContentBlock from "../components/developers/contentBlock";
import WrenEngine from "../components/developers/wrenEngine";
import WhyWrenAI from "../components/developers/whyWrenAI";
import { base } from "../components/service/axios";
import Layout from "./layout";

export default function Developers({ developers, navigation }) {
  const heroImage = developers?.hero?.[0]?.backgroundimage?.url;

  return (
    <Layout navigation={navigation}>
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
          {developers?.hero?.length && (
            <DevelopersHero data={developers?.hero} />
          )}
          {/* Content Block */}
          {developers?.ContentBlock?.length && (
            <ContentBlock data={developers?.ContentBlock} />
          )}
        </div>
      </div>
      {developers?.wrenEngine?.length && (
        <WrenEngine data={developers?.wrenEngine} />
      )}
        {/* {developers?.whyWrenAI?.length && (
            <WhyWrenAI data={developers?.whyWrenAI} />
        )} */}
    </Layout>
  );
}

export async function getStaticProps() {
  const STRAPI = process.env.STRAPI_URL;
  const token = process.env.STRAPI_TOKEN;
  const api = axios.create({
    baseURL: STRAPI,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const [developersRes, navBundle] = await Promise.all([
    api
      .get("/api/developers-page?populate=*")
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
      developers:
        developersRes?.data?.attributes ?? developersRes?.data ?? null,
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
