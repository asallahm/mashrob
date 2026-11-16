import { Link } from 'react-router'
import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { CartIcon, TrashIcon } from '../components/Icons.jsx'
import OrderSummary from '../components/OrderSummary.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ProductImage from '../components/ProductImage.jsx'
import QuantityStepper from '../components/QuantityStepper.jsx'
import { MAX_QTY, useStore } from '../context/StoreContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { formatPrice, itemsCount } from '../utils/format.js'

function CartPage() {
  usePageTitle('السلة')
  const { cartItems, cartCount, subtotal, deliveryFee, total, setQuantity, removeFromCart } = useStore()
  const showToast = useToast()

  if (cartItems.length === 0) {
    return (
      <div className="container page">
        <PageHeader title="سلة المشتريات" crumbs={[{ label: 'السلة' }]} />
        <EmptyState
          icon={<CartIcon size={30} />}
          title="سلتك فارغة"
          actions={<Button to="/menu" variant="secondary">تصفح المشروبات</Button>}
        >
          تظهر هنا المشروبات بعد إضافتها من القائمة.
        </EmptyState>
      </div>
    )
  }

  function remove(item) {
    removeFromCart(item.id)
    showToast(`أُزيل ${item.product.name} من السلة`, 'info')
  }

  return (
    <div className="container page">
      <PageHeader title="سلة المشتريات" intro={`في سلتك ${itemsCount(cartCount)}.`} crumbs={[{ label: 'السلة' }]} />

      <div className="cart-layout">
        <ul className="cart-list">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <Link to={`/drinks/${item.id}`} className="cart-item-media" tabIndex={-1} aria-hidden="true">
                <ProductImage product={item.product} glassSize={52} />
              </Link>
              <div className="cart-item-info">
                <h3>
                  <Link to={`/drinks/${item.id}`}>{item.product.name}</Link>
                </h3>
                <p className="muted">سعر الوحدة: {formatPrice(item.product.price)}</p>
              </div>
              <div className="cart-item-controls">
                <QuantityStepper
                  value={item.qty}
                  onChange={(q) => setQuantity(item.id, q)}
                  max={MAX_QTY}
                  itemName={item.product.name}
                />
                <button type="button" className="remove-btn" onClick={() => remove(item)} aria-label={`إزالة ${item.product.name} من السلة`}>
                  <TrashIcon />
                  <span>إزالة</span>
                </button>
              </div>
              <p className="cart-item-total">{formatPrice(item.qty * item.product.price)}</p>
            </li>
          ))}
        </ul>

        <div className="cart-aside">
          <OrderSummary
            items={cartItems.map((i) => ({ id: i.id, name: i.product.name, price: i.product.price, qty: i.qty }))}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
            showItems={false}
          >
            <Button to="/checkout" block size="lg">
              متابعة إلى إتمام الطلب
            </Button>
            <Button to="/menu" variant="ghost" block>
              متابعة التسوق
            </Button>
          </OrderSummary>
        </div>
      </div>
    </div>
  )
}

export default CartPage
