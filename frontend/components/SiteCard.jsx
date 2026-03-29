'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, X, ExternalLink, Clock, CreditCard, Star, Calendar, Sparkles } from 'lucide-react'
import FavoriteButton from './FavoriteButton'
import locationsDB from '@/lib/locationsdb.json'

export default function SiteCard({ destination, showFavorite = true }) {
  const [showModal, setShowModal] = useState(false)
  const locationInfo = locationsDB.find((loc) => loc.id === destination.id)

  return (
    <>
      <article className="site-card">
        <div className="site-card-img" onClick={() => setShowModal(true)}>
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="site-card-gradient" />
          <span className="site-card-badge">{destination.category}</span>
          {showFavorite && (
            <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>
              <FavoriteButton id={destination.id} />
            </div>
          )}
        </div>
        <div className="site-card-body">
          <h3 className="site-card-title line-clamp-1">{destination.name}</h3>
          <p className="site-card-location">
            <MapPin size={10} /> {destination.location}
          </p>
          <p className="site-card-desc line-clamp-2">{destination.shortDescription}</p>
          <Link href={`/destinations/${destination.id}`} className="site-card-btn">
            Explore
          </Link>
        </div>
      </article>

      {/* Pop-up Extended Menu */}
      {showModal && (
        <div className="site-modal-overlay">
          <div className="site-modal-backdrop" onClick={() => setShowModal(false)} />
          <div className="site-modal animate-fade-zoom">
            <button onClick={() => setShowModal(false)} className="site-modal-close">
              <X size={16} />
            </button>
            <div className="site-modal-image">
              <Image src={destination.image} alt={destination.name} fill className="object-cover" />
              <div className="site-modal-image-gradient" />
            </div>

            <div className="site-modal-body">
              <span className="site-modal-category">{destination.category}</span>
              <h2 className="site-modal-name">{destination.name}</h2>
              <p className="site-modal-loc">
                <MapPin size={14} /> {destination.location}
              </p>

              <div className="site-modal-scroll custom-scrollbar">
                <div>
                  <h3 className="site-modal-section-title">
                    <Sparkles size={14} style={{ color: 'var(--accent)' }} /> Overview
                  </h3>
                  <p className="site-modal-overview">{destination.shortDescription}</p>
                </div>

                <div className="site-modal-meta-grid">
                  <div>
                    <h3 className="site-modal-meta-label">
                      <Calendar size={12} style={{ color: 'var(--accent)' }} /> Best Time
                    </h3>
                    <p className="site-modal-meta-value">{destination.bestTime}</p>
                  </div>
                  <div>
                    <h3 className="site-modal-meta-label">
                      <Star size={12} style={{ color: 'var(--accent)' }} /> Entry Fee
                    </h3>
                    <p className="site-modal-meta-value">{destination.entryFee || 'Free/Varies'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="site-modal-section-title">
                    <MapPin size={14} style={{ color: 'var(--accent)' }} /> Activities
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {destination.activities.map(act => (
                      <span key={act} className="site-modal-tag">{act}</span>
                    ))}
                  </div>
                </div>

                {locationInfo && (
                  <div className="site-modal-info-box">
                    <div className="site-modal-info-row">
                      <Clock size={16} style={{ color: 'var(--accent)', marginTop: '0.125rem' }} />
                      <div>
                        <p className="site-modal-info-label">Opening Hours</p>
                        <p className="site-modal-info-value">{locationInfo.openingHours}</p>
                      </div>
                    </div>
                    <div className="site-modal-info-row">
                      <CreditCard size={16} style={{ color: 'var(--accent)', marginTop: '0.125rem' }} />
                      <div>
                        <p className="site-modal-info-label">Rates & Entry Info</p>
                        <p className="site-modal-info-value">{locationInfo.rates}</p>
                      </div>
                    </div>
                    <div className="site-modal-info-row">
                      <MapPin size={16} style={{ color: 'var(--accent)', marginTop: '0.125rem' }} />
                      <div>
                        <p className="site-modal-info-label">GPS Coordinates</p>
                        <p className="site-modal-info-mono">{locationInfo.gpsCoordinates}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="site-modal-actions">
                {locationInfo && (
                  <a href={locationInfo.mapLink} target="_blank" rel="noopener noreferrer" className="site-modal-maps-btn">
                    <ExternalLink size={16} /> Open in Maps
                  </a>
                )}
                <Link href={`/destinations/${destination.id}`} className="site-modal-info-btn">
                  Full Info
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
