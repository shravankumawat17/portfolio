import React, { useState, useEffect } from 'react'
import { GraduationCap, Award, BookOpen, Compass, Sparkles, Clapperboard, Check } from 'lucide-react'
import resumeData from '../../content/resume.json'

export default function ActOrigin() {
  const { education } = resumeData
  const [counts, setCounts] = useState({ cgpa: 0, percentile: 0 })
  const [clapped, setClapped] = useState(false)
  const [statTilt, setStatTilt] = useState({ x: 0, y: 0 })

  // Stat counter roll-up animation
  useEffect(() => {
    const duration = 1600
    const steps = 40
    const stepTime = duration / steps
    let currentStep = 0

    const targetCgpa = 9.00
    const targetPercentile = 97.93

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setCounts({
        cgpa: (easeOut * targetCgpa).toFixed(2),
        percentile: (easeOut * targetPercentile).toFixed(2)
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setCounts({
          cgpa: '9.00',
          percentile: '97.93'
        })
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [])

  const triggerClap = () => {
    setClapped(true)
    setTimeout(() => setClapped(false), 800)
  }

  return (
    <div className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 overflow-hidden select-none">
      {/* Cinematic Steel Blue Volumetric Light */}
      <div className="absolute top-1/2 -left-32 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        
        {/* Act Header with 3D Clapperboard Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-ping" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-blue-400 font-bold">
              Act I • The Origin Story
            </span>
          </div>

          {/* Interactive 3D Clapperboard Button */}
          <button
            onClick={triggerClap}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-blue-500/40 hover:border-blue-400 text-blue-300 text-xs font-mono uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg group"
            title="Click to clap the cinema clapperboard"
          >
            <Clapperboard className={`w-4 h-4 text-blue-400 transition-transform duration-300 ${clapped ? '-rotate-45' : 'group-hover:-rotate-12'}`} />
            <span>{clapped ? 'ACTION! TAKE 1' : 'Clap Slate (Take 1)'}</span>
          </button>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-white uppercase tracking-tight">
          FOUNDATIONS & ACADEMIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500">DISCIPLINE</span>
        </h2>

        {/* 3D Institution Slate & Holographic Stat Pedestals */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Institution Slate with 3D Border Glow */}
          <div className="lg:col-span-7 bg-gradient-to-br from-zinc-950 via-[#0a0f18] to-zinc-950 border border-blue-500/30 rounded-3xl p-6 sm:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:border-blue-400/60 transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between text-zinc-500 text-xs font-mono uppercase mb-6">
                <span className="flex items-center gap-2 text-blue-400 font-bold bg-blue-950/60 px-3 py-1 rounded-full border border-blue-800/60">
                  <GraduationCap className="w-4 h-4" />
                  B.Tech Engineering
                </span>
                <span className="bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 text-zinc-300 font-semibold">
                  {education.duration}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif font-black text-white leading-tight">
                {education.institution}
              </h3>

              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-950/40 border border-blue-500/30 text-blue-300 font-mono text-sm">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>{education.degree}</span>
              </div>

              <div className="h-[1px] w-full bg-zinc-800/80 my-6" />

              <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                Grounded in algorithmic rigor, discrete mathematical models, and machine learning foundations. Combining structured engineering coursework with high-frequency project development to transform ideas into tangible software.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-900 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Compass className="w-3.5 h-3.5 text-blue-400" />
                Location: {education.location}
              </span>
              <span className="text-blue-400 font-semibold">Specialization: Machine Learning & Intelligence Systems</span>
            </div>
          </div>

          {/* 3D Holographic Stat Pedestals */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* 3D Stat Pedestal 1: Combined CGPA */}
            <div 
              className="flex-1 bg-gradient-to-br from-zinc-950 via-[#0a0f1a] to-zinc-950 border border-blue-500/40 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group hover:border-blue-400 hover:shadow-[0_0_40px_rgba(59,110,165,0.3)] transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-blue-400 font-bold mb-2">
                <span>Academic Distinction</span>
                <span className="px-2 py-0.5 rounded bg-blue-950/80 border border-blue-800 text-[10px]">Sem 1 & 2 Combined</span>
              </div>

              <div className="flex items-baseline gap-3 my-2">
                <span className="text-6xl sm:text-7xl font-serif font-black text-white tracking-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                  {counts.cgpa}
                </span>
                <span className="text-blue-400/80 font-mono text-xl font-bold">/ 10.00 CGPA</span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-2 leading-normal">
                Perfect 9.00 combined grade point average achieved across first-year engineering curriculum.
              </p>
            </div>

            {/* 3D Stat Pedestal 2: JEE Main Percentile */}
            <div 
              className="flex-1 bg-gradient-to-br from-zinc-950 via-[#161208] to-zinc-950 border border-amber-500/40 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group hover:border-amber-400 hover:shadow-[0_0_40px_rgba(212,175,55,0.25)] transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-2">
                <span>Competitive Merit</span>
                <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800 text-[10px]">Top 2% Nationwide</span>
              </div>

              <div className="flex items-baseline gap-3 my-2">
                <span className="text-6xl sm:text-7xl font-serif font-black text-white tracking-tight drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                  {counts.percentile}
                </span>
                <span className="text-amber-400 font-mono text-xl font-bold">%ile</span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 font-sans mt-2 leading-normal">
                Scored 97.93 percentile among over 1.2 million candidates in JEE Main national engineering exam.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
