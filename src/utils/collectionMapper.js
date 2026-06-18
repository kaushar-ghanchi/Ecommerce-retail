export function mapShopifyCollection(shopifyCollection) {
  return {
    id: String(shopifyCollection.id),
    title: shopifyCollection.title,
    handle: shopifyCollection.handle,
    description: shopifyCollection.description || '',
    image: shopifyCollection.image?.src || null,
    productsCount: shopifyCollection.products_count ?? 0,
  }
}
