import Link from "next/link";
import { base } from "../service/serviceConfig";
import navigation from "../json/navigation.json";
import { useTranslation } from "../hooks/useTranslation";

export default function SiteFooter() {
  const { t } = useTranslation();

  const cols = [
    {
      title: t("Product"),
      links: [
        { label: "Use Cases", slug: "product" },
        { label: "Enterprise Cloud", slug: "/solutions?enterprise_cloud" },
        { label: t("Self-hosted Pro"), slug: "https://cannerdata.com/terms/security" },
        { label: t("Self-hosted Enterprise"), slug: "solutions-industries" },
        { label: t("Wren AI OSS"), slug: "solutions-industries" },
      ],
    },
    {
      title: t("Solutions"),
      links: [
        { label: t("Manufacturing"), slug: "https://wrenai.notion.site/" },
        { label: t("Banking & Finance"), slug: "/" },
        { label: t("Healthcare"), slug: "https://wrenaicloud.statuspage.io/" },
        { label: t("Retail & E-commerce"), slug: "/" },
        { label: t("Media & Entertainment"), slug: "/" },
        { label: t("Automotive"), slug: "/" },
        { label: t("DTC Brands"), slug: "/" },
      ],
    },
    {
      title: t("resources"),
      links: [
        { label: t("Wren AI Documentation"), slug: "https://docs.getwren.ai/cp/overview" },
        { label: t("Blog"), slug: "blog" },
        { label: t("Support Portal"), slug: "support" },
        { label: t("Public Roadmap"), slug: "/" }
      ],
    },
    {
      title: t("Community"),
      links: [
        { label: t("Elite Partners"), slug: "partner?tab=elite" },
        { label: t("Affiliate Partners"), slug: "partner?tab=affiliate" },
        { label: t("Join Discord"), slug: "https://discord.gg/5DvshJqG8Z" },
        { label: "GitHub", slug: "https://api.github.com/Canner/WrenAI" },
      ],
    },
    {
      title: t("Company"),
      links: [
        { label: t("privacyPolicy"), slug: "privacy-policy" },
        { label: t("Security Policy"), slug: "terms-of-use" },
        { label: t("termsOfUse"), slug: "terms-of-use" },
        { label: t("Service Status"), slug: "https://wrenaicloud.statuspage.io/" },
        { label: t("SLA"), slug: "sla" }
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
                {col.title === "Company" && (
                <li>
                  <a
                    href="https://wrenaicloud.statuspage.io/"
                    className="hover:text-gray-900"
                  >
                  <img className="h-20" src='https://capable-butterfly-84cab64826.media.strapiapp.com/footer_Logo_182b5bfa92.png'/>
                  </a>
                </li>

                )}
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
