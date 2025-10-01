import React, { useState } from "react";
import { base } from "../../service/serviceConfig";
import Button from "../common/Button";

export default function ContentBlock({ solutionsIndustries }) {
  const [activeTab, setActiveTab] = useState(solutionsIndustries[0]?.id);
  
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    setActiveTab(id);
    if (el) {
      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : 0;
  
      const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
  
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };

  
  return (
    <div>
      <div className="bg-white flex overflow-x-auto scrollbar-hide gap-2 rounded-xl p-2 border border-gray-200">
        {solutionsIndustries?.map((tab, index) => (
          // <button
          //   key={index}
          //   onClick={() => scrollToSection(tab.id)}
          //   className={`cursor-pointer w-full md:py-4 sm:px-4 whitespace-nowrap sm:py-2 px-3 py-1.5 sm:rounded-xl rounded-lg text-sm font-medium transition-all duration-200 ${
          //     activeTab === tab.id
          //       ? "bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white shadow-sm"
          //       : "text-[#757575] hover:text-gray-900 hover:bg-gray-100"
          //   }`}
          // >
          //   {tab.badge}
          // </button>
          <Button
          key={tab.id}
          href={tab.url}
          target={tab.url?.startsWith("http") ? "_blank" : "_self"}
          onClick={() => scrollToSection(tab.id)}
          variant={activeTab === tab.id ? "primary" : "light"}
          label={tab.badge}
          className="whitespace-nowrap min-w-max !px-4"
        >
          {tab.badge}
        </Button>
        ))}
      </div>
      <div className="mt-10">
        {solutionsIndustries?.map((item, index) => {
          const url = item?.image?.url;
          const image = item?.image;
          const isRightAligned = item?.alignment === "right";
          return (
            <div
              key={index}
              id={item.id}
              className="grid grid-cols-1 md:grid-cols-2 xl:gap-10 gap-5 lg:py-10 md:py-5 xl:px-0 px-5"
            >
              <div
                className={`xl:px-10 px-5 order-1 ${
                  isRightAligned ? "md:order-2" : "md:order-1 md:text-left"
                }`}
              >
                <h1 className="text-2xl md:text-3xl xl:text-4xl font-medium leading-tight mt-5">
                  {item.title}
                </h1>
                <p className="text-gray-600 text-sm mt-6 pb-8">
                  {item?.subTitle}
                </p>
                <div
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                />
                {/* {item?.button?.length > 0 && (
                <div className="flex gap-2 mt-10">
                  {item?.button?.map((button, index) => (
                    <a
                      key={index}
                      href={button?.url}
                      target={
                        button?.url?.startsWith("http") ? "_blank" : "_self"
                      }
                      className="btn btn-primary bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white px-4 py-2 mt-5 text-sm"
                    >
                      {button?.label}
                    </a>
                  ))}
                </div>
                )} */}
              </div>

              <div
                className={`md:block hidden order-2 ${
                  isRightAligned ? "md:order-1" : "md:order-2"
                }`}
              >
                {url ? (
                  <img
                    src={`${url.startsWith("http") ? "" : base}${url}`}
                    alt={image?.name}
                  />
                ) : (
                  <div className="text-gray-600">{image?.name}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
