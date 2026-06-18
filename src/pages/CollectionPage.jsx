import { useParams, Link } from 'react-router-dom'
import ProductGrid from '../components/Product/ProductGrid'
import { useCollection } from '../hooks/useCollection'
import '../components/Product/Product.css'
import './CollectionPage.css'

export default function CollectionPage() {
  const { handle } = useParams()
  const { collection, products, loading, error } = useCollection(handle)

  if (error) {
    return (
      <div className="collection-page">
        <div className="collection-page-error">
          <p>Collection not found.</p>
          <Link to="/">Back to home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="collection-page">
      {collection?.image && (
        <div className="collection-page-hero">
          <img src={collection.image} alt={collection.title} />
        </div>
      )}

      <section className="product-section collection-page-content">
        <h1 className="product-section-title">{collection?.title || 'Collection'}</h1>
        {collection && (
          <p className="collection-page-count">
            {collection.productsCount} products
          </p>
        )}
        {collection?.description && (
          <div
            className="collection-page-description"
            dangerouslySetInnerHTML={{ __html: collection.description }}
          />
        )}
        <ProductGrid products={products} loading={loading} />
      </section>
    </div>
  )
}
