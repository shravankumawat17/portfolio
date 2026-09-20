import React, { useState, useRef } from 'react'
import { Flame, Sparkles, ChevronRight, Film, Layers, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react'

const MOVIE_WORLDS = [
  {
    id: 'ai-machine',
    number: 'SET 01',
    title: 'THE MACHINE MIND',
    cinemaReference: 'The Matrix • Interstellar • Iron Man (J.A.R.V.I.S.)',
    genre: 'Sci-Fi / Synthetic Intelligence',
    accent: '#e50914',
    accentGlow: 'rgba(229, 9, 20, 0.45)',
    bgGradient: 'from-[#1c080a] via-[#0d0506] to-[#050507]',
    sceneImage: '/assets/movie-scenes/project-therapist.jpg',
    moviePosters: [
      { title: 'Source Code', poster: '/posters_cache/source-code.jpg' },
      { title: 'Apex / Interstellar', poster: '/posters_cache/apex.jpg' },
      { title: 'Deadpool AI', poster: '/posters_cache/deadpool.jpg' }
    ],
    tagline: 'Teaching machines to think, parse reality, and converse with human emotion.',
    narrative: `In a digital universe driven by neural network weights and vector embeddings, the developer steps into the role of cybernetic architect. Combining machine learning foundations with high-velocity prompt engineering to forge intelligent prototypes.`,
    skills: [
      { name: 'Machine Learning Foundations', desc: 'Predictive models, loss minimization & vector math' },
      { name: 'Prompt Engineering & Reasoning', desc: 'Guiding generative LLM reasoning chains & temperature tuning' },
      { name: 'AI API Integration', desc: 'Connecting multimodal speech, vision, and text synthesis engines' },
      { name: 'Neural Data Processing', desc: 'Structuring contextual memory, embeddings, and prompt guardrails' },
      { name: 'Data Analytics Foundations', desc: 'Feature engineering, dataset preparation & evaluation metrics' }
    ]
  },
  {
    id: 'web-architecture',
    number: 'SET 02',
    title: "THE ARCHITECT'S INCEPTION",
    cinemaReference: 'Inception • Spider-Man • MCU',
    genre: 'Urban Architectural / Kinetic Reality',
    accent: '#d4af37',
    accentGlow: 'rgba(212, 175, 55, 0.45)',
    bgGradient: 'from-[#1c1608] via-[#0d0a04] to-[#050507]',
    sceneImage: '/assets/movie-scenes/world-inception.jpg',
    moviePosters: [
      { title: 'Spider-Man', poster: '/posters_cache/spider-man.jpg' },
      { title: 'Complete MCU', poster: '/posters_cache/complete-mcu.jpg' },
      { title: 'Winter Soldier', poster: '/posters_cache/captain-america-winter-soldier.jpg' }
    ],
    tagline: 'Bending viewport dimensions and structuring modular component universes.',
    narrative: `Like Inception's dream architects folding skyscrapers in half, frontend engineering is the art of constructing seamless, responsive realities. Every DOM node, state tree, and layout transition is engineered to react with zero friction.`,
    skills: [
      { name: 'React Component Physics', desc: 'Atomic component trees, custom hooks & reactive state engines' },
      { name: 'Modern JavaScript (ES6+)', desc: 'Asynchronous event loops, functional closures & clean pipelines' },
      { name: 'HTML5 & CSS3 Architecture', desc: 'Semantic layouts, spatial flexbox and dense CSS grids' },
      { name: 'Tailwind CSS System', desc: 'Micro-utility design velocity without bloated stylesheets' },
      { name: 'Viewport Fluidity', desc: 'Flawless adaptation from handheld mobile glass to ultrawide cinema monitors' }
    ]
  },
  {
    id: 'systems-core',
    number: 'SET 03',
    title: 'THE IRON PRECISION',
    cinemaReference: 'The Dark Knight • Top Gun: Maverick • Mad Max',
    genre: 'High-Stakes Action / Cold Tactical Precision',
    accent: '#c81d2c',
    accentGlow: 'rgba(200, 29, 44, 0.45)',
    bgGradient: 'from-[#20080a] via-[#100406] to-[#050507]',
    sceneImage: '/assets/movie-scenes/world-darkknight.jpg',
    moviePosters: [
      { title: 'Top Gun: Maverick', poster: '/posters_cache/top-gun-maverick.jpg' },
      { title: 'Mad Max: Fury Road', poster: '/posters_cache/mad-max-fury-road.jpg' },
      { title: 'Southpaw', poster: '/posters_cache/southpaw.jpg' }
    ],
    tagline: 'Raw compute velocity, memory pointers, and algorithmic discipline.',
    narrative: `When mission success demands microsecond execution and surgical memory management, high-level abstractions yield to compiled languages and pure algorithmic combat. Built on relentless problem-solving and rigorous engineering.`,
    skills: [
      { name: 'C & C++ Systems Rigor', desc: 'Direct memory pointers, memory safety & compiled performance' },
      { name: 'Data Structures & Algorithms', desc: 'Optimized time complexity, trees, graphs & dynamic programming' },
      { name: 'Java Object Models', desc: 'Enterprise design patterns, strong typing & robust architectures' },
      { name: 'Python Automation', desc: 'High-speed algorithmic prototyping, automation scripts & math tools' },
      { name: 'Linux Shell & Environment', desc: 'Bash scripting, POSIX systems navigation & CLI workflow mastery' }
    ]
  },
  {
    id: 'art-direction',
    number: 'SET 04',
    title: "THE AUTEUR'S PALETTE",
    cinemaReference: 'The Grand Budapest Hotel • Blade Runner • Blue Jay',
    genre: 'Artistic Auteur / Color Theory & Symmetry',
    accent: '#e0705a',
    accentGlow: 'rgba(224, 112, 90, 0.45)',
    bgGradient: 'from-[#24100c] via-[#120705] to-[#050507]',
    sceneImage: '/assets/movie-scenes/origin-topgun.jpg',
    moviePosters: [
      { title: 'Blue Jay', poster: '/posters_cache/blue-jay.jpg' },
      { title: 'Pretty Woman', poster: '/posters_cache/pretty-woman.jpg' },
      { title: 'Notting Hill', poster: '/posters_cache/notting-hill.jpg' }
    ],
    tagline: 'Cinema without color grading is footage; software without UX is code.',
    narrative: `Software is felt before it is understood. Guided by Wes Anderson's geometric symmetry and Denis Villeneuve's atmospheric lighting, I infuse human psychology, high-contrast typography, and intentional palette harmony into every interface.`,
    skills: [
      { name: 'UI/UX Human Psychology', desc: 'Intuitive user mental models, micro-interactions & visual flow' },
      { name: 'Figma Prototyping Systems', desc: 'Component libraries, design tokens & interactive wireframes' },
      { name: 'Cinema Color Grading & Theory', desc: 'Harmonious palettes, contrast ratios & mood illumination' },
      { name: 'Typography Direction', desc: 'Prestige serif pairing with ultra-legible modern grotesk typography' },
      { name: 'Canva Storyboarding', desc: 'High-impact creative pitch decks, visual concepting & graphics' }
    ]
  }
]

export default function ActArsenal() {
  const [activeFilter, setActiveFilter] = useState('all') // 'all' | 'ai-machine' | 'web-architecture' | 'systems-core' | 'art-direction'
  const stageRef = useRef(null)

  const selectedWorld = MOVIE_WORLDS.find(w => w.id === activeFilter)

  const handleMouseMove = (e) => {
    if (!stageRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    stageRef.current.style.setProperty('--mouse-x', `${x}px`)
    stageRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  const handleImageError = (e) => {
    e.currentTarget.onerror = null
    e.currentTarget.src = '/assets/combined-movie-posters.jpg'
  }

  return (
    <div id="act-arsenal" className="relative py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 overflow-hidden select-none bg-[#050507]">
      
      {/* Background Volumetric Ambient Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full blur-[220px] pointer-events-none transition-colors duration-1000 opacity-20"
        style={{ backgroundColor: selectedWorld ? selectedWorld.accent : '#e50914' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Act Eyebrow & Theatrical Headline */}
        <div className="scroll-reveal text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-red-600/50 text-red-400 text-xs font-mono tracking-[0.25em] uppercase mb-4 shadow-xl">
            <Flame className="w-3.5 h-3.5 text-red-500" />
            <span>Act II • The Cinematic Verse of Skills</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-white uppercase tracking-tight leading-tight">
            EVERY SKILL HAS A <br />
            <span 
              className="transition-colors duration-700 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-300 to-amber-500"
            >
              MOVIE WORLD
            </span>
          </h2>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-zinc-300 font-sans leading-relaxed">
            I visualize technical engineering through the lens of cinema genres. Explore all four distinct movie sets below — complete with real backdrops, 3D supporting posters, and battle-tested capabilities.
          </p>
        </div>

        {/* 5-Button View Selector: All 4 Worlds + Individual Set Focus */}
        <div className="scroll-reveal delay-100 flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase font-bold border-2 transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-red-600 text-white border-red-500 shadow-[0_0_20px_rgba(229,9,20,0.5)] scale-105'
                : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white hover:bg-zinc-800/80'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>All 4 Worlds ({MOVIE_WORLDS.length})</span>
          </button>

          {MOVIE_WORLDS.map((world) => {
            const isActive = activeFilter === world.id
            return (
              <button
                key={world.id}
                onClick={() => setActiveFilter(world.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase font-bold border-2 transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-zinc-900 text-white shadow-xl scale-105'
                    : 'bg-zinc-950/70 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white hover:bg-zinc-900/60'
                }`}
                style={{
                  borderColor: isActive ? world.accent : undefined,
                  boxShadow: isActive ? `0 0 20px ${world.accentGlow}` : undefined,
                  color: isActive ? world.accent : undefined
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: world.accent }} />
                <span>{world.number} • {world.title}</span>
              </button>
            )
          })}
        </div>

        {/* MODE A: ALL 4 WORLDS 2x2 GRID SHOWCASE (ALL TEMPLATES VISIBLE & WORKING) */}
        {activeFilter === 'all' ? (
          <div className="scroll-reveal-zoom delay-150 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {MOVIE_WORLDS.map((world) => (
              <div
                key={world.id}
                className={`spotlight-card bg-gradient-to-br ${world.bgGradient} border-2 rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col justify-between group hover:scale-[1.01]`}
                style={{ borderColor: `${world.accent}70` }}
              >
                {/* Real Supporting Movie Scene Backdrop */}
                {world.sceneImage && (
                  <div className="absolute inset-0 pointer-events-none opacity-25 group-hover:opacity-40 transition-opacity duration-500">
                    <img
                      src={world.sceneImage}
                      alt={world.title}
                      onError={handleImageError}
                      className="w-full h-full object-cover object-center filter contrast-125 brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/70" />
                  </div>
                )}

                <div className="relative z-10">
                  {/* Card Header with Genre & Set Number */}
                  <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-4 mb-5">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase mb-1 font-bold" style={{ color: world.accent }}>
                        <Sparkles className="w-3 h-3" />
                        <span>{world.number} • {world.cinemaReference}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-serif font-black text-white uppercase tracking-wide">
                        {world.title}
                      </h3>
                    </div>

                    <span 
                      className="shrink-0 px-3 py-1 rounded-full bg-black/80 border text-[10px] font-mono uppercase font-bold tracking-wider"
                      style={{ borderColor: `${world.accent}90`, color: world.accent }}
                    >
                      {world.genre.split('/')[0]}
                    </span>
                  </div>

                  {/* Narrative Logline */}
                  <blockquote 
                    className="border-l-2 pl-3 text-xs sm:text-sm font-serif italic text-zinc-200 mb-5 leading-relaxed"
                    style={{ borderColor: world.accent }}
                  >
                    "{world.tagline}"
                  </blockquote>

                  {/* 3D Tilted Supporting Movie Posters Trio */}
                  <div className="flex items-center justify-center gap-2 sm:gap-3 py-2 mb-6 perspective-[800px]">
                    {world.moviePosters.map((mp, i) => (
                      <div
                        key={i}
                        style={{
                          transform: `rotateY(${(i - 1) * 10}deg) translateZ(${i === 1 ? 20 : 0}px)`,
                          transformStyle: 'preserve-3d'
                        }}
                        className={`relative w-20 sm:w-24 aspect-[2/3] rounded-xl overflow-hidden shadow-xl border-2 transition-transform duration-300 group-hover:scale-105 ${
                          i === 1 ? 'border-amber-400 shadow-amber-400/30' : 'border-red-600/60'
                        }`}
                      >
                        <img
                          src={mp.poster}
                          alt={mp.title}
                          onError={handleImageError}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-1.5 flex flex-col justify-end text-[8px] font-mono text-white font-bold leading-none">
                          {mp.title}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Skills Grid */}
                  <div className="space-y-2.5 mb-6">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-1.5">
                      <Layers className="w-3 h-3 text-amber-400" />
                      <span>Arsenal Capabilities ({world.skills.length})</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {world.skills.map((skill, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-black/75 border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-mono font-bold text-white">
                              {skill.name}
                            </span>
                            <span className="w-2 h-2 rounded-full shrink-0 ml-1" style={{ backgroundColor: world.accent }} />
                          </div>
                          <p className="text-[10px] text-zinc-400 leading-tight">
                            {skill.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Card Footer with Quick Spotlight Button */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-red-500" />
                    <span>Deadpool Arsenal Certified</span>
                  </span>

                  <button
                    onClick={() => setActiveFilter(world.id)}
                    className="flex items-center gap-1 text-xs font-bold transition-transform hover:translate-x-1 cursor-pointer"
                    style={{ color: world.accent }}
                  >
                    <span>Inspect Set</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : null}

        {/* MODE B: EXPANDED SINGLE THEATRICAL STAGE SPOTLIGHT VIEW */}
        {selectedWorld ? (
          <div 
            ref={stageRef}
            onMouseMove={handleMouseMove}
            className={`scroll-reveal-zoom spotlight-card bg-gradient-to-br ${selectedWorld.bgGradient} border-2 rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-700 relative overflow-hidden group`}
            style={{ borderColor: `${selectedWorld.accent}80` }}
          >
            {/* Dynamic Cursor Spotlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
              style={{
                background: `radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${selectedWorld.accent}25, transparent 75%)`
              }}
            />

            {/* Supporting Scene Backdrop */}
            {selectedWorld.sceneImage && (
              <div className="absolute inset-0 pointer-events-none opacity-35 group-hover:opacity-50 transition-opacity duration-500">
                <img
                  src={selectedWorld.sceneImage}
                  alt={selectedWorld.title}
                  onError={handleImageError}
                  className="w-full h-full object-cover object-center filter contrast-125 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/70" />
              </div>
            )}

            <div className="relative z-10">
              {/* Back to All Sets Link & Top Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
                <div>
                  <button
                    onClick={() => setActiveFilter('all')}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white mb-3 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Return to All 4 Movie Worlds</span>
                  </button>

                  <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase mb-1 font-bold" style={{ color: selectedWorld.accent }}>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Cinematic Reference: {selectedWorld.cinemaReference}</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-serif font-black text-white uppercase tracking-wide">
                    {selectedWorld.number} • {selectedWorld.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/80 border-2 text-xs font-mono uppercase font-bold tracking-wider" style={{ borderColor: selectedWorld.accent, color: selectedWorld.accent }}>
                    {selectedWorld.genre}
                  </span>
                </div>
              </div>

              {/* Split: Narrative & Real Supporting Movie Posters */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-center">
                
                {/* Narrative Story Box */}
                <div className="lg:col-span-8">
                  <blockquote className="border-l-4 pl-4 text-base sm:text-lg font-serif italic text-zinc-100 mb-4 py-1" style={{ borderColor: selectedWorld.accent }}>
                    "{selectedWorld.tagline}"
                  </blockquote>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                    {selectedWorld.narrative}
                  </p>
                </div>

                {/* Supporting Movie Posters Tilted in 3D */}
                <div className="lg:col-span-4 flex items-center justify-center gap-2 sm:gap-3 perspective-[800px]">
                  {selectedWorld.moviePosters.map((mp, i) => (
                    <div
                      key={i}
                      style={{
                        transform: `rotateY(${(i - 1) * 12}deg) translateZ(${i === 1 ? 25 : 0}px)`,
                        transformStyle: 'preserve-3d'
                      }}
                      className={`relative w-24 sm:w-28 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border-2 transition-transform duration-300 hover:scale-110 hover:z-30 ${
                        i === 1 ? 'border-amber-400 shadow-amber-400/30' : 'border-red-600/60'
                      }`}
                    >
                      <img
                        src={mp.poster}
                        alt={mp.title}
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-1.5 flex flex-col justify-end text-[9px] font-mono text-white font-bold leading-none">
                        {mp.title}
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Deployed Skills Array */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {selectedWorld.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-black/80 border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between group hover:translate-x-1"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-mono font-bold text-white group-hover:text-amber-200 transition-colors">
                        {skill.name}
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full shadow-lg" style={{ backgroundColor: selectedWorld.accent, boxShadow: `0 0 10px ${selectedWorld.accent}` }} />
                    </div>
                    <p className="text-xs text-zinc-400 leading-normal font-sans">
                      {skill.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Theater Mode Footer with Next / Previous Switcher */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
                <button
                  onClick={() => {
                    const currentIndex = MOVIE_WORLDS.findIndex(w => w.id === selectedWorld.id)
                    const prevIndex = (currentIndex - 1 + MOVIE_WORLDS.length) % MOVIE_WORLDS.length
                    setActiveFilter(MOVIE_WORLDS[prevIndex].id)
                  }}
                  className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous Movie Set</span>
                </button>

                <button
                  onClick={() => setActiveFilter('all')}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-white text-zinc-200 hover:text-white transition-all cursor-pointer"
                >
                  View All 4 Movie Sets
                </button>

                <button
                  onClick={() => {
                    const currentIndex = MOVIE_WORLDS.findIndex(w => w.id === selectedWorld.id)
                    const nextIndex = (currentIndex + 1) % MOVIE_WORLDS.length
                    setActiveFilter(MOVIE_WORLDS[nextIndex].id)
                  }}
                  className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                >
                  <span>Next Movie Set</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        ) : null}

        {/* Section Bottom Cinema Reel Notice */}
        <div className="mt-14 text-center text-xs font-mono text-zinc-400 uppercase tracking-widest flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>4 Movie Sets • Full Spectrum Engineering & Cinema Artistry</span>
        </div>

      </div>
    </div>
  )
}
