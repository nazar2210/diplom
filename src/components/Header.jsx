import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useFavorites } from '../contexts/FavoritesContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import {
  Sun,
  Moon,
  Menu,
  X,
  User,
  LogOut,
  ShoppingCart,
  Heart
} from 'lucide-react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const { getTotalItems, openCart, closeCart } = useCart()
  const { getFavoriteCount, openFavorites, closeFavorites } = useFavorites()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isMobileMenuOpen])

  const navItems = [
    { path: '/', label: 'Главная' },
    { path: '/catalog', label: 'Каталог' },
    { path: '/favorites', label: 'Избранное' },
    { path: '/about', label: 'О нас' },
    { path: '/career', label: 'Карьера' },
    { path: '/news', label: 'Новости' },
    { path: '/delivery', label: 'Доставка' },
    { path: '/guarantees', label: 'Гарантии' },
    { path: '/contact', label: 'Контакты' },
    { path: '/faq', label: 'FAQ' }
  ]

  const handleLogout = () => {
    logout()
    setIsMobileMenuOpen(false)
  }

  const handleProfileClick = () => {
    navigate('/profile')
    setIsMobileMenuOpen(false)
  }

  const headerBg =
    isScrolled || isMobileMenuOpen
      ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg'
      : 'max-lg:bg-white/95 max-lg:dark:bg-slate-900/95 max-lg:backdrop-blur-md max-lg:shadow-sm lg:bg-transparent'

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-area-top ${headerBg}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 h-14 sm:h-16 min-w-0">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="min-w-0 shrink">
              <Link
                to="/"
                className="flex items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                <motion.div
                  className="relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 shadow-md shadow-primary-500/30 dark:shadow-primary-400/20"
                  animate={{
                    scale: [1, 1.06, 1],
                    boxShadow: [
                      '0 4px 14px -2px rgba(14, 165, 233, 0.35)',
                      '0 6px 22px -2px rgba(56, 189, 248, 0.45)',
                      '0 4px 14px -2px rgba(14, 165, 233, 0.35)'
                    ]
                  }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.1, rotate: -4, transition: { type: 'spring', stiffness: 400, damping: 18 } }}
                >
                  <span className="relative z-10 text-xs sm:text-sm font-bold leading-none text-white">
                    O<sub className="text-[0.68em] align-baseline font-bold">2</sub>
                  </span>
                  <motion.span
                    className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/0 via-white/25 to-white/0"
                    animate={{ x: ['-100%', '120%'] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'linear', repeatDelay: 1.2 }}
                  />
                </motion.div>
                <motion.span
                  className="hidden min-[380px]:inline-block truncate bg-gradient-to-r from-primary-600 via-sky-500 to-primary-600 bg-clip-text text-lg sm:text-2xl font-bold text-transparent dark:from-primary-300 dark:via-sky-300 dark:to-primary-300"
                  style={{ backgroundSize: '220% 100%' }}
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  OxygenStore
                </motion.span>
              </Link>
            </motion.div>

            <nav className="hidden lg:flex items-center justify-center flex-1 max-w-4xl mx-4 xl:mx-8">
              <div className="flex items-center justify-between w-full">
                {navItems.map((item) => (
                  <motion.div
                    key={item.path}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={item.path}
                      className={`relative px-2 py-2 text-xs font-medium transition-colors duration-200 whitespace-nowrap ${
                        location.pathname === item.path
                          ? 'text-primary-600 dark:text-primary-400'
                          : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                      }`}
                    >
                      {item.label}
                      {location.pathname === item.path && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
                          layoutId="activeTab"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 shrink-0">
              <motion.button
                onClick={toggleTheme}
                className="p-1.5 sm:p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isDark ? 'Светлая тема' : 'Тёмная тема'}
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => {
                  closeCart()
                  openFavorites()
                }}
                className="p-1.5 sm:p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Избранное"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
                {getFavoriteCount() > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] sm:text-xs rounded-full min-w-[1.1rem] sm:min-w-[1.25rem] h-4 sm:h-5 px-0.5 sm:px-1 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  >
                    {getFavoriteCount()}
                  </motion.span>
                )}
              </motion.button>

              <motion.button
                type="button"
                onClick={() => {
                  closeFavorites()
                  openCart()
                }}
                className="p-1.5 sm:p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Корзина"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
                {getTotalItems() > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-primary-500 text-white text-[10px] sm:text-xs rounded-full min-w-[1.1rem] sm:min-w-[1.25rem] h-4 sm:h-5 px-0.5 sm:px-1 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  >
                    {getTotalItems()}
                  </motion.span>
                )}
              </motion.button>

              {user ? (
                <div className="hidden sm:flex items-center gap-1.5">
                  <motion.button
                    onClick={handleProfileClick}
                    className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <User className="w-4 h-4 text-primary-600 dark:text-primary-400 shrink-0" />
                    <span className="hidden md:inline text-sm font-medium text-primary-600 dark:text-primary-400 max-w-[7rem] truncate">
                      {user.name}
                    </span>
                  </motion.button>
                  <motion.button
                    onClick={handleLogout}
                    className="p-1.5 sm:p-2 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Выйти"
                  >
                    <LogOut className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </motion.button>
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    Войти
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                  >
                    Регистрация
                  </Link>
                </div>
              )}

              <motion.button
                type="button"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                className="lg:hidden p-1.5 sm:p-2 rounded-lg bg-primary-50 dark:bg-primary-900/30 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5 text-primary-700 dark:text-primary-300" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5 text-primary-700 dark:text-primary-300" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 top-14 sm:top-16 z-40 bg-black/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Закрыть меню"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="fixed top-14 sm:top-16 left-0 right-0 z-50 lg:hidden max-h-[calc(100dvh-3.5rem)] sm:max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 shadow-xl"
              aria-label="Мобильное меню"
            >
              <div className="container mx-auto px-3 sm:px-6 py-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 text-base font-medium rounded-xl transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                {user ? (
                  <div className="pt-3 mt-2 border-t border-gray-200 dark:border-gray-700 space-y-1 sm:hidden">
                    <button
                      type="button"
                      onClick={handleProfileClick}
                      className="flex w-full items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors duration-200"
                    >
                      <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      {user.name}
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-3 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors duration-200"
                    >
                      <LogOut className="w-5 h-5" />
                      Выйти
                    </button>
                  </div>
                ) : (
                  <div className="pt-3 mt-2 border-t border-gray-200 dark:border-gray-700 space-y-2 lg:hidden">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors duration-200 text-center"
                    >
                      Войти
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white text-base font-medium rounded-xl transition-colors duration-200 text-center"
                    >
                      Регистрация
                    </Link>
                  </div>
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
