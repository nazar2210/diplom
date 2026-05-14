import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import { useFavorites } from '../contexts/FavoritesContext'
import { useNotifications } from '../contexts/NotificationContext'
import { useReviews } from '../contexts/ReviewsContext'
import ProductModal from '../components/ProductModal'
import ProductIcon from '../components/ProductIcon'
import { SkeletonGrid } from '../components/SkeletonLoader'
import { useSearchParams } from 'react-router-dom'
import { 
  Filter, 
  Search, 
  ShoppingCart, 
  Heart,
  Star,
  CheckCircle,
  Eye
} from 'lucide-react'
import { assetUrl, publicImageSrc } from '../utils/assetUrl'

const mockProducts = [
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
    image: assetUrl('industrial-oxygen.jpg'),
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
    image: assetUrl('industrial-oxygen.jpg'),
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
    image: assetUrl('industrial-oxygen.jpg'),
    description: 'Профессиональный регулятор давления для кислородных баллонов',
    features: ['Точная регулировка', 'Прочный корпус', 'Профессиональный', 'Долговечный'],
    inStock: true,
    isNew: true
  }
]

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 50000])
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('name')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [imageStates, setImageStates] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { success } = useNotifications()
  const { getReviewStats } = useReviews()

  const handleImageLoad = (productId) => {
    setImageStates(prev => ({ ...prev, [productId]: { loaded: true, error: false } }))
  }

  const handleImageError = (productId) => {
    setImageStates(prev => ({ ...prev, [productId]: { loaded: false, error: true } }))
  }

  const categories = [
    { id: 'all', name: 'Все товары' },
    { id: 'medical', name: 'Медицинский кислород' },
    { id: 'industrial', name: 'Промышленный кислород' },
    { id: 'portable', name: 'Портативные баллоны' },
    { id: 'equipment', name: 'Оборудование' }
  ]

  useEffect(() => {
    // Имитация загрузки данных
    const loadProducts = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1500)) // Имитация API запроса
      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
      setIsLoading(false)
    }
    
    loadProducts()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Обработка URL параметров
  useEffect(() => {
    const category = searchParams.get('category')
    if (category && ['medical', 'industrial', 'portable', 'equipment'].includes(category)) {
      setSelectedCategory(category)
    }
  }, [searchParams])

  useEffect(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by price range
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating': {
          const ar = getReviewStats(a.id).count
            ? getReviewStats(a.id).average
            : a.rating
          const br = getReviewStats(b.id).count
            ? getReviewStats(b.id).average
            : b.rating
          return br - ar
        }
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [products, selectedCategory, searchTerm, priceRange, sortBy, getReviewStats])

  const handleAddToCart = (product) => {
    addToCart(product)
    success(`${product.name} добавлен в корзину!`, {
      description: `Цена: ${product.price.toLocaleString()} ₽`
    })
  }

  const handleToggleFavorite = (product, e) => {
    e?.preventDefault?.()
    e?.stopPropagation?.()
    const wasFavorite = isFavorite(product.id)
    toggleFavorite(product)
    success(
      wasFavorite ? 'Удалено из избранного' : 'Добавлено в избранное',
      { description: product.name }
    )
  }

  const openProductModal = (product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const closeProductModal = () => {
    setIsProductModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Каталог товаров
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Выберите подходящий баллон с кислородом из нашего широкого ассортимента
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
            >
              <option value="name">По названию</option>
              <option value="price-low">Цена: по возрастанию</option>
              <option value="price-high">Цена: по убыванию</option>
              <option value="rating">По рейтингу</option>
            </select>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200"
            >
              <Filter className="w-5 h-5 mr-2" />
              Фильтры
            </button>
          </div>

          {/* Mobile Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Цена: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ₽
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Desktop Filters */}
        <div className="hidden lg:block">
          <motion.div
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Фильтры</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Цена: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ₽
                </label>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <SkeletonGrid count={6} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProducts.map((product, index) => {
                const rev = getReviewStats(product.id)
                const ratingShown = rev.count > 0 ? rev.average : product.rating
                const reviewsShown = rev.count > 0 ? rev.count : product.reviews
                return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Превью: белый фон под фото + без вертикальных полос; чуть выше блок */}
                <div className="relative h-64 sm:h-80 lg:h-96 bg-white dark:bg-white overflow-hidden isolate">
                  {product.isNew && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold z-20 pointer-events-none">
                      Новинка
                    </div>
                  )}
                  <div className="absolute inset-0 z-0 flex items-center justify-center p-0 sm:p-0.5">
                    {imageStates[product.id]?.error ? (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-50 to-oxygen-50 dark:from-slate-800 dark:to-slate-900 pointer-events-none">
                        <ProductIcon category={product.category} className="w-24 h-24 sm:w-28 sm:h-28 opacity-60" />
                      </div>
                    ) : (
                      <img
                        src={publicImageSrc(product.image)}
                        alt={product.name}
                        className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-[1.03] pointer-events-none select-none"
                        onLoad={() => handleImageLoad(product.id)}
                        onError={() => handleImageError(product.id)}
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => handleToggleFavorite(product, e)}
                    className="absolute top-3 right-3 p-2 bg-white/95 dark:bg-white/95 rounded-full hover:bg-gray-50 transition-colors duration-200 z-30 shadow-sm ring-1 ring-black/5"
                    aria-label={isFavorite(product.id) ? 'Убрать из избранного' : 'В избранное'}
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        isFavorite(product.id)
                          ? 'text-red-500 fill-red-500'
                          : 'text-gray-600 dark:text-gray-300'
                      }`}
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                      {product.name}
                    </h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                        {ratingShown} ({reviewsShown})
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {product.features.slice(0, 2).map((feature, i) => (
                        <span
                          key={i}
                          className="text-xs bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {product.price.toLocaleString()} ₽
                      </div>
                      {product.originalPrice > product.price && (
                        <div className="text-sm text-gray-500 line-through">
                          {product.originalPrice.toLocaleString()} ₽
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      {product.inStock ? (
                        <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          В наличии
                        </div>
                      ) : (
                        <div className="text-red-600 dark:text-red-400 text-sm">
                          Нет в наличии
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => openProductModal(product)}
                      className="flex-1 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Подробнее
                    </motion.button>
                    <motion.button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                      whileHover={{ scale: product.inStock ? 1.02 : 1 }}
                      whileTap={{ scale: product.inStock ? 0.98 : 1 }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      В корзину
                    </motion.button>
                    <button
                      type="button"
                      onClick={(e) => handleToggleFavorite(product, e)}
                      className={`px-4 py-3 border rounded-lg transition-colors duration-200 shrink-0 ${
                        isFavorite(product.id)
                          ? 'border-red-400 bg-red-50 dark:bg-red-900/20 dark:border-red-500'
                          : 'border-gray-300 dark:border-gray-600 hover:border-primary-600 dark:hover:border-primary-400'
                      }`}
                      aria-label={isFavorite(product.id) ? 'Убрать из избранного' : 'В избранное'}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isFavorite(product.id)
                            ? 'text-red-500 fill-red-500'
                            : 'text-gray-600 dark:text-gray-300'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
        )}

        {/* No Results */}
        {!isLoading && filteredProducts.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Товары не найдены
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Попробуйте изменить параметры поиска или фильтры
            </p>
          </motion.div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={closeProductModal}
      />
    </div>
  )
}

export default Catalog
