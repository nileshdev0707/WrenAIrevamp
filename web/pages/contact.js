import React from "react";
import Layout from "./layout";
import { safeBackgroundImage } from "../utils/ssrHelpers";
const { createCustomGetStaticProps } = require("../lib/getStaticProps");
import ContactHero from "../components/contact/hero";
import { base } from "../service/serviceConfig";
import { HubspotEmbedForm } from "../components/hubspotEmbedForm";

export default function Contact({ contactPageData }) {
  const heroImage = contactPageData?.hero?.[0]?.backgroundimage?.url;
  // Extract SEO data from product page data
  const seoData = contactPageData?.seo;

  return (
    <Layout
      seoData={seoData}
      pageTitle="Wren AI | Contact Us"
      pageDescription="Please don't hesitate to contact us if you have any questions.">
      <div className="px-6">
        {contactPageData?.hero?.length && (
          <div
            style={{
              backgroundImage: safeBackgroundImage(heroImage),
              WebkitBackgroundSize: "100% 100%",
              backgroundPosition: "center top",
            }}
            className="bg-no-repeat py-16 max-w-6xl mx-auto bg-cover"
          >
            <ContactHero contact={contactPageData?.hero} />
          </div>
        )}
        <HubspotEmbedForm formId={contactPageData?.formId} />
      </div>
    </Layout>
  );
}

// Static data loading function
export const getStaticProps = createCustomGetStaticProps("contact-page");
