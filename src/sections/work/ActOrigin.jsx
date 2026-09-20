import React, { useState, useEffect } from 'react'
import { GraduationCap, Award, BookOpen, Compass, Sparkles, Clapperboard, Plane, Star } from 'lucide-react'
import resumeData from '../../content/resume.json'

export default function ActOrigin() {
  const { education } = resumeData
  const [counts, setCounts] = useState({ cgpa: 0, percentile: 0 })
  const [clapped, setClapped] = useState(false)

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
    <div className="relative py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 overflow-hidden select-none bg-[#06080d]">
      
      {/* Real Cinematic Movie Backdrop (Top Gun flight theme) */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <img
          src="/assets/movie-scenes/origin-topgun.jpg"
          alt="Top Gun Origin Theme Backdrop"
          className="w-full h-full object-cover object-top filter contrast-125 saturate-120"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080d] via-[#06080d]/80 to-[#06080d]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Act Header with 3D Clapperboard Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-sky-400 font-bold">
              Act I • The Origin Story (Cinematic Flight Academy)
            </span>
          </div>

          {/* Interactive Clapperboard */}
          <button
            onClick={triggerClap}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-sky-500/40 hover:border-sky-400 text-sky-300 text-xs font-mono uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-lg backdrop-blur-md group"
          >
            <Clapperboard className={`w-4 h-4 text-sky-400 transition-transform duration-300 ${clapped ? '-rotate-45' : 'group-hover:-rotate-12'}`} />
            <span>{clapped ? 'ACTION! ROLL CAMERAS' : 'Clap Slate (Scene 1)'}</span>
          </button>
        </div>

        {/* Theatrical Headline */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold block mb-2">
            The Hero's Awakening • Intellectual Training
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-white uppercase tracking-tight leading-tight">
            TOP GUN MERIT & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-400">
              ACADEMIC PRECISION
            </span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-zinc-300 font-sans leading-relaxed">
            Every superhero origin begins with intense mental discipline. Competing against millions nationwide to earn an elite standing at Mumbai's prestigious Dwarkadas J. Sanghvi College of Engineering.
          </p>
        </div>

        {/* Feature Grid: Institution & Visual Stat Pedestals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Institution Card with Visual Badge */}
          <div className="lg:col-span-7 bg-gradient-to-br from-zinc-950/90 via-[#081220]/90 to-zinc-950/90 border border-sky-500/40 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col justify-between group hover:border-sky-400 transition-all duration-500">
            <div>
              <div className="flex items-center justify-between text-zinc-400 text-xs font-mono uppercase mb-6">
                <span className="flex items-center gap-2 text-sky-400 font-bold bg-sky-950/80 px-3 py-1 rounded-full border border-sky-800">
                  <GraduationCap className="w-4 h-4" />
                  B.Tech Engineering Base
                </span>
                <span className="bg-zinc-900 px-3 py-1 rounded-full border border-zinc-700 text-zinc-200 font-bold">
                  {education.duration}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif font-black text-white leading-tight">
                {education.institution}
              </h3>

              <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-sky-950/60 border border-sky-500/40 text-sky-300 font-mono text-sm">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>{education.degree}</span>
              </div>

              <div className="h-[1px] w-full bg-white/10 my-6" />

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                Trained in the core pillars of artificial intelligence: neural networks, computational complexity, linear algebra, and data architecture. Designed to transition smoothly from mathematical research to high-performance real-world deployment.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-200">
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                Mumbai, Maharashtra, India
              </span>
              <span className="text-sky-400 font-bold">Specialty: Machine Intelligence & Systems</span>
            </div>
          </div>

          {/* Visual Stat Counters */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Stat 1: 9.00 CGPA */}
            <div className="flex-1 bg-gradient-to-br from-zinc-950/95 via-[#0c1828]/90 to-zinc-950/95 border-2 border-sky-500/50 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group hover:border-sky-400 hover:shadow-[0_0_40px_rgba(56,189,248,0.3)] transition-all duration-300">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-sky-400 font-bold mb-2">
                <span>Flight Telemetry 01</span>
                <span className="px-2 py-0.5 rounded bg-sky-950 border border-sky-800 text-[10px]">Academic Distinction</span>
              </div>

              <div className="flex items-baseline gap-3 my-2">
                <span className="text-6xl sm:text-7xl font-serif font-black text-white tracking-tight drop-shadow-lg">
                  {counts.cgpa}
                </span>
                <span className="text-sky-400 font-mono text-xl font-bold">/ 10.00 CGPA</span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 font-sans mt-2">
                Combined Semester 1 & 2 Grade Point Average at DJ Sanghvi College of Engineering.
              </p>
            </div>

            {/* Stat 2: 97.93%ile */}
            <div className="flex-1 bg-gradient-to-br from-zinc-950/95 via-[#201808]/90 to-zinc-950/95 border-2 border-amber-500/50 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden group hover:border-amber-400 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all duration-300">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-2">
                <span>Flight Telemetry 02</span>
                <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-[10px]">National Top 2%</span>
              </div>

              <div className="flex items-baseline gap-3 my-2">
                <span className="text-6xl sm:text-7xl font-serif font-black text-white tracking-tight drop-shadow-lg">
                  {counts.percentile}
                </span>
                <span className="text-amber-400 font-mono text-xl font-bold">%ile JEE Main</span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 font-sans mt-2">
                Scored 97.93 percentile among over 1.2 million engineering candidates across India.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
