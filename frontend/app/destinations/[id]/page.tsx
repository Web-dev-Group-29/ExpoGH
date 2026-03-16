import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, ChevronLeft } from 'lucide-react'
import { destinations } from '@/lib/data'
import FavoriteButton from '@/components/FavoriteButton'
import locationsDB from '@/lib/locationsdb.json'

interface PageProps { params: Promise<{ id: string }> }

export async function generateStaticParams() {
  return destinations.map((d) => ({ id: d.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const d = destinations.find((x) => x.id === id)
  if (!d) return {}
  return {
    title: `${d.name} — Ghana Tourism`,
    description: d.shortDescription,
  }
}

const lodgingCards = [
  {
    image: '/assets/cytuh.jpg',
    alt: 'Aerial view of thatched African lodge resort near national park',
    title: "A Scenic Eco-Resort",
    body: "A premier eco-lodge offering comfortable rooms, stunning pool views, and direct access to nature trails. Ideal for nature lovers and adventure seekers.",
  },
  {
    image: '/assets/hh.jpg',
    alt: 'Luxury safari lodge with pool at sunset in Ghana',
    title: "A Five-Star Safari Lodge",
    body: "A five-star safari lodge located just minutes from Ghana's most iconic wildlife reserves, offering unparalleled comfort for serious travellers.",
  },
  {
    image: '/assets/cfc78dde.png',
    alt: 'Modern luxury hotel with fountain in Accra Ghana',
    title: "A Premium City Hotel",
    body: "A luxury urban hotel for business and leisure visitors, featuring world-class amenities, conference facilities, and easy access to city attractions.",
  },
]

export default async function DestinationPage({ params }: PageProps) {
  const { id } = await params
  const destination = destinations.find((d) => d.id === id)
  if (!destination) notFound()

  return (
    <div className="min-h-screen bg-charcoal-950">

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TouristAttraction',
            name: destination.name,
            description: destination.shortDescription,
            image: destination.image,
            address: { '@type': 'PostalAddress', addressLocality: destination.location, addressCountry: 'GH' },
          }),
        }}
      />

      {/* ── HERO ── */}
      <section className="relative h-[65vh] min-h-[400px] overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent" />

        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/regions"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-charcoal-900/80 backdrop-blur-sm border border-white/10 text-white text-sm hover:border-[#c5932a]/60"
          >
            <ChevronLeft size={15} /> Back
          </Link>
        </div>
        <div className="absolute top-6 right-6 z-10">
          <FavoriteButton id={destination.id} size="md" />
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section className="bg-charcoal-900 py-14 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* Text (left, wider) */}
          <div className="lg:col-span-3">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#c5932a]/20 text-[#c5932a] border border-[#c5932a]/30 mb-4">
              {destination.category}
            </span>
            <h1 className="text-3xl font-bold text-white mb-2">{destination.name}</h1>
            <p className="text-gray-400 text-xs flex items-center gap-1 mb-6">
              <MapPin size={11} /> {destination.location}
            </p>

            <h2 className="text-xl font-bold text-white mb-4">
              About {destination.name}
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {destination.description}
            </p>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-charcoal-950 rounded-lg p-3 border border-white/10">
                <p className="text-[#c5932a] text-xs uppercase tracking-wide mb-1">Best Time</p>
                <p className="text-white text-sm">{destination.bestTime}</p>
              </div>
              {destination.entryFee && (
                <div className="bg-charcoal-950 rounded-lg p-3 border border-white/10">
                  <p className="text-[#c5932a] text-xs uppercase tracking-wide mb-1">Entry Fee</p>
                  <p className="text-white text-sm">{destination.entryFee}</p>
                </div>
              )}
            </div>
          </div>

          {/* Image (right) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative rounded-xl overflow-hidden h-56">
              <Image
                src={destination.gallery[1] ?? destination.image}
                alt={`${destination.name} — scenic view`}
                fill
                className="object-cover"
              />
            </div>

            {/* Map section */}
            <div className="bg-charcoal-950 rounded-xl border border-white/10 p-3">
              <a 
                href={locationsDB.find(l => l.id === destination.id)?.mapLink || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative h-40 rounded-lg overflow-hidden mb-2 cursor-pointer hover:opacity-80 transition-opacity">
                  <Image
                    src="/assets/animated-image.jpg"
                    alt="Ghana map showing location of tourist destination"
                    fill
                    className="object-contain bg-white/5"
                  />
                </div>
              </a>
              <p className="text-gray-500 text-xs text-center">
                Click the map image to get the route map and directions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ── */}
      <section className="bg-charcoal-950 py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-6">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {destination.gallery.slice(0, 4).map((img, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src={img}
                  alt={`${destination.name} gallery photo ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GET YOUR LODGING INFO RIGHT ── */}
      <section className="bg-charcoal-900 py-14 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10">
            Get Your Lodging Info Right
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lodgingCards.map((card) => (
              <div
                key={card.title}
                className="rounded-xl overflow-hidden border border-white/10 bg-charcoal-950"
              >
                <div className="relative h-44">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-charcoal-950/40" />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold text-sm mb-2">{card.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4">{card.body}</p>
                  <a
                    href="mailto:expogh@gmail.com"
                    className="block text-center py-2 px-4 bg-[#c5932a] hover:bg-[#d4a528] text-[#071510] text-xs font-bold rounded-lg transition-colors"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
