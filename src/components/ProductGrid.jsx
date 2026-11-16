import ProductCard from './ProductCard.jsx'

function ProductGrid({ products, empty = null }) {
  if (products.length === 0) return empty
  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}

export default ProductGrid
