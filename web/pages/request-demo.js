import React from "react";
import Layout from "./layout";
import { safeBackgroundImage } from "../utils/ssrHelpers";
import { HubspotEmbedForm } from "../components/hubspotEmbedForm";
import { createCustomGetStaticProps } from "../lib/getStaticProps";

export default function RequestDemo({ requestPageData }) {
  const heroImage = requestPageData?.hero?.[0]?.backgroundImage?.url;
  // Extract SEO data from product page data
  const seoData = requestPageData?.seo;
  return (
    <Layout
      seoData={seoData}
      pageTitle="Wren AI | Request a Demo"
      pageDescription="Experience the power of Wren AI with a personalized demo. See how our GenBI platform transforms data into insights using natural language and AI. Book your demo today.">
      <div className="px-6">
        {requestPageData?.hero?.length && (
          <div
            style={{
              backgroundImage: safeBackgroundImage(heroImage),
              WebkitBackgroundSize: "100% 100%",
              backgroundPosition: "center top",
            }}
            className="bg-no-repeat py-16 max-w-6xl mx-auto bg-cover"
          >
            <section className="py-10 sm:py-16 text-center">
              {requestPageData?.hero?.map((item, index) => (
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
        <HubspotEmbedForm formId={requestPageData?.formId} />
      </div>
    </Layout>
  );
}

// Static data loading function
export const getStaticProps = createCustomGetStaticProps("request-page");
