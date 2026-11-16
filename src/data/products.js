import { normalizeArabic } from '../utils/format.js'

// Photos are hot-linked from Unsplash. If one fails to load, the UI falls
// back to a tinted juice-glass illustration (see ProductImage).
const photo = (id) => `https://images.unsplash.com/${id}?w=800&q=70&auto=format&fit=crop`

export const CATEGORY_ALL = 'الكل'
export const categories = [CATEGORY_ALL, 'حمضيات', 'توت', 'خضار', 'سموذي']

/*
 * tags  → used by the suggestions page (flavours and drink style)
 * avoid → keys matched against "ingredients to avoid"
 * All prices and contents are sample data for a university demo.
 */
export const products = [
  {
    id: 'orange-carrot',
    name: 'برتقال وجزر',
    category: 'حمضيات',
    ingredients: ['برتقال', 'جزر', 'زنجبيل طازج'],
    description: 'حلو ومنعش، بنكهة برتقال واضحة ولمسة دافئة خفيفة من الزنجبيل.',
    price: 12,
    sizeMl: 350,
    image: photo('photo-1600271886742-f049cd451bba'),
    colors: { top: '#FBB062', bottom: '#F47B20' },
    noAddedSugar: true,
    allergens: [],
    tags: ['fruit', 'citrus', 'vegetables', 'refreshing'],
    avoid: ['ginger'],
  },
  {
    id: 'berry-mint',
    name: 'توت ونعناع',
    category: 'توت',
    ingredients: ['فراولة', 'توت أزرق', 'توت العليق', 'نعناع'],
    description: 'مزيج متوازن بين حلاوة التوت وحموضته الخفيفة مع انتعاش النعناع.',
    price: 14,
    sizeMl: 350,
    image: photo('photo-1553530666-ba11a7da3888'),
    colors: { top: '#E07A95', bottom: '#9B3D6E' },
    noAddedSugar: true,
    allergens: [],
    tags: ['fruit', 'berries', 'refreshing', 'mild'],
    avoid: [],
  },
  {
    id: 'apple-cucumber',
    name: 'تفاح وخيار',
    category: 'خضار',
    ingredients: ['تفاح أخضر', 'خيار', 'ليمون', 'نعناع'],
    description: 'خفيف ومنعش، بطعم تفاح حامض قليلًا وبرودة الخيار.',
    price: 11,
    sizeMl: 350,
    image: photo('photo-1556881286-fc6915169721'),
    colors: { top: '#D6E59A', bottom: '#8FB35A' },
    noAddedSugar: true,
    allergens: [],
    tags: ['fruit', 'vegetables', 'refreshing', 'mild'],
    avoid: [],
  },
  {
    id: 'beet-lemon',
    name: 'شمندر وليمون',
    category: 'خضار',
    ingredients: ['شمندر', 'ليمون', 'تفاح أحمر'],
    description: 'طعم ترابي لطيف تخففه حلاوة التفاح وحموضة الليمون.',
    price: 13,
    sizeMl: 350,
    image: null,
    colors: { top: '#C2416B', bottom: '#7A1F45' },
    noAddedSugar: true,
    allergens: [],
    tags: ['vegetables', 'citrus', 'fruit'],
    avoid: [],
  },
  {
    id: 'banana-date-milk',
    name: 'موز وتمر بالحليب',
    category: 'سموذي',
    ingredients: ['موز', 'تمر', 'حليب', 'قرفة'],
    description: 'كريمي وغني، حلاوته من الموز والتمر مع رائحة القرفة.',
    price: 16,
    sizeMl: 400,
    image: photo('photo-1505252585461-04db1eb84625'),
    colors: { top: '#F1DDB8', bottom: '#C79A62' },
    noAddedSugar: true,
    allergens: ['حليب'],
    tags: ['fruit', 'filling', 'creamy', 'mild'],
    avoid: ['dairy', 'banana'],
  },
  {
    id: 'strawberry-banana',
    name: 'فراولة وموز',
    category: 'سموذي',
    ingredients: ['فراولة', 'موز', 'لبن زبادي', 'عسل'],
    description: 'سموذي ناعم بنكهة الفراولة وقوام كريمي، محلّى بقليل من العسل.',
    price: 15,
    sizeMl: 400,
    image: photo('photo-1589733955941-5eeaf752f6dd'),
    colors: { top: '#F5A3B5', bottom: '#D9566F' },
    noAddedSugar: false,
    allergens: ['حليب'],
    tags: ['fruit', 'berries', 'filling', 'creamy', 'mild'],
    avoid: ['dairy', 'banana', 'honey'],
  },
  {
    id: 'pineapple-orange',
    name: 'أناناس وبرتقال',
    category: 'حمضيات',
    ingredients: ['أناناس', 'برتقال', 'ليمون أخضر'],
    description: 'طعم استوائي حلو مع حموضة برتقال واضحة.',
    price: 13,
    sizeMl: 350,
    image: photo('photo-1613478223719-2ab802602423'),
    colors: { top: '#FFD45C', bottom: '#F59E1B' },
    noAddedSugar: true,
    allergens: [],
    tags: ['fruit', 'citrus', 'refreshing', 'mild'],
    avoid: [],
  },
  {
    id: 'green-fresh',
    name: 'أخضر منعش',
    category: 'خضار',
    ingredients: ['سبانخ', 'خيار', 'تفاح أخضر', 'كرفس', 'ليمون'],
    description: 'نكهة خضراء واضحة ومنعشة مع حلاوة خفيفة من التفاح.',
    price: 14,
    sizeMl: 350,
    image: photo('photo-1610970881699-44a5587cabec'),
    colors: { top: '#9CCB6B', bottom: '#4E8A3A' },
    noAddedSugar: true,
    allergens: ['كرفس'],
    tags: ['vegetables', 'refreshing'],
    avoid: ['celery'],
  },
  {
    id: 'mango-almond',
    name: 'مانجو وحليب اللوز',
    category: 'سموذي',
    ingredients: ['مانجو', 'حليب اللوز', 'شوفان', 'تمر'],
    description: 'سموذي كريمي بنكهة مانجو ناضجة وقوام كثيف.',
    price: 17,
    sizeMl: 400,
    image: photo('photo-1623065422902-30a2d299bbe4'),
    colors: { top: '#FFE08A', bottom: '#F2B33D' },
    noAddedSugar: true,
    allergens: ['مكسرات (لوز)', 'شوفان (قد يحتوي على الغلوتين)'],
    tags: ['fruit', 'filling', 'creamy'],
    avoid: ['nuts', 'oats'],
  },
  {
    id: 'lemon-mint',
    name: 'ليمون ونعناع',
    category: 'حمضيات',
    ingredients: ['ليمون', 'نعناع', 'ماء', 'سكر قصب'],
    description: 'ليموناضة منعشة بحموضة واضحة وأوراق نعناع طازجة.',
    price: 9,
    sizeMl: 350,
    image: photo('photo-1621263764928-df1444c5e859'),
    colors: { top: '#F4F1B0', bottom: '#D7DB6A' },
    noAddedSugar: false,
    allergens: [],
    tags: ['citrus', 'refreshing'],
    avoid: [],
  },
]

