import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { base} from "../service/serviceConfig";
import navigation from "../json/navigation.json";
import LanguageDropdown from "./LanguageDropdown";
import { getStoredLanguage, saveLanguage, detectBrowserLanguage } from "../utils/languageUtils";
import { useTranslation } from "../hooks/useTranslation";
import Button from './common/Button';
// Language Context for global language state
const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  const router = useRouter();
  
  if (!context) {
    // Return default values for SSR or when provider is not available
    // Use Next.js locale if available
    return {
      currentLanguage: router?.locale || 'en',
      changeLanguage: () => {},
      isClient: false
    };
  }
  
  // Prefer Next.js locale over context
  return {
    ...context,
    currentLanguage: router?.locale || context.currentLanguage
  };
};

// Language Provider Component
export const LanguageProvider = ({ children, serverLanguage = 'en' }) => {
  const [currentLanguage, setCurrentLanguage] = useState(serverLanguage); // Use server language for SSR
  const [isClient, setIsClient] = useState(false);

  // Handle client-side hydration with server language preference
  useEffect(() => {
    setIsClient(true);
    
    // Get stored language or use server detected language
    const storedLanguage = typeof window !== 'undefined' 
      ? localStorage.getItem('selectedLanguage') 
      : null;
    
    const finalLanguage = storedLanguage || serverLanguage;
    
    // Only update if different from current
    if (finalLanguage !== currentLanguage) {
      setCurrentLanguage(finalLanguage);
    }
    
    // Set document language attribute
    document.documentElement.lang = finalLanguage;
    
    console.log(`Language initialized: ${finalLanguage} (server: ${serverLanguage}, stored: ${storedLanguage})`);
  }, [serverLanguage, currentLanguage]);

  const changeLanguage = (langCode) => {
    setCurrentLanguage(langCode);
    saveLanguage(langCode);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, isClient }}>
      {children}
    </LanguageContext.Provider>
  );
};


