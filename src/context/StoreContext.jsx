import { createContext, useCallback, useContext, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { getProduct } from '../data/products.js'
import { defaultPreferences } from '../data/preferences.js'
import { createOrderNumber } from '../utils/format.js'

export const DELIVERY_FEE = 10
export const MAX_QTY = 20

const KEYS = {
  cart: 'sw.cart',
  preferences: 'sw.preferences',
  orders: 'sw.orders',
  subscription: 'sw.subscription',
}

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v)
const isCart = (v) => Array.isArray(v) && v.every((i) => isObject(i) && typeof i.id === 'string' && Number.isFinite(i.qty))
const isSubscription = (v) => v === null || (isObject(v) && typeof v.planId === 'string')

const clampQty = (n) => Math.max(0, Math.min(MAX_QTY, Math.round(n)))

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [cart, setCart] = useLocalStorage(KEYS.cart, [], isCart)
  const [storedPrefs, setStoredPrefs] = useLocalStorage(KEYS.preferences, defaultPreferences, isObject)
  const [orders, setOrders] = useLocalStorage(KEYS.orders, [], Array.isArray)
  const [subscription, setSubscription] = useLocalStorage(KEYS.subscription, null, isSubscription)

  // ---- cart ----
  const cartItems = useMemo(
    () =>
      cart
        .map((item) => ({ ...item, product: getProduct(item.id) }))
        .filter((item) => item.product && item.qty > 0),
    [cart],
  )
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0)
  const subtotal = cartItems.reduce((sum, i) => sum + i.qty * i.product.price, 0)
  const deliveryFee = cartItems.length ? DELIVERY_FEE : 0

  const addToCart = useCallback(
    (id, qty = 1) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.id === id)
        if (existing) return prev.map((i) => (i.id === id ? { ...i, qty: clampQty(i.qty + qty) } : i))
        return [...prev, { id, qty: clampQty(qty) }]
      })
    },
    [setCart],
  )

  const setQuantity = useCallback(
    (id, qty) => {
      const next = clampQty(qty)
      setCart((prev) => (next === 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty: next } : i))))
    },
    [setCart],
  )

  const removeFromCart = useCallback((id) => setCart((prev) => prev.filter((i) => i.id !== id)), [setCart])
  const clearCart = useCallback(() => setCart([]), [setCart])

  // ---- preferences ----
  const preferences = useMemo(() => ({ ...defaultPreferences, ...storedPrefs }), [storedPrefs])
  const setPreferences = useCallback((next) => setStoredPrefs({ ...defaultPreferences, ...next }), [setStoredPrefs])

  // ---- orders ----
  const placeOrder = useCallback(
    (customer) => {
      const order = {
        number: createOrderNumber(),
        createdAt: new Date().toISOString(),
        items: cartItems.map((i) => ({ id: i.id, name: i.product.name, price: i.product.price, qty: i.qty })),
        subtotal,
        deliveryFee,
        total: subtotal + deliveryFee,
        customer,
      }
      setOrders((prev) => [order, ...prev])
      setCart([])
      return order
    },
    [cartItems, subtotal, deliveryFee, setOrders, setCart],
  )

  // ---- subscription ----
  const chooseSubscription = useCallback(
    (planId, day) => setSubscription({ planId, day, chosenAt: new Date().toISOString() }),
    [setSubscription],
  )

  const value = {
    cartItems,
    cartCount,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    addToCart,
    setQuantity,
    removeFromCart,
    clearCart,
    preferences,
    setPreferences,
    orders,
    placeOrder,
    subscription,
    chooseSubscription,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>')
  return ctx
}
