import { useEffect, useRef, useState } from 'react'
import { base } from "../service/serviceConfig";

export default function Logos({ items = [], title }) {
  const sliderRef = useRef(null)
  const [duplicatedItems, setDuplicatedItems] = useState([])

  if (!items.length) return null

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    // Calculate how many times we need to duplicate items
    const containerWidth = slider.parentElement.offsetWidth
    const itemWidth = 120 + 40 // minWidth + gap approximation
    const minItemsNeeded = Math.ceil(containerWidth / itemWidth) * 2
    let repeatTimes = Math.ceil(minItemsNeeded / items.length)

    const newItems = Array(repeatTimes).fill(items).flat()
    setDuplicatedItems(newItems)
  }, [items])

  useEffect(() => {
    if (!duplicatedItems.length) return
    const slider = sliderRef.current
    if (!slider) return

    let animationId
    let translateX = 0
    const scrollSpeed = 0.5 // pixels per frame

    const animate = () => {
      translateX += scrollSpeed
      slider.style.transform = `translateX(-${translateX}px)`

      const maxScroll = slider.scrollWidth / 2
      if (translateX >= maxScroll) {
        translateX = 0
        slider.style.transform = `translateX(0px)`
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationId)
  }, [duplicatedItems])

  return (
    <section>
       <div 
        className="
          mx-auto 
          relative
          overflow-hidden
          xl:[mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]
          xl:[mask-repeat:no-repeat]
          xl:[mask-size:100%_100%]"
        >
        {title && <h2 className="text-2xl font-medium text-center uppercase pb-6 text-gray-500">{title}</h2>}
        <div 
          ref={sliderRef}
          className="flex gap-8 items-center logo-slider"
          style={{ willChange: 'transform' }}
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
                    className="sm:h-10 h-7 sm:w-30 w-20 object-contain grayscale" 
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
