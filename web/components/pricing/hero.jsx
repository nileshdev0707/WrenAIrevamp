import React, { useState } from "react";

export default function Hero({
  pricing,
  billing,
  setBilling,
  selectedPlan,
  setSelectedPlan,
}) {
  const title = pricing?.title || "";

  return (
    <section className="text-center">
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-medium leading-tight md:mt-24 mt-16">
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
      <p className="mt-3 max-w-3xl mx-auto xl:text-xl lg:text-lg text-base">
        {pricing?.subtitle}
      </p>

      <div className="bg-white inline-flex items-center md:mt-10 mt-5 px-2.5 py-2 gap-5 rounded-2xl border border-gray-200">
        {pricing?.buttons
          .filter((p, index) => index === 0 || index === 1)
          .map((plan, index) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(index)}
              className={`cursor-pointer flex items-center gap-2 px-8 py-4 rounded-md font-semibold text-sm ${
                selectedPlan === index
                  ? "bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white"
                  : "text-gray-600"
              }`}
            >
              {index === 0 && (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 25 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 10.5858L16.7426 14.8284L15.3284 16.2426L13.5 14.415V20H11.5V14.413L9.67157 16.2426L8.25736 14.8284L12.5 10.5858ZM12.5 0C16.0934 0 19.0544 2.70761 19.4541 6.19395C21.7858 6.83154 23.5 8.9656 23.5 11.5C23.5 14.3688 21.3036 16.7246 18.5006 16.9776L18.5 15C18.5 11.6863 15.8137 9 12.5 9C9.2616 9 6.62243 11.5656 6.50414 14.7751L6.5 15L6.50039 16.9776C3.69696 16.7252 1.5 14.3692 1.5 11.5C1.5 8.9656 3.21424 6.83154 5.54648 6.19411C5.94561 2.70761 8.90661 0 12.5 0Z"
                    fill={selectedPlan === index ? "white" : "gray"}
                  />
                </svg>
              )}
              {index === 1 && (
               <svg 
                  width="21" 
                  height="18" 
                  viewBox="0 0 21 18" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M9.5 4V1C9.5 0.44772 9.9477 0 10.5 0H19.5C20.0523 0 20.5 0.44772 20.5 1V17C20.5 17.5523 20.0523 18 19.5 18H1.5C0.94772 18 0.5 17.5523 0.5 17V5C0.5 4.44772 0.94772 4 1.5 4H9.5ZM3.5 13V15H8.5V13H3.5ZM12.5 13V15H17.5V13H12.5ZM12.5 10V12H17.5V10H12.5ZM12.5 7V9H17.5V7H12.5ZM3.5 10V12H8.5V10H3.5Z"
                  fill={selectedPlan === index ? "white" : "#767676"}
                 />
               </svg>
              )}
              {plan.label}
            </button>
          ))}
      </div>
      <div className="flex justify-center mt-10">
        <div className="bg-white mt-6 px-2.5 py-2 rounded-full border border-gray-200">
          {pricing?.buttons
            .filter((p, index) => index === 2 || index === 3)
            .map((plan, index) => (
              <button
                key={plan.id}
                onClick={() => setBilling(index)}
                className={`cursor-pointer px-4 py-2 rounded-full text-sm font-semibold ${
                  billing === index
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
