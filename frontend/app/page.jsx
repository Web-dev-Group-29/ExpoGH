import Image from 'next/image'
import Link from 'next/link'
import { CATEGORIES } from '@/lib/data'
import BotiFallsAlternate from '@/components/BotiFallsAlternate'
import Footer from '@/components/Footer'

export const metadata = {
  title: "ExpoGH — Discover Ghana's Culture, Nature & History",
  description:
    "Explore Ghana's stunning national parks, historic castles, vibrant cultures and breathtaking landscapes across all 16 regions.",
}

const REGIONS_LIST = [
  'Greater Accra','Ashanti','Eastern','Western','Central',
  'Northern','Upper East','Upper West','Volta','Bono',
]

const travelTips = [
  { title: 'Accommodation', image: '/assets/ggn.jpg', imageAlt: 'Luxury hotel and resort accommodation in Ghana', body: "Ghana offers a wide range of accommodation from luxury hotels in Accra to eco-lodges near national parks. Book in advance during peak season (Nov–Mar). Popular areas include Osu and Airport Residential in Accra. Expect to pay GHS 200–800/night for mid-range hotels." },
  { title: 'Currency & Payments', image: '/assets/hgg.jpg', imageAlt: 'Ghana Cedi banknotes — the local currency for visitors', body: "The Ghanaian Cedi (GHS) is the local currency. ATMs are widely available in cities. Credit cards are accepted at major hotels. Always carry cash for markets and rural transport. USD and EUR can be exchanged at licensed forex bureaus across the country." },
  { title: 'Health & Hospitals', image: '/assets/bank-hospital.png', imageAlt: 'Bank Hospital Ghana — quality healthcare for visitors', body: "Malaria prophylaxis is strongly recommended before visiting. Ensure Yellow Fever vaccination is up to date. Major hospitals include Korle Bu Teaching Hospital and the Bank Hospital in Accra. Travel insurance with medical coverage is essential for all visitors." },
  { title: 'Climate & Weather', image: '/assets/mountain-forest.jpg', imageAlt: "Ghana's lush mountain forests and misty tropical climate", body: "Ghana has a tropical climate with two rainy seasons (April–June and September–November). The best travel time is November to March when it's dry and sunny. Harmattan winds from December to February bring dusty conditions to the north. Coastal areas remain humid year-round." },
  { title: 'Transportation', image: '/assets/tra.jpg', imageAlt: 'Ghana transportation options — rail, road, air and water', body: "Tro-tros (shared minibuses) are the cheapest local transport. Uber and taxis operate across Accra. For intercity travel, VIP and STC buses provide comfortable options. Domestic flights connect Accra to Kumasi and Tamale. Car rental is available but roads can be challenging." },
  { title: 'Culture & Etiquette', image: '/assets/grasroot.jpg', imageAlt: 'Traditional Ghanaian lodge and cultural architecture', body: "Ghanaians are exceptionally welcoming and friendly people. Always greet before any transaction. Remove shoes when entering homes. Use your right hand for eating and giving items. Always ask before photographing people. Dress modestly when visiting religious and traditional sites." },
]

const whyCards = [
  { title: 'User-Friendly Experiences', body: "Navigate Ghana's diverse attractions with ease. Filter by region, category, or interest to find your perfect adventure.", image: '/assets/cytuh.jpg', imageAlt: 'Aerial view of African resort lodge by a lake in Ghana' },
  { title: 'Visually Inspiring', body: "Stunning photography and immersive design bring Ghana's landscapes, culture, and heritage to life.", image: '/assets/jjjj.jpg', imageAlt: 'Scenic bridge and lake landscape in Ghana' },
  { title: 'Shareable Destinations', body: "Save your favourite spots and share curated Ghana travel lists with friends, making trip planning a joy.", image: '/assets/lllll.jpg', imageAlt: 'Modern hotel complex aerial view in Ghana' },
]

