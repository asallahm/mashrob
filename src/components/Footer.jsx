import { Link } from 'react-router'
import { accountLinks, mainLinks } from '../data/navigation.js'
import { LeafIcon } from './Icons.jsx'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand" to="/">
            <span className="brand-mark">
              <LeafIcon />
            </span>
            <span className="brand-name" dir="ltr">
              Smart Wellness
            </span>
          </Link>
          <p className="footer-text">
            منصة لاستكشاف العصائر والسموذي الطبيعية واختيارها حسب الذوق والتفضيلات.
          </p>
        </div>

        <nav aria-label="روابط الموقع">
          <ul className="footer-links">
            {[...mainLinks, ...accountLinks].map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="container footer-note">نموذج تجريبي · صور المشروبات من Unsplash</p>
    </footer>
  )
}

export default Footer
