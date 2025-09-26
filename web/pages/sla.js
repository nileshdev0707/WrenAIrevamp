import React, { useState, useEffect } from "react";
import Layout from "./layout";
import { getSlaApi } from "../service/apiClient";
import { base } from "../service/serviceConfig";

export default function Sla() {
  const [sla, setSla] = useState(null);
  const [loading, setLoading] = useState(true);
  const heroImage = sla?.hero?.[0]?.backgroundimage?.url;

  useEffect(() => {
    const fetchSla = async () => {
      try {
        const { data } = await getSlaApi();
        const slaData = data?.data?.attributes ?? data?.data ?? null;
        setSla(slaData);
      } catch (error) {
        console.error("Error fetching terms of use:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSla();
  }, []);

  return (
    <Layout>
      <div className="px-6 max-w-6xl mx-auto">
        {sla?.hero?.length && (
          <div
            style={{
              backgroundImage: `url(${
                heroImage?.startsWith("http") ? "" : base
              }${heroImage})`,
              WebkitBackgroundSize: "100% 100%",
              backgroundPosition: "center top",
            }}
            className="bg-no-repeat py-16 max-w-6xl mx-auto bg-cover"
          >
            <section className="py-10 md:py-16 text-center">
              {sla?.hero?.map((item, index) => (
                <div key={index}>
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-medium leading-tight xl:pt-25 lg:pt-20 md:pt-15 pt-10">
                    {item?.title
                      ?.split("SLA")
                      .map((part, idx) =>
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
