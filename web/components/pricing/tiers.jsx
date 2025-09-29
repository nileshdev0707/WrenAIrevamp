import React from "react";
import { useLocalizedUrl } from "../../utils/languageUtils";

export default function Tiers({ tiers, billing, selectedPlan }) {
  const getUrl = useLocalizedUrl();

  return (
    <div className="mt-10 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {tiers?.map((item, index) => (
      <div
        key={index}
        className={`p-7 rounded-xl ring-1 ring-gray-200 bg-white shadow-sm`}
      >
        <div className="text-3xl font-medium">{item.name}</div>
        <p className="text-gray-500 mb-4 text-sm pt-4">
          {item.description}
        </p>

        <div className="flex items-baseline mb-4">
          <span className="text-4xl font-semibold mt-1 text-blue-600">
            {billing === 0
              ? item.annualPrice
              : item.price}
          </span>
          <span className="text-gray-500 ml-2 text-sm">
            /month, billed annually
          </span>
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
            className={`btn mt-6 inline-block text-white w-full !py-3 ${
              item.ctaLabel === "Talk to sales"
                ? "bg-black hover:bg-black"
                : "btn-primary bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white"
            }`}
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
            dangerouslySetInnerHTML={{ __html: item.selfHostedFeaturesDetails }}
          />
        )}
      </div>
    ))}
  </div>
  );
}
