export default function ProductBadge({ label, soldOut }) {
  if (soldOut) {
    return <span className="product-badge product-badge--sold-out">Sold out</span>
  }

  if (!label) return null

  return <span className="product-badge">{label}</span>
}
