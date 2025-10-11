import React, { useState } from "react";
import { base } from "../../service/serviceConfig";
import Button from "../common/Button";

export default function WrenEngine({ data }) {
  const [selected, setSelected] = useState("Before");
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className="bg-[#F7FBFE] py-10 md:py-20">
      <div className="max-w-6xl mx-auto xl:px-0 sm:px-8 px-4">
        {data?.map((item) => {
          const selectedDetail = item.wrenEngineDetails?.find(
            (detail) => detail.badge === selected
          );
          return (
            <div key={item.id}>
              <div className="text-center">
               <div className="w-max mx-auto">
                <div className="inline-flex text-base  items-center gap-2 rounded-full border border-gradient-to-r from-[#0B8EE5] to-[#0022CB] bg-white px-4 py-2 font-medium text-blue-700">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] rounded-full"></div>
                    <span className="text-black">{item.badge}</span>
                  </div>
                </div>
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
                    <Button
                      key={btn.index}
                      onClick={() => setSelected(btn.badge)}
                      variant={selected === btn.badge ? "primary" : "light"}
                      label={btn.badge}
                    >
                      {btn.badge}
                    </Button>
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
              <div className="flex flex-col sm:flex-row gap-4 mt-14 justify-center">
                {item?.buttonContantBlock?.map((btn, index) => (
                  <Button
                    key={btn.id}
                    href={btn.url}
                    target={btn.url?.startsWith("http") ? "_blank" : "_self"}
                    onClick={() => setActiveIndex(index)}
                    variant={activeIndex === index ? "primary" : "gray"}
                    label={btn.label}
                   
                  >
                    {btn.label}
                  </Button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
