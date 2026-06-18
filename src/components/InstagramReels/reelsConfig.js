export const INSTAGRAM_HANDLE = 'kabircollection6'

export const INSTAGRAM_PROFILE_URL =
  import.meta.env.VITE_INSTAGRAM_PROFILE_URL ||
  `https://www.instagram.com/${INSTAGRAM_HANDLE}/`

/**
 * Optional: map Instagram media IDs to product details for shop links & prices.
 * Example:
 * '123456789': {
 *   title: 'Premium Cotton Straight Kurta Set',
 *   price: '₹1,500.00',
 *   productImage: '/path-to-product-thumb.jpg',
 *   productUrl: '/products/premium-cotton-kurta',
 * },
 */
export const REEL_PRODUCT_MAP = {}

export const FALLBACK_REELS = [
  {
    id: 'fallback-1',
    permalink: INSTAGRAM_PROFILE_URL,
    thumbnailUrl: null,
    title: 'Premium Cotton Straight Kurta Set',
    price: '₹1,500.00',
    productImage: null,
    productUrl: '#',
  },
  {
    id: 'fallback-2',
    permalink: INSTAGRAM_PROFILE_URL,
    thumbnailUrl: null,
    title: 'Pure Cotton A-Line Kurta Set',
    price: '₹1,400.00',
    productImage: null,
    productUrl: '#',
  },
  {
    id: 'fallback-3',
    permalink: INSTAGRAM_PROFILE_URL,
    thumbnailUrl: null,
    title: 'Embroidered Cord Set',
    price: '₹1,000.00',
    productImage: null,
    productUrl: '#',
  },
  {
    id: 'fallback-4',
    permalink: INSTAGRAM_PROFILE_URL,
    thumbnailUrl: null,
    title: 'Roman Silk Anarkali Suit Set',
    price: '₹2,350.00',
    productImage: null,
    productUrl: '#',
  },
]
