import React from 'react'
import { motion } from 'framer-motion'
import { 
  Truck, 
  MapPin, 
  Clock, 
  Shield,
  Package,
  CreditCard,
  Phone,
  Mail,
  CheckCircle,
  Star,
  AlertCircle
} from 'lucide-react'

const Delivery = () => {
  const deliveryOptions = [
    {
      type: 'Стандартная доставка',
      time: '1-2 рабочих дня',
      price: 'Бесплатно от 10 000 ₽',
      description: 'Доставка по Москве в течение 1-2 рабочих дней',
      features: [
        'Доставка в удобное время',
        'Уведомления о статусе заказа',
        'Возможность отслеживания',
        'Подпись получателя'
      ]
    },
    {
      type: 'Экспресс доставка',
      time: 'В день заказа',
      price: 'от 1 500 ₽',
      description: 'Доставка в день заказа при оформлении до 14:00',
      features: [
        'Доставка в течение 4 часов',
        'Приоритетная обработка',
        'Персональный менеджер',
        'Гарантия времени доставки'
      ]
    },
    {
      type: 'Доставка в регионы',
      time: '2-7 дней',
      price: 'от 500 ₽',
      description: 'Доставка по всей России с учетом удаленности',
      features: [
        'Доставка в любой город России',
        'Надежная упаковка',
        'Страхование груза',
        'Уведомления о статусе'
      ]
    }
  ]

  const coverageAreas = [
    {
      region: 'Москва и МО',
      cities: ['Москва', 'Химки', 'Мытищи', 'Королев', 'Подольск', 'Люберцы'],
      deliveryTime: '1-2 дня',
      price: 'Бесплатно от 10 000 ₽'
    },
    {
      region: 'Центральный ФО',
      cities: ['Тула', 'Калуга', 'Рязань', 'Владимир', 'Иваново', 'Кострома'],
      deliveryTime: '2-3 дня',
      price: 'от 300 ₽'
    },
    {
      region: 'Северо-Западный ФО',
      cities: ['Санкт-Петербург', 'Новгород', 'Псков', 'Калининград', 'Мурманск'],
      deliveryTime: '3-4 дня',
      price: 'от 500 ₽'
    },
    {
      region: 'Южный ФО',
      cities: ['Ростов-на-Дону', 'Краснодар', 'Ставрополь', 'Волгоград', 'Астрахань'],
      deliveryTime: '3-5 дней',
      price: 'от 400 ₽'
    },
    {
      region: 'Сибирь и Дальний Восток',
      cities: ['Новосибирск', 'Красноярск', 'Иркутск', 'Хабаровск', 'Владивосток'],
      deliveryTime: '5-7 дней',
      price: 'от 800 ₽'
    }
  ]

  const requirements = [
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: 'Безопасность',
      description: 'Все баллоны проходят проверку на герметичность и соответствие стандартам безопасности'
    },
    {
      icon: <Package className="w-6 h-6 text-blue-500" />,
      title: 'Надежная упаковка',
      description: 'Специальная упаковка защищает баллоны от повреждений при транспортировке'
    },
    {
      icon: <Truck className="w-6 h-6 text-purple-500" />,
      title: 'Специализированный транспорт',
      description: 'Используем специально оборудованный транспорт для перевозки кислородных баллонов'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-orange-500" />,
      title: 'Контроль качества',
      description: 'Каждый баллон проверяется перед отправкой и при получении'
    }
  ]

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
              <Truck className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Доставка и получение
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Быстрая и надежная доставка кислородных баллонов по всей России
          </p>
        </motion.div>

        {/* Delivery Options */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Варианты доставки
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deliveryOptions.map((option, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {option.type}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {option.description}
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <span className="flex items-center text-gray-600 dark:text-gray-300">
                      <Clock className="w-4 h-4 mr-1" />
                      {option.time}
                    </span>
                    <span className="flex items-center text-gray-600 dark:text-gray-300">
                      <CreditCard className="w-4 h-4 mr-1" />
                      {option.price}
                    </span>
                  </div>
                </div>
                <ul className="space-y-2">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Coverage Areas */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            География доставки
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coverageAreas.map((area, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-primary-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {area.region}
                  </h3>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Основные города:
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {area.cities.join(', ')}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Срок доставки:</span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {area.deliveryTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Стоимость:</span>
                    <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                      {area.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Safety Requirements */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Требования безопасности
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requirements.map((req, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    {req.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {req.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {req.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Important Information */}
        <motion.div
          className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-start">
            <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Важная информация
              </h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                <li>• При получении заказа необходимо предъявить документ, удостоверяющий личность</li>
                <li>• Для медицинского кислорода требуется лицензия или справка от медучреждения</li>
                <li>• Баллоны должны храниться в вертикальном положении в хорошо проветриваемом помещении</li>
                <li>• При повреждении упаковки или баллона необходимо отказаться от получения</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Вопросы по доставке?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Наши специалисты помогут рассчитать стоимость и сроки доставки
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+74951234567"
              className="flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              <Phone className="w-5 h-5 mr-2" />
              +7 (495) 123-45-67
            </a>
            <a
              href="mailto:delivery@oxygenstore.ru"
              className="flex items-center justify-center bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors duration-200"
            >
              <Mail className="w-5 h-5 mr-2" />
              delivery@oxygenstore.ru
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Delivery
