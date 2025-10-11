import React, { useState, useEffect, useRef } from "react";
import { base } from "../../service/serviceConfig";
import { useLocalizedUrl } from "../../utils/languageUtils";
import Button from "../common/Button";
import { useRouter } from "next/router";


const SolutionsTab = ({ data, isClient, tab }) => {
  const router = useRouter();
  const getUrl = useLocalizedUrl();
  const solutions = data?.SolutionsTab;
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);
  const [tabKey, setTabKey] = useState("enterprise_cloud");

  useEffect(() => {
    if (tab) {
      setTabKey(tab);
    }
  }, [tab]); 


  // Mapping for tab from URL → index
  const mapping = {
    enterprise_cloud: 0,
    business: 1,
    enterprise_plus_hosted: 2,
  };

  // Scroll to the active tab content
  const scrollToSection = () => {
    if (sectionRef.current) {
      const top =
        sectionRef.current.getBoundingClientRect().top + window.scrollY - 100; // 100px offset
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // On URL tab change
  useEffect(() => {
    if (tabKey && mapping[tabKey] != null) {
      setActiveTab(mapping[tabKey]);
      setTimeout(scrollToSection, 100); // delay for render
      if (tabKey) {
        router.replace({
          pathname: router.pathname,
          query: { ...router.query, tab: tabKey },
        }, undefined, { shallow: true });
      }
    }
  }, [tabKey]);

  // Reverse mapping (index → tabKey)
  const reverseMapping = Object.entries(mapping).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {});

  const handleTabChange = (index) => {
    setActiveTab(index);
    const tabKey = reverseMapping[index];
    setTabKey(tabKey);
    if (tabKey) {
      router.replace({
        pathname: router.pathname,
        query: { ...router.query, tab: tabKey },
      }, undefined, { shallow: true });
    }
  };
  

    
  const activeTabData = solutions[activeTab] || {};

  return (
    <div
      className="max-w-7xl mx-auto lg:mb-25 md:mb-20 sm:mb-15 mb-10"
      ref={sectionRef}
    >
      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-white flex overflow-x-auto scrollbar-hide gap-2 rounded-xl p-2 border border-gray-200">
          {solutions?.map((tab, index) => (
            <Button
              key={index}
              onClick={() => handleTabChange(index)}
              variant={activeTab === index ? "primary" : "light"}
              label={tab.badge}
              className="whitespace-nowrap min-w-max"
            >
              {tab.badge}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content Block */}
      {activeTabData && (
        <>
          <div className="bg-white rounded-2xl lg:my-18 md:my-15 sm:my-10 my-6">
            <div className="text-center md:mb-8 sm:mb-6 mb-4">
              {/* Title with Badge */}
              <div className="sm:mb-4 mb-2">
                {isClient && (
                  <h2
                    className={`sm:text-3xl text-2xl md:text-5xl font-medium text-[#1E1E1E] md:leading-14 sm:leading-10 leading-8 `}
                    dangerouslySetInnerHTML={{
                      __html: activeTabData.title
                        ? activeTabData.title.replace(
                            /\b(in Your|Enterprise|and)\b/g,
                            "<br/>$1"
                          )
                        : "Fully Managed, <br/>Enterprise-Ready Cloud",
                    }}
                  />
                )}
                {/* Badge */}
              </div>
            </div>
            <div
              className={`md:m-7 sm:m-4 `}
              dangerouslySetInnerHTML={{
                __html: activeTabData.description,
              }}
            />
            {/* Call to Action Button */}
            <div className="flex flex-col sm:flex-row justify-center sm:px-6">
              <Button
                variant="primary"
                onClick={() =>
                  window.open(
                    getUrl(activeTabData?.button?.[0]?.url),
                    activeTabData?.button?.[0]?.url?.startsWith("http")
                      ? "_blank"
                      : "_self",
                    "noopener,noreferrer"
                  )
                }
                className="cursor-pointer hover:-translate-y-0.5  transition-all   duration-200"
              >
                {activeTabData?.button?.[0]?.label ||
                  activeTabData?.buttonText ||
                  "Start with Enterprise Cloud"}
              </Button>
            </div>
          </div>
          {activeTabData?.image?.url ? (
            <div>
              <img
                src={`${
                  activeTabData?.image?.url?.startsWith("http") ? "" : base
                }${activeTabData?.image?.url}`}
                alt={activeTabData?.name}
              />
            </div>
          ) : (
            <div className="text-gray-600">{activeTabData?.badge}</div>
          )}
        </>
      )}
    </div>
  );
};

export default SolutionsTab;
