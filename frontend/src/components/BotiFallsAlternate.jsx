
import { useState, useEffect } from 'react'


const states = [
  {
    centerImg: '/assets/boti-falls.png',
    leftTopImg: '/assets/kakum-national-park.png',
    leftBotImg: '/assets/mosque.jpg',
    rightTopImg: '/assets/mesoleum.jpg',
    rightBotImg: '/assets/hoooo.jpg',
    positions: {
      leftTop: { left: '-5rem', top: '1.5rem', zIndex: 30 },
      leftBot: { left: '-3rem', bottom: '-3rem', zIndex: 30 },
      rightTop: { right: '-6rem', top: '1.5rem', zIndex: 30 },
      rightBot: { right: '-4rem', bottom: '-3rem', zIndex: 30 },
    }
  },
  {
    centerImg: '/assets/asenema-falls.jpg',
    leftTopImg: '/assets/kakum-national-park.png',
    leftBotImg: '/assets/mosque.jpg',
    rightTopImg: '/assets/cytuh.jpg',
    rightBotImg: '/assets/hoooo.jpg',
    positions: {
      leftTop: { left: '-12rem', top: '5rem', transform: 'scale(1.1)', zIndex: 30 },
      leftBot: { left: '-9rem', bottom: '-0.5rem', transform: 'scale(1.1)', zIndex: 30 },
      rightTop: { right: '-12rem', top: '5rem', transform: 'scale(1.1)', zIndex: 30 },
      rightBot: { right: '-10rem', bottom: '-4rem', transform: 'scale(1.1)', zIndex: 30 },
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

  const floatBase = {
    border: '3px dashed #c5932a',
    borderRadius: '1rem',
    overflow: 'hidden',
    transition: 'all 1000ms ease-in-out',
    position: 'absolute',
  }

  return (
    <div className="boti-container">
      {/* Left Top */}
      <div className="boti-float" style={{ ...current.positions.leftTop, width: '10rem', height: '8rem', transform: `rotate(-6deg) ${current.positions.leftTop.transform || ''}` }}>
        <img src={current.leftTopImg} style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, objectFit: 'cover' }} alt="Kakum Walkway" />
      </div>

      {/* Left Bot */}
      <div className="boti-float" style={{ ...current.positions.leftBot, width: '7rem', height: '7rem', transform: `rotate(3deg) ${current.positions.leftBot.transform || ''}` }}>
        <img src={current.leftBotImg} style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, objectFit: 'cover' }} alt="Larabanga" />
      </div>

      {/* Right Top */}
      <div className="boti-float" style={{ ...current.positions.rightTop, width: '9rem', height: '7rem', transform: `rotate(6deg) ${current.positions.rightTop.transform || ''}` }}>
        <img src={states[0].rightTopImg} style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, objectFit: 'cover', transition: 'opacity 1000ms ease-in-out', opacity: activeIdx === 0 ? 1 : 0 }} alt="Top Right 1" />
        <img src={states[1].rightTopImg} style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, objectFit: 'cover', transition: 'opacity 1000ms ease-in-out', opacity: activeIdx === 1 ? 1 : 0 }} alt="Top Right 2" />
      </div>

      {/* Right Bot */}
      <div className="boti-float" style={{ ...current.positions.rightBot, width: '10rem', height: '7rem', transform: `rotate(-3deg) ${current.positions.rightBot.transform || ''}` }}>
        <img src={current.rightBotImg} style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, objectFit: 'cover' }} alt="Bottom Right" />
      </div>

      {/* Center */}
      <div className="boti-center">
        <img src={states[0].centerImg} alt="The Boti Water Falls 1" style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, objectFit: 'cover', transition: 'opacity 1000ms ease-in-out', opacity: activeIdx === 0 ? 1 : 0 }} />
        <img src={states[1].centerImg} alt="The Boti Water Falls 2" style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, objectFit: 'cover', transition: 'opacity 1000ms ease-in-out', opacity: activeIdx === 1 ? 1 : 0 }} />
      </div>
    </div>
  )
}
