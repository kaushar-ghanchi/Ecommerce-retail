export function formatPrice(amount, currency = 'INR') {
  const value = Number(amount)
  if (Number.isNaN(value)) return ''

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(value)
}

export function getDiscountLabel(price, compareAtPrice) {
  const sale = Number(price)
  const compare = Number(compareAtPrice)

  if (!compare || compare <= sale) return null

  const percent = Math.round((1 - sale / compare) * 100)
  return `FLAT ${percent}% OFF`
}
