import { Link } from 'react-router-dom'
import cachedCollections from '../../data/shopify-collections.json'
import { HOME_COLLECTIONS } from '../../config/collections'
import './ShopByCollection.css'

function getCollectionImage(handle) {
  const collection = cachedCollections.collections?.find((c) => c.handle === handle)
  return collection?.image?.src || null
}

export default function ShopByCollection() {
  const collections = HOME_COLLECTIONS.map((collection) => ({
    ...collection,
    image: collection.image || getCollectionImage(collection.handle),
  }))

  return (
    <section className="shop-by-collection">
      <h2 className="shop-by-collection-title">Shop by Collection</h2>
      <div className="shop-by-collection-grid">
        {collections.map((collection) => (
          <Link
            key={collection.handle}
            to={`/collections/${collection.handle}`}
            className="shop-by-collection-item"
          >
            <div className="shop-by-collection-media">
              {collection.image ? (
                <img src={collection.image} alt={collection.label} loading="lazy" />
              ) : (
                <div className="shop-by-collection-placeholder" />
              )}
            </div>
            <span className="shop-by-collection-label">{collection.label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
