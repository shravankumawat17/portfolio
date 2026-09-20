import React, { useState, useRef } from 'react'
import { ChevronDown, Flame, Download } from 'lucide-react'

export default function HeroCinemaUniverse({ onEnterVerse }) {
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

        {/* Minimal subtle vignette so entire center stays 100% clear and raw */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-black/30 pointer-events-none" />
        <div className="absolute inset-0 film-grain opacity-10 pointer-events-none" />
      </div>

      {/* Top Theatrical Bar */}
      <div className="relative z-20 w-full pt-20 px-4 sm:px-8 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-red-600/50 text-red-400 text-[11px] font-mono tracking-widest uppercase backdrop-blur-md shadow-xl">
          <Flame className="w-3 h-3 text-red-500 animate-pulse" />
          <span>Deadpool Protocol • 36-Film Universe</span>
        </div>

        <a
          href="/assets/combined-movie-posters-wide.jpg"
          download="Shravan_Kumawat_Combined_Movie_Posters.jpg"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-black/80 border border-amber-400/40 hover:border-amber-400 text-xs font-mono uppercase tracking-wider text-amber-300 transition-all backdrop-blur-md shadow-lg hover:scale-105 active:scale-95"
          title="Download Master Combined Poster in HD (2520x1560)"
        >
          <Download className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Download Master Poster</span>
        </a>
      </div>

      {/* Center is completely clear so the entire poster is 100% visible with zero overlay obstruction */}
      <div className="my-auto" />

      {/* Bottom Scroll Down Cue */}
      <div className="relative z-20 pb-8 text-center">
        <button
          onClick={onEnterVerse}
          className="inline-flex flex-col items-center gap-1.5 text-zinc-300 hover:text-amber-300 transition-colors group cursor-pointer"
        >
          <span className="text-xs font-mono tracking-widest uppercase bg-black/80 hover:bg-black text-amber-300 px-5 py-2 rounded-full border border-red-600/50 hover:border-amber-400 backdrop-blur-md shadow-2xl transition-all group-hover:scale-105">
            Scroll To Enter Act I: Origin Story
          </span>
          <ChevronDown className="w-4 h-4 text-amber-400 animate-bounce" />
        </button>
      </div>

    </section>
  )
}
