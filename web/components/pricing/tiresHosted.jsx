import React from "react";
import { useLocalizedUrl } from "../../utils/languageUtils";

export default function TiersHosted({ tiers }) {
  const getUrl = useLocalizedUrl();

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-3">
      {tiers?.map((item, index) => (
        <div   key={index}
        className={`${item.highlight
            ? 'bg-gradient-to-r from-[#0B8EE5] to-[#0022CB]'
            : 'bg-gray-200'
          } animate-pulse-glow-on-hover  animate-pulse-glow-on-hover hover:bg-gradient-to-r hover:from-[#0B8EE5] hover:to-[#0022CB] rounded-xl shadow-sm p-[1px]`}
        style={{
          animationDelay: `${index * 0.2}s`, 
          zIndex: 1000 - index,
          // each card appears 0.2s after previous
        }}>
        <div
          className={`p-5 lg:p-10 ${item.highlight ? 'pt-0 lg:pt-0' : ''} rounded-xl bg-white h-full`}
        >
          {item?.highlight && (
            <div className="flex justify-end">
              <p className="bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] px-4 py-2 rounded-b-[8px] text-white font-semibold text-md h-9.5 w-[135px]">{item?.highlightTag}</p>
            </div>
          )}
          <div className="text-3xl font-medium">{item.name}</div>
          <p className="text-gray-500 mb-4 text-sm pt-4">{item.description}</p>

          <div className="sm:h-40">
            <div className="flex flex-col gap-2">
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
            {item.annualFeatures ? (
              <div>
                <span className="text-gray-500 ml-2 text-sm">
                  {item.annualFeatures}
                </span>
              </div>
            ) : (
              item.selfHostedFeatures && (
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
              )
            )}
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
            dangerouslySetInnerHTML={{
              __html: item.selfHostedFeaturesDetails,
            }}
          />
          </div>
        </div>
      ))}
    </div>
  );
}
