import { flavorOptions, labelFor, styleOptions } from '../data/preferences.js'
import { normalizeArabic } from './format.js'

export function hasAnyPreference(prefs) {
  return Boolean(
    prefs.flavors.length ||
      prefs.styles.length ||
      prefs.likes.length ||
      prefs.avoid.length ||
      prefs.lessSugar ||
      prefs.ageGroup,
  )
}

/*
 * Simple tag matching, for exploring the demo menu only.
 * 1. Drop drinks containing an avoided ingredient (or added sugar, if chosen).
 * 2. Score the rest: flavour/style tag = 2, liked ingredient = 3,
 *    "mild" taste for the kids age group = 1.
 */
export function recommend(products, prefs, limit = 4) {
  const results = []

  for (const product of products) {
    if (prefs.avoid.some((key) => product.avoid.includes(key))) continue
    if (prefs.lessSugar && !product.noAddedSugar) continue

    let score = 0
    const reasons = []

    for (const f of prefs.flavors) {
      if (product.tags.includes(f)) {
        score += 2
        reasons.push(labelFor(flavorOptions, f))
      }
    }
    for (const s of prefs.styles) {
      if (product.tags.includes(s)) {
        score += 2
        reasons.push(labelFor(styleOptions, s))
      }
    }
    const ingredientText = normalizeArabic(product.ingredients.join(' '))
    for (const like of prefs.likes) {
      if (ingredientText.includes(normalizeArabic(like))) {
        score += 3
        reasons.push(`يحتوي على ${like}`)
      }
    }
    if (prefs.ageGroup === 'kids' && product.tags.includes('mild')) {
      score += 1
      reasons.push('نكهة لطيفة')
    }
    if (prefs.lessSugar) reasons.push('بدون سكر مضاف')

    results.push({ product, score, reasons })
  }

  results.sort((a, b) => b.score - a.score || a.product.price - b.product.price)
  const positive = results.filter((r) => r.score > 0)
  // Only filters chosen (e.g. ingredients to avoid)? Show the drinks that pass them.
  return (positive.length ? positive : results).slice(0, limit)
}
