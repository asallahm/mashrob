import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import AddToCartButton from '../components/AddToCartButton.jsx'
import Button from '../components/Button.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { ArrowForwardIcon, CalendarIcon, SearchIcon } from '../components/Icons.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import ProductImage from '../components/ProductImage.jsx'
import SearchField from '../components/SearchField.jsx'
import { lowestPlanPrice } from '../data/plans.js'
import { CATEGORY_ALL, featuredId, filterProducts, getProduct, products } from '../data/products.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { formatPrice } from '../utils/format.js'

const HOME_LIMIT = 6

function HomePage() {
  usePageTitle('الرئيسية')
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(CATEGORY_ALL)
  const featured = getProduct(featuredId)

  const filtered = useMemo(() => filterProducts(products, { query, category }), [query, category])
  const shown = filtered.slice(0, HOME_LIMIT)

  const menuLink = (() => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (category !== CATEGORY_ALL) params.set('category', category)
    const s = params.toString()
    return s ? `/menu?${s}` : '/menu'
  })()

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero container">
        <div className="hero-intro">
          <p className="greeting">مرحبًا بك</p>
          <h1>عصائر طبيعية حسب ذوقك</h1>
          <p className="lead">
            عصائر وسموذي طبيعية مع مكونات واضحة لكل مشروب، لاختيار ما يناسب الذوق والتفضيلات.
          </p>
          <SearchField
            value={query}
            onChange={setQuery}
            onSubmit={() => navigate(menuLink)}
            className="hero-search"
          />
          <div className="hero-actions">
            <Button to="/menu" variant="secondary">
              تصفح المشروبات
            </Button>
            <Button to="/preferences" variant="outline">
              اقتراحات حسب الذوق
            </Button>
          </div>
        </div>

        <article className="featured-card" aria-labelledby="featured-title">
          <div className="featured-media">
            <ProductImage product={featured} glassSize={140} eager />
            <span className="featured-tag">اختيار اليوم</span>
          </div>
          <div className="featured-body">
            <h2 id="featured-title">
              <Link to={`/drinks/${featured.id}`}>{featured.name}</Link>
            </h2>
            <p className="featured-desc">{featured.description}</p>
            <p className="featured-ingredients">{featured.ingredients.join('، ')}</p>
            <div className="featured-footer">
              <span className="price price-lg">{formatPrice(featured.price)}</span>
              <div className="featured-buttons">
                <Button to={`/drinks/${featured.id}`} variant="ghost" size="sm">
                  التفاصيل
                </Button>
                <AddToCartButton product={featured} />
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* ---------- Products ---------- */}
      <section className="section container" aria-labelledby="home-drinks-title">
        <div className="section-head">
          <h2 id="home-drinks-title">مشروباتنا</h2>
          <Link to={menuLink} className="text-link">
            عرض القائمة كاملة <ArrowForwardIcon />
          </Link>
        </div>
        <CategoryFilter value={category} onChange={setCategory} />
        <ProductGrid
          products={shown}
          empty={
            <EmptyState
              icon={<SearchIcon size={28} />}
              title="لا توجد مشروبات مطابقة"
              actions={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setQuery('')
                    setCategory(CATEGORY_ALL)
                  }}
                >
                  عرض كل المشروبات
                </Button>
              }
            >
              يمكن تجربة كلمة أخرى، مثل «برتقال» أو «نعناع»، أو اختيار تصنيف آخر.
            </EmptyState>
          }
        />
        {filtered.length > HOME_LIMIT && (
          <div className="section-more">
            <Button to={menuLink} variant="outline">
              عرض كل النتائج ({filtered.length})
            </Button>
          </div>
        )}
      </section>

      {/* ---------- Subscriptions ---------- */}
      <section className="section container">
        <article className="promo-card">
          <span className="promo-icon">
            <CalendarIcon />
          </span>
          <h2>اشتراكات أسبوعية وشهرية</h2>
          <p>
            اختيار عدد المشروبات ويوم التوصيل المناسب، مع إمكانية تغيير المشروبات قبل كل توصيل. تبدأ الخطط من{' '}
            <strong>{formatPrice(lowestPlanPrice)}</strong> أسبوعيًا.
          </p>
          <Button to="/subscriptions" variant="secondary">
            عرض خطط الاشتراك
          </Button>
        </article>
      </section>
    </>
  )
}

export default HomePage
