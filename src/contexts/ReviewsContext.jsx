import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect
} from 'react'

const STORAGE_KEY = 'oxygen-store-reviews'

const ReviewsContext = createContext(null)

export const useReviews = () => {
  const ctx = useContext(ReviewsContext)
  if (!ctx) {
    throw new Error('useReviews must be used within ReviewsProvider')
  }
  return ctx
}

/** Стартовые отзывы по id товара (каталог) */
const SEED_REVIEWS = {
  1: [
    {
      id: 'seed-1-a',
      authorName: 'Татьяна Л.',
      rating: 5,
      text: 'Заказывали для домашнего использования после выписки. Качество отличное, документы в комплекте. Доставка в срок.',
      date: '2024-10-18'
    },
    {
      id: 'seed-1-b',
      authorName: 'Олег М.',
      rating: 4,
      text: 'Баллон заправлен ровно, вес соответствует. Минус — только упаковка пришла с лёгкой вмятиной, на баллон не повлияло.',
      date: '2024-11-02'
    },
    {
      id: 'seed-1-c',
      authorName: 'Клиника «Здоровье»',
      rating: 5,
      text: 'Берём не первый раз для кислородотерапии. Партия стабильная, сертификаты проверяем — всё в порядке.',
      date: '2025-01-07'
    }
  ],
  2: [
    {
      id: 'seed-2-a',
      authorName: 'Андрей П.',
      rating: 5,
      text: 'Для цеха по металлу — объём 40 л хватает надолго. Обмен пустых без проблем.',
      date: '2024-09-21'
    },
    {
      id: 'seed-2-b',
      authorName: 'Светлана В.',
      rating: 4,
      text: 'Хороший промышленный кислород, цена адекватная. Ждали доставку чуть дольше обещанного.',
      date: '2024-12-14'
    }
  ],
  3: [
    {
      id: 'seed-3-a',
      authorName: 'Ирина К.',
      rating: 5,
      text: 'Лёгкий, удобно в машину. Брала для поездок в горы — спасибо за консультацию по выбору.',
      date: '2024-08-30'
    },
    {
      id: 'seed-3-b',
      authorName: 'Дмитрий',
      rating: 5,
      text: 'Компактный, с ремнём носить реально. Рекомендую тем, кому нужен запас на выходные.',
      date: '2025-02-01'
    }
  ],
  4: [
    {
      id: 'seed-4-a',
      authorName: 'Марина С.',
      rating: 4,
      text: 'Объём 20 л для нашей семьи оптимален. Заправка чистая, давление держит стабильно.',
      date: '2024-11-19'
    },
    {
      id: 'seed-4-b',
      authorName: 'Евгений',
      rating: 5,
      text: 'Медицинский кислород, всё как в описании. Менеджер помог с оформлением.',
      date: '2025-01-22'
    },
    {
      id: 'seed-4-c',
      authorName: 'Наталья',
      rating: 4,
      text: 'Довольна покупкой. Хотелось бы больше вариантов цвета ремней, но это мелочи.',
      date: '2025-03-05'
    }
  ],
  5: [
    {
      id: 'seed-5-a',
      authorName: 'Завод «ПромМаш»',
      rating: 5,
      text: 'Большой объём для линии резки. Работаем с OxygenStore второй год — без нареканий.',
      date: '2024-07-11'
    },
    {
      id: 'seed-5-b',
      authorName: 'Игорь',
      rating: 3,
      text: 'Качество норм, но срок поставки сдвинули на неделю. Компенсировали скидкой на следующий заказ.',
      date: '2024-12-03'
    }
  ],
  6: [
    {
      id: 'seed-6-a',
      authorName: 'Сергей Т.',
      rating: 5,
      text: 'Регулятор точный, резьба без заусенцев. Стоит своих денег.',
      date: '2024-10-05'
    },
    {
      id: 'seed-6-b',
      authorName: 'Анна',
      rating: 4,
      text: 'Поставили на баллон 10 л — работает отлично. Инструкция на русском понятная.',
      date: '2025-01-15'
    },
    {
      id: 'seed-6-c',
      authorName: 'Виктор',
      rating: 5,
      text: 'Брал в подарок коллеге-сварщику. Остался доволен.',
      date: '2025-02-28'
    }
  ]
}

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    return typeof data === 'object' && data !== null ? data : null
  } catch {
    return null
  }
}

function mergeWithSeeds(stored) {
  const merged = {}
  const ids = Object.keys(SEED_REVIEWS).map(Number)
  for (const id of ids) {
    const key = String(id)
    const fromStore = stored?.[key] ?? stored?.[id]
    if (Array.isArray(fromStore) && fromStore.length > 0) {
      merged[id] = fromStore
    } else {
      merged[id] = SEED_REVIEWS[id].map((r) => ({ ...r }))
    }
  }
  return merged
}

export const ReviewsProvider = ({ children }) => {
  const [reviewsByProduct, setReviewsByProduct] = useState(() =>
    mergeWithSeeds(readStored())
  )

  useEffect(() => {
    const out = {}
    for (const [k, v] of Object.entries(reviewsByProduct)) {
      out[k] = v
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(out))
  }, [reviewsByProduct])

  const getReviews = useCallback(
    (productId) => reviewsByProduct[productId] ?? [],
    [reviewsByProduct]
  )

  const getReviewStats = useCallback(
    (productId) => {
      const list = reviewsByProduct[productId] ?? []
      if (!list.length) return { count: 0, average: 0 }
      const sum = list.reduce((s, r) => s + (Number(r.rating) || 0), 0)
      const average = Math.round((sum / list.length) * 10) / 10
      return { count: list.length, average }
    },
    [reviewsByProduct]
  )

  const addReview = useCallback((productId, { authorName, rating, text }) => {
    const author = (authorName || '').trim() || 'Покупатель'
    const entry = {
      id: `r-${Date.now()}`,
      authorName: author,
      rating: Math.min(5, Math.max(1, Math.round(Number(rating)) || 5)),
      text: text.trim(),
      date: new Date().toISOString().split('T')[0]
    }
    setReviewsByProduct((prev) => ({
      ...prev,
      [productId]: [entry, ...(prev[productId] ?? [])]
    }))
  }, [])

  const value = useMemo(
    () => ({
      getReviews,
      getReviewStats,
      addReview
    }),
    [getReviews, getReviewStats, addReview]
  )

  return (
    <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
  )
}
