import { useEffect, useState } from "react";
import { base } from "../service/serviceConfig";
import { useLocalizedUrl } from "../utils/languageUtils";
import Button from "./common/Button";

export default function Hero({ data }) {
  const [stars, setStars] = useState(null);
  const getUrl = useLocalizedUrl();
  const badge = data?.badge || "#1 Generative BI on GitHub";
  const headline =
    data?.title ||
    "Analytics without the Wait.\nDecisions without the Bottleneck.";
  const sub =
    data?.subtitle ||
    "Trusted by 10,000+ data experts and analytics teams worldwide.";
  const buttons = data?.buttons || [
    { label: "Start Free Trial Today", url: "#" },
    { label: "Schedule a demo", url: "#" },
  ];
  const heroMedia = data?.image;
  const heroImage =
    typeof heroMedia === "string"
      ? heroMedia
      : heroMedia?.url || heroMedia?.data?.attributes?.url || null;

  useEffect(() => {
    fetch(`https://api.github.com/repos/Canner/WrenAI`)
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count));
  }, []);

  return (
    <section className="relative overflow-hidden text-center md:pt-24 md:pb-24 pt-20 sm:pb-10 py-5 sm:px-6 px-3">
      {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-white" /> */}
      <div className="relative max-w-6xl mx-auto md:mt-25 sm:mt-10 mt-5">
        <div onClick={() => {
                    window.open(
                      "https://github.com/Canner/WrenAI",
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }} className="inline-block cursor-pointer text-sm sm:text-base bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm">
          <div className="flex items-center justify-center gap-2">
          {badge}
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.9998 15L4.12197 18.5902L5.72007 11.8906L0.489258 7.40983L7.35479 6.85942L9.9998 0.5L12.6449 6.85942L19.5104 7.40983L14.2796 11.8906L15.8777 18.5902L9.9998 15Z"
              fill="white"
            />
          </svg>
          {stars?.toLocaleString()}
          </div>
         
        </div>
        <h1 className="my-6 sm:my-8 md:my-10 text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-medium leading-tight animate-fade-in-up animation-delay-200">
          {headline.split("\n").map((line, i) => (
            <div key={i} className="mb-1 sm:mb-2">
              {line.split(" ").map((word, j) => {
                const isHighlighted =
                  word === "Analytics" || word === "Decisions";
                return (
                  <span
                    key={j}
                    className={`${
                      isHighlighted
                        ? "text-[#2F54EB] bg-clip-text"
                        : "text-[#060A1F]"
                    } animate-fade-in-up`}
                    style={{ animationDelay: `${200 + i * 100 + j * 50}ms` }}
                  >
                    {word === "Decisions" && <br />}
                    {word}
                    {j < line.split(" ").length - 1 ? " " : ""}
                  </span>
                );
              })}
            </div>
          ))}
        </h1>
        <div className="my-4 sm:my-6 md:my-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4  animate-fade-in-up animation-delay-400">
          {buttons.map((b, i) => (
            <>
              <Button
                key={i}
                href={getUrl(b.url)}
                variant={i === 0 ? "primary" : "secondary"}
              >
                {b.label}
              </Button>
            </>
          ))}
        </div>

        <p className="text-sm font-semibold sm:text-base uppercase tracking-wider text-[#060A1F] max-w-2xl sm:max-w-3xl mx-auto animate-fade-in-up animation-delay-600">
          {sub}
        </p>

        {/* Hero mock image area */}
        <div className="relative lg:pt-12 md:pt-10 sm:pt-8 pt-5 animate-fade-in-up animation-delay-800">
          {heroImage && (
            <img
              src={`${heroImage.startsWith("http") ? "" : base}${heroImage}`}
              alt="hero"
              className="w-full h-auto rounded-lg  transform hover:scale-101 transition-all duration-500 animate-fade-in-up"
            />
          )}
        </div>
      </div>
    </section>
  );
}
