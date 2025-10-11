import React, { useState, useEffect, useRef } from "react";

// Tooltip component for info icons
const Tooltip = ({ children, title }) => {
  return (
    <span className="relative inline-block group">
      {children}
      <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute z-10 left-full top-1/2 transform -translate-y-1/2 ml-3 px-4 py-3 text-sm text-white bg-gray-800 rounded-xl whitespace-normal w-fit shadow-lg pointer-events-none">
        {title}
        <span className="absolute right-full top-1/2 transform -translate-y-1/2 rotate-45 w-3 h-3 bg-gray-800 rounded-sm" style={{marginRight: "-6px"}}></span>
      </span>
    </span>
  );
};

// Info icon SVG component
const InfoIcon = () => (
  <svg className="inline-block w-4 h-4 ml-1 text-gray-400 hover:text-gray-600 cursor-pointer" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
  </svg>
);

export default function ComparePlan({ tiers, selectedPlan }) {
  console.log(tiers,"tiers");
  const [isSticky, setIsSticky] = useState(false);
  const [headerWidth, setHeaderWidth] = useState(0);
  const [headerLeft, setHeaderLeft] = useState(0);
  const tableRef = useRef(null);
  const headerRef = useRef(null);

  const compareData = [
    "GenBI Features",
    "Data Management",
    "Data Security",
    "Data Visualization & Sharing",
    "API Management & Integration",
    "Boilerplates",
    "Organization",
    "Permissions",
    "Deployment",
    "Security & Single Sign-on",
    "Support",
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!tableRef.current || !headerRef.current) return;

      const tableRect = tableRef.current.getBoundingClientRect();
      const navbarHeight = 72; // Navbar height

      // Check if table has reached the navbar
      if (tableRect.top <= navbarHeight && tableRect.bottom > navbarHeight) {
        setIsSticky(true);
        setHeaderWidth(tableRect.width);
        setHeaderLeft(tableRect.left);
      } else {
        setIsSticky(false);
      }
    };

    // Handle horizontal scroll in the overflow container
    const handleHorizontalScroll = () => {
      if (!tableRef.current || !isSticky) return;
      const tableRect = tableRef.current.getBoundingClientRect();
      setHeaderLeft(tableRect.left);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    
    // Listen to horizontal scroll on the overflow container
    const tableContainer = tableRef.current;
    if (tableContainer) {
      tableContainer.addEventListener("scroll", handleHorizontalScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (tableContainer) {
        tableContainer.removeEventListener("scroll", handleHorizontalScroll);
      }
    };
  }, [isSticky]);

  return (
    <>
      {tiers?.length > 0 && (
        
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-medium text-center mb-6">Compare Plans</h2>
            {(() => {
              // Parse features grouped by category
              const parsed = tiers.map((t) => ({
                name: t.name,
                featuresByCategory: Object.entries(selectedPlan === 0 ? t.compareFeatures || {} : t.selfHostedCompareFeatures || {}
                   
                ).map(([category, feats]) => [
                  category,
                  Array.isArray(feats)
                    ? feats.map((f) => [Object.keys(f)[0], Object.values(f)[0]])
                    : Object.entries(feats),
                ]),
              }));

              return (
                <div className="sm:overflow-x-visible overflow-x-auto px-4 sm:px-0" ref={tableRef}>
                  <table className="w-full border-collapse border border-gray-200 rounded-lg">
                    <>
                      {/* Placeholder when header is fixed to prevent content jump */}
                      {isSticky && (
                        <thead className="invisible">
                          <tr>
                            <th className="p-4" />
                            {parsed.map((p, idx) => (
                              <th key={idx} className="p-4 text-lg">
                                {p.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                      )}
                      
                      <thead
                        ref={headerRef}
                        className={`bg-white/95   ${
                          isSticky ? "sticky z-40 border-gray-200 border bg-white" : "relative"
                        }`}
                        style={
                          isSticky
                            ? {
                                top: "89px",
                                width: `${headerWidth}px`,
                                left: `${headerLeft}px`,
                              }
                            : {}
                        }
                      >
                        <tr>
                          <th className="p-4 text-left max-w-[200px]" />
                          {parsed.map((p, idx) => (
                            <th
                              key={idx}
                              className="p-4 text-lg font-semibold text-gray-700 text-center min-w-[150px]"
                            >
                              {p.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                    </>
                  <tbody className="divide-y divide-gray-200">
                    {compareData.map((category, catIdx) => {
                      // find features for this category in the parsed data
                      const feats =
                        parsed[0].featuresByCategory.find(
                          ([c]) => c === category
                        )?.[1] || [];
                      console.log(feats,"feats");
                      if (!feats.length) return null; // skip if no features in this category

                      return (
                        <React.Fragment key={catIdx}>
                          {/* Category Header Row */}
                          <tr className="bg-[#F7FBFE] border-b border-blue-500">
                            <td
                              colSpan={parsed.length + 1}
                              className="px-4 py-2 text-sm font-bold text-blue-600"
                            >
                              {category}
                            </td>
                          </tr>

                          {/* Features Rows */}
                          {feats.map(([f], featIdx) => {
                            console.log(f,"f");
                            return (
                              <tr key={`${catIdx}-${featIdx}`}>
                              <td className="p-4 text-sm text-gray-700">{f} 
                                {f?.tooltip && (
                                  <Tooltip title={f.tooltip}>
                                    <InfoIcon />
                                  </Tooltip>
                                )}
                                 
                                </td>
                              {parsed.map((p, j) => {
                                const featList =
                                  p.featuresByCategory.find(
                                    ([c]) => c === category
                                  )?.[1] || [];
                                const entry = featList.find(([k]) => k === f);
                                const val = entry ? entry[1] : false;
                                return (
                                  <td
                                    key={`${catIdx}-${featIdx}-${j}`}
                                    className="p-4 text-center text-sm"
                                  >
                                    {val === true ? (
                                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                                        ✓
                                      </span>
                                    ) : (
                                      <span className="text-gray-700">
                                        {val}
                                      </span>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                            )
                          })}
                        </React.Fragment>
                      );
                    })}
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </div>
        </section>
      )}
    </>
  );
}
