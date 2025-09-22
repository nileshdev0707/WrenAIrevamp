import { useState, useEffect } from 'react'
import { base} from "../service/serviceConfig";
import navigation from "../json/navigation.json";

export default function Navbar() {

  // if (loading) {
  //   return <div>Loading navigation...</div>;
  // }

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
    { label: 'Product', url: '/product' },
    { label: 'Developers', url: '/developers' },
    { label: 'Solutions', url: '/solutions' },
    { label: 'Docs', url: '/docs' },
  ]

  const baseLinks = Array.isArray(navigation?.links) && navigation.links.length > 0 ? navigation.links : fallback

  // Normalize: if a CMS link has url '#', replace with the matching page slug if available
  const normalized = baseLinks.map((l) => {
    const label = l.label || l.title || ''
    const url = l.url || ''
    const normalizedLabel = label.toString().trim().toLowerCase()
    const slug = pageSlugByLabel[normalizedLabel] || defaultMapping[normalizedLabel]
    const finalUrl = (!url || url === '#') && slug ? `/${slug}` : (url || '#')
    return { label, url: finalUrl }
  })

  // Append dynamic pages not already present
  const existing = new Set(normalized.map((l) => l.url))
  const appended = dynamicPages
    .map((p) => ({ label: p.navLabel || p.title || p.label, url: `/${p.slug}` }))
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
                <div className="flex items-center gap-8">
                  <a href='/' className="flex items-center gap-2 group">
                  {navigation?.logo?.url && <img src={`${navigation?.logo?.url.startsWith('http') ? '' : base}${navigation?.logo?.url}`} alt={navigation?.logo?.name} className="max-h-8 object-contain" />}
                  </a>
                  
                  {/* Desktop Navigation */}
                  <nav className="hidden lg:flex items-center gap-8">
                    {links.map((l, i) => (
                      <a 
                        key={`desktop-${i}`} 
                        href={l.url} 
                        className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md px-2 py-1"
                      >
                        {l.label}
                      </a>
                    ))}
                  </nav>
                </div>
                
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
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 256 256" enableBackground="new 0 0 256 256" className="h-6 w-6">
                    <g><g><path fill="#000000" d="M246,210.6c0,6.5-5.4,11.8-11.7,11.8H21.7c-6.5,0-11.7-5.2-11.7-11.8c0-6.5,5.4-11.8,11.7-11.8h212.6C240.8,198.8,246,204,246,210.6z M21.7,57.2h212.6c6.3,0,11.7-5.3,11.7-11.8c0-6.6-5.2-11.8-11.7-11.8H21.7c-6.3,0-11.7,5.3-11.7,11.8C10,52,15.2,57.2,21.7,57.2z M234.3,116.2H21.7c-6.3,0-11.7,5.3-11.7,11.8c0,6.6,5.2,11.8,11.7,11.8h212.6c6.3,0,11.7-5.3,11.7-11.8C246,121.4,240.8,116.2,234.3,116.2z"/></g></g>
                  </svg>
                </button>
              </div>
              
              {/* Mobile Menu */}
              {open && (
                <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm rounded-b-2xl">
                  <nav className="px-6 py-4 space-y-2">
                    {links.map((l, i) => (
                      <a 
                        key={`mobile-${i}`} 
                        href={l.url} 
                        className="block py-3 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors duration-200"
                        onClick={() => setOpen(false)}
                      >
                        {l.label}
                      </a>
                    ))}
                    <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                      <a 
                        href="#" 
                        className="px-4 py-3 text-gray-600 hover:text-gray-900 font-medium text-center rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => setOpen(false)}
                      >
                        Sign in
                      </a>
                      <a 
                        href="#" 
                        className="px-4 py-3 hover:bg-gradient-to-r hover:from-[#0B8EE5] hover:to-[#0022CB] bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white font-medium text-center rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                        onClick={() => setOpen(false)}
                      >
                        Get Started
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