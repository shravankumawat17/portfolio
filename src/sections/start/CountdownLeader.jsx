import React, { useState, useEffect } from 'react'
import { FastForward, Play } from 'lucide-react'

export default function CountdownLeader({ onComplete }) {
  const [count, setCount] = useState(8)
  const [phase, setPhase] = useState('countdown') // 'countdown' | 'titlecard' | 'transition'
  const [showSkip, setShowSkip] = useState(false)

  // Skip button appears after 1.2 seconds
  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 1200)
    return () => clearTimeout(skipTimer)
  }, [])

  // Countdown timer logic (8 down to 1)
  useEffect(() => {
    if (phase !== 'countdown') return

    if (count > 1) {
      const timer = setTimeout(() => {
        setCount(c => c - 1)
      }, 700)
      return () => clearTimeout(timer)
    } else {
      // Transition to title card
      const finishCountdown = setTimeout(() => {
        setPhase('titlecard')
      }, 700)
      return () => clearTimeout(finishCountdown)
    }
  }, [count, phase])

  // Title card display duration before fading into main site
  useEffect(() => {
    if (phase === 'titlecard') {
      const cardTimer = setTimeout(() => {
        setPhase('transition')
        setTimeout(() => {
          if (onComplete) onComplete()
        }, 600)
      }, 2400)
      return () => clearTimeout(cardTimer)
    }
  }, [phase, onComplete])

  const handleSkip = () => {
    setPhase('transition')
    setTimeout(() => {
      if (onComplete) onComplete()
    }, 200)
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-[#070709] transition-opacity duration-700 ${
      phase === 'transition' ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      
      {/* Skip Intro Button */}
      {showSkip && (
        <button
          onClick={handleSkip}
          className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest text-zinc-300 bg-zinc-900/90 border border-zinc-700/80 hover:border-amber-400 hover:text-amber-400 backdrop-blur-md transition-all shadow-xl group"
        >
          <span>Skip Intro</span>
          <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}

      {/* Retro film side sprocket holes */}
      <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-between py-4 opacity-25 pointer-events-none">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="w-2.5 h-4 bg-zinc-600 rounded-sm" />
        ))}
      </div>
      <div className="absolute right-2 top-0 bottom-0 flex flex-col justify-between py-4 opacity-25 pointer-events-none">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="w-2.5 h-4 bg-zinc-600 rounded-sm" />
        ))}
      </div>

      {/* PHASE 1: FILM COUNTDOWN LEADER (8 to 1) */}
      {phase === 'countdown' && (
        <div className="relative flex items-center justify-center w-72 h-72 sm:w-96 sm:h-96 projector-jitter">
          {/* Target Reticle concentric circles */}
          <div className="absolute inset-0 rounded-full border-2 border-zinc-500/40" />
          <div className="absolute inset-4 rounded-full border border-zinc-600/30" />
          <div className="absolute inset-16 rounded-full border border-zinc-600/50" />
          
          {/* Crosshairs */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-zinc-600/60 -translate-x-1/2" />
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-zinc-600/60 -translate-y-1/2" />

          {/* Clock Wipe Radial Arm */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div className="w-full h-full bg-gradient-to-tr from-amber-400/10 via-transparent to-transparent animate-clock-wipe origin-center" />
          </div>

          {/* Large Countdown Number */}
          <div className="text-7xl sm:text-9xl font-serif font-black text-amber-200 tracking-tighter drop-shadow-2xl select-none z-10">
            {count}
          </div>

          {/* Sound beep visual marker */}
          <div className="absolute bottom-2 font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
            Leader Reel • 35mm • 24 FPS
          </div>
        </div>
      )}

      {/* PHASE 2: DRAMATIC TITLE CARD REVEAL */}
      {phase === 'titlecard' && (
        <div className="text-center px-6 max-w-2xl transform animate-subtle-pulse select-none">
          <p className="text-xs sm:text-sm font-mono tracking-[0.35em] text-amber-400 uppercase mb-3">
            Produced & Directed By
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black text-white tracking-wider uppercase drop-shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
            SHRAVAN KUMAWAT
          </h1>
          <div className="h-0.5 w-24 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent my-6" />
          <p className="text-xs sm:text-sm font-mono text-zinc-400 tracking-widest uppercase">
            A Cinematic Portfolio • Feature Presentation
          </p>
        </div>
      )}

    </div>
  )
}
