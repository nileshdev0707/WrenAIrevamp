import { useState, useEffect } from "react";
import DocumentHero from "../components/document/hero";
import ContentBlock from "../components/document/contentBlock";
import { base,token } from "../service/serviceConfig";
import Layout from "./layout";
import OpenSourceDetails from "../components/document/openSourceDetails";
import Footer from "../components/footer";
import PublicRoadmap from "../components/document/publicRoadmap";
import { getDocsApi } from "../service/apiClient";

export default function Document() {
  const [document, setDocument] = useState(null);
  console.log("document ==> ", document);
  const [loading, setLoading] = useState(true);
  const heroImage = document?.hero?.[0]?.backgroundimage?.url;
  
  useEffect(() => {
    const fetchDocument = async () => {
      try {   
        const { data } = await getDocsApi();
        const documentData = data?.data?.attributes ?? data?.data ?? null;
        setDocument(documentData);
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocument();
  }, []);

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