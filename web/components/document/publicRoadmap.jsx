import React from "react";
import Button from "../common/Button";

export default function PublicRoadmap({ data }) {
    return (
      <section className="sm:py-10 py-8 lg:py-20">
        <div className="max-w-6xl mx-auto xl:px-0 sm:px-8 px-4">
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
                    <Button
                      key={btn.id}
                      href={btn.url}
                      target={btn.url?.startsWith("http") ? "_blank" : "_self"}
                      variant={index === 0 ? "primary" : "gray"}
                      label={btn.label}
                        className={`transition-all duration-200 
                        `}
                    >
                      {btn.label} 
                    </Button>
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