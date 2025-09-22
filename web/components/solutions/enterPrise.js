import React, { useRef, useEffect } from "react";
import { base } from "../../service/serviceConfig";

const EnterPrise = (data) => {
  const enterPrise = data?.data?.EnterpriseFeaturesBlock[0];
  const words = enterPrise?.title?.split(" ");
  const firstPart = words?.slice(0, 3).join(" ");
  const secondPart = words?.slice(3).join(" ");

  // Refs for scroll animations
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Also animate child elements with fade-card class
            const childElements = entry.target.querySelectorAll('.fade-card');
            childElements.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('show');
              }, index * 150); // Staggered animation with 150ms delay
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe all animated elements
    const elementsToAnimate = [
      sectionRef.current,
      headerRef.current,
      cardsRef.current
    ].filter(Boolean);

    elementsToAnimate.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elementsToAnimate.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);
  return (
    <div ref={sectionRef} className="md:pb-20 md:pt-20 pb-10 pt-5 fade-up max-w-7xl mx-auto lg:px-6 md:px-4 px-2">
        <div ref={headerRef} className="text-center fade-up">
                <div className="my-4 inline-flex text-base items-center gap-2 rounded-full border border-gradient-to-r from-[#0B8EE5] to-[#0022CB] bg-white px-4 py-2 font-medium text-blue-700">
                    <div className="w-2 h-2 bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] rounded-full"></div>
                        <span className="text-black ">{enterPrise?.badge}</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[64px] font-medium leading-tight sm:mt-8 mt-5">
                    <span className="">{firstPart}</span>
                    <br />
                     <span className="text-[#2F54EB]">{secondPart}</span>
                     </h1>
               </div>
        <div ref={cardsRef} className="grid lg:grid-cols-3 md:grid-cols-2  sm:grid-cols-2 grid-cols-1 md:gap-6 sm:gap-5 gap-4 lg:my-20 md:my-15 sm:my-10 my-5">
            {enterPrise?.EnterpriseFeaturesItems?.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl lg:p-10 md:p-8 sm:p-6  p-4   border md:h-77 sm:h-60 h-55 border-[#D9D9D9]  flex flex-col justify-between fade-card">
                <div className="flex gap-2 justify-between">
                    <div className="max-w-60">
                      <h3 className="xl:text-3xl lg:text-2xl sm:text-xl font-medium">{item?.title}</h3>
                    </div>
                    <div className="max-w-20 sm:w-12 w-8">
                        <img src={`${base}${item?.icon?.url}`} alt={item?.title} className="w-full  object-cover"/>
                    </div>
                </div>
                <div className="md:text-base text-sm">
                   
                    <p className="text-[#757575]">{item?.subTitle}</p>
                </div>
            </div>
            ))}
        </div>
        <div className="flex justify-center md:mt-20 sm:mt-10 mt-5 animate-fade-in-up animation-delay-200" onClick={() => window.open(enterPrise?.button?.[0]?.url, "_blank", "noopener,noreferrer")}>
            <button className="bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] hover:-translate-y-0.5   transition-all text-white font-semibold md:py-4 py-3 md:px-8 px-4 rounded-lg lg:text-lg md:text-md text-sm duration-200 shadow-lg hover:shadow-xl">
                {enterPrise?.button?.[0]?.label}
            </button>
        </div>
    </div>
  );
};

export default EnterPrise;