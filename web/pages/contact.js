import React from "react";
import Layout from "./layout";
import { safeBackgroundImage } from "../utils/ssrHelpers";
import { createServerSideProps } from "../utils/ssrHelpers";
import ContactHero from "../components/contact/hero";
import { base } from "../service/serviceConfig";
import { HubspotEmbedForm } from "../components/hubspotEmbedForm";

export default function Contact({ contact }) {
  const heroImage = contact?.hero?.[0]?.backgroundimage?.url;

  return (
    <Layout>
      <div className="px-6">
        {contact?.hero?.length && (
          <div
            style={{
              backgroundImage: safeBackgroundImage(heroImage),
              WebkitBackgroundSize: "100% 100%",
              backgroundPosition: "center top",
            }}
            className="bg-no-repeat py-16 max-w-6xl mx-auto bg-cover"
          >
            <ContactHero contact={contact?.hero} />
          </div>
        )}
        <HubspotEmbedForm formId={contact?.formId} />
      </div>
    </Layout>
  );
}

// Server-side rendering function
export const getServerSideProps = createServerSideProps(
  "/api/contact-page",
  "contact"
);
