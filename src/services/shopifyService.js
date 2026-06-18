import { SHOPIFY_API_BASE, SHOPIFY_STORE_URL } from '../config/shopify'
import cachedCollections from '../data/shopify-collections.json'
import cachedData from '../data/shopify-products.json'
import { mapShopifyCollection } from '../utils/collectionMapper'
import { mapShopifyProduct } from '../utils/productMapper'

function mapCachedProducts() {
  return (cachedData.products || []).map((product) =>
    mapShopifyProduct(product, SHOPIFY_STORE_URL)
  )
}

function getCachedCollectionProducts(handle) {
  const collection = cachedCollections.collections?.find((c) => c.handle === handle)
  if (!collection?.productHandles?.length) return []

  const handleSet = new Set(collection.productHandles)
  return cachedData.products
    .filter((p) => handleSet.has(p.handle))
    .map((product) => mapShopifyProduct(product, SHOPIFY_STORE_URL))
}

async function fetchProductsPage(page = 1, limit = 250) {
  const url = `${SHOPIFY_API_BASE}/products.json?limit=${limit}&page=${page}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status}`)
  }

  const data = await response.json()
  return data.products || []
}

async function fetchCollectionProductsPage(handle, page = 1, limit = 250) {
  const url = `${SHOPIFY_API_BASE}/collections/${handle}/products.json?limit=${limit}&page=${page}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Shopify collection error: ${response.status}`)
  }

  const data = await response.json()
  return data.products || []
}

export async function fetchAllProducts() {
  try {
    const allProducts = []
    let page = 1
    const limit = 250

    while (true) {
      const products = await fetchProductsPage(page, limit)
      allProducts.push(...products)

      if (products.length < limit) break
      page += 1
    }

    return allProducts.map((product) => mapShopifyProduct(product, SHOPIFY_STORE_URL))
  } catch {
    return mapCachedProducts()
  }
}

export async function fetchProducts({ limit, collectionHandle } = {}) {
  if (collectionHandle) {
    const products = await fetchCollectionProducts(collectionHandle)
    if (limit) return products.slice(0, limit)
    return products
  }

  const products = await fetchAllProducts()

  if (limit) return products.slice(0, limit)
  return products
}

async function fetchCollectionProducts(collectionHandle) {
  try {
    const allProducts = []
    let page = 1
    const limit = 250

    while (true) {
      const products = await fetchCollectionProductsPage(collectionHandle, page, limit)
      allProducts.push(...products)

      if (products.length < limit) break
      page += 1
    }

    return allProducts.map((product) => mapShopifyProduct(product, SHOPIFY_STORE_URL))
  } catch {
    return getCachedCollectionProducts(collectionHandle)
  }
}

export async function fetchCollection(handle) {
  try {
    const metaUrl = `${SHOPIFY_API_BASE}/collections/${handle}.json`
    const metaResponse = await fetch(metaUrl)

    if (!metaResponse.ok) {
      throw new Error(`Collection not found: ${handle}`)
    }

    const metaData = await metaResponse.json()
    const collection = mapShopifyCollection(metaData.collection)
    const products = await fetchCollectionProducts(handle)

    return { collection, products }
  } catch {
    const cached = cachedCollections.collections?.find((c) => c.handle === handle)
    if (!cached) throw new Error(`Collection not found: ${handle}`)

    const collection = mapShopifyCollection(cached)
    const products = getCachedCollectionProducts(handle)

    return { collection, products }
  }
}

export async function fetchNewArrivals(limit = 8) {
  const products = await fetchAllProducts()
  return products
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, limit)
}

export async function fetchProductByHandle(handle) {
  try {
    const url = `${SHOPIFY_API_BASE}/products/${handle}.json`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Product not found: ${handle}`)
    }

    const data = await response.json()
    return mapShopifyProduct(data.product, SHOPIFY_STORE_URL)
  } catch {
    const product = cachedData.products?.find((p) => p.handle === handle)
    if (!product) throw new Error(`Product not found: ${handle}`)
    return mapShopifyProduct(product, SHOPIFY_STORE_URL)
  }
}
