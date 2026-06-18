import { getDiscountLabel } from './formatPrice'

const COLOR_HEX = {
  Black: '#1a1a1a',
  White: '#f5f5f5',
  Red: '#c41e3a',
  'Maroon Red': '#7a1f2b',
  Wine: '#722f37',
  Blue: '#1e3a5f',
  'Nile Blue': '#2c5f7c',
  'Sky Blue': '#87ceeb',
  Green: '#2d5a27',
  'Bottle Green': '#1b3d2f',
  'Pista Green': '#8fbc8f',
  Yellow: '#d4a017',
  'Mustard Yellow': '#d4a017',
  Rust: '#b7410e',
  Beige: '#d4c4a8',
  Purple: '#5d3a6b',
  'Dark Purple': '#4a2350',
  'Dusky Purple': '#6b5b7b',
  Pink: '#e8a0b0',
  'Light Pink': '#f4c2c2',
  'Onion Pink': '#e8b4b8',
  Grey: '#6b6b6b',
  'Slate Grey': '#708090',
  Teal: '#008080',
  Coffee: '#6f4e37',
  'Coffee Brown': '#6f4e37',
}

function getOptionIndex(product, name) {
  return product.options?.findIndex((option) => option.name === name) ?? -1
}

function getVariantOptionValue(variant, optionIndex) {
  if (optionIndex === 0) return variant.option1
  if (optionIndex === 1) return variant.option2
  if (optionIndex === 2) return variant.option3
  return null
}

function buildColors(product, colorIndex) {
  if (colorIndex < 0) return []

  const colorMap = new Map()

  product.variants.forEach((variant) => {
    const name = getVariantOptionValue(variant, colorIndex)
    if (!name || colorMap.has(name)) return

    const image =
      variant.featured_image?.src ||
      product.images.find((img) => variant.featured_image?.id === img.id)?.src ||
      product.images[0]?.src

    colorMap.set(name, {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      hex: COLOR_HEX[name] || '#cccccc',
      image,
      inStock: variant.available,
    })
  })

  return Array.from(colorMap.values())
}

function buildSizes(product, sizeIndex) {
  if (sizeIndex < 0) return []

  const sizes = new Set()
  product.variants.forEach((variant) => {
    const size = getVariantOptionValue(variant, sizeIndex)
    if (size) sizes.add(size)
  })

  return Array.from(sizes)
}

function mapVariants(shopifyProduct) {
  return shopifyProduct.variants.map((variant) => ({
    id: String(variant.id),
    title: variant.title,
    option1: variant.option1,
    option2: variant.option2,
    option3: variant.option3,
    price: Number(variant.price),
    compareAtPrice: variant.compare_at_price ? Number(variant.compare_at_price) : null,
    available: variant.available,
    image: variant.featured_image?.src || null,
    sku: variant.sku || '',
  }))
}

function mapOptions(shopifyProduct) {
  return (shopifyProduct.options || []).map((option) => ({
    name: option.name,
    values: option.values,
  }))
}

export function mapShopifyProduct(shopifyProduct, storeUrl) {
  const sizeIndex = getOptionIndex(shopifyProduct, 'Size')
  const colorIndex = getOptionIndex(shopifyProduct, 'Color')
  const firstVariant = shopifyProduct.variants[0]
  const price = firstVariant?.price ?? '0'
  const compareAtPrice = firstVariant?.compare_at_price
  const colors = buildColors(shopifyProduct, colorIndex)
  const images = shopifyProduct.images?.map((img) => img.src) || []
  const inStock = shopifyProduct.variants.some((v) => v.available)

  return {
    id: String(shopifyProduct.id),
    slug: shopifyProduct.handle,
    name: shopifyProduct.title,
    description: shopifyProduct.body_html,
    images,
    image: images[0] || colors[0]?.image || '',
    price: Number(price),
    compareAtPrice: compareAtPrice ? Number(compareAtPrice) : null,
    currency: 'INR',
    discountLabel: getDiscountLabel(price, compareAtPrice),
    colors,
    sizes: buildSizes(shopifyProduct, sizeIndex),
    options: mapOptions(shopifyProduct),
    variants: mapVariants(shopifyProduct),
    tags: shopifyProduct.tags || [],
    productType: shopifyProduct.product_type || '',
    vendor: shopifyProduct.vendor || '',
    inStock,
    publishedAt: shopifyProduct.published_at,
    url: `${storeUrl}/products/${shopifyProduct.handle}`,
  }
}
