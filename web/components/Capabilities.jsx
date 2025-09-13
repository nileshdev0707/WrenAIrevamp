import { useRef, useEffect } from 'react';
export default function Capabilities({ data }) {
  console.log(data, 'data')
  if (!data) return null
  const features = data[0] || []
  console.log(features, 'features')
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || ''
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log('Section is visible, triggering animations');
          // Add show class to all animated elements
          const animatedElements = entry.target.querySelectorAll('.fade-up, .fade-left, .fade-right, .word-animate');
          console.log('Found animated elements:', animatedElements.length);
          animatedElements.forEach((el, index) => {
            console.log(`Adding show class to element ${index}`);
            el.classList.add("show");
          });
          observer.unobserve(entry.target); // animate once
        }
      },
      { threshold: 0.3 } // Lower threshold for easier triggering
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section className="md:py-22 sm:py-10 py-5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16" ref={sectionRef}>
          <div className="fade-up inline-flex text-base items-center gap-2 rounded-full border border-gradient-to-r from-[#0B8EE5] to-[#0022CB] bg-white px-4 py-2 font-medium text-blue-700">
            <div className="w-2 h-2 bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] rounded-full"></div>
              <span className="text-black ">{features.badge}</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight md:py-4 py-2 leading-tight">
            {features.title && typeof features.title === 'string' ? (
              <>
                {/* First line */}
                <div className="fade-left">
                  {features.title
                    .split(' ')
                    .slice(0, 2) // Take first 2 words => "Analytics that's"
                    .map((word, index) => (
                      <span key={index} className="text-slate-900 word-animate" style={{transitionDelay: `${index * 0.1}s`}}>
                        {word}{' '}
                      </span>
                    ))}
                </div>

                {/* Second line */}
                <div className="fade-right">
                  {features.title
                    .split(' ')
                    .slice(2) // Rest of the words
                    .map((word, index) => (
                      <span
                        key={index}
                        className={`word-animate ${
                          word.includes('Fast') || word.includes('Intelligent') || word.includes('Secure')
                            ? 'bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] bg-clip-text text-transparent'
                            : 'text-slate-900'
                        }`}
                        style={{transitionDelay: `${(index + 2) * 0.1}s`}}
                      >
                        {word}{index < features.title.split(' ').slice(2).length - 1 ? ' ' : ''}
                      </span>
                    ))}
                </div>
              </>
            ) : (
              <span className="text-slate-900">{features.title}</span>
            )}
          </h2>

          <p className="fade-up mt-3 text-[#757575] text-base">{features.subTitle}</p>
        </div>

        {/* Grid Layout matching the image */}
        {}
            <div className="grid lg:grid-cols-12 md:grid-cols-2 sm:grid-cols-12 gap-6" >
          {features.coreCapabilitieList.map((item, index) => (
            <>
             {item.size === 'lg' && <div className="lg:col-span-6 md:col-span-1 sm:col-span-12 row-span-2 bg-gradient-to-br from-slate-900 to-blue-900 text-white rounded-2xl p-6 shadow-xl w-full">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-lg font-semibold">{item.badge}</h3>
                  </div>
                   <p className="text-slate-300 text-sm mb-4">{item.title}</p>
                   
                   {/* Feature List */}
                     <div className="space-y-3">
                       {item.bullets.map((feature, featureIndex) => (
                         <div key={featureIndex} className="flex items-start gap-3">
                           <div className="w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                             <svg className="w-3 h-3 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                             </svg>
                           </div>
                           <p className="text-slate-300 text-sm">{feature}</p>
                         </div>
                       ))}
                        {item.image ? (
                           <img 
                             src={`${item.image[0].url?.startsWith('http') ? '' : base}${item.image[0].url || item.image}`} 
                             alt={item.title || 'Feature image'} 
                             className="object-contain" 
                           />
                         ) : (
                           <div className="text-gray-600">{item.title}</div>
                         )}
                     </div>
                  
                   
                   </div>}
                  {item.size === 'sm' && <div className="lg:col-span-3 md:col-span-1 space-y-4 sm:col-span-6">
                  <div className="flex flex-col justify-between border border-[#D9D9D9]  bg-[#F5F5F5] rounded-xl p-9 shadow-md  items-center gap-3 h-full">
                  <div className='w-full'>
                  {item.image ? (
                           <img 
                             src={`${item.image[0].url?.startsWith('http') ? '' : base}${item.image[0].url || item.image}`} 
                             alt={item.title || 'Feature image'} 
                             className="object-contain" 
                           />
                         ) : (
                           <div className="text-gray-600 ">{item.title}</div>
                         )}
                  </div>
                    <div>
                      <div className="mt-4 mb-4 font-normal  text-blue-600 text-base">{item.badge}</div>
                      <div className="text-[#1E1E1E] text-2xl font-medium">{item.title}</div>
                    </div>

                  </div>
                </div>}
             </>))}
            </div>
      </div>
    </section>
  )
}