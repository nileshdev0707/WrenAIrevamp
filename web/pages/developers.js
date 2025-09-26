import DevelopersHero from "../components/developers/hero";
import ContentBlock from "../components/developers/contentBlock";
import WrenEngine from "../components/developers/wrenEngine";
import WhyWrenAI from "../components/developers/whyWrenAI";
import { base } from "../service/serviceConfig";
import Layout from "./layout";
import { getDevelopersApi } from "../service/apiClient";
import { useLanguage } from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import { useApiDataWithLanguage } from "../hooks/useApiData";
export default function Developers() {
  const { currentLanguage, isClient } = useLanguage();
  const { data: developers, loading } = useApiDataWithLanguage(
    getDevelopersApi,
    { currentLanguage, isClient }
  );

  const heroImage = developers?.hero?.[0]?.backgroundimage?.url;

  // Loading state
  if (loading) {
    return <LoadingSpinner />;
  }

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
