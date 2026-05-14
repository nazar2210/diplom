import React, { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

const NotificationContext = createContext()

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }, [])

  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random()
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      ...notification
    }
    
    setNotifications(prev => [...prev, newNotification])
    
    // Auto remove after duration
    setTimeout(() => {
      removeNotification(id)
    }, newNotification.duration)
  }, [removeNotification])

  const clearAll = useCallback(() => {
    setNotifications([])
  }, [])

  // Convenience methods
  const success = useCallback((message, options = {}) => {
    addNotification({ type: 'success', message, ...options })
  }, [addNotification])

  const error = useCallback((message, options = {}) => {
    addNotification({ type: 'error', message, ...options })
  }, [addNotification])

  const warning = useCallback((message, options = {}) => {
    addNotification({ type: 'warning', message, ...options })
  }, [addNotification])

  const info = useCallback((message, options = {}) => {
    addNotification({ type: 'info', message, ...options })
  }, [addNotification])

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotifications()

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const getStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
      case 'info':
      default:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={`max-w-sm w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg border p-4 ${getStyles(notification.type)}`}
          >
            <div className="flex items-start space-x-3">
              {getIcon(notification.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {notification.message}
                </p>
                {notification.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {notification.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="flex-shrink-0 p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors duration-200"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default NotificationProvider
