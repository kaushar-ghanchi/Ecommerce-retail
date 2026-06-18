import { useRef } from 'react'
import { INSTAGRAM_PROFILE_URL } from './reelsConfig'
import { useInstagramReels } from './useInstagramReels'
import './InstagramReels.css'

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ReelCard({ reel }) {
  return (
    <article className="reel-card">
      <a
        href={reel.permalink}
        target="_blank"
        rel="noopener noreferrer"
        className="reel-card-media-link"
        aria-label={`Watch reel: ${reel.title}`}
      >
        <div className="reel-card-media">
          {reel.thumbnailUrl ? (
            <img src={reel.thumbnailUrl} alt="" className="reel-card-image" />
          ) : (
            <div className="reel-card-placeholder" aria-hidden="true" />
          )}
          {reel.productImage && (
            <img src={reel.productImage} alt="" className="reel-card-product-thumb" />
          )}
        </div>
      </a>
      <div className="reel-card-info">
        <a href={reel.productUrl} className="reel-card-title">{reel.title}</a>
        {reel.price && <p className="reel-card-price">{reel.price}</p>}
      </div>
    </article>
  )
}

function ReelCardSkeleton() {
  return (
    <article className="reel-card reel-card--loading">
      <div className="reel-card-media reel-card-placeholder" />
      <div className="reel-card-info">
        <div className="reel-skeleton-line reel-skeleton-line--title" />
        <div className="reel-skeleton-line reel-skeleton-line--price" />
      </div>
    </article>
  )
}

export default function InstagramReels() {
  const { reels, loading } = useInstagramReels()
  const trackRef = useRef(null)

  const scrollNext = () => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('.reel-card')
    const gap = 16
    const scrollAmount = card ? card.offsetWidth + gap : 280
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  return (
    <section className="watch-shop" aria-label="Watch and shop Instagram reels">
      <div className="watch-shop-inner">
        <a
          href={INSTAGRAM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="watch-shop-view-all"
        >
          View all
        </a>

        <h2 className="watch-shop-title">WATCH AND SHOP</h2>

        <div className="watch-shop-carousel">
          <div className="watch-shop-track" ref={trackRef}>
            {loading
              ? Array.from({ length: 4 }, (_, index) => <ReelCardSkeleton key={index} />)
              : reels.map((reel) => <ReelCard key={reel.id} reel={reel} />)}
          </div>

          <button
            type="button"
            className="watch-shop-nav"
            aria-label="Scroll reels right"
            onClick={scrollNext}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </section>
  )
}
