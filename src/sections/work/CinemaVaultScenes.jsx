import React, { useState } from 'react'
import { Film, Clapperboard, Sparkles, Flame, Eye, Compass } from 'lucide-react'

const ICONIC_CINEMA_VAULT = [
  {
    title: 'THE DARK KNIGHT',
    director: 'Christopher Nolan',
    year: '2008',
    sceneImage: '/assets/movie-scenes/world-darkknight.jpg',
    posterImage: '/posters_cache/deadpool.jpg',
    concept: 'Algorithmic Combat & Tactical Memory',
    philosophy: 'When milliseconds count, high-level abstractions give way to raw C++, optimized algorithms, and relentless execution.',
    tag: 'Systems & DSA'
  },
  {
    title: 'INCEPTION',
    director: 'Christopher Nolan',
    year: '2010',
    sceneImage: '/assets/movie-scenes/world-inception.jpg',
    posterImage: '/posters_cache/spider-man.jpg',
    concept: 'Architecting Nested Viewports & Realities',
    philosophy: 'Folding entire cityscapes in dreams is identical to architecting fluid component trees, reactive state, and dynamic 3D viewports.',
    tag: 'Frontend Architecture'
  },
  {
    title: 'TOP GUN: MAVERICK',
    director: 'Joseph Kosinski',
    year: '2022',
    sceneImage: '/assets/movie-scenes/origin-topgun.jpg',
    posterImage: '/posters_cache/top-gun-maverick.jpg',
    concept: 'Mach 10 Momentum & Academic Rigor',
    philosophy: 'Pushing beyond the envelope: DJ Sanghvi College of Engineering, CGPA 9.00, and JEE Main 97.93%ile fueled by razor-sharp focus.',
    tag: 'Rigorous Foundations'
  },
  {
    title: 'THE MACHINE CONSTRUCT',
    director: 'The Wachowskis',
    year: '1999',
    sceneImage: '/assets/movie-scenes/project-therapist.jpg',
    posterImage: '/posters_cache/apex.jpg',
    concept: 'Synthetic Intelligence & Vector Space',
    philosophy: 'Deconstructing neural representations, multi-modal APIs, and prompt reasoning to craft autonomous intelligent software.',
    tag: 'Artificial Intelligence'
  }
]

export default function CinemaVaultScenes() {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = ICONIC_CINEMA_VAULT[activeIdx]

  return (
    <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050507] border-y border-zinc-900/80 select-none overflow-hidden">
      {/* Background Volumetric Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-red-600/10 rounded-full blur-[190px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950/90 border border-red-600/60 text-red-400 text-xs font-mono tracking-[0.3em] uppercase mb-4 shadow-xl">
            <Film className="w-3.5 h-3.5 text-red-500" />
            <span>The Cinematic Vault • Visual Direction</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-white uppercase tracking-tight leading-tight">
            STORIES BEHIND THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-300 to-amber-500">ENGINEERING</span>
          </h2>

          <p className="mt-4 text-xs sm:text-sm md:text-base text-zinc-300 font-sans max-w-2xl mx-auto leading-relaxed">
            Cinema is not just entertainment—it is an architectural blueprint. Explore the visual stills, cinematic framing, and technical parallels that inspire every software creation.
          </p>
        </div>

        {/* Big Theatrical Feature Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Main Cinematic Scene Canvas */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border-2 border-red-600/50 shadow-[0_20px_60px_rgba(200,29,44,0.25)] group aspect-[16/9]">
            <img
              src={current.sceneImage}
              alt={current.title}
              className="w-full h-full object-cover filter contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700"
            />

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Floating Top Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 border border-amber-400/50 text-[11px] font-mono uppercase text-amber-300 tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{current.concept}</span>
            </div>

            {/* Bottom Scene Title & Narrative */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-left">
              <span className="text-xs font-mono tracking-widest text-red-400 font-bold uppercase block mb-1">
                Directed by {current.director} • {current.year}
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif font-black text-white uppercase tracking-wide">
                {current.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-zinc-200 font-serif italic max-w-xl leading-relaxed">
                "{current.philosophy}"
              </p>
            </div>
          </div>

          {/* Side Selector Cards (Supporting Posters & Concept Badges) */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {ICONIC_CINEMA_VAULT.map((item, idx) => (
              <button
                key={item.title}
                onClick={() => setActiveIdx(idx)}
                className={`flex items-center gap-4 p-3.5 rounded-2xl border text-left transition-all duration-300 ${
                  activeIdx === idx
                    ? 'bg-zinc-900 border-red-500 shadow-xl shadow-red-600/20 translate-x-2'
                    : 'bg-zinc-950/70 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40'
                }`}
              >
                {/* Poster Thumbnail */}
                <div className="relative w-14 aspect-[2/3] rounded-lg overflow-hidden border border-zinc-700 shrink-0">
                  <img
                    src={item.posterImage}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase mb-0.5">
                    <span className="text-red-400 font-bold">{item.tag}</span>
                    <span className="text-zinc-500">{item.year}</span>
                  </div>
                  <h4 className="text-sm font-serif font-bold text-white truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] font-sans text-zinc-400 truncate mt-0.5">
                    {item.concept}
                  </p>
                </div>
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
  )
}
