import { useEffect, useRef } from 'react'
import { base } from "../service/serviceConfig";
export default function Logos({ items }) {
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

    // Pause on hover
    const handleMouseEnter = () => { isPaused = true }
    const handleMouseLeave = () => { isPaused = false }

    slider.addEventListener('mouseenter', handleMouseEnter)
    slider.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      slider.removeEventListener('mouseenter', handleMouseEnter)
      slider.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [items.length])

  return (
    <section>
      <div className="mx-auto">
        {/* <div className="text-center text-xs uppercase tracking-wider text-gray-500">Trusted by leading teams</div> */}
        <div 
          ref={sliderRef}
          className="flex overflow-hidden gap-8 items-center logo-slider"
        >
          {duplicatedItems.map((it, idx) => {
            const url = it.image?.url
            return (
              <div 
                key={`${it.name}-${idx}`} 
                className="flex-shrink-0 flex items-center justify-center p-3 opacity-80 hover:opacity-100 transition-opacity"
                style={{ minWidth: '200px' }}
              >
                {url ? (
                  <img 
                    src={`${url.startsWith('http') ? '' : base}${url}`} 
                    alt={it.name} 
                    className="max-h-12 object-contain" 
                  />
                ) : (
                  <div className="text-gray-600">{it.name}</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}