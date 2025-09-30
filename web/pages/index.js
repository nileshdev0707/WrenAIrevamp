import Hero from "../components/Hero";
import Logos from "../components/Logos";
import Capabilities from "../components/Capabilities";
import Work from "../components/Work";
import Stories from "../components/Stories";
import Stats from "../components/Stats";
import HomeCTA from "../components/homeCTA";
import { base } from "../service/serviceConfig";
import Layout from "./layout";
import { safeBackgroundImage } from "../utils/ssrHelpers";
import axios from "axios";

export default function Home({ homePageRes }) {
  const heroImage = homePageRes?.hero?.backgroundimage?.url;
  const hero = homePageRes?.hero;
  const logos = Array.isArray(homePageRes?.TrustedBy)
    ? homePageRes.TrustedBy.map((l) => l?.attributes ?? l)
    : [];

  // Extract SEO data from home page data
  const seoData = homePageRes?.seo;

  return (
    <Layout
      seoData={seoData}
      pageTitle="Wren AI - AI-Powered Data Analytics Platform"
      pageDescription="Transform your data into insights with Wren AI's intelligent analytics platform. Get started with AI-powered data analysis today."
    >
      <div
        style={{
          backgroundImage: safeBackgroundImage(heroImage),
          WebkitBackgroundSize: "100%",
          backgroundPosition: "center bottom",
        }}
        className="bg-cover"
      >
        <Hero data={hero} />
        <Logos items={logos} />
      </div>
      {homePageRes?.coreCapabilities?.length > 0 && (
        <Capabilities data={homePageRes?.coreCapabilities} />
      )}
      {homePageRes && (
        <>
          <Work data={homePageRes} />
          <Stories data={homePageRes} />
          <Stats data={homePageRes} />
          <HomeCTA data={homePageRes?.getStartedWithWrenAI} />
        </>
      )}
    </Layout>
  );
}

// Server-side rendering function
export async function getServerSideProps(context) {
  const { locale, defaultLocale } = context;

  // Use Next.js i18n locale
  const selectedLang = locale || defaultLocale || "en";

  try {
    const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL;
    const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

    const api = axios.create({
      baseURL: STRAPI,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    const { data } = await api.get(
      `/api/home-page?populate=*&lang=${selectedLang}`
    );
    const homePageData = data?.data?.attributes ?? data?.data ?? null;

    return {
      props: {
        homePageRes: homePageData,
        serverLanguage: selectedLang,
      },
    };
  } catch (error) {
    console.error("Error fetching home page data:", error);
    return {
      props: {
        homePageRes: null,
        serverLanguage: selectedLang,
      },
    };
  }
}
