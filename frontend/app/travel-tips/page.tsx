'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Info, Navigation, ShieldCheck, Sun, Wallet } from 'lucide-react'

const travelTips = [
  {
    title: "Best Time to Visit",
    icon: <Sun className="text-orange-400" />,
    description: "The best time to visit Ghana is during the dry season from October to March, when the weather is pleasant and wildlife viewing in Mole National Park is at its peak.",
    image: "/assets/mountain-forest.jpg"
  },
  {
    title: "Currency & Payments",
    icon: <Wallet className="text-green-400" />,
    description: "The local currency is the Ghana Cedi (GHS). While major hotels and malls in Accra accept cards, it's essential to carry cash for local markets and smaller towns.",
    image: "/assets/grasroot.jpg"
  },
  {
    title: "Safety & Health",
    icon: <ShieldCheck className="text-blue-400" />,
    description: "Ghana is known as one of Africa's safest countries. Ensure you have your Yellow Fever certificate and take malaria precautions before traveling.",
    image: "/assets/courtyard.jpg"
  },
  {
    title: "Local Etiquette",
    icon: <Info className="text-[#c5932a]" />,
    description: "Ghanaians are incredibly friendly. Always use your right hand for giving or receiving items, and greeting others is highly valued in local culture.",
    image: "/assets/accra-ghana.jpg"
  }
]

export default function TravelTipsPage() {
  return (
    <div className="min-h-screen bg-charcoal-950 pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Hero Section */}
        <section className="relative rounded-3xl overflow-hidden mb-16 h-[40vh] min-h-[300px]">
          <Image 
            src="/assets/tour-sites.jpg"
            alt="Ghana Travel Header"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/90 via-charcoal-950/40 to-transparent flex items-center">
            <div className="pl-8 md:pl-16 max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Travel Tips</h1>
              <p className="text-gray-200 text-lg">
                Everything you need to know for a smooth and memorable journey through the heart of West Africa.
              </p>
            </div>
          </div>
        </section>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {travelTips.map((tip, idx) => (
            <div key={idx} className="bg-charcoal-900 border border-white/10 rounded-2xl overflow-hidden flex flex-col sm:flex-row">
              <div className="relative w-full sm:w-48 h-48 sm:h-auto shrink-0">
                <Image src={tip.image} alt={tip.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-charcoal-950 rounded-lg">{tip.icon}</div>
                  <h3 className="text-xl font-bold text-white">{tip.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Getting Around Section */}
        <section className="bg-charcoal-900 rounded-3xl p-8 md:p-12 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Getting Around</h2>
              <div className="space-y-4">
                {[
                  "Tro-tros: The local, affordable way to travel between cities.",
                  "Ride-sharing: Uber and Bolt are widely available in Accra and Kumasi.",
                  "Domestic Flights: Africa World Airlines and PassionAir connect major cities.",
                  "Private Rental: For comfort, consider renting a car with a driver."
                ].map((text, i) => (
                  <div key={i} className="flex gap-3 text-gray-300">
                    <CheckCircle2 className="text-[#c5932a] shrink-0 mt-1" size={18} />
                    <p>{text}</p>
                  </div>
                ))}
              </div>
              <Link 
                href="/regions" 
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-[#c5932a] text-charcoal-950 font-bold rounded-xl hover:bg-[#d4a528] transition-colors"
              >
                <Navigation size={18} /> Start Exploring
              </Link>
            </div>
            <div className="relative h-[300px] rounded-2xl overflow-hidden border border-white/5">
              <Image src="/assets/photo5.jpg" alt="Transportation in Ghana" fill className="object-cover" />
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
