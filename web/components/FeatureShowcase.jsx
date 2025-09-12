export default function FeatureShowcase({ data }) {
  const cards = data?.cards || []

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((f, i) => (
            <div key={i} className="rounded-2xl bg-slate-900 text-slate-100 p-6 ring-1 ring-slate-800 shadow-lg">
              <div className="text-sm text-blue-400">Powered Feature</div>
              <h3 className="mt-2 text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{f.description}</p>
              <div className="mt-6 h-36 rounded-lg bg-gradient-to-br from-slate-800 to-slate-700" />
            </div>
          ))}
        </div>
        
      </div>
    </section>
  )
}


