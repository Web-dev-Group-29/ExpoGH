import Link from 'next/link'
import { MapPin } from 'lucide-react'

export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 1rem' }}>
      <div style={{ width: '5rem', height: '5rem', borderRadius: '9999px', backgroundColor: '#0d2318', border: '1px solid rgba(26,61,46,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <MapPin size={32} style={{ color: '#d4a528' }} />
      </div>
      <h1 style={{ fontSize: '3rem', fontWeight: 700, color: '#fff', marginBottom: '0.75rem' }}>404</h1>
      <h2 style={{ fontSize: '1.25rem', color: '#d1d5db', marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ color: '#6b7280', marginBottom: '2rem', maxWidth: '24rem' }}>
        This destination seems to be off the map. Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        style={{ padding: '0.75rem 2rem', backgroundColor: '#c5922a', color: '#040e08', fontWeight: 600, borderRadius: '9999px', textDecoration: 'none', transition: 'background-color 200ms' }}
      >
        Back to Home
      </Link>
    </div>
  )
}
