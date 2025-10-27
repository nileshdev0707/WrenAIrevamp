import React from "react";
import { useLocalizedUrl } from "../../utils/languageUtils";

export default function Tiers({ tiers, billing, onSeeDetails }) {
  const getUrl = useLocalizedUrl();

  return (
    <div className="md:mt-16 mt-10 grid lg:grid-cols-3 md:grid-cols-2 gap-6 max-w-7xl mx-auto px-4">
      {tiers?.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col justify-between p-5 lg:p-10 ${
            item.highlight ? "pt-0 lg:pt-0 ring-blue-500" : "ring-gray-200"
          } rounded-xl ring-1  bg-white shadow-sm hover:ring-blue-500 `}
        >
          <div>
            {item?.highlight && (
              <div className="flex justify-end">
                <p className="bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] px-4 py-2 rounded-b-[8px] text-white font-semibold text-md h-9.5 w-[135px]">
                  {item?.highlightTag}
                </p>
              </div>
            )}

            <div className="text-3xl font-medium">{item.name}</div>
            <p className="text-gray-500 mb-4 text-sm pt-4">
              {item.description}
            </p>

            <div className="sm:h-40">
              <div className="flex flex-col gap-2">
                <div className="lg:text-4xl text-3xl font-semibold mt-1 bg-gradient-to-r from-[#0B8EE5] via-61%  via-[#044CD5] to-[#0222CB] text-transparent bg-clip-text">
                  {billing === 0 ? item.annualPrice : item.price}
                </div>
                <div className="text-gray-500 ml-2 text-sm block">
                  /month, billed annually
                </div>
              </div>
              <div className="mt-6">
                <span className="text-sm bg-gray-100 p-2 rounded-full text-black font-medium capitalize">
                  {billing === 0 ? item.annualFeatures : item.features}
                </span>
              </div>
            </div>
            <div>
              <a
                href={getUrl(item?.ctaUrl)}
                target={item?.ctaUrl?.startsWith("http") ? "_blank" : "_self"}
                className={`btn mt-6 inline-block text-white w-full !py-3 ${
                  item.ctaLabel === "Talk to Sales"
                    ? "bg-black hover:bg-black"
                    : "btn-primary bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white"
                }`}
              >
                {item.ctaLabel || "Choose plan"}
              </a>
            </div>
            <div
              className="mt-4 text-sm leading-6"
              dangerouslySetInnerHTML={{ __html: item.featuresDetails }}
            />
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={onSeeDetails}
              className="text-blue-600 text-sm font-medium hover:underline focus:outline-none cursor-pointer"
            >
              See full plan details ↓
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
