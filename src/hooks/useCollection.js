import { useEffect, useState } from 'react'
import { fetchCollection } from '../services/shopifyService'

export function useCollection(handle) {
  const [collection, setCollection] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!handle) return

    let cancelled = false
    setLoading(true)
    setError(null)

    fetchCollection(handle)
      .then((data) => {
        if (!cancelled) {
          setCollection(data.collection)
          setProducts(data.products)
        }
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
  }, [handle])

  return { collection, products, loading, error }
}
