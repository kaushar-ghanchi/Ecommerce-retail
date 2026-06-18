import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductBadge from './ProductBadge'
import ProductPrice from './ProductPrice'
import ColorSwatches from './ColorSwatches'

export default function ProductCard({ product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || null)
  const displayImage = selectedColor?.image || product.image
  const productPath = `/products/${product.slug}`

  return (
    <article className="product-card">
      <Link to={productPath} className="product-card-media">
        <ProductBadge label={product.discountLabel} soldOut={!product.inStock} />
        {displayImage ? (
          <img src={displayImage} alt={product.name} className="product-card-image" loading="lazy" />
        ) : (
          <div className="product-card-placeholder" />
        )}
      </Link>

      {product.colors.length > 0 && (
        <ColorSwatches
          colors={product.colors}
          selectedId={selectedColor?.id}
          onSelect={setSelectedColor}
          compact
        />
      )}

      <div className="product-card-info">
        <Link to={productPath} className="product-card-title">
          {selectedColor ? `${selectedColor.name} ${product.name}` : product.name}
        </Link>
        <ProductPrice
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          currency={product.currency}
        />
      </div>
    </article>
  )
}
