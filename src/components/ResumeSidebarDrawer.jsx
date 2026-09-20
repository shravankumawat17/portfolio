import React, { useState, useEffect } from 'react'
import { Clapperboard, X, ChevronRight, FileDown, ExternalLink, GraduationCap, Cpu, Code2, Award, Mail, Flame } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './SocialIcons'

const RESUME_SCENES = [
  {
    id: 'start',
    scene: 'Scene 01',
    label: 'The Cinematic Universe',
    desc: 'Hero introduction & vision',
    icon: Flame,
    color: 'text-red-500'
  },
  {
    id: 'act-origin',
    scene: 'Act I',
    label: 'The Origin Story',
    desc: 'DJ Sanghvi • CGPA 9.00 • JEE 97.93%ile',
    icon: GraduationCap,
    color: 'text-amber-400'
  },
  {
    id: 'act-arsenal',
    scene: 'Act II',
    label: 'The Arsenal & Skills',
    desc: '4 Movie Worlds • C++, AI, React, UI',
    icon: Cpu,
    color: 'text-red-400'
  },
  {
    id: 'cinema-vault',
    scene: 'Vault',
    label: 'The Cinema Vault',
    desc: 'Visual stills & architectural parallels',
    icon: Clapperboard,
    color: 'text-amber-400'
  },
  {
    id: 'act-missions',
    scene: 'Act III',
    label: 'Blockbuster Missions',
    desc: 'AI Voice Therapist, Ecommerce, Apps',
    icon: Code2,
    color: 'text-red-500'
  },
  {
    id: 'training-montage',
    scene: 'Drills',
    label: 'Training Montage',
    desc: 'Certifications & deliberate practice',
    icon: Award,
    color: 'text-amber-400'
  },
  {
    id: 'credits',
    scene: 'Credits',
    label: 'Starring Credits',
    desc: 'Awards, laurels & official contact',
    icon: Mail,
    color: 'text-red-400'
  }
]

export default function ResumeSidebarDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('start')

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250
      for (let i = RESUME_SCENES.length - 1; i >= 0; i--) {
        const item = RESUME_SCENES[i]
        const el = document.getElementById(item.id)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(item.id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Floating Toggle Tab (Right Edge of Viewport) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-zinc-950/90 hover:bg-black border-l-2 border-y border-red-600/70 hover:border-red-500 text-zinc-300 hover:text-white py-3.5 px-2 rounded-l-2xl shadow-[0_0_25px_rgba(200,29,44,0.4)] backdrop-blur-md transition-all group flex flex-col items-center gap-2 cursor-pointer"
        title="Open Resume Scene Index"
      >
        <Clapperboard className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
        <span
          className="text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-300 group-hover:text-amber-300 font-bold"
          style={{ writingMode: 'vertical-rl' }}
        >
          RESUME SCRIPT
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
      </button>

      {/* Backdrop Overlay when drawer is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity animate-in fade-in duration-300"
        />
      )}

      {/* Slide-out Sidebar Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-[380px] md:w-[420px] bg-gradient-to-b from-[#09090d] via-[#060608] to-[#0d0709] border-l-2 border-red-600/60 z-50 shadow-2xl flex flex-col justify-between transition-transform duration-500 ease-out select-none ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-800/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-950/80 border border-red-600/60 flex items-center justify-center text-red-400">
                <Clapperboard className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-red-400 font-bold block">
                  RESUME SCRIPT BREAKDOWN
                </span>
                <h3 className="text-sm font-serif font-bold text-white tracking-wide">
                  Scene Index & Navigation
                </h3>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Candidate Profile Quick Box */}
          <div className="mt-4 p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-left">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1">
              <span className="text-white font-bold">SHRAVAN KUMAWAT</span>
              <span className="text-red-400">CGPA 9.00</span>
            </div>
            <p className="text-[11px] font-sans text-zinc-400 leading-tight">
              B.Tech AI & Data Science • DJ Sanghvi College • JEE 97.93%ile
            </p>
          </div>
        </div>

        {/* Navigation Scene Links */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2">
          {RESUME_SCENES.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 group cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-red-950/60 via-zinc-900 to-zinc-950 border-2 border-red-600/70 shadow-lg shadow-red-600/20'
                    : 'bg-zinc-950/60 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900/50'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-400 group-hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase mb-0.5">
                    <span className={isActive ? 'text-amber-400 font-bold' : 'text-zinc-500'}>
                      {item.scene}
                    </span>
                    {isActive && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] bg-red-600 text-white font-bold">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-serif font-bold text-white truncate">
                    {item.label}
                  </h4>
                  <p className="text-[11px] font-sans text-zinc-400 truncate mt-0.5">
                    {item.desc}
                  </p>
                </div>

                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive ? 'text-amber-400 translate-x-1' : 'text-zinc-600 group-hover:text-zinc-300'
                  }`}
                />
              </button>
            )
          })}
        </div>

        {/* Drawer Footer & Direct Resume Download */}
        <div className="p-4 sm:p-5 border-t border-zinc-800/80 bg-black/60">
          <a
            href="/assets/Shravan_Kumawat_Resume.pdf"
            download="Shravan_Kumawat_Resume.pdf"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-xl shadow-red-600/30 transition-all hover:scale-102 active:scale-98 mb-3"
          >
            <FileDown className="w-4 h-4" />
            <span>Download Official Resume PDF</span>
          </a>

          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-1">
            <a
              href="https://github.com/shravankumawat17"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/shravan-kumawat-a31085271"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-red-400 transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <span className="text-[10px] text-zinc-600">DIRECTOR'S CUT</span>
          </div>
        </div>
      </aside>
    </>
  )
}
