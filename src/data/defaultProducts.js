import { assetUrl } from '../utils/assetUrl'

export const defaultProducts = [
  {
    id: 1,
    name: 'Медицинский кислород 10л',
    category: 'medical',
    price: 7500,
    originalPrice: 8500,
    rating: 4.8,
    reviews: 124,
    image: assetUrl('medical-oxygen-10l-promo.png'),
    description: 'Высококачественный медицинский кислород 99.5% чистоты',
    features: ['99.5% чистоты', 'Медицинский класс', 'Быстрая доставка', 'Сертификация'],
    inStock: true,
    isNew: true
  },
  {
    id: 2,
    name: 'Промышленный кислород 40л',
    category: 'industrial',
    price: 15000,
    originalPrice: 17000,
    rating: 4.6,
    reviews: 89,
    image: assetUrl('oxygen-40l-promo.png'),
    description: 'Промышленный кислород для производственных нужд',
    features: ['99.2% чистоты', 'Промышленный класс', 'Большой объем', 'Экономичный'],
    inStock: true,
    isNew: false
  },
  {
    id: 3,
    name: 'Портативный баллон 5л',
    category: 'portable',
    price: 4500,
    originalPrice: 5000,
    rating: 4.9,
    reviews: 67,
    image: assetUrl('portable-oxygen-5l-promo.png'),
    description: 'Компактный портативный баллон для мобильного использования',
    features: ['Компактный', 'Легкий', 'Удобный', 'Портативный'],
    inStock: true,
    isNew: true
  },
  {
    id: 4,
    name: 'Медицинский кислород 20л',
    category: 'medical',
    price: 12000,
    originalPrice: 14000,
    rating: 4.7,
    reviews: 156,
    image: assetUrl('medical-oxygen-20l-promo.png'),
    description: 'Увеличенный объем медицинского кислорода',
    features: ['99.5% чистоты', 'Большой объем', 'Медицинский класс', 'Долгосрочное хранение'],
    inStock: true,
    isNew: false
  },
  {
    id: 5,
    name: 'Промышленный кислород 80л',
    category: 'industrial',
    price: 28000,
    originalPrice: 32000,
    rating: 4.5,
    reviews: 43,
    image: assetUrl('oxygen-80l-promo.png'),
    description: 'Большой промышленный баллон для крупных производств',
    features: ['99.2% чистоты', 'Максимальный объем', 'Промышленный класс', 'Экономичный'],
    inStock: false,
    isNew: false
  },
  {
    id: 6,
    name: 'Регулятор давления',
    category: 'equipment',
    price: 3500,
    originalPrice: 4000,
    rating: 4.8,
    reviews: 92,
    image: assetUrl('pressure-regulator-promo.png'),
    description: 'Профессиональный регулятор давления для кислородных баллонов',
    features: ['Точная регулировка', 'Прочный корпус', 'Профессиональный', 'Долговечный'],
    inStock: true,
    isNew: true
  }
]

export const PRODUCT_CATEGORIES = [
  { id: 'medical', name: 'Медицинский кислород' },
  { id: 'industrial', name: 'Промышленный кислород' },
  { id: 'portable', name: 'Портативные баллоны' },
  { id: 'equipment', name: 'Оборудование' }
]
