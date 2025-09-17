import axios from "axios";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Logos from "../components/Logos";
import Capabilities from "../components/Capabilities";
// import FeatureShowcase from "../components/FeatureShowcase";
import Work from "../components/Work";
import Stories from "../components/Stories";
import Stats from "../components/Stats";
import HomeCTA from "../components/homeCTA";
import { base } from "../components/service/axios";
import Layout from "./layout";

export default function Home({
  hero,
  logos,
  navigation,
  homePageRes,
}) {

  return (
    <Layout navigation={navigation}>
      <div style={{ backgroundImage: `url(${hero?.heroImage?.url.startsWith('http') ? '' : base}${hero?.backgroundimage?.url})`,  WebkitBackgroundSize: '100%',backgroundPosition: 'center bottom' }} className="bg-cover">
           <Hero data={hero} />
            <Logos items={logos} />
         </div>
         <Capabilities data={homePageRes?.coreCapabilities} />
         <Work data={homePageRes} />
         <Stories data={homePageRes} />
         <Stats data={homePageRes} />
         <HomeCTA data={homePageRes?.getStartedWithWrenAI} />
    </Layout>
  );
}

export async function getStaticProps() {
  const STRAPI = process.env.STRAPI_URL
  const token = process.env.STRAPI_TOKEN;
  const api = axios.create({
    baseURL: STRAPI,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const [
    navRes, 
    homePageRes,
    
  ] = await Promise.all([
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
    api
      .get(`/api/home-page?populate=*`)
      .then((r) => r.data)
      .catch(() => null),
  ]);

  
  return {

    props: {
      hero: homePageRes?.data?.hero ?? homePageRes?.data?.hero ?? null,
      logos: Array.isArray(homePageRes?.data?.TrustedBy)
        ? homePageRes.data.TrustedBy.map((l) => l?.attributes ?? l)
        : [],
      navigation: {
        ...(navRes?.nav?.data?.attributes ?? navRes?.nav?.data ?? {}),
        pages: Array.isArray(navRes?.pages?.data)
          ? navRes.pages.data
              .map((p) => p.attributes ?? p)
              .filter((p) => p.showInNav)
              .sort((a, b) => (a.navOrder || 0) - (b.navOrder || 0))
          : [],
      },
      homePageRes: homePageRes?.data ?? null,
    },
    revalidate: 10,
  };
}
