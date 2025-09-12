import { useState } from 'react'

export default function Navbar({ navigation }) {
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
  console.log(links)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <a href="/" className="text-xl font-extrabold tracking-tight">WrenAI</a>
          <nav className="hidden md:flex items-center gap-6 text-gray-700">
            {links.map((l, i) => (
              <a key={i} href={l.url} className="hover:text-gray-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a className="px-4 py-2 text-gray-700 hover:text-gray-900" href="#">Sign in</a>
          <a className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm" href="#">Get Started</a>
        </div>
        <button aria-label="Menu" className="md:hidden p-2 rounded hover:bg-gray-100" onClick={() => setOpen(v => !v)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"/></svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-100">
          <nav className="px-6 py-3 flex flex-col gap-2">
            {links.map((l, i) => (
              <a key={i} href={l.url} className="py-2 text-gray-700 hover:text-gray-900">{l.label}</a>
            ))}
            <div className="flex gap-3 pt-2">
              <a className="px-4 py-2 text-gray-700" href="#">Sign in</a>
              <a className="px-4 py-2 bg-blue-600 text-white rounded-lg" href="#">Get Started</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}