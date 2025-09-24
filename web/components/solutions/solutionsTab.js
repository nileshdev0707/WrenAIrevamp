import React, { useState } from "react";
import { base } from "../../service/serviceConfig";

const SolutionsTab = ({ data }) => {
    const solutions = data?.SolutionsTab;

  const [activeTab, setActiveTab] = useState(0);
  
  // Get the active tab data
  const activeTabData = solutions?.[activeTab] || {};
  
  return (
      <div className="max-w-7xl mx-auto lg:mb-25 md:mb-20 sm:mb-15 mb-10">
        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div className="bg-white flex overflow-x-auto scrollbar-hide gap-2 rounded-xl p-2 border border-gray-200">
            {solutions?.map((tab,index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`md:px-8.5 w-full md:py-4 sm:px-4 whitespace-nowrap sm:py-2 px-3 py-1.5 sm:rounded-xl rounded-lg text-md font-medium transition-all duration-200 ${
                  activeTab === index
                    ? 'bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white shadow-sm'
                    : 'text-[#757575] hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.badge}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Block */}
        <div className="bg-white rounded-2xl lg:my-18 md:my-15 sm:my-10 my-6">
          <div className="text-center md:mb-8 sm:mb-6 mb-4">
            {/* Title with Badge */}
            <div className="sm:mb-4 mb-2">
              <h2 
                className={`sm:text-3xl text-2xl md:text-5xl font-medium text-[#1E1E1E] md:leading-14 sm:leading-10 leading-8 `}
                dangerouslySetInnerHTML={{
                  __html: activeTabData.title ? 
                    activeTabData.title.replace(/\b(in Your|Enterprise)\b/g, '<br/>$1') : 
                    'Fully Managed, <br/>Enterprise-Ready Cloud'
                }}
              />
              {/* Badge */}
            </div>            
          </div>
          <div dangerouslySetInnerHTML={{
            __html: activeTabData.description
          }} />
            {/* Call to Action Button */}
            <div className="text-center">
                <button  
                onClick={() => window.open(activeTabData?.button?.[0]?.url, activeTabData?.button?.[0]?.url?.startsWith("http") ? "_blank" : "_self", "noopener,noreferrer")}
                 className="cursor-pointer bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] hover:-translate-y-0.5  transition-all text-white font-semibold md:py-4 py-3 md:px-8 px-4 rounded-lg lg:text-lg md:text-md text-sm duration-200 shadow-lg hover:shadow-xl">
                {activeTabData?.button?.[0]?.label || activeTabData?.buttonText || 'Start with Enterprise Cloud'}
                </button>
            </div>
        </div>
              {activeTabData?.image?.url ? (
                    <div>
                      <img
                        src={`${activeTabData?.image?.url?.startsWith("http") ? "" : base}${activeTabData?.image?.url}`}
                        alt={activeTabData?.name}
                      />
                    </div>
                  ) : (
                    <div className="text-gray-600">{activeTabData?.badge}</div>
                  )
                  
                  }
      </div>
  );
}

export default SolutionsTab;