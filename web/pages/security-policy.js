import React from "react";
import Layout from "./layout";
import {
  safeBackgroundImage,
  createServerSideProps,
} from "../utils/ssrHelpers";
import ReactMarkdownDetails from "../components/reactMarkDown";

export default function SecurityPolicy({ securityPolicy }) {
console.log("securityPolicy ==> ", securityPolicy);
  const heroImage = securityPolicy?.hero?.[0]?.backgroundImage?.url;

  // Extract SEO data from SLA page data
  const seoData = securityPolicy?.seo?.[0] || securityPolicy?.seo

  return (
    <Layout
      seoData={seoData}
      pageTitle="Security Policy - Wren AI"
      pageDescription="Wren AI Security Policy - Terms and conditions for our services"
    >
      <div className="px-6 max-w-6xl mx-auto">
        {securityPolicy?.hero?.length && (
          <div
            style={{
              backgroundImage: safeBackgroundImage(heroImage),
              WebkitBackgroundSize: "100% 100%",
              backgroundPosition: "center top",
            }}
            className="bg-no-repeat py-16 max-w-6xl mx-auto bg-cover"
          >
            <section className="py-3 sm:py-16 text-center">
              {securityPolicy?.hero?.map((item, index) => (
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
        {securityPolicy?.html && (
          <div className="max-w-4xl mx-auto md:pb-12">
            <ReactMarkdownDetails data={securityPolicy?.html} />
          </div>
        )}
      </div>
    </Layout>
  );
}

// Server-side rendering function
export const getServerSideProps = createServerSideProps("/api/security-policy-page", "securityPolicy");
