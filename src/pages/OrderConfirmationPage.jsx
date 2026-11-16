import { useParams } from 'react-router'
import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { CheckIcon, ReceiptIcon } from '../components/Icons.jsx'
import OrderSummary from '../components/OrderSummary.jsx'
import { useStore } from '../context/StoreContext.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { formatDate } from '../utils/format.js'

function OrderConfirmationPage() {
  usePageTitle('تأكيد الطلب')
  const { orderNumber } = useParams()
  const { orders } = useStore()
  const order = orders.find((o) => o.number === orderNumber)

  if (!order) {
    return (
      <div className="container page">
        <EmptyState
          icon={<ReceiptIcon size={28} />}
          title="لم يتم العثور على هذا الطلب"
          actions={<Button to="/menu" variant="secondary">تصفح المشروبات</Button>}
        >
          الطلبات محفوظة على هذا الجهاز فقط، وربما تم مسحها.
        </EmptyState>
      </div>
    )
  }

  return (
    <div className="container page narrow">
      <div className="confirm-hero">
        <span className="confirm-icon">
          <CheckIcon size={34} />
        </span>
        <h1>تم استلام الطلب</h1>
        <p className="page-intro">شكرًا، {order.customer.name}!</p>
        <p className="order-number">
          رقم الطلب: <strong dir="ltr">{order.number}</strong>
        </p>
        <p className="muted">{formatDate(order.createdAt)}</p>
      </div>

      <div className="confirm-grid">
        <OrderSummary items={order.items} subtotal={order.subtotal} deliveryFee={order.deliveryFee} total={order.total} />

        <section className="summary-card" aria-labelledby="delivery-info">
          <h2 id="delivery-info" className="panel-title">
            بيانات التوصيل
          </h2>
          <dl className="info-list">
            <div>
              <dt>الاسم</dt>
              <dd>{order.customer.name}</dd>
            </div>
            <div>
              <dt>الهاتف</dt>
              <dd dir="ltr">{order.customer.phone}</dd>
            </div>
            <div>
              <dt>العنوان</dt>
              <dd>{order.customer.address}</dd>
            </div>
            {order.customer.notes && (
              <div>
                <dt>ملاحظات</dt>
                <dd>{order.customer.notes}</dd>
              </div>
            )}
            <div>
              <dt>الدفع</dt>
              <dd>عند الاستلام</dd>
            </div>
          </dl>
        </section>
      </div>

      <div className="button-row center">
        <Button to="/" variant="secondary">
          العودة إلى الرئيسية
        </Button>
        <Button to="/menu" variant="outline">
          تصفح المشروبات
        </Button>
      </div>
    </div>
  )
}

export default OrderConfirmationPage
