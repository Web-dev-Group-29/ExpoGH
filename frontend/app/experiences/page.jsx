'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Plus, MapPin, X, Trash2 } from 'lucide-react'
import { destinations } from '@/lib/data'

const EXPERIENCES_KEY = 'expogh_experiences'

const INITIAL = [
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
  const [experiences, setExperiences] = useState(INITIAL)
  const [text, setText] = useState('')
  const [selectedSite, setSelectedSite] = useState(destinations[0].id)
  const [selectedExp, setSelectedExp] = useState(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(EXPERIENCES_KEY)
      if (stored) {
        const user = JSON.parse(stored)
        setExperiences([...user, ...INITIAL])
      }
    } catch { /* no-op */ }
  }, [])

  const handleAdd = () => {
    if (!text.trim()) return
    const site = destinations.find((d) => d.id === selectedSite)
    const exp = {
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

  const handleDelete = (id, e) => {
    e.stopPropagation()
    const updated = experiences.filter((exp) => exp.id !== id)
    setExperiences(updated)
    try {
      const user = updated.filter((e) => e.id.startsWith('eu-'))
      localStorage.setItem(EXPERIENCES_KEY, JSON.stringify(user))
    } catch { /* no-op */ }
    if (selectedExp?.id === id) setSelectedExp(null)
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
              onClick={() => setSelectedExp(exp)}
              className="relative rounded-xl overflow-hidden border-2 border-dashed border-white/10 hover:border-[#c5932a]/40 transition-colors group cursor-pointer"
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

                {/* Delete button for user added exps */}
                {exp.id.startsWith('eu-') && (
                  <button
                    onClick={(e) => handleDelete(exp.id, e)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/80 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <Trash2 size={12} />
                  </button>
                )}

                {/* Caption overlay */}
                <p className="absolute bottom-2 left-3 right-3 text-white text-[11px] leading-snug line-clamp-2">
                  {exp.text}
                </p>
              </div>
              {/* Footer */}
              <div className="px-3 py-2 bg-charcoal-900 border-t border-white/5">
                <p className="text-white text-xs font-semibold line-clamp-1">{exp.siteName}</p>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-gray-500 text-[10px] flex items-center gap-1">
                    <MapPin size={9} /> {exp.siteName}
                  </p>
                  <p className="text-gray-600 text-[9px]">{exp.date}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── EXPERIENCE DETAIL MODAL ── */}
        {selectedExp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300">
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedExp(null)}
            />
            <div className="relative w-full max-w-xl bg-charcoal-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl scale-100 transition-transform duration-300">
              <button
                onClick={() => setSelectedExp(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="relative h-64">
                <Image
                  src={selectedExp.image}
                  alt={selectedExp.siteName}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent" />
              </div>

              <div className="p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">{selectedExp.siteName}</h3>
                  <div className="text-right text-xs text-gray-400">
                    <p className="font-semibold text-gold-500">{selectedExp.author}</p>
                    <p>{selectedExp.date}</p>
                  </div>
                </div>

                <div className="h-0.5 w-12 bg-gold-600/60 rounded-full" />

                <p className="text-gray-200 text-lg leading-relaxed font-medium">
                  "{selectedExp.text}"
                </p>

                <div className="pt-6 flex justify-end">
                  {selectedExp.id.startsWith('eu-') && (
                    <button
                      onClick={(e) => handleDelete(selectedExp.id, e)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-500 text-sm font-semibold transition-colors"
                    >
                      <Trash2 size={16} /> Delete Trial
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
