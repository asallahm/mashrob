import { useEffect, useMemo, useRef } from 'react'
import { useLocation, useSearchParams } from 'react-router'
import Button from '../components/Button.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { SearchIcon } from '../components/Icons.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import SearchField from '../components/SearchField.jsx'
import { CATEGORY_ALL, categories, filterProducts, products, sortOptions, sortProducts } from '../data/products.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { drinksCount } from '../utils/format.js'

function MenuPage() {
  usePageTitle('قائمة المشروبات')
  const [params, setParams] = useSearchParams()
  const location = useLocation()
  const searchRef = useRef(null)

  const query = params.get('q') ?? ''
  const rawCategory = params.get('category')
  const category = categories.includes(rawCategory) ? rawCategory : CATEGORY_ALL
  const rawSort = params.get('sort')
  const sort = sortOptions.some((o) => o.id === rawSort) ? rawSort : 'default'

  // Header search button sends { focusSearch } in navigation state.
  useEffect(() => {
    if (location.state?.focusSearch) searchRef.current?.focus()
  }, [location.state])

  function update(key, value, fallback) {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (!value || value === fallback) next.delete(key)
        else next.set(key, value)
        return next
      },
      { replace: true },
    )
  }

  const visible = useMemo(() => sortProducts(filterProducts(products, { query, category }), sort), [query, category, sort])
  const filtersActive = query || category !== CATEGORY_ALL

  return (
    <div className="container page">
      <PageHeader
        title="قائمة المشروبات"
        intro="البحث بالاسم أو بأحد المكونات، مع إمكانية اختيار التصنيف والترتيب."
        crumbs={[{ label: 'المشروبات' }]}
      />

      <div className="menu-toolbar">
        <SearchField
          ref={searchRef}
          value={query}
          onChange={(v) => update('q', v, '')}
          label="البحث عن عصير بالاسم أو المكوّن"
        />
        <div className="sort-field">
          <label htmlFor="menu-sort">الترتيب</label>
          <select id="menu-sort" className="input select" value={sort} onChange={(e) => update('sort', e.target.value, 'default')}>
            {sortOptions.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <CategoryFilter value={category} onChange={(c) => update('category', c, CATEGORY_ALL)} />

      <p className="results-count" aria-live="polite">
        {visible.length > 0 ? `${drinksCount(visible.length)} في القائمة` : ''}
      </p>

      <ProductGrid
        products={visible}
        empty={
          <EmptyState
            icon={<SearchIcon size={28} />}
            title={query ? `لا توجد نتائج لـ «${query}»` : 'لا توجد مشروبات في هذا التصنيف'}
            actions={
              filtersActive && (
                <Button variant="outline" size="sm" onClick={() => setParams({}, { replace: true })}>
                  مسح البحث والتصفية
                </Button>
              )
            }
          >
            يمكن البحث باسم فاكهة مثل «فراولة» أو «مانجو»، أو اختيار «الكل».
          </EmptyState>
        }
      />
    </div>
  )
}

export default MenuPage
