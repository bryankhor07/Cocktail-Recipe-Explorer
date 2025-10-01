import { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider')
  }
  return context
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    // Initialize from localStorage
    try {
      const stored = localStorage.getItem('cocktail-favorites')
      return stored ? JSON.parse(stored) : []
    } catch {
      console.error('Failed to load favorites from localStorage')
      return []
    }
  })

  // Persist to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem('cocktail-favorites', JSON.stringify(favorites))
    } catch {
      console.error('Failed to save favorites to localStorage')
    }
  }, [favorites])

  const toggleFavorite = (drink) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.idDrink === drink.idDrink)
      if (exists) {
        return prev.filter((fav) => fav.idDrink !== drink.idDrink)
      } else {
        return [...prev, drink]
      }
    })
  }

  const isFavorite = (idDrink) => {
    return favorites.some((fav) => fav.idDrink === idDrink)
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}
