import { useNewArrivals } from '../../hooks/useProducts'
import ProductGrid from './ProductGrid'
import './Product.css'

export default function NewArrival() {
  const { products, loading, error } = useNewArrivals(8)

  return (
    <section className="product-section">
      <h2 className="product-section-title">NEW ARRIVAL</h2>
      {error && <p className="product-section-error">Could not load products. Please try again later.</p>}
      <ProductGrid products={products} loading={loading} />
    </section>
  )
}
