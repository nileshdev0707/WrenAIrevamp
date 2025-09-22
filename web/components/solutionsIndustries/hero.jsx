import React, { useState } from "react";

export default function SolutionsIndustriesHero() {

  return (
    <section className="py-10 sm:py-16 text-center">
      <div>
        <button className="btn btn-primary bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white px-4 py-1 !rounded-full text-sm">
          Industries
        </button>
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-medium leading-tight mt-5">
          <span className="text-blue-600">Empowering Industries </span> <br />
          <span className="text-black">with AI-Driven Insights</span>
        </h1>

        <p className="mt-5 max-w-2xl mx-auto text-black xl:text-xl lg:text-lg text-base">
          Wren AI transforms data into actionable intelligence across industries
          with an open-source Generative Business Intelligence platform. Explore
          how we solve unique challenges for each sector.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-14 justify-center">
          <a
            href="#"
            target="_self"
            className={`px-6 py-3 rounded-md font-medium text-sm transition-all duration-200 shadow-sm bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white`}
          >
            Request Enterprise Demo
          </a>
          <a
            href="#"
            target="_self"
            className={`px-6 py-3 rounded-md font-medium text-sm transition-all duration-200 shadow-sm bg-white text-gray-800 border border-gray-200 hover:bg-gray-100`}
          >
            Contact Sales
          </a>
        </div>
      </div>
    </section>
  );
}
