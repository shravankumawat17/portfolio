import React from 'react'
import { Sparkles, Terminal, BookOpen, Layers, CheckCircle2, Flame, Award } from 'lucide-react'
import resumeData from '../../content/resume.json'

export default function TrainingMontage() {
  const { training } = resumeData

  return (
    <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#060608] border-t border-zinc-900/80 overflow-hidden select-none">
      
      {/* Deadpool Crimson Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Post-Credits Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-mono tracking-[0.3em] uppercase text-red-500 font-bold">
            Post-Credits Scene • The Training Montage
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-black text-white uppercase tracking-tight mb-3">
          TECHNICAL DRILLS & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">CERTIFICATIONS</span>
        </h2>

        <p className="text-xs sm:text-sm text-zinc-300 font-sans max-w-xl mb-12 leading-relaxed">
          Behind every blockbuster premiere lies deliberate engineering practice, continuous coursework, and verified skill mastery.
        </p>

        {/* Training Cards Grid with 3D Spotlight Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {training.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-zinc-950/90 border-2 border-red-600/40 hover:border-red-500 hover:bg-zinc-900/70 transition-all duration-300 group flex flex-col justify-between shadow-xl hover:scale-102"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-4">
                  <span className="text-amber-400 font-bold tracking-wider flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    {item.badge}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    item.status === 'Completed' 
                      ? 'bg-red-950/80 text-red-300 border border-red-800/60' 
                      : 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <h4 className="text-lg font-serif font-bold text-white group-hover:text-amber-200 transition-colors">
                  {item.title}
                </h4>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Issuer: <strong className="text-zinc-200">{item.issuer}</strong></span>
                <Sparkles className="w-3.5 h-3.5 text-red-500 group-hover:scale-125 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
