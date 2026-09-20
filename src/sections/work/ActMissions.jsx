import React from 'react'
import { Flame, Film, Clapperboard, Sparkles } from 'lucide-react'
import resumeData from '../../content/resume.json'
import MissionCard from './MissionCard'

export default function ActMissions() {
  const { projects } = resumeData

  return (
    <div className="relative py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 overflow-hidden select-none bg-[#050507]">
      
      {/* Volumetric Cinema Atmosphere */}
      <div className="absolute top-1/4 left-10 w-[700px] h-[500px] bg-red-600/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Act Eyebrow & Theatrical Headline */}
        <div className="scroll-reveal text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-red-500/40 text-red-400 text-xs font-mono tracking-[0.25em] uppercase mb-4 shadow-xl shadow-red-500/10">
            <Clapperboard className="w-3.5 h-3.5 text-red-500" />
            <span>Act III • The Feature Productions</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-white uppercase tracking-tight leading-tight">
            FOUR BLOCKBUSTER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-300 to-amber-500">
              SOFTWARE PREMIERES
            </span>
          </h2>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-zinc-400 font-sans leading-relaxed">
            Conceived, directed, and engineered from scratch. Each production is a complete case study with its own narrative logline, custom tech architecture, and problem-solving mission.
          </p>
        </div>

        {/* 2x2 Grid of 3D Flipping Theatrical Cards */}
        <div className="scroll-reveal-zoom delay-100 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {projects.map((project, idx) => (
            <MissionCard key={project.id} project={project} index={idx} />
          ))}
        </div>

        {/* Theatrical Reel Footer Notice */}
        <div className="mt-16 text-center text-xs font-mono text-zinc-500 uppercase tracking-widest flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Click "Flip Blueprint 3D" on any card to inspect system architecture</span>
        </div>

      </div>
    </div>
  )
}
