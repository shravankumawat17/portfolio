import React, { useState, useRef } from 'react'
import { Film, Play, ChevronDown, Flame, Ticket, Download, Sparkles } from 'lucide-react'
import DirectorsPass3D from '../../components/DirectorsPass3D'

export default function HeroCinemaUniverse({ onEnterVerse }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [showPass, setShowPass] = useState(false)
  const containerRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
    setMousePos({ x, y })
  }

  return (
    <section 
      id="start"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-between items-center overflow-hidden select-none bg-[#060608]"
    >
      {/* ========================================================================= */}
      {/* 1. FULL-VIEWPORT BACKGROUND UI: 2520x1560 COMBINED MOVIE POSTER           */}
      {/* ========================================================================= */}
      <div 
        className="absolute inset-0 transition-transform duration-700 ease-out z-0"
        style={{
          transform: `scale(1.06) translate3d(${mousePos.x * -0.8}px, ${mousePos.y * -0.8}px, 0)`
        }}
      >
        {/* Full background poster UI - crisp, vibrant and 100% visible */}
        <img
          src="/assets/combined-movie-posters-wide.jpg"
          alt="The Cinematic Universe of Shravan Kumawat - Master 36-Movie Combined Poster Background"
          className="w-full h-full object-cover sm:object-contain object-center filter brightness-90 contrast-110"
        />

        {/* Cinematic Lighting Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-black/45 to-[#060608]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-black/85 pointer-events-none" />
        <div className="absolute inset-0 film-grain opacity-20 pointer-events-none" />
      </div>

      {/* Top Theatrical Badge & Download Strip */}
      <div className="relative z-20 w-full pt-20 px-4 sm:px-8 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/85 border border-red-600/60 text-red-400 text-xs font-mono tracking-widest uppercase backdrop-blur-md shadow-2xl">
          <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span>Deadpool Protocol • 36-Film Universe Active</span>
        </div>

        <a
          href="/assets/combined-movie-posters-wide.jpg"
          download="Shravan_Kumawat_Combined_Movie_Posters.jpg"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/85 hover:bg-zinc-900 border border-amber-400/50 hover:border-amber-400 text-xs font-mono uppercase tracking-wider text-amber-300 transition-all backdrop-blur-md shadow-xl hover:scale-105 active:scale-95"
          title="Download Master Combined Poster in HD (2520x1560)"
        >
          <Download className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Download Master Poster (HD)</span>
        </a>
      </div>

      {/* ========================================================================= */}
      {/* 2. THE FLOATING 3D CINEMA MARQUEE (NO UNDERLINES)                         */}
      {/* ========================================================================= */}
      <div 
        className="relative z-20 max-w-4xl mx-auto px-4 my-auto text-center transition-all duration-500 ease-out py-8"
        style={{
          transform: `perspective(1000px) rotateX(${mousePos.y * -0.4}deg) rotateY(${mousePos.x * 0.4}deg) translateZ(30px)`
        }}
      >
        {/* Glassmorphic Cinema Marquee Box */}
        <div className="bg-black/75 backdrop-blur-xl border-2 border-red-600/70 rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_0_80px_rgba(200,29,44,0.35)] relative overflow-hidden group">
          
          {/* Corner Cinema Brackets */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-400 pointer-events-none" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-400 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-400 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-400 pointer-events-none" />

          {/* Eyebrow */}
          <span className="text-[11px] sm:text-xs font-mono tracking-[0.4em] uppercase text-amber-400 font-bold block mb-3">
            ★ FEATURE PRESENTATION ★
          </span>

          {/* Hero Title (Clean, NO UNDERLINES) */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif font-black text-white tracking-wider uppercase leading-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]">
            THE CINEMATIC <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-300 to-amber-500">
              UNIVERSE
            </span>
            <span className="block mt-2 text-2xl sm:text-4xl md:text-5xl font-extrabold text-zinc-100 tracking-normal">
              OF SHRAVAN KUMAWAT
            </span>
          </h1>

          {/* Vision Statement */}
          <p className="mt-5 text-xs sm:text-sm md:text-base text-zinc-200 font-serif italic max-w-2xl mx-auto leading-relaxed drop-shadow">
            "A developer and AI engineer who visualizes every line of code, algorithm, and project as a living cinematic universe."
          </p>

          {/* Academic & Engineering Badges */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono text-zinc-300">
            <span className="px-3 py-1 rounded-lg bg-zinc-900/90 border border-zinc-700">
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
          </div>

          {/* CTAs Inside Marquee */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onEnterVerse}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-mono font-bold text-xs uppercase tracking-widest shadow-xl shadow-red-600/30 hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Begin Feature Journey</span>
            </button>

            <button
              onClick={() => setShowPass(!showPass)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-red-600/50 hover:border-red-500 text-xs font-mono uppercase tracking-wider transition-all"
            >
              <Ticket className="w-4 h-4 text-red-500" />
              <span>{showPass ? 'Close 3D Pass' : 'Inspect 3D Director Pass'}</span>
            </button>
          </div>

        </div>

        {/* 3D Holographic Director's Pass Drawer */}
        {showPass && (
          <div className="mt-4 animate-in fade-in zoom-in duration-300">
            <DirectorsPass3D />
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 3. SCROLL DOWN CUE                                                        */}
      {/* ========================================================================= */}
      <div className="relative z-20 pb-8 text-center">
        <button
          onClick={onEnterVerse}
          className="inline-flex flex-col items-center gap-1.5 text-zinc-300 hover:text-amber-300 transition-colors group"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase bg-black/80 px-4 py-1.5 rounded-full border border-red-600/40 backdrop-blur-md">
            Scroll To Enter Act I: Origin Story
          </span>
          <ChevronDown className="w-4 h-4 text-amber-400 animate-bounce" />
        </button>
      </div>

    </section>
  )
}
