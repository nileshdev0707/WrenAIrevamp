import React, { useState, useRef } from "react";
import Hero from "../components/pricing/hero";
import Tiers from "../components/pricing/tiers";
import ContentBlock from "../components/pricing/contantBlock";
import ComparePlan from "../components/pricing/comparePlan";
import FAQ from "../components/pricing/faq";
import Footer from "../components/footer";
import Layout from "./layout";
import { safeBackgroundImage } from "../utils/ssrHelpers";
const { createPricingGetStaticProps } = require("../lib/getStaticProps");
import TiersHosted from "../components/pricing/tiresHosted";
import Logos from "../components/Logos";

export default function Pricing({ pricingData }) {
  const [billing, setBilling] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const heroImage = pricingData?.hero?.[0]?.backgroundimage?.url;
  const tiers =
    selectedPlan === 0 ? pricingData?.tiers : pricingData?.tiersHosted;
  const compareRef = useRef(null);
  // Extract SEO data from product page data
  const seoData = pricingData?.seo;
  const scrollToComparison = () => {
    if (compareRef.current) {
      compareRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Layout
      seoData={seoData}
      pageTitle="Wren AI | Pricing"
      pageDescription="Tailored solutions for every stage of growth with scalable plans to meet diverse needs.">
      <div>
        {pricingData?.hero?.length && (
          <div
          style={{
            backgroundImage: safeBackgroundImage(heroImage),
            WebkitBackgroundSize: "contain",
          }}
          className="bg-no-repeat sm:py-16 py-10 max-w-6xl mx-auto bg-contain"
          >
            {pricingData?.hero?.length && (
              <Hero
                pricing={pricingData?.hero?.[0]}
                billing={billing}
                setBilling={setBilling}
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
              />
            )}

            {selectedPlan === 0 ? (
              pricingData?.tiers?.length ? (
                <Tiers
                  tiers={pricingData?.tiers}
                  billing={billing}
                  selectedPlan={selectedPlan}
                  onSeeDetails={scrollToComparison}
                />
              ) : (
                <></>
              )
            ) : (
              pricingData?.tiersHosted?.length && (
                <TiersHosted tiers={pricingData?.tiersHosted} onSeeDetails={scrollToComparison}/>
              )
            )}
          </div>
        )}

        {/* Content Block */}
        {selectedPlan === 0 ? (
          pricingData?.ContentBlock?.length && (
            <ContentBlock contentBlock={pricingData?.ContentBlock} />
          )
        ) : (
          <></>
        )}

        {/* Trusted Logos */}
        <div className="md:py-20 py-10 px-4">
          {pricingData?.TrustedBy?.length && (
            <Logos
              items={pricingData?.TrustedBy}
              title={pricingData?.TrustedByTitle}
            />
          )}
        </div>

        {/* Feature comparison */}

        {tiers?.length > 0 && (
          <div ref={compareRef}>
            <ComparePlan tiers={tiers} selectedPlan={selectedPlan} />
          </div>
        )}

        {/* FAQ */}
        {pricingData?.frequentlyAskedQuestions?.length && (
          <FAQ
            frequentlyAskedQuestions={pricingData?.frequentlyAskedQuestions}
          />
        )}

        {/* Footer banner */}
        {pricingData?.bottomContentBlock?.length && (
          <Footer data={pricingData?.bottomContentBlock} />
        )}
      </div>
    </Layout>
  );
}

// Static data loading function
export const getStaticProps = createPricingGetStaticProps();
