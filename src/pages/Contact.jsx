import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send,
  CheckCircle,
  MessageCircle,
  Calendar,
  User,
  Building
} from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactInfo = [
    {
      icon: Phone,
      title: 'Телефон',
      value: '+7 (999) 123-45-67',
      description: 'Звонки принимаются с 9:00 до 18:00'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@oxygenstore.ru',
      description: 'Ответим в течение 2 часов'
    },
    {
      icon: MapPin,
      title: 'Адрес',
      value: 'г. Москва, ул. Примерная, д. 1',
      description: 'Офис и склад'
    },
    {
      icon: Clock,
      title: 'Часы работы',
      value: 'Пн-Пт: 9:00-18:00',
      description: 'Сб-Вс: по договоренности'
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Имитация отправки формы
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Сброс формы через 3 секунды
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      })
    }, 3000)
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-oxygen-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Свяжитесь с{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-oxygen-600">
                нами
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              У вас есть вопросы? Мы всегда готовы помочь! Свяжитесь с нами любым удобным способом, 
              и мы ответим в кратчайшие сроки.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Наши контакты
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Выберите удобный способ связи с нами
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-gray-50 dark:bg-slate-700 rounded-xl hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <info.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {info.title}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                  {info.value}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Отправить сообщение
              </h2>
              
              {isSubmitted ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Сообщение отправлено!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Мы получили ваше сообщение и свяжемся с вами в ближайшее время.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Имя *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                          placeholder="Ваше имя"
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
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                          placeholder="+7 (999) 123-45-67"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Компания
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                          placeholder="Название компании"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Тема сообщения *
                    </label>
                    <div className="relative">
                      <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                      >
                        <option value="">Выберите тему</option>
                        <option value="order">Заказ продукции</option>
                        <option value="consultation">Консультация</option>
                        <option value="delivery">Доставка</option>
                        <option value="support">Техническая поддержка</option>
                        <option value="partnership">Партнерство</option>
                        <option value="other">Другое</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Сообщение *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                      placeholder="Опишите ваш вопрос или запрос..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Отправить сообщение
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Additional Info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Map Placeholder */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Мы на карте
                </h3>
                <div className="h-64 bg-gradient-to-br from-primary-100 to-oxygen-100 dark:from-primary-900/20 dark:to-oxygen-900/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                    <p className="text-gray-600 dark:text-gray-300">
                      г. Москва, ул. Примерная, д. 1
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Часто задаваемые вопросы
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      Как быстро вы доставляете?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Доставка по Москве в течение 24 часов, по России - 2-5 дней.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      Какие документы нужны для заказа?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Для медицинских учреждений - лицензия, для частных лиц - паспорт.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      Можно ли заказать пробную партию?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Да, мы предоставляем пробные партии для новых клиентов.
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Часы работы
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Понедельник - Пятница</span>
                    <span className="font-medium text-gray-900 dark:text-white">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Суббота</span>
                    <span className="font-medium text-gray-900 dark:text-white">10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Воскресенье</span>
                    <span className="font-medium text-gray-900 dark:text-white">Выходной</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <p className="text-sm text-primary-600 dark:text-primary-400">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Экстренные заказы принимаются круглосуточно
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact




