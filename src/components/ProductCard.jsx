import { Link } from 'react-router'
import { formatPrice } from '../utils/format.js'
import AddToCartButton from './AddToCartButton.jsx'
import ProductImage from './ProductImage.jsx'

function ProductCard({ product, note }) {
  const url = `/drinks/${product.id}`

  return (
    <article className="product-card">
      <div className="product-card-media">
        <Link to={url} tabIndex={-1} aria-hidden="true">
          <ProductImage product={product} glassSize={84} />
        </Link>
      </div>

      <div className="product-card-body">
        <div className="badges">
          <span className="badge badge-category">{product.category}</span>
          {product.noAddedSugar && <span className="badge badge-sugar">بدون سكر مضاف</span>}
        </div>

        <h3 className="product-card-title">
          <Link to={url}>{product.name}</Link>
        </h3>
        <p className="product-card-ingredients">{product.ingredients.join('، ')}</p>

        {product.allergens.length > 0 && (
          <p className="product-card-allergen">يحتوي على: {product.allergens.join('، ')}</p>
        )}
        {note && <p className="product-card-note">{note}</p>}

        <div className="product-card-footer">
          <span className="price">{formatPrice(product.price)}</span>
          <AddToCartButton product={product} size="sm" />
        </div>
      </div>
    </article>
  )
}

export default ProductCard
