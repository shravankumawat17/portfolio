import React, { useState, useRef } from 'react'
import { Film, Play, ChevronDown, Flame, Ticket, Download, Sparkles, Eye, EyeOff } from 'lucide-react'
import DirectorsPass3D from '../../components/DirectorsPass3D'

export default function HeroCinemaUniverse({ onEnterVerse }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [showPass, setShowPass] = useState(false)
  const [showTitle, setShowTitle] = useState(true)
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
      className="relative min-h-screen flex flex-col justify-between items-center overflow-hidden select-none bg-[#060608]"
    >
      {/* ========================================================================= */}
      {/* 1. FULL-VIEWPORT BACKGROUND UI: 2520x1560 COMBINED MOVIE POSTER           */}
      {/* ========================================================================= */}
      <div 
        className="absolute inset-0 transition-transform duration-700 ease-out z-0"
        style={{
          transform: `scale(1.04) translate3d(${mousePos.x * -0.6}px, ${mousePos.y * -0.6}px, 0)`
        }}
      >
        {/* Full background poster UI - completely clear, vibrant and 100% visible */}
        <img
          src="/assets/combined-movie-posters-wide.jpg"
          alt="The Cinematic Universe of Shravan Kumawat - Master 36-Movie Combined Poster Background"
          className="w-full h-full object-cover sm:object-contain object-center filter brightness-100 contrast-105"
        />

        {/* Minimal edge-only vignette so entire center stays 100% clear and bright */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-black/40 pointer-events-none" />
        <div className="absolute inset-0 film-grain opacity-10 pointer-events-none" />
      </div>

      {/* Top Theatrical Bar & Controls */}
      <div className="relative z-20 w-full pt-20 px-4 sm:px-8 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-red-600/50 text-red-400 text-[11px] font-mono tracking-widest uppercase backdrop-blur-md shadow-xl">
          <Flame className="w-3 h-3 text-red-500 animate-pulse" />
          <span>Deadpool Protocol • 36-Film Universe</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle Clean Poster View */}
          <button
            onClick={() => setShowTitle(!showTitle)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 hover:border-amber-400 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition-all backdrop-blur-md shadow-lg"
            title={showTitle ? "Hide Title to view 100% raw poster" : "Show Title"}
          >
            {showTitle ? (
              <>
                <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Clean Poster</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Show Title</span>
              </>
            )}
          </button>

          <a
            href="/assets/combined-movie-posters-wide.jpg"
            download="Shravan_Kumawat_Combined_Movie_Posters.jpg"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-amber-400/40 hover:border-amber-400 text-xs font-mono uppercase tracking-wider text-amber-300 transition-all backdrop-blur-md shadow-lg hover:scale-105 active:scale-95"
            title="Download Master Combined Poster in HD (2520x1560)"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Download Poster</span>
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. COMPACT, ELEGANT, SEMI-TRANSPARENT 3D TITLE (Takes up minimal space)   */}
      {/* ========================================================================= */}
      {showTitle ? (
        <div 
          className="relative z-20 max-w-3xl mx-auto px-4 my-auto text-center transition-all duration-500 ease-out py-4"
          style={{
            transform: `perspective(1000px) rotateX(${mousePos.y * -0.25}deg) rotateY(${mousePos.x * 0.25}deg) translateZ(15px)`
          }}
        >
          {/* Frosted Transparent Capsule Box (Ultra-minimal & transparent) */}
          <div className="bg-black/40 backdrop-blur-md border border-white/10 hover:border-red-600/40 rounded-3xl p-5 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.6)] transition-all duration-300">
            
            {/* Sleek Eyebrow */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-amber-400/30 text-amber-400 text-[10px] font-mono tracking-[0.3em] uppercase mb-3">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>THE CINEMATIC PORTFOLIO</span>
            </div>

            {/* Refined, Compact Headline (Small, elegant, NO UNDERLINES) */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-white tracking-wide uppercase leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              THE CINEMATIC{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-300 to-amber-500">
                UNIVERSE
              </span>{' '}
              OF SHRAVAN KUMAWAT
            </h1>

            {/* Compact Vision Statement */}
            <p className="mt-2.5 text-xs sm:text-sm text-zinc-200/90 font-serif italic max-w-xl mx-auto leading-relaxed drop-shadow">
              "A developer and AI engineer who visualizes every line of code and algorithm as a living movie experience."
            </p>

            {/* Compact Credentials (Semi-transparent pills) */}
            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-[10px] sm:text-[11px] font-mono text-zinc-300">
              <span className="px-3 py-1 rounded-full bg-black/50 border border-zinc-700/60">
                DJ Sanghvi College of Engineering
              </span>
              <span className="px-3 py-1 rounded-full bg-red-950/50 border border-red-600/50 text-red-300 font-bold">
                B.Tech AI & Data Science (CGPA 9.00)
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-950/50 border border-amber-600/50 text-amber-300 font-bold">
                JEE Main 97.93%ile
              </span>
            </div>

            {/* Compact Action Buttons */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
              <button
                onClick={onEnterVerse}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Begin Journey</span>
              </button>

              <button
                onClick={() => setShowPass(!showPass)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 text-zinc-300 hover:text-white border border-red-600/50 hover:border-red-400 text-xs font-mono uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
              >
                <Ticket className="w-3.5 h-3.5 text-red-500" />
                <span>{showPass ? 'Close Pass' : '3D Director Pass'}</span>
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
      ) : (
        /* Hint when Title is hidden to see full poster */
        <div className="relative z-20 my-auto text-center animate-in fade-in duration-300">
          <button
            onClick={() => setShowTitle(true)}
            className="px-5 py-2.5 rounded-full bg-black/70 border border-amber-400 text-amber-300 text-xs font-mono uppercase tracking-widest font-bold shadow-2xl backdrop-blur-md hover:scale-105 transition-all flex items-center gap-2 mx-auto"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Restore Title Details</span>
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SCROLL DOWN CUE                                                        */}
      {/* ========================================================================= */}
      <div className="relative z-20 pb-6 text-center">
        <button
          onClick={onEnterVerse}
          className="inline-flex flex-col items-center gap-1 text-zinc-300 hover:text-amber-300 transition-colors group"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase bg-black/70 px-3.5 py-1 rounded-full border border-red-600/40 backdrop-blur-md">
            Scroll To Enter Act I: Origin Story
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
        </button>
      </div>

    </section>
  )
}
