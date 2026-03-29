
import { useState, useEffect } from 'react'

import { Plus, MapPin, X, Trash2 } from 'lucide-react'
import { useData } from '@/context/DataContext'

const EXPERIENCES_KEY = 'expogh_experiences'

// Initial data left as mock for user interactions
const INITIAL = [
  { id: 'e1', siteId: 'aburi-botanical-gardens', siteName: 'Aburi Botanical Gardens', image: '/assets/aburi-botanical-gardens.jpg', text: 'I had a great time at the aburi botanical gardens. The fresh air and colonial-era pathways are unforgettable!', author: 'Kwame A.', date: '2025-11-12' },
  { id: 'e2', siteId: 'lake-volta', siteName: 'Lake Volta', image: '/assets/lake-volta.png', text: 'I had a great time at the lake Volta and the surrounding fishing communities. The sunset boat cruise was magical.', author: 'Abena M.', date: '2025-12-03' },
  { id: 'e3', siteId: 'asenema-falls', siteName: 'Asenema Falls', image: '/assets/asenema-falls.jpg', text: 'I had a great time at the Asenema falls. A true hidden gem of Ghana — the jungle hike is worth every step!', author: 'Kofi B.', date: '2026-01-20' },
  { id: 'e4', siteId: 'boti-falls', siteName: 'Boti Falls', image: '/assets/boti-falls.png', text: 'I had a great time at the aburi botanical gardens. The twin waterfalls during rainy season are absolutely spectacular.', author: 'Ama S.', date: '2026-02-05' },
  { id: 'e5', siteId: 'kakum-national-park', siteName: 'The Kakum National Park', image: '/assets/kakum-national-park.png', text: 'I had a great time at the the kakum national park. The canopy walkway was both terrifying and exhilarating!', author: 'Yaw D.', date: '2026-01-08' },
  { id: 'e6', siteId: 'independence-arch', siteName: 'The Independence Arch', image: '/assets/mmmm.jpg', text: 'I had a great time at the independence arch. Standing where Ghana declared independence was deeply moving.', author: 'Efua K.', date: '2026-03-06' },
  { id: 'e7', siteId: 'larabanga-mosque', siteName: 'The Laranbaga Mosque', image: '/assets/mosque.jpg', text: 'Oh, it was a great experience that I will never forget. The ancient mud mosque felt like stepping back 600 years.', author: 'Ibrahim A.', date: '2026-02-14' },
  { id: 'e8', siteId: 'aburi-botanical-gardens', siteName: 'Aburi Botanical Gardens', image: '/assets/aburi-2.png', text: 'I had a great time at the aburi botanical gardens. Second visit and it keeps getting better every time.', author: 'Adwoa F.', date: '2026-03-01' },
]

export default function ExperiencesPage() {
  const { destinations, loading } = useData()
  const [experiences, setExperiences] = useState(INITIAL)
  const [text, setText] = useState('')
  const [selectedSite, setSelectedSite] = useState('')

  // Update selectedSite once destinations load
  useEffect(() => {
    if (destinations?.length > 0 && !selectedSite) {
      setSelectedSite(destinations[0].id)
    }
  }, [destinations, selectedSite])
  const [selectedExp, setSelectedExp] = useState(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(EXPERIENCES_KEY)
      if (stored) { const user = JSON.parse(stored); setExperiences([...user, ...INITIAL]) }
    } catch { /* no-op */ }
  }, [])

  const handleAdd = () => {
    if (!text.trim()) return
    const site = destinations.find((d) => d.id === selectedSite)
    const exp = { id: `eu-${Date.now()}`, siteId: selectedSite, siteName: site.name, image: site.image, text: text.trim(), author: 'You', date: new Date().toISOString().split('T')[0] }
    const updated = [exp, ...experiences]
    setExperiences(updated)
    try { const user = updated.filter((e) => e.id.startsWith('eu-')); localStorage.setItem(EXPERIENCES_KEY, JSON.stringify(user)) } catch { /* no-op */ }
    setText('')
  }

  const handleDelete = (id, e) => {
    e.stopPropagation()
    const updated = experiences.filter((exp) => exp.id !== id)
    setExperiences(updated)
    try { const user = updated.filter((e) => e.id.startsWith('eu-')); localStorage.setItem(EXPERIENCES_KEY, JSON.stringify(user)) } catch { /* no-op */ }
    if (selectedExp?.id === id) setSelectedExp(null)
  }

  return (
    <div className="exp-wrapper">
      <div className="exp-inner">
        {/* Submit Area */}
        <div className="exp-submit">
          <select value={selectedSite} onChange={(e) => setSelectedSite(e.target.value)} className="exp-select">
            {destinations.map((d) => (<option key={d.id} value={d.id}>{d.name}</option>))}
          </select>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Please type in your experience here" rows={4} maxLength={500} className="exp-textarea" />
          <div className="exp-submit-footer">
            <span className="exp-char-count">{text.length}/500</span>
            <button onClick={handleAdd} disabled={!text.trim()} className="exp-add-btn">
              <Plus size={16} /> Add Experience
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="exp-grid">
          {experiences.map((exp) => (
            <article key={exp.id} onClick={() => setSelectedExp(exp)} className="exp-card">
              <div className="exp-card-img">
                <img src={exp.image} alt={exp.siteName} className="fill-img" />
                <div className="exp-card-overlay" />
                {exp.id.startsWith('eu-') && (
                  <button onClick={(e) => handleDelete(exp.id, e)} className="exp-card-delete"><Trash2 size={12} /></button>
                )}
                <p className="exp-card-caption line-clamp-2">{exp.text}</p>
              </div>
              <div className="exp-card-footer">
                <p className="exp-card-name line-clamp-1">{exp.siteName}</p>
                <div className="exp-card-meta">
                  <p className="exp-card-loc"><MapPin size={9} /> {exp.siteName}</p>
                  <p className="exp-card-date">{exp.date}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedExp && (
          <div className="exp-modal">
            <div className="exp-modal-bg" onClick={() => setSelectedExp(null)} />
            <div className="exp-modal-card">
              <button onClick={() => setSelectedExp(null)} className="exp-modal-close"><X size={20} /></button>
              <div className="exp-modal-image">
                <img src={selectedExp.image} alt={selectedExp.siteName} className="fill-img" />
                <div className="exp-modal-image-gradient" />
              </div>
              <div className="exp-modal-body">
                <div className="exp-modal-header">
                  <h3 className="exp-modal-name">{selectedExp.siteName}</h3>
                  <div className="exp-modal-author-wrap">
                    <p className="exp-modal-author">{selectedExp.author}</p>
                    <p>{selectedExp.date}</p>
                  </div>
                </div>
                <div className="exp-modal-divider" />
                <p className="exp-modal-quote">&quot;{selectedExp.text}&quot;</p>
                <div style={{ paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                  {selectedExp.id.startsWith('eu-') && (
                    <button onClick={(e) => handleDelete(selectedExp.id, e)} className="exp-modal-delete">
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
