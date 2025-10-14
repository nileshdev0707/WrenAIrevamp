import React, { useState, useEffect, useRef } from "react";
import { base } from "../../service/serviceConfig";
import Button from "../common/Button";

export default function ContentBlock({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState([]);
  const observerRefs = useRef([]);

  useEffect(() => {
    const observers = observerRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => [...new Set([...prev, index])]);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -70px 0px' }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [data]);

  return (
    <div>
      {data?.map((item, index) => {
        const url = item?.image?.url;
        const image = item?.image;
        const isRightAligned = item?.alignment === "right";
        const isVisible = visibleItems.includes(index);
        
        return (
          <div
            key={index}
            ref={(el) => (observerRefs.current[index] = el)}
            className="grid grid-cols-1 md:grid-cols-2 xl:gap-10 gap-5 lg:py-15 md:py-10 py-5 xl:px-0 sm:px-5 px-4"
          >
            <div className={`xl:px-10 sm:px-3 order-1 ${isRightAligned ? "md:order-2" : "md:order-1 md:text-left"}`}>
              <h2 className="text-blue-600 text-sm font-semibold">{item.badge}</h2>
              <h2 className="text-2xl md:text-3xl xl:text-4xl font-medium leading-tight mt-5">
                {item.title}
              </h2>
              <p className="text-gray-600 text-sm mt-4 pb-8">{item.subtitle}</p>
              <div dangerouslySetInnerHTML={{ __html: item.description }} />
              <div className="flex flex-col sm:flex-row gap-2">
              {item?.contentBlockButton?.map((button, index) => (
                  <Button 
                  key={index} 
                  href={button?.url} 
                  variant={index === 0 ? "primary" : "gray"}
                  label={button?.label}
                  target={button?.url?.startsWith("http") ? "_blank" : "_self"}
                  className="mt-0 sm:mt-5"
                  >
                    {button?.label}
                  </Button>
              ))}
              </div>
            </div>
            
           <div 
              className={`md:block hidden order-2 ${isRightAligned ? "md:order-1" : "md:order-2"} transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: isVisible ? '300ms' : '0ms' }}
            >
            <div>
                {url ? (
                <img
                  src={`${url.startsWith("http") ? "" : base}${url}`}
                  alt={image?.name}
                />
              ) : (
                <div className="text-gray-600">{image?.name}</div>
              )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
