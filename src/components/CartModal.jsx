import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import ProductIcon from './ProductIcon'
import { 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingBag,
  ArrowRight
} from 'lucide-react'

const CartModal = () => {
  const {
    cartItems,
    isCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    closeCart
  } = useCart()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-x-0 top-16 h-[calc(100vh-4rem)] bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Modal */}
          <motion.div
            className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl z-40 overflow-hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Корзина
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {getTotalItems()} товаров
                  </p>
                </div>
              </div>
              <motion.button
                onClick={closeCart}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Корзина пуста
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Добавьте товары из каталога
                  </p>
                  <Link
                    to="/catalog"
                    onClick={closeCart}
                    className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200 inline-block"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Перейти в каталог
                    </motion.div>
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-oxygen-100 dark:from-primary-900/20 dark:to-oxygen-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <ProductIcon category={item.category} className="w-10 h-10" />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <motion.button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 rounded-full flex items-center justify-center transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Minus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </motion.button>
                        
                        <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        
                        <motion.button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 rounded-full flex items-center justify-center transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </motion.button>
                      </div>

                      {/* Remove Button */}
                      <motion.button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <motion.div
                className="border-t border-gray-200 dark:border-gray-700 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Total */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    Итого:
                  </span>
                  <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Link
                    to="/checkout"
                    onClick={closeCart}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <motion.div
                      className="flex items-center justify-center w-full"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Оформить заказ
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </motion.div>
                  </Link>
                  
                  <motion.button
                    onClick={clearCart}
                    className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Очистить корзину
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartModal
