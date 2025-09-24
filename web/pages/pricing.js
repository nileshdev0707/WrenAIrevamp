import React, { useState, useEffect } from "react";
import Hero from "../components/pricing/hero";
import Tiers from "../components/pricing/tiers";
import ContentBlock from "../components/pricing/contantBlock";
import ComparePlan from "../components/pricing/comparePlan";
import FAQ from "../components/pricing/faq";
import Footer from "../components/footer";
import { base } from "../service/serviceConfig";
import TrustedLogos from "../components/pricing/trustedLogo";
import Layout from "./layout";
import { getPricingApi } from "../service/apiClient";

export default function Pricing() {
  const [pricing, setPricing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [billing, setBilling] = useState("Annually");
  const [selectedPlan, setSelectedPlan] = useState("Cloud");
  const heroImage = pricing?.hero?.[0]?.backgroundimage?.url
  
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const { data } = await getPricingApi();
        const pricingData = data?.data?.attributes ?? data?.data ?? null;
        setPricing(pricingData);
      } catch (error) {
        console.error('Error fetching pricing:', error);
      } finally { 
        setLoading(false);
      }
    };
    fetchPricing();
  }, []);

  return (
    <Layout>
      <div className="px-6">
        {pricing?.hero?.length && (
        <div style={{ backgroundImage: `url(${heroImage.startsWith('http') ? '' : base}${heroImage})` }} className="bg-no-repeat py-16 max-w-6xl mx-auto bg-contain">
        {pricing?.hero?.length && (
          <Hero
            pricing={pricing?.hero?.[0]}
            billing={billing}
            setBilling={setBilling}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
          />
          )}
          {pricing?.tiers?.length && (
            <Tiers tiers={pricing?.tiers} billing={billing} selectedPlan={selectedPlan} />
          )}
        </div>
        )}

        {/* Content Block */}
        {selectedPlan === "Cloud" && pricing?.ContentBlock?.length && (
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