
import { useState, useMemo } from 'react'

import { Link } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { CATEGORIES } from '@/lib/data'
import { useData } from '@/context/DataContext'
import SiteCard from '@/components/SiteCard'

const REGIONS_LIST = [
  'All Regions','Greater Accra','Ashanti','Eastern','Western',
  'Central','Northern','Upper East','Upper West','Volta','Bono',
]

export default function RegionsPage() {
  const { destinations, loading, error } = useData()
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeRegion, setActiveRegion] = useState('All Regions')
  const [showAburiModal, setShowAburiModal] = useState(false)

  const filtered = useMemo(() => {
    if (!destinations) return []
    return destinations.filter((d) => {
      const q = query.toLowerCase()
      const matchQ = !q || d.name.toLowerCase().includes(q) || d.region.toLowerCase().includes(q)
      const matchC = activeCategory === 'All' || d.category === activeCategory
      const matchR = activeRegion === 'All Regions' || d.region === activeRegion
      return matchQ && matchC && matchR
    })
  }, [destinations, query, activeCategory, activeRegion])

  const row1 = [
    { src: "/assets/accra-ghana.jpg", y: -40, s: 1 },
    { src: "/assets/kakum-3.jpg", y: 0, s: 0.9 },
    { src: "/assets/lake-volta.png", y: 32, s: 1.1 },
    { src: "/assets/gcnhh.jpg", y: 0, s: 0.9 },
    { src: "/assets/asenema-falls.jpg", y: -40, s: 1 },
  ]
  const row3 = [
    { src: "/assets/mesoleum.jpg", y: 40, s: 0.9 },
    { src: "/assets/rock.jpg", y: 0, s: 1 },
    { src: "/assets/hbo.jpg", y: -32, s: 1.2 },
    { src: "/assets/mmmm.jpg", y: 0, s: 1 },
    { src: "/assets/nzulenzu.jpg", y: 40, s: 0.9 },
  ]

  if (loading) return <div className="p-20 text-center">Loading Ghana's wonders...</div>
  if (error) return <div className="p-20 text-center text-red-500">Error: {error}</div>

  return (
    <div className="regions-wrapper">
      <div className="regions-bg-dark">
        <img src="/assets/Rectangle 22.png" alt="Page background" className="fill-img" />
      </div>

      <div className="regions-content">

        {/* ── SEARCH BAR ── */}
        <section className="regions-search">
          <div className="regions-search-inner">
            <div className="regions-search-wrap">
              <Search size={18} className="regions-search-icon" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search regions, destinations..."
                className="regions-search-input"
              />
            </div>
          </div>
        </section>

        {/* ── MAP + FILTER PANEL ── */}
        <section className="regions-map-section">
          <div className="regions-map-grid">
            <div className="regions-featured-img-wrap">
              <div className="regions-featured-img">
                <div className="regions-featured-img-inner">
                  <img src="/assets/accra-ghana.jpg" alt="Beautiful aerial view of a Ghanaian destination" className="fill-img" />
                </div>
              </div>
            </div>

            <div className="regions-map-center">
              <div className="regions-map-hover">
                <img src="/assets/adobe-ghana.png" alt="Colourful map of Ghana's 16 regions" width={1000} height={1080} className="regions-map-img" />
              </div>
            </div>

            <div className="regions-filter-panel">
              <div className="regions-filter-headers">
                <div className="regions-filter-header">Category</div>
                <div className="regions-filter-header">Region</div>
              </div>
              <div className="regions-filter-cols">
                <ul className="regions-filter-col no-scrollbar">
                  {(['All', ...CATEGORIES]).map((cat) => (
                    <li key={cat}>
                      <button onClick={() => setActiveCategory(cat)} className={`regions-filter-btn${activeCategory === cat ? ' active' : ''}`}>
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
                <ul className="regions-filter-col no-scrollbar">
                  {REGIONS_LIST.map((r) => (
                    <li key={r}>
                      <button onClick={() => setActiveRegion(r)} className={`regions-filter-btn${activeRegion === r ? ' active' : ''}`}>
                        {r}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── ASHANTI REGION ── */}
        <section className="regions-ashanti">
          <div className="regions-ashanti-inner">
            <div className="regions-ashanti-grid">
              <div className="regions-ashanti-photo">
                <div className="regions-ashanti-img">
                  <div className="regions-ashanti-img-inner">
                    <img src="/assets/courtyard.jpg" alt="Traditional Ashanti courtyard architecture" className="fill-img" />
                  </div>
                </div>
              </div>
              <div className="regions-ashanti-center">
                <h2 className="regions-ashanti-title">Ashanti Region</h2>
                <div className="regions-ashanti-map-wrap">
                  <div className="regions-ashanti-map">
                    <img src="/assets/original-1.png" alt="Map of the Ashanti Region" width={600} height={600} className="regions-ashanti-map-img" />
                  </div>
                </div>
              </div>
              <div className="regions-ashanti-photo">
                <div className="regions-ashanti-img">
                  <div className="regions-ashanti-img-inner">
                    <img src="/assets/kakum-national-park.png" alt="Kakum National Park rainforest" className="fill-img" />
                  </div>
                </div>
              </div>
            </div>
            <p className="regions-ashanti-desc">
              The Ashanti Region is a major cultural center in Ghana and the historic home of the
              Ashanti Kingdom. Its capital, Kumasi, is known for its rich traditions, royal heritage,
              and vibrant cultural life. Visitors can explore the Manhyia Palace Museum, the
              residence of the Asantehene, and the Prempeh II Jubilee Museum, which preserves royal
              artifacts and Ashanti history. Nature lovers can visit the scenic Lake Bosomtwe, while
              cultural experiences can be found at Bonwire Kente Weaving Village, famous for
              traditional Kente cloth weaving. Together these attractions highlight the region&apos;s
              deep cultural heritage and historical importance.
            </p>
          </div>
        </section>

        {/* ── DESTINATIONS GRID ── */}
        <section className="regions-dest">
          <div className="regions-dest-inner">
            <div className="regions-dest-header">
              <p className="regions-dest-count">
                <span className="regions-dest-count-num">{filtered.length}</span> destination{filtered.length !== 1 ? 's' : ''}
              </p>
              {(activeCategory !== 'All' || activeRegion !== 'All Regions' || query) && (
                <button onClick={() => { setQuery(''); setActiveCategory('All'); setActiveRegion('All Regions') }} className="regions-clear-btn">
                  Clear filters
                </button>
              )}
            </div>
            {filtered.length > 0 ? (
              <div className="regions-dest-grid">
                {filtered.map((dest) => (<SiteCard key={dest.id} destination={dest} />))}
              </div>
            ) : (
              <div className="regions-empty">
                <p className="regions-empty-title">No destinations found</p>
                <p className="regions-empty-sub">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </section>

        {/* ── ABURI BOTANICAL GARDENS ── */}
        <section className="regions-aburi">
          <div className="regions-aburi-inner">
            <div className="regions-aburi-grid">
              <div style={{ width: '100%' }}>
                <div className="regions-aburi-card">
                  <h2 className="regions-aburi-title">Aburi Botanical Gardens</h2>
                  <div className="regions-aburi-text">
                    <p className="line-clamp-4 md-line-clamp-none">
                      Located in the hills of the Eastern Region near the town of Aburi, the Aburi Botanical Gardens
                      is one of Ghana&apos;s most peaceful and scenic natural attractions. Established during the colonial
                      period in 1890, the gardens cover a large area filled with tropical plants, towering trees,
                      and beautifully maintained lawns.
                    </p>
                    <p className="regions-aburi-hidden-md">
                      Visitors come to the gardens to enjoy the cool mountain climate, walk through shaded paths,
                      and relax in the calm natural environment overlooking parts of the Eastern Region.
                    </p>
                    <p className="regions-aburi-hidden-md">
                      Because of its serene atmosphere and beautiful landscape, Aburi Botanical Gardens is also
                      a popular location for picnics, photography, nature walks, and small events.
                    </p>
                    <button onClick={() => setShowAburiModal(true)} className="regions-aburi-read-more">
                      Read full description
                    </button>
                  </div>
                </div>
              </div>

              <div className="regions-aburi-images">
                <div className="regions-aburi-img-wrap">
                  <div className="regions-aburi-img-inner">
                    <img src="/assets/aburi-botanical-gardens.jpg" alt="Aburi Botanical Gardens View" className="fill-img" />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <a href="https://www.google.com/maps/search/Aburi+Botanical+gardens/@5.8511254,-0.1755178,17z" target="_blank" rel="noopener noreferrer" className="regions-aburi-img-wrap" style={{ display: 'block', cursor: 'pointer' }}>
                    <div className="regions-aburi-img-inner">
                      <img src="/assets/map-pin-screenshot.png" alt="Map directions to Aburi Botanical Gardens" className="fill-img" style={{ transition: 'transform 700ms' }} />
                    </div>
                  </a>
                  <p className="regions-aburi-map-caption">Click the map image to open the map and directions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TOURIST SITES GRID ── */}
        <section className="regions-tourist">
          <div className="regions-tourist-inner">
            <div className="regions-divider-wrap regions-divider-top">
              <div className="regions-divider-line top-line">
                <div className="regions-divider-glow-top"></div>
                <div style={{ position: 'absolute', left: '50%', top: '-1px', transform: 'translateX(-50%)', width: '100%', height: '1.5px', backgroundColor: 'rgba(197,147,42,0.5)' }}></div>
              </div>
            </div>

            <div className="regions-tourist-content">
              <div className="regions-img-row row-1">
                {row1.map((img, idx) => (
                  <div key={`r1-${idx}`} className="regions-small-img" style={{ transform: `translateY(${img.y}px) scale(${img.s})` }}>
                    <div className="regions-small-img-inner">
                      <img src={img.src} alt={`Tourist site ${idx + 1}`} className="fill-img" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="regions-img-row row-2">
                <div className="regions-large-img regions-large-left">
                  <div className="regions-large-img-inner">
                    <img src="/assets/aburi-2.png" alt="Featured Resort" className="fill-img" />
                  </div>
                </div>
                <div className="regions-large-img regions-large-right">
                  <div className="regions-large-img-inner">
                    <img src="/assets/sogakope.png" alt="Pool side" className="fill-img" />
                  </div>
                </div>
              </div>

              <div className="regions-img-row row-3">
                {row3.map((img, idx) => (
                  <div key={`r3-${idx}`} className="regions-small-img" style={{ transform: `translateY(${img.y}px) scale(${img.s})` }}>
                    <div className="regions-small-img-inner">
                      <img src={img.src} alt={`Tourist site ${idx + 6}`} className="fill-img" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="regions-divider-wrap regions-divider-bottom">
              <div className="regions-divider-line bottom-line">
                <div className="regions-divider-glow-bottom"></div>
                <div style={{ position: 'absolute', left: '50%', bottom: '-1px', transform: 'translateX(-50%)', width: '100%', height: '1px', backgroundColor: 'rgba(197,147,42,0.6)' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABURI MODAL (MOBILE) ── */}
        {showAburiModal && (
          <div className="regions-aburi-modal">
            <div className="regions-aburi-modal-backdrop" onClick={() => setShowAburiModal(false)} />
            <div className="regions-aburi-modal-card animate-fade-zoom">
              <div className="regions-aburi-modal-header">
                <h3 className="regions-aburi-modal-title">Aburi Botanical Gardens</h3>
                <button onClick={() => setShowAburiModal(false)} className="regions-aburi-modal-close">
                  <X size={18} />
                </button>
              </div>
              <div className="regions-aburi-modal-body custom-scrollbar">
                <p>Located in the hills of the Eastern Region near the town of Aburi, the Aburi Botanical Gardens is one of Ghana&apos;s most peaceful and scenic natural attractions. Established during the colonial period in 1890, the gardens cover a large area filled with tropical plants, towering trees, and beautifully maintained lawns.</p>
                <p>Visitors come to the gardens to enjoy the cool mountain climate, walk through shaded paths, and relax in the calm natural environment overlooking parts of the Eastern Region. The gardens feature several plant species used for medicinal, ornamental, and research purposes, making it both a recreational and educational destination.</p>
                <p>Because of its serene atmosphere and beautiful landscape, Aburi Botanical Gardens is also a popular location for picnics, photography, nature walks, and small events. It offers visitors a refreshing escape from the busy city life of nearby Accra while showcasing the beauty of Ghana&apos;s plant life and natural environment.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
