import axios from "axios";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import Hero from "../components/pricing/hero";
import Tiers from "../components/pricing/tiers";
import ContentBlock from "../components/pricing/contantBlock";
import ComparePlan from "../components/pricing/comparePlan";
import FAQ from "../components/pricing/faq";
import CTA from "../components/pricing/CTA";
import TrustedLogos from "../components/pricing/trustedLogo";

export default function Pricing({ pricing, navigation }) {
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || ''
  const [billing, setBilling] = useState("Monthly");
  const heroImage = pricing?.hero?.[0]?.backgroundimage?.url
  
  return (
    <div>
      <Navbar navigation={navigation} />
      <main className="px-6">
        {pricing?.hero?.length && (
        <div style={{ backgroundImage: `url(${heroImage.startsWith('http') ? '' : base}${heroImage})` }} className="bg-no-repeat py-16 max-w-6xl mx-auto">
        {pricing?.hero?.length && (
          <Hero
            pricing={pricing?.hero?.[0]}
            billing={billing}
            setBilling={setBilling}
          />
          )}
          {pricing?.tiers?.length && (
            <Tiers tiers={pricing?.tiers} billing={billing} />
          )}
        </div>
        )}

        {/* Content Block */}
        {pricing?.ContentBlock?.length && (
          <ContentBlock contentBlock={pricing?.ContentBlock} />
        )}

        {/* Trusted Logos */}
        {pricing?.TrustedBy?.length && (
          <TrustedLogos items={pricing?.TrustedBy} />
        )}

        {/* Feature comparison */}
        {pricing?.tiers?.length && (
          <ComparePlan tiers={pricing?.tiers} />
        )}

        {/* FAQ */}
        {pricing?.frequentlyAskedQuestions?.length && (
          <FAQ frequentlyAskedQuestions={pricing?.frequentlyAskedQuestions} />
        )}

        {/* CTA banner */}
        {pricing?.bottomContentBlock?.length && (
          <CTA data={pricing?.bottomContentBlock} />
        )}
      </main>
       {/* Footer */}
      <SiteFooter navigation={navigation}/>
    </div>
  );
}

export async function getStaticProps() {
  const STRAPI = process.env.STRAPI_URL;
  const token = process.env.STRAPI_TOKEN;
  const api = axios.create({
    baseURL: STRAPI,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const [pricingRes, navBundle] = await Promise.all([
    api
      .get("/api/pricing?populate=*")
      .then((r) => r.data)
      .catch(() => null),
    Promise.all([
      api
        .get(`/api/navigation?populate=*`)
        .then((r) => r.data)
        .catch(() => null),
      api
        .get(`/api/pages?fields=slug,navLabel,title,showInNav,navOrder`)
        .then((r) => r.data)
        .catch(() => null),
    ]).then(([nav, pages]) => ({ nav, pages })),
  ]);
  return {
    props: {
      pricing: pricingRes?.data?.attributes ?? pricingRes?.data ?? null,
      navigation: {
        ...(navBundle?.nav?.data?.attributes ?? navBundle?.nav?.data ?? {}),
        pages: Array.isArray(navBundle?.pages?.data)
          ? navBundle.pages.data
              .map((p) => p.attributes ?? p)
              .filter((p) => p.showInNav)
              .sort((a, b) => (a.navOrder || 0) - (b.navOrder || 0))
          : [],
      },
    },
    revalidate: 10,
  };
}
