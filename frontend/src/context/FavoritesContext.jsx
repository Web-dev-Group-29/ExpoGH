
import { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('expogh_favorites')
      if (saved) {
        setFavorites(JSON.parse(saved))
      }
    } catch (e) {
      console.error('Failed to load favorites', e)
    }
  }, [])

  // Persist to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('expogh_favorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (id) => {
    if (!favorites.includes(id)) {
      setFavorites([...favorites, id])
    }
  }

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(favId => favId !== id))
  }

  const isFavorite = (id) => favorites.includes(id)

  const toggleFavorite = (id) => {
    if (isFavorite(id)) {
      removeFavorite(id)
    } else {
      addFavorite(id)
    }
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
