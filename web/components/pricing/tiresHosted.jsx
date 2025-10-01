import React from "react";
import { useLocalizedUrl } from "../../utils/languageUtils";

export default function TiersHosted({ tiers }) {
  const getUrl = useLocalizedUrl();

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-3">
      {tiers?.map((item, index) => (
        <div
          key={index}
          className={`p-5 rounded-xl ring-1 ring-gray-200 bg-white shadow-sm`}
        >
          <div className="text-3xl font-medium">{item.name}</div>
          <p className="text-gray-500 mb-4 text-sm pt-4">{item.description}</p>

          <div className="sm:h-40">
         <div>
            <div className="capitalize lg:text-4xl text-3xl font-semibold mt-1 bg-gradient-to-r from-[#0B8EE5] via-61%  via-[#044CD5] to-[#0222CB] text-transparent bg-clip-text">
              {item.annualPrice}
            </div>
            <div
              className={`text-gray-500 ml-2 text-sm ${
                index === 1 ? "block" : "hidden"
              }`}
            >
              /month, billed annually
            </div>
          </div>
          {item.annualFeatures ||
            (item.selfHostedFeatures && (
              <div className="sm:mt-6 mt-4">
                <div className="flex flex-col gap-5 justify-end">
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
              </div>
            ))}
          </div>
          <div>
            <a
              href={getUrl(item?.ctaUrl)}
              target={item?.ctaUrl?.startsWith("http") ? "_blank" : "_self"}
              className="btn sm:mt-8 mt-5 inline-block w-full !py-3 btn-primary bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white"
            >
              {item.ctaLabel || "Choose plan"}
            </a>
          </div>
          <div
            className="mt-4 text-sm leading-6"
            dangerouslySetInnerHTML={{
              __html: item.selfHostedFeaturesDetails,
            }}
          />
        </div>
      ))}
    </div>
  );
}
