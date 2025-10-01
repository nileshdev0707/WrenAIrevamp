import React from "react";
import Layout from "./layout";
import {
  safeBackgroundImage,
  createServerSideProps,
} from "../utils/ssrHelpers";
import ReactMarkdownDetails from "../components/reactMarkDown";

export default function Support({ sla }) {
  const heroImage = sla?.hero?.[0]?.backgroundimage?.url;

  // Extract SEO data from SLA page data
  const seoData = sla?.seo?.[0] || sla?.seo;

  console.log({ sla });
  return (
    <Layout
      seoData={seoData}
      pageTitle="Service Level Agreement - Wren AI"
      pageDescription="Wren AI Service Level Agreement - Terms and conditions for our services"
    >
      <div className="px-6 max-w-6xl mx-auto">
        {sla?.hero?.length && (
          <div
            style={{
              backgroundImage: safeBackgroundImage(heroImage),
              WebkitBackgroundSize: "100% 100%",
              backgroundPosition: "center top",
            }}
            className="bg-no-repeat py-16 max-w-6xl mx-auto bg-cover"
          >
            <section className="py-3 sm:py-16 text-center">
              {sla?.hero?.map((item, index) => (
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
                    {item?.subtitle}
                  </p>
                </div>
              ))}
            </section>
          </div>
        )}
        {sla?.html && (
          <div className="max-w-4xl mx-auto md:py-12">
            <ReactMarkdownDetails data={sla?.html} />
          </div>
        )}
      </div>
    </Layout>
  );
}

// Server-side rendering function
export const getServerSideProps = createServerSideProps("/api/sla-page", "sla");
