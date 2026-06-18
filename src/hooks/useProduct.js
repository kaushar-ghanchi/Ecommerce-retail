import { useEffect, useState } from 'react'
import { fetchProductByHandle } from '../services/shopifyService'

export function useProduct(slug) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return

    let cancelled = false
    setLoading(true)
    setError(null)

    fetchProductByHandle(slug)
      .then((data) => {
        if (!cancelled) setProduct(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  return { product, loading, error }
}
