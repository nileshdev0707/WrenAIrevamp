import React from "react";
import Layout from "./layout";
import PartnerWrenAis from "../components/affiliateProgram/partnerWrenAis";
import TrustedLogo from "../components/affiliateProgram/TrustedLogo";
import ElitePartner from "../components/affiliateProgram/elitePartner";
import { getAffiliateProgramApi } from "../service/apiClient";
import {createServerSideProps, safeBackgroundImage} from "../utils/ssrHelpers";
import { useRouter } from "next/router";
const partner = ({ affiliateProgram }) => {
  const router = useRouter();
  const { tab } = router.query
  const heroImage = affiliateProgram?.Hero[0]?.backgroundImage?.url;
  console.log({affiliateProgram})

  return (
    <Layout>
      <div>
        {/*{affiliateProgram?.heroBlock?.length > 0 && (*/}
        {/*  <PartnerWrenAis data={affiliateProgram} />*/}
        {/*)}*/}
        {affiliateProgram?.Hero?.length > 0 && (
          <div
            style={{
              backgroundImage: safeBackgroundImage(heroImage),
              WebkitBackgroundSize: "100% 100%",
              backgroundPosition: "center top",
            }}
            className="bg-no-repeat py-16 max-w-6xl mx-auto bg-cover"
          >
            <section className="py-3 sm:py-16 text-center">
              {affiliateProgram?.Hero?.map((item, index) => (
                <div key={index}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight xl:pt-25 lg:pt-20 md:pt-15 pt-10">
                    {item?.title?.split("SLA").map((part, idx) =>
                      idx === 0 ? (
                        <span key={idx}>
                          {part} <br />
                        </span>
                      ) : (
                        <span key={idx}>SLA</span>
                      )
                    )}
                  </h1>
                  <p className="pt-10 max-w-2xl mx-auto text-black xl:text-xl lg:text-lg text-base">
                    {item?.subtitle}
                  </p>
                </div>
              ))}
            </section>
          </div>
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
