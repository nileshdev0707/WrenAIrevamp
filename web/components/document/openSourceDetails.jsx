import React, { useState } from "react";

export default function OpenSourceDetails({ data }) {
  return (
    <section className="bg-[#F7FBFE] py-10 md:py-20">
      <div className="max-w-6xl mx-auto xl:px-0 px-10">
        {data?.map((item) => {
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
                  {item.title.split("Building Blocks")[0]}
                  <span className="text-blue-600">Building Blocks</span> <br />
                  {item.title.split("Building Blocks")[1]}
                </h1>

                <p className="max-w-2xl mt-5 mx-auto text-gray-600">
                  {item.subTitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
