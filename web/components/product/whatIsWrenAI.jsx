import React, { useState } from "react";

export default function WhatIsWrenAI({ product }) {
  console.log("product ==> ", product);
  const { title, badge, subtitle, image, WhatisWrenAIItem } = product;
  const parts = title.split("#1 Generative BI");
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || "";
  const url = image?.url;
  return (
    <section>
      <div className="text-center mt-10">
        <button className="border border-blue-600 text-black px-4 py-2 rounded-full font-medium text-sm shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-600" />
            {badge}
          </div>
        </button>
        <h1 className="text-4xl md:text-5xl font-medium leading-tight mt-8">
          {parts[0]}
          <span className="text-blue-600">#1 Generative BI</span>
          {parts[1]}
        </h1>
        <p className="text-gray-600 mt-4">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center pt-16">
        {/* Left column */}
        <div className="space-y-16">
          {WhatisWrenAIItem.filter((item) => item.position === "left").map(
            (item) => (
              <div key={item.id} className="px-8">
                <div className="flex items-center gap-3 mb-2">
                  {item.icon && (
                    <img
                      src={`${item.icon.url.startsWith("http") ? "" : base}${item.icon.url}`}
                      alt={item.title}
                    />
                  )}
                </div>
                  <h3 className="font-semibold text-lg py-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.subTitle}</p>
              </div>
            )
          )}
        </div>

        {/* Center Image */}
        <div className="flex justify-center">
          {url ? (
            <img
              src={`${url.startsWith("http") ? "" : base}${url}`}
              alt={image?.name}
            />
          ) : (
            <div className="text-gray-600">{image?.name}</div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-16">
          {WhatisWrenAIItem.filter((item) => item.position === "right").map(
            (item) => (
              <div key={item.id} className="px-8">
                <div className="flex items-center gap-3 mb-2">
                  {item.icon && (
                    <img
                      src={`${item.icon.url.startsWith("http") ? "" : base}${item.icon.url}`}
                      alt={item.title}
                    />
                  )}
                </div>
                  <h3 className="font-semibold text-lg py-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.subTitle}</p>
              </div>
            )
          )}
        </div>
      </div>
      
    </section>
  );
}
