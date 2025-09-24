import { useState, useEffect } from "react";
import Layout from "./layout";
import { base } from "../service/serviceConfig";
import SolutionsIndustriesHero from "../components/solutionsIndustries/hero";
import ContentBlock from "../components/solutionsIndustries/contentBlock";
import Footer from "../components/footer";
import { getSolutionsIndustriesApi } from "../service/apiClient";

export default function SolutionsIndustries() {
  const [solutionsIndustries, setSolutionsIndustries] = useState(null);
  const [loading, setLoading] = useState(true);
  const heroImage = solutionsIndustries?.hero?.[0]?.backgroundImage?.url

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const { data } = await getSolutionsIndustriesApi();
        const solutionsIndustriesData = data?.data?.attributes ?? data?.data ?? null;
        setSolutionsIndustries(solutionsIndustriesData);
      } catch (error) {
        console.error('Error fetching solutions industries:', error);
      } finally { 
        setLoading(false);
      }
    };
    fetchPricing();
  }, []);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div
          style={{
            backgroundImage: `url(${
              heroImage?.startsWith("http") ? "" : base
            }${heroImage})`,
            WebkitBackgroundSize: "100%",
            backgroundPosition: "center top",
          }}
          className="bg-no-repeat pt-24 max-w-6xl mx-auto px-5"
        >
          {/* Solutions Industries Hero */}
          {solutionsIndustries?.hero?.length > 0 && (
            <SolutionsIndustriesHero solutionsIndustries={solutionsIndustries?.hero} />
          )}
        </div>
        {/* Solutions Industries Content Block */}
        {solutionsIndustries?.solutionIndustriesTab?.length > 0 && (  
          <ContentBlock solutionsIndustries={solutionsIndustries?.solutionIndustriesTab} />
        )}
        {/* Solutions Industries Footer */}
        {solutionsIndustries?.bottomContentBlock?.length > 0 && (
          <Footer data={solutionsIndustries?.bottomContentBlock}/>
        )}
      </div>
    </Layout>
  );
}
