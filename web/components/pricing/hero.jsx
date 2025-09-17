import React, { useState } from "react";

export default function Hero({ pricing, billing, setBilling }) {
const [selectedPlan, setSelectedPlan] = useState("Cloud");
  const title = pricing?.title || "";

  return (
    <section className="text-center">
      <h1 className="text3xl md:text-5xl lg:text-6xl font-medium leading-tight md:mt-24 mt-16">
        {title.split(" ").map((word, i) =>
          word === "Pricing" ? (
            <span key={i} className="text-blue-600">
              {""} {word}
            </span>
          ) : (
            <span key={i}> {word}</span>
          )
        )}
      </h1>
      <p className="mt-3 max-w-3xl mx-auto">{pricing?.subtitle}</p>

      <div className="bg-white inline-flex items-center md:mt-10 mt-5 px-2.5 py-2 gap-5 rounded-2xl border border-gray-200">
        {pricing?.buttons
          .filter((p) => p.label === "Cloud" || p.label === "Self-hosted")
          .map((plan) => (
            <button
              key={plan.id}
              className={`cursor-pointer flex items-center gap-2 px-4.5 py-2.5 rounded-md font-medium text-sm ${
                selectedPlan === plan.label
                  ? "bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white"
                  : "text-gray-600"
              }`}
            >
             {plan.label === "Cloud" && <img src="/svg/cloud.svg" alt="Cloud" />}
             {plan.label === "Self-hosted" && <img src="/svg/selfHosted.svg" alt="Self-hosted" />}
              {plan.label}
            </button>
          ))}
      </div>
      <div className="flex justify-center mt-10">
        <div className="bg-white mt-6 px-2.5 py-2 rounded-full border border-gray-200">
        {pricing?.buttons
            .filter((p) => p.label === "Annually" || p.label === "Monthly")
            .map((plan) => (
              <button
                key={plan.id}
                onClick={() => setBilling(plan.label)}
                className={`cursor-pointer px-4 py-1.5 rounded-full text-sm ${
                  billing === plan.label
                    ? "bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white"
                    : "text-gray-700"
                }`}
              >
                {plan.label}
              </button>
            ))}
        </div>
      </div>
    </section>
  );
}
