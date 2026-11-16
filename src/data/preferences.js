// Options for the taste-preferences form. Kept deliberately general:
// no body measurements, conditions or nutrition targets.

export const flavorOptions = [
  { id: 'fruit', label: 'فواكه' },
  { id: 'citrus', label: 'حمضيات' },
  { id: 'berries', label: 'توت' },
  { id: 'vegetables', label: 'خضار' },
]

export const styleOptions = [
  { id: 'refreshing', label: 'منعش وخفيف' },
  { id: 'filling', label: 'مُشبِع' },
  { id: 'creamy', label: 'قوام كريمي' },
]

// Matched against product ingredient names.
export const likeOptions = [
  { id: 'برتقال', label: 'برتقال' },
  { id: 'فراولة', label: 'فراولة' },
  { id: 'توت', label: 'توت' },
  { id: 'موز', label: 'موز' },
  { id: 'تفاح', label: 'تفاح' },
  { id: 'مانجو', label: 'مانجو' },
  { id: 'تمر', label: 'تمر' },
  { id: 'نعناع', label: 'نعناع' },
  { id: 'خيار', label: 'خيار' },
  { id: 'أناناس', label: 'أناناس' },
]

// Matched against each product's `avoid` keys.
export const avoidOptions = [
  { id: 'dairy', label: 'الحليب ومشتقاته' },
  { id: 'nuts', label: 'المكسرات' },
  { id: 'oats', label: 'الشوفان' },
  { id: 'banana', label: 'الموز' },
  { id: 'ginger', label: 'الزنجبيل' },
  { id: 'celery', label: 'الكرفس' },
  { id: 'honey', label: 'العسل' },
]

export const ageGroupOptions = [
  { id: '', label: 'أفضّل عدم التحديد' },
  { id: 'kids', label: 'أطفال (أقل من 13)' },
  { id: 'teens', label: 'يافعون (13–17)' },
  { id: 'adults', label: 'بالغون (18–59)' },
  { id: 'seniors', label: '60 فأكثر' },
]

export const defaultPreferences = {
  flavors: [],
  styles: [],
  likes: [],
  avoid: [],
  lessSugar: false,
  ageGroup: '',
}

export function labelFor(options, id) {
  return options.find((o) => o.id === id)?.label ?? id
}
