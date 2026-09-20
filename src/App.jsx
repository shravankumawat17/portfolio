import React, { useState, useEffect } from 'react'
import ThreeCanvas from './components/ThreeCanvas'
import FilmOverlay from './components/FilmOverlay'
import CinemaNav from './components/CinemaNav'
import CountdownLeader from './sections/start/CountdownLeader'
import HeroCinemaUniverse from './sections/start/HeroCinemaUniverse'
import WorkReel from './sections/work/WorkReel'
import EndCredits from './sections/end/EndCredits'

export default function App() {
  const [introActive, setIntroActive] = useState(true)
  const [currentSection, setCurrentSection] = useState('start')

  // Check session persistence
  useEffect(() => {
    try {
      const alreadyPlayed = sessionStorage.getItem('shravan_intro_played')
      if (alreadyPlayed === 'true') {
        setIntroActive(false)
      }
    } catch (e) {
      // fallback
    }
  }, [])

  const handleIntroComplete = () => {
    try {
      sessionStorage.setItem('shravan_intro_played', 'true')
    } catch (e) {}
    setIntroActive(false)
  }

  const handleLoopBack = () => {
    try {
      sessionStorage.removeItem('shravan_intro_played')
    } catch (e) {}
    setIntroActive(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleEnterFeature = () => {
    const workEl = document.getElementById('work')
    if (workEl) {
      workEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#060608] text-[#f5f5f0] font-sans selection:bg-[#d4af37] selection:text-black relative">
      {/* 3D WebGL Cinema Dust & Gyroscope Canvas */}
      <ThreeCanvas />

      {/* Visual cinema overlay */}
      <FilmOverlay />

      {/* Opening Countdown & Title Card Leader */}
      {introActive ? (
        <CountdownLeader onComplete={handleIntroComplete} />
      ) : null}

      {/* Top Fixed Cinema Navigation */}
      <CinemaNav 
        currentSection={currentSection}
        onNavigate={setCurrentSection}
        introActive={introActive}
      />

      {/* Main Continuous Cinematic Feature */}
      <main className="w-full">
        {/* START: Scene 01 • The Cinematic Universe Landing */}
        <HeroCinemaUniverse onEnterVerse={handleEnterFeature} />

        {/* WORK: Scene 02 • Acts I, II, III & Training */}
        <WorkReel />

        {/* THE END: Scene 03 • Closing Credits & Starring Shravan */}
        <EndCredits onLoopBack={handleLoopBack} />
      </main>
    </div>
  )
}
