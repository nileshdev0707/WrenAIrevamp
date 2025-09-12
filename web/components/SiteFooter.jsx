export default function SiteFooter({ pages = [] }) {
  const link = (slug) => `/${slug}`
  const cols = [
    { title: 'Company', links: [
      { label: 'Company', slug: 'company' },
      { label: 'Careers', slug: 'careers' },
      { label: 'Press', slug: 'press' },
    ] },
    { title: 'Connect', links: [
      { label: 'Contact', slug: 'contact' },
      { label: 'Support', slug: 'support' },
      { label: 'Slack', slug: '#' },
    ] },
    { title: 'Partners', links: [
      { label: 'Program', slug: 'partners' },
      { label: 'Solutions', slug: 'solutions' },
      { label: 'Marketplace', slug: '#' },
    ] },
    { title: 'Resources', links: [
      { label: 'Docs', slug: 'docs' },
      { label: 'Blog', slug: 'blog' },
      { label: 'Guides', slug: 'guides' },
    ] },
    { title: 'Legal', links: [
      { label: 'Privacy', slug: 'privacy' },
      { label: 'Terms', slug: 'terms' },
      { label: 'Security', slug: 'security' },
    ] },
  ]
  return (
    <footer className="border-t border-gray-100 py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {cols.map((col, i) => (
            <div key={i}>
              <div className="font-semibold mb-3">{col.title}</div>
              <ul className="space-y-2 text-sm text-gray-600">
                {col.links.map((l, j) => (
                  <li key={j}><a href={l.slug?.startsWith('#') ? l.slug : link(l.slug)} className="hover:text-gray-900">{l.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex items-center justify-between text-sm text-gray-500">
          <div className="font-semibold text-gray-800">WrenAI</div>
          <div>© {new Date().getFullYear()} WrenAI, Inc.</div>
        </div>
      </div>
    </footer>
  )
}


