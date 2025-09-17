import axios from "axios";
import DocumentHero from "../components/document/hero";
import ContentBlock from "../components/document/contentBlock";
import { base } from "../components/service/axios";
import Layout from "./layout";
import OpenSourceDetails from "../components/document/openSourceDetails";
import Footer from "../components/footer";
import PublicRoadmap from "../components/document/publicRoadmap";

export default function Document({ document, navigation }) {
  const heroImage = document?.hero?.[0]?.backgroundimage?.url;

  return (
    <Layout navigation={navigation}>
      <div className="max-w-6xl mx-auto">
        <div
          style={{
            backgroundImage: `url(${
              heroImage?.startsWith("http") ? "" : base
            }${heroImage})`,
          }}
          className="bg-no-repeat pt-24 pb-10 max-w-6xl mx-auto bg-contain"
        >
          {/* Product Hero */}
          {document?.hero?.length && <DocumentHero data={document?.hero} />}
          {/* Content Block */}
          {document?.ContentBlock?.length && (
            <ContentBlock data={document?.ContentBlock} />
          )}
        </div>
      </div>
      {document?.openSourceProject?.length && (
        <OpenSourceDetails data={document?.openSourceProject} />
      )}
      {document?.publicRoadmap?.length && (
        <PublicRoadmap data={document?.publicRoadmap} />
      )}
      {/* Footer banner */}
      {document?.BottomContentBlock?.length && (
        <Footer data={document?.BottomContentBlock} />
      )}
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
  const [document, navBundle] = await Promise.all([
    api
      .get("/api/docs-page?populate=*")
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
      document: document?.data?.attributes ?? document?.data ?? null,
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
