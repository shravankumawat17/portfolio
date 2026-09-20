import React from 'react'
import moviesData from '../content/movies.json'

export default function FilmStripBand({ label = "CONTINUOUS 35MM CINEMA REEL • ALL INSPIRATIONS" }) {
  // Duplicate for seamless infinite marquee loop
  const displayMovies = [...moviesData, ...moviesData]

  const getPosterSrc = (movie) => {
    return `/posters_cache/${movie.id}.jpg`
  }

  return (
    <div className="relative py-8 bg-[#040406] border-y-2 border-red-600/30 overflow-hidden select-none">
      {/* Top 35mm Film Sprockets */}
      <div className="w-full flex justify-between gap-3 px-2 mb-3 opacity-40 overflow-hidden">
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} className="w-3 h-2 bg-zinc-400 rounded-sm shrink-0" />
        ))}
      </div>

      {/* Header Eyebrow */}
      <div className="max-w-7xl mx-auto px-4 mb-3 flex items-center justify-between text-[11px] font-mono tracking-[0.3em] uppercase text-zinc-400">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
          <span className="text-red-400 font-bold">{label}</span>
        </span>
        <span className="text-amber-400 hidden sm:inline">36 Feature Films & Epics</span>
      </div>

      {/* Scrolling Marquee Container */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left & Right Soft Vignette Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#040406] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#040406] to-transparent z-10 pointer-events-none" />

        {/* CSS Scrolling Strip */}
        <div className="flex gap-4 animate-film-scroll hover:[animation-play-state:paused] py-2">
          {displayMovies.map((movie, idx) => {
            const posterSrc = getPosterSrc(movie)
            return (
              <div
                key={`${movie.id}-${idx}`}
                className="relative w-36 sm:w-44 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border-2 border-red-600/50 shrink-0 group transition-all duration-300 hover:scale-105 hover:border-amber-400 hover:z-20 cursor-pointer bg-black"
              >
                {/* 100% Crisp Visible Poster Image */}
                <img
                  src={posterSrc}
                  alt={movie.title}
                  loading="lazy"
                  onError={(e) => {
                    if (movie.posterUrl && e.target.src !== movie.posterUrl) {
                      e.target.src = movie.posterUrl
                    } else if (movie.tmdbPoster && e.target.src !== movie.tmdbPoster) {
                      e.target.src = movie.tmdbPoster
                    }
                  }}
                  className="w-full h-full object-cover filter brightness-100 contrast-105 group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Bottom title gradient ONLY (so whole poster remains completely visible) */}
                <div className="absolute bottom-0 left-0 right-0 pt-6 pb-2 px-2.5 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 font-bold block truncate">
                    {movie.genre}
                  </span>
                  <h4 className="text-xs font-serif font-bold text-white leading-tight truncate drop-shadow">
                    {movie.title}
                  </h4>
                  <span className="text-[9px] font-mono text-zinc-400">
                    {movie.year}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom 35mm Film Sprockets */}
      <div className="w-full flex justify-between gap-3 px-2 mt-3 opacity-40 overflow-hidden">
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} className="w-3 h-2 bg-zinc-400 rounded-sm shrink-0" />
        ))}
      </div>
    </div>
  )
}
