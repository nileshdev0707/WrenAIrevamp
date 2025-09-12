export default function Logos({ items }) {
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || ''
  if (!items || items.length === 0) return null
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center text-xs uppercase tracking-wider text-gray-500">Trusted by leading teams</div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
          {items.map((it, idx) => {
            const url = it.image?.url
            return (
              <div key={idx} className="flex items-center justify-center p-3 opacity-80 hover:opacity-100 transition-opacity">
                {url ? <img src={`${url.startsWith('http') ? '' : base}${url}`} alt={it.name} className="max-h-8 object-contain" /> : <div className="text-gray-600">{it.name}</div>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}