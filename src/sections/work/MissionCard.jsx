import React, { useState, useRef } from 'react'
import { ExternalLink, Clapperboard, Sparkles, Layers, CheckCircle2, RotateCw, Terminal, Cpu } from 'lucide-react'
import { GithubIcon } from '../../components/SocialIcons'

const PROJECT_POSTERS = {
  'goal-tracker': '/posters_cache/mad-max-fury-road.jpg',
  'ai-voice-therapist': '/assets/movie-scenes/project-therapist.jpg',
  'hommies-ecommerce': '/posters_cache/pretty-woman.jpg',
  'pinterest-app': '/posters_cache/spider-man.jpg'
}

export default function MissionCard({ project, index }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current || isFlipped) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    // 3D perspective tilt
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const posterImg = PROJECT_POSTERS[project.id] || '/posters_cache/deadpool.jpg'

  return (
    <div 
      className="relative min-h-[580px] perspective-[1200px] select-none"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Flipping Card Container */}
      <div
        style={{
          transform: isFlipped 
            ? 'rotateY(180deg)' 
            : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: isFlipped 
            ? 'transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1)' 
            : (tilt.x === 0 ? 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none')
        }}
        className="relative w-full h-full rounded-3xl"
      >
        
        {/* ==================== FRONT FACE: CINEMATIC LOBBY CARD WITH REAL VISUAL POSTER ==================== */}
        <div 
          style={{ backfaceVisibility: 'hidden' }}
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-zinc-950 via-[#0c0c16] to-zinc-950 border-2 border-zinc-800 hover:border-zinc-500 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col justify-between"
        >
          {/* Top Cinema Accent Bar */}
          <div 
            className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300"
            style={{ backgroundColor: project.accent }}
          />

          <div>
            {/* Header Eyebrow */}
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">
              <span className="flex items-center gap-1.5 font-bold" style={{ color: project.accent }}>
                <Clapperboard className="w-4 h-4" />
                Mission 0{index + 1} • {project.genre}
              </span>
              <button
                onClick={() => setIsFlipped(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-700 hover:border-amber-400 text-[11px] font-mono text-zinc-300 hover:text-amber-300 transition-all shadow"
                title="Flip to technical architecture blueprint"
              >
                <RotateCw className="w-3 h-3 text-amber-400" />
                <span>Flip Blueprint 3D</span>
              </button>
            </div>

            {/* Split: Visual Movie Poster Banner & Titles */}
            <div className="flex gap-4 sm:gap-6 items-start mb-4">
              {/* Real Visual Poster Thumbnail */}
              <div className="relative w-20 sm:w-24 aspect-[2/3] rounded-xl overflow-hidden shadow-xl border-2 border-white/20 shrink-0">
                <img
                  src={posterImg}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>

              <div>
                <div className="text-[10px] font-mono tracking-[0.25em] text-amber-400 uppercase font-bold">
                  Theatrical Premiere: {project.cinematicTitle}
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-black text-white tracking-wide mt-1 leading-tight">
                  {project.title}
                </h3>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400">
                  {project.status}
                </span>
              </div>
            </div>

            {/* Approved Movie Logline */}
            <blockquote 
              className="my-3 pl-3.5 border-l-4 text-xs sm:text-sm font-serif italic text-zinc-200 leading-relaxed bg-zinc-900/60 py-2.5 rounded-r-xl"
              style={{ borderColor: project.accent }}
            >
              "{project.logline}"
            </blockquote>

            {/* Synopsis */}
            <p className="text-xs text-zinc-300 font-sans leading-relaxed mt-2 line-clamp-3">
              {project.description}
            </p>

            {/* Key Features */}
            {project.metrics && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.metrics.map((m) => (
                  <span 
                    key={m} 
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-zinc-900/90 border border-zinc-800 text-[10px] font-mono text-zinc-300"
                  >
                    <CheckCircle2 className="w-3 h-3 text-amber-400" />
                    {m}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Cast & CTAs */}
          <div className="mt-4 pt-4 border-t border-zinc-900">
            <div className="mb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block mb-1.5 font-bold">
                Starring Cast (Tech Stack):
              </span>
              <div className="flex flex-wrap gap-1">
                {project.cast.map((actor) => (
                  <span
                    key={actor}
                    className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300"
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Code</span>
              </a>

              <button
                onClick={() => setIsFlipped(true)}
                style={{ borderColor: project.accent, color: project.accent }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold uppercase tracking-wider bg-zinc-950 hover:bg-zinc-900 transition-all shadow"
              >
                <span>Blueprint 3D</span>
                <RotateCw className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>


        {/* ==================== BACK FACE: 3D TECHNICAL BLUEPRINT ==================== */}
        <div 
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#080f1a] via-[#05080e] to-[#0c0814] border-2 border-cyan-500/60 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col justify-between"
        >
          {/* Top Blueprint Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400" />

          <div>
            <div className="flex items-center justify-between text-xs font-mono uppercase text-cyan-400 mb-4">
              <span className="flex items-center gap-2 font-bold tracking-widest">
                <Terminal className="w-4 h-4 text-cyan-400" />
                Technical Blueprint • Behind The Scenes
              </span>
              <button
                onClick={() => setIsFlipped(false)}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700 text-[11px] font-mono text-cyan-200 hover:bg-cyan-900 transition-all shadow"
              >
                <RotateCw className="w-3 h-3 text-cyan-300" />
                <span>Return To Poster</span>
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-mono font-bold text-white mb-2">
              System Architecture & Mechanics
            </h3>

            <div className="bg-black/70 border border-cyan-500/30 rounded-xl p-4 font-mono text-xs text-cyan-300/90 leading-relaxed mb-4">
              <div className="text-zinc-500 mb-1">// Core Engineering Philosophy</div>
              <p>
                Engineered with strict separation of concerns, high-velocity responsive layouts, and zero unwanted overhead. Clean component state pipelines coupled with localized browser storage.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs text-zinc-300">
              <div className="flex items-start gap-2">
                <Cpu className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white">Execution Runtime:</span> Responsive frontend architecture with predictable component lifecycles.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Layers className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white">State Management:</span> Atomic reactive state flow guaranteeing 60fps render consistency.
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-cyan-900/60 flex items-center justify-between">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950 border border-cyan-700 hover:bg-cyan-900 text-cyan-200 text-xs font-mono uppercase tracking-wider font-bold transition-all shadow-lg"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Inspect Code Repository</span>
            </a>

            <button
              onClick={() => setIsFlipped(false)}
              className="text-xs font-mono text-zinc-400 hover:text-white uppercase tracking-wider underline underline-offset-4"
            >
              Flip Back →
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}
