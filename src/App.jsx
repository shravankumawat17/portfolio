import React, { useState, useEffect } from 'react'
import ThreeCanvas from './components/ThreeCanvas'
import FilmOverlay from './components/FilmOverlay'
import CinemaNav from './components/CinemaNav'
import DeadpoolKnifeCursor from './components/DeadpoolKnifeCursor'
import ResumeSidebarDrawer from './components/ResumeSidebarDrawer'
import BoxOfficeTicketStage from './sections/start/BoxOfficeTicketStage'
import CountdownLeader from './sections/start/CountdownLeader'
import HeroCinemaUniverse from './sections/start/HeroCinemaUniverse'
import WorkReel from './sections/work/WorkReel'
import EndCredits from './sections/end/EndCredits'
import useScrollReveal from './hooks/useScrollReveal'

export default function App() {
  const [introPhase, setIntroPhase] = useState('ticket') // 'ticket' | 'countdown' | 'completed'
  const [currentSection, setCurrentSection] = useState('start')

  // Initialize smooth scroll reveal animations & scene audio triggers
  useScrollReveal()

  // Check session persistence
  useEffect(() => {
    try {
      const alreadyPlayed = sessionStorage.getItem('shravan_intro_played')
      if (alreadyPlayed === 'true') {
        setIntroPhase('completed')
      }
    } catch (e) {
      // fallback
    }
  }, [])

  const handleTicketConfirmed = () => {
    setIntroPhase('countdown')
  }

  const handleIntroComplete = () => {
    try {
      sessionStorage.setItem('shravan_intro_played', 'true')
    } catch (e) {}
    setIntroPhase('completed')
  }

  const handleLoopBack = () => {
    try {
      sessionStorage.removeItem('shravan_intro_played')
    } catch (e) {}
    setIntroPhase('ticket')
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

      {/* Deadpool Combat Knife / Katana Custom Cursor */}
      <DeadpoolKnifeCursor />

      {/* 1. Pre-Show Stage: Indian Cinema Statutory Warning & 3D Box Office Ticket */}
      {introPhase === 'ticket' ? (
        <BoxOfficeTicketStage onTicketConfirmed={handleTicketConfirmed} />
      ) : null}

      {/* 2. Opening 3-Second Countdown & Title Card Leader */}
      {introPhase === 'countdown' ? (
        <CountdownLeader onComplete={handleIntroComplete} />
      ) : null}

      {/* Top Fixed Cinema Navigation */}
      <CinemaNav 
        currentSection={currentSection}
        onNavigate={setCurrentSection}
        introActive={introPhase !== 'completed'}
      />

      {/* Toggleable Resume Scene Breakdown Sidebar Drawer */}
      {introPhase === 'completed' && <ResumeSidebarDrawer />}

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
