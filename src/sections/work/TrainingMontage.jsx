import React from 'react'
import { Sparkles, Terminal, BookOpen, Layers, CheckCircle2 } from 'lucide-react'
import resumeData from '../../content/resume.json'

export default function TrainingMontage() {
  const { training } = resumeData

  return (
    <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#060608] overflow-hidden">
      
      {/* Subtle Purple Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        
        {/* Post-Credits Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-purple-400 font-bold">
            Post-Credits Scene • The Training Montage
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif font-black text-white uppercase tracking-tight mb-3">
          TECHNICAL DRILLS & <span className="text-purple-400">CERTIFICATIONS</span>
        </h2>

        <p className="text-sm text-zinc-400 font-sans max-w-xl mb-10 leading-relaxed">
          Behind every feature presentation lies hours of deliberate practice, rigorous coursework, and ongoing professional mastery.
        </p>

        {/* Training Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {training.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 hover:border-purple-500/40 hover:bg-zinc-900/60 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="text-purple-400 font-bold tracking-wider">
                    {item.badge}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.status === 'Completed' 
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50' 
                      : 'bg-purple-950/80 text-purple-300 border border-purple-800/50'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <h4 className="text-base font-serif font-bold text-white group-hover:text-purple-200 transition-colors">
                  {item.title}
                </h4>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>Issuer: {item.issuer}</span>
                <Sparkles className="w-3.5 h-3.5 text-purple-400/50 group-hover:text-purple-400 transition-colors" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
