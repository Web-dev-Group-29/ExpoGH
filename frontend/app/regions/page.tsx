'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { destinations, CATEGORIES, type Category } from '@/lib/data'
import SiteCard from '@/components/SiteCard'

const REGIONS_LIST = [
  'All Regions','Greater Accra','Ashanti','Eastern','Western',
  'Central','Northern','Upper East','Upper West','Volta','Bono',
]

export default function RegionsPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All')
  const [activeRegion, setActiveRegion] = useState('All Regions')

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const q = query.toLowerCase()
      const matchQ = !q || d.name.toLowerCase().includes(q) || d.region.toLowerCase().includes(q)
      const matchC = activeCategory === 'All' || d.category === activeCategory
      const matchR = activeRegion === 'All Regions' || d.region === activeRegion
      return matchQ && matchC && matchR
    })
  }, [query, activeCategory, activeRegion])

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/assets/Rectangle 22.png"
          alt="Page background"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="relative z-10">

      {/* ── SEARCH BAR ── */}
      <section className="bg-transparent px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative max-w-2xl mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search regions, destinations..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 backdrop-blur-md border-none text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#c5932a]/40 text-sm transition-all shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* ── MAP + FILTER PANEL ── */}
      <section className="px-4 py-10 bg-transparent">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* LEFT: Featured Image with dashed border */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden border-2 border-dashed border-[#c5932a]/80 p-1.5 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                <Image
                  src="/assets/accra-ghana.jpg"
                  alt="Beautiful aerial view of a Ghanaian destination"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* MIDDLE: Ghana map - Large as requested */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-3xl transition-transform duration-500 hover:scale-[1.03]">
              <Image
                src="/assets/adobe-ghana.png"
                alt="Colourful map of Ghana's 16 regions"
                width={1000}
                height={1080}
                className="object-contain w-full drop-shadow-[0_50px_100px_rgba(0,0,0,0.6)]"
                priority
              />
            </div>
          </div>

          <div className="lg:col-span-3 bg-transparent backdrop-blur-none rounded-2xl border-none shadow-none overflow-hidden">
            <div className="grid grid-cols-2">
              <div className="bg-transparent p-3 text-center">
                <h3 className="text-white font-bold text-base uppercase tracking-widest">
                  Category
                </h3>
              </div>
              <div className="bg-transparent p-3 text-center">
                <h3 className="text-white font-bold text-base uppercase tracking-widest">
                  Region
                </h3>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-0 h-[400px]">
              {/* Category column */}
              <div className="p-4 overflow-y-auto no-scrollbar">
                <ul className="space-y-4">
                  {(['All', ...CATEGORIES] as (Category | 'All')[]).map((cat) => (
                    <li key={cat}>
                      <button
                        onClick={() => setActiveCategory(cat)}
                        className={`text-left text-sm w-full py-1 transition-colors ${
                          activeCategory === cat
                            ? 'text-[#c5932a] font-bold text-base'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Region column */}
              <div className="p-4 border-none overflow-y-auto no-scrollbar">
                <ul className="space-y-4">
                  {REGIONS_LIST.map((r) => (
                    <li key={r}>
                      <button
                        onClick={() => setActiveRegion(r)}
                        className={`text-left text-sm w-full py-1 transition-colors ${
                          activeRegion === r
                            ? 'text-[#c5932a] font-bold text-base'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {r}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ASHANTI REGION FEATURED ── */}
      <section className="px-4 py-20 bg-transparent">
        <div className="max-w-7xl mx-auto">
          {/* 3-panel: photo | card (title + map) | photo */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* LEFT PHOTO */}
            <div className="md:col-span-3 flex justify-center">
              <div className="relative w-full aspect-square max-w-[280px] rounded-[2rem] overflow-hidden border-2 border-dashed border-[#c5932a]/60 p-1.5 shadow-2xl">
                <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden">
                  <Image
                    src="/assets/courtyard.jpg"
                    alt="Traditional Ashanti courtyard architecture"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* CENTER COLLUMN - Reverted size but kept box/arrow removals */}
            <div className="md:col-span-6 relative text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Ashanti Region
              </h2>
              
              <div className="relative flex items-center justify-center min-h-[400px]">
                <div className="relative w-full max-w-[550px] transition-transform duration-500 hover:scale-105">
                  <Image
                    src="/assets/original-1.png"
                    alt="Map of the Ashanti Region"
                    width={600}
                    height={600}
                    className="object-contain w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT PHOTO */}
            <div className="md:col-span-3 flex justify-center">
              <div className="relative w-full aspect-square max-w-[280px] rounded-[2rem] overflow-hidden border-2 border-dashed border-[#c5932a]/60 p-1.5 shadow-2xl">
                <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden">
                  <Image
                    src="/assets/kakum-national-park.png"
                    alt="Kakum National Park rainforest"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed max-w-3xl mx-auto text-center">
            The Ashanti Region is a major cultural center in Ghana and the historic home of the
            Ashanti Kingdom. Its capital, Kumasi, is known for its rich traditions, royal heritage,
            and vibrant cultural life. Visitors can explore the Manhyia Palace Museum, the
            residence of the Asantehene, and the Prempeh II Jubilee Museum, which preserves royal
            artifacts and Ashanti history. Nature lovers can visit the scenic Lake Bosomtwe, while
            cultural experiences can be found at Bonwire Kente Weaving Village, famous for
            traditional Kente cloth weaving. Together these attractions highlight the region&apos;s
            deep cultural heritage and historical importance.
          </p>
        </div>
      </section>

      {/* ── DESTINATIONS GRID ── */}
      <section className="px-4 py-12 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400 text-sm">
              <span className="text-white font-medium">{filtered.length}</span> destination{filtered.length !== 1 ? 's' : ''}
            </p>
            {(activeCategory !== 'All' || activeRegion !== 'All Regions' || query) && (
              <button
                onClick={() => { setQuery(''); setActiveCategory('All'); setActiveRegion('All Regions') }}
                className="text-xs text-[#c5932a] hover:text-[#d4a528] underline"
              >
                Clear filters
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((dest) => (
                <SiteCard key={dest.id} destination={dest} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-gray-500 text-lg mb-2">No destinations found</p>
              <p className="text-gray-600 text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
      </div>
    </div>
  )
}
