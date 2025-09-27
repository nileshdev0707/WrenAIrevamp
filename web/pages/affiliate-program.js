import React from "react";
import Layout from "./layout";
import PartnerWrenAis from "../components/affiliateProgram/partnerWrenAis";
import TrustedLogo from "../components/affiliateProgram/TrustedLogo";
import ElitePartner from "../components/affiliateProgram/elitePartner";
import { getAffiliateProgramApi } from "../service/apiClient";
import { createServerSideProps } from "../utils/ssrHelpers";

const affiliateProgram = ({affiliateProgram}) => {

  return (
    <Layout>
      <div>
        {affiliateProgram?.heroBlock?.length > 0 && (
          <PartnerWrenAis data={affiliateProgram} />
        )}
        {affiliateProgram?.trustedBy?.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <TrustedLogo data={affiliateProgram} />
          </div>
        )}
        <ElitePartner data={affiliateProgram} />
      </div>
    </Layout>
  );
};

export default affiliateProgram;

// Server-side rendering function
export const getServerSideProps = createServerSideProps(
  "/api/affiliate-program",
  "affiliateProgram"
);
