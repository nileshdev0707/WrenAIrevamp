import { base } from "../service/serviceConfig";
import navigation from "../json/navigation.json";

export default function SiteFooter() {
  const cols = [
    {
      title: "Company",
      links: [
        // { label: "Careers", slug: "careers" },
        { label: "Press", slug: "press" },
        { label: "Security", slug: "https://cannerdata.com/terms/security" },
        { label: "Case Studies", slug: "case-studies" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Contact", slug: "contact" },
        { label: "Discord", slug: "https://discord.gg/5DvshJqG8Z" },
        // { label: "Merch", slug: "merch" },
      ],
    },
    {
      title: "Partners",
      links: [
        { label: "Affiliate Program", slug: "affiliate-program" },
        { label: "Elite Partners", slug: "/" },
      ],
    },
    {
      title: "Resources",
      links: [{ label: "Public Roadmap", slug: "https://wrenai.notion.site/" }],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", slug: "privacy-policy" },
        { label: "Terms of Use", slug: "terms-of-use" },
      ],
    },
  ];
  const link = (slug) => {
    if (!slug) return "/";
    if (slug.startsWith("http") || slug.startsWith("https") || slug.startsWith("#")) {
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
                {col.links.map((l, j) => (
                  <li key={j}>
                    <a
                      href={l.slug?.startsWith("#") ? l.slug : link(l.slug)}
                      className="hover:text-gray-900"
                      target={l.slug.startsWith("http") ? "_blank" : "_self"}
                      rel={l.slug.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-20 grid grid-cols-3 text-sm items-center text-gray-500">
          <div className="font-semibold text-gray-400">
            © 2025 Canner. All right reserved.
          </div>
          <a href="/" className="flex items-center gap-2 group justify-center">
            {navigation?.logo?.url && (
              <img
                src={`${navigation?.logo?.url.startsWith("http") ? "" : base}${
                  navigation?.logo?.url
                }`}
                alt={navigation?.logo?.name}
                className="max-h-8 object-contain"
              />
            )}
          </a>
          <div className="flex gap-5 justify-end">
          <a href="https://twitter.com" className="group">
              <img src="/svg/twitter.svg" alt="twitter" className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" className="group">
              <img src="/svg/linkedin.svg" alt="linkedin" className="w-5 h-5" />
            </a>
            <a href="https://medium.com" className="group">
              <img src="/svg/medium.svg" alt="medium" className="w-5 h-5" />
            </a>
            <a href="https://discord.com" className="group">
              <img src="/svg/discord.svg" alt="discord" className="w-5 h-5" />
            </a>
            <a href="https://github.com" className="group">
              <img src="/svg/github.svg" alt="github" className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
