import Hero from "../components/Hero";
import Logos from "../components/Logos";
import Capabilities from "../components/Capabilities";
import Work from "../components/Work";
import Stories from "../components/Stories";
import Stats from "../components/Stats";
import HomeCTA from "../components/homeCTA";
import { base } from "../service/serviceConfig";
import Layout from "./layout";
import { homePageApi } from "../service/apiClient";
import { useState, useEffect } from "react";

export default function Home() {
  const [homePageRes, setHomePageRes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        const { data } = await homePageApi();
        const homePageData = data?.data?.attributes ?? data?.data ?? null;
        setHomePageRes(homePageData);
      } catch (error) {
        console.error('Error fetching home page:', error);
      } finally { 
        setLoading(false);
      }
    };
    fetchHomePage();
  }, []);

  const hero = homePageRes?.hero;
  const logos = Array.isArray(homePageRes?.TrustedBy)
    ? homePageRes.TrustedBy.map((l) => l?.attributes ?? l)
    : [];

  // Loading state
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div style={{ backgroundImage: `url(${hero?.heroImage?.url.startsWith('http') ? '' : base}${hero?.backgroundimage?.url})`,  WebkitBackgroundSize: '100%',backgroundPosition: 'center bottom' }} className="bg-cover">
           <Hero data={hero} />
            <Logos items={logos} />
         </div>
         {homePageRes?.coreCapabilities?.length > 0 && (
          <Capabilities data={homePageRes?.coreCapabilities} />
         )}
         {homePageRes?.UseCases?.length > 0 && (
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
