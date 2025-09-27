import React, { useState } from "react";
import { base } from "../../service/serviceConfig";

export default function WhatIsWrenAI({ data }) {
  return (
      <section>
        {data?.map((block, index) => {
          const { title, badge, subtitle, WhatisWrenAIItem } = block;
          const parts = title.split("#1 Generative BI");

          return (
            <div key={index} className="mt-5 lg:p-6">
              <div className="flex items-center justify-center mb-8">
                <div className="text-center">
                  <button className="glow-effect border bg-white border-blue-600 text-black px-4 py-2 rounded-full font-medium text-sm shadow-sm">
                    <div className="flex items-center gap-2 glow-effect">
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
              </div>

              <div className="lg:flex flex-col items-center hidden">
                {WhatisWrenAIItem?.map((item, i) => {
                  const isRight = item.position === "right";
                  const url = item?.icon?.url;
                  const zIndex = `z-${40 - i * 10}`;
                  const top = ['-top-0', '-top-13', '-top-26', '-top-39'];
                  return (
                    <div
                      key={item.id}
                      className={`relative ${zIndex} ${top[i]}`}
                    >
                      <div className="relative">
                        <div className="absolute top-4 left-0 w-52 h-52 bg-blue-200 opacity-40 rotate-x-45 rotate-z-45 rounded-xl"></div>
                        <div
                          className={`relative w-52 h-52 rotate-x-45 rotate-z-45 shadow-2xl flex items-center justify-center rounded-xl ${
                            isRight
                              ? "bg-gradient-to-r from-[#0e46d9] to-blue-600"
                              : "bg-[#0E1949]"
                          }`}
                        >
                          <div className="-rotate-45 text-center text-white">
                            <h3 className="text-base font-bold">
                              {item.title}
                            </h3>
                          </div>
                        </div>

                        {isRight ? (
                          <div className="flex absolute top-1/2 left-full pl-10">
                            <div className="border-dotted border-gray-400 border-t-2 w-20"></div>
                           <div>
                           <div className="-translate-y-1/2">
                              {url ? (
                                <img
                                  src={`${url.startsWith("http") ? "" : base}${url}`}
                                  alt={item?.icon?.name}
                                />
                              ) : (
                                <div className="text-gray-600">
                                  {item?.icon?.name}
                                </div>
                              )}
                            </div>
                            <div className="w-64">
                              <h4 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                                {item.title}
                              </h4>
                              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                                {item.subTitle}
                              </p>
                            </div>
                           </div>
                          </div>
                        ) : (
                          <div className="flex absolute top-1/2 right-full pr-20">
                            <div className="absolute border-dotted border-gray-400 border-t-2 w-60 left-12"></div>
                            <div>
                            <div className="-translate-y-1/2">
                              {url ? (
                                <img
                                  src={`${ url.startsWith("http") ? "" : base}${url}`}
                                  alt={item?.icon?.name}
                                />
                              ) : (
                                <div className="text-gray-600">
                                  {item?.icon?.name}
                                </div>
                              )}
                            </div>
                            <div className="w-64">
                              <h4 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                                {item.title}
                              </h4>
                              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                                {item.subTitle}
                              </p>
                          </div>
                            </div>
                           </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="lg:hidden grid sm:grid-cols-2 grid-cols-1 gap-4 pt-5 px-5">
              {WhatisWrenAIItem?.map((item, i) => {
                const url = item?.icon?.url;
                return (
                  <div
                    key={item.id}
                    className="bg-white p-4 rounded-lg border border-gray-200 "
                  >
                    {url ? (
                      <img
                        src={`${url.startsWith("http") ? "" : base}${url}`}
                        alt={item?.icon?.name}
                      />
                    ) : (
                      <div className="text-gray-600">{item?.icon?.name}</div>
                    )}
                    <h3 className="text-lg font-bold pt-5">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                      {item.subTitle}
                    </p>
                  </div>
                );
              })}
            </div>
            </div>
          );
        })}
      </section>
  );
}
