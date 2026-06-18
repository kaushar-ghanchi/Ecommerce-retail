import { REEL_PRODUCT_MAP } from './reelsConfig'

const MEDIA_FIELDS =
  'id,caption,media_type,media_url,thumbnail_url,permalink,media_product_type,timestamp'

function truncateCaption(caption, maxLength = 42) {
  if (!caption) return 'View on Instagram'
  const line = caption.split('\n')[0].trim()
  if (line.length <= maxLength) return line
  return `${line.slice(0, maxLength).trim()}...`
}

function formatReel(item) {
  const mapped = REEL_PRODUCT_MAP[item.id]

  return {
    id: item.id,
    permalink: item.permalink,
    thumbnailUrl: item.thumbnail_url || item.media_url,
    title: mapped?.title || truncateCaption(item.caption),
    price: mapped?.price || null,
    productImage: mapped?.productImage || item.thumbnail_url || item.media_url,
    productUrl: mapped?.productUrl || item.permalink,
  }
}

function isReel(item) {
  return item.media_product_type === 'REELS' || item.media_type === 'VIDEO'
}

export async function fetchInstagramReels(accessToken, userId, limit = 4) {
  const url = new URL(`https://graph.instagram.com/${userId}/media`)
  url.searchParams.set('fields', MEDIA_FIELDS)
  url.searchParams.set('limit', '25')
  url.searchParams.set('access_token', accessToken)

  const response = await fetch(url.toString())

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}))
    throw new Error(errorBody?.error?.message || 'Failed to load Instagram reels')
  }

  const payload = await response.json()
  const items = payload.data || []

  return items.filter(isReel).slice(0, limit).map(formatReel)
}
