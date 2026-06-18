import { formatPrice } from '../../utils/formatPrice'

export default function ProductPrice({ price, compareAtPrice, currency = 'INR' }) {
  const hasDiscount = compareAtPrice && compareAtPrice > price

  return (
    <div className="product-price">
      <span className="product-price-sale">{formatPrice(price, currency)}</span>
      {hasDiscount && (
        <span className="product-price-compare">{formatPrice(compareAtPrice, currency)}</span>
      )}
    </div>
  )
}
