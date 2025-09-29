import { useRef, useEffect } from "react";
import { base } from "../service/serviceConfig";
import Link from 'next/link';
import { useLocalizedUrl } from "../utils/languageUtils";

export default function Capabilities({ data }) {
  if (!data) return null;
  const features = data[0] || [];
  const sectionRef = useRef(null);
  const getUrl = useLocalizedUrl();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const animatedElements = entry.target.querySelectorAll(
            ".fade-up, .fade-left, .fade-right, .word-animate, .fade-card"
          );
          animatedElements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add("show");
            }, index * 150); // stagger
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section className="md:py-22 sm:py-10 py-5">
      <div className="max-w-7xl mx-auto lg:px-6 sm:px-4 px-2" ref={sectionRef}>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="fade-up">
            <div className="inline-flex text-base bg-white items-center gap-2 rounded-full border border-gradient-to-r from-[#0B8EE5] to-[#0022CB] px-4 py-2 font-medium text-blue-700 glow-effect">
            <div className="w-2 h-2 bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] rounded-full"></div>
            <span className="text-black">{features.badge}</span>
          </div>
            </div>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight md:py-4 py-2 leading-tight">
            {features.title && typeof features.title === "string" ? (
              <>
                {/* First line */}
                <div className="fade-left">
                  {features.title
                    .split(" ")
                    .slice(0, 2) // Take first 2 words => "Analytics that's"
                    .map((word, index) => (
                      <span
                        key={index}
                        className="text-slate-900 word-animate"
                        style={{ transitionDelay: `${index * 0.1}s` }}
                      >
                        {word}{" "}
                      </span>
                    ))}
                </div>

                {/* Second line */}
                <div className="md:fade-right">
                  {features.title
                    .split(" ")
                    .slice(2) // Rest of the words
                    .map((word, index) => (
                      <span
                        key={index}
                        className={`word-animate ${
                          word.includes("Fast") ||
                          word.includes("Intelligent") ||
                          word.includes("Secure")
                            ? "text-[#2F54EB] bg-clip-text"
                            : "text-slate-900"
                        }`}
                        style={{ transitionDelay: `${(index + 2) * 0.1}s` }}
                      >
                        {word}
                        {index < features.title.split(" ").slice(2).length - 1
                          ? " "
                          : ""}
                      </span>
                    ))}
                </div>
              </>
            ) : (
              <span className="text-slate-900">{features.title}</span>
            )}
          </h2>

          <p className="fade-up mt-3 text-[#757575] text-base">
            {features.subTitle}
          </p>
        </div>
            <div className="grid lg:grid-cols-12 md:grid-cols-2 sm:grid-cols-12 gap-6 relative fade-card">
          {features.coreCapabilitieList.map((item, index) =>
             item.size === 'lg' ? (
                    <div key={index} className={`cursor-pointer hover:before:transition-all 
                      hover:before:duration-500 bg-[#060A1F] hover:bg-[linear-gradient(90deg,#000000_0%,#101B52_63%,#1A2B85_100%)] hover:before:content-[''] 
                      hover:before:absolute hover:before:inset-0 before:rounded-2xl hover:before:bg-[linear-gradient(27deg,#0B8EE5_0%,#2D50FF_50%,#8F3BFF_100%)] hover:before:blur-xl 
                      before:opacity-70 before:-z-10  before:transition-all before:duration-500 relative
                      lg:col-span-6 md:col-span-1 sm:col-span-12 row-span-2 
                      text-white rounded-2xl sm:p-6 p-4 w-full 
                    `}>
                      <div className='h-full flex flex-col justify-between'>
                        <div>
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="font-semibold text-[#0B8EE5] text-base">{item.badge}</h3>
                      </div>
                    <p className="text-slate-300  mb-4 sm:text-[28px] text-xl font-medium">{item.title}</p>

                    {/* Feature List */}
                      <div className="space-y-3">
                        {item.bullets.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start gap-3">
                            <div className="min-w-5 w-4 h-4 sm:w-5 sm:h-5">
                              <img src="/svg/check.svg" alt="check" className="w-4 h-4 sm:w-5 sm:h-5" />
                              </div>
                              <p className="sm:text-base text-sm text-[#F3F3F3]">{feature}</p>
                          </div>
                        ))}
                      </div>
                        </div>
                        <div>
                              {item.image ? (
                                    <img
                                      src={`${item.image[0].url?.startsWith('http') ? '' : base}${item.image[0].url || item.image}`}
                                      alt={item.title || 'Feature image'}
                                      className="object-contain"
                                    />
                                  ) : (
                                    <div className="text-gray-600">{item.title}</div>
                                  )}
                        </div>
                      </div>
                   </div>
             ) : (
               <div key={index} className="lg:col-span-3 md:col-span-1 space-y-4 sm:col-span-6">
                 <div className="cursor-pointer hover:before:duration-500 hover:before:content-['']
                      hover:before:absolute hover:before:inset-0 before:rounded-2xl hover:before:bg-[linear-gradient(27deg,#0B8EE5_0%,#2D50FF_50%,#8F3BFF_100%)] hover:before:blur-xl
                      before:opacity-70 before:-z-10  before:transition-all before:duration-500 relative  border border-[#D9D9D9]  bg-[#F5F5F5] rounded-xl sm:p-9 p-4 shadow-md  items-center gap-3 h-full">
                        <div className='h-full flex flex-col justify-between'>
                        <div className='w-full'>
                     {item.image ? (
                       <img
                         src={`${item.image[0].url?.startsWith('http') ? '' : base}${item.image[0].url || item.image}`}
                         alt={item.title || 'Feature image'}
                         className="object-contain"
                       />
                     ) : (
                       <div className="text-gray-600 ">{item.title}</div>
                     )}
                   </div>
                   <div>
                     <div className="sm:mt-4 mt-2 sm:mb-4 mb-2 font-normal  text-blue-600 text-base">{item.badge}</div>
                     <div className="text-[#1E1E1E] sm:text-2xl text-xl font-medium">{item.title}</div>
                   </div>
                   </div>
                 </div>
               </div>
             )
          )}
            </div>
        </div>
        <div className='flex justify-center md:mt-20 sm:mt-10 mt-5'>

            <Link
              // key={i}
              href={getUrl(features.learnMore[0].url)}
              rel="noopener noreferrer"
              className={`glow-effect px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg shadow-sm text-sm sm:text-base text-center bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] transition-all duration-200 transform hover:-translate-y-0.5 text-white`}
            >
              {features.learnMore[0].label}
            </Link>

        </div>
    </section>
  );
}
