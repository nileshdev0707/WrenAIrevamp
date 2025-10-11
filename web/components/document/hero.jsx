import React, { useState } from "react";
import { safeBackgroundImage } from "../../utils/ssrHelpers";
import Button from "../common/Button";
import Badge from "../common/Badge";

export default function DocumentHero({ data }) {
  const heroImage = data?.[0]?.backgroundimage?.url;
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div
      style={{
        backgroundImage: safeBackgroundImage(heroImage),
        WebkitBackgroundSize: "100%",
        backgroundPosition: "center top",
      }}
      className="bg-no-repeat pt-24 pb-10 max-w-6xl mx-auto bg-contain"
    >
      <section className="md:py-16 text-center sm:px-6 px-4">
        {data?.map((item, index) => {
          const words = item?.title?.split(" ");
          const firstPart = words.slice(0, 2).join(" ");
          const secondPart = words.slice(2).join(" ");
          return (
            <div key={index}>
              <Badge variant="primaryGradient" className="animate-fade-in-up">{item?.badge}</Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-medium leading-tight mt-8">
                <span>{firstPart}</span>
                <br />
                <span className="text-blue-600">{secondPart}</span>
              </h1>

              <p className="mt-5 max-w-3xl mx-auto text-black xl:text-xl lg:text-lg text-base">
                {item?.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-14 justify-center px-4">
                {item?.buttons?.map((btn, index) => (
                  <Button
                    key={btn.id}
                    href={btn.url}
                    target={btn.url?.startsWith("http") ? "_blank" : "_self"}
                    onClick={() => setActiveIndex(index)}
                  variant={activeIndex === index ? "primary" : "light"}
                  label={btn.label}
                    className="transition-all duration-200"
                  >
                    {btn.label}
                  </Button>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
