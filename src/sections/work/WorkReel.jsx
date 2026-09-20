import React from 'react'
import ActOrigin from './ActOrigin'
import ActArsenal from './ActArsenal'
import ActMissions from './ActMissions'
import TrainingMontage from './TrainingMontage'
import FilmStripBand from '../../components/FilmStripBand'
import CinemaVaultScenes from './CinemaVaultScenes'

export default function WorkReel() {
  return (
    <section id="work" className="relative bg-[#060608] select-none">
      {/* Film Reel Sprocket Edge Accents (Desktop only) */}
      <div className="hidden xl:block absolute left-3 top-0 bottom-0 w-3 pointer-events-none z-20">
        <div className="h-full flex flex-col justify-around py-8 opacity-20">
          {Array.from({ length: 80 }).map((_, i) => (
            <div key={i} className="w-2.5 h-3.5 bg-zinc-600 rounded-sm" />
          ))}
        </div>
      </div>
      <div className="hidden xl:block absolute right-3 top-0 bottom-0 w-3 pointer-events-none z-20">
        <div className="h-full flex flex-col justify-around py-8 opacity-20">
          {Array.from({ length: 80 }).map((_, i) => (
            <div key={i} className="w-2.5 h-3.5 bg-zinc-600 rounded-sm" />
          ))}
        </div>
      </div>

      {/* CONTINUOUS 35MM FILM REEL BANNER 1 */}
      <FilmStripBand label="CONTINUOUS 35MM CINEMA REEL • 36 FEATURE INSPIRATIONS" />

      {/* ACT I: ORIGIN STORY (Education, CGPA 9.00, JEE 97.93%ile, Top Gun Watermark) */}
      <ActOrigin />

      {/* ACT II: THE ARSENAL (4 Movie Worlds with real scene backdrops & posters) */}
      <ActArsenal />

      {/* SCENE 03: THE CINEMATIC VAULT (Iconic Film Scenes & Engineering Stories) */}
      <CinemaVaultScenes />

      {/* CONTINUOUS 35MM FILM REEL BANNER 2 */}
      <FilmStripBand label="CHAPTER BREAK • BLOCKBUSTER PRODUCTIONS IN ACTION" />

      {/* ACT III: THE MISSIONS (Featured Blockbuster Software Premieres) */}
      <div id="act-missions">
        <ActMissions />
      </div>

      {/* POST-CREDITS SCENE: THE TRAINING MONTAGE (Technical Drills & Certifications) */}
      <TrainingMontage />
    </section>
  )
}
