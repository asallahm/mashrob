import { Route, Routes } from 'react-router'
import Layout from './components/Layout.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import HomePage from './pages/HomePage.jsx'
import MenuPage from './pages/MenuPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import OrderConfirmationPage from './pages/OrderConfirmationPage.jsx'
import PreferencesPage from './pages/PreferencesPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import SubscriptionConfirmPage from './pages/SubscriptionConfirmPage.jsx'
import SubscriptionsPage from './pages/SubscriptionsPage.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="drinks/:id" element={<ProductPage />} />
        <Route path="preferences" element={<PreferencesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="order/:orderNumber" element={<OrderConfirmationPage />} />
        <Route path="subscriptions" element={<SubscriptionsPage />} />
        <Route path="subscriptions/confirm" element={<SubscriptionConfirmPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
