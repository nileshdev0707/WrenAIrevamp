export default function Stories() {
  const cards = [
    { kpi: 'XX+', label: 'hours saved / month', brand: 'Uber' },
    { kpi: 'XX+', label: 'issues resolved / month', brand: 'Acme' },
    { kpi: 'XX+', label: 'apps integrated', brand: 'ERP' },
  ]
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <div className="text-sm text-blue-600 mb-2">Case Studies</div>
          <h2 className="text-3xl font-bold">Customer Success Stories</h2>
          <p className="mt-3 text-gray-600">See how teams unlock data superpowers with WrenAI.</p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <div key={i} className="rounded-xl overflow-hidden ring-1 ring-gray-100 bg-white shadow-sm">
              <div className="h-36 bg-gray-900/90 text-white flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-extrabold">{c.kpi}</div>
                  <div className="text-sm opacity-80">{c.label}</div>
                </div>
              </div>
              <div className="p-5">
                <div className="text-sm text-gray-500">Featured</div>
                <div className="mt-1 font-semibold">{c.brand}</div>
                <p className="mt-2 text-sm text-gray-600">Read the story →</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


