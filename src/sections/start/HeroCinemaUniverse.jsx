import React, { useState, useRef } from 'react'
import { Film, Play, ChevronDown, Sparkles, ZoomIn, ZoomOut, Flame, Shield, Ticket } from 'lucide-react'
import DirectorsPass3D from '../../components/DirectorsPass3D'

export default function HeroCinemaUniverse({ onEnterVerse }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isZoomed, setIsZoomed] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const screenRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!screenRef.current) return
    const rect = screenRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14
    setMousePos({ x, y })
  }

  return (
    <section 
      id="start"
      className="relative min-h-screen pt-24 pb-16 px-3 sm:px-6 lg:px-8 flex flex-col justify-between items-center bg-[#060608] select-none overflow-hidden"
    >
      {/* Volumetric Deadpool Crimson Glow in background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* ========================================================================= */}
      {/* 1. THEATRICAL TITLE: "THE CINEMATIC UNIVERSE OF SHRAVAN KUMAWAT"         */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-5xl mx-auto text-center mb-6">
        
        {/* Deadpool Protocol Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950/90 border border-red-600/60 text-red-400 text-xs font-mono tracking-[0.3em] uppercase mb-4 shadow-xl shadow-red-600/20 backdrop-blur-md">
          <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span>Deadpool Aesthetic • Feature Premiere</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif font-black text-white tracking-wider uppercase leading-tight drop-shadow-[0_10px_40px_rgba(200,29,44,0.4)]">
          THE CINEMATIC <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-amber-500 underline decoration-red-600/80 decoration-wavy underline-offset-8">
            UNIVERSE
          </span>
          <span className="block mt-1 text-2xl sm:text-4xl md:text-5xl text-zinc-100 font-extrabold tracking-normal">
            OF SHRAVAN KUMAWAT
          </span>
        </h1>

        {/* Vision Statement */}
        <p className="mt-4 text-xs sm:text-sm md:text-base text-zinc-300 font-serif italic max-w-2xl mx-auto leading-relaxed">
          "A developer who visualizes every line of code, algorithm, and system as a living movie experience."
        </p>

        {/* Director Credentials Badges & 3D Pass Trigger */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-zinc-300">
          <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-700">
            Dwarkadas J. Sanghvi College of Engineering
          </span>
          <span className="text-red-500 font-bold">•</span>
          <span className="px-3 py-1 rounded-lg bg-red-950/80 border border-red-600 text-red-300 font-bold">
            B.Tech AI & Data Science (CGPA 9.00)
          </span>
          <span className="text-red-500 font-bold">•</span>
          <span className="px-3 py-1 rounded-lg bg-amber-950/80 border border-amber-600 text-amber-300 font-bold">
            JEE Main 97.93%ile
          </span>
          <span className="text-red-500 font-bold">•</span>
          <button
            onClick={() => setShowPass(!showPass)}
            className={`px-3.5 py-1 rounded-lg border flex items-center gap-1.5 font-bold transition-all hover:scale-105 active:scale-95 ${
              showPass
                ? 'bg-amber-400 text-black border-amber-300 shadow-lg shadow-amber-400/30'
                : 'bg-red-600/20 border-red-500/80 text-red-400 hover:bg-red-600/30'
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>{showPass ? 'Close 3D Pass' : 'Inspect 3D Director Pass'}</span>
          </button>
        </div>

        {/* 3D Holographic Director's Pass */}
        {showPass && (
          <div className="animate-in fade-in zoom-in duration-300">
            <DirectorsPass3D />
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 2. THE 100% VISIBLE, UN-CROPPED COMBINED POSTER CINEMA SCREEN            */}
      {/* ========================================================================= */}
      <div 
        ref={screenRef}
        onMouseMove={handleMouseMove}
        className="relative z-10 w-full max-w-5xl mx-auto my-2 perspective-[1200px]"
      >
        {/* Theatrical Cinema Frame with 3D Tilt */}
        <div
          style={{
            transform: `rotateX(${mousePos.y * -0.6}deg) rotateY(${mousePos.x * 0.6}deg) scale(${isZoomed ? 1.05 : 1})`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
          className="relative bg-black rounded-2xl sm:rounded-3xl p-2 sm:p-3 border-2 border-red-600/70 shadow-[0_20px_80px_rgba(200,29,44,0.35)] overflow-hidden group"
        >
          {/* Outer Film Frame Edge & Corner Brackets */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-amber-400 z-20 pointer-events-none" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-amber-400 z-20 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-amber-400 z-20 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-amber-400 z-20 pointer-events-none" />

          {/* Master 2520x1560 Panoramic Combined Poster — 100% Completely Visible Without Any Cropping */}
          <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black aspect-[2520/1560] shadow-inner">
            <img
              src="/assets/combined-movie-posters-wide.jpg"
              alt="Complete Combined Movie Posters Collage of Shravan Kumawat - All 36 Titles 100% Visible"
              className={`w-full h-full object-contain transition-transform duration-500 ease-out ${
                isZoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
              title="Click to zoom into poster details"
            />

            {/* Subtle Cinema Light Sheen across the screen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none opacity-60" />
            <div className="absolute inset-0 cinema-vignette opacity-40 pointer-events-none" />
          </div>

          {/* Screen Bottom Bar: Title, 3D Instructions & Zoom Toggle */}
          <div className="mt-2.5 px-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <span className="text-white font-bold">ALL 36 MOVIES 100% VISIBLE</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400 hidden sm:inline">Hover to tilt in 3D</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 hover:border-amber-400 text-[11px] text-zinc-200 hover:text-amber-300 transition-all"
              >
                {isZoomed ? (
                  <>
                    <ZoomOut className="w-3.5 h-3.5 text-amber-400" />
                    <span>Fit Full Screen</span>
                  </>
                ) : (
                  <>
                    <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                    <span>Zoom In 3D</span>
                  </>
                )}
              </button>

              <a
                href="/assets/combined-movie-posters-wide.jpg"
                download="Shravan_Kumawat_Combined_Movie_Posters.jpg"
                className="text-[11px] text-amber-400 hover:underline uppercase tracking-wider hidden md:inline"
              >
                Download Full HD (2520x1560)
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SCROLL DOWN TO ENTER MOVIE REELS                                       */}
      {/* ========================================================================= */}
      <div className="relative z-10 pt-4 text-center">
        <button
          onClick={onEnterVerse}
          className="inline-flex flex-col items-center gap-2 text-zinc-300 hover:text-amber-400 transition-all hover:scale-105 active:scale-95 group"
        >
          <div className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-amber-500 text-white font-bold text-xs font-mono uppercase tracking-widest shadow-xl shadow-red-600/30">
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Enter The Cinematic Verse</span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] font-mono tracking-widest uppercase">
            <span>Scroll To Enter Act I: Origin Story</span>
            <ChevronDown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          </div>
        </button>
      </div>

    </section>
  )
}
