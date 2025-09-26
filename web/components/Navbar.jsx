import { useState, useEffect, createContext, useContext } from 'react'
import { base} from "../service/serviceConfig";
import navigation from "../json/navigation.json";
import LanguageDropdown from "./LanguageDropdown";
import { getStoredLanguage, saveLanguage, detectBrowserLanguage } from "../utils/languageUtils";
import { translate, safeTranslate } from "../service/lang";

// Language Context for global language state
const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return default values for SSR or when provider is not available
    return {
      currentLanguage: 'en',
      changeLanguage: () => {},
      isClient: false
    };
  }
  return context;
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
  // Use language context to avoid hydration mismatches
  const { currentLanguage, isClient } = useLanguage();
  const [hydrated, setHydrated] = useState(false);
  
  // Use server language as fallback if context is not available
  const effectiveLanguage = currentLanguage || serverLanguage || 'en';

  // Only enable translations after hydration is complete
  useEffect(() => {
    // Add a small delay to ensure hydration is fully complete
    const timer = setTimeout(() => {
      setHydrated(true);
    }, 100);
    
    return () => clearTimeout(timer);
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
    blog: 'blog',
    contact: 'contact',
    support: 'support',
    company: 'company',
    careers: 'careers',
    privacy: 'privacy',
    terms: 'terms',
    security: 'security',
  }

  const fallback = [
    { label: safeTranslate("product", hydrated && isClient, effectiveLanguage), url: '/product' },
    { label: safeTranslate("developers", hydrated && isClient, effectiveLanguage), url: '/developers' },
    { label: safeTranslate("solutions", hydrated && isClient, effectiveLanguage), url: '/solutions' },
    { label: safeTranslate("docs", hydrated && isClient, effectiveLanguage), url: '/docs' },
  ]

  const baseLinks = Array.isArray(navigation?.links) && navigation.links.length > 0 ? navigation.links : fallback

  // Normalize: if a CMS link has url '#', replace with the matching page slug if available
  const normalized = baseLinks.map((l) => {
    const label = l.label || l.title || ''
    const url = l.url || ''
    const normalizedLabel = label.toString().trim().toLowerCase()
    const slug = pageSlugByLabel[normalizedLabel] || defaultMapping[normalizedLabel]
    const finalUrl = (!url || url === '#') && slug ? `/${slug}` : (url || '#')
    
    // Use safeTranslate for navigation labels to prevent hydration mismatch
    const translatedLabel = safeTranslate(normalizedLabel, hydrated && isClient, effectiveLanguage) || label
    
    return { label: translatedLabel, url: finalUrl }
  })

  // Append dynamic pages not already present
  const existing = new Set(normalized.map((l) => l.url))
  const appended = dynamicPages
    .map((p) => {
      const label = p.navLabel || p.title || p.label || ''
      const normalizedLabel = label.toString().trim().toLowerCase()
      const translatedLabel = safeTranslate(normalizedLabel, hydrated && isClient, effectiveLanguage) || label
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
              <div className="flex items-center justify-between px-6 py-4">
                {/* Logo and Navigation */}
                <div className="flex items-center xl:gap-8 gap-4">
                  <a href='/' className="flex items-center gap-2 group">
                  {navigation?.logo?.url && <img src={`${navigation?.logo?.url.startsWith('http') ? '' : base}${navigation?.logo?.url}`} alt={navigation?.logo?.name} className="max-h-8 object-contain" />}
                  </a>
                  
                  {/* Desktop Navigation */}
                  <nav className="hidden lg:flex items-center xl:gap-8 gap-4" key={`nav-${effectiveLanguage}-${hydrated}`}>
                    {links.map((l, i) => (
                      <a 
                        key={`desktop-${i}-${hydrated ? effectiveLanguage : 'default'}`} 
                        href={l.url} 
                        className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md xl:px-2 px-1 py-1"
                      >
                        {l.label}
                      </a>
                    ))}
                  </nav>
                </div>


                <div className="flex items-center gap-4">
                    <LanguageDropdown />
                    {/* Right Side Actions */}
                    <div className="hidden lg:flex items-center gap-4">
                      <a 
                        href="https://cloud.getwren.ai/" 
                        className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-50"
                        // target="_blank"
                        rel="noopener noreferrer"
                      >
                        Sign in
                      </a>
                      <a 
                        href="https://cloud.getwren.ai/" 
                        className="bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white font-medium px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                        // target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Started
                      </a>
                    </div>
                {/* Mobile Menu Button */}
                <button 
                  aria-label="Menu" 
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200" 
                  onClick={() => setOpen(v => !v)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 256 256" enableBackground="new 0 0 256 256" className="sm:h-6 sm:w-6 h-4 w-4">
                    <g><g><path fill="#000000" d="M246,210.6c0,6.5-5.4,11.8-11.7,11.8H21.7c-6.5,0-11.7-5.2-11.7-11.8c0-6.5,5.4-11.8,11.7-11.8h212.6C240.8,198.8,246,204,246,210.6z M21.7,57.2h212.6c6.3,0,11.7-5.3,11.7-11.8c0-6.6-5.2-11.8-11.7-11.8H21.7c-6.3,0-11.7,5.3-11.7,11.8C10,52,15.2,57.2,21.7,57.2z M234.3,116.2H21.7c-6.3,0-11.7,5.3-11.7,11.8c0,6.6,5.2,11.8,11.7,11.8h212.6c6.3,0,11.7-5.3,11.7-11.8C246,121.4,240.8,116.2,234.3,116.2z"/></g></g>
                  </svg>
                </button>
                  </div>    
              </div>
              
              {/* Mobile Menu */}
              {open && (
                <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm rounded-b-2xl">
                  <nav className="px-6 py-4 space-y-2" key={`mobile-nav-${effectiveLanguage}-${hydrated}`}>
                    {links.map((l, i) => (
                      <a 
                        key={`mobile-${i}-${hydrated ? effectiveLanguage : 'default'}`} 
                        href={l.url} 
                        className="block py-3 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200"
                        onClick={() => setOpen(false)}
                      >
                        {l.label}
                      </a>
                    ))}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="px-3 py-2">
                        <LanguageDropdown />
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                      <a 
                        href="#" 
                        className="px-4 py-3 text-gray-600 hover:text-gray-900 font-medium text-center rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => setOpen(false)}
                      >
                        {safeTranslate("signIn", hydrated && isClient, effectiveLanguage)}
                      </a>
                      <a 
                        href="#" 
                        className="px-4 py-3 hover:bg-gradient-to-r hover:from-[#0B8EE5] hover:to-[#0022CB] bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white font-medium text-center rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                        onClick={() => setOpen(false)}
                      >
                        {safeTranslate("getStarted", hydrated && isClient, effectiveLanguage)}
                      </a>
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