export default function Navbar({ serverLanguage }) {
  // Use Next.js i18n translation hook
  const { t, locale, isClient } = useTranslation();
  const [hydrated, setHydrated] = useState(false);
  // Use router locale as the effective language
  const effectiveLanguage = locale || serverLanguage || 'en';

  // Only enable translations after hydration is complete
  useEffect(() => {
    // Immediate hydration for better UX
    setHydrated(true);
  }, []);

  const dynamicPages = Array.isArray(navigation?.pages) ? navigation.pages : []
  const pageSlugByLabel = dynamicPages.reduce((acc, p) => {
    const lbl = (p.navLabel || p.title || p.label || '').toString().trim().toLowerCase()
    if (lbl) acc[lbl] = p.slug
    return acc
  }, {})

  const defaultMapping = {
    product: 'product',
    developers: 'developers',
    solutions: 'solutions',
    docs: 'docs',
    documentation: 'docs',
    pricing: 'pricing',
    blog: 'post',
    contact: 'contact',
    support: 'support',
    company: 'company',
    careers: 'careers',
    privacy: 'privacy',
    terms: 'terms',
    security: 'security',
  }

  const fallback = [
    { label: isClient ? t("product") : "Product", url: '/product' },
    { label: isClient ? t("developers") : "Developers", url: '/developers' },
    { label: isClient ? t("solutions") : "Solutions", url: '/solutions' },
    { label: isClient ? t("docs") : "Docs", url: '/docs' },
  ]

  const baseLinks = Array.isArray(navigation?.links) && navigation.links.length > 0 ? navigation.links : fallback

  // Normalize: if a CMS link has url '#', replace with the matching page slug if available
  const normalized = baseLinks.map((l) => {
    const label = l.label || l.title || ''
    const url = l.url || ''
    const normalizedLabel = label.toString().trim().toLowerCase()
    const slug = pageSlugByLabel[normalizedLabel] || defaultMapping[normalizedLabel]
    const finalUrl = (!url || url === '#') && slug ? `/${slug}` : (url || '#')
    
    // Use translation hook for navigation labels to prevent hydration mismatch
    const translatedLabel = isClient ? t(normalizedLabel, label) : label
    
    return { label: translatedLabel, url: finalUrl }
  })

  // Append dynamic pages not already present
  const existing = new Set(normalized.map((l) => l.url))
  const appended = dynamicPages
    .map((p) => {
      const label = p.navLabel || p.title || p.label || ''
      const normalizedLabel = label.toString().trim().toLowerCase()
      const translatedLabel = isClient ? t(normalizedLabel, label) : label
      return { label: translatedLabel, url: `/${p.slug}` }
    })
    .filter((p) => !existing.has(p.url))

  const links = normalized.concat(appended)
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative"> 
      {/* Main Header */}
      <header className={`z-50 fixed w-full transition-transform duration-700 ease-out ${
        isScrolled 
          ? 'translate-y-0' 
          : 'translate-y-2 md:translate-y-3'
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Floating Navigation Bar */}
          <div className="relative">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50">
              <div className="flex items-center justify-between xl:px-6 px-4 py-2.5">
                {/* Logo and Navigation */}
                <div className="flex items-center xl:gap-8 gap-4">
                  <Link href='/' className="flex items-center gap-2 group">
                    {navigation?.logo?.url && <img src={`${navigation?.logo?.url.startsWith('http') ? '' : base}${navigation?.logo?.url}`} alt={navigation?.logo?.name} className="max-h-8 object-contain" />}
                  </Link>
                  
                  {/* Desktop Navigation */}
                  <nav className={`hidden lg:flex items-center xl:gap-8 gap-4 ${!isClient ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`} key={`nav-${effectiveLanguage}-${isClient}`}>
                    {links.map((l, i) => {
                      // Check if it's an external link
                      const isExternal = l.url.startsWith('http') || l.url.startsWith('https') || l.url === '#';
                      
                      if (isExternal) {
                        return (
                          <Link
                            key={`desktop-${i}-${isClient ? effectiveLanguage : 'default'}`} 
                            href={l.url} 
                            className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md xl:px-2 px-1 py-1"
                            target={l.url.startsWith('http') ? '_blank' : '_self'}
                            rel={l.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                          >
                            {l.label}
                          </Link>
                        );
                      }
                      
                      return (
                        <Link 
                          key={`desktop-${i}-${isClient ? effectiveLanguage : 'default'}`} 
                          href={l.url}
                          className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md xl:px-2 px-1"
                        >
                          {l.label}
                        </Link>
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
                      <Button href="https://cloud.getwren.ai/" variant="primary" >
                        {t("getStarted")}
                      </Button>
                    </div>
                {/* Mobile Menu Button */}
                <button 
                  aria-label="Menu" 
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200" 
                  onClick={() => setOpen(v => !v)}
                >
                  <img src="/svg/menu.svg" alt="Menu" className="sm:w-6 sm:h-6 h-4 w-4" />
                </button>
                  </div>    
              </div>
              
              {/* Mobile Menu */}
              {open && (
                <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm rounded-b-2xl">
                  <nav className="px-6 py-4 space-y-2" key={`mobile-nav-${effectiveLanguage}-${isClient}`}>
                    {links.map((l, i) => {
                      // Check if it's an external link
                      const isExternal = l.url.startsWith('http') || l.url.startsWith('https') || l.url === '#';
                      
                      if (isExternal) {
                        return (
                          <Link
                            key={`mobile-${i}-${isClient ? effectiveLanguage : 'default'}`} 
                            href={l.url} 
                            className="block py-3 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200"
                            target={l.url.startsWith('http') ? '_blank' : '_self'}
                            rel={l.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                            onClick={() => setOpen(false)}
                          >
                            {l.label}
                          </Link>
                        );
                      }
                      
                      return (
                        <Link 
                          key={`mobile-${i}-${isClient ? effectiveLanguage : 'default'}`} 
                          href={l.url}
                          className="block py-3 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200"
                          onClick={() => setOpen(false)}
                        >
                          {l.label}
                        </Link>
                      );
                    })}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="px-3 py-2">
                        <LanguageDropdown />
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
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
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}