import React, { useState } from "react";
import Link from "next/link";
import { useLocalizedUrl } from "../../utils/languageUtils";
import Button from "../common/Button";

export default function ProductHero({ data }) {
  const getUrl = useLocalizedUrl();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-10 sm:py-16 text-center">
      {data?.map((item, index) => (
        <div key={item.id}>
          <button className="btn btn-primary glow-effect bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white px-4 py-1 !rounded-full text-sm">
            {item?.badge}
          </button>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-medium leading-tight mt-5">
            {(item?.title || "Product")
              .split(".")
              .filter(Boolean)
              .map((line, index) => (
                <span
                  key={index}
                  className={`block ${
                    index === 0 ? "text-blue-600" : "text-black"
                  }`}
                >
                  {line.trim()}.
                </span>
              ))}
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-black xl:text-xl lg:text-lg text-base">
            {item?.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-14 justify-center">
            {item?.buttons?.map((btn, index) => (
              // <div key={btn.id} className="glow-effect bg-glow-effect">
              <Button
                variant={activeIndex === index ? "primary" : "light"}
                key={btn.id}
                href={getUrl(btn.url)}
                target={btn.url?.startsWith("http") ? "_blank" : "_self"}
                label={btn.label}
                onClick={() => setActiveIndex(index)} // set active button
              >
                {btn.label}
              </Button>
              // </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
