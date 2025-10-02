import DocumentHero from "../components/document/hero";
import ContentBlock from "../components/document/contentBlock";
import { base, token } from "../service/serviceConfig";
import Layout from "./layout";
import {
  safeBackgroundImage,
  createServerSideProps,
} from "../utils/ssrHelpers";
import OpenSourceDetails from "../components/document/openSourceDetails";
import Footer from "../components/footer";
import PublicRoadmap from "../components/document/publicRoadmap";
export default function Resources({ document }) {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Product Hero */}
        {document?.hero?.length && <DocumentHero data={document?.hero} />}
        {/* Content Block */}
        {document?.ContentBlock?.length && (
          <ContentBlock data={document?.ContentBlock} />
        )}
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

// Server-side rendering function
export const getServerSideProps = createServerSideProps(
  "/api/docs-page",
  "document"
);
