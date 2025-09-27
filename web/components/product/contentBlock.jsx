import React, { useState } from "react";
import { base } from "../../service/serviceConfig";
import Link from "next/link";

export default function ProductHero({ product }) {
  return (
    <div>
      {product?.map((item, index) => {
        const url = item?.image?.url;
        const image = item?.image;
        const isRightAligned = item?.alignment === "right";
        return (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 xl:gap-10 gap-5 pt-10 md:pb-16 xl:px-0 px-5"
          >
            <div className={`xl:px-10 px-5 order-1 ${isRightAligned ? "md:order-2" : "md:order-1 md:text-left"}`}>
              <h2 className="text-blue-600 text-sm font-semibold">{item.badge}</h2>
              <h1 className="text-2xl md:text-3xl xl:text-4xl font-medium leading-tight mt-5">
                {item.title}
              </h1>
              <p className="text-gray-600 text-sm mt-4 pb-8">{item.subtitle}</p>
              <div dangerouslySetInnerHTML={{ __html: item.description }} />
              <div className="flex gap-2">
              {item?.contentBlockButton?.map((button, index) => (
                <Link
                  key={index}
                  href={button?.url}
                  target={button?.url?.startsWith("http") ? "_blank" : "_self"}
                  className="glow-effect btn btn-primary bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white px-4 py-1 mt-5 text-sm">
                  {button?.label}
                </Link>
               ))}
              </div>  
            </div>
            
           <div className={`md:block hidden order-2  ${isRightAligned ? "md:order-1" : "md:order-2"}`}>
              {url ? (
                <div className="glow-effect">
                <img
                  src={`${url.startsWith("http") ? "" : base}${url}`}
                    alt={image?.name}
                    className=""
                  />
                </div>
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
