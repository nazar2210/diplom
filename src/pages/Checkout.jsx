import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { 
  CreditCard, 
  Truck, 
  MapPin, 
  Phone, 
  Mail, 
  User,
  Calendar,
  Clock,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  CreditCard as CardIcon,
  Building,
  Shield,
  Zap,
  Package,
  Star
} from 'lucide-react'

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart()
  const { user, addOrder } = useAuth()
  const navigate = useNavigate()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [completedOrderId, setCompletedOrderId] = useState(null)
  
  const [deliveryData, setDeliveryData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: '',
    postalCode: '',
    deliveryDate: '',
    deliveryTime: '',
    notes: ''
  })
  
  const [paymentData, setPaymentData] = useState({
    method: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    saveCard: false
  })

  const steps = [
    { id: 1, title: 'Доставка', description: 'Адрес и время доставки' },
    { id: 2, title: 'Оплата', description: 'Способ оплаты' },
    { id: 3, title: 'Подтверждение', description: 'Проверка заказа' }
  ]

  const paymentMethods = [
    { id: 'card', name: 'Банковская карта', icon: CardIcon, description: 'Visa, MasterCard, МИР' },
    { id: 'cash', name: 'Наличными при получении', icon: Package, description: 'Оплата курьеру' },
    { id: 'transfer', name: 'Банковский перевод', icon: Building, description: 'Для юридических лиц' }
  ]

  const deliveryTimes = [
    { value: '09:00-12:00', label: 'Утром (9:00-12:00)' },
    { value: '12:00-15:00', label: 'Днем (12:00-15:00)' },
    { value: '15:00-18:00', label: 'Вечером (15:00-18:00)' },
    { value: '18:00-21:00', label: 'Поздно вечером (18:00-21:00)' }
  ]

  const handleInputChange = (section, field, value) => {
    if (section === 'delivery') {
      setDeliveryData(prev => ({ ...prev, [field]: value }))
    } else if (section === 'payment') {
      setPaymentData(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getDeliveryFee = () => {
    return getTotalPrice() > 10000 ? 0 : 500
  }

  const getTotalWithDelivery = () => {
    return getTotalPrice() + getDeliveryFee()
  }

  const handleSubmit = async () => {
    if (!user || cartItems.length === 0) return

    setIsProcessing(true)

    // Имитация обработки заказа
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const orderId = Date.now()
    const total = getTotalWithDelivery()

    const orderItems = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
      category: item.category
    }))

    addOrder({
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      total,
      status: 'processing',
      items: orderItems,
      deliveryDate: deliveryData.deliveryDate,
      deliveryTime: deliveryData.deliveryTime,
      deliveryAddress: [deliveryData.address, deliveryData.city].filter(Boolean).join(', '),
      paymentMethod: paymentData.method
    })

    setCompletedOrderId(orderId)
    clearCart()
    setIsProcessing(false)
    setIsCompleted(true)

    setTimeout(() => {
      navigate('/profile')
    }, 3000)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price)
  }

  if (cartItems.length === 0 && !isCompleted) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-24 h-24 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Корзина пуста
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Добавьте товары в корзину для оформления заказа
          </p>
          <Link
            to="/catalog"
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Перейти в каталог
          </Link>
        </motion.div>
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div className="pt-16 min-h-screen bg-gradient-to-br from-green-50 via-white to-primary-50 dark:from-green-900/20 dark:via-slate-800 dark:to-primary-900/20 flex items-center justify-center">
        <motion.div
          className="text-center max-w-md mx-auto px-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Заказ оформлен!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время для подтверждения деталей доставки.
          </p>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Номер заказа: #{completedOrderId != null ? String(completedOrderId).slice(-8) : '—'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Ожидаемая доставка: {deliveryData.deliveryDate} в {deliveryData.deliveryTime}
            </p>
          </div>
          
          <motion.div
            className="text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Перенаправление в профиль через 3 секунды...
          </motion.div>
        </motion.div>
      </div>
    )
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
            Оформление заказа
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Завершите покупку в несколько простых шагов
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <motion.div
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium ${
                      currentStep >= step.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}>
                      {currentStep > step.id ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <div className="ml-3 hidden sm:block">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        {step.description}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-4 ${
                        currentStep > step.id
                          ? 'bg-primary-600'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              {/* Step 1: Delivery */}
              {currentStep === 1 && (
                <motion.div
                  key="delivery"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Truck className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
                    Информация о доставке
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Имя *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={deliveryData.firstName}
                          onChange={(e) => handleInputChange('delivery', 'firstName', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                          placeholder="Ваше имя"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Фамилия *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={deliveryData.lastName}
                          onChange={(e) => handleInputChange('delivery', 'lastName', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                          placeholder="Ваша фамилия"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          value={deliveryData.email}
                          onChange={(e) => handleInputChange('delivery', 'email', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Телефон *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          value={deliveryData.phone}
                          onChange={(e) => handleInputChange('delivery', 'phone', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                          placeholder="+7 (999) 123-45-67"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Адрес доставки *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={deliveryData.address}
                          onChange={(e) => handleInputChange('delivery', 'address', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                          placeholder="Улица, дом, квартира"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Город *
                      </label>
                      <input
                        type="text"
                        value={deliveryData.city}
                        onChange={(e) => handleInputChange('delivery', 'city', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                        placeholder="Москва"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Почтовый индекс
                      </label>
                      <input
                        type="text"
                        value={deliveryData.postalCode}
                        onChange={(e) => handleInputChange('delivery', 'postalCode', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                        placeholder="123456"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Дата доставки *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="date"
                          value={deliveryData.deliveryDate}
                          onChange={(e) => handleInputChange('delivery', 'deliveryDate', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Время доставки *
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                          value={deliveryData.deliveryTime}
                          onChange={(e) => handleInputChange('delivery', 'deliveryTime', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                        >
                          <option value="">Выберите время</option>
                          {deliveryTimes.map(time => (
                            <option key={time.value} value={time.value}>
                              {time.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Комментарий к заказу
                      </label>
                      <textarea
                        value={deliveryData.notes}
                        onChange={(e) => handleInputChange('delivery', 'notes', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                        placeholder="Дополнительные пожелания по доставке..."
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {currentStep === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                    <CreditCard className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
                    Способ оплаты
                  </h2>

                  {/* Payment Methods */}
                  <div className="space-y-4 mb-6">
                    {paymentMethods.map((method) => (
                      <motion.label
                        key={method.id}
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          paymentData.method === method.id
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={paymentData.method === method.id}
                          onChange={(e) => handleInputChange('payment', 'method', e.target.value)}
                          className="sr-only"
                        />
                        <method.icon className={`w-6 h-6 mr-3 ${
                          paymentData.method === method.id
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-gray-400'
                        }`} />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {method.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {method.description}
                          </p>
                        </div>
                        {paymentData.method === method.id && (
                          <CheckCircle className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        )}
                      </motion.label>
                    ))}
                  </div>

                  {/* Card Details */}
                  {paymentData.method === 'card' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Данные карты
                      </h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Номер карты *
                        </label>
                        <div className="relative">
                          <CardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            value={paymentData.cardNumber}
                            onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Срок действия *
                          </label>
                          <input
                            type="text"
                            value={paymentData.expiryDate}
                            onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            value={paymentData.cvv}
                            onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                            placeholder="123"
                            maxLength={3}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Имя владельца карты *
                        </label>
                        <input
                          type="text"
                          value={paymentData.cardholderName}
                          onChange={(e) => handleInputChange('payment', 'cardholderName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                          placeholder="IVAN IVANOV"
                        />
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="saveCard"
                          checked={paymentData.saveCard}
                          onChange={(e) => handleInputChange('payment', 'saveCard', e.target.checked)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded"
                        />
                        <label htmlFor="saveCard" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Сохранить карту для будущих покупок
                        </label>
                      </div>
                    </motion.div>
                  )}

                  {/* Security Notice */}
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                      <span className="text-sm text-green-700 dark:text-green-300">
                        Ваши платежные данные защищены SSL-шифрованием
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 3 && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                    <CheckCircle className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-3" />
                    Подтверждение заказа
                  </h2>

                  {/* Order Summary */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Товары в заказе
                      </h3>
                      <div className="space-y-3">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-oxygen-100 dark:from-primary-900/20 dark:to-oxygen-900/20 rounded-lg flex items-center justify-center">
                                <Zap className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                  {item.name}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  Количество: {item.quantity}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Информация о доставке
                      </h3>
                      <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                        <p className="text-gray-900 dark:text-white">
                          <strong>{deliveryData.firstName} {deliveryData.lastName}</strong>
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          {deliveryData.address}, {deliveryData.city}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          {deliveryData.phone}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Доставка: {deliveryData.deliveryDate} в {deliveryData.deliveryTime}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Способ оплаты
                      </h3>
                      <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                        <p className="text-gray-900 dark:text-white">
                          {paymentMethods.find(m => m.id === paymentData.method)?.name}
                        </p>
                        {paymentData.method === 'card' && paymentData.cardNumber?.length >= 4 && (
                          <p className="text-gray-600 dark:text-gray-300">
                            **** **** **** {paymentData.cardNumber.replace(/\s/g, '').slice(-4)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.div
              className="flex justify-between mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className="flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold rounded-lg transition-colors duration-200"
                whileHover={{ scale: currentStep > 1 ? 1.02 : 1 }}
                whileTap={{ scale: currentStep > 1 ? 0.98 : 1 }}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Назад
              </motion.button>

              {currentStep < 3 ? (
                <motion.button
                  onClick={handleNext}
                  className="flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Далее
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200"
                  whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                  whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Обработка...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Подтвердить заказ
                    </>
                  )}
                </motion.button>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Итого заказа
              </h3>

              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Товары</span>
                  <span className="text-gray-900 dark:text-white">
                    {formatPrice(getTotalPrice())}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-300">Доставка</span>
                  <span className="text-gray-900 dark:text-white">
                    {getDeliveryFee() === 0 ? (
                      <span className="text-green-600 dark:text-green-400">Бесплатно</span>
                    ) : (
                      formatPrice(getDeliveryFee())
                    )}
                  </span>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-gray-900 dark:text-white">Итого</span>
                    <span className="text-primary-600 dark:text-primary-400">
                      {formatPrice(getTotalWithDelivery())}
                    </span>
                  </div>
                </div>
              </div>

              {getDeliveryFee() > 0 && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <Star className="w-4 h-4 inline mr-1" />
                    При заказе от 10,000 ₽ доставка бесплатная
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout




