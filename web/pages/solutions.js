import React from "react";
import Layout from "./layout";
import SolutionHero from "../components/solutions/solutionHero";
import { solutionsApi } from "../service/apiClient";
import SolutionsTab from "../components/solutions/solutionsTab";
import EnterPrise from "../components/solutions/enterPrise";
import Industry from "../components/solutions/Industry";
import PartnerEcosystem from "../components/solutions/partnerEcosystem";
import { useLanguage } from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import { useApiDataWithLanguage } from "../hooks/useApiData";

export default function Solutions() {
  const { isClient, currentLanguage } = useLanguage();
  const { data: solutions, loading } = useApiDataWithLanguage(solutionsApi, {
    currentLanguage,
    isClient,
  });

  // Loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Layout>
      {solutions?.hero.length > 0 && (
        <div className="max-w-7xl mx-auto lg:px-6 md:px-4 px-2">
          <SolutionHero data={solutions} />
          <SolutionsTab data={solutions} />
        </div>
      )}
      {solutions?.EnterpriseFeaturesBlock.length > 0 && (
        <div className="bg-[#F7FBFE]">
          <EnterPrise data={solutions} />
        </div>
      )}
      {solutions?.ContentBlock.length > 0 && (
        <div className="max-w-7xl mx-auto lg:px-6 md:px-4 px-2">
          <Industry data={solutions} />
          <PartnerEcosystem data={solutions} />
        </div>
      )}
    </Layout>
  );
}
