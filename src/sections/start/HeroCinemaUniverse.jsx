import React, { useState, useRef } from 'react'
import { Film, Eye, EyeOff, Download, ChevronDown, Play, Sparkles, Compass } from 'lucide-react'

export default function HeroCinemaUniverse({ onEnterVerse }) {
  const [showOverlay, setShowOverlay] = useState(true)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16
    setMousePos({ x, y })
  }

  return (
    <section 
      id="start"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-between items-center overflow-hidden select-none bg-[#050507]"
    >
      {/* ========================================================================= */}
      {/* 1. VIVID, CRISP, 100% VISIBLE COMBINED MOVIE POSTER BACKGROUND            */}
      {/* ========================================================================= */}
      <div 
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          transform: `scale(1.05) translate3d(${mousePos.x * -0.8}px, ${mousePos.y * -0.8}px, 0)`
        }}
      >
        {/* Full-bleed panoramic 2520x1560 combined master poster image */}
        <img
          src="/assets/combined-movie-posters-wide.jpg"
          alt="Combined Movie Posters Collage of Shravan Kumawat"
          className="w-full h-full object-cover object-center filter saturate-110 contrast-105"
        />

        {/* Subtle Cinema Lighting (Non-Destructive — Keeps posters totally visible) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60 pointer-events-none" />
        <div className="absolute inset-0 cinema-vignette opacity-70 pointer-events-none" />

        {/* Anamorphic Lighting Flares across the poster wall */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[250px] bg-amber-400/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[250px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Top Navigation & Controls Bar */}
      <div className="relative z-20 w-full pt-20 px-4 sm:px-8 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 border border-amber-400/50 text-amber-300 text-xs font-mono tracking-widest uppercase backdrop-blur-md shadow-2xl">
          <Film className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>36-Film Master Collage Active</span>
        </div>

        {/* Visibility Toggle & Download Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowOverlay(!showOverlay)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-black border border-white/20 hover:border-amber-400 text-xs font-mono uppercase tracking-wider text-zinc-200 transition-all backdrop-blur-md shadow-xl"
            title={showOverlay ? "Hide Title to view raw posters" : "Show Title"}
          >
            {showOverlay ? (
              <>
                <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">View Clean Poster</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Show Title Overlay</span>
              </>
            )}
          </button>

          <a
            href="/assets/combined-movie-posters-wide.jpg"
            download="Shravan_Kumawat_Combined_Movie_Posters.jpg"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/80 hover:bg-black border border-white/20 hover:border-amber-400 text-xs font-mono uppercase tracking-wider text-zinc-200 transition-all backdrop-blur-md shadow-xl"
            title="Download Master Combined Poster in HD (2520x1560)"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Download Collage</span>
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. THE FLOATING 3D CINEMA MARQUEE CENTERPIECE                             */}
      {/* ========================================================================= */}
      {showOverlay ? (
        <div 
          className="relative z-20 max-w-4xl mx-auto px-4 my-auto text-center transition-all duration-500 ease-out"
          style={{
            transform: `perspective(1000px) rotateX(${mousePos.y * -0.5}deg) rotateY(${mousePos.x * 0.5}deg) translateZ(30px)`
          }}
        >
          {/* Glassmorphic Cinema Marquee Box */}
          <div className="bg-black/80 backdrop-blur-xl border-2 border-amber-400/70 rounded-3xl p-6 sm:p-12 shadow-[0_0_90px_rgba(0,0,0,0.95)] relative overflow-hidden group">
            
            {/* Corner Cinema Brackets */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-400" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-400" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-400" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-400" />

            <span className="text-[11px] sm:text-xs font-mono tracking-[0.4em] uppercase text-amber-400 font-bold block mb-3">
              ★ FEATURE PRESENTATION ★
            </span>

            <h1 className="text-3xl sm:text-6xl md:text-7xl font-serif font-black text-white tracking-wider uppercase leading-none drop-shadow-[0_10px_30px_rgba(212,175,55,0.4)]">
              THE CINEMATIC <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-amber-500 underline decoration-red-600 decoration-wavy underline-offset-8">
                UNIVERSE
              </span>
              <span className="block mt-2 text-2xl sm:text-5xl md:text-5xl font-extrabold text-zinc-100 tracking-normal">
                OF SHRAVAN KUMAWAT
              </span>
            </h1>

            <p className="mt-6 text-sm sm:text-base md:text-lg text-zinc-200 font-serif italic max-w-2xl mx-auto leading-relaxed drop-shadow">
              "A software developer and AI engineer who visualizes every line of code, algorithm, and project as a living cinematic experience."
            </p>

            {/* Subtitle credentials */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-zinc-300">
              <span className="px-3 py-1 rounded bg-zinc-900/90 border border-zinc-700">
                Dwarkadas J. Sanghvi College of Engineering
              </span>
              <span className="text-amber-400 font-bold">•</span>
              <span className="px-3 py-1 rounded bg-blue-950/80 border border-blue-600/60 text-blue-300 font-bold">
                B.Tech Artificial Intelligence (CGPA 9.00)
              </span>
              <span className="text-amber-400 font-bold">•</span>
              <span className="px-3 py-1 rounded bg-red-950/80 border border-red-600/60 text-red-300 font-bold">
                JEE Main 97.93%ile
              </span>
            </div>

            {/* Quick Action Button inside Marquee */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onEnterVerse}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-mono font-bold text-xs uppercase tracking-widest shadow-xl shadow-amber-400/30 hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Begin The Movie Ride</span>
              </button>

              <button
                onClick={() => setShowOverlay(false)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 text-xs font-mono uppercase tracking-wider transition-all"
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Admire Poster Wall</span>
              </button>
            </div>

          </div>
        </div>
      ) : (
        /* Hint when overlay is hidden */
        <div className="relative z-20 my-auto text-center animate-fadeIn">
          <button
            onClick={() => setShowOverlay(true)}
            className="px-6 py-3 rounded-full bg-black/85 border-2 border-amber-400 text-amber-300 text-xs font-mono uppercase tracking-widest font-bold shadow-2xl backdrop-blur-md hover:scale-105 transition-all"
          >
            ← Restore Cinema Marquee Title
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SCROLL ADVANCE CUE                                                     */}
      {/* ========================================================================= */}
      <div className="relative z-20 pb-8 text-center">
        <button
          onClick={onEnterVerse}
          className="inline-flex flex-col items-center gap-2 text-zinc-300 hover:text-amber-300 transition-colors group"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase bg-black/70 px-4 py-1 rounded-full border border-white/10 backdrop-blur-md">
            Scroll To Enter Act I: Origin Story
          </span>
          <ChevronDown className="w-4 h-4 text-amber-400 animate-bounce" />
        </button>
      </div>

    </section>
  )
}
