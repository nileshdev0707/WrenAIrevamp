import { useEffect, useRef } from 'react'
import { base } from "../../service/serviceConfig";

export default function TrustedLogos({ items, title }) {
  const sliderRef = useRef(null)
  
  if (!items || items.length === 0) return null

  // Duplicate items for seamless infinite scroll
  const duplicatedItems = [...items, ...items]    

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    let animationId
    let isPaused = false
    let scrollPosition = 0
    const scrollSpeed = 0.5 // pixels per frame
    const itemWidth = 200 // approximate width of each logo item

    const animate = () => {
      if (!isPaused) {
        scrollPosition += scrollSpeed
        // Reset position when we've scrolled through one complete set of items
        if (scrollPosition >= items.length * itemWidth) {
          scrollPosition = 0
        }
        slider.scrollLeft = scrollPosition
      }
      animationId = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [items.length])

  return (
    <section className="py-20 px-3">
      <div className="mx-auto">
        <h2 className="text-2xl font-medium text-center uppercase pb-6 text-gray-500">{title}</h2>
        <div 
          ref={sliderRef}
          className="flex overflow-hidden gap-8 items-center logo-slider"
        >
          {duplicatedItems.map((item, idx) => {
            const url = item.image?.url
            return (
              <div 
                key={`${item.name}-${idx}`} 
                className="flex-shrink-0 flex items-center justify-center p-5 opacity-80 hover:opacity-100 transition-opacity"
              >
               {url ? (
                  <img 
                    src={`${url?.startsWith('http') ? '' : base}${url}`} 
                    alt={item.name} 
                    className="h-10 w-30 object-contain grayscale" 
                  />
                ) : (
                  <div className="text-gray-600">{item.name}</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}