import React, { useState, useEffect } from "react";
import Layout from "./layout";
import { getPrivacyPolicyApi } from "../service/apiClient";
import { base } from "../service/serviceConfig";

export default function PrivacyPolicy() {
  const [privacyPolicy, setPrivacyPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const heroImage = privacyPolicy?.hero?.[0]?.backgroundimage?.url;

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const { data } = await getPrivacyPolicyApi();
        const privacyPolicyData = data?.data?.attributes ?? data?.data ?? null;
        setPrivacyPolicy(privacyPolicyData);
      } catch (error) {
        console.error("Error fetching privacy policy:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrivacyPolicy();
  }, []);

  return (
    <Layout>
      <div className="px-6 max-w-6xl mx-auto">
        {privacyPolicy?.hero?.length && (
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
              {privacyPolicy?.hero?.map((item, index) => (
                <div key={index}>
                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-medium leading-tight xl:pt-25 lg:pt-20 md:pt-15 pt-10">
                    {item?.title
                      ?.split(" Privacy Policy")
                      .map((part, idx) =>
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
          <div
            dangerouslySetInnerHTML={{
              __html: privacyPolicy?.descriptionDetails,
            }}
          />
        )}
      </div>
    </Layout>
  );
}
