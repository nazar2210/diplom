import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, HelpCircle, Phone, Mail, Clock } from 'lucide-react'

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set())

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  const faqData = [
    {
      question: "Какой срок доставки кислородных баллонов?",
      answer: "Доставка по Москве осуществляется в течение 1-2 рабочих дней. По Московской области - 2-3 дня. В другие регионы России - от 3 до 7 дней в зависимости от удаленности."
    },
    {
      question: "Какие документы нужны для покупки медицинского кислорода?",
      answer: "Для покупки медицинского кислорода необходимо предоставить лицензию на медицинскую деятельность или справку от медицинского учреждения. Также потребуется паспорт и документы, подтверждающие необходимость использования кислорода."
    },
    {
      question: "Можно ли вернуть товар, если он не подошел?",
      answer: "Да, вы можете вернуть товар в течение 14 дней с момента покупки при условии сохранения товарного вида и упаковки. Возврат возможен только для товаров, не бывших в употреблении."
    },
    {
      question: "Как хранить кислородные баллоны?",
      answer: "Кислородные баллоны следует хранить в сухом, хорошо проветриваемом помещении при температуре от -40°C до +60°C. Избегайте прямых солнечных лучей и источников тепла. Баллоны должны стоять вертикально и быть закреплены."
    },
    {
      question: "Какая чистота кислорода в ваших баллонах?",
      answer: "Медицинский кислород имеет чистоту 99.5%, промышленный - 99.2%. Все наши баллоны проходят строгий контроль качества и имеют соответствующие сертификаты."
    },
    {
      question: "Предоставляете ли вы оборудование для использования кислорода?",
      answer: "Да, у нас есть широкий ассортимент оборудования: регуляторы давления, маски, канюли, концентраторы кислорода и другое медицинское оборудование."
    },
    {
      question: "Есть ли скидки при оптовой покупке?",
      answer: "Да, мы предоставляем скидки при покупке от 10 баллонов. Размер скидки зависит от объема заказа и обсуждается индивидуально с менеджером."
    },
    {
      question: "Как оформить заказ?",
      answer: "Вы можете оформить заказ через наш сайт, добавив товары в корзину и пройдя процедуру оформления заказа, или связаться с нами по телефону для консультации и оформления заказа."
    },
    {
      question: "Какие способы оплаты вы принимаете?",
      answer: "Мы принимаем оплату наличными при получении, банковскими картами, безналичным расчетом для юридических лиц. Также возможна оплата через банковский перевод."
    },
    {
      question: "Предоставляете ли вы гарантию на товары?",
      answer: "Да, на все наши товары предоставляется гарантия качества. Гарантийный срок зависит от типа товара и составляет от 6 месяцев до 2 лет."
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
              <HelpCircle className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Часто задаваемые вопросы
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ответы на самые популярные вопросы о кислородных баллонах, доставке и условиях покупки
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {faqData.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openItems.has(index) ? (
                      <ChevronUp className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openItems.has(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Contact Section */}
        <motion.div
          className="mt-16 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Не нашли ответ на свой вопрос?
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Свяжитесь с нами, и мы обязательно поможем вам
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="text-center p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Телефон
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                +7 (495) 123-45-67
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Пн-Пт: 9:00-18:00
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Email
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                info@oxygenstore.ru
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ответим в течение часа
              </p>
            </motion.div>

            <motion.div
              className="text-center p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Онлайн чат
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Круглосуточно
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Мгновенные ответы
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FAQ
