import React from "react";
import Layout from "./layout";
import { safeBackgroundImage } from "../utils/ssrHelpers";
import { getContactApi } from "../service/apiClient";
import ContactHero from "../components/contact/hero";
import { base } from "../service/serviceConfig";
import { HubspotEmbedForm } from "../components/hubspotEmbedForm";
import { useLanguage } from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import { useApiDataWithLanguage } from "../hooks/useApiData";

export default function Contact() {
  const { currentLanguage, isClient } = useLanguage();
  const { data: contact, loading } = useApiDataWithLanguage(getContactApi, {
    currentLanguage,
    isClient,
  });

  const heroImage = contact?.hero?.[0]?.backgroundimage?.url;

  // Loading state
  if (loading) {
    return <LoadingSpinner />;
  }

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
