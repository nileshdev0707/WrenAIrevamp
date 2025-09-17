import axios from "axios";
import Hero from "../components/Hero";
import Logos from "../components/Logos";
import Capabilities from "../components/Capabilities";
// import FeatureShowcase from "../components/FeatureShowcase";
import Work from "../components/Work";
import Stories from "../components/Stories";
import Stats from "../components/Stats";
import HomeCTA from "../components/homeCTA";
import { base } from "../service/serviceConfig";
import Layout from "./layout";

export default function Home({
  hero,
  logos,
  homePageRes,
}) {
  return (
    <Layout>
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
  const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
  const api = axios.create({
    baseURL: STRAPI,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  const [
    homePageRes,
    
  ] = await Promise.all([
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
      homePageRes: homePageRes?.data ?? null,
    },
    revalidate: 10,
  };
}
