import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock
} from 'lucide-react'

const Footer = () => {

  const footerLinks = {
    company: [
      { label: 'О компании', path: '/about' },
      { label: 'Карьера', path: '/career' },
      { label: 'Новости', path: '/news' }
    ],
    products: [
      { label: 'Каталог товаров', path: '/catalog' },
      { label: 'Медицинский кислород', path: '/catalog?category=medical' },
      { label: 'Промышленный кислород', path: '/catalog?category=industrial' },
      { label: 'Портативные баллоны', path: '/catalog?category=portable' }
    ],
    support: [
      { label: 'Контакты', path: '/contact' },
      { label: 'Доставка', path: '/delivery' },
      { label: 'Гарантии', path: '/guarantees' },
      { label: 'FAQ', path: '/faq' }
    ]
  }

  // Убираем социальные сети, так как они ведут на несуществующие ссылки

  return (
    <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">O₂</span>
              </div>
              <span>OxygenStore</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Ваш надежный поставщик качественных баллонов с кислородом для медицинских и промышленных целей.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">+7 (999) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">info@oxygenstore.ru</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">г. Москва, ул. Примерная, д. 1</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Пн-Пт: 9:00-18:00</span>
              </div>
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Компания</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Продукция</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Поддержка</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 OxygenStore. Все права защищены.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer



