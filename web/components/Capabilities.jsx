export default function Capabilities({ data }) {
  if (!data) return null
  const features = data.features || []
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">Core Capabilities</div>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">{data.title}</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">{data.subtitle}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const isDark = (f.variant || 'light') === 'dark'
            const isLarge = (f.size || 'sm') === 'lg'
            const base = process.env.NEXT_PUBLIC_STRAPI_URL || ''
            const img = f?.image?.url || f?.image?.data?.attributes?.url || null
            return (
              <div
                key={i}
                className={`${isDark ? 'bg-gradient-to-br from-slate-900 to-blue-900 text-slate-100 ring-white/10' : 'bg-white text-slate-900 ring-gray-100'} relative overflow-hidden rounded-2xl p-6 shadow-lg ring-1`}
              >
                {f.badge && (
                  <div className={`text-[11px] mb-2 ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>{f.badge}</div>
                )}
                <div className="flex items-start gap-3">
                  <div className={`h-10 w-10 flex items-center justify-center rounded-full ${isDark ? 'bg-blue-500/20 text-blue-200 ring-1 ring-inset ring-white/10' : 'bg-blue-50 text-blue-700 ring-1 ring-blue-100'}`}>{/* optional icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 3.75a8.25 8.25 0 100 16.5 8.25 8.25 0 000-16.5Zm-1.5 5.25a.75.75 0 011.5 0v3.19l2.03 2.03a.75.75 0 11-1.06 1.06l-2.22-2.22A.75.75 0 0110.5 12V9z"/></svg>
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'} ${isLarge ? 'text-lg' : 'text-base'}`}>{f.title}</div>
                    <p className={`mt-2 text-sm ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>{f.description}</p>
                    {Array.isArray(f.bullets) && f.bullets.length > 0 && (
                      <ul className={`mt-3 space-y-1 text-sm ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>
                        {f.bullets.map((b, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className={`mt-1 h-1.5 w-1.5 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-600'}`} />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                {img && (
                  <img src={`${img.startsWith('http') ? '' : base}${img}`} alt="" className={`mt-4 rounded-lg ${isLarge ? '' : 'hidden md:block'} ${isDark ? '' : 'ring-1 ring-gray-200'}`} />
                )}
                {isDark && <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/20 blur-2xl" />}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}