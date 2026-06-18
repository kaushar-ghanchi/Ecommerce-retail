import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const STORE_URL = process.env.VITE_SHOPIFY_STORE_URL || 'https://www.shopkabir.com'
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../src/data')
const PRODUCTS_OUTPUT = join(ROOT, 'shopify-products.json')
const COLLECTIONS_OUTPUT = join(ROOT, 'shopify-collections.json')

async function fetchAllProducts() {
  const all = []
  let page = 1

  while (true) {
    const url = `${STORE_URL}/products.json?limit=250&page=${page}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`)
    const data = await res.json()
    const products = data.products || []
    all.push(...products)
    if (products.length < 250) break
    page += 1
  }

  return all
}

async function fetchAllCollections() {
  const res = await fetch(`${STORE_URL}/collections.json`)
  if (!res.ok) throw new Error(`Failed to fetch collections: ${res.status}`)
  const data = await res.json()
  return data.collections || []
}

async function fetchCollectionProductHandles(handle) {
  const handles = []
  let page = 1

  while (true) {
    const url = `${STORE_URL}/collections/${handle}/products.json?limit=250&page=${page}`
    const res = await fetch(url)
    if (!res.ok) break
    const data = await res.json()
    const products = data.products || []
    handles.push(...products.map((p) => p.handle))
    if (products.length < 250) break
    page += 1
  }

  return handles
}

mkdirSync(ROOT, { recursive: true })

const products = await fetchAllProducts()
writeFileSync(
  PRODUCTS_OUTPUT,
  JSON.stringify({ syncedAt: new Date().toISOString(), products }, null, 2),
)
console.log(`Synced ${products.length} products to src/data/shopify-products.json`)

const shopifyCollections = await fetchAllCollections()
const collections = []

for (const collection of shopifyCollections) {
  const productHandles = await fetchCollectionProductHandles(collection.handle)
  collections.push({
    ...collection,
    productHandles,
  })
  console.log(`  ${collection.handle}: ${productHandles.length} products`)
}

writeFileSync(
  COLLECTIONS_OUTPUT,
  JSON.stringify({ syncedAt: new Date().toISOString(), collections }, null, 2),
)
console.log(`Synced ${collections.length} collections to src/data/shopify-collections.json`)
