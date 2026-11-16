export function formatPrice(amount) {
  return `${amount} ₪`
}

// Arabic counting for "drink": 1 مشروب واحد، 2 مشروبان، 3–10 مشروبات، 11+ مشروبًا
export function drinksCount(n) {
  if (n === 0) return 'لا توجد مشروبات'
  if (n === 1) return 'مشروب واحد'
  if (n === 2) return 'مشروبان'
  if (n <= 10) return `${n} مشروبات`
  return `${n} مشروبًا`
}

export function itemsCount(n) {
  if (n === 0) return 'لا توجد عناصر'
  if (n === 1) return 'عنصر واحد'
  if (n === 2) return 'عنصران'
  if (n <= 10) return `${n} عناصر`
  return `${n} عنصرًا`
}

// Loose Arabic matching: ignore diacritics, tatweel and common letter variants.
export function normalizeArabic(text = '') {
  return String(text)
    .toLowerCase()
    .replace(/[ً-ٰٟـ]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/\s+/g, ' ')
    .trim()
}

// Convert Arabic-Indic digits to Latin digits (for phone validation).
export function toLatinDigits(text = '') {
  return String(text).replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
}

const dateFormatter = new Intl.DateTimeFormat('ar-u-nu-latn', {
  dateStyle: 'long',
  timeStyle: 'short',
})

export function formatDate(iso) {
  try {
    return dateFormatter.format(new Date(iso))
  } catch {
    return iso
  }
}

export function createOrderNumber(date = new Date()) {
  const pad = (n) => String(n).padStart(2, '0')
  const stamp = `${String(date.getFullYear()).slice(2)}${pad(date.getMonth() + 1)}${pad(date.getDate())}`
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `SW-${stamp}-${rand}`
}
