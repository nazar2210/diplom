import React, { useLayoutEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { FavoritesProvider } from './contexts/FavoritesContext'
import { ReviewsProvider } from './contexts/ReviewsContext'
import NotificationProvider from './contexts/NotificationContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Career from './pages/Career'
import News from './pages/News'
import Delivery from './pages/Delivery'
import Guarantees from './pages/Guarantees'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Checkout from './pages/Checkout'
import Favorites from './pages/Favorites'
import ProtectedRoute from './components/ProtectedRoute'
import CartModal from './components/CartModal'
import FavoritesModal from './components/FavoritesModal'

function App() {
  const location = useLocation()

  // Прокрутка наверх до отрисовки (в т.ч. после F5, иначе браузер может восстановить позицию внизу)
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [location.pathname, location.hash, location.search])

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
          <NotificationProvider>
            <ReviewsProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/career" element={<Career />} />
                <Route path="/news" element={<News />} />
                <Route path="/delivery" element={<Delivery />} />
                <Route path="/guarantees" element={<Guarantees />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/checkout" 
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
              <CartModal />
              <FavoritesModal />
            </Layout>
            </ReviewsProvider>
          </NotificationProvider>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
