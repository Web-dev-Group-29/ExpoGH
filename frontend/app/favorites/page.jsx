'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { destinations } from '@/lib/data'
import { getFavorites } from '@/lib/favorites'
import FavoriteButton from '@/components/FavoriteButton'

const THUMBNAIL_IDS = [
  'kakum-national-park','aburi-botanical-gardens','lake-volta','boti-falls',
  'nzulenzu','cape-coast-castle','mole-national-park','labadi-beach',
]

function DestCard({ dest }) {
  return (
    <div className="fav-card">
      <div className="fav-card-img">
        <Image src={dest.image} alt={dest.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
        <div className="fav-card-gradient" />
        <span className="fav-card-badge">{dest.category}</span>
        <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>
          <FavoriteButton id={dest.id} />
        </div>
      </div>
      <div className="fav-card-body">
        <h3 className="fav-card-name">{dest.name}</h3>
        <p className="fav-card-loc">{dest.location}</p>
        <Link href={`/destinations/${dest.id}`} className="fav-card-btn">View Destination</Link>
      </div>
    </div>
  )
}

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setFavoriteIds(getFavorites()); setMounted(true)
    const onStorage = () => setFavoriteIds(getFavorites())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const favDestinations = destinations.filter((d) => favoriteIds.includes(d.id))
  const thumbDests = THUMBNAIL_IDS.map((id) => destinations.find((d) => d.id === id)).filter(Boolean)
  const verticalOffsets = [0, -12, 8, -6, 14, -10, 4, -8]

  return (
    <div className="fav-wrapper">
      {/* Hero */}
      <section className="fav-hero">
        <Image src="/assets/tree-hero.jpg" alt="Majestic glowing tree in a vast Ghana landscape" fill priority className="object-cover" style={{ objectPosition: 'center' }} />
        <div className="fav-hero-gradient" />
        <div className="fav-thumbs">
          <div className="fav-thumbs-inner">
            {thumbDests.map((dest, i) => (
              <Link key={dest.id} href={`/destinations/${dest.id}`} className="fav-thumb" style={{ marginBottom: verticalOffsets[i] ?? 0 }}>
                <Image src={dest.image} alt={dest.name} fill className="object-cover" sizes="80px" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Saved Favorites */}
      <section className="fav-section">
        <div className="fav-section-inner">
          {mounted && favDestinations.length > 0 ? (
            <>
              <h2 className="fav-title">Your Saved Destinations</h2>
              <div className="fav-grid">
                {favDestinations.map((dest) => (<DestCard key={dest.id} dest={dest} />))}
              </div>
            </>
          ) : mounted ? (
            <div className="fav-empty">
              <h2 className="fav-empty-title">No saved destinations yet</h2>
              <p className="fav-empty-text">Tap the ♡ on any destination to save it here for quick access.</p>
              <Link href="/regions" className="fav-empty-btn">Explore Destinations</Link>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  )
}
