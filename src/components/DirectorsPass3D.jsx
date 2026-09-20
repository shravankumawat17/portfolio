import React, { useState, useRef } from 'react'
import { Film, QrCode, Sparkles, Award, ShieldCheck, Flame, ExternalLink, Download } from 'lucide-react'

export default function DirectorsPass3D() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -14
    const rotateY = ((x - centerX) / centerX) * 14
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div className="relative my-6 max-w-2xl mx-auto px-4 perspective-[1400px] select-none">
      {/* 3D Tilting Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + (isFlipped ? 180 : 0)}deg)`,
          transformStyle: 'preserve-3d',
          transition: tilt.x === 0 && !isFlipped ? 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none'
        }}
        className="relative cursor-pointer group"
      >
        {/* ========================================================================= */}
        {/* FRONT OF PASS: VIP CINEMA PREMIERE ADMISSION TICKET                      */}
        {/* ========================================================================= */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className="relative bg-gradient-to-br from-zinc-950 via-[#12080a] to-black border-2 border-red-600/70 rounded-3xl p-6 sm:p-7 shadow-[0_20px_70px_rgba(200,29,44,0.35)] overflow-hidden"
        >
          {/* Holographic Specular Foil Layer */}
          <div
            className="absolute inset-0 pointer-events-none holo-foil opacity-25 group-hover:opacity-40 transition-opacity"
            style={{
              transform: `translate(${tilt.y * 3}px, ${tilt.x * 3}px)`
            }}
          />

          {/* Ticket Side Perforation Notches */}
          <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#060608] border-r-2 border-red-600/70" />
          <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#060608] border-l-2 border-red-600/70" />

          {/* Top Pass Header: Organization & Pass ID */}
          <div className="flex items-center justify-between border-b border-red-600/30 pb-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-red-950/80 border border-red-600/60 flex items-center justify-center text-red-500">
                <Flame className="w-4 h-4 text-red-500 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-red-400 font-bold block">
                  ALL-ACCESS PREMIERE PASS
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  Deadpool Cinematic Protocol • Tier 01
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 px-2.5 py-1 rounded-full text-[10px] font-mono text-amber-400">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>CLICK TO FLIP</span>
            </div>
          </div>

          {/* Ticket Center: Starring Name, Role & High-Level Academics */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center my-2">
            <div className="sm:col-span-8 text-left">
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                Director & Lead Engineer
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-wide uppercase">
                SHRAVAN KUMAWAT
              </h3>
              <p className="text-xs font-mono text-amber-300 mt-1">
                Dwarkadas J. Sanghvi College of Engineering
              </p>

              <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-mono">
                <span className="px-2.5 py-0.5 rounded-md bg-red-950/80 border border-red-600/70 text-red-300 font-bold">
                  B.Tech AI & Data Science (CGPA 9.00)
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-amber-950/80 border border-amber-600/70 text-amber-300 font-bold">
                  JEE Main 97.93%ile
                </span>
              </div>
            </div>

            {/* Stylized Barcode & Pass Clearance Stamp */}
            <div className="sm:col-span-4 flex flex-col items-center sm:items-end justify-center">
              <div className="p-2 rounded-xl bg-black border border-zinc-800 flex flex-col items-center">
                {/* Simulated Barcode */}
                <div className="flex items-center gap-0.5 h-10 px-1 py-0.5 bg-white/95 rounded">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-black h-full"
                      style={{
                        width: `${(i % 3 === 0 ? 3 : i % 2 === 0 ? 1.5 : 2)}px`
                      }}
                    />
                  ))}
                </div>
                <span className="text-[9px] font-mono text-zinc-400 tracking-widest mt-1">
                  PASS #SK-900-2026
                </span>
              </div>
            </div>
          </div>

          {/* Ticket Footer: Seat Row, Admission Timestamp & Security Chip */}
          <div className="mt-4 pt-3 border-t border-dashed border-red-600/40 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-zinc-400">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-zinc-600 text-[9px] uppercase block">Gate</span>
                <span className="text-white font-bold">IMAX-01</span>
              </div>
              <div>
                <span className="text-zinc-600 text-[9px] uppercase block">Row</span>
                <span className="text-amber-400 font-bold">VIP-DIRECTOR</span>
              </div>
              <div>
                <span className="text-zinc-600 text-[9px] uppercase block">Status</span>
                <span className="text-red-400 font-bold">CLEARANCE GRANTED</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-red-500 font-mono text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
              <span>OFFICIAL CANDIDATE CREDENTIAL</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BACK OF PASS: CODE SPECS & FILM REEL MANIFESTO                            */}
        {/* ========================================================================= */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
          className="absolute inset-0 bg-gradient-to-br from-black via-[#10080a] to-zinc-950 border-2 border-amber-500/70 rounded-3xl p-6 sm:p-7 shadow-[0_20px_70px_rgba(212,175,55,0.3)] overflow-hidden flex flex-col justify-between"
        >
          {/* Holographic Specular Foil Layer */}
          <div className="absolute inset-0 pointer-events-none holo-foil opacity-30" />

          {/* Ticket Side Perforation Notches */}
          <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#060608] border-r-2 border-amber-500/70" />
          <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#060608] border-l-2 border-amber-500/70" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              Engineering Manifesto & Film Specs
            </span>
            <span className="text-[10px] font-mono text-zinc-400">Click to flip front</span>
          </div>

          {/* Specs List */}
          <div className="my-3 space-y-2 text-left text-xs font-mono text-zinc-300">
            <div className="flex items-center justify-between py-1 border-b border-zinc-900">
              <span className="text-zinc-500 uppercase text-[10px]">Architecture</span>
              <span className="text-zinc-200">Full-Stack React + Modern WebGL 3D</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-zinc-900">
              <span className="text-zinc-500 uppercase text-[10px]">Film Collection</span>
              <span className="text-zinc-200">36 Blockbusters Integrated</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-zinc-900">
              <span className="text-zinc-500 uppercase text-[10px]">Engineering Discipline</span>
              <span className="text-amber-400">AI, Algorithms, Modern UI Systems</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-zinc-900">
              <span className="text-zinc-500 uppercase text-[10px]">Aesthetic Engine</span>
              <span className="text-red-400">Deadpool Crimson & Hollywood Noir</span>
            </div>
          </div>

          {/* CTA Row */}
          <div className="pt-2 flex items-center justify-between text-xs font-mono">
            <a
              href="/assets/Shravan_Kumawat_Resume.pdf"
              download="Shravan_Kumawat_Resume.pdf"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official Resume PDF</span>
            </a>
            <span className="text-zinc-500 text-[10px]">VERIFIED 2026</span>
          </div>
        </div>

      </div>
    </div>
  )
}
