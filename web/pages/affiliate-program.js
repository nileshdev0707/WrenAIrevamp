import React, { useEffect, useState } from 'react'
import Layout from './layout'
import PartnerWrenAis from '../components/affiliateProgram/partnerWrenAis'
import TrustedLogo from '../components/affiliateProgram/TrustedLogo'
import ElitePartner from '../components/affiliateProgram/elitePartner'
import { getAffiliateProgramApi } from '../service/apiClient'
const affiliateProgram = () => {
  const [loading, setLoading] = useState(true);
  const [affiliateProgram, setAffiliateProgram] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await getAffiliateProgramApi();
        const affiliateProgramData = data?.data ?? data ?? null;
        setAffiliateProgram(affiliateProgramData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally { 
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  return (
        <Layout>
            <div> 
              {affiliateProgram?.heroBlock?.length > 0 && (
                 <PartnerWrenAis data={affiliateProgram}/>
                 )}
                 {affiliateProgram?.trustedBy?.length > 0 && (
                 <div className='max-w-6xl mx-auto'>
                 <TrustedLogo data={affiliateProgram}/>
                 </div>
                 )}
                 <ElitePartner data={affiliateProgram}/>
            </div>
        </Layout>
  )
}

export default affiliateProgram