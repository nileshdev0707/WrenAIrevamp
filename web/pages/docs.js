import DocumentHero from "../components/document/hero";
import ContentBlock from "../components/document/contentBlock";
import { base, token } from "../service/serviceConfig";
import Layout from "./layout";
import OpenSourceDetails from "../components/document/openSourceDetails";
import Footer from "../components/footer";
import PublicRoadmap from "../components/document/publicRoadmap";
import { getDocsApi } from "../service/apiClient";
import { useLanguage } from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import { useApiDataWithLanguage } from "../hooks/useApiData";

export default function Document() {
  const { currentLanguage, isClient } = useLanguage();
  const { data: document, loading } = useApiDataWithLanguage(getDocsApi, {
    currentLanguage,
    isClient,
  });

  const heroImage = document?.hero?.[0]?.backgroundimage?.url;

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
