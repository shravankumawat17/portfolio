import React from 'react'
import ActOrigin from './ActOrigin'
import ActArsenal from './ActArsenal'
import ActMissions from './ActMissions'
import TrainingMontage from './TrainingMontage'

export default function WorkReel() {
  return (
    <section id="work" className="relative bg-[#060608] select-none">
      {/* Film Reel Sprocket Edge Accents (Desktop only) */}
      <div className="hidden xl:block absolute left-3 top-0 bottom-0 w-3 pointer-events-none z-20">
        <div className="h-full flex flex-col justify-around py-8 opacity-20">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="w-2.5 h-3.5 bg-zinc-600 rounded-sm" />
          ))}
        </div>
      </div>
      <div className="hidden xl:block absolute right-3 top-0 bottom-0 w-3 pointer-events-none z-20">
        <div className="h-full flex flex-col justify-around py-8 opacity-20">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="w-2.5 h-3.5 bg-zinc-600 rounded-sm" />
          ))}
        </div>
      </div>

      {/* Act I: Origin Story (Education & Stats) */}
      <ActOrigin />

      {/* Act II: The Arsenal (Skills) */}
      <ActArsenal />

      {/* Act III: The Missions (Featured Projects Lobby Cards) */}
      <ActMissions />

      {/* Post-Credits Scene: Training Montage */}
      <TrainingMontage />
    </section>
  )
}