export default function HomePage() {
  return (
    <div className="home-wrapper">
      {/* ── HERO & REGIONS ── */}
      <section className="home-hero">
        <div className="home-hero-bg">
          <Image src="/assets/mountain-forest.jpg" alt="Aerial view of Ghana — explore the country's diverse regions" fill priority className="object-cover" />
          <div className="home-hero-overlay" />
        </div>

        <div className="home-hero-content">
          <h1 className="home-hero-title">Explore Ghana</h1>
          <p className="home-hero-sub">Discover Ghana&apos;s Culture, Nature &amp; History</p>
          <div className="home-hero-actions">
            <Link href="/regions" className="home-hero-btn">Explore Regions</Link>
            <Link href="/experiences" className="home-hero-btn">View Destination</Link>
          </div>
        </div>

        <div className="home-regions">
          <div className="home-map-wrap">
            <Image src="/assets/adobe-ghana.png" alt="Map of Ghana showing all 16 regions with colour coding" width={420} height={460} className="home-map-img" />
          </div>
          <div className="home-region-card">
            <h2 className="home-region-title">Explore Ghana by Region</h2>
            <p className="home-region-text">
              Ghana is a nation of diverse landscapes and living traditions, from the urban energy of Greater Accra and royal Ashanti heritage to Central&apos;s historic coastline and Western&apos;s rainforest beauty. Eastern offers mountains and waterfalls, Volta showcases highlands, Northern stretches into savannah and wildlife, while Upper East, Upper West, Bono, Bono East, Ahafo, Oti, Western North, Savannah, and North East reflect culture, rivers, forests, plains, and strong community traditions.
            </p>
          </div>
        </div>
      </section>

      {/* ── CATEGORY / REGION FILTER ── */}
      <section className="home-filter">
        <div className="home-filter-inner">
          <div className="home-filter-row">
            <span className="home-filter-label">CATEGORY</span>
            {CATEGORIES.map((cat) => (
              <Link key={cat} href={`/regions?category=${cat}`} className="home-filter-chip">{cat}</Link>
            ))}
          </div>
          <div className="home-filter-row" style={{ paddingTop: '0.5rem' }}>
            <span className="home-filter-label">REGION</span>
            {REGIONS_LIST.map((r) => (
              <Link key={r} href={`/regions?region=${encodeURIComponent(r)}`} className="home-filter-chip">{r}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTI WATER FALLS ── */}
      <section className="home-boti-section">
        <div className="home-boti-inner">
          <div className="home-boti-center">
            <h2 className="home-boti-title">The Boti Water falls</h2>
            <BotiFallsAlternate />
          </div>
        </div>
      </section>

      {/* Curve 1 */}
      <div className="home-curve home-curve-1">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="M0,0 Q500,100 1000,0" /></svg>
      </div>

      {/* About Boti */}
      <section className="home-about-boti">
        <h3 className="home-about-boti-title">About Boti Falls</h3>
        <p className="home-about-boti-text">
          Boti Falls is a beautiful twin waterfall in Ghana&apos;s Eastern Region, surrounded by lush
          forest and scenic rocks. It offers a refreshing natural escape and stunning views,
          especially during the rainy season when the falls flow strongly.
        </p>
      </section>

      {/* Curve 2 */}
      <div className="home-curve home-curve-2">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="M0,0 Q500,100 1000,0" /></svg>
      </div>

      {/* ── TRAVEL TIPS ── */}
      <section className="home-tips">
        <div className="home-tips-inner">
          <h2 className="home-tips-title">Travel Tips for Visitors to Ghana</h2>
          <div className="home-tips-list">
            {travelTips.map((tip, i) => (
              <div key={tip.title} className={`home-tip-card ${i % 2 !== 0 ? 'tip-reverse' : 'tip-normal'}`}>
                <div className="home-tip-img">
                  <Image src={tip.image} alt={tip.imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 30vw" />
                </div>
                <div className="home-tip-text">
                  <h3 className="home-tip-title">{tip.title}</h3>
                  <p className="home-tip-body">{tip.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY EXPO GH ── */}
      <section className="home-why">
        <div className="home-why-inner">
          <h2 className="home-why-title">Why ExpoGH</h2>
          <div className="home-why-grid">
            {whyCards.map((card) => (
              <div key={card.title} className="home-why-card">
                <Image src={card.image} alt={card.imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="home-why-overlay" />
                <div className="home-why-content">
                  <h3 className="home-why-card-title">{card.title}</h3>
                  <p className="home-why-card-body">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
