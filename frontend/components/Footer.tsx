'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  if (pathname === '/regions') return null

  return (
    <footer className="relative pt-20 pb-8 transition-colors">
      {/* Top Gradient Blend */}
      <div className="absolute top-0 left-0 right-0 h-24 -translate-y-[99%] pointer-events-none bg-gradient-to-t from-charcoal-900 to-transparent" />
      
      <div className="absolute inset-0 z-[-1] bg-charcoal-900" />
      {/* ExpoGH logo centred with lines */}
      <div className="flex items-center justify-center gap-4 mb-10 px-4">
        <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-[#c5932a]/40" />
        <Link href="/" className="text-xl font-bold">
          <span className="text-white">Expo</span>
          <span className="text-[#c5932a]">GH</span>
        </Link>
        <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-[#c5932a]/40" />
      </div>

      {/* Columns */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
        {/* EXPLORE */}
        <div>
          <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Explore</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            {[
              { label: 'Home', href: '/' },
              { label: 'Regions', href: '/regions' },
              { label: 'Experiences', href: '/experiences' },
              { label: 'Travel Tips', href: '/travel-tips' },
              { label: 'Favorites', href: '/favorites' },
            ].map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-[#c5932a] transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT US */}
        <div>
          <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            <li>Email: expogh@gmail.com</li>
            <li>Location: Kumasi, Ghana</li>
            <li>Phone: +233 5412345678</li>
            <li>WhatsApp: 05412345678</li>
          </ul>
        </div>

        {/* TOP DESTINATIONS */}
        <div>
          <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Top Destinations</h3>
          <ul className="space-y-2 text-sm text-gray-500">
            {[
              { label: 'Kakum National Park', id: 'kakum-national-park' },
              { label: 'Cape Coast Castle', id: 'cape-coast-castle' },
              { label: 'Mole National Park', id: 'mole-national-park' },
              { label: 'Wli Waterfalls', id: 'asenema-falls' },
              { label: 'Boti Falls', id: 'boti-falls' },
              { label: 'Labadi Beach', id: 'labadi-beach' },
            ].map((d) => (
              <li key={d.id}>
                <Link href={`/destinations/${d.id}`} className="hover:text-[#c5932a] transition-colors">
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-center text-xs text-gray-700">
        © {new Date().getFullYear()} ExpoGH — Discover Ghana&apos;s Culture, Nature &amp; History
      </p>
    </footer>
  )
}
