import React, { useState, useRef } from 'react'
import { ExternalLink, Clapperboard, Sparkles, Layers, CheckCircle2, RotateCw, Terminal, Cpu, ArrowUpRight } from 'lucide-react'
import { GithubIcon } from '../../components/SocialIcons'

const PROJECT_SUPPORTING_ART = {
  'goal-tracker': {
    bgScene: '/assets/movie-scenes/origin-topgun.jpg',
    sidePoster: '/posters_cache/mad-max-fury-road.jpg',
    movieBadge: 'Inspired by Mad Max & F1'
  },
  'ai-voice-therapist': {
    bgScene: '/assets/movie-scenes/project-therapist.jpg',
    sidePoster: '/posters_cache/apex.jpg',
    movieBadge: 'Inspired by Interstellar & Her'
  },
  'hommies-ecommerce': {
    bgScene: '/assets/movie-scenes/origin-topgun.jpg',
    sidePoster: '/posters_cache/pretty-woman.jpg',
    movieBadge: 'Inspired by Pretty Woman'
  },
  'pinterest-app': {
    bgScene: '/assets/movie-scenes/world-inception.jpg',
    sidePoster: '/posters_cache/spider-man.jpg',
    movieBadge: 'Inspired by Spider-Man Multiverse'
  }
}

export default function MissionCard({ project, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    // 3D perspective tilt
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    setTilt({ x: rotateX, y: rotateY })

    // Set CSS variables for spotlight effect
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const art = PROJECT_SUPPORTING_ART[project.id] || {
    bgScene: '/assets/movie-scenes/world-darkknight.jpg',
    sidePoster: '/posters_cache/deadpool.jpg',
    movieBadge: 'Deadpool Cinema Reel'
  }

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 ? 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none'
      }}
      className="spotlight-card relative bg-gradient-to-br from-zinc-950 via-[#100a0c] to-zinc-950 border-2 border-red-600/40 hover:border-red-500 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 group flex flex-col justify-between select-none"
    >
      {/* 1. MOVIE SCENE STILL AS ATMOSPHERIC BACKGROUND (Not intruding on text) */}
      <div className="absolute inset-0 pointer-events-none opacity-15 group-hover:opacity-25 transition-opacity duration-500">
        <img
          src={art.bgScene}
          alt={project.title}
          className="w-full h-full object-cover object-center filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/85 to-zinc-950/70" />
      </div>

      {/* Top Deadpool Crimson Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-amber-400 to-red-600" />

      {/* Dynamic Cursor Spotlight (Elevate 1.0 style) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: 'radial-gradient(420px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(229, 9, 20, 0.15), rgba(212, 175, 55, 0.08) 40%, transparent 80%)'
        }}
      />

      {/* Content Body */}
      <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between flex-1">
        
        <div>
          {/* Header Row: Production Tag & Supporting Movie Badge */}
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest mb-4">
            <span className="text-red-400 font-bold flex items-center gap-1.5">
              <Clapperboard className="w-4 h-4 text-red-500" />
              Production 0{index + 1}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-zinc-900/90 border border-red-600/40 text-[10px] text-amber-300 font-bold">
              {art.movieBadge}
            </span>
          </div>

          {/* Project Title & Theatrical Name with Side Supporting Poster Image */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <span className="text-[10px] font-mono tracking-[0.25em] text-amber-400 uppercase font-bold block mb-1">
                {project.cinematicTitle}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-white leading-tight group-hover:text-amber-200 transition-colors">
                {project.title}
              </h3>
            </div>

            {/* Side Supporting Movie Poster (Right side supporting visual) */}
            <div className="relative w-16 sm:w-20 aspect-[2/3] rounded-xl overflow-hidden shadow-xl border-2 border-red-600/60 shrink-0 transform group-hover:scale-105 group-hover:rotate-2 transition-transform duration-300">
              <img
                src={art.sidePoster}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* Punchy Movie Logline */}
          <blockquote className="my-4 pl-3.5 border-l-4 border-red-500 text-sm font-serif italic text-zinc-200 leading-relaxed bg-red-950/25 py-2 rounded-r-xl">
            "{project.logline}"
          </blockquote>

          {/* Clean, Crisp Project Purpose (Not too much text) */}
          <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
            {project.description.split('.')[0]}. Built with responsive UI components and real-time state management.
          </p>

          {/* Key Capabilities Chips */}
          {project.metrics && (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.metrics.map((m) => (
                <span 
                  key={m} 
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-700/80 text-[11px] font-mono text-zinc-300"
                >
                  <CheckCircle2 className="w-3 h-3 text-amber-400" />
                  {m}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer: Tech Stack (Cast) & Action CTAs */}
        <div className="mt-6 pt-4 border-t border-zinc-800/80">
          <div className="mb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1.5 font-bold">
              Starring Cast (Tech Stack):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.cast.map((actor) => (
                <span
                  key={actor}
                  className="px-2.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300"
                >
                  {actor}
                </span>
              ))}
            </div>
          </div>

          {/* Clean Action Buttons */}
          <div className="flex items-center justify-between pt-1">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
            >
              <GithubIcon className="w-4 h-4 text-zinc-400 group-hover:text-white" />
              <span>Source Repository</span>
            </a>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-amber-500 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Explore Code</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
