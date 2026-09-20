import React, { useState } from 'react'
import { Code2, Globe, Cpu, Wrench, Palette, Zap, Sparkles, Shield, ChevronRight } from 'lucide-react'
import resumeData from '../../content/resume.json'

const iconMap = {
  Code2: Code2,
  Globe: Globe,
  Cpu: Cpu,
  Wrench: Wrench,
  Palette: Palette
}

export default function ActArsenal() {
  const { categories } = resumeData.skills
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id)

  const activeCategory = categories.find(c => c.id === activeCategoryId) || categories[0]
  const ActiveIcon = iconMap[activeCategory.icon] || Code2

  return (
    <div className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-900 bg-[#07070a] overflow-hidden select-none">
      
      {/* Dynamic Ambient Color Spotlight */}
      <div 
        className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none transition-colors duration-700 opacity-20"
        style={{ backgroundColor: activeCategory.accent }}
      />

      <div className="max-w-6xl mx-auto">
        
        {/* Act Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-amber-400 font-bold">
            Act II • The Arsenal
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-white uppercase tracking-tight">
              WEAPONS OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500">CREATION</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 font-sans max-w-xl leading-relaxed">
              Explore the 5 specialized disciplines in my engineering arsenal. Interactive 3D skill matrix spanning low-level algorithms to modern AI pipelines.
            </p>
          </div>

          {/* Category Switcher Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const Icon = iconMap[c.icon] || Code2
              const isActive = c.id === activeCategoryId
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCategoryId(c.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-zinc-800 text-white font-bold border shadow-lg'
                      : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                  style={{
                    borderColor: isActive ? c.accent : undefined,
                    boxShadow: isActive ? `0 0 20px ${c.accent}30` : undefined
                  }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: c.accent }} />
                  <span className="hidden sm:inline">{c.title.split(' ')[0]}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 3D Interactive Power-Up Core Showcase */}
        <div className="bg-gradient-to-br from-zinc-950 via-[#0d0d14] to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden group">
          
          <div className="flex flex-col lg:flex-row items-center gap-10">
            
            {/* 3D Power Core Pedestal */}
            <div className="w-full lg:w-5/12 flex flex-col items-center justify-center p-8 bg-black/60 rounded-2xl border border-zinc-800/80 relative">
              {/* Rotating 3D Halo Ring */}
              <div 
                className="w-44 h-44 sm:w-52 sm:h-52 rounded-full border-2 border-dashed flex items-center justify-center animate-slow-spin transition-colors duration-500"
                style={{ borderColor: `${activeCategory.accent}50` }}
              >
                <div 
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border flex items-center justify-center shadow-inner"
                  style={{ borderColor: `${activeCategory.accent}80`, backgroundColor: `${activeCategory.accent}15` }}
                >
                  <ActiveIcon className="w-14 h-14 transition-all duration-300 transform group-hover:scale-110" style={{ color: activeCategory.accent }} />
                </div>
              </div>

              <div className="text-center mt-6">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-1">
                  Active Weapon Class
                </span>
                <h3 className="text-2xl font-serif font-bold text-white">
                  {activeCategory.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 max-w-xs mx-auto">
                  {activeCategory.description}
                </p>
              </div>
            </div>

            {/* Power Modules List */}
            <div className="w-full lg:w-7/12 space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Deployed Capabilities ({activeCategory.items.length})</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeCategory.items.map((skill, idx) => (
                  <div
                    key={skill.name}
                    className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between group/skill hover:scale-102"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-mono font-bold text-white group-hover/skill:text-amber-200 transition-colors">
                        {skill.name}
                      </span>
                      <span 
                        className="text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold"
                        style={{ backgroundColor: `${activeCategory.accent}20`, color: activeCategory.accent }}
                      >
                        {skill.level}
                      </span>
                    </div>

                    {/* Visual Energy Level Bar */}
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden mt-2">
                      <div 
                        className="h-full rounded-full transition-all duration-700"
                        style={{ 
                          width: skill.level === 'Expert' ? '95%' : skill.level === 'Advanced' ? '85%' : '75%',
                          backgroundColor: activeCategory.accent 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-900 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
                <span>Production Tested Across Academic & Startup Projects</span>
                <span className="text-amber-400/80">Status: Battle Ready</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
