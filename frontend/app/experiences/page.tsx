'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Plus, MapPin } from 'lucide-react'
import { destinations, type Experience } from '@/lib/data'

const EXPERIENCES_KEY = 'expogh_experiences'

const INITIAL: Experience[] = [
  { id: 'e1', siteId: 'aburi-botanical-gardens', siteName: 'Aburi Botanical Gardens',
    image: '/assets/aburi-botanical-gardens.jpg',
    text: 'I had a great time at the aburi botanical gardens. The fresh air and colonial-era pathways are unforgettable!',
    author: 'Kwame A.', date: '2025-11-12' },
  { id: 'e2', siteId: 'lake-volta', siteName: 'Lake Volta',
    image: '/assets/lake-volta.png',
    text: 'I had a great time at the lake Volta and the surrounding fishing communities. The sunset boat cruise was magical.',
    author: 'Abena M.', date: '2025-12-03' },
  { id: 'e3', siteId: 'asenema-falls', siteName: 'Asenema Falls',
    image: '/assets/asenema-falls.jpg',
    text: 'I had a great time at the Asenema falls. A true hidden gem of Ghana — the jungle hike is worth every step!',
    author: 'Kofi B.', date: '2026-01-20' },
  { id: 'e4', siteId: 'boti-falls', siteName: 'Boti Falls',
    image: '/assets/boti-falls.png',
    text: 'I had a great time at the aburi botanical gardens. The twin waterfalls during rainy season are absolutely spectacular.',
    author: 'Ama S.', date: '2026-02-05' },
  { id: 'e5', siteId: 'kakum-national-park', siteName: 'The Kakum National Park',
    image: '/assets/kakum-national-park.png',
    text: 'I had a great time at the the kakum national park. The canopy walkway was both terrifying and exhilarating!',
    author: 'Yaw D.', date: '2026-01-08' },
  { id: 'e6', siteId: 'independence-arch', siteName: 'The Independence Arch',
    image: '/assets/mmmm.jpg',
    text: 'I had a great time at the independence arch. Standing where Ghana declared independence was deeply moving.',
    author: 'Efua K.', date: '2026-03-06' },
  { id: 'e7', siteId: 'larabanga-mosque', siteName: 'The Laranbaga Mosque',
    image: '/assets/mosque.jpg',
    text: 'Oh, it was a great experience that I will never forget. The ancient mud mosque felt like stepping back 600 years.',
    author: 'Ibrahim A.', date: '2026-02-14' },
  { id: 'e8', siteId: 'aburi-botanical-gardens', siteName: 'Aburi Botanical Gardens',
    image: '/assets/aburi-2.png',
    text: 'I had a great time at the aburi botanical gardens. Second visit and it keeps getting better every time.',
    author: 'Adwoa F.', date: '2026-03-01' },
]

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>(INITIAL)
  const [text, setText] = useState('')
  const [selectedSite, setSelectedSite] = useState(destinations[0].id)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(EXPERIENCES_KEY)
      if (stored) {
        const user: Experience[] = JSON.parse(stored)
        setExperiences([...user, ...INITIAL])
      }
    } catch { /* no-op */ }
  }, [])

  const handleAdd = () => {
    if (!text.trim()) return
    const site = destinations.find((d) => d.id === selectedSite)!
    const exp: Experience = {
      id: `eu-${Date.now()}`,
      siteId: selectedSite,
      siteName: site.name,
      image: site.image,
      text: text.trim(),
      author: 'You',
      date: new Date().toISOString().split('T')[0],
    }
    const updated = [exp, ...experiences]
    setExperiences(updated)
    try {
      const user = updated.filter((e) => e.id.startsWith('eu-'))
      localStorage.setItem(EXPERIENCES_KEY, JSON.stringify(user))
    } catch { /* no-op */ }
    setText('')
  }

  return (
    <div className="min-h-screen bg-charcoal-950">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* ── SUBMIT AREA ── */}
        <div className="bg-charcoal-900 border border-white/10 rounded-xl p-5 mb-10">
          <select
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            className="w-full bg-charcoal-950 border border-white/10 text-white text-sm rounded-lg px-3 py-2 mb-3 focus:outline-none focus:border-[#c5932a]/60"
          >
            {destinations.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Please type in your experience here"
            rows={4}
            maxLength={500}
            className="w-full bg-transparent text-gray-300 text-sm placeholder-gray-600 resize-none focus:outline-none"
          />

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
            <span className="text-gray-600 text-xs">{text.length}/500</span>
            <button
              onClick={handleAdd}
              disabled={!text.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2a7c6b] hover:bg-[#338070] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
            >
              <Plus size={16} /> Add Experience
            </button>
          </div>
        </div>

        {/* ── EXPERIENCES GRID ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {experiences.map((exp) => (
            <article
              key={exp.id}
              className="rounded-xl overflow-hidden border-2 border-dashed border-white/10 hover:border-[#c5932a]/40 transition-colors group"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={exp.image}
                  alt={exp.siteName}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071510]/90 via-[#071510]/30 to-transparent" />
                {/* Caption overlay */}
                <p className="absolute bottom-2 left-3 right-3 text-white text-[11px] leading-snug line-clamp-2">
                  {exp.text.length > 55 ? exp.text.slice(0, 55) + '...' : exp.text}
                </p>
              </div>
              {/* Footer */}
              <div className="px-3 py-2 bg-charcoal-900">
                <p className="text-white text-xs font-semibold line-clamp-1">{exp.siteName}</p>
                <p className="text-gray-500 text-[10px] flex items-center gap-1 mt-0.5">
                  <MapPin size={9} /> {exp.siteName}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
