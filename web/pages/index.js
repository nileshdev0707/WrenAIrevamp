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
import { useLanguage } from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import { useApiDataWithLanguage } from "../hooks/useApiData";
export default function Home() {
  const { currentLanguage, isClient } = useLanguage();
  const { data: homePageRes, loading } = useApiDataWithLanguage(homePageApi, {
    currentLanguage,
    isClient,
  });

  const heroImage = homePageRes?.hero?.backgroundimage?.url;
  const hero = homePageRes?.hero;
  const logos = Array.isArray(homePageRes?.TrustedBy)
    ? homePageRes.TrustedBy.map((l) => l?.attributes ?? l)
    : [];

  // Loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Layout>
      <div
        style={{
          backgroundImage: `url(${
            heroImage.startsWith("http") ? "" : base
          } ${heroImage})`,
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
