import React from "react";
import Layout from "./layout";
import { safeBackgroundImage } from "../utils/ssrHelpers";
import ReactMarkdownDetails from "../components/reactMarkDown";
import { createCustomGetStaticProps } from "../lib/getStaticProps";

export default function AffiliateAgreement({ affiliateAgreementPageData }) {
  const heroImage = affiliateAgreementPageData?.Hero?.[0]?.backgroundImage?.url;

  // Extract SEO data from affiliate agreement page data
  const seoData =
    affiliateAgreementPageData?.seo?.[0] || affiliateAgreementPageData?.seo;

  return (
    <Layout
      seoData={seoData}
      pageTitle="Affiliate Agreement - Wren AI"
      pageDescription="Wren AI Affiliate Agreement - Terms and conditions for our affiliate program"
    >
      <div className="px-6 max-w-6xl mx-auto">
        {affiliateAgreementPageData?.Hero?.length && (
          <div
            style={{
              backgroundImage: safeBackgroundImage(heroImage),
              WebkitBackgroundSize: "100% 100%",
              backgroundPosition: "center top",
            }}
            className="bg-no-repeat py-16 max-w-6xl mx-auto bg-cover"
          >
            <section className="py-3 sm:py-16 text-center">
              {affiliateAgreementPageData?.Hero?.map((item, index) => (
                <div key={index}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight xl:pt-25 lg:pt-20 md:pt-15 pt-10">
                    {item?.title?.split("Affiliate Program").map((part, idx) =>
                      idx === 0 ? (
                        <span key={idx}>
                          {part} <br />
                        </span>
                      ) : (
                        <span key={idx}>Affiliate Program</span>
                      )
                    )}
                  </h1>
                  <p className="pt-10 max-w-2xl mx-auto text-black xl:text-xl lg:text-lg text-base">
                    {item?.subTitle}
                  </p>
                </div>
              ))}
            </section>
          </div>
        )}
        {affiliateAgreementPageData?.html && (
          <div className="max-w-4xl mx-auto md:py-12">
            <ReactMarkdownDetails data={affiliateAgreementPageData?.html} />
          </div>
        )}
      </div>
    </Layout>
  );
}

// Static data loading function
export const getStaticProps = createCustomGetStaticProps(
  "affiliate-agreement-page"
);
