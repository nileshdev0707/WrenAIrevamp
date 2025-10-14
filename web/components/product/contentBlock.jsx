import React, { useState, useRef, useEffect } from "react";
import { base } from "../../service/serviceConfig";
import Button from "../common/Button";
import { useLocalizedUrl } from "../../utils/languageUtils";

export default function ProductHero({ product, tab }) {
const sectionRefs = useRef([]);
const observerRefs = useRef([]);

const [openIds, setOpenIds] = useState([]);
const [visibleItems, setVisibleItems] = useState([]);

  const toggle = (id) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((openId) => openId !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };
  const getUrl = useLocalizedUrl();

  const tabToIndex = {
    "ask-questions-in-your-language": 0,
    "secure-data-access": 1,
    "connect-to-any-data-source": 2,
    "no-code-visual-analytics": 3,
    "embedded-analytics": 4,
    "enterprise-control": 5,
  };
  
  
  useEffect(() => {
    const index = tabToIndex[tab];
    if (index != null && sectionRefs.current[index]) {
      const element = sectionRefs.current[index];
      const rect = element.getBoundingClientRect();
      const scrollTop = document.documentElement.scrollTop;
  
      window.scrollTo({
        top: rect.top + scrollTop - 100, // 👈 offset 50px from top
        behavior: "smooth",
      });
    }
  }, [tab]);

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
  }, [product]);
  

  return (
    <div>
      {product?.map((item, index) => {
        const url = item?.image?.url;
        const image = item?.image;
        const isRightAligned = item?.alignment === "right";
        const isVisible = visibleItems.includes(index);
        
        return (
          <div
            key={index}
            ref={(el) => {
              sectionRefs.current[index] = el;
              observerRefs.current[index] = el;
            }}
            className="grid grid-cols-1 md:grid-cols-2 xl:gap-10 gap-5 lg:pt-20 md:pt-10 md:pb-10 pb-5 pt-5 lg:pb-16 xl:px-0 sm:px-5 px-4"
          >
            <div
              className={`xl:px-10 sm:px-3 order-1 ${
                isRightAligned ? "md:order-2" : "md:order-1 md:text-left"
              }`}
            >
              <h2 className="text-blue-600 text-sm font-semibold">
                {item.badge}
              </h2>
              <h1 className="text-2xl md:text-3xl xl:text-4xl font-medium leading-tight mt-5">
                {item.title}
              </h1>
              <p className="text-gray-600 text-sm mt-4 pb-8">{item.subtitle}</p>
              {item?.cmsListItesm?.length > 0 ? (
                <div className=" mb-12">
                  {item?.cmsListItesm.map((listItem) => {
                    const isOpen = openIds.includes(listItem.id);
                    return (
                      <div
                        key={listItem.id}
                        className="border-b border-gray-200 py-3"
                      >
                        <div
                          onClick={() => {
                            if (listItem?.description) {
                              toggle(listItem.id);
                            }
                          }}
                          className={`${listItem?.description ? "cursor-pointer" : ""}  flex items-center justify-between w-full text-left gap-5`}
                        >
                         <div className="flex items-center gap-5">
                         {listItem?.icon?.url && (
                              <img
                                src={listItem.icon.url}
                                alt={listItem.icon.name}
                                className="w-5 h-5 flex-shrink-0"
                              />
                            )}
                          <h3 className="font-semibold text-gray-900">
                            {listItem.title}
                          </h3>
                          </div>
                          {listItem?.description && (
                            <span
                              className={`inline-block w-2 h-2 border-r-2 border-b-2 border-gray-600 transform transition-transform duration-300 ${
                                isOpen ? "rotate-45" : "-rotate-45"
                              }`}
                            ></span>
                          )}
                        </div>

                        {isOpen && (
                          <div className="mt-2 text-sm text-gray-600">{listItem.description}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                 <></>
              )}
              <div className="flex flex-col sm:flex-row gap-2">
                {item?.contentBlockButton?.map((button, index) => (
                  <Button
                    key={index}
                    href={getUrl(button?.url)}
                    target={
                      button?.url?.startsWith("http") ? "_blank" : "_self"
                    }
                  >
                    {button?.label}
                  </Button>
                ))}
              </div>
            </div>

            <div
              className={`md:block hidden order-2 ${
                isRightAligned ? "md:order-1" : "md:order-2"
              } transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: isVisible ? '300ms' : '0ms' }}
            >
              {url ? (
                <div>
                  <img
                    src={`${url.startsWith("http") ? "" : base}${url}`}
                    alt={image?.name}
                    className=""
                  />
                </div>
              ) : (
                <div className="text-gray-600">{image?.name}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
