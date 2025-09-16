export default function Stats({ data }) {
  const stats = data?.trustedByDataTeams[0] || []
  return (
    <section className="lg:py-6 md:py-5 sm:py-3 py-1">
      <div className="max-w-7xl mx-auto lg:px-6 sm:px-4 px-2">
        <p className="sm:mt-4 max-w-2xl mx-auto mt-2 text-3xl sm:text-4xl text-center md:text-5xl font-medium tracking-tight md:py-4 py-2 leading-tight">
          {stats.title?.split(' ').map((word, index) => {
            const isWorldwide = word.toLowerCase() === 'worldwide'
            return (
              <span 
                key={index} 
                className={`${isWorldwide ? 'bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] bg-clip-text text-transparent' : 'text-black'}`}
              >
                {word}{index < stats.title.split(' ').length - 1 ? ' ' : ''}
              </span>
            )
          })}
        </p>
        <p className="text-[#757575] text-base text-center">{stats.subTitle}</p>
        <div className="grid md:grid-cols-3 md:gap-6 sm:gap-4 gap-2 text-center 2xl:pt-20 xl:pt-15 lg:pt-14 md:pt-12 sm:pt-10 pt-8">
          {stats?.trustedByDataTeamsItem?.map((s, i) => (
            <div key={i} className="md:p-6 sm:p-4 p-2">
              <div className="py-2 2xl:text-7xl xl:text-6xl md:text-5xl  sm:text-4xl text-3xl bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] bg-clip-text text-transparent font-bold">{s.title}</div>
              <div className="mt-2 text-gray-600">
              <div className="inline-flex md:text-base text-sm items-center gap-2 rounded-full border border-gradient-to-r from-[#0B8EE5] to-[#0022CB] bg-white sm:px-4 px-2 sm:py-2 py-2 font-medium text-blue-700">
                <span className="text-black sm:font-bold font-medium">{s.badge}</span></div>
                </div>
               <div className="md:mt-8 sm:mt-4  mt-2 xl:text-xl lg:text-lg md:text-base text-sm text-[#757575]">{s.subTitle}</div>
            </div>
          ))}
        </div>
         <div className="grid sm:grid-cols-3 md:gap-6 sm:gap-4 gap-2 md:mt-9 sm:mt-6 mt-4"> 
           {stats?.teamsItem?.map((s, i) => (
             <div key={i} className="md:p-8 sm:p-4 p-2 bg-white rounded-xl shadow-[0px_56px_232px_-56px_rgba(0,0,0,0.5)] flex flex-col justify-between">
                 <div className="font-medium text-[#1E1E1E] md:mb-8 mb-4 xl:text-xl lg:text-lg md:text-base text-sm">{s.title}</div>
                  <div>
                    <div className="text-[#0B8EE5] lg:text-base md:text-sm text-xs font-bold mb-1">{s.name}</div>
                    <div className="text-[#757575] lg:text-base md:text-sm text-xs">{s.role}</div>
                  </div>
             </div>
           ))}
         </div>
      </div>
    </section>
  )
}


