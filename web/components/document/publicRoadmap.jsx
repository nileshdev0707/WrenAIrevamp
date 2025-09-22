import React from "react";

export default function PublicRoadmap({ data }) {
    return (
      <section className="py-10 lg:py-20">
        <div className="max-w-6xl mx-auto xl:px-0 px-10">
          {data?.map((item) => {
            return (
              <div key={item.id}>
                <div className="text-center">
                 
                    <div className="text-blue-600 font-medium">
                      {item.badge}
                    </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mt-5">
                  {item.title}
                  </h1>
  
                  <p className="max-w-2xl mt-5 mx-auto text-gray-600">
                    {item.subTitle}
                  </p>
                   <div className="flex flex-col sm:flex-row gap-3 mt-14 justify-center">
                  {item?.buttonBlock?.map((btn, index) => (
                    <a
                      key={btn.id}
                      href={btn.url}
                      target={btn.url?.startsWith("http") ? "_blank" : "_self"}
                      className={`px-6 py-3 rounded-md font-medium text-sm transition-all duration-200 shadow-sm
                        ${
                          index === 0
                            ? "bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white"
                            : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50"
                        }`}
                    >
                      {btn.label}
                    </a>
                  ))}
                </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }