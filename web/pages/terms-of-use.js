import React from "react";
import ReactMarkdown from "react-markdown";
import Layout from "./layout";
import {
  safeBackgroundImage,
  createServerSideProps,
} from "../utils/ssrHelpers";
import { getTermsOfUseApi } from "../service/apiClient";
import { base } from "../service/serviceConfig";

export default function TermsOfUse({ termsOfUse }) {
  const heroImage = termsOfUse?.hero?.[0]?.backgroundimage?.url;

  // Extract SEO data from terms page data
  const seoData = termsOfUse?.seo?.[0] || termsOfUse?.seo;

  return (
    <Layout
      seoData={seoData}
      pageTitle="Terms of Use - Wren AI"
      pageDescription="Wren AI Terms of Use - End User License Agreement and terms of service"
    >
      <div className="px-6 max-w-6xl mx-auto">
        {termsOfUse?.hero?.length && (
          <div
            style={{
              backgroundImage: safeBackgroundImage(heroImage),
              WebkitBackgroundSize: "100% 100%",
              backgroundPosition: "center top",
            }}
            className="bg-no-repeat py-16 max-w-6xl mx-auto bg-cover"
          >
            <section className="py-10 md:py-16 text-center">
              {termsOfUse?.hero?.map((item, index) => (
                <div key={index}>
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-medium leading-tight xl:pt-25 lg:pt-20 md:pt-15 pt-10">
                    {item?.title?.split("EULA").map((part, idx) =>
                      idx === 0 ? (
                        <span key={idx}>
                          {part} <br />
                        </span>
                      ) : (
                        <span key={idx}>EULA</span>
                      )
                    )}
                  </h1>
                  <p className="pt-10 max-w-2xl mx-auto text-black xl:text-xl lg:text-lg text-base">
                    {item?.subtitle}
                  </p>
                </div>
              ))}
            </section>
          </div>
        )}
        {termsOfUse?.descriptionDetails && (
          <div className="prose prose-slate max-w-none py-12">
            <ReactMarkdown>{termsOfUse?.descriptionDetails}</ReactMarkdown>
          </div>
        )}
      </div>
    </Layout>
  );
}

// Server-side rendering function
export const getServerSideProps = createServerSideProps(
  "/api/terms-page",
  "termsOfUse"
);
