import React from "react";

export default function WhyWrenAI({ data }) {
  return (
    <div className="bg-white py-8 sm:py-16 text-center">
      <div className="max-w-6xl mx-auto xl:px-0 px-10">
        <button className="border border-blue-600 text-black px-4 py-2 rounded-full font-medium text-sm shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-600" />
            Why Wren AI is #1
          </div>
        </button>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mt-5">
          The Fastest-Growing Open Source <br /> Project in Generative BI
        </h1>
        <p className="max-w-3xl mt-5 mx-auto text-gray-600">
          Wren AI OSS combines the speed of innovation with the strength of
          community. With weekly updates, world-class documentation, and over
          1,500 active community members worldwide, Wren AI empowers developers
          to build, customize, and scale analytics with confidence. Designed to
          be LLM-agnostic and semantic-first, it’s trusted by contributors,
          startups, and enterprises alike.
        </p>
      </div>
    </div>
  );
}
