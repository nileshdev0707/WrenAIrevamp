import { useState, useEffect } from "react";
import Layout from "./layout";
import { base } from "../service/serviceConfig";
import SolutionsIndustriesHero from "../components/solutionsIndustries/hero";
import ContentBlock from "../components/solutionsIndustries/contentBlock";
import Footer from "../components/footer";

export default function Product() {
  const heroImage = "../../images/mainBackground.png";
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div
          style={{
            // backgroundImage: `url(${
            //   heroImage?.startsWith("http") ? "" : base
            // }${heroImage})`,
            backgroundImage: `url('${heroImage}')`,
            WebkitBackgroundSize: "100%",
            backgroundPosition: "center top",
          }}
          className="bg-no-repeat pt-24 max-w-6xl mx-auto"
        >
          {/* Product Hero */}
          <SolutionsIndustriesHero />
        </div>
        <ContentBlock />
        <section className="max-w-6xl mx-auto py-10 md:py-16 xl:px-0 px-8">
          <div className="rounded-2xl bg-blue-600 text-white md:px-16 sm:px-8 py-10 px-5">
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex flex-col justify-center">
                <div>
                  <a
                    href={"#"}
                    className="cursor-pointer text-white text-md border border-white rounded-full px-4 py-2"
                  >
                    Get Started with Wren AI
                  </a>
                  <h3 className="text-3xl lg:text-4xl font-medium mt-8 leading-tight">
                    Ready to unlock your data’s potential?
                  </h3>
                  <p className="text-sm opacity-90 mt-4">
                    Visit getwren.ai to explore our platform, integrate with
                    your systems, or deploy  our open-source solution. Let’s
                    shape the future of business intelligence together.
                  </p>

                  <div className="flex gap-5">
                    <a
                      href={"#"}
                      className="bg-white cursor-pointer mt-8 px-4.5 py-3 rounded-md text-blue-600 text-sm"
                    >
                      Explore Platform
                    </a>
                    <a
                      href={"#"}
                      className="bg-white cursor-pointer mt-8 px-4.5 py-3 rounded-md text-blue-600 text-sm"
                    >
                      Talk to our team
                    </a>
                  </div>
                </div>
              </div>
              <div className="justify-end items-center sm:flex hidden">
                <img
                  width={320}
                  height={320}
                  src={"../../images/bottomImage.png"}
                  alt={"bottomImage"}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
