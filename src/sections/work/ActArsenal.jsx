import React, { useState, useRef } from 'react'
import { Cpu, Layers, Zap, Palette, Film, Sparkles, ChevronRight, Terminal, Compass, Flame } from 'lucide-react'

const MOVIE_WORLDS = [
  {
    id: 'ai-machine',
    title: 'THE MACHINE MIND',
    cinemaReference: 'The Matrix • Interstellar • Iron Man (J.A.R.V.I.S.)',
    genre: 'Sci-Fi / Synthetic Intelligence',
    accent: '#e50914',
    accentGlow: 'rgba(229, 9, 20, 0.4)',
    bgGradient: 'from-[#1c080a] via-[#0d0506] to-[#050507]',
    sceneImage: '/assets/movie-scenes/project-therapist.jpg',
    moviePosters: [
      { title: 'Source Code', poster: '/posters_cache/source-code.jpg' },
      { title: 'Interstellar', poster: '/posters_cache/apex.jpg' },
      { title: 'Deadpool AI', poster: '/posters_cache/deadpool.jpg' }
    ],
    tagline: 'Teaching machines to think, parse reality, and converse with human emotion.',
    narrative: 'In a digital universe driven by neural network weights and vector embeddings, the developer steps into the role of cybernetic architect. Combining machine learning foundations with high-velocity prompt engineering to forge intelligent prototypes.',
    skills: [
      { name: 'Machine Learning Foundations', desc: 'Predictive models, loss minimization & vector math' },
      { name: 'Prompt Engineering & Reasoning', desc: 'Guiding generative LLM reasoning chains & temperature tuning' },
      { name: 'AI API Integration', desc: 'Connecting multimodal speech, vision, and text synthesis engines' },
      { name: 'Neural Data Processing', desc: 'Structuring contextual memory, embeddings, and prompt guardrails' }
    ]
  },
  {
    id: 'web-architecture',
    title: "THE ARCHITECT'S INCEPTION",
    cinemaReference: 'Inception • Spider-Man • Complete MCU',
    genre: 'Urban Architectural / Kinetic Reality',
    accent: '#d4af37',
    accentGlow: 'rgba(212, 175, 55, 0.4)',
    bgGradient: 'from-[#1c1608] via-[#0d0a04] to-[#050507]',
    sceneImage: '/assets/movie-scenes/world-inception.jpg',
    moviePosters: [
      { title: 'Spider-Man', poster: '/posters_cache/spider-man.jpg' },
      { title: 'Complete MCU', poster: '/posters_cache/complete-mcu.jpg' },
      { title: 'Inception', poster: '/posters_cache/source-code.jpg' }
    ],
    tagline: 'Bending viewport dimensions and structuring modular component universes.',
    narrative: 'Like Inception’s dream architects folding skyscrapers in half, frontend engineering is the art of constructing seamless, responsive realities. Every DOM node, state tree, and layout transition is engineered to react with zero friction.',
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
    title: 'THE IRON PRECISION',
    cinemaReference: 'The Dark Knight • John Wick • Top Gun: Maverick',
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
    narrative: 'When mission success demands microsecond execution and surgical memory management, high-level abstractions yield to compiled languages and pure algorithmic combat. Built on relentless problem-solving and rigorous engineering.',
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
    title: "THE AUTEUR'S PALETTE",
    cinemaReference: 'The Grand Budapest Hotel • Blade Runner 2049 • Blue Jay',
    genre: 'Artistic Auteur / Color Theory & Symmetry',
    accent: '#e0705a',
    accentGlow: 'rgba(224, 112, 90, 0.4)',
    bgGradient: 'from-[#24100c] via-[#120705] to-[#050507]',
    sceneImage: '/assets/movie-scenes/origin-topgun.jpg',
    moviePosters: [
      { title: 'Blue Jay', poster: '/posters_cache/blue-jay.jpg' },
      { title: 'Pretty Woman', poster: '/posters_cache/pretty-woman.jpg' },
      { title: 'Notting Hill', poster: '/posters_cache/notting-hill.jpg' }
    ],
    tagline: 'Cinema without color grading is footage; software without UX is code.',
    narrative: 'Software is felt before it is understood. Guided by Wes Anderson’s geometric symmetry and Denis Villeneuve’s atmospheric lighting, I infuse human psychology, high-contrast typography, and intentional palette harmony into every interface.',
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
  const [activeWorldId, setActiveWorldId] = useState('ai-machine')
  const stageRef = useRef(null)
  const activeWorld = MOVIE_WORLDS.find(w => w.id === activeWorldId) || MOVIE_WORLDS[0]

  const handleMouseMove = (e) => {
    if (!stageRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    stageRef.current.style.setProperty('--mouse-x', `${x}px`)
    stageRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div className="relative py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 overflow-hidden select-none bg-[#050507]">
      
      {/* Background Volumetric Glow in Deadpool Red & Warm Gold */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[200px] pointer-events-none transition-colors duration-1000 opacity-25"
        style={{ backgroundColor: activeWorld.accent }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Act Eyebrow & Theatrical Headline */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-red-600/50 text-red-400 text-xs font-mono tracking-[0.25em] uppercase mb-4 shadow-xl">
            <Flame className="w-3.5 h-3.5 text-red-500" />
            <span>Act II • The Cinematic Verse of Skills</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-white uppercase tracking-tight leading-tight">
            EVERY SKILL HAS A <br />
            <span 
              className="transition-colors duration-700 underline decoration-wavy underline-offset-8"
              style={{ color: activeWorld.accent }}
            >
              MOVIE WORLD
            </span>
          </h2>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-zinc-300 font-sans leading-relaxed">
            I visualize technical engineering through the lens of cinema genres. Step across four distinct movie sets with real visual backdrops, supporting movie posters, and technical capabilities.
          </p>
        </div>

        {/* 4 Cinema Set Selectors in Deadpool Crimson & Gold */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {MOVIE_WORLDS.map((world) => {
            const isActive = world.id === activeWorldId
            return (
              <button
                key={world.id}
                onClick={() => setActiveWorldId(world.id)}
                className={`p-4 rounded-2xl text-left border-2 transition-all duration-500 flex flex-col justify-between ${
                  isActive
                    ? 'bg-zinc-900/95 shadow-2xl scale-102 border-red-600'
                    : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/40 opacity-70 hover:opacity-100'
                }`}
                style={{
                  borderColor: isActive ? world.accent : undefined,
                  boxShadow: isActive ? `0 10px 30px ${world.accentGlow}` : undefined
                }}
              >
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400 block mb-1">
                    {world.genre.split('/')[0]}
                  </span>
                  <h4 
                    className="text-sm sm:text-base font-serif font-black tracking-wide leading-tight"
                    style={{ color: isActive ? world.accent : '#ffffff' }}
                  >
                    {world.title}
                  </h4>
                </div>

                <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span className="truncate text-zinc-400">{world.cinemaReference.split('•')[0]}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'translate-x-1 text-white' : 'text-zinc-600'}`} />
                </div>
              </button>
            )
          })}
        </div>

        {/* ACTIVE MOVIE WORLD SHOWCASE WITH REAL POSTERS & SCENE IMAGES */}
        <div 
          ref={stageRef}
          onMouseMove={handleMouseMove}
          className={`spotlight-card bg-gradient-to-br ${activeWorld.bgGradient} border-2 rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-700 relative overflow-hidden group`}
          style={{ borderColor: `${activeWorld.accent}80` }}
        >
          {/* Dynamic Cursor Spotlight */}
          <div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
            style={{
              background: `radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${activeWorld.accent}25, transparent 75%)`
            }}
          />

          {/* Supporting Scene Backdrop */}
          {activeWorld.sceneImage && (
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <img
                src={activeWorld.sceneImage}
                alt={activeWorld.title}
                className="w-full h-full object-cover object-center filter contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/80" />
            </div>
          )}

          <div className="relative z-10">
            {/* Top Film Reel Marker */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase mb-1 font-bold" style={{ color: activeWorld.accent }}>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Cinematic Inspiration: {activeWorld.cinemaReference}</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-serif font-black text-white uppercase tracking-wide">
                  {activeWorld.title}
                </h3>
              </div>

              <span className="px-3.5 py-1.5 rounded-full bg-black/80 border-2 text-xs font-mono uppercase font-bold tracking-wider" style={{ borderColor: activeWorld.accent, color: activeWorld.accent }}>
                {activeWorld.genre}
              </span>
            </div>

            {/* Split: Narrative & Real Supporting Movie Posters */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-center">
              
              {/* Narrative Story Box */}
              <div className="lg:col-span-8">
                <blockquote className="border-l-4 pl-4 text-base sm:text-lg font-serif italic text-zinc-100 mb-4 py-1" style={{ borderColor: activeWorld.accent }}>
                  "{activeWorld.tagline}"
                </blockquote>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                  {activeWorld.narrative}
                </p>
              </div>

              {/* Supporting Movie Posters Tilted in 3D */}
              <div className="lg:col-span-4 flex items-center justify-center gap-2 sm:gap-3 perspective-[800px]">
                {activeWorld.moviePosters.map((mp, i) => (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeWorld.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-black/75 border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col justify-between group hover:translate-x-1"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-mono font-bold text-white group-hover:text-amber-200 transition-colors">
                      {skill.name}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full shadow-lg" style={{ backgroundColor: activeWorld.accent, boxShadow: `0 0 10px ${activeWorld.accent}` }} />
                  </div>
                  <p className="text-xs text-zinc-400 leading-normal font-sans">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Production Footer */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
              <span>Visualized as Cinema • Engineered in Code</span>
              <span className="font-bold" style={{ color: activeWorld.accent }}>Deadpool Arsenal Certified</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
