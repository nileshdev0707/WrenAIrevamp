import React from "react";
import Layout from "./layout";
import { safeBackgroundImage } from "../utils/ssrHelpers";
import { getSlaApi } from "../service/apiClient";
import { base } from "../service/serviceConfig";
import { useLanguage } from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import { useApiDataWithLanguage } from "../hooks/useApiData";

export default function Sla() {
  const { currentLanguage, isClient } = useLanguage();
  const { data: sla, loading } = useApiDataWithLanguage(getSlaApi, {
    currentLanguage,
    isClient,
  });

  const heroImage = sla?.hero?.[0]?.backgroundimage?.url;

  // Loading state
  if (loading) {
    return <LoadingSpinner />;
  }

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
