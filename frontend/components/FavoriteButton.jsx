'use client'

import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toggleFavorite, isFavorite } from '@/lib/favorites'

export default function FavoriteButton({ id, size = 'sm' }) {
  const [saved, setSaved] = useState(false)

  useEffect(() => { setSaved(isFavorite(id)) }, [id])

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const updated = toggleFavorite(id)
    setSaved(updated.includes(id))
  }

  const iconSize = size === 'sm' ? 15 : 18
  const pad = size === 'sm' ? 'p-1.5' : 'p-2'

  return (
    <button
      onClick={handleClick}
      aria-label={saved ? 'Remove from favorites' : 'Add to favorites'}
      className={`${pad} rounded-full transition-all duration-200 ${
        saved
          ? 'bg-red-500/90 text-white'
          : 'bg-[#071510]/80 text-gray-300 hover:bg-red-500/70 hover:text-white'
      }`}
    >
      <Heart size={iconSize} fill={saved ? 'currentColor' : 'none'} />
    </button>
  )
}
