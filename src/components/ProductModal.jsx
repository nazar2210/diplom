import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import { useFavorites } from '../contexts/FavoritesContext'
import { useNotifications } from '../contexts/NotificationContext'
import { useReviews } from '../contexts/ReviewsContext'
import ProductIcon from './ProductIcon'
import { publicImageSrc } from '../utils/assetUrl'
import ProductReviewsPanel from './ProductReviewsPanel'
import { 
  X, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Heart,
  Star,
  CheckCircle,
  Truck,
  Shield,
  RotateCcw
} from 'lucide-react'

const ProductModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { success } = useNotifications()
  const { getReviewStats } = useReviews()
  const [quantity, setQuantity] = React.useState(1)
  const [imageError, setImageError] = React.useState(false)

  React.useEffect(() => {
    setImageError(false)
    setQuantity(1)
  }, [product?.id])

  const handleAddToCart = () => {
    addToCart(product, quantity)
    success(`${product.name} добавлен в корзину!`, {
      description: `Количество: ${quantity}, Цена: ${(product.price * quantity).toLocaleString()} ₽`
    })
    onClose()
  }

  const handleToggleFavorite = () => {
    const was = isFavorite(product.id)
    toggleFavorite(product)
    success(was ? 'Удалено из избранного' : 'Добавлено в избранное', {
      description: product.name
    })
  }

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  if (!product) return null

  const reviewStats = getReviewStats(product.id)
  const displayRating =
    reviewStats.count > 0 ? reviewStats.average : product.rating
  const displayReviewCount =
    reviewStats.count > 0 ? reviewStats.count : product.reviews

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="shrink-0 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {product.name}
                </h2>
                <motion.button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </motion.button>
              </div>

              {/* Content — flex-1 + min-h-0 чтобы скролл не съедал футер */}
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column - Image and Basic Info */}
                  <div>
                    {/* Product Image */}
                    <div className="relative h-80 sm:h-96 bg-white dark:bg-white rounded-xl flex items-center justify-center mb-6 overflow-hidden p-0 sm:p-0.5">
                      {product.isNew && (
                        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-20">
                          Новинка
                        </div>
                      )}
                      {product.image && !imageError ? (
                        <img
                          src={publicImageSrc(product.image)}
                          alt=""
                          className="relative z-0 h-full w-full object-contain object-center"
                          onError={() => setImageError(true)}
                        />
                      ) : (
                        <div className="relative z-0 flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-50 to-oxygen-50 dark:from-slate-800 dark:to-slate-900">
                          <ProductIcon category={product.category} className="w-28 h-28 sm:w-32 sm:h-32" />
                        </div>
                      )}
                    </div>

                    {/* Rating and Reviews */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="text-lg font-semibold text-gray-900 dark:text-white ml-2">
                          {displayRating}
                        </span>
                        <span className="text-gray-600 dark:text-gray-300 ml-2">
                          ({displayReviewCount}{' '}
                          {displayReviewCount === 1
                            ? 'отзыв'
                            : displayReviewCount < 5
                              ? 'отзыва'
                              : 'отзывов'}
                          )
                        </span>
                      </div>
                      <div className="text-right">
                        {product.inStock ? (
                          <div className="flex items-center text-green-600 dark:text-green-400">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            В наличии
                          </div>
                        ) : (
                          <div className="text-red-600 dark:text-red-400">
                            Нет в наличии
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                        {product.price.toLocaleString()} ₽
                      </div>
                      {product.originalPrice > product.price && (
                        <div className="text-lg text-gray-500 line-through">
                          {product.originalPrice.toLocaleString()} ₽
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column - Details */}
                  <div>
                    {/* Description */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Описание
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Характеристики
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {product.features.map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-center text-sm bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 px-3 py-2 rounded-lg"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Преимущества
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Truck className="w-5 h-5 text-green-500 mr-3" />
                          <span>Быстрая доставка по всей России</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Shield className="w-5 h-5 text-blue-500 mr-3" />
                          <span>Гарантия качества и сертификация</span>
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <RotateCcw className="w-5 h-5 text-purple-500 mr-3" />
                          <span>Возврат в течение 14 дней</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <ProductReviewsPanel productId={product.id} productName={product.name} />
              </div>

              {/* Footer */}
              <div className="shrink-0 border-t border-gray-200 dark:border-gray-700 p-4 sm:p-6 bg-white dark:bg-slate-800">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {/* Quantity Selector */}
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Количество:
                    </span>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        className="w-8 h-8 bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 disabled:bg-gray-100 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors duration-200"
                        whileHover={{ scale: quantity > 1 ? 1.1 : 1 }}
                        whileTap={{ scale: quantity > 1 ? 0.9 : 1 }}
                      >
                        <Minus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </motion.button>
                      
                      <span className="w-12 text-center text-lg font-semibold text-gray-900 dark:text-white">
                        {quantity}
                      </span>
                      
                      <motion.button
                        onClick={incrementQuantity}
                        className="w-8 h-8 bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 rounded-full flex items-center justify-center transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                    <motion.button
                      type="button"
                      onClick={handleToggleFavorite}
                      className={`p-3 border rounded-lg transition-colors duration-200 ${
                        isFavorite(product.id)
                          ? 'border-red-400 bg-red-50 dark:bg-red-900/20 dark:border-red-500'
                          : 'border-gray-300 dark:border-gray-600 hover:border-red-500 dark:hover:border-red-400'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={isFavorite(product.id) ? 'Убрать из избранного' : 'В избранное'}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isFavorite(product.id)
                            ? 'text-red-500 fill-red-500'
                            : 'text-gray-600 dark:text-gray-300'
                        }`}
                      />
                    </motion.button>
                    
                    <motion.button
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className="px-8 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200 flex items-center"
                      whileHover={{ scale: product.inStock ? 1.02 : 1 }}
                      whileTap={{ scale: product.inStock ? 0.98 : 1 }}
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Добавить в корзину
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProductModal
