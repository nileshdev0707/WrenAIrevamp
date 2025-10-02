import React from "react";
import Layout from "./layout";
import { safeBackgroundImage } from "../utils/ssrHelpers";
import { createServerSideProps } from "../utils/ssrHelpers";
import { HubspotEmbedForm } from "../components/hubspotEmbedForm";

export default function Support({ support }) {
  const heroImage = support?.hero?.[0]?.backgroundimage?.url;

  return (
    <Layout>
      <div className="px-6">
        {support?.hero?.length && (
          <div
            style={{
              backgroundImage: safeBackgroundImage(heroImage),
              WebkitBackgroundSize: "100% 100%",
              backgroundPosition: "center top",
            }}
            className="bg-no-repeat py-16 max-w-6xl mx-auto bg-cover"
          >
            <section className="py-10 sm:py-16 text-center">
              {support?.hero?.map((item, index) => (
                <div key={index}>
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-medium leading-tight pt-10 sm:pt-25">
                    {item?.title}
                  </h1>

                  <p className="pt-10 max-w-2xl mx-auto text-black xl:text-xl lg:text-lg text-base">
                    {item?.subTitle}
                  </p>
                </div>
              ))}
            </section>
          </div>
        )}
        <HubspotEmbedForm formId={support?.formId} />
      </div>
    </Layout>
  );
}

// Server-side rendering function
export const getServerSideProps = createServerSideProps(
  "/api/support-page",
  "support"
);
