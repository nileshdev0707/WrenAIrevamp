import React, { useState } from "react";
import { base } from "../../service/serviceConfig";

export default function WrenEngine({ data }) {
  const [selected, setSelected] = useState("Before");
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className="bg-[#F7FBFE] py-10 md:py-20">
      <div className="max-w-6xl mx-auto xl:px-0 px-10">
        {data?.map((item) => {
          const selectedDetail = item.wrenEngineDetails?.find(
            (detail) => detail.badge === selected
          );
          return (
            <div key={item.id}>
              <div className="text-center">
                <button className="border border-blue-600 text-black px-4 py-2 rounded-full font-medium text-sm shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    {item.badge}
                  </div>
                </button>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mt-5">
                    {item.title.split("Layer")[0]}Layer
                    <br />
                    {item.title.split("Layer")[1]}
                </h1>
                <p className="mt-5 mx-auto text-gray-600">{item.subtitle}</p>
              </div>
              <div className="flex justify-center md:mt-10 mt-5">
                <div className="bg-white md:mt-6 px-2.5 py-2 flex gap-2 rounded-lg border border-gray-200">
                  {item.wrenEngineDetails?.map((btn, index) => (
                    <button
                      key={btn.id}
                      onClick={() => setSelected(btn.badge)}
                      className={`cursor-pointer px-6 py-2.5 rounded-lg text-sm ${
                        selected === btn.badge
                          ? "bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white"
                          : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {btn.badge}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-10 flex justify-center">
                {selectedDetail?.image?.url ? (
                  <img
                    src={`${
                      selectedDetail.image.url.startsWith("http") ? "" : base
                    }${selectedDetail.image.url}`}
                    alt={selectedDetail.image?.name || selected}
                    className="rounded-lg shadow-md max-w-full h-auto"
                  />
                ) : (
                  <div className="text-gray-600">{selectedDetail?.badge}</div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-14 justify-center">
                {item?.buttonContantBlock?.map((btn, index) => (
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
      </div>
    </section>
  );
}
