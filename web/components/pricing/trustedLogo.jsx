import { useEffect, useRef } from 'react'
import { base } from "../../service/serviceConfig";

export default function TrustedLogos({ items, title }) {
  const sliderRef = useRef(null)
  
  if (!items || items.length === 0) return null

  // Duplicate items for seamless infinite scroll
  const duplicatedItems = [...items, ...items]    

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider || !items.length) return

    let animationId
    let isPaused = false
    let scrollPosition = 0
    const scrollSpeed = 0.5 // pixels per frame

    const animate = () => {
      if (!isPaused && slider) {
        scrollPosition += scrollSpeed
        
        // Get the actual scroll width and reset when we've scrolled through one complete set
        const maxScroll = slider.scrollWidth / 2 // Since we duplicate items, half is one complete set
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0
        }
        slider.scrollLeft = scrollPosition
      }
      animationId = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
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