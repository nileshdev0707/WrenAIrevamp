import { useEffect, useRef } from 'react'
import { base } from "../service/serviceConfig";

export default function TrustedLogo({ items, title }) {
  const sliderRef = useRef(null)
  
  if (!items || items.length === 0) return;

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
    <section>
      <div 
        className="
          mx-auto 
          relative
          overflow-hidden
          2xl:[mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]
          2xl:[mask-repeat:no-repeat]
          2xl:[mask-size:100%_100%]"
        >
        {title && (
          <h2 className="text-xl sm:text-2xl font-medium text-center uppercase pb-6 text-gray-500">{title}</h2>
        )}
        <div 
          ref={sliderRef}
          className="flex overflow-hidden gap-8 items-center logo-slider"
        >
          {duplicatedItems.map((it, idx) => {
            const url = it.image?.url
            return (
              <div 
                key={`${it.name}-${idx}`} 
                className="flex-shrink-0 flex items-center justify-center px-5 opacity-80 transition-opacity"
                style={{ minWidth: '120px' }} 
              >
                {url ? (
                  <img 
                    src={`${url.startsWith('http') ? '' : base}${url}`} 
                    alt={it.name} 
                    className="h-10 w-30 object-contain grayscale" 
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