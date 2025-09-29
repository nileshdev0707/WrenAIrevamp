import React from "react";
import { base } from "../../service/serviceConfig";

export default function WhyWrenSection({ data }) {

  const formatTitle = (text) => {
    return text.split(/(Insights|Enterprise|\.)/g).map((part, i) => {
      if (part === "Insights" || part === "Enterprise") {
        return (
          <span key={i} className="text-blue-600">
            {part}
          </span>
        );
      }
      if (part === ".") {
        return <span key={i}>.{<br />}</span>; // add newline after period
      }
      return <span key={i}>{part}</span>;
    });
  };
  return (
    <section className="bg-[#F7FBFE] py-10 sm:py-20">
      {data?.map((item, index) => {
        const { title, badge, WhyWrenSectionDetails } = item;
        return (
          <div className="max-w-6xl mx-auto xl:px-0 px-10" key={index}>
            <div className="text-center">
              <div className="glow-effect bg-glow-effect w-max mx-auto">
                <div class="inline-flex text-base  items-center gap-2 rounded-full border border-gradient-to-r from-[#0B8EE5] to-[#0022CB] bg-white px-4 py-2 font-medium text-blue-700">
                  <div class="w-2 h-2 bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] rounded-full"></div>
                  <span class="text-black">{badge}</span>
                  </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mt-5">
                {formatTitle(title)}
              </h1>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-14">
              {WhyWrenSectionDetails.map((item) => (
                <div
                  key={item.id}
                  className="glow-effect bg-glow-effect"
                >
                  <div className="bg-white px-8 py-9 rounded-xl border border-gray-300 h-full">
                  <div className="grid grid-cols-3 gap-8">
                    <h2 className="text-xl lg:text-2xl font-medium col-span-2">
                      {item.title}
                    </h2>
                    {item?.icon && (
                      <div className="col-span-1 flex justify-end">
                        <img
                          src={`${
                            item?.icon?.[0]?.url.startsWith("http") ? "" : base
                          }${item?.icon?.[0]?.url}`}
                          alt={item.title}
                          className="w-12 h-12"
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 md:pt-12 pt-6">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
