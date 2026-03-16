import Link from 'next/link'
import { MapPin } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 rounded-full bg-forest-800 border border-forest-600/30 flex items-center justify-center mb-6">
        <MapPin size={32} className="text-gold-500" />
      </div>
      <h1 className="text-5xl font-bold text-white mb-3">404</h1>
      <h2 className="text-xl text-gray-300 mb-4">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-sm">
        This destination seems to be off the map. Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        className="px-8 py-3 bg-gold-600 hover:bg-gold-500 text-forest-950 font-semibold rounded-full transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}
