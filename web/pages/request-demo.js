import React, { useState, useEffect } from "react";
import Layout from "./layout";
import { getRequestDemoApi } from "../service/apiClient";
import { base } from "../service/serviceConfig";
import { HubspotEmbedForm } from "../components/hubspotEmbedForm";

export default function RequestDemo() {
  const [requestDemo, setRequestDemo] = useState(null);
  const [loading, setLoading] = useState(true);
  const heroImage = requestDemo?.hero?.[0]?.backgroundImage?.url;
  const formId = "5b6cded2-dcbe-4661-9855-aa29246a6a4e";

  useEffect(() => {
    const fetchRequestDemo = async () => {
      try {
        const { data } = await getRequestDemoApi();
        const requestDemoData = data?.data?.attributes ?? data?.data ?? null;
        setRequestDemo(requestDemoData);
      } catch (error) {
        console.error("Error fetching request demo:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequestDemo();
  }, []);

  return (
    <Layout>
      <div className="px-6">
        {requestDemo?.hero?.length && (
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
            <section className="py-10 sm:py-16 text-center">
              {requestDemo?.hero?.map((item, index) => (
                <div key={index}>
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-medium leading-tight pt-25">
                    {item?.title}
                  </h1>

                  <p className="pt-10 max-w-2xl mx-auto text-black xl:text-xl lg:text-lg text-base">
                    {item?.subtitle}
                  </p>
                </div>
              ))}
            </section>
          </div>
        )}
        <HubspotEmbedForm formId={formId} />
      </div>
    </Layout>
  );
}
