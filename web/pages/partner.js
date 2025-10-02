import React from "react";
import Layout from "./layout";
import PartnerWrenAis from "../components/affiliateProgram/partnerWrenAis";
import TrustedLogo from "../components/affiliateProgram/TrustedLogo";
import ElitePartner from "../components/affiliateProgram/elitePartner";
import { getAffiliateProgramApi } from "../service/apiClient";
import { createServerSideProps } from "../utils/ssrHelpers";
import { useRouter } from "next/router";
const partner = ({ affiliateProgram }) => {
  const router = useRouter();
  const { tab } = router.query
  
  return (
    <Layout>
      <div>
        {affiliateProgram?.heroBlock?.length > 0 && (
          <PartnerWrenAis data={affiliateProgram} />
        )}
        {affiliateProgram?.trustedBy?.length > 0 && (
          <div className="mx-auto">
            <TrustedLogo data={affiliateProgram} />
          </div>
        )}  
        <ElitePartner data={affiliateProgram} tab={tab}/>
      </div>
    </Layout>
  );
};

export default partner;

// Server-side rendering function
export const getServerSideProps = createServerSideProps(
  "/api/affiliate-program",
  "affiliateProgram"
);
