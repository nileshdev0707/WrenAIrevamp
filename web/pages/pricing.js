import axios from "axios";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import CTA from "../components/CTA";

export default function Pricing({ pricing, navigation }) {
  console.log("pricing ==> ", pricing);
  const tiers = pricing?.tiers || [];
  const [billing, setBilling] = useState("monthly");
  const title = pricing?.hero?.[0]?.title || "";
  const [openIds, setOpenIds] = useState(pricing?.frequentlyAskedQuestions?.map((f) => f.id)); // all open by default

  const toggle = (id) => {
    if (openIds.includes(id)) {
      // close it
      setOpenIds(openIds.filter((openId) => openId !== id));
    } else {
      // open it
      setOpenIds([...openIds, id]);
    }
  };

  return (
    <div>
      <Navbar navigation={navigation} />
      <main className="px-6">
        <div className="bg-[url('/images/pricingHeroImage.png')] bg-contain bg-no-repeat py-16 max-w-6xl mx-auto ">
          <section className="text-center">
            <h1 className="text-4xl md:text-6xl font-medium leading-tight pt-5">
              {title.split(" ").map((word, i) =>
                word === "Pricing" ? (
                  <span key={i} className="text-blue-600">
                    {""} {word}
                  </span>
                ) : (
                  <span key={i}> {word}</span>
                )
              )}
            </h1>
            <p className="mt-3 max-w-3xl mx-auto">
              {pricing?.hero?.[0]?.subtitle}
            </p>
            <div className="bg-white inline-flex items-center mt-10 px-2.5 py-2 rounded-2xl border border-gray-200">
              <button class="flex items-center gap-2 px-4.5 py-2.5 rounded-md bg-blue-600 text-white font-medium shadow-sm text-sm">
                <img src="/svg/cloud.svg" alt="Cloud" />
                Cloud
              </button>

              <button class="flex items-center gap-2 px-4.5 py-2.5 rounded-md text-gray-600 font-medium text-sm">
                <img src="/svg/selfHosted.svg" alt="Self-hosted" />
                Self-hosted
              </button>
            </div>
            <div className="flex justify-center mt-10">
              <div className="bg-white mt-6 px-2.5 py-2 rounded-full border border-gray-200">
                <button
                  className={`px-4 py-1.5 rounded-full text-sm ${
                    billing === "annual"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700"
                  }`}
                  onClick={() => setBilling("annual")}
                >
                  Annually
                </button>
                <button
                  className={`px-4 py-1.5 rounded-full text-sm ${
                    billing === "monthly"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700"
                  }`}
                  onClick={() => setBilling("monthly")}
                >
                  Monthly
                </button>
              </div>
            </div>
          </section>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {tiers.map((t, i) => (
              <div
                key={i}
                className={`p-7 rounded-xl ring-1 ring-gray-200 bg-white shadow-sm`}
              >
                <div className="text-3xl font-medium">{t.name}</div>
                <p className="text-gray-500 mb-4 text-sm pt-4">
                  {t.description}
                </p>

                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-semibold mt-1 text-blue-600">
                    {billing === "Annually"
                      ? t.annualPrice || t.price
                      : t.price}
                  </span>
                  <span className="text-gray-500 ml-2 text-sm">
                    /month, billed annually
                  </span>
                </div>
                <div className="mt-6">
                  <span className="text-sm bg-gray-100 p-2 rounded-full text-black font-medium">
                    {t.features}
                  </span>
                </div>
                <div className="mt-6">
                  <a
                    href={t.ctaUrl}
                    className={`btn mt-6 inline-block text-white w-full !py-3 ${
                      t.ctaLabel === "Talk to sales"
                        ? "bg-black hover:bg-black"
                        : "btn-primary bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {t.ctaLabel || "Choose plan"}
                  </a>
                </div>
                <div
                  className="mt-4 text-sm leading-6"
                  dangerouslySetInnerHTML={{ __html: t.featuresDetails }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="[bg-[#F7FBFE]">
          <div className="py-16 max-w-6xl mx-auto">
            {pricing?.ContentBlock?.map((block) => {
              const text = block.title;
              const parts = text.split("AI");
              const firstPart = parts[0] + "AI";
              const secondPart = parts[1] ? parts[1].trim() : "";
              return (
                <div key={block.id} className="grid gap-5 md:grid-cols-3 pb-10">
                  {/* Left column */}
                  <div className="flex flex-col justify-center col-span-1">
                    <h2 className="text-5xl font-medium leading-tight pt-5">
                      <span className="text-black">{firstPart}</span>{" "}
                      {secondPart && (
                        <span className="text-blue-500">{secondPart}</span>
                      )}
                    </h2>
                    {block.subtitle && (
                      <p className="mt-1 text-sm text-gray-500">
                        {block.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Right column */}
                  <div
                    className="mt-4 col-span-2"
                    dangerouslySetInnerHTML={{ __html: block.description }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature comparison */}
        {tiers.length > 0 && (
          <section className="max-w-6xl mx-auto py-10">
            <h2 className="text-4xl font-bold text-center">Compare Plan</h2>
            <div className="mt-6 overflow-x-auto">
              {(() => {
                // Parse features grouped by category
                const parsed = tiers.map((t) => ({
                  name: t.name,
                  featuresByCategory: Object.entries(
                    t.compareFeatures || {}
                  ).map(([category, feats]) => [
                    category,
                    Array.isArray(feats)
                      ? feats.map((f) => [
                          Object.keys(f)[0],
                          Object.values(f)[0],
                        ])
                      : Object.entries(feats),
                  ]),
                }));

                return (
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th />
                        {parsed.map((p, idx) => (
                          <th
                            key={idx}
                            className="p-4 text-lg font-semibold text-gray-700 text-center"
                          >
                            {p.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {parsed[0].featuresByCategory.map(
                        ([category, feats], catIdx) => (
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
                            {feats.map(([f], featIdx) => (
                              <tr key={`${catIdx}-${featIdx}`}>
                                <td className="p-4 text-sm text-gray-700">
                                  {f}
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
                            ))}
                          </React.Fragment>
                        )
                      )}
                    </tbody>
                  </table>
                );
              })()}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Side Title */}
          <div className="col-span-1">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Frequently <br /> Asked Questions
            </h2>
          </div>

          {/* Right Side Accordion */}
          <div className="col-span-2 space-y-5">
            {pricing?.frequentlyAskedQuestions?.map((faq) => (
              <div
                key={faq.id}
                className="border-b border-gray-200 pb-5 cursor-pointer"
                onClick={() => toggle(faq.id)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-medium text-gray-900">
                    {faq.title}
                  </h3>
                  <span
                    className={`inline-block w-2 h-2 border-r-2 border-b-2 border-gray-600 transform transition-transform duration-300 ${
                      openIds.includes(faq.id) ? "rotate-45" : "-rotate-45"
                    }`}
                  ></span>
                </div>
                {openIds.includes(faq.id) && (
                  <div
                    className="mt-3 text-sm text-gray-600"
                    dangerouslySetInnerHTML={{ __html: faq.detail }}
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA banner */}
        <div>
          <CTA
            data={{
              title: pricing?.ctaTitle || "Ready to get started?",
              primaryLabel: pricing?.ctaPrimaryLabel || "Start free",
              primaryUrl: pricing?.ctaPrimaryUrl || "#",
              secondaryLabel: pricing?.ctaSecondaryLabel || "Talk to sales",
              secondaryUrl: pricing?.ctaSecondaryUrl || "#",
            }}
          />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export async function getStaticProps() {
  const STRAPI = process.env.STRAPI_URL
  const token = process.env.STRAPI_TOKEN;
  const api = axios.create({
    baseURL: STRAPI,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const [pricingRes, navBundle] = await Promise.all([
    api
      .get("/api/pricing?populate=*")
      .then((r) => r.data)
      .catch(() => null),
    Promise.all([
      api
        .get(`/api/navigation?populate=*`)
        .then((r) => r.data)
        .catch(() => null),
      api
        .get(`/api/pages?fields=slug,navLabel,title,showInNav,navOrder`)
        .then((r) => r.data)
        .catch(() => null),
    ]).then(([nav, pages]) => ({ nav, pages })),
  ]);
  return {
    props: {
      pricing: pricingRes?.data?.attributes ?? pricingRes?.data ?? null,
      navigation: {
        ...(navBundle?.nav?.data?.attributes ?? navBundle?.nav?.data ?? {}),
        pages: Array.isArray(navBundle?.pages?.data)
          ? navBundle.pages.data
              .map((p) => p.attributes ?? p)
              .filter((p) => p.showInNav)
              .sort((a, b) => (a.navOrder || 0) - (b.navOrder || 0))
          : [],
      },
    },
    revalidate: 10,
  };
}
