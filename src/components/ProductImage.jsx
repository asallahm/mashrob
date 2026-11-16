import { useState } from 'react'
import JuiceGlass from './JuiceGlass.jsx'

// Product photo with a graceful fallback to a tinted illustration.
function ProductImage({ product, glassSize = 96, className = '', eager = false }) {
  const [failed, setFailed] = useState(false)
  const showPhoto = product.image && !failed

  return (
    <div
      className={`product-image ${showPhoto ? 'has-photo' : 'is-illustration'} ${className}`}
      style={{ '--tint': product.colors.top }}
    >
      {showPhoto ? (
        <img
          src={product.image}
          alt={`صورة توضيحية لمشروب ${product.name}`}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <>
          <JuiceGlass top={product.colors.top} bottom={product.colors.bottom} size={glassSize} />
          <span className="visually-hidden">رسم توضيحي لمشروب {product.name}</span>
        </>
      )}
    </div>
  )
}

export default ProductImage
