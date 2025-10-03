import { useState, useEffect, createContext, useContext, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { base } from "../service/serviceConfig";
import navigation from "../json/navigation.json";
import LanguageDropdown from "./LanguageDropdown";
import {
  getStoredLanguage,
  saveLanguage,
  detectBrowserLanguage,
  useLocalizedUrl,
} from "../utils/languageUtils";
import { useTranslation } from "../hooks/useTranslation";
import Button from "./common/Button";
// Language Context for global language state
const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  const router = useRouter();

  if (!context) {
    // Return default values for SSR or when provider is not available
    // Use Next.js locale if available
    return {
      currentLanguage: router?.locale || "en",
      changeLanguage: () => {},
      isClient: false,
    };
  }

  // Prefer Next.js locale over context
  return {
    ...context,
    currentLanguage: router?.locale || context.currentLanguage,
  };
};

// Language Provider Component
export const LanguageProvider = ({ children, serverLanguage = "en" }) => {
  const [currentLanguage, setCurrentLanguage] = useState(serverLanguage); // Use server language for SSR
  const [isClient, setIsClient] = useState(false);

  // Handle client-side hydration with server language preference
  useEffect(() => {
    setIsClient(true);

    // Get stored language or use server detected language
    const storedLanguage =
      typeof window !== "undefined"
        ? localStorage.getItem("selectedLanguage")
        : null;

    const finalLanguage = storedLanguage || serverLanguage;

    // Only update if different from current
    if (finalLanguage !== currentLanguage) {
      setCurrentLanguage(finalLanguage);
    }

    // Set document language attribute
    document.documentElement.lang = finalLanguage;

    console.log(
      `Language initialized: ${finalLanguage} (server: ${serverLanguage}, stored: ${storedLanguage})`
    );
  }, [serverLanguage, currentLanguage]);

  const changeLanguage = (langCode) => {
    setCurrentLanguage(langCode);
    saveLanguage(langCode);
  };

  return (
    <LanguageContext.Provider
      value={{ currentLanguage, changeLanguage, isClient }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default function Navbar({ serverLanguage }) {
  // Use Next.js i18n translation hook
  const { t, locale, isClient } = useTranslation();
  const [hydrated, setHydrated] = useState(false);
  const getUrl = useLocalizedUrl();
  // Use router locale as the effective language
  const effectiveLanguage = locale || serverLanguage || "en";

  // Only enable translations after hydration is complete
  useEffect(() => {
    // Immediate hydration for better UX
    setHydrated(true);
  }, []);

  const dynamicPages = Array.isArray(navigation?.pages) ? navigation.pages : [];
  const pageSlugByLabel = dynamicPages.reduce((acc, p) => {
    const lbl = (p.navLabel || p.title || p.label || "")
      .toString()
      .trim()
      .toLowerCase();
    if (lbl) acc[lbl] = p.slug;
    return acc;
  }, {});

  const defaultMapping = {
    product: "product",
    developers: "developers",
    solutions: "solutions",
    resources: "resources",
    documentation: "docs",
    pricing: "pricing",
    blog: "blog",
    contact: "contact",
    support: "support",
    company: "company",
    careers: "careers",
    privacy: "privacy",
    terms: "terms",
    security: "security",
    partners: "partner",
  };

  const fallback = [
    { label: isClient ? t("product") : "Product", url: "/product" },
    { label: isClient ? t("oss") : "OSS", url: "/oss" },
    { label: isClient ? t("solutions") : "Solutions", url: "/solutions" },
    { label: isClient ? t("resources") : "Resources", url: "/resources" },
    { label: isClient ? t("partners ") : "partner", url: "/partner" },
  ];

  const baseLinks =
    Array.isArray(navigation?.links) && navigation.links.length > 0
      ? navigation.links
      : fallback;

  // Normalize: if a CMS link has url '#', replace with the matching page slug if available
  const normalized = baseLinks.map((link) => {
    const label = link.label || link.title || "";
    const url = link.url || "";
    const normalizedLabel = label.toString().trim().toLowerCase();
    const slug =
      pageSlugByLabel[normalizedLabel] || defaultMapping[normalizedLabel];
    const finalUrl = (!url || url === "#") && slug ? `/${slug}` : url || "#";

    // Use translation hook for navigation labels to prevent hydration mismatch
    const translatedLabel = isClient ? t(normalizedLabel, label) : label;

    return { label: translatedLabel, url: finalUrl, parent: link.parent };
  });

  // Append dynamic pages not already present
  const existing = new Set(normalized.map((link) => link.url));
  const appended = dynamicPages
    .map((p) => {
      const label = p.navLabel || p.title || p.label || "";
      const normalizedLabel = label.toString().trim().toLowerCase();
      const translatedLabel = isClient ? t(normalizedLabel, label) : label;
      return { label: translatedLabel, url: `/${p.slug}` };
    })
    .filter((p) => !existing.has(p.url));

  const linksList = normalized.concat(appended);
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (window.innerWidth >= 1024) {
        if (
          expandedIndex >= 0 &&
          !dropdownRef?.current?.contains(event.target)
        ) {
          setExpandedIndex(null);
        }
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [expandedIndex]);

  return (
    <div className="relative">
      {/* Main Header */}
      <header
        className={`z-50 fixed w-full transition-transform duration-700 ease-out ${
          isScrolled ? "translate-y-3" : "translate-y-4 md:translate-y-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Floating Navigation Bar */}
          <div className="relative">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50">
              <div className="flex items-center justify-between xl:px-6 px-4 py-2.5">
                {/* Logo and Navigation */}
                <div className="flex items-center xl:gap-8 gap-4">
                  <Link href="/" className="flex items-center gap-2 group">
                    {navigation?.logo?.url && (
                      <img
                        src={`${
                          navigation?.logo?.url.startsWith("http") ? "" : base
                        }${navigation?.logo?.url}`}
                        alt={navigation?.logo?.name}
                        className="max-h-8 object-contain"
                      />
                    )}
                  </Link>

                  {/* Desktop Navigation */}
                  <nav
                    className={`hidden lg:flex items-center xl:gap-8 gap-4 ${
                      !isClient ? "opacity-0" : "opacity-100"
                    } transition-opacity duration-200`}
                  >
                    {linksList.map((link, i) => {
                      const hasChildren =
                        Array.isArray(link.parent) && link.parent.length > 0;

                      return (
                        <div
                          key={`desktop-${i}`}
                          className="group"
                          onMouseEnter={() =>
                            hasChildren && setExpandedIndex(i)
                          }
                        >
                          <Link
                            href={link.url}
                            className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 px-2 py-1 rounded-md"
                            onMouseEnter={() =>
                              !hasChildren && setExpandedIndex(null)
                            }
                          >
                            {link.label}
                          </Link>

                          {hasChildren && expandedIndex === i && (
                            <div
                              ref={dropdownRef}
                              className="absolute left-0 right-0 mt-10 bg-white border border-gray-200 rounded-2xl shadow-lg transition-all duration-200 z-50 p-8 grid grid-cols-2 gap-6 max-h-[calc(100vh-150px)] overflow-y-auto overscroll-contain"
                            >
                              {link.parent.map((group, index) => (
                                <div key={index}>
                                  {group.title && (
                                    <div className="px-3 font-medium text-blue-600 text-sm pb-4">
                                      {group.title}
                                    </div>
                                  )}
                                  {group.url && (
                                    <Link
                                      href={getUrl(group.url)}
                                      target={
                                        group.url.startsWith("http")
                                          ? "_blank"
                                          : "_self"
                                      }
                                      onClick={() => setExpandedIndex(null)}
                                    >
                                      <div className="font-medium text-base">
                                        {group.label}
                                      </div>
                                      <div className="text-gray-500 text-sm pt-1.5">
                                        {group.description}
                                      </div>
                                    </Link>
                                  )}
                                  <div className="space-y-2">
                                    {group.children?.map((child, index) => (
                                      <Link
                                        href={getUrl(child.url)}
                                        key={index}
                                        className="block rounded-md px-3 py-2 transition-colors duration-200 hover:bg-[#F5F5F5]"
                                        target={
                                          child.url.startsWith("http")
                                            ? "_blank"
                                            : "_self"
                                        }
                                        onClick={() => setExpandedIndex(null)}
                                      >
                                        <div className="ffont-medium text-base">
                                          {child.label}
                                        </div>
                                        <div className="text-gray-500 text-sm pt-1.5">
                                          {child.description}
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </nav>
                </div>

                <div className="flex items-center gap-4">
                  <LanguageDropdown />
                  {/* Right Side Actions */}
                  <div className="hidden lg:flex items-center gap-4">
                    <Link
                      href="https://cloud.getwren.ai/"
                      className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-50"
                      // target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("signIn")}
                    </Link>
                    <Button href="https://cloud.getwren.ai/" variant="primary">
                      {t("getStarted")}
                    </Button>
                  </div>
                  {/* Mobile Menu Button */}
                  <button
                    aria-label="Menu"
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => setOpen((v) => !v)}
                  >
                    <img
                      src="/svg/menu.svg"
                      alt="Menu"
                      className="sm:w-6 sm:h-6 h-4 w-4"
                    />
                  </button>
                </div>
              </div>
              {/* Mobile Menu */}
              {open && (
                <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm rounded-b-2xl">
                  <nav className="px-6 py-4 space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
                    {linksList.map((link, i) => {
                      const hasChildren =
                        Array.isArray(link.parent) && link.parent.length > 0;
                      return (
                        <div key={`mobile-${i}`}>
                          <button
                            onClick={() => {
                              if (hasChildren) {
                                setExpandedIndex(
                                  expandedIndex === i ? null : i
                                );
                              } else {
                                window.location.href = link.url;
                                setOpen(false);
                                setExpandedIndex(null);
                              }
                            }}
                            className="flex justify-between items-center w-full py-3 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200"
                          >
                            {link.label}
                            {hasChildren && (
                              <span
                                className={`inline-block w-2 h-2 border-r-2 border-b-2 border-gray-600 transform transition-transform duration-300 ${
                                  expandedIndex === i
                                    ? "rotate-45"
                                    : "-rotate-45"
                                }`}
                              ></span>
                            )}
                          </button>

                          {hasChildren && expandedIndex === i && (
                            <div className="ml-4 mt-2 space-y-4">
                              {link.parent.map((group, index) => (
                                <div key={index}>
                                  {group.title && (
                                    <div className="font-medium text-blue-600 text-sm pb-4">
                                      {group.title}
                                    </div>
                                  )}
                                  {group.url && (
                                    <Link
                                      href={getUrl(group.url)}
                                      target={
                                        group.url.startsWith("http")
                                          ? "_blank"
                                          : "_self"
                                      }
                                      onClick={() => setOpen(false)}
                                    >
                                      <div className="font-medium text-sm">
                                        {group.label}
                                      </div>
                                      <div className="text-gray-500 text-xs">
                                        {group.description}
                                      </div>
                                    </Link>
                                  )}
                                  <div>
                                    {group.children?.map((child, index) => (
                                      <Link
                                        href={getUrl(child.url)}
                                        key={index}
                                        target={
                                          child.url.startsWith("http")
                                            ? "_blank"
                                            : "_self"
                                        }
                                        onClick={() => setOpen(false)}
                                        className="block rounded-md px-3 py-2 transition-colors duration-200 hover:bg-[#F5F5F5]"
                                      >
                                        <div className="font-medium text-sm">
                                          {child.label}
                                        </div>
                                        <div className="text-gray-500 text-xs">
                                          {child.description}
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </nav>
                  <div className="flex flex-col gap-3 p-4 border-t border-gray-200">
                    <Link
                      href="https://cloud.getwren.ai/"
                      className="px-4 py-3 text-gray-600 hover:text-gray-900 font-medium text-center rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => setOpen(false)}
                    >
                      {t("signIn")}
                    </Link>
                    <Link
                      href="https://cloud.getwren.ai/"
                      className="px-4 py-3 hover:bg-gradient-to-r hover:from-[#0B8EE5] hover:to-[#0022CB] bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white font-medium text-center rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                      onClick={() => setOpen(false)}
                    >
                      {t("getStarted")}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
