import { useEffect, useState } from 'react'
import { fetchInstagramReels } from './instagramApi'
import { FALLBACK_REELS } from './reelsConfig'

export function useInstagramReels() {
  const [reels, setReels] = useState(FALLBACK_REELS)
  const [loading, setLoading] = useState(true)
  const [usingFallback, setUsingFallback] = useState(true)

  useEffect(() => {
    const accessToken = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN
    const userId = import.meta.env.VITE_INSTAGRAM_USER_ID

    if (!accessToken || !userId) {
      setLoading(false)
      return
    }

    let cancelled = false

    fetchInstagramReels(accessToken, userId, 4)
      .then((data) => {
        if (cancelled) return
        if (data.length > 0) {
          setReels(data)
          setUsingFallback(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setReels(FALLBACK_REELS)
          setUsingFallback(true)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { reels, loading, usingFallback }
}
