import Image from 'next/image'
import Link from 'next/link'
import { CATEGORIES } from '@/lib/data'
import BotiFallsAlternate from '@/components/BotiFallsAlternate'
import Footer from '@/components/Footer'

export const metadata = {
  title: "ExpoGH — Discover Ghana's Culture, Nature & History",
  description:
    "Explore Ghana's stunning national parks, historic castles, vibrant cultures and breathtaking landscapes across all 16 regions.",
}

const REGIONS_LIST = [
  'Greater Accra','Ashanti','Eastern','Western','Central',
  'Northern','Upper East','Upper West','Volta','Bono',
]

const travelTips = [
  {
    title: 'Accommodation',
    image: '/assets/ggn.jpg',
    imageAlt: 'Luxury hotel and resort accommodation in Ghana',
    body: "Ghana offers a wide range of accommodation from luxury hotels in Accra to eco-lodges near national parks. Book in advance during peak season (Nov–Mar). Popular areas include Osu and Airport Residential in Accra. Expect to pay GHS 200–800/night for mid-range hotels.",
  },
  {
    title: 'Currency & Payments',
    image: '/assets/hgg.jpg',
    imageAlt: 'Ghana Cedi banknotes — the local currency for visitors',
    body: "The Ghanaian Cedi (GHS) is the local currency. ATMs are widely available in cities. Credit cards are accepted at major hotels. Always carry cash for markets and rural transport. USD and EUR can be exchanged at licensed forex bureaus across the country.",
  },
  {
    title: 'Health & Hospitals',
    image: '/assets/bank-hospital.png',
    imageAlt: 'Bank Hospital Ghana — quality healthcare for visitors',
    body: "Malaria prophylaxis is strongly recommended before visiting. Ensure Yellow Fever vaccination is up to date. Major hospitals include Korle Bu Teaching Hospital and the Bank Hospital in Accra. Travel insurance with medical coverage is essential for all visitors.",
  },
  {
    title: 'Climate & Weather',
    image: '/assets/mountain-forest.jpg',
    imageAlt: "Ghana's lush mountain forests and misty tropical climate",
    body: "Ghana has a tropical climate with two rainy seasons (April–June and September–November). The best travel time is November to March when it's dry and sunny. Harmattan winds from December to February bring dusty conditions to the north. Coastal areas remain humid year-round.",
  },
  {
    title: 'Transportation',
    image: '/assets/tra.jpg',
    imageAlt: 'Ghana transportation options — rail, road, air and water',
    body: "Tro-tros (shared minibuses) are the cheapest local transport. Uber and taxis operate across Accra. For intercity travel, VIP and STC buses provide comfortable options. Domestic flights connect Accra to Kumasi and Tamale. Car rental is available but roads can be challenging.",
  },
  {
    title: 'Culture & Etiquette',
    image: '/assets/grasroot.jpg',
    imageAlt: 'Traditional Ghanaian lodge and cultural architecture',
    body: "Ghanaians are exceptionally welcoming and friendly people. Always greet before any transaction. Remove shoes when entering homes. Use your right hand for eating and giving items. Always ask before photographing people. Dress modestly when visiting religious and traditional sites.",
  },
]

