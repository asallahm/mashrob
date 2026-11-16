import { useState } from 'react'
import { useNavigate } from 'react-router'
import { CalendarIcon, CheckIcon, GlassIcon, TruckIcon } from '../components/Icons.jsx'
import Notice from '../components/Notice.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { useStore } from '../context/StoreContext.jsx'
import { plans } from '../data/plans.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { drinksCount, formatPrice } from '../utils/format.js'

const periods = [
  { id: 'weekly', label: 'خطط أسبوعية' },
  { id: 'monthly', label: 'خطط شهرية' },
]

const steps = [
  { icon: CalendarIcon, title: 'اختيار الخطة', text: 'أسبوعية أو شهرية، حسب عدد المشروبات المناسب.' },
  { icon: GlassIcon, title: 'اختيار المشروبات', text: 'من القائمة أو من الاقتراحات حسب التفضيلات.' },
  { icon: TruckIcon, title: 'تحديد يوم التوصيل', text: 'يوم ثابت في الأسبوع يمكن تغييره لاحقًا.' },
]

function SubscriptionsPage() {
  usePageTitle('الاشتراكات')
  const { subscription } = useStore()
  const navigate = useNavigate()
  const current = plans.find((p) => p.id === subscription?.planId)
  const [period, setPeriod] = useState(current?.period ?? 'weekly')
  const visiblePlans = plans.filter((p) => p.period === period)

  return (
    <div className="container page">
      <PageHeader
        title="خطط الاشتراك"
        intro="اشتراكات لتلقّي المشروبات المفضّلة بشكل دوري."
        crumbs={[{ label: 'الاشتراكات' }]}
      />

      {current && (
        <Notice tone="info" title="الخطة الحالية">
          «{current.name}» مع التوصيل يوم {subscription.day}. يمكن تغييرها باختيار خطة أخرى.
        </Notice>
      )}

      <div className="segmented" role="group" aria-label="مدة الخطة">
        {periods.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`segment ${period === p.id ? 'is-active' : ''}`}
            aria-pressed={period === p.id}
            onClick={() => setPeriod(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="plans-grid">
        {visiblePlans.map((plan) => {
          const isCurrent = current?.id === plan.id
          return (
            <article key={plan.id} className={`plan-card ${plan.highlight ? 'is-highlight' : ''} ${isCurrent ? 'is-current' : ''}`}>
              {plan.highlight && <span className="plan-flag">خيار مقترح</span>}
              {isCurrent && <span className="plan-flag plan-flag-current">الخطة الحالية</span>}
              <h2>{plan.name}</h2>
              <p className="plan-price">
                <span className="price price-xl">{formatPrice(plan.price)}</span>
                <span className="muted"> {plan.priceUnit}</span>
              </p>
              <dl className="plan-facts">
                <div>
                  <dt>عدد المشروبات</dt>
                  <dd>{drinksCount(plan.drinks)}</dd>
                </div>
                <div>
                  <dt>التوصيل</dt>
                  <dd>{plan.frequency}</dd>
                </div>
              </dl>
              <h3 className="plan-includes-title">تشمل الخطة</h3>
              <ul className="check-list">
                {plan.includes.map((item) => (
                  <li key={item}>
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`btn btn-block btn-md ${plan.highlight ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => navigate(`/subscriptions/confirm?plan=${plan.id}`)}
              >
                {isCurrent ? 'تعديل يوم التوصيل' : 'اختيار هذه الخطة'}
              </button>
            </article>
          )
        })}
      </div>

      <section className="section" aria-labelledby="how-subs">
        <h2 id="how-subs" className="section-title">
          كيف يعمل الاشتراك؟
        </h2>
        <ol className="steps">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="step">
              <span className="step-num">{i + 1}</span>
              <Icon />
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}

export default SubscriptionsPage
