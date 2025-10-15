import React from "react";

import { base } from "../../service/serviceConfig";
import { useLocalizedUrl } from "../../utils/languageUtils";
import Button from "../common/Button";
import Badge from "../common/Badge";

const SolutionHero = ({ data }) => {
  const getUrl = useLocalizedUrl();
  const hero = data?.hero[0];
  const words = hero?.title?.split(" ");
  const firstPart = words?.slice(0, 2).join(" ");
  const secondPart = words?.slice(2).join(" ");

  return (
    <div
      className="sm:pt-23 pt-15 sm:pb-10 pb-0"
      style={{
        backgroundImage: `url(${
          hero?.backgroundimage?.url.startsWith("http") ? "" : base
        }${hero?.backgroundimage?.url})`,
        WebkitBackgroundSize: "contain",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-cover pt-10 pb-5 sm:py-12 md:py-16 lg:py-26 text-center sm:px-6 ">
        <Badge variant="primaryGradient" className="animate-fade-in-up">{hero?.badge}</Badge>

        <h1 className="animate-fade-in-up animation-delay-400 text-3xl md:text-4xl lg:text-[64px] font-medium leading-tight sm:mt-8 mt-5">
          <span className="text-[#2F54EB]">{firstPart}</span>
          <br />
          <span>{secondPart}</span>
        </h1>
        <p className="md:px-10 sm:px-4 px-0 animate-fade-in-up animation-delay-600 text-lg sm:text-xl mx-auto max-w-4xl text-medium text-[#1E1E1E] md:mt-8 sm:mt-5 mt-3 md:mb-8 sm:mb-5 mb-3">
          {hero?.subtitle}
        </p>
        <div className="animate-fade-in-up animation-delay-400 flex flex-col sm:flex-row gap-3 md:mt-14 mt-8 justify-center">
          {hero?.buttons?.map((btn, index) => (
        <Button
          key={btn.id}
          onClick={() => {
            window.open(getUrl(btn.url), "_self", "noopener,noreferrer");
          }}
          variant={index === 0 ? "primary" : "light"}
          label={btn.label}
        >
          {btn.label}
        </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolutionHero;