const whyCards = [
  {
    title: 'User-Friendly Experiences',
    body: "Navigate Ghana's diverse attractions with ease. Filter by region, category, or interest to find your perfect adventure.",
    image: '/assets/cytuh.jpg',
    imageAlt: 'Aerial view of African resort lodge by a lake in Ghana',
  },
  {
    title: 'Visually Inspiring',
    body: "Stunning photography and immersive design bring Ghana's landscapes, culture, and heritage to life.",
    image: '/assets/jjjj.jpg',
    imageAlt: 'Scenic bridge and lake landscape in Ghana',
  },
  {
    title: 'Shareable Destinations',
    body: "Save your favourite spots and share curated Ghana travel lists with friends, making trip planning a joy.",
    image: '/assets/lllll.jpg',
    imageAlt: 'Modern hotel complex aerial view in Ghana',
  },
]

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-charcoal-950 min-h-screen transition-colors duration-300">
      {/* ── HERO & REGIONS WITH SHARED BACKGROUND ── */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Shared Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/mountain-forest.jpg"
            alt="Aerial view of Ghana — explore the country's diverse regions"
            fill
            priority
            className="object-cover"
          />
          {/* Gradient overlay to fade into the background color at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-charcoal-900/80 to-charcoal-950" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 pt-16 pb-20">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            Explore Ghana
          </h1>
          <p className="text-sm md:text-lg text-gray-200 mb-8 font-medium">
            Discover Ghana&apos;s Culture, Nature &amp; History
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/regions" className="px-6 py-2.5 rounded-full text-sm font-semibold bg-charcoal-800/80 text-white hover:bg-[#c5932a] hover:text-charcoal-950 transition-colors backdrop-blur-md border border-white/5 shadow-lg">
              Explore Regions
            </Link>
            <Link href="/experiences" className="px-6 py-2.5 rounded-full text-sm font-semibold bg-charcoal-800/80 text-white hover:bg-[#c5932a] hover:text-charcoal-950 transition-colors backdrop-blur-md border border-white/5 shadow-lg">
              View Destination
            </Link>
          </div>
        </div>

        {/* ── EXPLORE GHANA BY REGION ── */}
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-4">
          {/* Left — Ghana map */}
          <div className="flex justify-center">
            <Image
              src="/assets/adobe-ghana.png"
              alt="Map of Ghana showing all 16 regions with colour coding"
              width={420}
              height={460}
              className="object-contain w-full max-w-sm"
            />
          </div>

          {/* Right — Card */}
          <div className="bg-gray-100/30 dark:bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-gray-300 dark:border-white/10 shadow-2xl">
            <h2 className="text-xl md:text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Explore Ghana by Region
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed text-left">
              Ghana is a nation of diverse landscapes and living traditions, from the urban energy of Greater Accra and royal Ashanti heritage to Central&apos;s historic coastline and Western&apos;s rainforest beauty. Eastern offers mountains and waterfalls, Volta showcases highlands, Northern stretches into savannah and wildlife, while Upper East, Upper West, Bono, Bono East, Ahafo, Oti, Western North, Savannah, and North East reflect culture, rivers, forests, plains, and strong community traditions.
            </p>
          </div>
        </div>
      </section>

      {/* ── CATEGORY / REGION FILTER ── */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto space-y-4 text-center lg:text-left flex flex-col items-center">
          {/* Category */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-gray-600 dark:text-gray-400 text-xs font-bold uppercase tracking-widest mr-2">
              CATEGORY
            </span>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/regions?category=${cat}`}
                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/60 dark:bg-charcoal-900 border border-gray-300/40 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-[#c5932a] hover:text-white hover:border-[#c5932a] dark:hover:border-[#c5932a] transition-all shadow-sm hover:shadow-md"
              >
                {cat}
              </Link>
            ))}
          </div>
          {/* Region */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-gray-600 dark:text-gray-400 text-xs font-bold uppercase tracking-widest mr-2">
              REGION
            </span>
            {REGIONS_LIST.map((r) => (
              <Link
                key={r}
                href={`/regions?region=${encodeURIComponent(r)}`}
                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/60 dark:bg-charcoal-900 border border-gray-300/40 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-[#c5932a] hover:text-white hover:border-[#c5932a] dark:hover:border-[#c5932a] transition-all shadow-sm hover:shadow-md"
              >
                {r}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE BOTI WATER FALLS & ABOUT ── */}
      <section className="pt-20 pb-4 px-4 relative z-20">
        <div className="max-w-6xl mx-auto">

          <div className="text-center relative">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-8">
              The Boti Water falls
            </h2>

            <BotiFallsAlternate />
          </div>

        </div>
      </section>

      {/* Sweeping Curve separator 1 */}
      <div className="w-full flex justify-center -mt-6 md:-mt-10 mb-8 px-4 relative z-10 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-[150%] md:w-[110%] h-12 md:h-20 stroke-black/40 fill-none stroke-[3px]">
          <path d="M0,0 Q500,100 1000,0" />
        </svg>
      </div>

      {/* ABOUT BOTI FALLS */}
      <section className="px-4 text-center z-20 relative mb-4">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3">About Boti Falls</h3>
        <p className="text-gray-700 dark:text-gray-300/90 text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-medium">
          Boti Falls is a beautiful twin waterfall in Ghana&apos;s Eastern Region, surrounded by lush
          forest and scenic rocks. It offers a refreshing natural escape and stunning views,
          especially during the rainy season when the falls flow strongly.
        </p>
      </section>

      {/* Sweeping Curve separator 2 */}
      <div className="w-full flex justify-center mb-16 px-4 relative z-10 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-[150%] md:w-[110%] h-12 md:h-20 stroke-black/40 fill-none stroke-[3px]">
          <path d="M0,0 Q500,100 1000,0" />
        </svg>
      </div>

      {/* ── TRAVEL TIPS ── */}
      <section className="py-8 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-12 relative z-20">
            Travel Tips for Visitors to Ghana
          </h2>

          <div className="flex flex-col space-y-12">
            {travelTips.map((tip, i) => (
              <div
                key={tip.title}
                className={`flex flex-col md:flex-row ${
                  i % 2 !== 0
                    ? 'md:flex-row-reverse self-end md:translate-x-4'
                    : 'self-start md:-translate-x-4'
                } w-full md:w-[70%] rounded-2xl overflow-hidden bg-gray-100 dark:bg-charcoal-900 border border-gray-300 dark:border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform hover:scale-[1.02] duration-300 relative`}
              >
                {/* Image half */}
                <div className="relative w-full md:w-[45%] h-64 shrink-0">
                  <Image
                    src={tip.image}
                    alt={tip.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                </div>

                {/* Text half */}
                <div className="w-full md:w-[55%] flex flex-col justify-center text-center md:text-left px-8 py-8 md:px-10">
                  <h3 className="text-gray-900 dark:text-white font-bold text-lg md:text-xl mb-3">{tip.title}</h3>
                  <p className="text-gray-700 dark:text-gray-400 text-[13px] leading-relaxed font-medium">{tip.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY EXPO GH ── */}
      <section className="py-16 px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">
            Why ExpoGH
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyCards.map((card) => (
              <div
                key={card.title}
                className="relative rounded-2xl overflow-hidden h-64 group cursor-pointer"
              >
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <h3 className="text-white font-bold text-lg mb-3">{card.title}</h3>
                  <p className="text-white/90 text-xs md:text-sm leading-relaxed">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
