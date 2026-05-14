import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo
} from 'react'

const FavoritesContext = createContext()

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}

function readFavoritesFromStorage() {
  try {
    const saved = localStorage.getItem('oxygen-store-favorites')
    if (!saved) return []
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const FavoritesProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState(() => readFavoritesFromStorage())
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('oxygen-store-favorites', JSON.stringify(favoriteItems))
  }, [favoriteItems])

  const isFavorite = useCallback(
    (productId) => favoriteItems.some((item) => item.id === productId),
    [favoriteItems]
  )

  const toggleFavorite = useCallback((product) => {
    setFavoriteItems((prev) => {
      const exists = prev.some((p) => p.id === product.id)
      if (exists) {
        return prev.filter((p) => p.id !== product.id)
      }
      const copy = { ...product }
      delete copy.quantity
      return [...prev, copy]
    })
  }, [])

  const removeFavorite = useCallback((productId) => {
    setFavoriteItems((prev) => prev.filter((p) => p.id !== productId))
  }, [])

  const getFavoriteCount = useCallback(
    () => favoriteItems.length,
    [favoriteItems]
  )

  const openFavorites = useCallback(() => {
    setIsFavoritesOpen(true)
  }, [])

  const closeFavorites = useCallback(() => {
    setIsFavoritesOpen(false)
  }, [])

  const value = useMemo(
    () => ({
      favoriteItems,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      getFavoriteCount,
      isFavoritesOpen,
      openFavorites,
      closeFavorites
    }),
    [
      favoriteItems,
      isFavorite,
      toggleFavorite,
      removeFavorite,
      getFavoriteCount,
      isFavoritesOpen,
      openFavorites,
      closeFavorites
    ]
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
