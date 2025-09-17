import React from "react";
import { base } from "../../service/serviceConfig";

const SolutionHero = ({ data }) => {
  const hero = data?.hero[0];
  const words = hero?.title?.split(" ");
  const firstPart = words?.slice(0, 2).join(" ");
  const secondPart = words?.slice(2).join(" ");
  console.log("hero ==> ", hero);
  return (
    <div
      className="sm:pt-23 pt-15 sm:pb-10 pb-0"
      style={{
        backgroundImage: `url(${
          hero?.backgroundimage?.url.startsWith("http") ? "" : base
        }${hero?.backgroundimage?.url})`,
        WebkitBackgroundSize: "100%",
        backgroundPosition: "center top",
      }}
    >
      <div className="bg-cover pt-10 pb-5 sm:py-12 md:py-16 lg:py-26 text-center">
        <button className="animate-fade-in-up btn btn-primary bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white px-4 py-1 !rounded-full text-sm">
          {hero?.badge}
        </button>
        <h1 className="animate-fade-in-up animation-delay-400 text-2xl sm:text-3xl md:text-4xl lg:text-[64px] font-medium leading-tight sm:mt-8 mt-5">
          <span className="text-blue-600">{firstPart}</span>
          <br />
          <span>{secondPart}</span>
        </h1>
        <p className="animate-fade-in-up animation-delay-600 text-lg sm:text-xl mx-auto max-w-3xl text-medium text-[#1E1E1E] md:mt-8 sm:mt-5 mt-3 md:mb-8 sm:mb-5 mb-3">
          {hero?.subtitle}
        </p>
        <div className="animate-fade-in-up  animation-delay-400 flex flex-col sm:flex-row gap-3 md:mt-14 mt-8 justify-center">
              {hero?.buttons?.map((btn, index) => (
                <button
                  key={btn.id}
                  // href={btn.url}
                  className={`px-6 py-3 rounded-md font-medium text-sm transition-all duration-200 shadow-sm
                ${
                  index === 0
                    ? "bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] transition-all duration-200 transform hover:-translate-y-0.5 text-white"
                    : "bg-white text-gray-800 border border-gray-200 hover:bg-[#060A1F] transition-all duration-200 transform hover:-translate-y-0.5 hover:border-[#060A1F] hover:text-white"
                }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
      </div>
    </div>
  );
};

export default SolutionHero;
