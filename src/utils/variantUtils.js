export function getVariantOptionValue(variant, index) {
  if (index === 0) return variant.option1
  if (index === 1) return variant.option2
  if (index === 2) return variant.option3
  return null
}

export function getInitialSelections(product) {
  const variant = product.variants.find((v) => v.available) || product.variants[0]
  if (!variant) return {}

  const selections = {}
  product.options.forEach((option, index) => {
    selections[option.name] = getVariantOptionValue(variant, index)
  })
  return selections
}

export function findMatchingVariant(product, selections) {
  return product.variants.find((variant) =>
    product.options.every((option, index) => {
      const selected = selections[option.name]
      if (!selected) return true
      return getVariantOptionValue(variant, index) === selected
    }),
  )
}

export function getAvailableValues(product, optionName, selections) {
  const optionIndex = product.options.findIndex((o) => o.name === optionName)
  if (optionIndex < 0) return []

  const values = new Set()
  product.variants.forEach((variant) => {
    const matchesOtherOptions = product.options.every((option, index) => {
      if (index === optionIndex) return true
      const selected = selections[option.name]
      if (!selected) return true
      return getVariantOptionValue(variant, index) === selected
    })

    if (matchesOtherOptions) {
      const value = getVariantOptionValue(variant, optionIndex)
      if (value) values.add(value)
    }
  })

  return Array.from(values)
}

export function isOptionValueAvailable(product, optionName, value, selections) {
  return product.variants.some((variant) => {
    const optionIndex = product.options.findIndex((o) => o.name === optionName)
    if (getVariantOptionValue(variant, optionIndex) !== value) return false

    return product.options.every((option, index) => {
      const selected = selections[option.name]
      if (!selected) return true
      return getVariantOptionValue(variant, index) === selected
    }) && variant.available
  })
}
