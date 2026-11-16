import { useState } from 'react'
import { useParams } from 'react-router'
import AddToCartButton from '../components/AddToCartButton.jsx'
import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { GlassIcon } from '../components/Icons.jsx'
import Notice from '../components/Notice.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ProductCard from '../components/ProductCard.jsx'
import ProductImage from '../components/ProductImage.jsx'
import QuantityStepper from '../components/QuantityStepper.jsx'
import { MAX_QTY } from '../context/StoreContext.jsx'
import { getProduct, relatedProducts } from '../data/products.js'
import { usePageTitle } from '../hooks/usePageTitle.js'
import { formatPrice } from '../utils/format.js'

function ProductPage() {
  const { id } = useParams()
  const product = getProduct(id)
  usePageTitle(product ? product.name : 'مشروب غير موجود')

  if (!product) {
    return (
      <div className="container page">
        <EmptyState
          icon={<GlassIcon size={28} />}
          title="لم نجد هذا المشروب"
          actions={<Button to="/menu" variant="secondary">العودة إلى القائمة</Button>}
        >
          ربما تغيّر الرابط أو أُزيل المشروب من القائمة.
        </EmptyState>
      </div>
    )
  }

  // key resets the quantity when moving between products
  return <ProductDetails key={product.id} product={product} />
}

function ProductDetails({ product }) {
  const [qty, setQty] = useState(1)
  const related = relatedProducts(product)

  return (
    <div className="container page">
      <PageHeader title="" crumbs={[{ to: '/menu', label: 'المشروبات' }, { label: product.name }]} />

      <article className="product-detail">
        <div className="product-detail-media">
          <ProductImage product={product} glassSize={180} eager />
        </div>

        <div className="product-detail-info">
          <div className="badges">
            <span className="badge badge-category">{product.category}</span>
            {product.noAddedSugar && <span className="badge badge-sugar">بدون سكر مضاف</span>}
          </div>
          <h1>{product.name}</h1>
          <p className="product-detail-desc">{product.description}</p>

          <dl className="detail-facts">
            <div>
              <dt>السعر</dt>
              <dd className="price price-lg">{formatPrice(product.price)}</dd>
            </div>
            <div>
              <dt>حجم الحصة</dt>
              <dd>{product.sizeMl} مل</dd>
            </div>
          </dl>

          <h2 className="detail-subtitle">المكونات</h2>
          <ul className="ingredient-list">
            {product.ingredients.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>

          {product.allergens.length > 0 && (
            <Notice tone="warning" title="تنبيه بشأن مسببات الحساسية">
              يحتوي هذا المشروب على: {product.allergens.join('، ')}.
            </Notice>
          )}
          <Notice tone="info">
            في حال وجود حساسية من أي مكوّن، يُرجى قراءة قائمة المكونات بعناية قبل الطلب.
          </Notice>

          <div className="buy-row">
            <QuantityStepper value={qty} onChange={setQty} max={MAX_QTY} itemName={product.name} />
            <AddToCartButton product={product} quantity={qty} size="lg" />
          </div>
          <p className="buy-total">
            الإجمالي لهذه الكمية: <strong>{formatPrice(product.price * qty)}</strong>
          </p>
        </div>
      </article>

      <section className="section" aria-labelledby="related-title">
        <div className="section-head">
          <h2 id="related-title">مشروبات مشابهة</h2>
        </div>
        <div className="product-grid">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default ProductPage
