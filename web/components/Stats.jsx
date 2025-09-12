export default function Stats({ data }) {
  const items = data?.items || []
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          {items.map((s, i) => (
            <div key={i} className="p-6 bg-white rounded-xl shadow-sm ring-1 ring-gray-100">
              <div className="text-4xl font-extrabold text-gray-900">{s.title}</div>
              <div className="mt-2 text-gray-600">{s.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


