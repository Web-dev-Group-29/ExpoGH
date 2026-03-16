'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, X, ExternalLink, Clock, CreditCard } from 'lucide-react'
import FavoriteButton from './FavoriteButton'
import type { Destination } from '@/lib/data'
import locationsDB from '@/lib/locationsdb.json'

interface SiteCardProps {
  destination: Destination
  showFavorite?: boolean
}

export default function SiteCard({ destination, showFavorite = true }: SiteCardProps) {
  const [showModal, setShowModal] = useState(false)
  const locationInfo = locationsDB.find((loc) => loc.id === destination.id)

  return (
    <>
      <article className="group relative rounded-xl overflow-hidden bg-charcoal-900 border border-white/10 hover:border-[#c5932a]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30">
        <div 
          className="relative h-48 w-full overflow-hidden cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent" />
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#c5932a] text-[#071510]">
            {destination.category}
          </span>
          {showFavorite && (
            <div className="absolute top-2 right-2">
              <FavoriteButton id={destination.id} />
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">{destination.name}</h3>
          <p className="text-gray-500 text-xs flex items-center gap-1 mb-3">
            <MapPin size={10} /> {destination.location}
          </p>
          <p className="text-gray-400 text-xs line-clamp-2 mb-4">{destination.shortDescription}</p>
          <Link
            href={`/destinations/${destination.id}`}
            className="block text-center py-2 px-4 rounded-lg bg-charcoal-800 hover:bg-[#c5932a] hover:text-charcoal-950 text-white text-xs font-semibold transition-colors duration-200"
          >
            Explore
          </Link>
        </div>
      </article>

      {/* Pop-up Extended Menu */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div 
            className="absolute inset-0"
            onClick={() => setShowModal(false)}
          />
          <div className="bg-charcoal-900 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 relative z-10">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors"
            >
              <X size={16} />
            </button>
            <div className="relative h-56 w-full">
               <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 to-transparent" />
            </div>
            
            <div className="p-6 -mt-8 relative z-10">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#c5932a] text-[#071510] mb-3">
                {destination.category}
              </span>
              <h2 className="text-2xl font-bold text-white mb-2">{destination.name}</h2>
              <p className="text-gray-400 text-sm mb-6 flex items-center gap-1">
                <MapPin size={14} /> {destination.location}
              </p>
              
              {locationInfo ? (
                <div className="space-y-4 mb-6 bg-charcoal-950 rounded-xl p-4 border border-white/10">
                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-[#c5932a] mt-0.5" />
                    <div>
                      <p className="text-white text-sm font-medium">Opening Hours</p>
                      <p className="text-gray-400 text-xs">{locationInfo.openingHours}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CreditCard size={16} className="text-[#c5932a] mt-0.5" />
                    <div>
                      <p className="text-white text-sm font-medium">Rates & Entry Info</p>
                      <p className="text-gray-400 text-xs">{locationInfo.rates}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-[#c5932a] mt-0.5" />
                    <div>
                      <p className="text-white text-sm font-medium">GPS Coordinates</p>
                      <p className="text-gray-400 text-xs font-mono">{locationInfo.gpsCoordinates}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 text-sm mb-6 italic">No extended location data available.</p>
              )}

              <div className="flex gap-3">
                {locationInfo && (
                  <a 
                    href={locationInfo.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#c5932a] hover:bg-[#d4a528] text-[#071510] text-sm font-bold transition-colors"
                  >
                    <ExternalLink size={16} /> Open in Maps
                  </a>
                )}
                <Link
                  href={`/destinations/${destination.id}`}
                  className="flex flex-1 items-center justify-center py-3 px-6 rounded-xl border border-[#c5932a] text-[#c5932a] hover:bg-[#c5932a]/10 text-sm font-bold transition-colors"
                >
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
