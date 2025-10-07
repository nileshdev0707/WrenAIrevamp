import React from "react";
import Layout from "./layout";
import PartnerWrenAis from "../components/affiliateProgram/partnerWrenAis";
import ElitePartner from "../components/affiliateProgram/elitePartner";
import { safeBackgroundImage } from "../utils/ssrHelpers";
import { useRouter } from "next/router";
import { createCustomGetStaticProps } from "../lib/getStaticProps";

const partner = ({ affiliateProgramData }) => {
  const router = useRouter();
  const { tab } = router.query;
  const heroImage = affiliateProgramData?.Hero[0]?.backgroundImage?.url;

  // Extract SEO data from product page data
  const seoData = affiliateProgramData?.seo;

  return (
    <Layout
      seoData={seoData}
      pageTitle="Wren AI | GenBI Partners"
      pageDescription="Become a Wren AI Partner and lead the GenBI movement—earn bigger rewards, get premium support, and grow with exclusive access.">
      <div>
        {/*{affiliateProgramData?.heroBlock?.length > 0 && (*/}
        {/*  <PartnerWrenAis data={affiliateProgramData} />*/}
        {/*)}*/}
        {affiliateProgramData?.Hero?.length > 0 && (
          <div
            style={{
              backgroundImage: safeBackgroundImage(heroImage),
              WebkitBackgroundSize: "100% 100%",
              backgroundPosition: "center top",
            }}
            className="bg-no-repeat py-16 max-w-6xl mx-auto bg-cover"
          >
            <section className="py-3 sm:py-16 text-center">
              {affiliateProgramData?.Hero?.map((item, index) => (
                <div key={index}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight xl:pt-25 lg:pt-20 md:pt-15 pt-10">
                    {item?.title?.split(" ").map((word, i) =>
                      word === "Partner" ? (
                        <span key={i} className="text-blue-600">
                          {word}
                        </span>
                      ) : (
                        <span key={i}> {word}</span>
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
        <ElitePartner data={affiliateProgramData} tab={tab} />
      </div>
    </Layout>
  );
};

export default partner;

// Static data loading function
export const getStaticProps = createCustomGetStaticProps("affiliate-program");
