import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react'
import { defaultProducts } from '../data/defaultProducts'

const STORAGE_KEY = 'oxygen-store-products'

const ProductsContext = createContext()

export const useProducts = () => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}

const loadProducts = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch {
    /* ignore */
  }
  return defaultProducts
}

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(loadProducts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
    }
  }, [products, loading])

  const getNextId = useCallback(() => {
    const maxId = products.reduce((max, p) => Math.max(max, p.id || 0), 0)
    return maxId + 1
  }, [products])

  const addProduct = useCallback((productData) => {
    const id = getNextId()
    const newProduct = {
      id,
      rating: 0,
      reviews: 0,
      inStock: true,
      isNew: true,
      originalPrice: productData.price,
      ...productData
    }
    setProducts((prev) => [...prev, newProduct])
    return newProduct
  }, [getNextId])

  const updateProduct = useCallback((id, productData) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...productData, id } : p))
    )
  }, [])

  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const resetProducts = useCallback(() => {
    setProducts(defaultProducts)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts))
  }, [])

  const value = {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProducts
  }

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}
