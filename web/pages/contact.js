import React, { useState, useEffect } from "react";
import Layout from "./layout";
import { getContactApi } from "../service/apiClient";
import ContactHero from "../components/contact/hero";
import { base } from "../service/serviceConfig";
import { HubspotEmbedForm } from "../components/hubspotEmbedForm";

export default function Contact() {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const heroImage = contact?.hero?.[0]?.backgroundimage?.url;
  const formId = "5b6cded2-dcbe-4661-9855-aa29246a6a4e";

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const { data } = await getContactApi();
        const contactData = data?.data?.attributes ?? data?.data ?? null;
        setContact(contactData);
      } catch (error) {
        console.error("Error fetching contact:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  return (
    <Layout>
      <div className="px-6">
        {contact?.hero?.length && (
          <div
            style={{
              backgroundImage: `url(${
                heroImage?.startsWith("http") ? "" : base
              }${heroImage})`,
              WebkitBackgroundSize: "100% 100%",
              backgroundPosition: "center top",
            }}
            className="bg-no-repeat py-16 max-w-6xl mx-auto bg-cover"
          >
            <ContactHero contact={contact?.hero} />
          </div>
        )}
        <HubspotEmbedForm formId={formId} />
      </div>
    </Layout>
  );
}
