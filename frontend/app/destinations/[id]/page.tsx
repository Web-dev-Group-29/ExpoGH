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

  // Create a pool of images for the gallery to match the screenshot's richness
  const galleryPool = [
    ...destination.gallery,
    ...destinations.slice(0, 8).map(d => d.image).filter(img => img !== destination.image),
  ].slice(0, 12)

  return (
    <div className="min-h-screen bg-forest-950">

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
      <section className="relative h-[45vh] min-h-[300px] overflow-hidden">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />

        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/regions"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-900/80 backdrop-blur-sm border border-white/10 text-white text-sm hover:border-gold-500/60"
          >
            <ChevronLeft size={15} /> Back
          </Link>
        </div>
        <div className="absolute top-6 right-6 z-10">
          <FavoriteButton id={destination.id} size="md" />
        </div>
      </section>

      {/* ── MAIN CONTENT (ABOUT) ── */}
      <section className="py-12 px-4 relative -mt-10 z-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Left: Content Box */}
          <div className="lg:col-span-3 bg-forest-800/40 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-white/5 shadow-2xl">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-6 text-center">
              {destination.name}
            </h1>
            <div className="text-gray-200 text-sm md:text-base leading-relaxed space-y-5 font-medium">
              {destination.description.split('. ').map((p, i, arr) => (
                <p key={i}>
                  {p}{i !== arr.length - 1 ? '.' : ''}
                </p>
              ))}
            </div>
          </div>

          {/* Right: Images & Map */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Main Feature Image */}
            <div className="relative aspect-[16/11] rounded-3xl overflow-hidden border-2 border-dashed border-white/20">
              <Image
                src={destination.gallery[1] ?? destination.image}
                alt={`${destination.name} scenery`}
                fill
                className="object-cover"
              />
            </div>

            {/* Map Interaction */}
            <div className="space-y-3">
              <a 
                href={locationsDB.find(l => l.id === destination.id)?.mapLink || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="relative aspect-[16/11] rounded-3xl overflow-hidden border-2 border-dashed border-white/20 transition-all group-hover:border-gold-500/40">
                  <Image
                    src="/assets/map-pin-screenshot.png"
                    alt="Map Location and Directions"
                    fill
                    className="object-cover transition-transform group-hover:scale-105 duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
              </a>
              <p className="text-gray-400 text-xs md:text-sm text-center font-bold tracking-tight px-4">
                Click the map image to open the map and directions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sweeping Curve separator 1 */}
      <div className="w-full flex justify-center mt-8 mb-4 px-4 relative z-10 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-[150%] md:w-[110%] h-12 md:h-24 stroke-black/40 fill-none stroke-[3px]">
          <path d="M0,0 Q500,100 1000,0" />
        </svg>
      </div>

      {/* ── RICH PHOTO GALLERY ── */}
      <section className="py-12 px-4 relative z-20">
        <div className="max-w-6.5xl mx-auto">
          <div className="grid grid-cols-10 gap-3 md:gap-4">
            {/* Top row - 5 small items */}
            {galleryPool.slice(0, 5).map((img, i) => (
              <div key={`top-${i}`} className="col-span-2 aspect-[4/3] relative rounded-lg md:rounded-xl overflow-hidden border-2 border-dashed border-gold-600/60 shadow-lg">
                <Image src={img} alt="Gallery" fill className="object-cover" sizes="20vw" />
              </div>
            ))}

            {/* Middle row - 2 large items */}
            {galleryPool.slice(5, 7).map((img, i) => (
              <div key={`mid-${i}`} className="col-span-5 aspect-[16/10] relative rounded-2xl md:rounded-3xl overflow-hidden border-2 border-dashed border-gold-600/60 shadow-xl mt-2">
                <Image src={img} alt="Gallery Large" fill className="object-cover" sizes="50vw" />
              </div>
            ))}

            {/* Bottom row - 5 small items */}
            {galleryPool.slice(7, 12).map((img, i) => (
              <div key={`bot-${i}`} className="col-span-2 aspect-[4/3] relative rounded-lg md:rounded-xl overflow-hidden border-2 border-dashed border-gold-600/60 shadow-lg mt-2">
                <Image src={img} alt="Gallery" fill className="object-cover" sizes="20vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sweeping Curve separator 2 */}
      <div className="w-full flex justify-center mb-16 px-4 relative z-10 pointer-events-none overflow-hidden rotate-180">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-[150%] md:w-[110%] h-12 md:h-24 stroke-black/40 fill-none stroke-[3px]">
          <path d="M0,0 Q500,100 1000,0" />
        </svg>
      </div>

      {/* ── LODGING INFO (Re-styled) ── */}
      <section className="bg-forest-900/40 py-16 px-4 border-t border-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-12">
            Get Your Lodging Info Right
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {lodgingCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl overflow-hidden border border-white/10 bg-forest-950/80 hover:bg-forest-900 transition-colors group shadow-2xl"
              >
                <div className="relative h-48">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    className="object-cover transition-transform group-hover:scale-105 duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-forest-950/20" />
                </div>
                <div className="p-6">
                  <h3 className="text-white font-bold text-lg mb-3">{card.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">{card.body}</p>
                  <a
                    href="mailto:expogh@gmail.com"
                    className="block text-center py-3 px-6 bg-gold-600 hover:bg-gold-500 text-forest-950 text-sm font-black rounded-xl transition-all shadow-[0_4px_14px_0_rgb(197,146,42,0.39)] uppercase tracking-wider"
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
