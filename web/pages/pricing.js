import React, { useState } from "react";
import Hero from "../components/pricing/hero";
import Tiers from "../components/pricing/tiers";
import ContentBlock from "../components/pricing/contantBlock";
import ComparePlan from "../components/pricing/comparePlan";
import FAQ from "../components/pricing/faq";
import Footer from "../components/footer";
import Layout from "./layout";
import { safeBackgroundImage } from "../utils/ssrHelpers";
import { createServerSideProps } from "../utils/ssrHelpers";
import TiersHosted from "../components/pricing/tiresHosted";
import Logos from "../components/Logos";

export default function Pricing({ pricing }) {
  const [billing, setBilling] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const heroImage = pricing?.hero?.[0]?.backgroundimage?.url;
  const tiers = selectedPlan === 0 ? pricing?.tiers : pricing?.tiersHosted;
  return (
    <Layout>
      <div>
        {pricing?.hero?.length && (
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

            {selectedPlan === 0 ?
              pricing?.tiers?.length ? (
              <Tiers
                tiers={pricing?.tiers}
                billing={billing}
                selectedPlan={selectedPlan}
              />
            ) : (
              <></>
            ) : (
              pricing?.tiersHosted?.length && (
                <TiersHosted
                  tiers={pricing?.tiersHosted}
                />
              )
            )}
          </div>
        )}

        {/* Content Block */}
        {selectedPlan === 0 ? pricing?.ContentBlock?.length && (
          <ContentBlock contentBlock={pricing?.ContentBlock} />
        ) : (
         <></>
        )}

        {/* Trusted Logos */}
        <div className="py-20 px-3">
          {pricing?.TrustedBy?.length && (
            <Logos items={pricing?.TrustedBy} title={pricing?.TrustedByTitle}/>
          )}
        </div>

        {/* Feature comparison */}

      {tiers?.length > 0 && (
        <ComparePlan tiers={tiers} selectedPlan={selectedPlan} />
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
