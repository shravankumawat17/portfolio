import React, { useState } from 'react'
import { Cpu, Layers, Zap, Palette, Film, Sparkles, ChevronRight, Terminal, Compass } from 'lucide-react'

const MOVIE_WORLDS = [
  {
    id: 'ai-machine',
    title: 'THE MACHINE MIND',
    cinemaReference: 'The Matrix • Interstellar • Iron Man (J.A.R.V.I.S.)',
    genre: 'Sci-Fi / Synthetic Intelligence',
    accent: '#00f2fe',
    accentGlow: 'rgba(0, 242, 254, 0.35)',
    bgGradient: 'from-[#05151e] via-[#070b10] to-[#050507]',
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
    cinemaReference: 'Inception • Spider-Man: Into The Spider-Verse',
    genre: 'Urban Architectural / Kinetic Reality',
    accent: '#3b82f6',
    accentGlow: 'rgba(59, 130, 246, 0.35)',
    bgGradient: 'from-[#081224] via-[#060a14] to-[#050507]',
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
    accent: '#d4af37',
    accentGlow: 'rgba(212, 175, 55, 0.35)',
    bgGradient: 'from-[#181408] via-[#0c0a06] to-[#050507]',
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
    cinemaReference: 'The Grand Budapest Hotel (Wes Anderson) • Blade Runner 2049',
    genre: 'Artistic Auteur / Color Theory & Symmetry',
    accent: '#e0705a',
    accentGlow: 'rgba(224, 112, 90, 0.35)',
    bgGradient: 'from-[#1a0e0c] via-[#0d0706] to-[#050507]',
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
  const activeWorld = MOVIE_WORLDS.find(w => w.id === activeWorldId) || MOVIE_WORLDS[0]

  return (
    <div className="relative py-28 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 overflow-hidden select-none bg-[#050507]">
      
      {/* Background Volumetric Glow tracking active movie color */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[200px] pointer-events-none transition-colors duration-1000 opacity-20"
        style={{ backgroundColor: activeWorld.accent }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Act Eyebrow & Cinematic Narrative Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700/60 text-zinc-300 text-xs font-mono tracking-[0.25em] uppercase mb-4 shadow-xl">
            <Film className="w-3.5 h-3.5 text-amber-400" />
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

          <p className="mt-4 text-xs sm:text-sm md:text-base text-zinc-400 font-sans leading-relaxed">
            I visualize technical engineering through the lens of cinema genres. Step across four distinct movie sets—from cybernetic machine minds to architectural inception and ballistic code precision.
          </p>
        </div>

        {/* 4 Cinema Set Selectors (Interactive Tabs) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {MOVIE_WORLDS.map((world) => {
            const isActive = world.id === activeWorldId
            return (
              <button
                key={world.id}
                onClick={() => setActiveWorldId(world.id)}
                className={`p-4 rounded-2xl text-left border transition-all duration-500 flex flex-col justify-between ${
                  isActive
                    ? 'bg-zinc-900/95 shadow-2xl scale-102'
                    : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40 opacity-70 hover:opacity-100'
                }`}
                style={{
                  borderColor: isActive ? world.accent : undefined,
                  boxShadow: isActive ? `0 10px 30px ${world.accentGlow}` : undefined
                }}
              >
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 block mb-1">
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
                  <span className="truncate text-zinc-500">{world.cinemaReference.split('•')[0]}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'translate-x-1 text-white' : 'text-zinc-600'}`} />
                </div>
              </button>
            )
          })}
        </div>

        {/* ========================================================================= */}
        {/* ACTIVE MOVIE WORLD 3D STAGE & STORY PRESENTATION                          */}
        {/* ========================================================================= */}
        <div 
          className={`bg-gradient-to-br ${activeWorld.bgGradient} border rounded-3xl p-6 sm:p-12 shadow-2xl transition-all duration-700 relative overflow-hidden`}
          style={{ borderColor: `${activeWorld.accent}50` }}
        >
          {/* Top Film Reel Marker */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase mb-1" style={{ color: activeWorld.accent }}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cinematic Reference: {activeWorld.cinemaReference}</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-serif font-black text-white uppercase tracking-wide">
                {activeWorld.title}
              </h3>
            </div>

            <span className="px-3.5 py-1.5 rounded-full bg-black/70 border text-xs font-mono uppercase font-bold tracking-wider" style={{ borderColor: activeWorld.accent, color: activeWorld.accent }}>
              {activeWorld.genre}
            </span>
          </div>

          {/* Narrative Story Box */}
          <div className="mb-10 max-w-3xl">
            <blockquote className="border-l-4 pl-4 text-base sm:text-lg font-serif italic text-zinc-200 mb-4" style={{ borderColor: activeWorld.accent }}>
              "{activeWorld.tagline}"
            </blockquote>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
              {activeWorld.narrative}
            </p>
          </div>

          {/* Deployed Skills Array within this Movie World */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeWorld.skills.map((skill, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-black/50 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group hover:translate-x-1"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-mono font-bold text-white group-hover:text-amber-200 transition-colors">
                    {skill.name}
                  </span>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeWorld.accent }} />
                </div>
                <p className="text-xs text-zinc-400 leading-normal font-sans">
                  {skill.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Production Footer */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-500">
            <span>Visualized as Cinema • Written in Code</span>
            <span style={{ color: activeWorld.accent }}>Status: Active In Shravan's Arsenal</span>
          </div>

        </div>

      </div>
    </div>
  )
}
