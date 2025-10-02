import Layout from "./layout";
import {
  safeBackgroundImage,
  createServerSideProps,
} from "../utils/ssrHelpers";
import { base } from "../service/serviceConfig";
import SolutionsIndustriesHero from "../components/solutionsIndustries/hero";
import ContentBlock from "../components/solutionsIndustries/contentBlock";
import Footer from "../components/footer";
import { useRouter } from "next/router";
export default function Industries({ solutionsIndustries }) {
  const heroImage = solutionsIndustries?.hero?.[0]?.backgroundImage?.url;
  const router = useRouter();
  const { tab } = router.query

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div
          style={{
            backgroundImage: safeBackgroundImage(heroImage),
            WebkitBackgroundSize: "100%",
            backgroundPosition: "center top",
          }}
          className="bg-no-repeat pt-24 max-w-6xl mx-auto px-5"
        >
          {/* Solutions Industries Hero */}
          {solutionsIndustries?.hero?.length > 0 && (
            <SolutionsIndustriesHero
              solutionsIndustries={solutionsIndustries?.hero}
            />
          )}
        </div>
        {/* Solutions Industries Content Block */}
        {solutionsIndustries?.solutionIndustriesTab?.length > 0 && (
          <ContentBlock
            solutionsIndustries={solutionsIndustries?.solutionIndustriesTab}
            tab={tab}
          />
        )}
        {/* Solutions Industries Footer */}
        {solutionsIndustries?.bottomContentBlock?.length > 0 && (
          <Footer data={solutionsIndustries?.bottomContentBlock} />
        )}
      </div>
    </Layout>
  );
}

// Server-side rendering function
export const getServerSideProps = createServerSideProps(
  "/api/solutions-industries-page",
  "solutionsIndustries"
);
