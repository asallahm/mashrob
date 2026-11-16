import { useState } from 'react'
import { useNavigate } from 'react-router'
import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { TextAreaField, TextField } from '../components/FormField.jsx'
import { CartIcon } from '../components/Icons.jsx'
import OrderSummary from '../components/OrderSummary.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { useStore } from '../context/StoreContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { toLatinDigits } from '../utils/format.js'

const FIELD_IDS = { name: 'checkout-name', phone: 'checkout-phone', address: 'checkout-address', notes: 'checkout-notes' }

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'يرجى كتابة الاسم (حرفان على الأقل).'

  const phone = toLatinDigits(values.phone).replace(/[\s-]/g, '')
  if (!phone) errors.phone = 'يرجى كتابة رقم الهاتف.'
  else if (!/^\+?\d{9,15}$/.test(phone)) errors.phone = 'رقم الهاتف غير صحيح. يُرجى كتابة الأرقام فقط، مثل 0599123456.'

  if (values.address.trim().length < 6) errors.address = 'يرجى كتابة عنوان التوصيل (المدينة، الحي، الشارع).'
  return errors
}

function CheckoutPage() {
  usePageTitle('إتمام الطلب')
  const { cartItems, subtotal, deliveryFee, total, placeOrder } = useStore()
  const showToast = useToast()
  const navigate = useNavigate()
  const [values, setValues] = useState({ name: '', phone: '', address: '', notes: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  if (cartItems.length === 0) {
    return (
      <div className="container page">
        <PageHeader title="إتمام الطلب" crumbs={[{ to: '/cart', label: 'السلة' }, { label: 'إتمام الطلب' }]} />
        <EmptyState
          icon={<CartIcon size={30} />}
          title="لا توجد مشروبات في السلة"
          actions={<Button to="/menu" variant="secondary">تصفح المشروبات</Button>}
        >
          يلزم إضافة مشروب واحد على الأقل قبل إتمام الطلب.
        </EmptyState>
      </div>
    )
  }

  function change(key) {
    return (e) => {
      const next = { ...values, [key]: e.target.value }
      setValues(next)
      if (submitted) setErrors(validate(next))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    const found = validate(values)
    setErrors(found)
    const firstInvalid = Object.keys(FIELD_IDS).find((k) => found[k])
    if (firstInvalid) {
      document.getElementById(FIELD_IDS[firstInvalid])?.focus()
      return
    }
    const order = placeOrder({
      name: values.name.trim(),
      phone: toLatinDigits(values.phone).trim(),
      address: values.address.trim(),
      notes: values.notes.trim(),
    })
    showToast('تم تأكيد الطلب')
    navigate(`/order/${order.number}`, { replace: true })
  }

  const errorCount = Object.keys(errors).length

  return (
    <div className="container page">
      <PageHeader title="إتمام الطلب" crumbs={[{ to: '/cart', label: 'السلة' }, { label: 'إتمام الطلب' }]} />

      <div className="checkout-layout">
        <form className="panel form" onSubmit={handleSubmit} noValidate aria-labelledby="delivery-title">
          <h2 id="delivery-title" className="panel-title">
            بيانات التوصيل
          </h2>

          {submitted && errorCount > 0 && (
            <p className="form-error-summary" role="alert">
              يرجى تصحيح الحقول المشار إليها أدناه.
            </p>
          )}

          <TextField
            id={FIELD_IDS.name}
            label="الاسم"
            required
            autoComplete="name"
            value={values.name}
            onChange={change('name')}
            error={errors.name}
          />
          <TextField
            id={FIELD_IDS.phone}
            label="رقم الهاتف"
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            ltr
            placeholder="0599123456"
            value={values.phone}
            onChange={change('phone')}
            error={errors.phone}
          />
          <TextAreaField
            id={FIELD_IDS.address}
            label="عنوان التوصيل"
            required
            rows={2}
            autoComplete="street-address"
            placeholder="المدينة، الحي، الشارع، رقم البناية"
            value={values.address}
            onChange={change('address')}
            error={errors.address}
          />
          <TextAreaField
            id={FIELD_IDS.notes}
            label="ملاحظات التوصيل"
            rows={2}
            placeholder="مثال: الطابق الثاني، الاتصال عند الوصول"
            value={values.notes}
            onChange={change('notes')}
          />

          <fieldset className="payment-box">
            <legend className="field-label">طريقة الدفع</legend>
            <p>الدفع عند الاستلام، دون الحاجة إلى بيانات بطاقة.</p>
          </fieldset>

          <Button type="submit" size="lg" block>
            تأكيد الطلب
          </Button>
        </form>

        <div className="checkout-aside">
          <OrderSummary
            items={cartItems.map((i) => ({ id: i.id, name: i.product.name, price: i.product.price, qty: i.qty }))}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
          >
            <Button to="/cart" variant="ghost" block>
              تعديل السلة
            </Button>
          </OrderSummary>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
