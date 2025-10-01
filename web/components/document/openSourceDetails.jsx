import React from "react";
import { base } from "../../service/serviceConfig";

export default function OpenSourceDetails({ data }) {
  return (
    <section className="bg-[#F7FBFE] py-10 md:pb-15 md:pt-20">
      <div className="max-w-6xl mx-auto xl:px-0 px-10">
        {data?.map((item) => {
          const { WrenAI, wrenEngineAI, image } = item;
          const imageUrl = image?.url;

          return (
            <div key={item.id}>
              {/* Header Section */}
              <div className="text-center">
                <div className="w-max mx-auto">
                  <div className="inline-flex text-base  items-center gap-2 rounded-full border border-gradient-to-r from-[#0B8EE5] to-[#0022CB] bg-white px-4 py-2 font-medium text-blue-700">
                    <div class="w-2 h-2 bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] rounded-full"></div>
                    <span class="text-black">{item.badge}</span></div></div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mt-5">
                  {item.title.split("Building Blocks")[0]}
                  <span className="text-blue-600">Building Blocks</span> <br />
                  {item.title.split("Building Blocks")[1]}
                </h1>

                <p className="max-w-2xl mt-5 mx-auto text-gray-600">
                  {item.subTitle}
                </p>
              </div>

              {/* Boxes + Center */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:items-center lg:gap-15 gap-8 mt-10">
                {/* Left box */}
                <div className="bg-white rounded-xl border border-gray-200 py-6 px-10">
                  <h3 className="text-lg font-semibold">{WrenAI?.title}</h3>
                  <p className="text-sm text-gray-500">{WrenAI?.subTitle}</p>
                  <p className="mt-2 text-gray-700 text-sm leading-relaxed pt-5">
                    {WrenAI?.description}
                  </p>
                </div>

                {/* Center circle with image */}
                <div className="relative items-center justify-center lg:flex hidden">
                  <div className="flex items-center absolute -left-15">
                    <div className="inline-block w-2 h-2 border-l-2 border-t-2 border-blue-600 -rotate-45"></div>
                    <div className="flex-1 border-t-2 border-dashed border-blue-600 xl:w-28 w-24"></div>
                    {/* Square (diamond style) */}
                    <div className="w-2 h-2 bg-blue-600 rotate-45"></div>
                  </div>
                  {imageUrl ? (
                    <img
                      src={`${
                        imageUrl.startsWith("http") ? "" : base
                      }${imageUrl}`}
                      alt={image?.name}
                    />
                  ) : (
                    <div className="text-gray-600">{image?.name}</div>
                  )}
                  <div className="flex items-center absolute -right-15">
                    <div className="w-2 h-2 bg-blue-600 rotate-45"></div>
                    <div className="flex-1 border-t-2 border-dashed border-blue-600 xl:w-28 w-24"></div>

                    <div className="inline-block w-2 h-2 border-r-2 border-b-2 border-blue-600 -rotate-45"></div>
                  </div>
                </div>

                {/* Right box */}
                <div className="bg-white rounded-xl border border-gray-200 py-6 px-10">
                  <h3 className="text-lg font-semibold">
                    {wrenEngineAI?.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {wrenEngineAI?.subTitle}
                  </p>
                  <p className="mt-2 text-gray-700 text-sm leading-relaxed pt-5">
                    {wrenEngineAI?.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
