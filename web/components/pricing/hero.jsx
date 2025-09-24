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
          .filter((p) => p.label === "Cloud" || p.label === "Self-hosted")
          .map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.label)}
              className={`cursor-pointer flex items-center gap-2 px-4.5 py-2.5 rounded-md font-medium text-sm ${
                selectedPlan === plan.label
                  ? "bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white"
                  : "text-gray-600"
              }`}
            >
              {plan.label === "Cloud" && (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 25 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 10.5858L16.7426 14.8284L15.3284 16.2426L13.5 14.415V20H11.5V14.413L9.67157 16.2426L8.25736 14.8284L12.5 10.5858ZM12.5 0C16.0934 0 19.0544 2.70761 19.4541 6.19395C21.7858 6.83154 23.5 8.9656 23.5 11.5C23.5 14.3688 21.3036 16.7246 18.5006 16.9776L18.5 15C18.5 11.6863 15.8137 9 12.5 9C9.2616 9 6.62243 11.5656 6.50414 14.7751L6.5 15L6.50039 16.9776C3.69696 16.7252 1.5 14.3692 1.5 11.5C1.5 8.9656 3.21424 6.83154 5.54648 6.19411C5.94561 2.70761 8.90661 0 12.5 0Z"
                    fill={selectedPlan === plan.label ? "white" : "gray"}
                  />
                </svg>
              )}
              {plan.label === "Self-hosted" && (
                <svg
                  width="22"
                  height="16"
                  viewBox="0 0 22 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.3034 1.33716C16.9344 0.71103 15.4805 0.2547 13.9629 0C13.7719 0.32899 13.5596 0.77471 13.411 1.12492C11.7969 0.89144 10.1944 0.89144 8.60255 1.12492C8.45397 0.77471 8.2311 0.32899 8.05068 0C6.52251 0.2547 5.06861 0.71103 3.70915 1.33716C0.960529 5.39111 0.217659 9.3495 0.589099 13.2549C2.41443 14.5815 4.17612 15.388 5.90701 15.9187C6.33151 15.3456 6.71356 14.73 7.04255 14.0827C6.41641 13.8492 5.82211 13.5627 5.24904 13.2231C5.39762 13.117 5.5462 13.0003 5.68416 12.8835C9.1438 14.4648 12.8911 14.4648 16.3082 12.8835C16.4568 13.0003 16.5948 13.117 16.7434 13.2231C16.1703 13.5627 15.576 13.8492 14.9499 14.0827C15.2789 14.73 15.6609 15.3456 16.0854 15.9187C17.8152 15.388 19.5875 14.5815 21.4033 13.2549C21.8596 8.7341 20.6806 4.80747 18.3034 1.33716ZM7.5201 10.8459C6.48007 10.8459 5.63107 9.9014 5.63107 8.7447C5.63107 7.5879 6.45884 6.6434 7.5201 6.6434C8.57071 6.6434 9.4303 7.5879 9.4091 8.7447C9.4091 9.9014 8.57071 10.8459 7.5201 10.8459ZM14.4936 10.8459C13.4535 10.8459 12.6034 9.9014 12.6034 8.7447C12.6034 7.5879 13.4323 6.6434 14.4936 6.6434C15.5442 6.6434 16.4038 7.5879 16.3825 8.7447C16.3825 9.9014 15.5548 10.8459 14.4936 10.8459Z"
                    fill={selectedPlan === plan.label ? "white" : "gray"}
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
            .filter((p) => p.label === "Annually" || p.label === "Monthly")
            .map((plan) => (
              <button
                key={plan.id}
                onClick={() => setBilling(plan.label)}
                className={`cursor-pointer px-4 py-2 rounded-full text-sm ${
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
