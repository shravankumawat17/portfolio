import React from 'react'
import { Flame, Film } from 'lucide-react'
import resumeData from '../../content/resume.json'
import MissionCard from './MissionCard'

export default function ActMissions() {
  const { projects } = resumeData

  return (
    <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 overflow-hidden">
      
      {/* Dynamic cinema lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        
        {/* Act Eyebrow & Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-red-400 font-bold">
            Act III • The Missions (Highlight Reel)
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-white uppercase tracking-tight">
              FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-amber-500">PRODUCTIONS</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 font-sans max-w-xl leading-relaxed">
              Four marquee projects conceived and directed from scratch. Each production brings its own story, custom tech architecture, and problem-solving focus.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <Film className="w-4 h-4 text-amber-400" />
            <span>4 Complete Case Studies</span>
          </div>
        </div>

        {/* 2x2 Grid of Lobby Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <MissionCard key={project.id} project={project} index={idx} />
          ))}
        </div>

      </div>
    </div>
  )
}
