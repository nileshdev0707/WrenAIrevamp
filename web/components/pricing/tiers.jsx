import React from "react";
import { useLocalizedUrl } from "../../utils/languageUtils";

export default function Tiers({ tiers, billing }) {
  const getUrl = useLocalizedUrl();

  return (
    <div className="mt-10 grid lg:grid-cols-3 md:grid-cols-2 gap-6 max-w-7xl mx-auto px-3">
      {tiers?.map((item, index) => (
        <div
          key={index}
          className={`p-5 lg:p-10 ${item.highlight ? 'pt-0 lg:pt-0' : '' } rounded-xl ring-1 ring-gray-200 bg-white shadow-sm`}
        >
          {item?.highlight && (
            <div className="flex justify-end">
            <p className="bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] px-4 py-2 rounded-b-[8px] text-white font-semibold text-md h-9.5 w-[135px]">{item?.highlightTag}</p>
          </div>
          )}
          
          <div className="text-3xl font-medium">{item.name}</div>
          <p className="text-gray-500 mb-4 text-sm pt-4">{item.description}</p>

          <div className="flex items-baseline mb-4">
            <span className="lg:text-4xl text-3xl font-semibold mt-1 bg-gradient-to-r from-[#0B8EE5] via-61%  via-[#044CD5] to-[#0222CB] text-transparent bg-clip-text">
              {billing === 0 ? item.annualPrice : item.price}
            </span>
            <span className="text-gray-500 ml-2 text-sm">
              /month, billed annually
            </span>
            
          </div>
          <div className="mt-6">
            <span className="text-sm bg-gray-100 p-2 rounded-full text-black font-medium capitalize">
              {billing === 0 ? item.annualFeatures : item.features}
            </span>
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
          <div
            className="mt-4 text-sm leading-6"
            dangerouslySetInnerHTML={{ __html: item.featuresDetails }}
          />
        </div>
      ))}
    </div>
  );
}
