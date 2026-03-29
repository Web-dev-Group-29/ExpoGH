
import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { useData } from '@/context/DataContext'
import FavoriteButton from '@/components/FavoriteButton'

const THUMBNAIL_IDS = [
  'kakum-national-park','aburi-botanical-gardens','lake-volta','boti-falls',
  'nzulenzu','cape-coast-castle','mole-national-park','labadi-beach',
]

function DestCard({ dest }) {
  return (
    <div className="fav-card">
      <div className="fav-card-img">
        <img src={dest.image} alt={dest.name} className="fill-img" />
        <div className="fav-card-gradient" />
        <span className="fav-card-badge">{dest.category}</span>
        <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>
          <FavoriteButton id={dest.id} />
        </div>
      </div>
      <div className="fav-card-body">
        <h3 className="fav-card-name">{dest.name}</h3>
        <p className="fav-card-loc">{dest.location}</p>
        <Link to={`/destinations/${dest.id}`} className="fav-card-btn">View Destination</Link>
      </div>
    </div>
  )
}

import { useFavorites } from '@/context/FavoritesContext'

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const { destinations, loading } = useData()

  if (loading) return <div className="p-20 text-center">Loading Favorites...</div>

  const favDestinations = destinations?.filter((d) => favorites.includes(d.id)) || []
  const thumbDests = THUMBNAIL_IDS.map((id) => destinations.find((d) => d.id === id)).filter(Boolean)
  const verticalOffsets = [0, -12, 8, -6, 14, -10, 4, -8]

  return (
    <div className="fav-wrapper">
      {/* Hero */}
      <section className="fav-hero">
        <img src="/assets/tree-hero.jpg" alt="Majestic glowing tree in a vast Ghana landscape" className="fill-img" style={{ objectPosition: 'center' }} />
        <div className="fav-hero-gradient" />
        <div className="fav-thumbs">
          <div className="fav-thumbs-inner">
            {thumbDests.map((dest, i) => (
              <Link key={dest.id} to={`/destinations/${dest.id}`} className="fav-thumb" style={{ marginBottom: verticalOffsets[i] ?? 0 }}>
                <img src={dest.image} alt={dest.name} className="fill-img" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Saved Favorites */}
      <section className="fav-section">
        <div className="fav-section-inner">
          {favDestinations.length > 0 ? (
            <>
              <h2 className="fav-title">Your Saved Destinations</h2>
              <div className="fav-grid">
                {favDestinations.map((dest) => (<DestCard key={dest.id} dest={dest} />))}
              </div>
            </>
          ) : (
            <div className="fav-empty">
              <h2 className="fav-empty-title">No saved destinations yet</h2>
              <p className="fav-empty-text">Tap the ♡ on any destination to save it here for quick access.</p>
              <Link to="/regions" className="fav-empty-btn">Explore Destinations</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
