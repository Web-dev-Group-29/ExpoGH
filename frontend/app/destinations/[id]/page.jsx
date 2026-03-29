import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, ChevronLeft } from 'lucide-react'
import { destinations } from '@/lib/data'
import FavoriteButton from '@/components/FavoriteButton'
import locationsDB from '@/lib/locationsdb.json'

export async function generateStaticParams() {
  return destinations.map((d) => ({ id: d.id }))
}

export async function generateMetadata({ params }) {
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

export default async function DestinationPage({ params }) {
  const { id } = await params
  const destination = destinations.find((d) => d.id === id)
  if (!destination) notFound()

  // Create a pool of images for the gallery to match the screenshot's richness
  const galleryPool = [
    ...destination.gallery,
    ...destinations.slice(0, 8).map(d => d.image).filter(img => img !== destination.image),
  ].slice(0, 12)

  return (
    <div className="dest-wrapper">

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
      <section className="dest-hero">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          priority
          className="object-cover"
        />
        <div className="dest-hero-gradient" />

        <div className="dest-back">
          <Link href="/regions" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'inherit', textDecoration: 'none' }}>
            <ChevronLeft size={15} /> Back
          </Link>
        </div>
        <div className="dest-fav-wrap">
          <FavoriteButton id={destination.id} size="md" />
        </div>
      </section>

      {/* ── MAIN CONTENT (ABOUT) ── */}
      <section className="dest-main">
        <div className="dest-main-grid">

          {/* Left: Content Box */}
          <div className="dest-content-box">
            <h1 className="dest-content-title">
              {destination.name}
            </h1>
            <div className="dest-content-text">
              {destination.description.split('. ').map((p, i, arr) => (
                <p key={i}>
                  {p}{i !== arr.length - 1 ? '.' : ''}
                </p>
              ))}
            </div>
          </div>

          {/* Right: Images & Map */}
          <div className="dest-side">
            {/* Main Feature Image */}
            <div className="dest-side-img">
              <Image
                src={destination.gallery[1] ?? destination.image}
                alt={`${destination.name} scenery`}
                fill
                className="object-cover"
              />
            </div>

            {/* Map Interaction */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href={locationsDB.find(l => l.id === destination.id)?.mapLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="dest-map-link"
              >
                <div className="dest-side-img" style={{ transition: 'all 200ms' }}>
                  <Image
                    src="/assets/map-pin-screenshot.png"
                    alt="Map Location and Directions"
                    fill
                    className="object-cover"
                  />
                  <div className="dest-map-overlay" />
                </div>
              </a>
              <p className="dest-map-caption">
                Click the map image to open the map and directions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sweeping Curve separator 1 */}
      <div className="dest-curve">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path d="M0,0 Q500,100 1000,0" />
        </svg>
      </div>

      {/* ── RICH PHOTO GALLERY ── */}
      <section className="dest-gallery">
        <div className="dest-gallery-inner">
          <div className="dest-gallery-grid">
            {/* Top row - 5 small items */}
            {galleryPool.slice(0, 5).map((img, i) => (
              <div key={`top-${i}`} className="dest-gallery-small">
                <Image src={img} alt="Gallery" fill className="object-cover" sizes="20vw" />
              </div>
            ))}

            {/* Middle row - 2 large items */}
            {galleryPool.slice(5, 7).map((img, i) => (
              <div key={`mid-${i}`} className="dest-gallery-large">
                <Image src={img} alt="Gallery Large" fill className="object-cover" sizes="50vw" />
              </div>
            ))}

            {/* Bottom row - 5 small items */}
            {galleryPool.slice(7, 12).map((img, i) => (
              <div key={`bot-${i}`} className="dest-gallery-small dest-gallery-bot">
                <Image src={img} alt="Gallery" fill className="object-cover" sizes="20vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sweeping Curve separator 2 */}
      <div className="dest-curve-2">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path d="M0,0 Q500,100 1000,0" />
        </svg>
      </div>

      {/* ── LODGING INFO (Re-styled) ── */}
      <section className="dest-lodging">
        <div className="dest-lodging-inner">
          <h2 className="dest-lodging-title">
            Get Your Lodging Info Right
          </h2>
          <div className="dest-lodging-grid">
            {lodgingCards.map((card) => (
              <div key={card.title} className="dest-lodging-card">
                <div className="dest-lodging-card-img">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="dest-lodging-card-overlay" />
                </div>
                <div className="dest-lodging-card-body">
                  <h3 className="dest-lodging-card-title">{card.title}</h3>
                  <p className="dest-lodging-card-text">{card.body}</p>
                  <a href="mailto:expogh@gmail.com" className="dest-lodging-book">
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
