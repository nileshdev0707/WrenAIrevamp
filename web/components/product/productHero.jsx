import React, { useState } from "react";
import { useLocalizedUrl } from "../../utils/languageUtils";

export default function ProductHero({ data }) {
  const getUrl = useLocalizedUrl();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-10 sm:py-16 text-center">
      {data?.map((item, index) => (
        <div key={item.id}>
          <button className="btn btn-primary bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white px-4 py-1 !rounded-full text-sm">
            {item?.badge}
          </button>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-medium leading-tight mt-5">
            {(item?.title || "Product")
              .split(".")
              .filter(Boolean)
              .map((line, index) => (
                <span
                  key={index}
                  className={`block ${
                    index === 0 ? "text-blue-600" : "text-black"
                  }`}
                >
                  {line.trim()}.
                </span>
              ))}
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-black xl:text-xl lg:text-lg text-base">
            {item?.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-14 justify-center">
            {item?.buttons?.map((btn, index) => (
              <a
                key={btn.id}
                href={getUrl(btn.url)}
                target={btn.url?.startsWith("http") ? "_blank" : "_self"}
                onClick={() => setActiveIndex(index)} // set active button
                className={`px-6 py-3 rounded-md font-medium text-sm transition-all duration-200 shadow-sm
                  ${
                    activeIndex === index
                      ? "bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white"
                      : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-100"
                  }`}
              >
                {btn.label}
              </a>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
