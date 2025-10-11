import React, { useEffect, useState } from "react";
import Layout from "./layout";
import SolutionHero from "../components/solutions/solutionHero";
import SolutionsTab from "../components/solutions/solutionsTab";
import EnterPrise from "../components/solutions/enterPrise";
import Industry from "../components/solutions/Industry";
import PartnerEcosystem from "../components/solutions/partnerEcosystem";
const { createCustomGetStaticProps } = require("../lib/getStaticProps");
import { useRouter } from "next/router";

export default function Solutions({ solutionsPageData }) {
  const router = useRouter();
  const { tab } = router.query;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  // Extract SEO data from product page data
  const seoData = solutionsPageData?.seo;  

  return (
    <Layout
      seoData={seoData}
      pageTitle="Wren AI | Enterprise-Grade Generative BI Solution"
      pageDescription="Empower your organization with scalable AI-powered analytics, secure deployments, and LLM-agnostic Intelligent AI Modeling — built for data-driven enterprises.">
      {solutionsPageData?.hero?.length > 0 && (
        <div className="max-w-7xl mx-auto lg:px-6 md:px-4 px-4">
          <SolutionHero data={solutionsPageData} />
          <SolutionsTab
            data={solutionsPageData}
            isClient={isClient}
            tab={tab}
          />
        </div>
      )}
      {solutionsPageData?.EnterpriseFeaturesBlock?.length > 0 && (
        <div className="bg-[#F7FBFE]">
          <EnterPrise data={solutionsPageData} />
        </div>
      )}
      {solutionsPageData?.ContentBlock?.length > 0 && (
        <div className="max-w-7xl mx-auto lg:px-6 px-4 ">
          {/* <Industry data={solutionsPageData} /> */}
          <PartnerEcosystem data={solutionsPageData} />
        </div>
      )}
    </Layout>
  );
}

// Static data loading function
export const getStaticProps = createCustomGetStaticProps("solutions-page");
