import React from "react";
import Layout from "./layout";
import { safeBackgroundImage } from "../utils/ssrHelpers";
import { getRequestDemoApi } from "../service/apiClient";
import { base } from "../service/serviceConfig";
import { HubspotEmbedForm } from "../components/hubspotEmbedForm";
import { useLanguage } from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import { useApiDataWithLanguage } from "../hooks/useApiData";

export default function RequestDemo() {
  const { currentLanguage, isClient } = useLanguage();
  const { data: requestDemo, loading } = useApiDataWithLanguage(
    getRequestDemoApi,
    { currentLanguage, isClient }
  );

  const heroImage = requestDemo?.hero?.[0]?.backgroundImage?.url;

  // Loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Layout>
      <div className="px-6">
        {requestDemo?.hero?.length && (
          <div
            style={{
              backgroundImage: safeBackgroundImage(heroImage),
              WebkitBackgroundSize: "100% 100%",
              backgroundPosition: "center top",
            }}
            className="bg-no-repeat py-16 max-w-6xl mx-auto bg-cover"
          >
            <section className="py-10 sm:py-16 text-center">
              {requestDemo?.hero?.map((item, index) => (
                <div key={index}>
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-medium leading-tight pt-25">
                    {item?.title}
                  </h1>

                  <p className="pt-10 max-w-2xl mx-auto text-black xl:text-xl lg:text-lg text-base">
                    {item?.subtitle}
                  </p>
                </div>
              ))}
            </section>
          </div>
        )}
        <HubspotEmbedForm formId={requestDemo?.formId} />
      </div>
    </Layout>
  );
}
