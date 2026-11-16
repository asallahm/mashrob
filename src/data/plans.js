// Sample subscription plans (mock data; nothing is charged).
export const plans = [
  {
    id: 'weekly-light',
    period: 'weekly',
    name: 'الأسبوعية الخفيفة',
    price: 39,
    priceUnit: 'أسبوعيًا',
    drinks: 3,
    frequency: 'توصيل مرة واحدة في الأسبوع',
    includes: [
      '3 مشروبات كل أسبوع',
      'اختيار المشروبات من القائمة أو من الاقتراحات',
      'تغيير المشروبات قبل موعد التوصيل',
      'إيقاف مؤقت في أي وقت',
    ],
  },
  {
    id: 'weekly-plus',
    period: 'weekly',
    name: 'الأسبوعية المتكاملة',
    price: 75,
    priceUnit: 'أسبوعيًا',
    drinks: 6,
    frequency: 'توصيل مرتين في الأسبوع',
    includes: [
      '6 مشروبات كل أسبوع',
      'تنويع بين العصائر والسموذي',
      'تغيير المشروبات قبل موعد التوصيل',
      'إيقاف مؤقت في أي وقت',
    ],
  },
  {
    id: 'monthly-basic',
    period: 'monthly',
    name: 'الشهرية الأساسية',
    price: 140,
    priceUnit: 'شهريًا',
    drinks: 12,
    frequency: 'توصيل مرة واحدة في الأسبوع (3 مشروبات)',
    highlight: true,
    includes: [
      '12 مشروبًا في الشهر',
      'اختيار المشروبات من القائمة أو من الاقتراحات',
      'يوم توصيل ثابت حسب الاختيار',
      'إيقاف مؤقت أو إلغاء في أي وقت',
    ],
  },
  {
    id: 'monthly-family',
    period: 'monthly',
    name: 'الشهرية العائلية',
    price: 260,
    priceUnit: 'شهريًا',
    drinks: 24,
    frequency: 'توصيل مرتين في الأسبوع (3 مشروبات كل مرة)',
    includes: [
      '24 مشروبًا في الشهر',
      'تنويع بين العصائر والسموذي',
      'يوم توصيل ثابت حسب الاختيار',
      'إيقاف مؤقت أو إلغاء في أي وقت',
    ],
  },
]

export const deliveryDays = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس']

export function getPlan(id) {
  return plans.find((p) => p.id === id)
}

export const lowestPlanPrice = Math.min(...plans.map((p) => p.price))
