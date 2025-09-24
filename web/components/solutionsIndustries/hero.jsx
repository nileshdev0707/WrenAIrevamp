import React, { useState } from "react";

export default function SolutionsIndustriesHero({ solutionsIndustries }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-10 sm:py-16 text-center">
      {solutionsIndustries?.map((item,index) => {
        const words = item?.title?.split(" ");
        const firstPart = words?.slice(0, 2).join(" ");
        const secondPart = words?.slice(2).join(" ");
       return (
      <div key={index} >
        <button className="btn btn-primary bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white px-4 py-1 !rounded-full text-sm">
          {item?.badge}
        </button>
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-medium leading-tight mt-5">
          <span className="text-[#2F54EB]">{firstPart}</span>
          <br />
          <span>{secondPart}</span>
        </h1>

        <p className="mt-5 max-w-2xl mx-auto text-black xl:text-xl lg:text-lg text-base">
          {item?.subTitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-14 justify-center">
            {item?.buttonContantBlock?.map((btn, index) => (
              <a
                key={btn.id}
                href={btn.url}
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
      )})}
    </section>
  );
}
