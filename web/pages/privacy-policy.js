import React from "react";
import Layout from "./layout";
import {
  safeBackgroundImage,
  createServerSideProps,
} from "../utils/ssrHelpers";
import ReactMarkdownDetails from "../components/reactMarkDown";

export default function PrivacyPolicy({ privacyPolicy }) {
  const heroImage = privacyPolicy?.hero?.[0]?.backgroundimage?.url;

  // Extract SEO data from privacy policy page data
  const seoData = privacyPolicy?.seo?.[0] || privacyPolicy?.seo;

  return (
    <Layout
      seoData={seoData}
      pageTitle="Privacy Policy - Wren AI"
      pageDescription="Wren AI Privacy Policy - How we collect, use, and protect your personal information"
    >
      <div className="px-6 max-w-6xl mx-auto">
        {privacyPolicy?.hero?.length && (
          <div
            style={{
              backgroundImage: safeBackgroundImage(heroImage),
              WebkitBackgroundSize: "100% 100%",
              backgroundPosition: "center top",
            }}
            className="bg-no-repeat py-16 max-w-6xl mx-auto bg-cover"
          >
            <section className="py-10 md:py-16 text-center">
              {privacyPolicy?.hero?.map((item, index) => (
                <div key={index}>
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-medium leading-tight xl:pt-25 lg:pt-20 md:pt-15 pt-10">
                    {item?.title?.split(" Privacy Policy").map((part, idx) =>
                      idx === 0 ? (
                        <span key={idx}>
                          {part} <br />
                        </span>
                      ) : (
                        <span key={idx}>Privacy Policy</span>
                      )
                    )}
                  </h1>
                </div>
              ))}
            </section>
          </div>
        )}
        {privacyPolicy?.descriptionDetails && (
          <div className="max-w-4xl mx-auto md:py-12">
          <ReactMarkdownDetails data={privacyPolicy?.descriptionDetails} />
          </div>
        )}
      </div>
    </Layout>
  );
}

// Server-side rendering function
export const getServerSideProps = createServerSideProps(
  "/api/privacy-policy-page",
  "privacyPolicy"
);
