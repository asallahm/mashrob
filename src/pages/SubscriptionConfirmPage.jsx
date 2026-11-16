import { useState } from 'react'
import { Navigate, useSearchParams } from 'react-router'
import Button from '../components/Button.jsx'
import { ChoiceGroup } from '../components/FormField.jsx'
import { CheckIcon } from '../components/Icons.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { useStore } from '../context/StoreContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { deliveryDays, getPlan } from '../data/plans.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { drinksCount, formatPrice } from '../utils/format.js'

function SubscriptionConfirmPage() {
  usePageTitle('تأكيد الخطة')
  const [params] = useSearchParams()
  const plan = getPlan(params.get('plan'))
  const { subscription, chooseSubscription } = useStore()
  const showToast = useToast()
  const [day, setDay] = useState(subscription?.planId === plan?.id ? subscription.day : '')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  if (!plan) return <Navigate to="/subscriptions" replace />

  function confirm(e) {
    e.preventDefault()
    if (!day) {
      setError('يرجى اختيار يوم التوصيل.')
      return
    }
    chooseSubscription(plan.id, day)
    setDone(true)
    showToast(`تم حفظ الخطة: ${plan.name}`)
  }

  if (done) {
    return (
      <div className="container page narrow">
        <div className="confirm-hero">
          <span className="confirm-icon">
            <CheckIcon size={34} />
          </span>
          <h1>تم حفظ اختيار الخطة</h1>
          <p className="page-intro">
            «{plan.name}» بسعر {formatPrice(plan.price)} {plan.priceUnit}، مع التوصيل يوم {day}.
          </p>
        </div>
        <div className="button-row center">
          <Button to="/subscriptions" variant="secondary">
            العودة إلى الخطط
          </Button>
          <Button to="/menu" variant="outline">
            تصفح المشروبات
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container page narrow">
      <PageHeader
        title="تأكيد الخطة"
        crumbs={[{ to: '/subscriptions', label: 'الاشتراكات' }, { label: 'تأكيد الخطة' }]}
      />

      <form className="panel form" onSubmit={confirm} noValidate>
        <div className="plan-summary">
          <h2>{plan.name}</h2>
          <p className="price price-lg">
            {formatPrice(plan.price)} <span className="muted">{plan.priceUnit}</span>
          </p>
          <p>
            {drinksCount(plan.drinks)} — {plan.frequency}
          </p>
        </div>

        <ChoiceGroup
          legend="يوم التوصيل المفضّل"
          name="delivery-day"
          options={deliveryDays.map((d) => ({ id: d, label: d }))}
          value={day}
          onChange={(d) => {
            setDay(d)
            setError('')
          }}
          multiple={false}
          error={error}
        />

        <div className="button-row">
          <Button type="submit" size="lg">
            تأكيد الاختيار
          </Button>
          <Button to="/subscriptions" variant="ghost">
            العودة إلى الخطط
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SubscriptionConfirmPage
