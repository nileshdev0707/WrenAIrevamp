import React, { useState } from "react";
import { base } from "../../service/serviceConfig";

export default function ProductHero({ product }) {
  return (
    <div>
      {product?.map((item) => {
        const url = item?.image?.url;
        const image = item?.image;
        const isRightAligned = item?.alignment === "right";
        return (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 md:pb-16"
          >
            <div className={`px-10 order-1 ${isRightAligned ? "md:order-2" : "md:order-1 md:text-left"}`}>
              <h2 className="text-blue-600 text-sm font-semibold">{item.badge}</h2>
              <h1 className="text-3xl lg:text-4xl font-medium leading-tight mt-5">
                {item.title}
              </h1>
              <p className="text-gray-600 text-sm mt-4 pb-8">{item.subtitle}</p>
              <div dangerouslySetInnerHTML={{ __html: item.description }} />
              <div className="flex gap-2">
              {item?.contentBlockButton?.map((button) => (
                <button key={button?.id} className="btn btn-primary bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white px-4 py-1 mt-5 text-sm">
                  {button?.label}
                </button>
               ))}
              </div>
            </div>
            
           <div className={`md:block hidden order-2 ${isRightAligned ? "md:order-1" : "md:order-2"}`}>
              {url ? (
                <img
                  src={`${url.startsWith("http") ? "" : base}${url}`}
                  alt={image?.name}
                />
              ) : (
                <div className="text-gray-600">{image?.name}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
