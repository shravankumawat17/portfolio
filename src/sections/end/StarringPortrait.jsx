import React, { useState, useRef } from 'react'
import { Sparkles, Shield, Zap, Film, Flame } from 'lucide-react'
import creditsData from '../../content/credits.json'

export default function StarringPortrait() {
  const { starring } = creditsData
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const frameRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!frameRef.current) return
    const rect = frameRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -12
    const rotateY = ((x - centerX) / centerX) * 12
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div className="relative my-20 max-w-5xl mx-auto px-4 select-none perspective-[1400px]">
      {/* Volumetric Crimson/Gold Glow Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-amber-500/15 to-red-600/20 rounded-3xl blur-3xl pointer-events-none -z-10" />

      {/* 3D Tilted Hero Showcase Card */}
      <div 
        ref={frameRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: tilt.x === 0 ? 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none'
        }}
        className="bg-gradient-to-br from-zinc-950 via-[#10080a] to-black border-2 border-red-600/60 rounded-3xl p-6 sm:p-12 shadow-[0_0_80px_rgba(200,29,44,0.4)] relative overflow-hidden"
      >
        
        {/* Top Comic Banner */}
        <div className="flex items-center justify-between border-b border-red-600/30 pb-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-red-500">
              The Lead Role • Cinematic Portrait
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-amber-400 uppercase">
            <Flame className="w-4 h-4 text-red-500" />
            <span>Deadpool Protocol Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          
          {/* 3D Elevated Portrait Image Frame */}
          <div 
            style={{ transform: 'translateZ(40px)' }}
            className="md:col-span-6 flex justify-center"
          >
            <div className="relative group max-w-[340px] sm:max-w-[380px]">
              {/* Outer Comic Red/Gold Ring */}
              <div className="absolute -inset-2 bg-gradient-to-r from-red-600 via-amber-400 to-red-600 rounded-3xl blur-md opacity-80 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative rounded-2xl overflow-hidden border-2 border-red-500 bg-black shadow-2xl">
                <img
                  src={starring.image}
                  alt="Starring Shravan Kumawat"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Comic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Actor Profile & Hero Narrative */}
          <div 
            style={{ transform: 'translateZ(30px)' }}
            className="md:col-span-6 text-left flex flex-col justify-center"
          >
            <span className="text-xs font-mono tracking-[0.35em] text-red-400 uppercase font-bold">
              Starring In The Lead
            </span>
            <h3 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-white uppercase tracking-tight mt-1 leading-none">
              SHRAVAN KUMAWAT
            </h3>

            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-red-950/60 border border-red-600/40 text-amber-300 font-mono text-xs uppercase tracking-wider w-fit">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{starring.characterAlias}</span>
            </div>

            <blockquote className="my-6 pl-4 border-l-4 border-red-500 text-sm sm:text-base font-serif italic text-zinc-200 leading-relaxed bg-red-950/30 py-3 rounded-r-xl">
              "{starring.quote}"
            </blockquote>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
              Merging deep technical rigor with theatrical creativity. Every software architecture, machine learning experiment, and interface is engineered with precision, high-energy momentum, and unapologetic ambition.
            </p>

            <div className="mt-8 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="text-zinc-200 font-bold">{starring.role}</span>
              <span className="text-red-400">Directed by Shravan</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
