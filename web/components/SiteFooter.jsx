import Link from "next/link";
import { base } from "../service/serviceConfig";
import navigation from "../json/navigation.json";
import { useTranslation } from "../hooks/useTranslation";
import { useEffect, useState } from "react";

export default function SiteFooter() {
  const { t } = useTranslation();

  const [stars, setStars] = useState(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/Canner/WrenAI`)
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count));
  }, []);

  const cols = [
    {
      title: t("Product"),
      links: [
        { label: "Use Cases", slug: "product" },
        { label: "Enterprise Cloud", slug: "solutions?tab=enterprise_cloud" },
        { label: t("Self-hosted Business"), slug: "solutions?tab=business" },
        {
          label: t("Self-hosted Enterprise Plus"),
          slug: "solutions?tab=enterprise_plus_hosted",
        },
        { label: t("Wren AI OSS"), slug: "oss" },
      ],
    },
    {
      title: t("Solutions"),
      links: [
        { label: t("Manufacturing"), slug: "industries?tab=manufacturing" },
        {
          label: t("Banking & Finance"),
          slug: "industries?tab=banking-finance",
        },
        { label: t("Healthcare"), slug: "industries?tab=healthcare" },
        {
          label: t("Retail & E-commerce"),
          slug: "industries?tab=retail-ecommerce",
        },
        {
          label: t("Media & Entertainment"),
          slug: "industries?tab=media-entertainment",
        },
        { label: t("Automotive"), slug: "industries?tab=automotive" },
        { label: t("DTC Brands"), slug: "industries?tab=dtc-brands" },
      ],
    },
    {
      title: t("resources"),
      links: [
        {
          label: t("Wren AI Documentation"),
          slug: "https://docs.getwren.ai/cp/overview",
        },
        { label: t("Blog"), slug: "blog" },
        { label: t("Support Portal"), slug: "support" },
        {
          label: t("Public Roadmap"),
          slug: "https://wrenai.notion.site/Wren-AI-Cloud-Public-Roadmap-1ed92976d0bf80488fe3fb16359734a3",
        },
      ],
    },
    {
      title: t("Community"),
      links: [
        { label: t("Elite Partners"), slug: "partner?tab=elite" },
        { label: t("Affiliate Partners"), slug: "partner?tab=affiliate" },
        { label: t("Join Discord"), slug: "https://discord.gg/5DvshJqG8Z" },
        { label: "GitHub", slug: "https://github.com/Canner/WrenAI" },
      ],
    },
    {
      title: t("Company"),
      links: [
        { label: t("privacyPolicy"), slug: "privacy-policy" },
        { label: t("Security Policy"), slug: "security-policy" },
        { label: t("termsOfUse"), slug: "eula" },
        {
          label: t("Service Status"),
          slug: "https://wrenaicloud.statuspage.io/",
        },
        { label: t("SLA"), slug: "sla" },
      ],
    },
  ];
  const link = (slug) => {
    if (!slug) return "/";
    if (
      slug.startsWith("http") ||
      slug.startsWith("https") ||
      slug.startsWith("#")
    ) {
      return slug; // return absolute URLs or hash links as-is
    }
    return `/${slug}`; // relative internal links
  };

  return (
    <footer className="border-t border-gray-100 md:py-16 py-10">
      <div className="max-w-7xl mx-auto md:px-6 px-4">
        <div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 sm:gap-8 gap-5 pb-10 sm:px-10">
          {cols.map((col, i) => (
            <div key={i}>
              <div className="font-semibold text-[#1E1E1E] sm:text-xl text-base sm:mb-6 mb-3">{col.title}</div>
              <ul className="space-y-2 sm:text-base text-sm text-[#757575]">
                {col.links.map((l, j) => {
                  const isExternal =
                    l.slug?.startsWith("http") ||
                    l.slug?.startsWith("https") ||
                    l.slug?.startsWith("#");

                  return (
                    <li key={j} className="mb-3">
                      {isExternal ? (
                        <Link
                          href={l.slug?.startsWith("#") ? l.slug : link(l.slug)}
                          className="hover:text-gray-900 flex gap-2"
                          target={
                            l.slug.startsWith("http") ? "_blank" : "_self"
                          }
                          rel={
                            l.slug.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {l.label}
                          {l.label === "GitHub" && (
                            <div className="flex items-center gap-1 bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] p-1 pr-[6px] rounded-sm text-white border max-h-[18px]">
                              <div className="h-[15px] w-[15px] flex justify-center items-center">
                                <svg
                                  width="10"
                                  height="10"
                                  viewBox="0 0 20 19"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M9.9998 15L4.12197 18.5902L5.72007 11.8906L0.489258 7.40983L7.35479 6.85942L9.9998 0.5L12.6449 6.85942L19.5104 7.40983L14.2796 11.8906L15.8777 18.5902L9.9998 15Z"
                                    fill="white"
                                  />
                                </svg>
                              </div>

                              <span className="font-normal text-[12px]/1">
                                {stars?.toLocaleString()}
                              </span>
                            </div>
                          )}
                        </Link>
                      ) : (
                        <Link
                          href={link(l.slug)}
                          className="hover:text-gray-900"
                        >
                          {l.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
                {col.title === "Company" && (
                  <li className="hidden sm:block">
                    <a
                      href="https://wrenaicloud.statuspage.io/"
                      className="hover:text-gray-900"
                    >
                      <img
                        className="h-20"
                        src="https://capable-butterfly-84cab64826.media.strapiapp.com/footer_Logo_182b5bfa92.png"
                      />
                    </a>
                  </li>
                )}
              </ul>
            </div>
          ))}
          <div className="block sm:hidden">
            <a
              href="https://wrenaicloud.statuspage.io/"
              className="hover:text-gray-900"
            >
              <img
                className="h-20"
                src="https://capable-butterfly-84cab64826.media.strapiapp.com/footer_Logo_182b5bfa92.png"
              />
            </a>
          </div>
        </div>

        <div className="mt-5 sm:mt-20 gap-5 grid grid-cols-1 sm:grid-cols-3 text-sm items-center text-gray-500">
          <div className="font-semibold text-gray-400 text-center sm:text-left">
            © 2025 Canner. All right reserved.
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 group justify-center"
          >
            {navigation?.logo?.url && (
              <img
                src={`${navigation?.logo?.url.startsWith("http") ? "" : base}${
                  navigation?.logo?.url
                }`}
                alt={navigation?.logo?.name}
                className="max-h-8 object-contain"
              />
            )}
          </Link>
          <div className="flex gap-5 justify-center sm:justify-end">
            <Link href="https://x.com/getwrenai" className="group" target="_blank">
              <img
                src="/svg/twitter.svg"
                target="_blank"
                alt="twitter"
                className="w-5 h-5"
              />
            </Link>
            <Link href="https://www.linkedin.com/company/wrenai/" className="group" target="_blank">
              <img
                src="/svg/linkedin.svg"
                target="_blank"
                alt="linkedin"
                className="w-5 h-5"
              />
            </Link>
            <Link href="https://medium.com/wrenai" className="group" target="_blank">
              <img
                src="/svg/medium.svg"
                target="_blank"
                alt="medium"
                className="w-5 h-5"
              />
            </Link>
            <Link href="https://discord.gg/5DvshJqG8Z" className="group" target="_blank">
              <img
                src="/svg/discord.svg"
                target="_blank"
                alt="discord"
                className="w-5 h-5"
              />
            </Link>
            <Link href="https://github.com/Canner/WrenAI" className="group" target="_blank">
              <img
                src="/svg/github.svg"
                target="_blank"
                alt="github"
                className="w-5 h-5"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
