import React from "react";

export default function Tiers({ tiers, billing }) {

  return (
    <div className="mt-10 grid md:grid-cols-3 gap-6">
    {tiers?.map((item, index) => (
      <div
        key={index}
        className={`p-7 rounded-xl ring-1 ring-gray-200 bg-white shadow-sm`}
      >
        <div className="text-3xl font-medium">{item.name}</div>
        <p className="text-gray-500 mb-4 text-sm pt-4">
          {item.description}
        </p>

        <div className="flex items-baseline mb-4">
          <span className="text-4xl font-semibold mt-1 text-blue-600">
            {billing === "Annually"
              ? item.annualPrice || item.price
              : item.price}
          </span>
          <span className="text-gray-500 ml-2 text-sm">
            /month, billed annually
          </span>
        </div>
        <div className="mt-6">
          <span className="text-sm bg-gray-100 p-2 rounded-full text-black font-medium">
            {item.features}
          </span>
        </div>
        <div className="mt-6">
          <a
            href={item.ctaUrl}
            className={`btn mt-6 inline-block text-white w-full !py-3 ${
              item.ctaLabel === "Talk to sales"
                ? "bg-black hover:bg-black"
                : "btn-primary bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white"
            }`}
          >
            {item.ctaLabel || "Choose plan"}
          </a>
        </div>
        <div
          className="mt-4 text-sm leading-6"
          dangerouslySetInnerHTML={{ __html: item.featuresDetails }}
        />
      </div>
    ))}
  </div>
  );
}
