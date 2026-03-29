'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  if (pathname === '/regions') return null

  return (
    <footer className="relative pt-1 sm:pt-20 pb-8 transition-colors bg-gray-50 dark:bg-charcoal-900">
      {/* Top Gradient Blend */}
      <div className="absolute top-0 left-0 right-0 h-24 -translate-y-[99%] pointer-events-none bg-gradient-to-t from-gray-100 dark:from-charcoal-900 to-transparent" />

      <div className="absolute inset-0 z-[-1] bg-gray-50 dark:bg-charcoal-900" />
      {/* ExpoGH logo centred with lines */}
      <div className="flex items-center justify-center gap-4 mb-10 px-4">
        <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-[#c5932a]/40 dark:to-[#c5932a]/40" />
        <Link href="/" className="relative w-28 h-8">
          <Image
            src="/assets/expo-logo-1.png"
            alt="ExpoGH Logo"
            fill
            className="object-contain"
          />
        </Link>
        <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-[#c5932a]/40 dark:to-[#c5932a]/40" />
      </div>

      {/* Columns */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        {/* Top row: Explore & Contact Us side by side on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-8">
          {/* EXPLORE */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold text-xs uppercase tracking-widest mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-500">
              {[
                { label: 'Home', href: '/' },
                { label: 'Regions', href: '/regions' },
                { label: 'Experiences', href: '/experiences' },
                { label: 'Travel Tips', href: '/travel-tips' },
                { label: 'Favorites', href: '/favorites' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-[#c5932a] dark:hover:text-[#c5932a] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT US */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold text-xs uppercase tracking-widest mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-500">
              <li>Email: expogh@gmail.com</li>
              <li>Location: Kumasi, Ghana</li>
              <li>Phone: +233 5412345678</li>
              <li>WhatsApp: 05412345678</li>
            </ul>
          </div>

          {/* Hidden on mobile, visible on sm and up */}
          <div className="hidden sm:block">
            <h3 className="text-gray-900 dark:text-white font-bold text-xs uppercase tracking-widest mb-4">Top Destinations</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-500">
              {[
                { label: 'Kakum National Park', id: 'kakum-national-park' },
                { label: 'Cape Coast Castle', id: 'cape-coast-castle' },
                { label: 'Mole National Park', id: 'mole-national-park' },
                { label: 'Wli Waterfalls', id: 'asenema-falls' },
                { label: 'Boti Falls', id: 'boti-falls' },
                { label: 'Labadi Beach', id: 'labadi-beach' },
              ].map((d) => (
                <li key={d.id}>
                  <Link href={`/destinations/${d.id}`} className="hover:text-[#c5932a] dark:hover:text-[#c5932a] transition-colors">
                    {d.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* TOP DESTINATIONS - 3x2 grid on mobile, list on sm and up */}
        <div className="sm:hidden mb-8">
          <h3 className="text-gray-900 dark:text-white font-bold text-xs uppercase tracking-widest mb-4">Top Destinations</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Kakum National Park', id: 'kakum-national-park' },
              { label: 'Cape Coast Castle', id: 'cape-coast-castle' },
              { label: 'Mole National Park', id: 'mole-national-park' },
              { label: 'Wli Waterfalls', id: 'asenema-falls' },
              { label: 'Boti Falls', id: 'boti-falls' },
              { label: 'Labadi Beach', id: 'labadi-beach' },
            ].map((d) => (
              <div key={d.id}>
                <Link href={`/destinations/${d.id}`} className="text-sm text-gray-600 dark:text-gray-500 hover:text-[#c5932a] dark:hover:text-[#c5932a] transition-colors line-clamp-2">
                  {d.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-600 dark:text-gray-700">
        © {new Date().getFullYear()} ExpoGH — Discover Ghana&apos;s Culture, Nature &amp; History
      </p>
    </footer>
  )
}
