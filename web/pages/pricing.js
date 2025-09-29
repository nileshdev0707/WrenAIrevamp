import React, { useState } from "react";
import Hero from "../components/pricing/hero";
import Tiers from "../components/pricing/tiers";
import ContentBlock from "../components/pricing/contantBlock";
import ComparePlan from "../components/pricing/comparePlan";
import FAQ from "../components/pricing/faq";
import Footer from "../components/footer";
import { base } from "../service/serviceConfig";
import TrustedLogos from "../components/pricing/trustedLogo";
import Layout from "./layout";
import { safeBackgroundImage } from "../utils/ssrHelpers";
import { createServerSideProps } from "../utils/ssrHelpers";

export default function Pricing({ pricing }) {
  const [billing, setBilling] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const heroImage = pricing?.hero?.[0]?.backgroundimage?.url;

  return (
    <Layout>
      <div className="px-6">
        <div
          style={{
            backgroundImage: safeBackgroundImage(heroImage),
            WebkitBackgroundSize: "100% 100%",
            backgroundPosition: "center top",
          }}
          className="bg-no-repeat py-16 max-w-6xl mx-auto bg-contain"
        >
          {pricing?.hero?.length && (
            <Hero
              pricing={pricing?.hero?.[0]}
              billing={billing}
              setBilling={setBilling}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />
          )}
        </div>
        {pricing?.tiers?.length && (
          <Tiers
            tiers={pricing?.tiers}
            billing={billing}
            selectedPlan={selectedPlan}
          />
        )}

        {/* Content Block */}
        {selectedPlan === 0 && pricing?.ContentBlock?.length && (
          <ContentBlock contentBlock={pricing?.ContentBlock} />
        )}

        {/* Trusted Logos */}
        {pricing?.TrustedBy?.length && (
          <TrustedLogos items={pricing?.TrustedBy} />
        )}

        {/* Feature comparison */}
        {pricing?.tiers?.length && (
          <ComparePlan tiers={pricing?.tiers} selectedPlan={selectedPlan} />
        )}

        {/* FAQ */}
        {pricing?.frequentlyAskedQuestions?.length && (
          <FAQ frequentlyAskedQuestions={pricing?.frequentlyAskedQuestions} />
        )}

        {/* Footer banner */}
        {pricing?.bottomContentBlock?.length && (
          <Footer data={pricing?.bottomContentBlock} />
        )}
      </div>
    </Layout>
  );
}

// Server-side rendering function
export const getServerSideProps = createServerSideProps(
  "/api/pricing",
  "pricing"
);
