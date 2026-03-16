'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const states = [
  {
    centerImg: '/assets/boti-falls.png',
    leftTopImg: '/assets/kakum-national-park.png',
    leftBotImg: '/assets/mosque.jpg',
    rightTopImg: '/assets/mesoleum.jpg',
    rightBotImg: '/assets/hoooo.jpg',
    positions: {
      leftTop: '-left-20 top-6 z-30',
      leftBot: '-left-12 -bottom-12 z-30',
      rightTop: '-right-24 top-6 z-30',
      rightBot: '-right-16 -bottom-12 z-30',
    }
  },
  {
    centerImg: '/assets/asenema-falls.jpg',
    leftTopImg: '/assets/kakum-national-park.png',
    leftBotImg: '/assets/mosque.jpg',
    rightTopImg: '/assets/cytuh.jpg',
    rightBotImg: '/assets/hoooo.jpg',
    positions: {
      leftTop: '-left-48 top-20 scale-110 z-30',
      leftBot: '-left-36 -bottom-2 scale-110 z-30',
      rightTop: '-right-48 top-20 scale-110 z-30',
      rightBot: '-right-40 -bottom-16 scale-110 z-30',
    }
  }
]

export default function BotiFallsAlternate() {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev === 0 ? 1 : 0))
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const current = states[activeIdx]

  return (
    <div className="relative flex justify-center h-56 md:h-[400px] w-full max-w-[700px] mx-auto z-20">
      
      {/* Floating Images (Left Top) */}
      <div className={`hidden lg:block absolute border-[3px] border-dashed border-[#c5932a] rounded-2xl overflow-hidden w-40 h-32 transform -rotate-6 transition-all duration-1000 ease-in-out ${current.positions.leftTop}`}>
        <Image src={current.leftTopImg} fill className="object-cover" alt="Kakum Walkway" />
      </div>

      {/* Floating Images (Left Bot) */}
      <div className={`hidden lg:block absolute border-[3px] border-dashed border-[#c5932a] rounded-2xl overflow-hidden w-28 h-28 transform rotate-3 transition-all duration-1000 ease-in-out ${current.positions.leftBot}`}>
        <Image src={current.leftBotImg} fill className="object-cover" alt="Larabanga" />
      </div>

      {/* Floating Images (Right Top) */}
      <div className={`hidden lg:block absolute border-[3px] border-dashed border-[#c5932a] rounded-2xl overflow-hidden w-36 h-28 transform rotate-6 transition-all duration-1000 ease-in-out ${current.positions.rightTop}`}>
        <Image 
          src={states[0].rightTopImg} 
          fill 
          className={`object-cover transition-opacity duration-1000 ease-in-out ${activeIdx === 0 ? 'opacity-100' : 'opacity-0'}`} 
          alt="Top Right 1" 
        />
        <Image 
          src={states[1].rightTopImg} 
          fill 
          className={`object-cover transition-opacity duration-1000 ease-in-out ${activeIdx === 1 ? 'opacity-100' : 'opacity-0'}`} 
          alt="Top Right 2" 
        />
      </div>

      {/* Floating Images (Right Bot) */}
      <div className={`hidden lg:block absolute border-[3px] border-dashed border-[#c5932a] rounded-2xl overflow-hidden w-40 h-28 transform -rotate-3 transition-all duration-1000 ease-in-out ${current.positions.rightBot}`}>
        <Image src={current.rightBotImg} fill className="object-cover" alt="Bottom Right" />
      </div>

      {/* Center Main Image */}
      <div className="relative rounded-3xl overflow-hidden w-full h-full shadow-2xl z-20 border-2 border-transparent">
        {/* We can use two images overlapping and fading their opacity so the transition is smooth */}
        <Image
          src={states[0].centerImg}
          alt="The Boti Water Falls 1"
          fill
          className={`object-cover transition-opacity duration-1000 ease-in-out ${activeIdx === 0 ? 'opacity-100' : 'opacity-0'}`}
        />
        <Image
          src={states[1].centerImg}
          alt="The Boti Water Falls 2"
          fill
          className={`object-cover transition-opacity duration-1000 ease-in-out ${activeIdx === 1 ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    </div>
  )
}
