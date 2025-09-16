export default function Stories({ data }) {
  const cards = data.caseStudies[0] || []
  const title = cards?.title || 'Case Studies'
  const subtitle = cards?.subTitle || 'Case Studies'
  // console.log(cards, 'cards')
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <div className="my-4 inline-flex text-base items-center gap-2 rounded-full border border-gradient-to-r from-[#0B8EE5] to-[#0022CB] bg-white px-4 py-2 font-medium text-blue-700">
              <div className="w-2 h-2 bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] rounded-full"></div>
              <span className="text-black ">{title}</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight md:py-4 py-2 leading-tight">
            {subtitle.split('\n').map((line, i) => (
              <div key={`line-${i}`} className="mb-1 sm:mb-2">
                {line.split(' ').map((word, j) => {
                  const isHighlighted = word === 'stories' || word === 'stories' || word === 'stories'
                  return (
                    <span 
                      key={`word-${i}-${j}`} 
                      className={`${isHighlighted ? 'bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] bg-clip-text text-transparent font-semibold' : 'text-[#060A1F]'}`}
                    
                    >
                      {word}{j < line.split(' ').length - 1 ? ' ' : ''}
                    </span>
                  )
                })}
              </div>
            ))}
          </h2>
        {/* <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight md:py-4 py-2 leading-tight">
          
          </h2> */}
          {/* <div className="text-sm text-blue-600 mb-2">Case Studies</div> */}
          {/* <h2 className="text-3xl font-bold">{cards.title}</h2> */}
          {/* <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight md:py-4 py-2 leading-tight">
            {title.split('\n').map((line, i) => (
              <div key={`line-${i}`} className="mb-1 sm:mb-2">
                {line.split(' ').map((word, j) => {
                  const isHighlighted = word === 'stories' || word === 'stories' || word === 'stories'
                  return (
                    <span 
                      key={`word-${i}-${j}`} 
                      className={`${isHighlighted ? 'bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] bg-clip-text text-transparent font-semibold' : 'text-[#060A1F]'} word-animate`}
                      style={{ animationDelay: `${200 + (i * 100) + (j * 50)}ms` }}
                    >
                      {word}{j < line.split(' ').length - 1 ? ' ' : ''}
                    </span>
                  )
                })}
              </div>
            ))}
          </h2> */}
          <p className="mt-3 text-gray-600">See how teams unlock data superpowers with WrenAI.</p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {/* {cards?.map((c, i) => (
            <div key={`story-${i}`} className="rounded-xl overflow-hidden ring-1 ring-gray-100 bg-white shadow-sm">
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
          ))} */}
        </div>
      </div>
    </section>
  )
}


