export default function ColorSwatches({ colors, selectedId, onSelect, compact = false }) {
  if (!colors?.length) return null

  return (
    <ul className={`color-swatches${compact ? ' color-swatches--compact' : ''}`} aria-label="Available colors">
      {colors.map((color) => (
        <li key={color.id}>
          <button
            type="button"
            className={`color-swatch${selectedId === color.id ? ' is-selected' : ''}${!color.inStock ? ' is-disabled' : ''}`}
            style={{ backgroundColor: color.hex }}
            aria-label={color.name}
            aria-pressed={selectedId === color.id}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onSelect?.(color)
            }}
          />
        </li>
      ))}
    </ul>
  )
}
