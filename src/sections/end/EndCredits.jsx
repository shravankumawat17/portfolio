import React from 'react'
import { RotateCcw, Clapperboard, Award, Heart, Film } from 'lucide-react'
import creditsData from '../../content/credits.json'
import StarringPortrait from './StarringPortrait'
import ContactPlate from './ContactPlate'
import LaurelAward from '../../components/LaurelAward'

export default function EndCredits({ onLoopBack }) {
  const { directorNote, castAndCrew, awards } = creditsData

  return (
    <section id="credits" className="relative pt-24 pb-20 bg-[#050507] text-center overflow-hidden border-t border-zinc-900">
      
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-600/10 rounded-full blur-[180px] pointer-events-none" />

      {/* End Credits Header Banner */}
      <div className="scroll-reveal max-w-4xl mx-auto px-4 mb-12 select-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700/60 text-zinc-300 text-xs font-mono tracking-widest uppercase mb-4">
          <Clapperboard className="w-3.5 h-3.5 text-red-500" />
          <span>Scene 03 • The Closing Credits</span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black text-white tracking-widest uppercase">
          THE <span className="text-red-500">END</span>
        </h2>
        <p className="text-xs font-mono text-zinc-500 tracking-[0.3em] uppercase mt-2">
          Roll Credits • Cast, Direction & Honors
        </p>
      </div>

      {/* 1. Starring Hero Portrait Feature */}
      <div className="scroll-reveal-zoom delay-100">
        <StarringPortrait />
      </div>

      {/* 2. Director's Statement / Engineering Philosophy */}
      <div className="scroll-reveal delay-200 my-16 max-w-3xl mx-auto px-6 select-none">
        <span className="text-xs font-mono tracking-[0.35em] text-amber-400 uppercase font-bold block mb-2">
          {directorNote.title}
        </span>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-zinc-200 leading-relaxed">
          "{directorNote.lead}"
        </h3>

        <div className="my-8 flex flex-col gap-3 max-w-xl mx-auto text-xs sm:text-sm font-sans text-zinc-400 leading-normal">
          {directorNote.philosophy.map((line, idx) => (
            <div key={idx} className="flex items-center justify-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
              <span>{line}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Film Festival Style Laurels (Achievements & Honors) */}
      <div className="my-16 max-w-5xl mx-auto px-4">
        <span className="text-xs font-mono tracking-[0.35em] text-amber-400 uppercase font-bold block mb-4">
          Recognitions & Laurels
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
          {awards.map((award, idx) => (
            <LaurelAward
              key={idx}
              title={award.title}
              laurel={award.laurel}
              year={award.year}
              category={award.category}
            />
          ))}
        </div>
      </div>

      {/* 4. Also Featuring / Cast & Crew (Interests & Hobbies) */}
      <div className="my-16 max-w-3xl mx-auto px-6 border-y border-zinc-900/80 py-12">
        <div className="flex flex-col gap-8">
          {castAndCrew.map((group, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2">
                {group.role}
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg">
                {group.talents.map((t, i) => (
                  <span
                    key={i}
                    className="text-xs sm:text-sm font-mono text-zinc-300 px-3 py-1 rounded bg-zinc-950 border border-zinc-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Distributed By (Official Contact Deck) */}
      <ContactPlate />

      {/* 6. Loop Back Cue / Restart The Experience */}
      <div className="mt-16 text-center">
        <button
          onClick={onLoopBack}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-widest text-zinc-300 bg-zinc-900 border border-zinc-700 hover:border-amber-400 hover:text-amber-300 transition-all shadow-xl hover:scale-105 active:scale-95 group"
        >
          <RotateCcw className="w-4 h-4 text-amber-400 group-hover:-rotate-90 transition-transform" />
          <span>Watch Again From Opening Scene</span>
        </button>
        <p className="text-[11px] font-mono text-zinc-600 uppercase tracking-widest mt-4">
          © {new Date().getFullYear()} Shravan Kumawat • Written, Engineered & Directed
        </p>
      </div>

    </section>
  )
}
