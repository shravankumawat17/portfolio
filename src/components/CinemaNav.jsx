import React, { useState, useEffect } from 'react'
import { Film, FileDown, Play, Sparkles } from 'lucide-react'
import AudioController from './AudioController'

export default function CinemaNav({ currentSection = 'start', onNavigate, introActive }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (introActive) return null

  const navItems = [
    { id: 'start', label: 'The Universe', scene: 'Scene 01 • The Cinematic Universe' },
    { id: 'work', label: 'Movie Verses', scene: 'Scene 02 • Skills & Productions' },
    { id: 'credits', label: 'Starring Credits', scene: 'Scene 03 • Starring Shravan' },
  ]

  const scrollToSection = (id) => {
    if (onNavigate) onNavigate(id)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ${
      scrolled 
        ? 'bg-[#060608]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl shadow-black/80' 
        : 'bg-gradient-to-b from-black/80 to-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand / Production Slate */}
        <button 
          onClick={() => scrollToSection('start')}
          className="flex items-center gap-3 text-left group"
        >
          <div className="w-8 h-8 rounded border border-amber-400/40 bg-zinc-900 flex items-center justify-center text-amber-400 group-hover:border-amber-400 group-hover:bg-amber-400/10 transition-all">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono tracking-widest text-amber-400/80 uppercase">A Film By</div>
            <div className="text-sm font-serif font-bold text-white tracking-wide group-hover:text-amber-300 transition-colors">
              SHRAVAN KUMAWAT
            </div>
          </div>
        </button>

        {/* Film Scene Jump Links */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-950/70 border border-zinc-800 rounded-full px-3 py-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                currentSection === item.id
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions Deck */}
        <div className="flex items-center gap-2 sm:gap-3">
          <AudioController />

          <a
            href="/assets/Shravan_Kumawat_Resume.pdf"
            download="Shravan_Kumawat_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider bg-amber-400 text-black font-bold hover:bg-amber-300 shadow-md shadow-amber-400/20 transition-all hover:scale-105 active:scale-95"
            title="Download Official Resume PDF"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Resume</span>
          </a>
        </div>

      </div>
    </header>
  )
}
