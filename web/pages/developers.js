import DevelopersHero from "../components/developers/hero";
import ContentBlock from "../components/developers/contentBlock";
import WrenEngine from "../components/developers/wrenEngine";
import WhyWrenAI from "../components/developers/whyWrenAI";
import { base } from "../service/serviceConfig";
import Layout from "./layout";
import {
  safeBackgroundImage,
  createServerSideProps,
} from "../utils/ssrHelpers";
export default function Developers({ developers }) {
  const heroImage = developers?.hero?.[0]?.backgroundimage?.url;

  // Loading state
  // if (loading) {
  //   return <LoadingSpinner />;
  // }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div
          style={{
            backgroundImage: safeBackgroundImage(heroImage),
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

// Server-side rendering function
export const getServerSideProps = createServerSideProps(
  "/api/developers-page",
  "developers"
);
