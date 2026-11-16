import { formatPrice } from '../utils/format.js'

// items: [{ id, name, price, qty }]
function OrderSummary({ title = 'ملخص الطلب', items, subtotal, deliveryFee, total, showItems = true, children }) {
  return (
    <section className="summary-card" aria-label={title}>
      <h2 className="panel-title">{title}</h2>
      {showItems && (
        <ul className="summary-items">
          {items.map((i) => (
            <li key={i.id}>
              <span>
                {i.name} <span className="muted">× {i.qty}</span>
              </span>
              <span>{formatPrice(i.price * i.qty)}</span>
            </li>
          ))}
        </ul>
      )}
      <dl className="summary-totals">
        <div>
          <dt>المجموع الفرعي</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div>
          <dt>رسوم التوصيل</dt>
          <dd>{formatPrice(deliveryFee)}</dd>
        </div>
        <div className="summary-total">
          <dt>الإجمالي</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>
      {children}
    </section>
  )
}

export default OrderSummary
