import React, { useState } from "react";

export default function WhatIsWrenAI({ data }) {
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || "";
  return (
    <>
      <section>
        {data?.map((item, index) => {
          const { title, badge, subtitle, image, WhatisWrenAIItem } = item;
          const url = image?.url;
          const parts = title.split("#1 Generative BI");
          return (
            <div key={index}>
              <div className="text-center mt-10">
                <button className="border border-blue-600 text-black px-4 py-2 rounded-full font-medium text-sm shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600" />
                    {badge}
                  </div>
                </button>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mt-8">
                  {parts[0]}
                  <span className="text-blue-600">#1 Generative BI</span>
                  {parts[1]}
                </h1>
                <p className="text-gray-600 mt-4">{subtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center pt-16">
                <div className="space-y-16">
                  {WhatisWrenAIItem.filter(
                    (item) => item.position === "left"
                  ).map((item) => (
                    <div key={item.id} className="px-8">
                      <div className="flex items-center gap-3 mb-2">
                        {item.icon && (
                          <img
                            src={`${
                              item.icon.url.startsWith("http") ? "" : base
                            }${item.icon.url}`}
                            alt={item.title}
                          />
                        )}
                      </div>
                      <h3 className="font-semibold text-lg py-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{item.subTitle}</p>
                    </div>
                  ))}
                </div>

                <div className="justify-center md:flex hidden">
                  {url ? (
                    <img
                      src={`${url.startsWith("http") ? "" : base}${url}`}
                      alt={image?.name}
                    />
                  ) : (
                    <div className="text-gray-600">{image?.name}</div>
                  )}
                </div>

                <div className="space-y-16">
                  {WhatisWrenAIItem.filter(
                    (item) => item.position === "right"
                  ).map((item) => (
                    <div key={item.id} className="px-8">
                      <div className="flex items-center gap-3 mb-2">
                        {item.icon && (
                          <img
                            src={`${
                              item.icon.url.startsWith("http") ? "" : base
                            }${item.icon.url}`}
                            alt={item.title}
                          />
                        )}
                      </div>
                      <h3 className="font-semibold text-lg py-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{item.subTitle}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* <div className="mt-5 p-6">
        <div className="flex items-center justify-center mb-8">
          <div className="relative w-full max-w-7xl">
            <div className="relative h-auto flex flex-col items-center">
              <div className="relative z-40">
                <div className="relative">
                  <div className="absolute top-4 left-0 w-52 h-52 bg-blue-200 opacity-40 rounded-xl rotate-x-45 rotate-z-45"></div>
                  <div className="relative w-52 h-52 bg-gradient-to-b from-[#0e46d9] to-blue-600 rotate-x-45 rotate-z-45 shadow-2xl flex items-center justify-center rounded-xl">
                    <div className="-rotate-45 text-center text-white">
                      <h3 className="text-base font-bold">Representation Layer</h3>
                      <h3 className="text-base font-bold">Layer</h3>
                    </div>
                  </div>
                  <div className="absolute top-1/2 -right-35 w-25 h-px border-t-2 border-dotted border-gray-400 -translate-y-1/2"></div>
                  <div className="absolute top-1/2 -right-40 -translate-y-1/2 w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center">
                      <div className="w-2 h-2 border border-white rounded"></div>
                    </div>
                  </div>
                  <div className="absolute -right-96 top-1/2 pt-10 w-64">
                    <h4 className="font-bold text-lg text-gray-800">
                      Representation Layer
                    </h4>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                      The interface where insights are delivered in intuitive
                      formats like natural language responses, dynamic
                      visualizations, and real-time dashboards—making data
                      actionable for everyone.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-30">
                <div className="relative -top-13">
                  <div className="absolute top-4 left-0 w-52 h-52 bg-indigo-300 opacity-40 rotate-x-45 rotate-z-45 rounded-xl"></div>
                  <div className="relative w-52 h-52 bg-[#0E1949] rotate-x-45 rotate-z-45 shadow-2xl flex items-center justify-center rounded-xl">
                    <div className="-rotate-45 text-center text-white">
                      <h3 className="text-base font-bold">Agentic</h3>
                      <h3 className="text-base font-bold">Layer</h3>
                    </div>
                  </div>
                  <div className="absolute top-1/2 -left-70 w-60 h-px border-t-2 border-dotted border-gray-400 -translate-y-1/2"></div>
                  <div className="absolute top-1/2 -left-80 -translate-y-1/2 w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <div className="w-4 h-4 bg-indigo-600 rounded"></div>
                  </div>
                  <div className="absolute -left-80 w-64 top-1/2 pt-10">
                    <h4 className="font-bold text-lg text-gray-800">
                      Agents Layer
                    </h4>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                      The conversational engine that powers seamless
                      interactions between users and data. AI agents understand
                      your queries, interpret intent, and respond contextually,
                      allowing seamless refinement and follow-ups.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-20">
                <div className="relative -top-26">
                  <div className="absolute top-4 left-0 w-52 h-52 bg-blue-200 opacity-40 rotate-x-45 rotate-z-45 rounded-xl"></div>
                  <div className="relative w-52 h-52 bg-gradient-to-b from-[#0e46d9] to-blue-600 rotate-x-45 rotate-z-45 shadow-2xl flex items-center justify-center rounded-xl">
                    <div className="-rotate-45 text-center text-white">
                      <h3 className="text-base font-bold">Semantic</h3>
                      <h3 className="text-base font-bold">Layer</h3>
                    </div>
                  </div>
                  <div className="absolute top-1/2 -right-35 w-25 h-px border-t-2 border-dotted border-gray-400 -translate-y-1/2"></div>
                  <div className="absolute top-1/2 -right-40 -translate-y-1/2 w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center">
                      <div className="text-white text-xs font-bold">≡</div>
                    </div>
                  </div>
                  <div className="absolute -right-96 top-1/2 pt-10 w-64">
                    <h4 className="font-bold text-lg text-gray-800">
                      Semantic Layer
                    </h4>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                      The semantic layer maps relationships between data points,
                      enriching context-aware insights by unifying data meaning
                      across diverse sources.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-10">
                 <div className="relative -top-39">
                  <div className="absolute top-4 left-0 w-52 h-52 bg-indigo-300 opacity-40 rotate-x-45 rotate-z-45 rounded-xl"></div>
                  <div className="relative w-52 h-52 bg-[#0E1949] rotate-x-45 rotate-z-45 shadow-2xl flex items-center justify-center rounded-xl">
                    <div className="-rotate-45 text-center text-white">
                      <h3 className="text-base font-bold">Data</h3>
                      <h3 className="text-base font-bold">Layer</h3>
                    </div>
                  </div>
                  <div className="absolute top-1/2 -left-70 w-60 h-px border-t-2 border-dotted border-gray-400 -translate-y-1/2"></div>
                  <div className="absolute top-1/2 -left-80 -translate-y-1/2 w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <div className="w-4 h-4 bg-indigo-600 rounded flex items-center justify-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-2 h-px bg-white mb-px"></div>
                        <div className="w-2 h-px bg-white mb-px"></div>
                        <div className="w-2 h-px bg-white"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -left-80 top-1/2 pt-10 w-64">
                    <h4 className="font-bold text-lg text-gray-800">
                      Data Layer
                    </h4>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                      The foundation integrates and unifies data from diverse
                      sources, such as databases, APIs, and third-party storage.
                      Built on a composable architecture, this layer provides
                      flexibility and scalability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
