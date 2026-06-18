import ProductCard from './ProductCard'

export default function ProductGrid({ products, loading }) {
  if (loading) {
    return (
      <div className="product-grid">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="product-card product-card--skeleton">
            <div className="product-card-placeholder" />
            <div className="product-skeleton-line" />
            <div className="product-skeleton-line product-skeleton-line--short" />
          </div>
        ))}
      </div>
    )
  }

  if (!products.length) {
    return <p className="product-grid-empty">No products found.</p>
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
