import { useEffect } from "react";
import { base } from "../service/serviceConfig";
import { useLocalizedUrl } from "../utils/languageUtils";

export default function Stories({ data }) {
  const getUrl = useLocalizedUrl();
  const caseStudies = data?.caseStudies[0] || [];
  const title = caseStudies?.title || "case studies";
  const subtitle = caseStudies?.subTitle || "Customer Success Stories";

  const caseStudieItems = caseStudies?.caseStudieItems || [];

  useEffect(() => {
    const initSlick = () => {
      // Load CSS
      if (!document.querySelector('link[href*="slick"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
          "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css";
        document.head.appendChild(link);
      }

      if (!window.jQuery) {
        const jq = document.createElement("script");
        jq.src = "https://code.jquery.com/jquery-3.6.0.min.js";
        jq.onload = () => {
          const slick = document.createElement("script");
          slick.src =
            "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js";
          slick.onload = () => initSlider();
          document.head.appendChild(slick);
        };
        document.head.appendChild(jq);
      } else {
        initSlider();
      }
    };

    const initSlider = () => {
      if (window.jQuery?.fn?.slick) {
        const sliderElement = window.jQuery(".center");
        if (sliderElement.length > 0) {
          try {
            sliderElement.slick({
              centerMode: true,
              centerPadding: "300px",
              slidesToShow: 1,
              arrows: false,
              infinite: true,
              autoplay: true,
              autoplaySpeed: 3000,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: "100px",
                    slidesToShow: 1,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: "50px",
                    slidesToShow: 1,
                  },
                },
                {
                  breakpoint: 480,
                  settings: {
                    arrows: false,
                    centerMode: false,
                    centerPadding: "0px",
                    slidesToShow: 1,
                  },
                },
              ],
            });
          } catch (error) {
            console.log("Slick initialization error:", error);
          }
        }
      }
    };

    setTimeout(initSlick, 100);
    return () => {
      try {
        if (
          window.jQuery?.fn?.slick &&
          window.jQuery(".center").hasClass("slick-initialized")
        ) {
          window.jQuery(".center").slick("unslick");
        }
      } catch (error) {
        console.log("Slick cleanup error:", error);
      }
    };
  }, []);

  return (
    <section className="lg:py-20 md:py-15 py-10">
      <div className="mx-auto lg:px-6 md:px-4 px-2">
        <div className="text-center">
          <div className="my-4 inline-flex text-base items-center gap-2 rounded-full border border-gradient-to-r from-[#0B8EE5] to-[#0022CB] bg-white px-4 py-2 font-medium text-blue-700">
            <div className="w-2 h-2 bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] rounded-full"></div>
            <span className="text-black ">{title}</span>
          </div>
          <h2 className="sm:mt-4 mt-2 text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight md:py-4 py-2 leading-tight">
            {subtitle.split("\n").map((line, i) => (
              <div key={`line-${i}`} className="mb-1 sm:mb-2">
                {line.split(" ").map((word, j) => {
                  const isHighlighted = word.toLowerCase() === "stories";
                  return (
                    <span
                      key={`word-${i}-${j}`}
                      className={`${
                        isHighlighted
                          ? "bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] bg-clip-text text-transparent font-semibold"
                          : "text-[#060A1F]"
                      }`}
                    >
                      {word}
                      {j < line.split(" ").length - 1 ? " " : ""}
                    </span>
                  );
                })}
              </div>
            ))}
          </h2>
          <p className="text-[#757575] sm:text-base text-sm max-w-[550px] mx-auto">
            {caseStudies?.description}
          </p>
        </div>

        {/* Slick Slider Container */}
        <div className="mt-8 md:mt-12 lg:mt-16 slider-main-container">
          <div className="center">
            {caseStudieItems.map((story, index) => (
              <div key={index} className="px-2 md:px-4">
                <div className="grid 2xl:grid-cols-3 xl:grid-cols-5 p-4 md:p-5 gap-4 bg-[#F5F5F5] rounded-xl [.active]:bg-gradient-to-r [.active]:from-[#0B8EE5] [.active]:to-[#0022CB]">
                  <div className="2xl:col-span-1 xl:col-span-2">
                    <p className="xl:hidden sm:pb-2 pb-1 text-center 2xl:text-7xl xl:text-4xl md:text-4xl lg:text-5xl  text-3xl bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] bg-clip-text text-transparent font-bold">
                      {story.title}
                    </p>
                    <p className="text-[#1E1E1E] xl:hidden text-center sm:pb-3 pb-2 md:pb-5  sm:pt-2 font-bold text-lg md:text-xl">
                      {story.subTitle}
                    </p>
                    <div className="relative rounded-xl overflow-hidden group">
                      {story.image[0]?.url ? (
                        <>
                          <img
                            src={`${
                              story.image[0]?.url?.startsWith("http")
                                ? ""
                                : base
                            }${story.image[0]?.url}`}
                            alt={story.title}
                            className="w-full h-[250px] md:h-[350px] 2xl:h-[434px] object-cover transition-opacity duration-300"
                          />
                          <div className="bg-black/70 absolute inset-0 w-full h-[250px] md:h-[350px] 2xl:h-[434px] object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <div className="flex items-center justify-center h-full">
                              {story.image[1]?.url && (
                                <img
                                  src={`${
                                    story.image[1]?.url?.startsWith("http")
                                      ? ""
                                      : base
                                  }${story.image[1]?.url}`}
                                  alt={story.title}
                                  className="object-contain"
                                />
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-gray-600 flex items-center justify-center h-[250px] md:h-[350px] lg:h-[434px]">
                          {story.title}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="items-center 2xl:col-span-2 xl:col-span-3 flex flex-col justify-center text-center md:text-left">
                    <p className="py-2 hidden xl:block 2xl:text-7xl xl:text-6xl md:text-5xl lg:text-4xl text-xl bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] bg-clip-text text-transparent font-bold">
                      {story.title}
                    </p>
                    <p className="text-[#1E1E1E] hidden xl:block pb-3 md:pb-5 pt-2 font-bold text-lg md:text-xl">
                      {story.subTitle}
                    </p>
                    <div className="pb-4 md:pb-5 font-medium text-[#757575] max-w-md mx-auto md:mx-0 text-description text-base xl:text-xl lg:text-lg md:text-lg">
                      {story.description}
                    </div>
                    <div>
                      <a
                        href={getUrl(story.link)}
                        className="text-sm text-gray-600 flex gap-2 justify-center md:justify-start items-center"
                      >
                        <p className="text-sm md:text-base font-bold text-[#1E1E1E]">
                          {story.linkTitle}
                        </p>
                        <div className="min-w-6 w-6 h-6 md:min-w-7 md:w-7 md:h-7">
                          <img
                            src="/svg/gradientarrow.svg"
                            alt="arrow"
                            className="w-6 h-6 md:w-7 md:h-7 arrow-inactive"
                          />
                          <img
                            src="/svg/arrow.svg"
                            alt="arrow"
                            className="w-6 h-6 md:w-7 md:h-7 arrow-active hidden"
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
