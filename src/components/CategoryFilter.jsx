import { categories } from '../data/products.js'

function CategoryFilter({ value, onChange }) {
  return (
    <div className="chips" role="group" aria-label="تصفية حسب التصنيف">
      {categories.map((c) => (
        <button
          key={c}
          type="button"
          className={`chip ${c === value ? 'is-active' : ''}`}
          aria-pressed={c === value}
          onClick={() => onChange(c)}
        >
          {c}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
