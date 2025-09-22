import React from 'react'
import Layout from './layout'
import PartnerWrenAis from '../components/affiliateProgram/partnerWrenAis'
import TrustedLogo from '../components/affiliateProgram/TrustedLogo'
import ElitePartner from '../components/affiliateProgram/elitePartner'

const affiliateProgram = () => {
  return (
        <Layout>
            <div> 
                 <PartnerWrenAis/>
                 <div className='max-w-6xl mx-auto'>
                 <TrustedLogo/>
                 <ElitePartner/>
                 </div>
            </div>
        </Layout>
  )
}

export default affiliateProgram