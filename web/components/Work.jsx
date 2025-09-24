import { useState, useRef, useEffect } from 'react' 
import { base } from "../service/serviceConfig";

export default function Work({ data }) {
  const works = data?.UseCases?.[0] || []
  const badge = works?.badge || 'Put WrenAI to Work'
  const title = works?.title || 'Empower data teams with secure, scalable access.'
  const visualUrl = data?.visual?.url || data?.visual?.data?.attributes?.url || null
  
  // Get dynamic tabs from useCasesItems
  const useCasesItems = works?.useCasesItems || []
  const [activeTab, setActiveTab] = useState(0) // Set index 0 as default active
  console.log(useCasesItems,'useCasesItems 855885');

  // Create tabs array from dynamic data
  const tabs = useCasesItems.map(item => item.badge).filter(Boolean)

  // Refs for scroll animations
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const tabsRef = useRef(null)
  const contentRef = useRef(null)

  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
            // Also animate child elements with word-animate class
            const childElements = entry.target.querySelectorAll('.word-animate')
            childElements.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('show')
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    // Observe all animated elements
    const elementsToAnimate = [
      sectionRef.current,
      titleRef.current,
      tabsRef.current,
      contentRef.current
    ].filter(Boolean)

    elementsToAnimate.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => {
      elementsToAnimate.forEach((el) => {
        if (el) observer.unobserve(el)
      })
    }
  }, [activeTab]) // Re-run when activeTab changes

  // Handle tab content animation when tab changes
  useEffect(() => {
    if (contentRef.current) {
      // Reset animation classes
      const animatedElements = contentRef.current.querySelectorAll('.word-animate, .fade-up, .fade-card')
      animatedElements.forEach(el => {
        el.classList.remove('show')
      })
      
      // Re-trigger animations with delay
      setTimeout(() => {
        animatedElements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('show')
          }, index * 100)
        })
      }, 100)
    }
  }, [activeTab])

  const getTabContent = (tabIndex) => {
    const useCaseItem = useCasesItems[tabIndex]
    
    if (useCaseItem) {
      return {
        title: useCaseItem.title || '',
        subtitle: useCaseItem.subtitle || '',
        description: useCaseItem.description || '',
        image: useCaseItem.image || null,
        layout: useCaseItem.layout || 'topImage',
      }
    }
  }
  return (
    <section ref={sectionRef} className="md:pb-20 md:pt-20 pb-10 pt-5 bg-[#F7FBFE] fade-up">
      <div className="max-w-6xl mx-auto lg:px-6 sm:px-4 px-2 text-center">
        <div ref={titleRef} className="fade-up">
          <div className="my-4 inline-flex text-base items-center gap-2 rounded-full border border-gradient-to-r from-[#0B8EE5] to-[#0022CB] bg-white px-4 py-2 font-medium text-blue-700">
            <div className="w-2 h-2 bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] rounded-full"></div>
            <span className="text-black ">{badge}</span>
          </div>
          
          <h2 className="sm:mt-4 mt-2 text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight md:py-4 py-2 leading-tight">
            {title.split('\n').map((line, i) => (
              <div key={`line-${i}`} className="mb-1 sm:mb-2">
                {line.split(' ').map((word, j) => {
                  const isHighlighted = word === 'WrenAI' || word === 'Wren' || word === 'AI'
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
          </h2>
        </div>

        <div ref={tabsRef} className="sm:mt-8 mt-4 mb-8">
          <div className="flex overflow-x-auto scrollbar-hide gap-2 px-4 sm:px-0 sm:justify-center">
            {tabs.map((tab, index) => (
              <button
                key={`tab-${index}`}
                onClick={() => setActiveTab(index)}
                className={`flex-shrink-0 px-4 py-2 rounded-2xl text-md transition-all duration-200 whitespace-nowrap ${
                  activeTab === index
                    ? 'bg-gradient-to-r from-[#0B8EE5] to-[#0022CB] text-white font-bold'
                    : 'bg-[#F5F5F5] text-gray-600 hover:bg-gray-200 font-medium'
                }`}
                style={{ animationDelay: `${400 + (index * 100)}ms` }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {getTabContent(activeTab) && (
          <div ref={contentRef} className="mt-8 grid grid-cols-1 fade-card">
            <div className={`text-center md:mb-8 mb-4 ${getTabContent(activeTab).layout === 'topImage' ? 'order-2 md:mt-8 mt-4' : 'order-1'}`}>
              <h3 className={`${getTabContent(activeTab).layout === 'topImage' ? ' my-4' : 'mb-4'} md:text-[28px] text-[20px] font-medium text-[#2F54EB]`}
                  style={{ animationDelay: '200ms' }}>
                {getTabContent(activeTab).title}
              </h3>
              <p className="max-w-3xl mx-auto text-[#1E1E1E] text-base font-bold"
                 style={{ animationDelay: '300ms' }}>
                {getTabContent(activeTab).subtitle}
              </p>
              <p className="text-[#757575] max-w-3xl mx-auto mt-4 text-base font-regular"
                 style={{ animationDelay: '400ms' }}>
                {getTabContent(activeTab).description}
              </p>
            </div>
            
            {getTabContent(activeTab).image && (
              <div className={`order-1 rounded-2xl bg-white shadow-lg ring-1 ring-gray-100 p-6 `}
                   style={{ animationDelay: '500ms' }}>
                <img 
                  src={`${getTabContent(activeTab).image[0].url?.startsWith('http') ? '' : base}${getTabContent(activeTab).image[0].url || getTabContent(activeTab).image}`} 
                  alt={getTabContent(activeTab).title || 'Use case image'} 
                  className="mx-auto rounded-lg max-w-full h-auto" 
                />
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  )
}


