
import { Link } from 'react-router-dom'

import { useLocation } from 'react-router-dom'

export default function Footer() {
  const location = useLocation(); const pathname = location.pathname
  if (pathname === '/regions') return null

  return (
    <footer className="footer">
      <div className="footer-gradient-top" />
      <div className="footer-bg" />

      <div className="footer-logo-row">
        <div className="footer-line-left" />
        <Link to="/" className="footer-logo">
          <img src="/assets/expo-logo-1.png" alt="ExpoGH Logo" className="object-contain" />
        </Link>
        <div className="footer-line-right" />
      </div>

      <div className="footer-columns">
        <div className="footer-grid">
          <div>
            <h3 className="footer-heading">Explore</h3>
            <ul className="footer-list">
              {[
                { label: 'Home', href: '/' },
                { label: 'Regions', href: '/regions' },
                { label: 'Experiences', href: '/experiences' },
                { label: 'Travel Tips', href: '/travel-tips' },
                { label: 'Favorites', href: '/favorites' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="footer-list">
              <li>Email: expogh@gmail.com</li>
              <li>Location: Kumasi, Ghana</li>
              <li>Phone: +233 5412345678</li>
              <li>WhatsApp: 05412345678</li>
            </ul>
          </div>

          <div className="footer-desktop-only">
            <h3 className="footer-heading">Top Destinations</h3>
            <ul className="footer-list">
              {[
                { label: 'Kakum National Park', id: 'kakum-national-park' },
                { label: 'Cape Coast Castle', id: 'cape-coast-castle' },
                { label: 'Mole National Park', id: 'mole-national-park' },
                { label: 'Wli Waterfalls', id: 'asenema-falls' },
                { label: 'Boti Falls', id: 'boti-falls' },
                { label: 'Labadi Beach', id: 'labadi-beach' },
              ].map((d) => (
                <li key={d.id}>
                  <Link to={`/destinations/${d.id}`}>{d.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-mobile-only">
          <h3 className="footer-heading">Top Destinations</h3>
          <div className="footer-mobile-grid">
            {[
              { label: 'Kakum National Park', id: 'kakum-national-park' },
              { label: 'Cape Coast Castle', id: 'cape-coast-castle' },
              { label: 'Mole National Park', id: 'mole-national-park' },
              { label: 'Wli Waterfalls', id: 'asenema-falls' },
              { label: 'Boti Falls', id: 'boti-falls' },
              { label: 'Labadi Beach', id: 'labadi-beach' },
            ].map((d) => (
              <div key={d.id}>
                <Link to={`/destinations/${d.id}`} className="footer-link line-clamp-2" style={{ fontSize: '0.875rem' }}>
                  {d.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="footer-copyright">
        © {new Date().getFullYear()} ExpoGH — Discover Ghana&apos;s Culture, Nature &amp; History
      </p>
    </footer>
  )
}
