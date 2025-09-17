import axios from "axios";
import DevelopersHero from "../components/developers/hero";
import ContentBlock from "../components/developers/contentBlock";
import WrenEngine from "../components/developers/wrenEngine";
import WhyWrenAI from "../components/developers/whyWrenAI";
import { base } from "../service/serviceConfig";
import Layout from "./layout";

export default function Developers({ developers }) {
  const heroImage = developers?.hero?.[0]?.backgroundimage?.url;

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
  const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
  const api = axios.create({
    baseURL: STRAPI,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const [developersRes] = await Promise.all([
    api
      .get("/api/developers-page?populate=*")
      .then((r) => r.data)
      .catch(() => null),
  ]);
  return {
    props: {
      developers:
        developersRes?.data?.attributes ?? developersRes?.data ?? null,
    },
    revalidate: 10,
  };
}
