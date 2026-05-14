import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User,
  Phone,
  MapPin,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Zap
} from 'lucide-react'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Очищаем ошибку при изменении полей
    if (error) setError('')
  }

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      setError('Пожалуйста, введите ваше имя')
      return false
    }
    if (!formData.email.trim()) {
      setError('Пожалуйста, введите email')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Пожалуйста, введите корректный email')
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (!formData.phone.trim()) {
      setError('Пожалуйста, введите номер телефона')
      return false
    }
    if (!formData.address.trim()) {
      setError('Пожалуйста, введите адрес')
      return false
    }
    return true
  }

  const validateStep3 = () => {
    if (!formData.password) {
      setError('Пожалуйста, введите пароль')
      return false
    }
    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают')
      return false
    }
    return true
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    }
  }

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateStep3()) return
    
    setIsLoading(true)
    setError('')

    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      })
      
      if (result.success) {
        navigate('/profile')
      } else {
        setError(result.error || 'Ошибка регистрации')
      }
    } catch (err) {
      setError('Произошла ошибка. Попробуйте еще раз.')
    } finally {
      setIsLoading(false)
    }
  }

  const steps = [
    { number: 1, title: 'Личная информация', description: 'Основные данные' },
    { number: 2, title: 'Контактные данные', description: 'Телефон и адрес' },
    { number: 3, title: 'Безопасность', description: 'Пароль' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-oxygen-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mx-auto w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mb-4"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-white font-bold text-xl">O₂</span>
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Регистрация
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Создайте аккаунт в OxygenStore
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            {steps.map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  step >= stepItem.number
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}>
                  {step > stepItem.number ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    stepItem.number
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    step > stepItem.number
                      ? 'bg-primary-600'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {steps[step - 1].title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {steps[step - 1].description}
            </p>
          </div>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Полное имя *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all duration-200"
                        placeholder="Введите ваше имя"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email адрес *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all duration-200"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Contact Information */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Номер телефона *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all duration-200"
                        placeholder="+7 (999) 123-45-67"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Адрес *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all duration-200"
                        placeholder="Введите ваш адрес"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Password */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Пароль *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all duration-200"
                        placeholder="Введите пароль"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Подтвердите пароль *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all duration-200"
                        placeholder="Подтвердите пароль"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Требования к паролю:
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li className={`flex items-center ${formData.password.length >= 6 ? 'text-green-600 dark:text-green-400' : ''}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${formData.password.length >= 6 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                        Минимум 6 символов
                      </li>
                      <li className={`flex items-center ${formData.password === formData.confirmPassword && formData.password ? 'text-green-600 dark:text-green-400' : ''}`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${formData.password === formData.confirmPassword && formData.password ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                        Пароли совпадают
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
                >
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                    <span className="text-sm text-red-700 dark:text-red-300">{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              {step > 1 && (
                <motion.button
                  type="button"
                  onClick={handlePrev}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 font-medium rounded-lg transition-colors duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Назад
                </motion.button>
              )}

              {step < 3 ? (
                <motion.button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Далее
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="ml-auto px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200 flex items-center"
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Регистрация...
                    </>
                  ) : (
                    <>
                      Зарегистрироваться
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Уже есть аккаунт?{' '}
              <Link
                to="/login"
                className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors duration-200"
              >
                Войти
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
            <Zap className="w-6 h-6 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-300">Быстрая регистрация</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
            <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-300">Безопасность</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
            <ArrowRight className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-300">Удобство</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Register




