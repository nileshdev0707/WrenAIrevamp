export default function CTA({ data }) {
  const title = data?.title || "Ready to unlock your data’s potential?"
  const primaryLabel = data?.primaryLabel || 'Start free'
  const primaryUrl = data?.primaryUrl || '#'
  const secondaryLabel = data?.secondaryLabel || 'Explore Pricing'
  const secondaryUrl = data?.secondaryUrl || '#'
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-2xl bg-blue-600 text-white p-8 flex flex-col md:flex-row items-center justify-between">
          <div>
            <div className="text-sm opacity-90">Quick Start</div>
            <h3 className="text-2xl font-bold mt-1">{title}</h3>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <a href={secondaryUrl} className="btn btn-ghost bg-white text-gray-900">{secondaryLabel}</a>
            <a href={primaryUrl} className="btn btn-primary bg-slate-900 hover:bg-slate-800">{primaryLabel}</a>
          </div>
        </div>
      </div>
    </section>
  )
}


