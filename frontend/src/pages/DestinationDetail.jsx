
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { MapPin, ChevronLeft } from 'lucide-react'
import { useData } from '@/context/DataContext'
import FavoriteButton from '@/components/FavoriteButton'
import locationsDB from '@/lib/locationsdb.json'



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

import { useParams } from 'react-router-dom';
export default function DestinationPage() {
  const { id } = useParams()
  const { destinations, loading } = useData()

  if (loading) return <div className="p-20 text-center">Loading destination...</div>

  const destination = destinations?.find((d) => d.id === id)
  if (!destination) return <Navigate to="/not-found" replace />

  // Create a pool of images for the gallery
  const galleryPool = [
    ...(destination.gallery || []),
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
        <img
          src={destination.image}
          alt={destination.name} className="fill-img" loading="eager" decoding="async" />
        <div className="dest-hero-gradient" />

        <div className="dest-back">
          <Link to="/regions" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'inherit', textDecoration: 'none' }}>
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

            {/* Highlights Section */}
            {destination.highlights && (
              <div className="dest-highlights" style={{ marginTop: '2.5rem' }}>
                <h2 style={{ color: '#c5932a', fontSize: '1.4rem', marginBottom: '1.25rem', fontWeight: '600' }}>Experience Highlights</h2>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {destination.highlights.map((h, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main, rgba(255,255,255,0.7))', fontSize: '0.95rem' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#c5932a' }} />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: Images & Map */}
          <div className="dest-side">
            {/* Main Feature Image */}
            <div className="dest-side-img">
              <img
                src={destination.gallery[1] ?? destination.image}
                alt={`${destination.name} scenery`} className="fill-img" loading="lazy" decoding="async" />
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
                  <img
                    src="/assets/map-pin-screenshot.png"
                    alt="Map Location and Directions" className="fill-img" loading="lazy" decoding="async" />
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
      {/* Full Visiting Information Table - Professional Capstone Grade */}
      <section className="dest-fees-section" style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ color: '#c5932a', fontSize: '2.2rem', marginBottom: '2.5rem', textAlign: 'center', fontWeight: 'bold' }}>Traveler Information Guide</h2>
        <div style={{ 
          backgroundColor: 'var(--card-bg, rgba(255,255,255,0.02))', 
          borderRadius: '2rem', 
          padding: '1.5rem', 
          border: '1px solid var(--border-color, rgba(255,255,255,0.08))', 
          backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem' }}>
            <thead>
              <tr style={{ color: '#c5932a', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '2px solid rgba(197,147,42,0.3)' }}>Category</th>
                <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '2px solid rgba(197,147,42,0.3)' }}>Operational Details</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--text-main, rgba(255,255,255,0.85))', fontSize: '1.05rem' }}>
              <tr style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                <td style={{ padding: '1.25rem', fontWeight: '600' }}>📍 Exact Location</td>
                <td style={{ padding: '1.25rem' }}>{destination.location}</td>
              </tr>
              <tr style={{ backgroundColor: 'rgba(0,0,0,0.01)' }}>
                <td style={{ padding: '1.25rem', fontWeight: '600' }}>⏰ Opening Hours</td>
                <td style={{ padding: '1.25rem' }}>{destination.openingHours || 'Daily: 8:00 AM - 5:00 PM'}</td>
              </tr>
              <tr style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                <td style={{ padding: '1.25rem', fontWeight: '600' }}>💵 Entry Fees</td>
                <td style={{ padding: '1.25rem' }}>{destination.entryFee || 'Contact for latest pricing'}</td>
              </tr>
              <tr style={{ backgroundColor: 'rgba(0,0,0,0.01)' }}>
                <td style={{ padding: '1.25rem', fontWeight: '600' }}>📅 Ideal Timing</td>
                <td style={{ padding: '1.25rem' }}>{destination.bestTime}</td>
              </tr>
              <tr style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                <td style={{ padding: '1.25rem', fontWeight: '600' }}>💡 Insider Travel Tip</td>
                <td style={{ padding: '1.25rem', fontStyle: 'italic', color: '#c5932a' }}>{destination.tips || 'Always carry local cash and water.'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── RICH PHOTO GALLERY ── */}
      <section className="dest-gallery">
        <div className="dest-gallery-inner">
          <div className="dest-gallery-grid">
            {/* Top row - 5 small items */}
            {galleryPool.slice(0, 5).map((img, i) => (
              <div key={`top-${i}`} className="dest-gallery-small">
                <img src={img} alt="Gallery" className="fill-img" />
              </div>
            ))}

            {/* Middle row - 2 large items */}
            {galleryPool.slice(5, 7).map((img, i) => (
              <div key={`mid-${i}`} className="dest-gallery-large">
                <img src={img} alt="Gallery Large" className="fill-img" />
              </div>
            ))}

            {/* Bottom row - 5 small items */}
            {galleryPool.slice(7, 12).map((img, i) => (
              <div key={`bot-${i}`} className="dest-gallery-small dest-gallery-bot">
                <img src={img} alt="Gallery" className="fill-img" />
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
                  <img
                    src={card.image}
                    alt={card.alt} className="fill-img" />
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
