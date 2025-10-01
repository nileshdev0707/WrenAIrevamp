import React from "react";

export default function ContentBlock({ contentBlock }) {

  return (
    <div className="bg-[#F7FBFE]">
      <div className="md:py-16 py-8 md:px-0 px-5 max-w-6xl mx-auto">
        {contentBlock?.map((block, index) => {
          const text = block.title;
          const parts = text.split("AI");
          const firstPart = parts[0] + "AI";
          const secondPart = parts[1] ? parts[1].trim() : "";
          return (
            <div key={index} className="grid gap-8 md:grid-cols-3 pb-10">
              <div className="flex flex-col justify-center col-span-2 sm:col-span-1">
                <h2 className="text-3xl md:text-5xl font-medium leading-tight pt-5 text-center sm:text-left">
                  <span className="text-black">{firstPart}</span>{" "}
                  {secondPart && (
                    <span className="text-blue-500">{secondPart}</span>
                  )}
                </h2>
                {block.subtitle && (
                  <p className="mt-1 text-sm text-gray-500 text-center sm:text-left">{block.subtitle}</p>
                )}
                {block?.badge && (
                  <div className="mt-7 text-center sm:text-left">
                    <span className=" text-gray-400 text-sm">
                      {block.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Right column */}
              <div
                className="mt-4 col-span-2 overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: block.description }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
