import React from "react";
import Layout from "./layout";
import { safeBackgroundImage } from "../utils/ssrHelpers";
import ReactMarkdownDetails from "../components/reactMarkDown";
import { createCustomGetStaticProps } from "../lib/getStaticProps";

export default function TermsOfUse({ termsPageData }) {
  const heroImage = termsPageData?.hero?.[0]?.backgroundimage?.url;

  // Extract SEO data from terms page data
  const seoData = termsPageData?.seo?.[0] || termsPageData?.seo;

  return (
    <Layout
      seoData={seoData}
      pageTitle="Wren AI | EULA"
      pageDescription="Wren AI - End-user License Agreement"
    >
      <div className="sm:px-6 px-4 max-w-6xl mx-auto">
        {termsPageData?.hero?.length && (
          <div
            style={{
              backgroundImage: safeBackgroundImage(heroImage),
              WebkitBackgroundSize: "100% 100%",
              backgroundPosition: "center top",
            }}
            className="bg-no-repeat py-16 max-w-6xl mx-auto bg-cover"
          >
            <section className="py-10 md:py-16 text-center">
              {termsPageData?.hero?.map((item, index) => (
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
        {termsPageData?.descriptionDetails && (
          <div className="max-w-4xl mx-auto md:py-12">
            <ReactMarkdownDetails data={termsPageData?.descriptionDetails} />
          </div>
        )}
      </div>
    </Layout>
  );
}

// Static data loading function
export const getStaticProps = createCustomGetStaticProps("terms-page");
