import React, { useState, useRef } from 'react'
import { Ticket, Sparkles, Film, ArrowRight, ShieldAlert, Award, Clapperboard, CheckCircle2 } from 'lucide-react'
import cinemaAudio from '../../utils/cinemaAudio'

export default function BoxOfficeTicketStage({ onTicketConfirmed }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [isTearing, setIsTearing] = useState(false)
  const ticketRef = useRef(null)

  // 3D Perspective Tilt calculation based on cursor over the ticket
  const handleMouseMove = (e) => {
    if (!ticketRef.current) return
    const rect = ticketRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20
    setMousePos({ x, y })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePos({ x: 0, y: 0 })
  }

  const handleBuyTicket = () => {
    if (isTearing) return
    setIsTearing(true)
    // Play authentic mechanical ticket punch / paper perforation tear sound
    cinemaAudio.playTicketPunchSound()

    // Smooth ticket tear animation before navigating to countdown
    setTimeout(() => {
      if (onTicketConfirmed) {
        onTicketConfirmed()
      }
    }, 450)
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#060608] overflow-y-auto overflow-x-hidden flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-10 select-none animate-in fade-in duration-500">
      
      {/* Background Theatrical Lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-red-600/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[650px] h-[450px] bg-amber-500/10 rounded-full blur-[180px]" />
        <div className="absolute inset-0 film-grain opacity-10" />
      </div>

      {/* Top Theatrical Marquee Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between pb-4 border-b border-zinc-800/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-950/80 border border-red-600/60 flex items-center justify-center text-red-400 shadow-[0_0_15px_rgba(200,29,44,0.3)]">
            <Film className="w-4 h-4 text-red-500 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-red-400 font-bold block">
              CINEMA BOX OFFICE • THEATRICAL ADMISSION
            </span>
            <h2 className="text-sm sm:text-base font-serif font-black text-white tracking-wide">
              AUDITORIUM 01 • SCREENING LOUNGE
            </h2>
          </div>
        </div>

        {/* Quick Skip Option */}
        <button
          onClick={handleBuyTicket}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/60 hover:border-amber-400/60 text-xs font-mono uppercase tracking-widest text-zinc-300 hover:text-amber-300 transition-all cursor-pointer group"
          title="Skip straight to 3-second countdown"
        >
          <span>Quick Pass</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-amber-400" />
        </button>
      </header>

      {/* Main Split-Screen Feature Showcase */}
      <main className="relative z-10 max-w-7xl mx-auto w-full my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: INDIAN CINEMA STATUTORY WARNING & PUBLIC HEALTH ANNOUNCEMENT  */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Statutory Warning Theatrical Frame */}
          <div className="bg-zinc-950/90 border-2 border-red-600/50 rounded-2xl p-3 sm:p-4 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            
            {/* Top Statutory Warning Banner in Hindi & English */}
            <div className="bg-red-950/90 border border-red-600/60 rounded-lg p-2.5 mb-3 text-center shadow-inner">
              <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs font-mono font-bold tracking-wider uppercase">
                <ShieldAlert className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                <span>वैधानिक चेतावनी / STATUTORY WARNING</span>
              </div>
              <p className="text-[11px] font-sans text-white font-semibold leading-snug mt-1">
                धूम्रपान एवं मद्यपान स्वास्थ्य के लिए हानिकारक है
              </p>
              <p className="text-[10px] font-mono text-zinc-300 tracking-wide uppercase">
                Smoking & Alcohol Consumption is Injurious to Health
              </p>
            </div>

            {/* Video Container (Classic Indian Theatrical Pre-Show Video) */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-zinc-800 shadow-2xl group">
              <iframe
                src="https://www.youtube.com/embed/KVhY3WK9zs4?rel=0&modestbranding=1&playsinline=1"
                title="Indian Cinema Statutory Warning PSA"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover"
              />
            </div>

            {/* Indian Censor Board Certificate (CBFC) Badge */}
            <div className="mt-3 p-2.5 rounded-lg bg-black/70 border border-zinc-800/80 flex items-center justify-between text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-amber-400/20 border border-amber-400/50 flex items-center justify-center font-serif font-black text-amber-300 text-sm">
                  U/A
                </div>
                <div>
                  <span className="text-[9px] font-mono tracking-widest uppercase text-amber-400 font-bold block">
                    CENTRAL BOARD OF FILM CERTIFICATION
                  </span>
                  <p className="text-[11px] font-serif font-bold text-white leading-none mt-0.5">
                    SHRAVAN KUMAWAT : CINEMATIC CUT
                  </p>
                </div>
              </div>
              <span className="text-[9px] font-mono text-zinc-500 uppercase px-2 py-0.5 rounded bg-zinc-900">
                IMAX 70MM
              </span>
            </div>

            {/* Bottom Disclaimer Notice */}
            <div className="mt-2 text-center text-[10px] font-mono text-zinc-400">
              *You do not need to wait for the video to end. Click <strong className="text-amber-400 font-bold">BUY TICKET</strong> to proceed anytime!
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: 3D MOVIE TICKET & THEATRICAL ADMISSION CHECKOUT            */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          {/* Eyebrow & Theatrical Headline */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-950 border border-red-600/50 text-red-400 text-xs font-mono tracking-[0.25em] uppercase mb-3 shadow-lg">
              <Ticket className="w-3.5 h-3.5 text-red-500" />
              <span>OFFICIAL PREMIERE ADMISSION</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-white uppercase tracking-tight leading-tight">
              BUY A TICKET TO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-300 to-amber-500">
                SHRAVAN'S CINEMATIC PORTFOLIO EXPERIENCE
              </span>
            </h1>

            <p className="mt-2.5 text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed max-w-xl">
              Grab your popcorn and claim your front-row seat. An immersive 36-film engineering universe showcasing full-stack software, machine learning architectures, and 9.00 CGPA academic merit.
            </p>
          </div>

          {/* 3D Interactive Holographic Movie Ticket */}
          <div 
            className="w-full max-w-xl perspective-container py-2"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={ticketRef}
              style={{
                transform: `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg) translateZ(10px)`,
                transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
              }}
              className={`relative rounded-2xl bg-gradient-to-r from-zinc-950 via-[#14080a] to-zinc-950 border-2 border-amber-400/50 shadow-[0_20px_50px_rgba(200,29,44,0.35)] p-5 sm:p-6 overflow-hidden flex flex-col sm:flex-row gap-4 items-stretch justify-between transition-all duration-300 ${
                isTearing ? 'scale-95 opacity-50 blur-[1px]' : 'hover:border-amber-400'
              }`}
            >
              {/* Dynamic Holographic Foil Light Reflection */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  background: `radial-gradient(450px circle at ${50 + mousePos.x * 2}% ${50 + mousePos.y * 2}%, rgba(212,175,55,0.4), transparent 70%)`
                }}
              />

              {/* Main Ticket Left Portion (Details) */}
              <div className="flex-1 flex flex-col justify-between pr-0 sm:pr-4">
                <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Clapperboard className="w-4 h-4 text-red-500" />
                    <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-bold">
                      IMAX 70MM ADMIT ONE
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                    PASS #SK-0017
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-xl font-serif font-black text-white tracking-wide">
                    SHRAVAN KUMAWAT
                  </h3>
                  <p className="text-[11px] font-mono text-red-400 font-bold uppercase mt-0.5">
                    DIRECTOR'S CUT • AI & FULL STACK
                  </p>
                </div>

                {/* Seat & Telemetry Grid */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-zinc-800/80 text-[10px] font-mono">
                  <div>
                    <span className="text-zinc-500 block uppercase">SCREEN</span>
                    <strong className="text-zinc-200">AUDI 01</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block uppercase">SEAT</span>
                    <strong className="text-amber-400">ROW A - 17</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 block uppercase">ADMISSION</span>
                    <strong className="text-red-400">FREE / VIP</strong>
                  </div>
                </div>

                {/* Barcode Strip */}
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-zinc-900">
                  <div className="font-mono text-[9px] tracking-[0.25em] text-zinc-500">
                    ||||| | |||| ||| || |||||| | ||
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500">
                    LIVE STREAMING 2026
                  </span>
                </div>
              </div>

              {/* Perforation Divider Line (with punch notches) */}
              <div className="relative hidden sm:flex flex-col items-center justify-between px-2">
                <div className="w-4 h-4 rounded-full bg-[#060608] -mt-8 border-b border-amber-400/50" />
                <div className="h-full border-r-2 border-dashed border-zinc-700/80 my-1" />
                <div className="w-4 h-4 rounded-full bg-[#060608] -mb-8 border-t border-amber-400/50" />
              </div>

              {/* Ticket Right Portion (Perforated Stub) */}
              <div className={`sm:w-36 rounded-xl bg-gradient-to-b from-red-950/40 to-black/60 border border-red-600/30 p-3 flex flex-col justify-between items-center text-center transition-transform duration-300 ${
                isTearing ? 'translate-x-6 rotate-6 opacity-0' : ''
              }`}>
                <div className="w-10 h-10 rounded-full bg-red-950/80 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-md">
                  <Award className="w-5 h-5" />
                </div>

                <div className="my-2">
                  <span className="text-[9px] font-mono tracking-widest text-zinc-400 block uppercase">
                    STUB PASS
                  </span>
                  <span className="text-xs font-serif font-black text-amber-300 block">
                    SEAT A-17
                  </span>
                  <span className="text-[9px] font-mono text-red-400">
                    CGPA 9.00
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[9px] font-mono text-zinc-400">
                  <CheckCircle2 className="w-3 h-3 text-red-500" />
                  <span>VALIDATED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Area: Giant Book Ticket Button */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleBuyTicket}
              disabled={isTearing}
              className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-mono font-black text-sm sm:text-base uppercase tracking-widest shadow-[0_0_35px_rgba(229,9,20,0.5)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] transition-all hover:scale-102 active:scale-98 cursor-pointer group"
            >
              <Ticket className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
              <span>{isTearing ? 'TEARING TICKET & ENTERING...' : 'BUY TICKET & ENTER THEATRE'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Micro-telemetry */}
          <div className="mt-3 flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>Clicking "BUY TICKET" navigates directly to the 3-second countdown leader</span>
          </div>

        </div>

      </main>

      {/* Bottom Footer Notice */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between text-xs font-mono text-zinc-500">
        <span>© 2026 SHRAVAN KUMAWAT • ALL RIGHTS RESERVED</span>
        <span className="text-amber-400 font-bold">PREMIERE RELEASE • 36 FEATURE PRODUCTIONS</span>
      </footer>

    </div>
  )
}
