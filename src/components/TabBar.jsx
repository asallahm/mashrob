import { NavLink } from 'react-router'
import { useStore } from '../context/StoreContext.jsx'
import { CalendarIcon, CartIcon, GlassIcon, HomeIcon, SparkleIcon } from './Icons.jsx'

// Bottom navigation for phones: the most-used destinations within thumb reach.
function TabBar() {
  const { cartCount } = useStore()
  const tabs = [
    { to: '/', label: 'الرئيسية', icon: HomeIcon, end: true },
    { to: '/menu', label: 'المشروبات', icon: GlassIcon },
    { to: '/preferences', label: 'اقتراحات', icon: SparkleIcon },
    { to: '/subscriptions', label: 'الاشتراكات', icon: CalendarIcon },
    { to: '/cart', label: 'السلة', icon: CartIcon, badge: cartCount },
  ]

  return (
    <nav className="tab-bar" aria-label="التنقل السريع">
      {tabs.map(({ to, label, icon: Icon, end, badge }) => (
        <NavLink key={to} to={to} end={end} className="tab">
          <span className="tab-icon">
            <Icon />
            {badge > 0 && (
              <span className="cart-badge" aria-hidden="true">
                {badge}
              </span>
            )}
          </span>
          <span className="tab-label">
            {label}
            {badge > 0 && <span className="visually-hidden"> ({badge})</span>}
          </span>
        </NavLink>
      ))}
    </nav>
  )
}

export default TabBar
