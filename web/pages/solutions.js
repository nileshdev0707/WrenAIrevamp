import React, { useEffect, useState } from "react";
import Layout from "./layout";
import SolutionHero from "../components/solutions/solutionHero";
import SolutionsTab from "../components/solutions/solutionsTab";
import EnterPrise from "../components/solutions/enterPrise";
import Industry from "../components/solutions/Industry";
import PartnerEcosystem from "../components/solutions/partnerEcosystem";
import { createServerSideProps } from "../utils/ssrHelpers";
import { useRouter } from "next/router";

export default function Solutions({ solutions }) {
  const router = useRouter();
  const { tab } = router.query
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) return null;
  
  return (
    <Layout>
      {solutions?.hero.length > 0 && (
        <div className="max-w-7xl mx-auto lg:px-6 md:px-4 px-2">
          <SolutionHero data={solutions} />
          <SolutionsTab data={solutions} isClient={isClient} tab={tab} />
        </div>
      )}
      {solutions?.EnterpriseFeaturesBlock.length > 0 && (
        <div className="bg-[#F7FBFE]">
          <EnterPrise data={solutions} />
        </div>
      )}
      {solutions?.ContentBlock.length > 0 && (
        <div className="max-w-7xl mx-auto lg:px-6 md:px-4 px-2">
          {/* <Industry data={solutions} /> */}
          <PartnerEcosystem data={solutions} />
        </div>
      )}
    </Layout>
  );
}

// Server-side rendering function
export const getServerSideProps = createServerSideProps(
  "/api/solutions-page",
  "solutions"
);
