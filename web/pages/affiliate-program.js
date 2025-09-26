import React from "react";
import Layout from "./layout";
import PartnerWrenAis from "../components/affiliateProgram/partnerWrenAis";
import TrustedLogo from "../components/affiliateProgram/TrustedLogo";
import ElitePartner from "../components/affiliateProgram/elitePartner";
import { getAffiliateProgramApi } from "../service/apiClient";
import { useLanguage } from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import { useApiDataWithLanguage } from "../hooks/useApiData";
const affiliateProgram = () => {
  const { currentLanguage, isClient } = useLanguage();
  const { data: affiliateProgram, loading } = useApiDataWithLanguage(
    getAffiliateProgramApi,
    { currentLanguage, isClient }
  );

  // Loading state
  if (loading) {
    return <LoadingSpinner />;
  }

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
