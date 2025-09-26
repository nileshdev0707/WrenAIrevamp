import React from "react";
import Layout from "./layout";
import { safeBackgroundImage, createServerSideProps } from "../utils/ssrHelpers";
import { getSlaApi } from "../service/apiClient";
import { base } from "../service/serviceConfig";

export default function Sla({ sla }) {

  const heroImage = sla?.hero?.[0]?.backgroundimage?.url;

  return (
    <Layout>
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
            <section className="py-10 md:py-16 text-center">
              {sla?.hero?.map((item, index) => (
                <div key={index}>
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-medium leading-tight xl:pt-25 lg:pt-20 md:pt-15 pt-10">
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
          <div
            dangerouslySetInnerHTML={{
              __html: sla?.html,
            }}
          />
        )}
      </div>
    </Layout>
  );
}

// Server-side rendering function
export const getServerSideProps = createServerSideProps(
  "/api/sla-page",
  "sla"
);
