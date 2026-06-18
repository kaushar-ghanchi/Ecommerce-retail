import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductBadge from '../components/Product/ProductBadge'
import ProductPrice from '../components/Product/ProductPrice'
import ColorSwatches from '../components/Product/ColorSwatches'
import { useProduct } from '../hooks/useProduct'
import { SHOPIFY_STORE_URL } from '../config/shopify'
import {
  findMatchingVariant,
  getAvailableValues,
  getInitialSelections,
  isOptionValueAvailable,
} from '../utils/variantUtils'
import '../components/Product/Product.css'
import './ProductPage.css'

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

function OptionButtons({ label, optionName, values, selections, product, onSelect }) {
  if (!values.length) return null

  return (
    <div className="product-option">
      <div className="product-option-header">
        <span className="product-option-label">{label}</span>
        {optionName === 'Size' && (
          <button type="button" className="product-size-guide">Size guide</button>
        )}
      </div>
      <div className="product-option-buttons">
        {values.map((value) => {
          const isSelected = selections[optionName] === value
          const isAvailable = isOptionValueAvailable(product, optionName, value, selections)

          return (
            <button
              key={value}
              type="button"
              className={`product-option-btn${isSelected ? ' is-selected' : ''}${!isAvailable ? ' is-disabled' : ''}`}
              onClick={() => onSelect(optionName, value)}
              disabled={!isAvailable}
            >
              {value}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function ProductPage() {
  const { slug } = useParams()
  const { product, loading, error } = useProduct(slug)
  const [selections, setSelections] = useState({})
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState('')

  useEffect(() => {
    if (!product) return
    setSelections(getInitialSelections(product))
    setQuantity(1)
    setActiveImage(product.image)
  }, [product])

  const selectedVariant = useMemo(
    () => (product ? findMatchingVariant(product, selections) : null),
    [product, selections],
  )

  const displayImage = useMemo(() => {
    if (!product) return ''
    if (selectedVariant?.image) return selectedVariant.image
    const colorName = selections.Color
    if (colorName) {
      const color = product.colors.find((c) => c.name === colorName)
      if (color?.image) return color.image
    }
    return activeImage || product.image
  }, [product, selectedVariant, selections, activeImage])

  const colorOption = product?.options.find((o) => o.name === 'Color')
  const colorValues = colorOption ? getAvailableValues(product, 'Color', selections) : []
  const colorSwatches = colorValues.map((name) => ({
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    hex: COLOR_HEX[name] || '#cccccc',
    image: product.colors.find((c) => c.name === name)?.image,
    inStock: isOptionValueAvailable(product, 'Color', name, selections),
  }))

  const selectedColorId = selections.Color
    ? selections.Color.toLowerCase().replace(/\s+/g, '-')
    : null

  function handleOptionSelect(optionName, value) {
    setSelections((prev) => ({ ...prev, [optionName]: value }))
  }

  function handleColorSelect(color) {
    setSelections((prev) => ({ ...prev, Color: color.name }))
    if (color.image) setActiveImage(color.image)
  }

  if (loading) {
    return (
      <div className="product-page">
        <div className="product-page-inner product-page--loading">
          <div className="product-page-gallery-skeleton" />
          <div className="product-page-details-skeleton" />
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="product-page">
        <div className="product-page-error">
          <p>Product not found.</p>
          <Link to="/">Back to home</Link>
        </div>
      </div>
    )
  }

  const price = selectedVariant?.price ?? product.price
  const compareAtPrice = selectedVariant?.compareAtPrice ?? product.compareAtPrice
  const inStock = selectedVariant?.available ?? product.inStock
  const addToCartUrl = selectedVariant
    ? `${SHOPIFY_STORE_URL}/cart/${selectedVariant.id}:${quantity}`
    : product.url

  return (
    <div className="product-page">
      <div className="product-page-inner">
        <div className="product-page-gallery">
          <div className="product-page-main-image">
            <ProductBadge label={product.discountLabel} soldOut={!inStock} />
            <img src={displayImage} alt={product.name} />
          </div>
          {product.images.length > 1 && (
            <div className="product-page-thumbnails">
              {product.images.map((src) => (
                <button
                  key={src}
                  type="button"
                  className={`product-page-thumb${displayImage === src ? ' is-active' : ''}`}
                  onClick={() => setActiveImage(src)}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-page-details">
          {product.vendor && (
            <p className="product-page-vendor">{product.vendor}</p>
          )}
          <h1 className="product-page-title">{product.name}</h1>

          <div className="product-page-price-row">
            <ProductPrice price={price} compareAtPrice={compareAtPrice} currency={product.currency} />
            {compareAtPrice && compareAtPrice > price && (
              <span className="product-page-sale-tag">Sale</span>
            )}
          </div>
          <p className="product-page-tax-note">Inclusive of All Taxes</p>

          {product.options
            .filter((option) => option.name !== 'Color')
            .map((option) => (
              <OptionButtons
                key={option.name}
                label={option.name}
                optionName={option.name}
                values={getAvailableValues(product, option.name, selections)}
                selections={selections}
                product={product}
                onSelect={handleOptionSelect}
              />
            ))}

          {colorSwatches.length > 0 && (
            <div className="product-option">
              <span className="product-option-label">
                Color: {selections.Color || ''}
              </span>
              <ColorSwatches
                colors={colorSwatches}
                selectedId={selectedColorId}
                onSelect={handleColorSelect}
              />
            </div>
          )}

          <div className="product-option">
            <span className="product-option-label">Quantity</span>
            <div className="product-quantity">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                aria-label="Quantity"
              />
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <a
            href={addToCartUrl}
            className={`product-page-add-btn${!inStock ? ' is-disabled' : ''}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {inStock ? 'Add to bag' : 'Sold out'}
          </a>

          {product.description && (
            <div
              className="product-page-description"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
