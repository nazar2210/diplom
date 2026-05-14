import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Проверяем сохраненные данные пользователя
    const savedUser = localStorage.getItem('oxygen-store-user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Простая проверка для демо
      if (email === 'admin@oxygenstore.ru' && password === 'admin123') {
        const defaultOrders = [
          {
            id: 1,
            date: '2024-01-15',
            total: 15000,
            status: 'delivered',
            items: [
              {
                id: 1,
                name: 'Баллон кислорода 10л',
                quantity: 2,
                price: 7500,
                image: '/medical-oxygen.jpg',
                category: 'medical'
              }
            ]
          }
        ]
        let orders = defaultOrders
        try {
          const raw = localStorage.getItem('oxygen-store-user')
          if (raw) {
            const prev = JSON.parse(raw)
            if (prev.email === email && Array.isArray(prev.orders) && prev.orders.length > 0) {
              orders = prev.orders
            }
          }
        } catch {
          /* ignore */
        }
        const userData = {
          id: 1,
          email,
          name: 'Администратор',
          phone: '+7 (999) 123-45-67',
          address: 'г. Москва, ул. Примерная, д. 1',
          orders
        }
        setUser(userData)
        localStorage.setItem('oxygen-store-user', JSON.stringify(userData))
        return { success: true }
      } else {
        return { success: false, error: 'Неверный email или пароль' }
      }
    } catch (error) {
      return { success: false, error: 'Ошибка сервера' }
    }
  }

  const register = async (userData) => {
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newUser = {
        id: Date.now(),
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        address: userData.address,
        orders: []
      }
      
      setUser(newUser)
      localStorage.setItem('oxygen-store-user', JSON.stringify(newUser))
      return { success: true }
    } catch (error) {
      return { success: false, error: 'Ошибка регистрации' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('oxygen-store-user')
  }

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData }
    setUser(updatedUser)
    localStorage.setItem('oxygen-store-user', JSON.stringify(updatedUser))
  }

  const addOrder = useCallback((order) => {
    setUser((prev) => {
      if (!prev) return prev
      const nextOrders = [order, ...(prev.orders || [])]
      const updatedUser = { ...prev, orders: nextOrders }
      localStorage.setItem('oxygen-store-user', JSON.stringify(updatedUser))
      return updatedUser
    })
  }, [])

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    addOrder
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}



