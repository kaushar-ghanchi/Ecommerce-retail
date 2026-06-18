export const SHOPIFY_STORE_URL =
  import.meta.env.VITE_SHOPIFY_STORE_URL || 'https://www.shopkabir.com'

export const SHOPIFY_API_BASE = import.meta.env.DEV
  ? '/api/shopify'
  : SHOPIFY_STORE_URL
