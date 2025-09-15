import React, { useState } from "react";

export default function ProductHero({ product }) {
  return (
    <section className="py-16 text-center">
      <button className="btn btn-primary bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white px-4 py-1 !rounded-full text-sm">
        {product?.badge}
      </button>
      <h1 className="text-4xl md:text-6xl font-medium leading-tight mt-8">
        {(product.title || "Product")
          .split(".")
          .filter(Boolean)
          .map((line, index) => (
            <span
              key={index}
              className={`block ${
                index === 0 ? "text-blue-600" : "text-black"
              }`}
            >
              {line.trim()}.
            </span>
          ))}
      </h1>

      <p className="mt-5 max-w-2xl mx-auto text-black">{product.subtitle}</p>
      <div className="flex gap-3 mt-14 justify-center">
        {product?.buttons?.map((btn, index) => (
          <a
            key={btn.id}
            href={btn.url}
            className={`px-6 py-3 rounded-md font-medium text-sm transition-all duration-200 shadow-sm
                ${
                  index === 0
                    ? "bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white"
                    : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50"
                }`}
          >
            {btn.label}
          </a>
        ))}
      </div>
    </section>
  );
}
