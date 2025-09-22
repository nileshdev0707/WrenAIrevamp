import React, { useState } from "react";

export default function DocumentHero({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className="py-10 md:py-16 text-center">
      {data?.map((item, index) => {
        const words = item?.title?.split(" ");
        const firstPart = words.slice(0, 2).join(" ");
        const secondPart = words.slice(2).join(" ");
        return (
          <div key={index}>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-medium leading-tight mt-8">
              <span>{firstPart}</span>
              <br />
              <span className="text-blue-600">{secondPart}</span>
            </h1>

            <p className="mt-5 max-w-3xl mx-auto text-black xl:text-xl lg:text-lg text-base">{item?.subtitle}</p>
            <div className="flex gap-3 mt-14 justify-center">
              {item?.buttons?.map((btn, index) => (
                <a
                  key={btn.id}
                  href={btn.url}
                  target={btn.url?.startsWith("http") ? "_blank" : "_self"}
                  onClick={() => setActiveIndex(index)}
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
        );
      })}
    </section>
  )
}
