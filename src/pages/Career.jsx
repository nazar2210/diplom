import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNotifications } from '../contexts/NotificationContext'
import {
  Briefcase,
  Users,
  MapPin,
  GraduationCap,
  TrendingUp,
  Heart,
  Star,
  CheckCircle,
  X,
  Send
} from 'lucide-react'

const Career = () => {
  const { success, error } = useNotifications()
  const [applyPosition, setApplyPosition] = useState(null)
  const [applyForm, setApplyForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [applySending, setApplySending] = useState(false)

  useEffect(() => {
    if (!applyPosition) return
    const onKey = (e) => {
      if (e.key === 'Escape' && !applySending) setApplyPosition(null)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [applyPosition, applySending])

  const openApply = (position) => {
    setApplyForm({ name: '', email: '', phone: '', message: '' })
    setApplyPosition(position)
  }

  const closeApply = () => {
    if (!applySending) setApplyPosition(null)
  }

  const handleApplyChange = (e) => {
    const { name, value } = e.target
    setApplyForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleApplySubmit = async (e) => {
    e.preventDefault()
    if (!applyPosition) return
    const name = applyForm.name.trim()
    const email = applyForm.email.trim()
    if (!name || !email) {
      error('Укажите имя и email')
      return
    }
    setApplySending(true)
    await new Promise((r) => setTimeout(r, 1400))
    setApplySending(false)
    success('Отклик отправлен', {
      description: `Вакансия: ${applyPosition.title}. Мы свяжемся с вами по указанным контактам.`
    })
    setApplyPosition(null)
  }

  const positions = [
    {
      title: 'Менеджер по продажам',
      department: 'Отдел продаж',
      location: 'Москва',
      type: 'Полная занятость',
      salary: 'от 80 000 ₽',
      description: 'Работа с клиентами, консультации по продукции, оформление заказов',
      requirements: [
        'Опыт работы в продажах от 1 года',
        'Знание медицинского оборудования (желательно)',
        'Коммуникабельность и стрессоустойчивость',
        'Знание ПК на уровне пользователя'
      ]
    },
    {
      title: 'Логист',
      department: 'Отдел логистики',
      location: 'Москва',
      type: 'Полная занятость',
      salary: 'от 60 000 ₽',
      description: 'Планирование маршрутов доставки, контроль поставок, работа с перевозчиками',
      requirements: [
        'Опыт работы в логистике от 2 лет',
        'Знание Москвы и области',
        'Категория водительских прав B',
        'Ответственность и пунктуальность'
      ]
    },
    {
      title: 'Медицинский консультант',
      department: 'Отдел консультаций',
      location: 'Москва',
      type: 'Полная занятость',
      salary: 'от 90 000 ₽',
      description: 'Консультации по медицинскому оборудованию, работа с медучреждениями',
      requirements: [
        'Медицинское образование',
        'Опыт работы в медицине от 3 лет',
        'Знание медицинского оборудования',
        'Лицензия на медицинскую деятельность'
      ]
    },
    {
      title: 'Маркетолог',
      department: 'Отдел маркетинга',
      location: 'Москва',
      type: 'Полная занятость',
      salary: 'от 70 000 ₽',
      description: 'Разработка маркетинговых стратегий, работа с соцсетями, аналитика',
      requirements: [
        'Опыт работы в маркетинге от 2 лет',
        'Знание SMM и контекстной рекламы',
        'Креативность и аналитическое мышление',
        'Знание графических редакторов'
      ]
    }
  ]

  const benefits = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: 'Медицинская страховка',
      description: 'Полное медицинское обслуживание для сотрудников и их семей'
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-blue-500" />,
      title: 'Обучение и развитие',
      description: 'Курсы повышения квалификации и профессионального развития'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      title: 'Карьерный рост',
      description: 'Возможности для профессионального и карьерного роста'
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      title: 'Премии и бонусы',
      description: 'Система премирования за достижение целей и качественную работу'
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
              <Briefcase className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Карьера в OxygenStore
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Присоединяйтесь к нашей команде профессионалов и станьте частью инновационной компании
          </p>
        </motion.div>

        {/* Company Info */}
        <motion.div
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            О нашей компании
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Почему выбирают нас?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Стабильная и растущая компания на рынке медицинского оборудования
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Современные технологии и инновационные решения
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Дружный коллектив и комфортная рабочая атмосфера
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Возможности для профессионального роста и развития
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Наши ценности
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Users className="w-6 h-6 text-primary-600 mr-3" />
                  <span className="text-gray-600 dark:text-gray-300">
                    <strong>Команда:</strong> Работаем вместе для достижения общих целей
                  </span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-6 h-6 text-red-500 mr-3" />
                  <span className="text-gray-600 dark:text-gray-300">
                    <strong>Забота:</strong> Заботимся о здоровье и благополучии людей
                  </span>
                </div>
                <div className="flex items-center">
                  <Star className="w-6 h-6 text-yellow-500 mr-3" />
                  <span className="text-gray-600 dark:text-gray-300">
                    <strong>Качество:</strong> Стремимся к высочайшему качеству во всем
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Преимущества работы у нас
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Open Positions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Открытые вакансии
          </h2>
          <div className="space-y-6">
            {positions.map((position, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {position.location}
                      </span>
                      <span className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {position.type}
                      </span>
                      <span className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {position.salary}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openApply(position)}
                    className="mt-4 lg:mt-0 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                  >
                    Откликнуться
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {position.description}
                </p>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Требования:
                  </h4>
                  <ul className="space-y-2">
                    {position.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          className="mt-16 bg-primary-50 dark:bg-primary-900/20 rounded-xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Не нашли подходящую вакансию?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Отправьте нам свое резюме, и мы рассмотрим вас при появлении новых вакансий
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hr@oxygenstore.ru"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              hr@oxygenstore.ru
            </a>
            <a
              href="tel:+74951234567"
              className="bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors duration-200"
            >
              +7 (495) 123-45-67
            </a>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {applyPosition && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              role="presentation"
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeApply}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="career-apply-title"
              className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-800 sm:p-8"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h2
                    id="career-apply-title"
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    Отклик на вакансию
                  </h2>
                  <p className="mt-1 text-primary-600 dark:text-primary-400 font-medium">
                    {applyPosition.title}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {applyPosition.department} · {applyPosition.location}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeApply}
                  disabled={applySending}
                  className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50 dark:hover:bg-slate-700 dark:hover:text-gray-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="career-apply-name"
                    className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Имя и фамилия
                  </label>
                  <input
                    id="career-apply-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={applyForm.name}
                    onChange={handleApplyChange}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none ring-primary-500 focus:border-primary-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                    placeholder="Иван Иванов"
                  />
                </div>
                <div>
                  <label
                    htmlFor="career-apply-email"
                    className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    id="career-apply-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={applyForm.email}
                    onChange={handleApplyChange}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none ring-primary-500 focus:border-primary-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="career-apply-phone"
                    className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Телефон{' '}
                    <span className="font-normal text-gray-400">(необязательно)</span>
                  </label>
                  <input
                    id="career-apply-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={applyForm.phone}
                    onChange={handleApplyChange}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none ring-primary-500 focus:border-primary-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                    placeholder="+7 (999) 000-00-00"
                  />
                </div>
                <div>
                  <label
                    htmlFor="career-apply-message"
                    className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Сопроводительное письмо
                  </label>
                  <textarea
                    id="career-apply-message"
                    name="message"
                    rows={4}
                    value={applyForm.message}
                    onChange={handleApplyChange}
                    className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none ring-primary-500 focus:border-primary-500 focus:ring-2 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                    placeholder="Кратко о себе и опыте"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Демо-форма: данные не уходят на сервер. В продакшене отклик можно направить на{' '}
                  <a href="mailto:hr@oxygenstore.ru" className="text-primary-600 underline dark:text-primary-400">
                    hr@oxygenstore.ru
                  </a>
                  .
                </p>
                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeApply}
                    disabled={applySending}
                    className="rounded-lg border border-gray-300 px-5 py-2.5 text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50 dark:border-slate-600 dark:text-gray-200 dark:hover:bg-slate-700"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    disabled={applySending}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-primary-700 disabled:opacity-60"
                  >
                    <Send className="h-4 w-4" />
                    {applySending ? 'Отправка…' : 'Отправить отклик'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Career
