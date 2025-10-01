import React from "react";
import { base } from "../../service/serviceConfig";

const Industry = ({ data }) => {
  const industry = data?.ContentBlock || [];
  const industry0 = industry[0] || {};

  const title = industry0?.title ?? "";

  return (
    <div className="bg-white rounded-2xl lg:my-18 md:my-15 sm:my-10 my-6">
      <div className="text-center justify-center flex">
        <div className="my-4 justify-center inline-flex text-base items-center gap-2 rounded-full border border-gradient-to-r from-[#0B8EE5] to-[#0022CB] bg-white px-4 py-2 font-medium text-blue-700">
          <div className="w-2 h-2 bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] rounded-full"></div>
          <span className="text-black ">{industry0?.badge}</span>
        </div>
      </div>
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-[64px] font-medium leading-tight sm:mt-8 mt-5">
        {title
          ? title.split(" ").map((word, i) =>
              word === "Industry" || word === "Leaders" ? (
                <span key={i} className="text-[#2F54EB]">
                  {i === 0 ? "" : " "}
                  {word}
                </span>
              ) : (
                <span key={i}>
                  {i === 0 ? "" : " "}
                  {word}
                </span>
              )
            )
          : null}
      </h1>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 md:my-15 sm:my-10 my-5">
        {industry.slice(0, 2).map((item, index) => (
          <div key={index}>
            <div>
              <img
                src={`${item.image.url.startsWith("http") ? "" : base} ${
                  item.image.url
                }`}
                alt={item?.title}
              />
            </div>

            <div>
              {item?.cmsListItesm?.map((data, index) => (
                <div key={index}>
                  <div className="text-xl sm:text-base md:mt-7 sm:mt-5 mt-3 font-medium text-[#2F54EB]">
                    {data?.title}
                  </div>
                  <div className="md:text-3xl text-2xl font-medium md:my-7 sm:my-5 my-3 text-[#1E1E1E]">
                    {data?.description}
                  </div>
                </div>
              ))}
              <div className="flex flex-col gap-2">
                {item?.description
                  ?.split("\n") // split by new lines
                  .map((item, idx) => (
                    <div className="flex items-start gap-2 sm:gap-3">
                      <img
                        src="/svg/checkblue.svg"
                        alt="checkblue"
                        className="w-4 h-4 sm:w-5 sm:h-5"
                      />
                      <p
                        key={idx}
                        className="text-[#757575] md:text-md text-sm leading-normal"
                      >
                        {item}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
            <div className="md:mt-7 sm:mt-5 mt-3">
              {item?.contentBlockButton?.map((data, index) => (
                <a
                  href={data?.url}
                  className="text-sm text-gray-600 flex gap-2 justify-center md:justify-start items-center "
                  tabindex="-1"
                >
                  <p className="text-sm md:text-base font-bold text-[#1E1E1E]">
                    {data?.label}
                  </p>
                  <div>
                    <img
                      src="/svg/gradientarrow.svg"
                      alt="gradientarrow"
                      className="w-5 h-5 sm:w-7 sm:h-7"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Industry;
