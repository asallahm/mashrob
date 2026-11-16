import { useEffect, useState } from 'react'
import { useStore } from '../context/StoreContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { CheckIcon, PlusIcon } from './Icons.jsx'

function AddToCartButton({ product, quantity = 1, size = 'md', block = false, compact = false }) {
  const { addToCart } = useStore()
  const showToast = useToast()
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!added) return
    const t = setTimeout(() => setAdded(false), 1400)
    return () => clearTimeout(t)
  }, [added])

  function handleClick() {
    addToCart(product.id, quantity)
    setAdded(true)
    showToast(quantity > 1 ? `أُضيف ${quantity} × ${product.name} إلى السلة` : `أُضيف ${product.name} إلى السلة`)
  }

  const label = added ? 'تمت الإضافة' : compact ? 'إضافة' : 'إضافة للسلة'

  return (
    <button
      type="button"
      className={`btn btn-primary btn-${size} ${block ? 'btn-block' : ''} ${added ? 'is-added' : ''}`}
      onClick={handleClick}
      aria-label={`إضافة ${product.name} للسلة`}
    >
      {added ? <CheckIcon /> : <PlusIcon />}
      <span>{label}</span>
    </button>
  )
}

export default AddToCartButton
