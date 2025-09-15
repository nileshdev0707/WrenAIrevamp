import React from "react";

export default function ContentBlock({ contentBlock }) {

  return (
    <div className="bg-[#F7FBFE]">
      <div className="py-16 max-w-6xl mx-auto">
        {contentBlock?.map((block) => {
          const text = block.title;
          const parts = text.split("AI");
          const firstPart = parts[0] + "AI";
          const secondPart = parts[1] ? parts[1].trim() : "";
          return (
            <div key={block.id} className="grid gap-5 md:grid-cols-3 pb-10">
              <div className="flex flex-col justify-center col-span-1">
                <h2 className="text-5xl font-medium leading-tight pt-5">
                  <span className="text-black">{firstPart}</span>{" "}
                  {secondPart && (
                    <span className="text-blue-500">{secondPart}</span>
                  )}
                </h2>
                {block.subtitle && (
                  <p className="mt-1 text-sm text-gray-500">{block.subtitle}</p>
                )}
              </div>

              {/* Right column */}
              <div
                className="mt-4 col-span-2"
                dangerouslySetInnerHTML={{ __html: block.description }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
