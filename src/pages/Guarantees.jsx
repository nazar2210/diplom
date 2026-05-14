import React from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  Award,
  FileText,
  Phone,
  Mail,
  AlertTriangle,
  Star,
  Heart
} from 'lucide-react'

const Guarantees = () => {
  const guarantees = [
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: 'Гарантия качества',
      period: '24 месяца',
      description: 'Гарантируем качество всех наших кислородных баллонов и оборудования',
      details: [
        'Соответствие медицинским стандартам',
        'Проверка герметичности баллонов',
        'Контроль чистоты кислорода',
        'Сертификаты качества'
      ]
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: 'Гарантия срока доставки',
      period: '100%',
      description: 'Гарантируем доставку в указанные сроки или возвращаем стоимость доставки',
      details: [
        'Точное соблюдение сроков',
        'Уведомления о статусе заказа',
        'Компенсация за просрочку',
        'Персональный менеджер'
      ]
    },
    {
      icon: <Award className="w-8 h-8 text-purple-500" />,
      title: 'Гарантия возврата',
      period: '14 дней',
      description: 'Возврат товара в течение 14 дней при сохранении товарного вида',
      details: [
        'Возврат без объяснения причин',
        'Полная компенсация стоимости',
        'Быстрое оформление возврата',
        'Бесплатная доставка возврата'
      ]
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: 'Гарантия безопасности',
      period: 'Постоянно',
      description: 'Обеспечиваем безопасность использования наших продуктов',
      details: [
        'Инструкции по безопасному использованию',
        'Консультации специалистов',
        'Техническая поддержка 24/7',
        'Обучение персонала'
      ]
    }
  ]

  const warrantyTerms = [
    {
      title: 'Условия гарантии',
      items: [
        'Гарантия распространяется на все товары, приобретенные у нас',
        'Гарантийный срок исчисляется с момента получения товара',
        'Гарантия не распространяется на повреждения, вызванные неправильным использованием',
        'При обнаружении дефекта необходимо обратиться в течение гарантийного срока'
      ]
    },
    {
      title: 'Процедура возврата',
      items: [
        'Свяжитесь с нами по телефону или email',
        'Опишите причину возврата',
                'Получите инструкции по оформлению возврата',
        'Отправьте товар обратно или дождитесь курьера'
      ]
    },
    {
      title: 'Компенсация',
      items: [
        'Полный возврат стоимости товара',
        'Компенсация стоимости доставки',
        'Возврат средств в течение 3-5 рабочих дней',
        'Возможность обмена на аналогичный товар'
      ]
    }
  ]

  const certificates = [
    {
      name: 'ISO 13485:2016',
      description: 'Система менеджмента качества для медицинских устройств',
      icon: <Award className="w-6 h-6 text-blue-500" />
    },
    {
      name: 'ГОСТ Р 52536-2006',
      description: 'Кислород медицинский газообразный',
      icon: <Shield className="w-6 h-6 text-green-500" />
    },
    {
      name: 'ISO 9001:2015',
      description: 'Система менеджмента качества',
      icon: <Star className="w-6 h-6 text-yellow-500" />
    },
    {
      name: 'Лицензия Минздрава',
      description: 'Лицензия на производство медицинского кислорода',
      icon: <FileText className="w-6 h-6 text-purple-500" />
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
              <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Гарантии и обязательства
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Мы гарантируем качество нашей продукции и несем полную ответственность за свои обязательства
          </p>
        </motion.div>

        {/* Main Guarantees */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Наши гарантии
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mr-4">
                    {guarantee.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {guarantee.title}
                      </h3>
                      <span className="bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full text-sm font-semibold">
                        {guarantee.period}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {guarantee.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {guarantee.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300 text-sm">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Warranty Terms */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Условия гарантии и возврата
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {warrantyTerms.map((term, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {term.title}
                </h3>
                <ul className="space-y-3">
                  {term.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300 text-sm">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certificates */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Сертификаты и лицензии
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-center mb-4">
                  {cert.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {cert.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {cert.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Важная информация
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Гарантия не распространяется на повреждения, вызванные:
              </p>
              <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Неправильным хранением или транспортировкой</li>
                <li>• Механическими повреждениями</li>
                <li>• Воздействием агрессивных сред</li>
                <li>• Нарушением инструкций по эксплуатации</li>
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
            Вопросы по гарантии?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Наши специалисты помогут разобраться с любыми вопросами по гарантии и возврату
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
              href="mailto:warranty@oxygenstore.ru"
              className="flex items-center justify-center bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors duration-200"
            >
              <Mail className="w-5 h-5 mr-2" />
              warranty@oxygenstore.ru
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Guarantees
