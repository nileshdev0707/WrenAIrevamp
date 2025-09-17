import React from "react";
import { base } from "../service/axios";

export default function WhyWrenAI({ data }) {
  return (
    <div className="py-8 sm:py-16 max-w-6xl mx-auto xl:px-0 px-10">
      {data?.map((item, index) => (
        <div key={index}>
          <div className="text-center">
            <button className="border border-blue-600 text-black px-4 py-2 rounded-full font-medium text-sm shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-600" />
                {item?.badge}
              </div>
            </button>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mt-5">
              {item?.title?.split("Source")[0]} Source <br />
              { item?.title?.split("Source")[1]}
            </h1>

            <p className="max-w-3xl mt-5 mx-auto text-gray-600 md:text-base text-sm">
              {item?.subTitle}
            </p>
          </div>
          <div className="pt-15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-10 gap-5">
            {item?.whyWrenAIDetails?.map((content, index) => {
              const url = content?.icon?.url;
              return (
                <div className="flex gap-2 items-baseline" key={index}>
                  {url ? (
                    <img
                      src={`${url?.startsWith("http") ? "" : base}${url}`}
                      alt={item.name}
                    />
                  ) : (
                    <div className="text-gray-600">{content?.title}</div>
                  )}
                  <div>
                    <h2 className="md:text-lg text-base font-medium">{content?.title}</h2>
                    <p className="text-gray-500 md:text-sm text-sm">{content?.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-14 justify-center">
            {item?.buttonContantBlock?.map((btn, index) => (
              <a
                key={btn.id}
                href={btn.url}
                className={`px-6 py-3 rounded-md font-medium text-sm transition-all duration-200 shadow-sm 
            ${
              index === 0
                ? "bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white"
                : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50"
            }`}
              >
                {btn?.label}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
