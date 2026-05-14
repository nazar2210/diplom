import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Newspaper, 
  Calendar, 
  TrendingUp, 
  Award,
  Users,
  Globe,
  Heart,
  Star,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все')
  const [selectedNews, setSelectedNews] = useState(null)
  const [imageErrors, setImageErrors] = useState({})

  const handleImageError = (newsId) => {
    setImageErrors(prev => ({ ...prev, [newsId]: true }))
  }

  const news = [
    {
      id: 1,
      title: 'OxygenStore расширяет географию поставок',
      date: '15 декабря 2024',
      category: 'Компания',
      image: 'scale_1200.jpg',
      excerpt: 'Мы рады сообщить о расширении зоны доставки кислородных баллонов в новые регионы России.',
      content: 'Компания OxygenStore объявляет о расширении географии поставок медицинского и промышленного кислорода. Теперь наши услуги доступны в 15 новых регионах России, включая Сибирь и Дальний Восток. Это позволит нам обеспечить качественными кислородными баллонами еще больше медицинских учреждений и промышленных предприятий по всей стране.',
      featured: true
    },
    {
      id: 2,
      title: 'Новые стандарты качества медицинского кислорода',
      date: '10 декабря 2024',
      category: 'Качество',
      image: 'scale_1200.jpg',
      excerpt: 'Внедрены новые стандарты контроля качества медицинского кислорода.',
      content: 'Мы внедрили новые, более строгие стандарты контроля качества медицинского кислорода. Все наши баллоны теперь проходят дополнительную проверку на соответствие международным стандартам ISO 13485. Это гарантирует нашим клиентам высочайшее качество продукции.',
      featured: false
    },
    {
      id: 3,
      title: 'Партнерство с ведущими медицинскими центрами',
      date: '5 декабря 2024',
      category: 'Партнерство',
      image: 'IMG_healthcare_2_1_C6DPK5Q3.jpg',
      excerpt: 'Заключены договоры о сотрудничестве с крупнейшими медицинскими центрами Москвы.',
      content: 'OxygenStore заключила стратегические партнерские соглашения с пятью ведущими медицинскими центрами Москвы. Это позволит нам обеспечить стабильные поставки кислорода для критически важных медицинских процедур и улучшить качество медицинского обслуживания.',
      featured: false
    },
    {
      id: 4,
      title: 'Инновационные технологии в производстве кислорода',
      date: '1 декабря 2024',
      category: 'Технологии',
      image: 'technology.jpg',
      excerpt: 'Внедрены новые технологии производства кислорода для повышения эффективности.',
      content: 'Наша компания внедрила инновационные технологии производства кислорода, которые позволяют увеличить эффективность производства на 25% и снизить энергопотребление на 15%. Это делает наши продукты более доступными для клиентов.',
      featured: false
    },
    {
      id: 5,
      title: 'Экологическая ответственность OxygenStore',
      date: '25 ноября 2024',
      category: 'Экология',
      image: '9b405c4f2814dedff23c530bcfc3ce45.jpg',
      excerpt: 'Компания принимает меры по снижению экологического воздействия.',
      content: 'OxygenStore запустила программу экологической ответственности, направленную на снижение углеродного следа и переход на возобновляемые источники энергии. Мы инвестируем в экологически чистые технологии производства.',
      featured: false
    },
    {
      id: 6,
      title: 'Новые возможности онлайн-заказа',
      date: '20 ноября 2024',
      category: 'Сервис',
      image: 'i.jpg',
      excerpt: 'Улучшен функционал онлайн-заказа кислородных баллонов.',
      content: 'Мы обновили систему онлайн-заказа, добавив новые возможности: отслеживание заказа в реальном времени, уведомления о статусе доставки, возможность изменения заказа до отправки. Это делает процесс заказа еще более удобным для наших клиентов.',
      featured: false
    }
  ]

  const categories = ['Все', 'Компания', 'Качество', 'Партнерство', 'Технологии', 'Экология', 'Сервис']

  const filteredNews = selectedCategory === 'Все' 
    ? news 
    : news.filter(item => item.category === selectedCategory)

  const handleReadMore = (newsItem) => {
    setSelectedNews(newsItem)
  }

  const handleBackToList = () => {
    setSelectedNews(null)
    setSelectedCategory('Все') // Сбрасываем фильтр при возврате
    // Принудительно остаемся на странице новостей
    window.history.pushState(null, '', '/news')
  }

  // Если выбрана конкретная новость, показываем детальную страницу
  if (selectedNews) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <motion.button
            onClick={handleBackToList}
            className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 mb-8"
            whileHover={{ x: -5 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Назад к новостям
          </motion.button>

          {/* Article */}
          <motion.article
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Article Image */}
            <div className="relative h-64 md:h-96">
              <img
                src={selectedNews.image}
                alt={selectedNews.title}
                className="w-full h-full object-cover"
                onError={() => handleImageError(selectedNews.id)}
              />
              {imageErrors[selectedNews.id] && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 flex items-center justify-center">
                  <div className="text-center">
                    <Newspaper className="w-16 h-16 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                    <p className="text-primary-600 dark:text-primary-400 font-semibold">Новость</p>
                  </div>
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className="bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full text-sm font-semibold">
                  {selectedNews.category}
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-8">
              <div className="flex items-center mb-4 text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4 mr-2" />
                {selectedNews.date}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {selectedNews.title}
              </h1>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  {selectedNews.content}
                </p>
                
                {/* Extended content for detailed view */}
                <div className="mt-8 space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Подробности
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {selectedNews.category === 'Компания' && 
                      'Это расширение позволит нам обслуживать более 500 новых клиентов ежемесячно и увеличить объемы поставок на 40%. Мы инвестировали в новое оборудование и обучение персонала для обеспечения высокого качества обслуживания в новых регионах.'
                    }
                    {selectedNews.category === 'Качество' && 
                      'Новые стандарты включают трехэтапную проверку качества: визуальный осмотр, проверка герметичности и анализ состава газа. Каждый баллон получает уникальный сертификат качества с QR-кодом для отслеживания.'
                    }
                    {selectedNews.category === 'Партнерство' && 
                      'Среди наших новых партнеров - Центральная клиническая больница, Институт скорой помощи им. Склифосовского и другие ведущие медицинские учреждения. Это партнерство обеспечит стабильные поставки кислорода для экстренных случаев.'
                    }
                    {selectedNews.category === 'Технологии' && 
                      'Новые технологии включают использование мембранного разделения воздуха, криогенную дистилляцию и автоматизированные системы контроля качества. Это позволит нам производить кислород с чистотой до 99.9%.'
                    }
                    {selectedNews.category === 'Экология' && 
                      'Мы переходим на солнечную энергию для питания наших производственных мощностей и внедряем систему переработки отходов. К 2025 году мы планируем достичь углеродной нейтральности.'
                    }
                    {selectedNews.category === 'Сервис' && 
                      'Новая система включает мобильное приложение для отслеживания заказов, чат-бот для консультаций и интеграцию с популярными мессенджерами. Клиенты могут получать уведомления о статусе заказа в реальном времени.'
                    }
                  </p>
                  
                  <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Что это означает для наших клиентов?
                    </h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-start">
                        <Star className="w-4 h-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                        Улучшенное качество продукции и услуг
                      </li>
                      <li className="flex items-start">
                        <Star className="w-4 h-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                        Более быстрая и надежная доставка
                      </li>
                      <li className="flex items-start">
                        <Star className="w-4 h-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                        Расширенные возможности для заказа
                      </li>
                      <li className="flex items-start">
                        <Star className="w-4 h-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                        Экологически ответственный подход
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    )
  }

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
              <Newspaper className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Новости и события
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Следите за последними новостями компании OxygenStore и индустрии медицинского кислорода
          </p>
        </motion.div>

        {/* Featured News */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Главная новость
          </h2>
          {news.filter(item => item.featured).map((item) => (
            <div key={item.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 md:h-full object-cover"
                    onError={() => handleImageError(item.id)}
                  />
                  {imageErrors[item.id] && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 flex items-center justify-center">
                      <div className="text-center">
                        <Newspaper className="w-16 h-16 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
                        <p className="text-primary-600 dark:text-primary-400 font-semibold">Новость</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center mb-4">
                    <span className="bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full text-sm font-semibold">
                      {item.category}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-4">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {item.content}
                  </p>
                  <button 
                    onClick={() => handleReadMore(item)}
                    className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                  >
                    Читать полностью
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Categories */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-2 justify-center px-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 dark:hover:border-primary-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* News Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {filteredNews.filter(item => !item.featured).map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
                onError={() => handleImageError(item.id)}
              />
              {imageErrors[item.id] && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 flex items-center justify-center">
                  <div className="text-center">
                    <Newspaper className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-1" />
                    <p className="text-primary-600 dark:text-primary-400 font-semibold text-sm">Новость</p>
                  </div>
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 px-2 py-1 rounded-full text-xs font-semibold">
                    {item.category}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs ml-3">
                    {item.date}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {item.excerpt}
                </p>
                <button 
                  onClick={() => handleReadMore(item)}
                  className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 text-sm"
                >
                  Читать далее
                  <ArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter */}
        <motion.div
          className="mt-16 bg-primary-50 dark:bg-primary-900/20 rounded-xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Подпишитесь на новости
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Получайте последние новости компании и индустрии прямо на вашу почту
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
            />
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors duration-200">
              Подписаться
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default News
