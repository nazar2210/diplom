import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useFavorites } from '../contexts/FavoritesContext'
import { useCart } from '../contexts/CartContext'
import { useNotifications } from '../contexts/NotificationContext'
import { useReviews } from '../contexts/ReviewsContext'
import ProductIcon from '../components/ProductIcon'
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowLeft,
  Star,
  CheckCircle
} from 'lucide-react'

const Favorites = () => {
  const { favoriteItems, removeFavorite } = useFavorites()
  const { addToCart } = useCart()
  const { success } = useNotifications()
  const { getReviewStats } = useReviews()
  const [imageErrors, setImageErrors] = useState({})

  const handleAddToCart = (product) => {
    addToCart(product)
    success(`${product.name} добавлен в корзину!`, {
      description: `Цена: ${product.price.toLocaleString()} ₽`
    })
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Избранное
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Сохранённые товары — как корзина, но без обязательства покупки
            </p>
          </div>
          <Link
            to="/catalog"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            В каталог
          </Link>
        </motion.div>

        {favoriteItems.length === 0 ? (
          <motion.div
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Heart className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Пока ничего нет
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              Нажмите на сердечко у товара в каталоге — он появится здесь.
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
            >
              Перейти в каталог
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {favoriteItems.map((product, index) => {
                const rev = getReviewStats(product.id)
                const ratingShown = rev.count > 0 ? rev.average : product.rating
                const reviewsShown = rev.count > 0 ? rev.count : null
                return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-64 sm:h-80 lg:h-96 bg-white dark:bg-white overflow-hidden flex items-center justify-center p-0 sm:p-0.5">
                    {imageErrors[product.id] ? (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-50 to-oxygen-50 dark:from-slate-800 dark:to-slate-900">
                        <ProductIcon category={product.category} className="w-24 h-24 sm:w-28 sm:h-28 opacity-60" />
                      </div>
                    ) : (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain object-center relative z-0"
                        onError={() =>
                          setImageErrors((prev) => ({ ...prev, [product.id]: true }))
                        }
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        removeFavorite(product.id)
                        success('Удалено из избранного')
                      }}
                      className="absolute top-3 right-3 p-2 bg-white/95 rounded-full hover:bg-red-50 dark:hover:bg-red-50 transition-colors z-30 shadow-sm ring-1 ring-black/5"
                      aria-label="Удалить из избранного"
                    >
                      <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {product.name}
                      </h3>
                      <div className="flex items-center shrink-0">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                          {ratingShown}
                          {reviewsShown != null && (
                            <span className="text-gray-500 dark:text-gray-400">
                              {' '}
                              ({reviewsShown})
                            </span>
                          )}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {product.price.toLocaleString()} ₽
                      </div>
                      {product.inStock ? (
                        <span className="flex items-center text-green-600 dark:text-green-400 text-sm">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          В наличии
                        </span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400 text-sm">Нет в наличии</span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                        className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        В корзину
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          removeFavorite(product.id)
                          success('Удалено из избранного')
                        }}
                        className="px-4 py-3 border border-gray-300 dark:border-gray-600 hover:border-red-400 rounded-lg transition-colors"
                        aria-label="Убрать из избранного"
                      >
                        <Trash2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                    </div>
                  </div>
                </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites
