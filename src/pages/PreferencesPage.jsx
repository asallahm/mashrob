import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { SparkleIcon } from '../components/Icons.jsx'
import Notice from '../components/Notice.jsx'
import PageHeader from '../components/PageHeader.jsx'
import PreferencesForm from '../components/PreferencesForm.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { useStore } from '../context/StoreContext.jsx'
import { products } from '../data/products.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { hasAnyPreference, recommend } from '../utils/recommend.js'

function PreferencesPage() {
  usePageTitle('اقتراحات حسب الذوق')
  const { preferences, setPreferences } = useStore()
  const active = hasAnyPreference(preferences)
  const suggestions = active ? recommend(products, preferences) : []

  return (
    <div className="container page">
      <PageHeader
        title="اختيار التفضيلات"
        intro="تساعد النكهات والمكونات المختارة على اقتراح مشروبات من القائمة تتوافق معها."
        crumbs={[{ label: 'اقتراحات حسب الذوق' }]}
      />

      <div className="prefs-layout">
        <section className="panel" aria-labelledby="prefs-title">
          <h2 id="prefs-title" className="panel-title">
            التفضيلات
          </h2>
          <p className="panel-sub">جميع الاختيارات اختيارية، وتُحفظ تلقائيًا على هذا الجهاز.</p>
          <PreferencesForm value={preferences} onChange={setPreferences} idPrefix="prefs-page" />
        </section>

        <section className="suggestions" aria-labelledby="suggestions-title" aria-live="polite">
          <h2 id="suggestions-title" className="panel-title">
            اقتراحات حسب الذوق
          </h2>

          {!active && (
            <EmptyState icon={<SparkleIcon size={28} />} title="لا توجد تفضيلات محددة بعد">
              اختيار نكهة أو مكوّن واحد على الأقل يُظهر الاقتراحات هنا.
            </EmptyState>
          )}

          {active && suggestions.length === 0 && (
            <EmptyState
              icon={<SparkleIcon size={28} />}
              title="لا يوجد مشروب يطابق كل الاختيارات"
              actions={<Button to="/menu" variant="outline" size="sm">تصفح القائمة كاملة</Button>}
            >
              يمكن إزالة أحد المكونات المستبعدة أو خيار «بدون سكر مضاف».
            </EmptyState>
          )}

          {suggestions.length > 0 && (
            <div className="suggestion-list">
              {suggestions.map(({ product, reasons }) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  note={reasons.length ? `سبب الاقتراح: ${[...new Set(reasons)].join('، ')}` : 'لا يحتوي على المكونات المستبعدة'}
                />
              ))}
            </div>
          )}

          <Notice tone="info" className="suggest-note">
            الاقتراحات مبنية على الذوق والمكونات فقط، وليست نصيحة طبية أو غذائية.
          </Notice>
        </section>
      </div>
    </div>
  )
}

export default PreferencesPage
