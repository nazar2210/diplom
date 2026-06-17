import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useProducts } from '../contexts/ProductsContext'
import { useNotifications } from '../contexts/NotificationContext'
import ProductFormModal from '../components/ProductFormModal'
import ProductIcon from '../components/ProductIcon'
import { publicImageSrc } from '../utils/assetUrl'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit3, 
  Save, 
  X,
  Package,
  Calendar,
  CheckCircle,
  Clock,
  Truck,
  Star,
  ShoppingCart,
  Plus,
  Shield
} from 'lucide-react'

const Profile = () => {
  const { user, updateProfile, isAdmin } = useAuth()
  const { products, addProduct } = useProducts()
  const { success } = useNotifications()
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleEdit = () => {
    setIsEditing(true)
    setEditData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    })
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Имитация API
      updateProfile(editData)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const getOrderStatus = (status) => {
    switch (status) {
      case 'delivered':
        return { text: 'Доставлен', color: 'text-green-600 dark:text-green-400', icon: CheckCircle }
      case 'shipped':
        return { text: 'В пути', color: 'text-blue-600 dark:text-blue-400', icon: Truck }
      case 'processing':
        return { text: 'Обрабатывается', color: 'text-yellow-600 dark:text-yellow-400', icon: Clock }
      default:
        return { text: 'Неизвестно', color: 'text-gray-600 dark:text-gray-400', icon: Clock }
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price)
  }

  const handleAddProduct = (payload) => {
    addProduct(payload)
    success('Товар добавлен в каталог', { description: payload.name })
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
            Мой профиль
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Управляйте своими данными и отслеживайте заказы
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Личная информация
                </h2>
                {!isEditing && (
                  <motion.button
                    onClick={handleEdit}
                    className="p-2 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit3 className="w-5 h-5" />
                  </motion.button>
                )}
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Имя
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                      <User className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{user?.name}</span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{user?.email}</span>
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Телефон
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={editData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{user?.phone}</span>
                    </div>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Адрес
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="address"
                        value={editData.address}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{user?.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <AnimatePresence>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 flex space-x-3"
                  >
                    <motion.button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                      whileHover={{ scale: isSaving ? 1 : 1.02 }}
                      whileTap={{ scale: isSaving ? 1 : 0.98 }}
                    >
                      {isSaving ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Сохранение...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5 mr-2" />
                          Сохранить
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      onClick={handleCancel}
                      className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 font-semibold rounded-lg transition-colors duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {isAdmin && (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Панель администратора
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {products.length} товаров в каталоге
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Добавляйте новые товары здесь. Редактирование и удаление — в каталоге на карточках.
                </p>
                <motion.button
                  type="button"
                  onClick={() => setIsAddProductOpen(true)}
                  className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus className="w-5 h-5" />
                  Добавить товар
                </motion.button>
                <Link
                  to="/catalog"
                  className="mt-3 block text-center text-sm text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Перейти в каталог для редактирования
                </Link>
              </div>
            )}
          </motion.div>

          {/* Orders History */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  История заказов
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <Package className="w-4 h-4" />
                  <span>{user?.orders?.length || 0} заказов</span>
                </div>
              </div>

              {user?.orders && user.orders.length > 0 ? (
                <div className="space-y-4">
                  {user.orders.map((order, index) => {
                    const status = getOrderStatus(order.status)
                    const StatusIcon = status.icon

                    return (
                      <motion.div
                        key={order.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                              <ShoppingCart className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                Заказ #{order.id}
                              </h3>
                              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(order.date)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900 dark:text-white">
                              {formatPrice(order.total)}
                            </div>
                            <div className={`flex items-center space-x-1 text-sm ${status.color}`}>
                              <StatusIcon className="w-4 h-4" />
                              <span>{status.text}</span>
                            </div>
                          </div>
                        </div>

                        {(order.deliveryDate || order.deliveryAddress) && (
                          <div className="mb-3 text-sm text-gray-600 dark:text-gray-300">
                            {order.deliveryAddress && (
                              <p>
                                <span className="font-medium text-gray-800 dark:text-gray-200">Доставка: </span>
                                {order.deliveryAddress}
                              </p>
                            )}
                            {(order.deliveryDate || order.deliveryTime) && (
                              <p>
                                <span className="font-medium text-gray-800 dark:text-gray-200">Когда: </span>
                                {[order.deliveryDate, order.deliveryTime].filter(Boolean).join(' · ')}
                              </p>
                            )}
                          </div>
                        )}

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Товары:
                          </h4>
                          <div className="space-y-2">
                            {order.items.map((item, itemIndex) => (
                              <div
                                key={item.id ?? `${order.id}-${itemIndex}`}
                                className="flex items-center justify-between gap-3 text-sm text-gray-600 dark:text-gray-300"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-100 to-oxygen-100 dark:from-primary-900/30 dark:to-oxygen-900/20 shrink-0 overflow-hidden flex items-center justify-center">
                                    {item.image ? (
                                      <img
                                        src={publicImageSrc(item.image)}
                                        alt=""
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <ProductIcon category={item.category} className="w-8 h-8" />
                                    )}
                                  </div>
                                  <span className="truncate">
                                    {item.name}
                                    <span className="text-gray-500 dark:text-gray-400"> ×{item.quantity}</span>
                                  </span>
                                </div>
                                <span className="shrink-0 font-medium text-gray-900 dark:text-white">
                                  {formatPrice((item.price || 0) * (item.quantity || 0))}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              ) : (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Пока нет заказов
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Когда вы сделаете первый заказ, он появится здесь
                  </p>
                  <Link to="/catalog">
                    <motion.span
                      className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Перейти в каталог
                    </motion.span>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Package className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {user?.orders?.length || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Всего заказов
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {user?.orders?.filter(order => order.status === 'delivered').length || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Доставлено
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {user?.orders?.filter(order => order.status === 'shipped').length || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              В пути
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              4.8
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Рейтинг клиента
            </div>
          </div>
        </motion.div>
      </div>

      <ProductFormModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onSubmit={handleAddProduct}
        mode="add"
      />
    </div>
  )
}

export default Profile




