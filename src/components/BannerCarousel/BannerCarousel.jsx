import { useCallback, useEffect, useState } from 'react'
import { BANNER_SLIDES } from './bannerSlides'
import './BannerCarousel.css'

const AUTO_PLAY_MS = 5000

export default function BannerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const slideCount = BANNER_SLIDES.length

  const goToSlide = useCallback((index) => {
    setActiveIndex(index)
  }, [])

  const goToNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % slideCount)
  }, [slideCount])

  useEffect(() => {
    const timer = window.setInterval(goToNext, AUTO_PLAY_MS)
    return () => window.clearInterval(timer)
  }, [goToNext])

  return (
    <section className="banner-carousel" aria-label="Featured collections">
      <div className="banner-carousel-inner">
        <div className="banner-carousel-viewport">
          <div
            className="banner-track"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {BANNER_SLIDES.map((slide) => (
              <div key={slide.id} className="banner-slide">
                <a href={slide.href} className="banner-slide-link">
                  <img src={slide.image} alt={slide.alt} className="banner-slide-image" />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="banner-dots" role="tablist" aria-label="Banner slides">
          {BANNER_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              className={`banner-dot${index === activeIndex ? ' is-active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={index === activeIndex}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