export const featuredId = 'berry-mint'

export function getProduct(id) {
  return products.find((p) => p.id === id)
}

export const sortOptions = [
  { id: 'default', label: 'الترتيب الافتراضي' },
  { id: 'price-asc', label: 'السعر: من الأقل إلى الأعلى' },
  { id: 'price-desc', label: 'السعر: من الأعلى إلى الأقل' },
  { id: 'name', label: 'الاسم (أ – ي)' },
]

export function filterProducts(list, { query = '', category = CATEGORY_ALL } = {}) {
  const q = normalizeArabic(query)
  return list.filter((p) => {
    const inCategory = category === CATEGORY_ALL || p.category === category
    if (!inCategory) return false
    if (!q) return true
    return normalizeArabic([p.name, ...p.ingredients].join(' ')).includes(q)
  })
}

export function sortProducts(list, sort) {
  const copy = [...list]
  if (sort === 'price-asc') copy.sort((a, b) => a.price - b.price)
  else if (sort === 'price-desc') copy.sort((a, b) => b.price - a.price)
  else if (sort === 'name') copy.sort((a, b) => a.name.localeCompare(b.name, 'ar'))
  return copy
}

export function relatedProducts(product, limit = 3) {
  return products
    .filter((p) => p.id !== product.id)
    .map((p) => ({
      p,
      score: (p.category === product.category ? 2 : 0) + p.tags.filter((t) => product.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p)
}
