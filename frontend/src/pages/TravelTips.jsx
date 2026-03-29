

import { Link } from 'react-router-dom'
import { CheckCircle2, Info, Navigation, ShieldCheck, Sun, Wallet } from 'lucide-react'

const travelTips = [
  { title: "Best Time to Visit", icon: <Sun style={{ color: '#fb923c' }} />, description: "The best time to visit Ghana is during the dry season from October to March, when the weather is pleasant and wildlife viewing in Mole National Park is at its peak.", image: "/assets/mountain-forest.jpg" },
  { title: "Currency & Payments", icon: <Wallet style={{ color: '#4ade80' }} />, description: "The local currency is the Ghana Cedi (GHS). While major hotels and malls in Accra accept cards, it's essential to carry cash for local markets and smaller towns.", image: "/assets/grasroot.jpg" },
  { title: "Safety & Health", icon: <ShieldCheck style={{ color: '#60a5fa' }} />, description: "Ghana is known as one of Africa's safest countries. Ensure you have your Yellow Fever certificate and take malaria precautions before traveling.", image: "/assets/courtyard.jpg" },
  { title: "Local Etiquette", icon: <Info style={{ color: '#c5932a' }} />, description: "Ghanaians are incredibly friendly. Always use your right hand for giving or receiving items, and greeting others is highly valued in local culture.", image: "/assets/accra-ghana.jpg" },
]

export default function TravelTipsPage() {
  return (
    <div className="tips-wrapper">
      <div className="tips-inner">
        {/* Hero */}
        <section className="tips-hero">
          <img src="/assets/tour-sites.jpg" alt="Ghana Travel Header" className="object-cover" />
          <div className="tips-hero-overlay">
            <div className="tips-hero-content">
              <h1 className="tips-hero-title">Travel Tips</h1>
              <p className="tips-hero-sub">Everything you need to know for a smooth and memorable journey through the heart of West Africa.</p>
            </div>
          </div>
        </section>

        {/* Tips Grid */}
        <div className="tips-grid">
          {travelTips.map((tip, idx) => (
            <div key={idx} className="tips-card">
              <div className="tips-card-img">
                <img src={tip.image} alt={tip.title} className="object-cover" />
              </div>
              <div className="tips-card-body">
                <div className="tips-card-header">
                  <div className="tips-card-icon">{tip.icon}</div>
                  <h3 className="tips-card-title">{tip.title}</h3>
                </div>
                <p className="tips-card-text">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Getting Around */}
        <section className="tips-getting-around">
          <div className="tips-ga-grid">
            <div>
              <h2 className="tips-ga-title">Getting Around</h2>
              <div className="tips-ga-list">
                {[
                  "Tro-tros: The local, affordable way to travel between cities.",
                  "Ride-sharing: Uber and Bolt are widely available in Accra and Kumasi.",
                  "Domestic Flights: Africa World Airlines and PassionAir connect major cities.",
                  "Private Rental: For comfort, consider renting a car with a driver.",
                ].map((text, i) => (
                  <div key={i} className="tips-ga-item">
                    <CheckCircle2 style={{ color: '#c5932a', flexShrink: 0, marginTop: '0.25rem' }} size={18} />
                    <p>{text}</p>
                  </div>
                ))}
              </div>
              <Link to="/regions" className="tips-ga-btn">
                <Navigation size={18} /> Start Exploring
              </Link>
            </div>
            <div className="tips-ga-img">
              <img src="/assets/photo5.jpg" alt="Transportation in Ghana" className="object-cover" />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
