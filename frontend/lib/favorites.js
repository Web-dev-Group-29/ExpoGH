'use client'

const FAVORITES_KEY = 'expogh_favorites'

export function getFavorites() {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(FAVORITES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function toggleFavorite(id) {
  const current = getFavorites()
  const updated = current.includes(id)
    ? current.filter((fav) => fav !== id)
    : [...current, id]
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated))
  return updated
}

export function isFavorite(id) {
  return getFavorites().includes(id)
}
