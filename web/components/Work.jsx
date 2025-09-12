export default function Work({ data }) {
  const title = data?.title || 'Put WrenAI to Work'
  const subtitle = data?.subtitle || 'Empower data teams with secure, scalable access.'
  const visualUrl = data?.visual?.url || data?.visual?.data?.attributes?.url || null
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || ''
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="text-sm text-blue-600 mb-2">How it works</div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        <div className="mt-8 rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 p-6">
          {visualUrl ? <img src={`${visualUrl.startsWith('http') ? '' : base}${visualUrl}`} alt="work" className="mx-auto rounded-lg" /> : <div className="h-64 bg-gray-50 rounded-lg" />}
        </div>
      </div>
    </section>
  )
}


