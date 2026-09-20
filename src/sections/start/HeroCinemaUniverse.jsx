import React, { useState, useEffect, useRef } from 'react'
import { Film, Sparkles, ChevronDown, Compass, Play, Volume2, Shield } from 'lucide-react'

export default function HeroCinemaUniverse({ onEnterVerse }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
    setMousePos({ x, y })
  }

  return (
    <section 
      id="start" 
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-between items-center overflow-hidden select-none bg-[#050507]"
    >
      {/* ========================================================================= */}
      {/* 1. THE COMBINED MASTER POSTER AS IMMERSIVE BACKGROUND UI                */}
      {/* ========================================================================= */}
      <div 
        className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `scale(1.08) translate3d(${mousePos.x * -0.6}px, ${mousePos.y * -0.6}px, 0)`
        }}
      >
        {/* The 1920x2880 Unified Combined Movie Poster Canvas */}
        <img
          src="/assets/combined-movie-posters.jpg"
          alt="The Cinematic Universe of Shravan Kumawat Background"
          className="w-full h-full object-cover object-center opacity-30 filter contrast-125 saturate-120 blur-[1px] transform scale-105"
        />

        {/* Deep Cinema Vignette & Lighting Falloff */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/70 to-[#050507]/90" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />

        {/* Anamorphic Blue / Gold Film Light Leak Beam */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[350px] bg-gradient-to-b from-amber-500/15 via-transparent to-transparent -rotate-12 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[700px] h-[400px] bg-gradient-to-t from-red-600/15 via-transparent to-transparent rotate-12 blur-3xl" />
      </div>

      {/* Top Atmospheric Header Indicator */}
      <div className="relative z-10 pt-28 text-center">
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-black/60 border border-amber-400/40 text-amber-300 text-xs font-mono tracking-[0.3em] uppercase backdrop-blur-md shadow-2xl shadow-black/80">
          <Film className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>A Filmmaker's Approach To Code</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. HERO CENTERPIECE: "THE CINEMATIC UNIVERSE OF SHRAVAN KUMAWAT"         */}
      {/* ========================================================================= */}
      <div 
        className="relative z-10 max-w-5xl mx-auto px-4 text-center my-auto transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`
        }}
      >
        <p className="text-xs sm:text-sm font-mono tracking-[0.45em] text-amber-400 uppercase font-bold mb-4 drop-shadow">
          DIRECTED • ENGINEERED • DESIGNED
        </p>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black text-white tracking-wider uppercase leading-none drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)]">
          THE CINEMATIC <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 underline decoration-red-600/60 decoration-wavy underline-offset-8">
            UNIVERSE
          </span>
          <span className="block mt-2 text-3xl sm:text-5xl md:text-6xl text-zinc-100 font-extrabold tracking-normal">
            OF SHRAVAN KUMAWAT
          </span>
        </h1>

        {/* The Core Vision Quote */}
        <div className="mt-8 max-w-2xl mx-auto">
          <p className="text-sm sm:text-base md:text-lg text-zinc-300 font-serif italic leading-relaxed drop-shadow-md">
            "I don't just write code — I direct digital realities. Where logic meets the drama of the silver screen, and every algorithm tells a story."
          </p>
        </div>

        {/* Director Production Slate Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-zinc-400">
          <span className="px-3.5 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800 backdrop-blur-md text-zinc-300">
            Dwarkadas J. Sanghvi College of Engineering
          </span>
          <span className="text-zinc-600">•</span>
          <span className="px-3.5 py-1.5 rounded-lg bg-blue-950/60 border border-blue-600/40 text-blue-300 font-bold backdrop-blur-md">
            AI & Data Science Specialist
          </span>
          <span className="text-zinc-600">•</span>
          <span className="px-3.5 py-1.5 rounded-lg bg-red-950/60 border border-red-600/40 text-red-300 font-bold backdrop-blur-md">
            Deadpool Protocol
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SCROLL CUE: "ENTER THE FILM REEL" WITH 35MM PERFORATIONS             */}
      {/* ========================================================================= */}
      <div className="relative z-10 pb-12 text-center">
        <button
          onClick={onEnterVerse}
          className="group inline-flex flex-col items-center gap-3 transition-transform hover:scale-105 active:scale-95"
        >
          <div className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-900/90 border border-amber-400/50 hover:border-amber-300 text-amber-300 hover:text-amber-200 text-xs font-mono font-bold uppercase tracking-widest backdrop-blur-md shadow-2xl shadow-amber-400/20 transition-all">
            <Play className="w-3.5 h-3.5 fill-amber-400 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
            <span>Enter The Cinematic Verse</span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-500 text-[11px] font-mono tracking-widest uppercase">
            <span>Scroll To Advance The Film Reel</span>
            <ChevronDown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          </div>
        </button>
      </div>

      {/* Retro film edge sprockets */}
      <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-between py-6 opacity-20 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="w-2.5 h-3.5 bg-zinc-500 rounded-sm" />
        ))}
      </div>
      <div className="absolute right-2 top-0 bottom-0 flex flex-col justify-between py-6 opacity-20 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="w-2.5 h-3.5 bg-zinc-500 rounded-sm" />
        ))}
      </div>

    </section>
  )
}
