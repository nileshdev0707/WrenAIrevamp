import React from "react";
import Layout from "./layout";
import { safeBackgroundImage } from "../utils/ssrHelpers";
import ReactMarkdownDetails from "../components/reactMarkDown";
import { createCustomGetStaticProps } from "../lib/getStaticProps";

export default function SecurityPolicy({ securityPolicyPageData }) {
  const heroImage = securityPolicyPageData?.hero?.[0]?.backgroundImage?.url;

  // Extract SEO data from security policy page data
  const seoData =
    securityPolicyPageData?.seo?.[0] || securityPolicyPageData?.seo;

  return (
    <Layout
      seoData={seoData}
      pageTitle="Wren AI | Security Policy"
      pageDescription="Wren AI Security Policy"
    >
      <div className="sm:px-6 px-4 max-w-6xl mx-auto">
        {securityPolicyPageData?.hero?.length && (
          <div
            style={{
              backgroundImage: safeBackgroundImage(heroImage),
              WebkitBackgroundSize: "100% 100%",
              backgroundPosition: "center top",
            }}
            className="bg-no-repeat py-16 max-w-6xl mx-auto bg-cover"
          >
            <section className="py-3 sm:py-16 text-center">
              {securityPolicyPageData?.hero?.map((item, index) => (
                <div key={index}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight xl:pt-25 lg:pt-20 md:pt-15 pt-10">
                    {item?.title?.split("SLA").map((part, idx) =>
                      idx === 0 ? (
                        <span key={idx}>
                          {part} <br />
                        </span>
                      ) : (
                        <span key={idx}>SLA</span>
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
        {securityPolicyPageData?.html && (
          <div className="max-w-4xl mx-auto md:pb-12">
            <ReactMarkdownDetails data={securityPolicyPageData?.html} />
          </div>
        )}
      </div>
    </Layout>
  );
}

// Static data loading function
export const getStaticProps = createCustomGetStaticProps(
  "security-policy-page"
);
