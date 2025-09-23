import React, { useState } from "react";
import { base } from "../../service/serviceConfig";

export default function ContentBlock() {
  const [activeTab, setActiveTab] = useState("manufacturing");

  const solutions = [
    { label: "Manufacturing", id: "manufacturing" },
    { label: "Banking & Finance", id: "finance" },
    { label: "Healthcare", id: "healthcare" },
    { label: "Retail & E-commerce", id: "retail" },
    { label: "Media & Entertainment", id: "media" },
    { label: "Automotive", id: "automotive" },
    { label: "DTC Brands", id: "dtc-brands" },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    setActiveTab(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const solutionList = [
    {
      id: "manufacturing",
      title: "Advanced Engineering & Manufacturing",
      subtitle:
        "Revolutionize manufacturing with AI-driven analytics for complex data, enabling real-time insights and process optimization. Query like 'Compare recipe outputs for 250°C vs. 400°C from yesterday’s run' or 'Display sensor data trends for pressure in chamber B over the past month.'",
      moreInfo: [
        {
          title: "Embedded Analytics",
          description:
            "Seamlessly integrate visualizations into engineering apps for intuitive data querying.",
        },
        {
          title: "Scalable Data Handling",
          description:
            "Analyze curated datasets, scaling to petabytes with high performance.",
        },
      ],
      alignment: "right",
      image: {
        url: "../../images/manufacturing.png",
        name: "Manufacturing",
      },
      contentBlockButton: [{ label: "Learn More", url: "#" }],
    },
    {
      id: "finance",
      title: "Financial Services",
      subtitle:
        "Wren AI delivers advanced analytics tailored for the banking and finance sector, empowering institutions with precise, data-driven decision-making tools. Our solutions address critical industry needs, enhancing efficiency, accuracy, and inclusivity.",
      moreInfo: [
        {
          title: "Credit Scoring",
          description:
            "Track transactions, spending, and digital footprints for insights, enabling accurate, inclusive lending.",
        },
        {
          title: "Trading Performance Monitoring ",
          description:
            "Monitor slippage, costs, failed trades to optimize trading and reduce risks.",
        },
        
      ],
      alignment: "left",
      image: {
        url: "../../images/finance.png",
        name: "finance",
      },
      contentBlockButton: [{ label: "Learn More", url: "#" }],
    },
    {
      id: "healthcare",
      title: "Healthcare & Hospitality",
      subtitle: "Wren AI streamlines healthcare operations with no-code data analysis. Query “Show patient wait times by department” or “Which nurses are available for an urgent case in the ER right now?” for instant insights and charts. The unified semantic layer connects disparate data sources for improved patient care and efficiency.",
      moreInfo: [
        {
          title: "Operations & Resource Management",
          description:
            "Optimize healthcare by tracking bottlenecks, staff utilization, and patient flow, reducing delays.",
        },
        {
          title: "Treatment Effectiveness Monitoring",
          description:
            "Compare outcomes across locations and protocols, enhancing patient care and efficiency..",
        },
      ],
      alignment: "right",
      image: {
        url: "../../images/healthcare.png",
        name: "healthcare",
      },
      contentBlockButton: [{ label: "Learn More", url: "#" }],
    },
    {
      id: "retail",
      title: "Retail & E-commerce",
      subtitle: "Wren AI boosts e-commerce and retail with data-driven insights to analyze “Top customer preferences by region” or “What are the conversion rates for loyalty program members?” Embedded analytics integrates into CRM systems, enhancing loyalty and personalized promotions.",
      moreInfo: [
        {
          title: "Performance Tracking",
          description:
            "Track sales, discounts, promotions, and marketing campaigns for optimized performance.",
        },
        {
          title: "Customer Behavior Analysis",
          description:
            "Analyze conversion rates, abandoned carts, average order values, and loyalty program engagement.",
        },
       
      ],
      alignment: "left",
      image: {
        url: "../../images/retail.png",
        name: "retail",
      },
      contentBlockButton: [{ label: "Learn More", url: "#" }],
    },
    {
      id: "media",
      title: "Media & Entertainment",
      subtitle: "Wren AI boosts audience engagement with natural language queries like “Analyze video performance by genre” or “What are the conversion rates for subscription campaigns?” Natural language prompts deliver instant reports, integrable via APIs, optimizing content and monetization strategies.",
      moreInfo: [
        {
          title: "Revenue & Monetization Tracking",
          description:
            "Break down revenue by ads, subscriptions, pay-per-view, and merchandise.",
        },
        {
          title: "Content & Ads Performance Analysis",
          description:
            "Track engagement and optimizes content and ads across platforms.",
        },
      ],
      alignment: "right",
      image: {
        url: "../../images/media.png",
        name: "media",
      },
      contentBlockButton: [{ label: "Learn More", url: "#" }],
    },
    {
      id: "automotive",
      title: "Automotive",
      subtitle: "Wren AI delivers real-time insights for automotive businesses, streamlining inventory and after-sales strategies. Benefits include faster decision-making, improved efficiency, and enhanced customer experiences through integrated data analysis. Example prompt: “What models have the highest inventory turnover by region?”",
      moreInfo: [
        {
          title: "Inventory Optimization",
          description:
            "Track models, trims, and colors across dealerships to streamline inventory and boost sales efficiency.",
        },
        {
          title: "After-Sales Service & Maintenance Trends",
          description:
            "Identify high-revenue vehicles and recurring issues to optimize after-sales strategies and customer satisfaction.",
        },
      ],
      alignment: "left",
      image: {
        url: "../../images/automotive.png",
        name: "automotive",
      },
    },
    {
      id: "dtc-brands",
      title: "Direct-To-Customer (DTC) Brands",
      subtitle: "Wren AI empowers DTC brands with data-driven insights to analyze “What drives subscription retention rates?” or “Which influencer campaigns boost engagement?” Embedded analytics integrates into CRM systems, enhancing personalized marketing and brand loyalty.",
      moreInfo: [
        {
          title: "Revenue & Subscription Tracking",
          description:
            "Track subscriptions, CLV, and churn to optimize DTC revenue and retention strategies.",
        },
        {
          title: "Customer Engagement Analysis",
          description:
            "Analyze behavior, social campaigns, and retention for personalized offers and loyalty program success.",
        },
      ],
      alignment: "right",
      image: {
        url: "../../images/dtc-brands.png",
        name: "dtc-brands",
      },
    },
  ];

  return (
    <div>
      <div className="bg-white flex overflow-x-auto scrollbar-hide gap-2 rounded-xl p-2 border border-gray-200">
        {solutions?.map((tab, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(tab.id)}
            className={`cursor-pointer w-full md:py-4 sm:px-4 whitespace-nowrap sm:py-2 px-3 py-1.5 sm:rounded-xl rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white shadow-sm"
                : "text-[#757575] hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-10">
        {solutionList?.map((item, index) => {
          const url = item?.image?.url;
          const image = item?.image;
          const isRightAligned = item?.alignment === "right";
          return (
            <div
              key={index}
              id={item.id}
              className="grid grid-cols-1 md:grid-cols-2 xl:gap-10 gap-5 lg:py-10 md:py-5 xl:px-0 px-5"
            >
              <div
                className={`xl:px-10 px-5 order-1 ${
                  isRightAligned ? "md:order-2" : "md:order-1 md:text-left"
                }`}
              >
                <h1 className="text-2xl md:text-3xl xl:text-4xl font-medium leading-tight mt-5">
                  {item.title}
                </h1>
                <p className="text-gray-600 text-sm mt-6 pb-8">
                  {item.subtitle}
                </p>
                {item?.moreInfo?.map((info, index) => (
                  <div className="space-y-6" key={index}>
                    <div className="border-b border-gray-200 py-5">
                      <div className="flex gap-4  items-center">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM15.4571 7.45711L9 13.9142L4.79289 9.7071L6.20711 8.2929L9 11.0858L14.0429 6.04289L15.4571 7.45711Z"
                            fill="#2F54EB"
                          />
                        </svg>

                        <h3 className="font-semibold text-gray-900">
                          {info.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
                {/* {item?.contentBlockButton?.length > 0 && (
                <div className="flex gap-2 mt-10">
                  {item?.contentBlockButton?.map((button, index) => (
                    <a
                      key={index}
                      href={button?.url}
                      target={
                        button?.url?.startsWith("http") ? "_blank" : "_self"
                      }
                      className="btn btn-primary bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white px-4 py-2 mt-5 text-sm"
                    >
                      {button?.label}
                    </a>
                  ))}
                </div>
                )} */}
              </div>

              <div
                className={`md:block hidden order-2 ${
                  isRightAligned ? "md:order-1" : "md:order-2"
                }`}
              >
                {url ? (
                  <img
                    //   src={`${url.startsWith("http") ? "" : base}${url}`}
                    src={url}
                    alt={image?.name}
                  />
                ) : (
                  <div className="text-gray-600">{image?.name}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
