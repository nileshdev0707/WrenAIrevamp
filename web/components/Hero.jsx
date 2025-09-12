import Image from 'next/image'

export default function Hero({ data }) {
  const badge = data?.badge || '#1 Generative BI Solution'
  const headline = data?.headline || 'Analytics without the Wait.\nDecisions without the Bottleneck.'
  const sub = data?.subheadline || 'Trusted by 10,000+ data experts and analytics teams worldwide.'
  const buttons = data?.buttons || [{ label: 'Start Free Trial Today', url: '#' }, { label: 'Schedule a demo', url: '#' }]
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || ''
  const heroMedia = data?.heroImage
  const heroImage = typeof heroMedia === 'string'
    ? heroMedia
    : (heroMedia?.url || heroMedia?.data?.attributes?.url || null)

  return (
    <section className="relative overflow-hidden text-center py-24 px-6">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-white" />
      <div className="relative max-w-6xl mx-auto">
        <div className="inline-block bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm shadow-sm">{badge}</div>
        <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight">
          {headline.split('\n').map((ln, i) => <div key={i}>{ln}</div>)}
        </h1>
        <p className="mt-5 text-lg text-gray-600 max-w-3xl mx-auto">{sub}</p>
        <div className="mt-9 flex justify-center gap-3">
          {buttons.map((b,i) => (
            <a key={i} href={b.url} className={`px-6 py-3 rounded-lg shadow-sm border ${i===0? 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700':'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'}`}>{b.label}</a>
          ))}
        </div>

        {/* Hero mock image area */}
        <div className="mt-14 relative">
          <div className="mx-auto max-w-[980px] bg-white rounded-2xl shadow-2xl p-6 ring-1 ring-gray-100">
            {/* Simple mock of cards: replace with more accurate markup as needed */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-2 p-4">
                <div className="h-40 bg-gray-50 rounded-lg" />
              </div>
              <div className="p-4">
                <div className="h-40 bg-gray-50 rounded-lg" />
              </div>
            </div>
          </div>
          {heroImage && (
            <img src={`${heroImage.startsWith('http') ? '' : base}${heroImage}`} alt="hero" className="absolute -bottom-8 right-6 " />
          )}
        </div>
      </div>
    </section>
  )
}