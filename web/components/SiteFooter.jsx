import Link from "next/link";
import { base } from "../service/serviceConfig";
import navigation from "../json/navigation.json";
import { useTranslation } from "../hooks/useTranslation";

export default function SiteFooter() {
  const { t } = useTranslation();

  const cols = [
    {
      title: t("company"),
      links: [
        // { label: "Careers", slug: "careers" },
        // { label: "Press", slug: "press" },
        { label: t("security"), slug: "https://cannerdata.com/terms/security" },
        { label: t("caseStudies"), slug: "solutions-industries" },
      ],
    },
    {
      title: t("contact"),
      links: [
        { label: t("contact"), slug: "contact" },
        { label: t("discord"), slug: "https://discord.gg/5DvshJqG8Z" },
        // { label: "Merch", slug: "merch" },
      ],
    },
    {
      title: t("partners"),
      links: [
        { label: t("affiliateProgram"), slug: "affiliate-program?tab=affiliate" },
        { label: t("elitePartners"), slug: "affiliate-program?tab=elite" },
      ],
    },
    {
      title: t("resources"),
      links: [
        { label: t("publicRoadmap"), slug: "https://wrenai.notion.site/" },
        { label: t("sla"), slug: "sla" },
        { label: t("status"), slug: "https://wrenaicloud.statuspage.io/" },
        { label: t("support"), slug: "support" },
      ],
    },
    {
      title: t("legal"),
      links: [
        { label: t("privacyPolicy"), slug: "privacy-policy" },
        { label: t("termsOfUse"), slug: "terms-of-use" },
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
    <footer className="border-t border-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-10 px-10">
          {cols.map((col, i) => (
            <div key={i}>
              <div className="font-semibold mb-3">{col.title}</div>
              <ul className="space-y-2 text-sm text-gray-600">
                {col.links.map((l, j) => {
                  const isExternal =
                    l.slug?.startsWith("http") ||
                    l.slug?.startsWith("https") ||
                    l.slug?.startsWith("#");

                  return (
                    <li key={j}>
                      {isExternal ? (
                        <Link
                          href={l.slug?.startsWith("#") ? l.slug : link(l.slug)}
                          className="hover:text-gray-900"
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
              </ul>
            </div>
          ))}
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
            <Link href="https://twitter.com" className="group">
              <img
                src="/svg/twitter.svg"
                target="_blank"
                alt="twitter"
                className="w-5 h-5"
              />
            </Link>
            <Link href="https://linkedin.com" className="group">
              <img
                src="/svg/linkedin.svg"
                target="_blank"
                alt="linkedin"
                className="w-5 h-5"
              />
            </Link>
            <Link href="https://medium.com" className="group">
              <img
                src="/svg/medium.svg"
                target="_blank"
                alt="medium"
                className="w-5 h-5"
              />
            </Link>
            <Link href="https://discord.com" className="group">
              <img
                src="/svg/discord.svg"
                target="_blank"
                alt="discord"
                className="w-5 h-5"
              />
            </Link>
            <Link href="https://github.com" className="group">
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
