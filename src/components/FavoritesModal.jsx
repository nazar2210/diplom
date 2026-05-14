import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useFavorites } from '../contexts/FavoritesContext'
import { useCart } from '../contexts/CartContext'
import { useNotifications } from '../contexts/NotificationContext'
import ProductIcon from './ProductIcon'
import { X, Heart, ShoppingCart, Trash2, ExternalLink } from 'lucide-react'

const FavoritesModal = () => {
  const {
    favoriteItems,
    isFavoritesOpen,
    closeFavorites,
    removeFavorite
  } = useFavorites()
  const { addToCart } = useCart()
  const { success } = useNotifications()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price)
  }

  const handleAddToCart = (product) => {
    addToCart(product)
    success(`${product.name} добавлен в корзину!`, {
      description: formatPrice(product.price)
    })
  }

  return (
    <AnimatePresence>
      {isFavoritesOpen && (
        <>
          <motion.div
            className="fixed inset-x-0 top-16 h-[calc(100vh-4rem)] bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFavorites}
          />

          <motion.div
            className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl z-40 overflow-hidden flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 shrink-0">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-10 h-10 bg-red-50 dark:bg-red-900/30 rounded-full flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                    Избранное
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {favoriteItems.length}{' '}
                    {favoriteItems.length === 1
                      ? 'товар'
                      : favoriteItems.length < 5
                        ? 'товара'
                        : 'товаров'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Link
                  to="/favorites"
                  onClick={closeFavorites}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300"
                  title="Открыть страницу"
                  aria-label="Открыть страницу избранного"
                >
                  <ExternalLink className="w-5 h-5" />
                </Link>
                <motion.button
                  type="button"
                  onClick={closeFavorites}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Закрыть"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </motion.button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 min-h-0">
              {favoriteItems.length === 0 ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Пока пусто
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                    Нажмите сердечко у товара в каталоге
                  </p>
                  <Link
                    to="/catalog"
                    onClick={closeFavorites}
                    className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200 inline-block"
                  >
                    В каталог
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {favoriteItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-oxygen-100 dark:from-primary-900/20 dark:to-oxygen-900/20 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ProductIcon category={item.category} className="w-10 h-10" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <motion.button
                          type="button"
                          onClick={() => handleAddToCart(item)}
                          disabled={!item.inStock}
                          className="p-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                          whileHover={{ scale: item.inStock ? 1.05 : 1 }}
                          whileTap={{ scale: item.inStock ? 0.95 : 1 }}
                          aria-label="В корзину"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          type="button"
                          onClick={() => {
                            removeFavorite(item.id)
                            success('Удалено из избранного')
                          }}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Удалить из избранного"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {favoriteItems.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-6 shrink-0">
                <Link
                  to="/favorites"
                  onClick={closeFavorites}
                  className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  Открыть страницу избранного
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default FavoritesModal
