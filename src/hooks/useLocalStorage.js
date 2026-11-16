import { useEffect, useState } from 'react'

// useState that persists to localStorage. Falls back to `initialValue` when
// storage is unavailable or holds data that fails `isValid`.
export function useLocalStorage(key, initialValue, isValid = () => true) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw == null) return initialValue
      const parsed = JSON.parse(raw)
      return isValid(parsed) ? parsed : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage full or blocked: the demo keeps working in memory.
    }
  }, [key, value])

  return [value, setValue]
}
