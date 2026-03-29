import { Heart } from 'lucide-react'
import { useFavorites } from '@/context/FavoritesContext'

export default function FavoriteButton({ id, size = 'sm' }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const saved = isFavorite(id)

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(id)
  }

  const iconSize = size === 'sm' ? 15 : 18
  const padding = size === 'sm' ? '0.375rem' : '0.5rem'

  return (
    <button
      onClick={handleClick}
      aria-label={saved ? 'Remove from favorites' : 'Add to favorites'}
      style={{
        padding,
        borderRadius: '9999px',
        transition: 'all 200ms',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: saved ? 'rgba(239,68,68,0.9)' : 'rgba(7,21,16,0.8)',
        color: saved ? '#fff' : '#d1d5db',
      }}
      onMouseEnter={e => {
        if (!saved) {
          e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.7)'
          e.currentTarget.style.color = '#fff'
        }
      }}
      onMouseLeave={e => {
        if (!saved) {
          e.currentTarget.style.backgroundColor = 'rgba(7,21,16,0.8)'
          e.currentTarget.style.color = '#d1d5db'
        }
      }}
    >
      <Heart size={iconSize} fill={saved ? 'currentColor' : 'none'} />
    </button>
  )
}
