import React, { useState, useEffect, useRef } from 'react'
import { FastForward, Volume2 } from 'lucide-react'
import cinemaAudio from '../../utils/cinemaAudio'

export default function CountdownLeader({ onComplete }) {
  const [count, setCount] = useState(3)
  const [phase, setPhase] = useState('countdown') // 'countdown' | 'titlecard' | 'transition'
  const [showSkip, setShowSkip] = useState(false)
  const audioCtxRef = useRef(null)

  // Initialize Web Audio Engine for 90s SMPTE Countdown Beeps & Clicks
  useEffect(() => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx()
      }
    } catch (e) {
      console.warn('Web Audio not available', e)
    }

    const unlockAudio = () => {
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume()
      }
    }

    window.addEventListener('click', unlockAudio)
    window.addEventListener('touchstart', unlockAudio)
    window.addEventListener('mousemove', unlockAudio, { once: true })

    return () => {
      window.removeEventListener('click', unlockAudio)
      window.removeEventListener('touchstart', unlockAudio)
      window.removeEventListener('mousemove', unlockAudio)
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close() } catch (err) {}
      }
    }
  }, [])

  // Function to play authentic 90s movie SMPTE countdown beep & mechanical projector click
  const playCountdownSound = (currentCount) => {
    const ctx = audioCtxRef.current
    if (!ctx) return

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
    }

    const now = ctx.currentTime

    // 1. Classic 90s 1kHz SMPTE Sync Beep / 2-Pop
    const isTwoPop = currentCount === 2 // Classic 2-Pop at 2 seconds
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(isTwoPop ? 1000 : 900, now)

    const pipDuration = isTwoPop ? 0.12 : 0.07
    gain.gain.setValueAtTime(isTwoPop ? 0.22 : 0.14, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + pipDuration)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + pipDuration + 0.05)

    // 2. Mechanical 35mm Film Projector Sprocket / Gate Click
    const bufferSize = Math.floor(ctx.sampleRate * 0.035)
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1
    }

    const whiteNoise = ctx.createBufferSource()
    whiteNoise.buffer = noiseBuffer

    const noiseFilter = ctx.createBiquadFilter()
    noiseFilter.type = 'bandpass'
    noiseFilter.frequency.setValueAtTime(1600, now)
    noiseFilter.Q.setValueAtTime(3.5, now)

    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0.1, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03)

    whiteNoise.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    whiteNoise.start(now)
  }

  // Function to play Marvel Studios intro theme
  const playMarvelIntroTheme = () => {
    cinemaAudio.playMarvelIntro()
    playTitleFanfare()
  }

  // Function to play dramatic cinematic opening fanfare on title card reveal
  const playTitleFanfare = () => {
    const ctx = audioCtxRef.current
    if (!ctx) return

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
    }

    const now = ctx.currentTime
    // Warm, dramatic 90s theatrical swell (Sub-bass + fifth harmonic chord)
    const freqs = [55, 110, 164.81, 220, 329.63]
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = idx === 0 ? 'sine' : 'triangle'
      osc.frequency.setValueAtTime(freq, now)

      gain.gain.setValueAtTime(0.001, now)
      gain.gain.linearRampToValueAtTime(0.08 / (idx + 1), now + 0.35)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 2.6)
    })
  }

  // Skip button appears after 1.2 seconds
  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 1200)
    return () => clearTimeout(skipTimer)
  }, [])

  // Play sound on initial count
  useEffect(() => {
    if (phase === 'countdown') {
      playCountdownSound(count)
    }
  }, [count, phase])

  // Countdown timer logic (3 seconds: 3 -> 2 -> 1)
  useEffect(() => {
    if (phase !== 'countdown') return

    if (count > 1) {
      const timer = setTimeout(() => {
        setCount(c => c - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      // Transition to title card with Marvel Studios intro theme
      const finishCountdown = setTimeout(() => {
        setPhase('titlecard')
        playMarvelIntroTheme()
      }, 1000)
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
        }, 800)
      }, 3400)
      return () => clearTimeout(cardTimer)
    }
  }, [phase, onComplete])

  const handleSkip = () => {
    cinemaAudio.playMarvelIntro()
    setPhase('transition')
    setTimeout(() => {
      if (onComplete) onComplete()
    }, 200)
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-[#070709] transition-opacity duration-700 select-none ${
      phase === 'transition' ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      
      {/* Top Left: 90s Optical Audio Status */}
      <div className="absolute top-6 left-6 z-50 flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest text-amber-400 bg-black/80 border border-amber-400/40 backdrop-blur-md shadow-xl">
        <Volume2 className="w-3.5 h-3.5 text-red-500 animate-pulse" />
        <span>90s Optical Audio • 1kHz SMPTE Sync</span>
      </div>

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
          <div className="text-7xl sm:text-9xl font-serif font-black text-amber-200 tracking-tighter drop-shadow-2xl select-none z-10 animate-pulse">
            {count}
          </div>

          {/* Sound beep visual marker */}
          <div className="absolute bottom-2 font-mono text-[10px] tracking-widest text-zinc-400 uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span>Leader Reel • 35mm SMPTE Sync</span>
          </div>
        </div>
      )}

      {/* PHASE 2: DRAMATIC TITLE CARD REVEAL */}
      {phase === 'titlecard' && (
        <div className="text-center px-6 max-w-2xl transform animate-subtle-pulse select-none">
          <p className="text-xs sm:text-sm font-mono tracking-[0.35em] text-amber-400 uppercase mb-3 font-bold">
            PRODUCED AND DIRECTED BY
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black text-white tracking-wider uppercase drop-shadow-[0_10px_35px_rgba(212,175,55,0.4)]">
            SHRAVAN KUMAWAT
          </h1>
          <div className="h-0.5 w-24 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent my-6" />
        </div>
      )}

    </div>
  )
}
