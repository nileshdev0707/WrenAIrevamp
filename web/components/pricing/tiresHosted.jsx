import React from "react";
import { useLocalizedUrl } from "../../utils/languageUtils";

export default function TiersHosted({ tiers, billing, selectedPlan }) {
  const getUrl = useLocalizedUrl();

  return (
    <div className="mt-10 grid md:grid-cols-4 gap-6">
      {tiers?.map((item, index) => (
        <div
          key={index}
          className={`p-5 rounded-xl ring-1 ring-gray-200 bg-white shadow-sm`}
        >
          <div className="text-3xl font-medium">{item.name}</div>
          <p className="text-gray-500 mb-4 text-sm pt-4">{item.description}</p>

          <div className="h-20">
            <div className="xl:text-5xl lg:text-4xl text-3xl font-semibold mt-1 bg-gradient-to-r from-[#0B8EE5] via-61%  via-[#044CD5] to-[#0222CB] text-transparent bg-clip-text">
              {billing === 0 ? item.annualPrice : item.price}
            </div>

            <div
              className={`text-gray-500 ml-2 text-sm ${
                index === 0 || index === 3 ? "hidden" : ""
              }`}
            >
              /month, billed annually
            </div>
          </div>
          <div className="mt-6">
            {selectedPlan === 0 && (
              <span className="text-sm bg-gray-100 p-2 rounded-full text-black font-medium capitalize">
                {billing === 0 ? item.annualFeatures : item.features}
              </span>
            )}
            {selectedPlan === 1 && (
              <div className="flex flex-col gap-5 min-h-17">
                {item.selfHostedSeat && (
                  <div>
                    <span className="text-sm bg-gray-100 p-2 rounded-full text-black font-medium capitalize">
                      {item.selfHostedSeat}
                    </span>
                  </div>
                )}
                {item?.selfHostedFeatures && (
                  <div>
                    <span className="text-sm bg-gray-100 p-2 rounded-full text-black font-medium capitalize">
                      {item?.selfHostedFeatures}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="mt-6">
            <a
              href={getUrl(item?.ctaUrl)}
              target={item?.ctaUrl?.startsWith("http") ? "_blank" : "_self"}
              className="btn mt-6 inline-block w-full !py-3 btn-primary bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white"
            >
              {item.ctaLabel || "Choose plan"}
            </a>
          </div>
          {selectedPlan === 0 && (
            <div
              className="mt-4 text-sm leading-6"
              dangerouslySetInnerHTML={{ __html: item.featuresDetails }}
            />
          )}
          {selectedPlan === 1 && (
            <div
              className="mt-4 text-sm leading-6"
              dangerouslySetInnerHTML={{
                __html: item.selfHostedFeaturesDetails,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
