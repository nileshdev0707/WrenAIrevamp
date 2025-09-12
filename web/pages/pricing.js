import axios from "axios";
import { useState } from "react";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import CTA from "../components/CTA";

export default function Pricing({ pricing, navigation }) {
  const tiers = pricing?.tiers || [];
  const [billing, setBilling] = useState("monthly");
  return (
    <div>
      <Navbar navigation={navigation} />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <section className="text-center">
          <div className="inline-block bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm">
            Simple, transparent pricing
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
            {pricing?.title || "Pricing"}
          </h1>
          <div className="mt-6 inline-flex items-center rounded-lg border border-gray-200 bg-white p-1">
            <button
              className={`px-4 py-2 rounded-md text-sm ${
                billing === "monthly"
                  ? "bg-gray-900 text-white"
                  : "text-gray-700"
              }`}
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm ${
                billing === "annual"
                  ? "bg-gray-900 text-white"
                  : "text-gray-700"
              }`}
              onClick={() => setBilling("annual")}
            >
              Annual
            </button>
          </div>
        </section>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <div
              key={i}
              className={`p-6 rounded-xl ring-1 ring-gray-100 bg-white shadow-sm ${
                t.highlight ? "border-2 border-blue-600" : ""
              }`}
            >
              {t.highlight && (
                <div className="mb-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  Most Popular
                </div>
              )}
              <div className="text-sm text-gray-500">{t.name}</div>
              <div className="text-3xl font-extrabold mt-1">
                {billing === "annual" ? t.annualPrice || t.price : t.price}
              </div>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {(t.features || "")
                  .split(/\r?\n/)
                  .filter(Boolean)
                  .map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-blue-600 mt-0.5"
                      >
                        <path d="M9 12.75L11.25 15 15 9.75" />
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm0 1.5a8.25 8.25 0 100 16.5 8.25 8.25 0 000-16.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
              </ul>
              <a
                href={t.ctaUrl}
                className="btn btn-primary bg-blue-600 hover:bg-blue-700 mt-6 inline-block text-white"
              >
                {t.ctaLabel || "Choose plan"}
              </a>
            </div>
          ))}
        </div>

        {/* Feature comparison */}
        {tiers.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-center">Compare features</h2>
            <div className="mt-6 overflow-x-auto">
              {(() => {
                const parsed = tiers.map((t) => ({
                  name: t.name,
                  features: (t.features || "").split(/\r?\n/).filter(Boolean),
                }));
                const all = Array.from(
                  new Set(parsed.flatMap((p) => p.features))
                );
                return (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Feature
                        </th>
                        {parsed.map((p, idx) => (
                          <th
                            key={idx}
                            className="px-4 py-3 text-sm font-semibold text-gray-700 text-center"
                          >
                            {p.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {all.map((f, i) => (
                        <tr key={i}>
                          <td className="px-4 py-2 text-sm text-gray-700">
                            {f}
                          </td>
                          {parsed.map((p, j) => {
                            const has = p.features.includes(f);
                            return (
                              <td
                                key={`${i}-${j}`}
                                className="px-4 py-2 text-center"
                              >
                                {has ? (
                                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                                    ✓
                                  </span>
                                ) : (
                                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-gray-300">
                                    –
                                  </span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                );
              })()}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center">
            Frequently asked questions
          </h2>
          <div className="mt-6 space-y-4">
            {(Array.isArray(pricing?.faq)
              ? pricing.faq
              : [
                  {
                    q: "Can I change plans later?",
                    a: "Yes, you can upgrade or downgrade at any time.",
                  },
                  {
                    q: "Is there a free trial?",
                    a: "All paid plans include a 14‑day free trial.",
                  },
                  {
                    q: "Do you offer enterprise pricing?",
                    a: "Yes, contact sales for custom terms and SLAs.",
                  },
                ]
            ).map((f, i) => (
              <details
                key={i}
                className="rounded-lg border border-gray-200 bg-white p-4"
              >
                <summary className="cursor-pointer list-none font-medium">
                  {f.q}
                </summary>
                <p className="mt-2 text-sm text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA banner */}
        <div className="mt-16">
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
  const STRAPI = process.env.STRAPI_URL || "http://localhost:1337";
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
