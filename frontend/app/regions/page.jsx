'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, X } from 'lucide-react'
import { destinations, CATEGORIES } from '@/lib/data'
import SiteCard from '@/components/SiteCard'

const REGIONS_LIST = [
  'All Regions','Greater Accra','Ashanti','Eastern','Western',
  'Central','Northern','Upper East','Upper West','Volta','Bono',
]

export default function RegionsPage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeRegion, setActiveRegion] = useState('All Regions')
  const [showAburiModal, setShowAburiModal] = useState(false)

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
    <div className="min-h-screen relative overflow-x-hidden bg-white dark:bg-charcoal-950 transition-colors duration-300">
      {/* Background Image - Dark mode only */}
      <div className="fixed inset-0 z-0 pointer-events-none dark:block hidden">
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
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search regions, destinations..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-gray-300/50 dark:border-none text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#c5932a]/40 text-sm transition-all shadow-2xl"
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
                    {(['All', ...CATEGORIES]).map((cat) => (
                      <li key={cat}>
                        <button
                          onClick={() => setActiveCategory(cat)}
                          className={`text-left text-sm w-full py-1 transition-colors ${
                            activeCategory === cat
                              ? 'text-[#c5932a] font-bold text-base'
                              : 'text-gray-600 dark:text-gray-400 hover:text-[#c5932a] dark:hover:text-white'
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
                              : 'text-gray-600 dark:text-gray-400 hover:text-[#c5932a] dark:hover:text-white'
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
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
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

            <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed max-w-3xl mx-auto text-center">
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
              <p className="text-gray-700 dark:text-gray-400 text-sm">
                <span className="text-gray-900 dark:text-white font-medium">{filtered.length}</span> destination{filtered.length !== 1 ? 's' : ''}
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
                <p className="text-gray-600 dark:text-gray-500 text-lg mb-2">No destinations found</p>
                <p className="text-gray-700 dark:text-gray-600 text-sm">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </section>

        {/* ── ABURI BOTANICAL GARDENS SECTION ── */}
        <section className="px-4 py-16 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left: Content Card */}
              <div className="w-full">
                <div className="bg-[#4a5240]/80 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/10 space-y-6">
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center">
                    Aburi Botanical Gardens
                  </h2>
                  <div className="space-y-6 text-gray-200 text-sm md:text-base leading-relaxed font-medium">
                    <p className="line-clamp-4 md:line-clamp-none">
                      Located in the hills of the Eastern Region near the town of Aburi, the Aburi Botanical Gardens
                      is one of Ghana&apos;s most peaceful and scenic natural attractions. Established during the colonial
                      period in 1890, the gardens cover a large area filled with tropical plants, towering trees,
                      and beautifully maintained lawns.
                    </p>
                    <p className="hidden md:block">
                      Visitors come to the gardens to enjoy the cool mountain climate, walk through shaded paths,
                      and relax in the calm natural environment overlooking parts of the Eastern Region. The gardens
                      feature several plant species used for medicinal, ornamental, and research purposes, making
                      it both a recreational and educational destination.
                    </p>
                    <p className="hidden md:block">
                      Because of its serene atmosphere and beautiful landscape, Aburi Botanical Gardens is also
                      a popular location for picnics, photography, nature walks, and small events. It offers
                      visitors a refreshing escape from the busy city life of nearby Accra while showcasing the
                      beauty of Ghana&apos;s plant life and natural environment.
                    </p>
                    <button 
                      onClick={() => setShowAburiModal(true)}
                      className="md:hidden text-[#c5932a] hover:text-[#d4a528] font-bold text-left focus:outline-none"
                    >
                      Read full description
                    </button>
                  </div>
                </div>
              </div>

              {/* Right: Images Panel */}
              <div className="w-full space-y-10">
                {/* Top Image */}
                <div className="relative w-full aspect-[16/10] rounded-[2.5rem] overflow-hidden border-4 border-dashed border-[#c5932a] p-2 shadow-[0_40px_80px_rgba(0,0,0,0.6)] transition-transform hover:scale-[1.02]">
                  <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden">
                    <Image
                      src="/assets/aburi-botanical-gardens.jpg"
                      alt="Aburi Botanical Gardens View"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Bottom Map Image */}
                <div className="space-y-4">
                  <a
                    href="https://www.google.com/maps/search/Aburi+Botanical+gardens/@5.8511254,-0.1755178,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative w-full aspect-[16/10] rounded-[2.5rem] overflow-hidden border-4 border-dashed border-[#c5932a] p-2 shadow-[0_40px_80px_rgba(0,0,0,0.6)] cursor-pointer transition-transform hover:scale-[1.02] group"
                  >
                    <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden">
                      <Image
                        src="/assets/map-pin-screenshot.png"
                        alt="Map directions to Aburi Botanical Gardens"
                        fill
                        className="object-cover transition-transform group-hover:scale-105 duration-700"
                      />
                    </div>
                  </a>
                  <p className="text-center text-white/70 text-xs md:text-sm font-bold tracking-tight">
                    Click the map image to open the map and directions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TOURIST SITES GRID SECTION ── */}
        <section className="px-4 py-32 bg-transparent relative">
          <div className="max-w-7xl mx-auto space-y-4">

            {/* Decorative Divider Top (Valley Curve) */}
            <div className="flex justify-center mb-28">
              <div className="w-full max-w-4xl h-[2px] bg-gradient-to-r from-transparent via-[#c5932a]/40 to-transparent relative">
                <div className="absolute left-1/2 -top-12 -translate-x-1/2 w-80 h-20 opacity-20 bg-[#c5932a] blur-3xl rounded-full"></div>
                <div className="absolute left-1/2 -top-1 -translate-x-1/2 w-full h-[1.5px] bg-[#c5932a]/50"></div>
              </div>
            </div>

            <div className="relative px-2 md:px-0">
              {/* ROW 1: 5 small images in an UPWARD BENDING ARC (Valley/Smile Shape: Edges High, Center Low) */}
              <div className="grid grid-cols-10 gap-2 md:gap-5 items-center mb-24">
                {[
                  { src: "/assets/accra-ghana.jpg", y: "-translate-y-10", s: "scale-100" },
                  { src: "/assets/kakum-3.jpg", y: "translate-y-0", s: "scale-90" },
                  { src: "/assets/lake-volta.png", y: "translate-y-8", s: "scale-110" },
                  { src: "/assets/gcnhh.jpg", y: "translate-y-0", s: "scale-90" },
                  { src: "/assets/asenema-falls.jpg", y: "-translate-y-10", s: "scale-100" }
                ].map((img, idx) => (
                  <div key={`r1-${idx}`} className={`col-span-2 aspect-[4/3] relative rounded-xl md:rounded-[2.2rem] overflow-hidden border-2 md:border-[3px] border-dashed border-[#c5932a]/90 p-0.5 md:p-1.5 shadow-[0_25px_45px_rgba(0,0,0,0.6)] hover:scale-115 hover:z-50 transition-all duration-500 cursor-pointer ${img.y} ${img.s} z-10`}>
                    <div className="relative w-full h-full rounded-lg md:rounded-[1.8rem] overflow-hidden">
                      <Image src={img.src} alt={`Tourist site ${idx + 1}`} fill className="object-cover" />
                    </div>
                  </div>
                ))}
              </div>

              {/* ROW 2: 2 large images - Significantly Increased Size */}
              <div className="grid grid-cols-10 gap-5 md:gap-12 mb-28 mt-24">
                <div className="col-span-5 aspect-[16/10] relative rounded-3xl md:rounded-[3.5rem] overflow-hidden border-2 md:border-[6px] border-dashed border-[#c5932a]/90 p-0.5 md:p-2 shadow-[0_45px_90px_rgba(0,0,0,0.9)] scale-[1.02] hover:scale-[1.06] hover:z-50 transition-all duration-700 cursor-pointer -rotate-1 translate-x-2">
                  <div className="relative w-full h-full rounded-2xl md:rounded-[3rem] overflow-hidden">
                    <Image src="/assets/aburi-2.png" alt="Featured Resort" fill className="object-cover" />
                  </div>
                </div>
                <div className="col-span-5 aspect-[16/10] relative rounded-3xl md:rounded-[3.5rem] overflow-hidden border-2 md:border-[6px] border-dashed border-[#c5932a]/90 p-0.5 md:p-2 shadow-[0_45px_90px_rgba(0,0,0,0.9)] scale-[1.02] hover:scale-[1.06] hover:z-50 transition-all duration-700 cursor-pointer rotate-1 -translate-x-2">
                  <div className="relative w-full h-full rounded-2xl md:rounded-[3rem] overflow-hidden">
                    <Image src="/assets/sogakope.png" alt="Pool side" fill className="object-cover" />
                  </div>
                </div>
              </div>

              {/* ROW 3: 5 small images in an UPWARD MOUNTAIN ARC */}
              <div className="grid grid-cols-10 gap-2 md:gap-5 items-center mt-20">
                {[
                  { src: "/assets/mesoleum.jpg", y: "translate-y-10", s: "scale-90" },
                  { src: "/assets/rock.jpg", y: "translate-y-0", s: "scale-100" },
                  { src: "/assets/hbo.jpg", y: "-translate-y-8", s: "scale-120" },
                  { src: "/assets/mmmm.jpg", y: "translate-y-0", s: "scale-100" },
                  { src: "/assets/nzulenzu.jpg", y: "translate-y-10", s: "scale-90" }
                ].map((img, idx) => (
                  <div key={`r3-${idx}`} className={`col-span-2 aspect-[4/3] relative rounded-xl md:rounded-[2.2rem] overflow-hidden border-2 md:border-[3px] border-dashed border-[#c5932a]/90 p-0.5 md:p-1.5 shadow-[0_25px_45px_rgba(0,0,0,0.6)] hover:scale-115 hover:z-50 transition-all duration-500 cursor-pointer ${img.y} ${img.s} z-10`}>
                    <div className="relative w-full h-full rounded-lg md:rounded-[1.8rem] overflow-hidden">
                      <Image src={img.src} alt={`Tourist site ${idx + 6}`} fill className="object-cover" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative Divider Bottom */}
            <div className="flex justify-center mt-36">
              <div className="w-full max-w-4xl h-[2px] bg-gradient-to-r from-transparent via-[#c5932a]/20 to-transparent relative">
                <div className="absolute left-1/2 -bottom-10 -translate-x-1/2 w-80 h-16 opacity-30 bg-[#c5932a] blur-3xl rounded-full"></div>
                <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-full h-[1px] bg-[#c5932a]/60"></div>
              </div>
            </div>

          </div>
        </section>

        {/* ── ABURI BOTANICAL GARDENS MODAL (MOBILE ONLY) ── */}
        {showAburiModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 md:hidden">
            <div 
              className="absolute inset-0"
              onClick={() => setShowAburiModal(false)}
            />
            <div className="bg-[#4a5240] border border-[#c5932a]/40 rounded-3xl w-full max-w-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-200 relative z-10 max-h-[85vh] flex flex-col">
              <div className="flex justify-between items-center p-5 border-b border-white/10 shrink-0">
                <h3 className="text-lg font-bold text-white">Aburi Botanical Gardens</h3>
                <button
                  onClick={() => setShowAburiModal(false)}
                  className="p-1.5 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto custom-scrollbar space-y-4 text-gray-200 text-sm leading-relaxed font-medium">
                <p>
                  Located in the hills of the Eastern Region near the town of Aburi, the Aburi Botanical Gardens
                  is one of Ghana&apos;s most peaceful and scenic natural attractions. Established during the colonial
                  period in 1890, the gardens cover a large area filled with tropical plants, towering trees,
                  and beautifully maintained lawns.
                </p>
                <p>
                  Visitors come to the gardens to enjoy the cool mountain climate, walk through shaded paths,
                  and relax in the calm natural environment overlooking parts of the Eastern Region. The gardens
                  feature several plant species used for medicinal, ornamental, and research purposes, making
                  it both a recreational and educational destination.
                </p>
                <p>
                  Because of its serene atmosphere and beautiful landscape, Aburi Botanical Gardens is also
                  a popular location for picnics, photography, nature walks, and small events. It offers
                  visitors a refreshing escape from the busy city life of nearby Accra while showcasing the
                  beauty of Ghana&apos;s plant life and natural environment.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
