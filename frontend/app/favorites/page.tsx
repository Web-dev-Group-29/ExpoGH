'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { destinations, type Destination } from '@/lib/data'
import { getFavorites } from '@/lib/favorites'
import FavoriteButton from '@/components/FavoriteButton'

const THUMBNAIL_IDS = [
  'kakum-national-park',
  'aburi-botanical-gardens',
  'lake-volta',
  'boti-falls',
  'nzulenzu',
  'cape-coast-castle',
  'mole-national-park',
  'labadi-beach',
]

function DestCard({ dest }: { dest: Destination }) {
  return (
    <div className="group relative rounded-xl overflow-hidden bg-charcoal-900 border border-white/10 hover:border-[#c5932a]/40 transition-all hover:-translate-y-1">
      <div className="relative h-44">
        <Image
          src={dest.image}
          alt={dest.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 to-transparent" />
        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#c5932a] text-[#071510]">
          {dest.category}
        </span>
        <div className="absolute top-2 right-2">
          <FavoriteButton id={dest.id} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm mb-1">{dest.name}</h3>
        <p className="text-gray-500 text-xs mb-3">{dest.location}</p>
        <Link
          href={`/destinations/${dest.id}`}
          className="block text-center py-2 bg-charcoal-800 hover:bg-[#c5932a] hover:text-[#071510] text-white text-xs font-semibold rounded-lg transition-colors"
        >
          View Destination
        </Link>
      </div>
    </div>
  )
}

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setFavoriteIds(getFavorites())
    setMounted(true)
    const onStorage = () => setFavoriteIds(getFavorites())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const favDestinations = destinations.filter((d) => favoriteIds.includes(d.id))
  const thumbDests = THUMBNAIL_IDS
    .map((id) => destinations.find((d) => d.id === id))
    .filter((d): d is Destination => Boolean(d))

  const verticalOffsets = [0, -12, 8, -6, 14, -10, 4, -8]

  return (
    <div className="min-h-screen bg-charcoal-950">

      {/* ── TREE HERO with floating thumbnails ── */}
      <section
        className="relative overflow-hidden"
        style={{ height: '90vh', minHeight: '600px' }}
      >
        <Image
          src="/assets/tree-hero.jpg"
          alt="Majestic glowing tree in a vast Ghana landscape — your saved destinations"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/50 to-transparent" />

        {/* Floating thumbnails at the base / roots of the tree */}
        <div className="absolute bottom-10 left-0 right-0 px-4">
          <div className="max-w-3xl mx-auto flex items-end justify-center gap-3 flex-wrap">
            {thumbDests.map((dest, i) => (
              <Link
                key={dest.id}
                href={`/destinations/${dest.id}`}
                className="relative shrink-0 rounded-xl overflow-hidden border-2 border-white/10 hover:border-[#c5932a] transition-all duration-200 hover:-translate-y-2"
                style={{
                  width: 80,
                  height: 68,
                  marginBottom: verticalOffsets[i] ?? 0,
                }}
              >
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SAVED FAVORITES ── */}
      <section className="px-4 py-14 bg-charcoal-950">
        <div className="max-w-6xl mx-auto">
          {mounted && favDestinations.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold text-white mb-8 text-center">
                Your Saved Destinations
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favDestinations.map((dest) => (
                  <DestCard key={dest.id} dest={dest} />
                ))}
              </div>
            </>
          ) : mounted ? (
            <div className="text-center py-16">
              <h2 className="text-white font-semibold text-xl mb-3">
                No saved destinations yet
              </h2>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto text-sm">
                Tap the ♡ on any destination to save it here for quick access.
              </p>
              <Link
                href="/regions"
                className="inline-block px-8 py-3 bg-[#c5932a] hover:bg-[#d4a528] text-[#071510] font-semibold rounded-full transition-colors text-sm"
              >
                Explore Destinations
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  )
}
