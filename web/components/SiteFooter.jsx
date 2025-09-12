export default function SiteFooter() {
  const cols = [
    { title: 'Company', links: ['About', 'Careers', 'Press'] },
    { title: 'Connect', links: ['Contact', 'Support', 'Slack'] },
    { title: 'Partners', links: ['Program', 'Solutions', 'Marketplace'] },
    { title: 'Resources', links: ['Docs', 'Blog', 'Guides'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Security'] },
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
                  <li key={j}><a href="#" className="hover:text-gray-900">{l}</a></li>
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


