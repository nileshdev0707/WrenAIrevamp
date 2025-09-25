import { useState, useEffect } from "react";
import DevelopersHero from "../components/developers/hero";
import ContentBlock from "../components/developers/contentBlock";
import WrenEngine from "../components/developers/wrenEngine";
import WhyWrenAI from "../components/developers/whyWrenAI";
import { base } from "../service/serviceConfig";
import Layout from "./layout";
import { getDevelopersApi } from "../service/apiClient";
import { useLanguage } from "../components/Navbar";
export default function Developers() {
  
  const [developers, setDevelopers] = useState(null);
  const [loading, setLoading] = useState(true);
  const heroImage = developers?.hero?.[0]?.backgroundimage?.url;
  const { currentLanguage, isClient } = useLanguage();
  
  useEffect(() => {
    if (!isClient) return;
    
    const fetchDevelopers = async () => {
      try {
        const { data } = await getDevelopersApi(currentLanguage);
        const developersData = data?.data?.attributes ?? data?.data ?? null;
        setDevelopers(developersData);
      } catch (error) {
        console.error('Error fetching developers:', error);
      } finally { 
        setLoading(false);
      }
    };
    fetchDevelopers();
  }, [currentLanguage, isClient]);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div
          style={{
            backgroundImage: `url(${
              heroImage?.startsWith("http") ? "" : base
            }${heroImage})`,
            WebkitBackgroundSize: "100% 100%",
            backgroundPosition: "center top",
          }}
          className="bg-no-repeat pt-24 max-w-6xl mx-auto"
        >
          {/* Product Hero */}
          {developers?.hero?.length && (
            <DevelopersHero data={developers?.hero} />
          )}
        </div>
          {/* Content Block */}
          {developers?.ContentBlock?.length && (
            <ContentBlock data={developers?.ContentBlock} />
          )}
      </div>
      {developers?.wrenEngine?.length && (
        <WrenEngine data={developers?.wrenEngine} />
      )}
      {developers?.whyWrenAI?.length && (
        <WhyWrenAI data={developers?.whyWrenAI} />
      )}
    </Layout>
  );
}