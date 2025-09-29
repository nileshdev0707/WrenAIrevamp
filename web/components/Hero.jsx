import Image from "next/image";
import { base } from "../service/serviceConfig";
import { useLocalizedUrl } from "../utils/languageUtils";
import Button from "./common/Button";

export default function Hero({ data }) {
  const getUrl = useLocalizedUrl();
  const badge = data?.badge || "#1 Generative BI Solution";
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

  return (
    <section className="relative overflow-hidden text-center md:pt-24 md:pb-24 pt-20 sm:pb-10 py-5 sm:px-6 px-4">
      {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-white" /> */}
      <div className="relative max-w-6xl mx-auto md:mt-25 sm:mt-10 mt-5">
        <div className="inline-block text-sm sm:text-base bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm animate-fade-in-up glow-effect">
          {badge}
        </div>
        <h1 className="my-6 sm:my-8 md:my-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-medium leading-tight animate-fade-in-up animation-delay-200">
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
                        ? "bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] bg-clip-text text-transparent"
                        : "text-[#060A1F]"
                    } animate-fade-in-up`}
                    style={{ animationDelay: `${200 + i * 100 + j * 50}ms` }}
                  >
                    {word}
                    {j < line.split(" ").length - 1 ? " " : ""}
                  </span>
                );
              })}
            </div>
          ))}
        </h1>
        <div className="my-4 sm:my-6 md:my-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0 animate-fade-in-up animation-delay-400">
          {buttons.map((b,i) => (
       <>
            <Button key={i} href={getUrl(b.url)} variant={i===0 ? "primary" : "secondary"}>
              {b.label}
            </Button>
       </>
          ))}
        </div>
        
        <p className="text-sm font-semibold sm:text-base uppercase tracking-wider text-[#060A1F] max-w-2xl sm:max-w-3xl mx-auto px-4 sm:px-0 animate-fade-in-up animation-delay-600">
          {sub}
        </p>

        {/* Hero mock image area */}
        <div className="relative md:pt-12 sm:pt-10 pt-8 animate-fade-in-up animation-delay-800">
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
