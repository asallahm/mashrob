import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router'
import { useStore } from '../context/StoreContext.jsx'
import { accountLinks, mainLinks } from '../data/navigation.js'
import { CartIcon, CloseIcon, LeafIcon, MenuIcon, SearchIcon } from './Icons.jsx'

function Header() {
  const { cartCount } = useStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return
    function onKey(e) {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  function openSearch() {
    // The menu page focuses its search box when it sees this state.
    navigate('/menu', { state: { focusSearch: Date.now() } })
  }

  const cartLabel = cartCount === 0 ? 'السلة فارغة' : `السلة: ${cartCount}`

  return (
    <header className="site-header">
      <div className="header-bar container">
        <Link className="brand" to="/" aria-label="Smart Wellness — الصفحة الرئيسية">
          <span className="brand-mark">
            <LeafIcon />
          </span>
          <span className="brand-name" dir="ltr">
            Smart Wellness
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="التنقل الرئيسي">
          <ul>
            {mainLinks.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className="nav-link">
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <button type="button" className="icon-btn" onClick={openSearch} aria-label="بحث عن مشروب">
            <SearchIcon />
          </button>
          <NavLink to="/cart" className="icon-btn cart-btn" aria-label={cartLabel}>
            <CartIcon />
            {cartCount > 0 && (
              <span className="cart-badge" aria-hidden="true">
                {cartCount}
              </span>
            )}
          </NavLink>
          <button
            ref={menuButtonRef}
            type="button"
            className="icon-btn menu-btn"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <nav id="mobile-menu" className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-label="القائمة" hidden={!menuOpen}>
        <ul className="container">
          {[...mainLinks, ...accountLinks].map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.end} className="mobile-menu-link">
                {l.label}
                {l.to === '/cart' && cartCount > 0 && <span className="pill-count">{cartCount}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
