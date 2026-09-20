import React, { useState, useRef, useMemo } from 'react'
import { Film, Sparkles, X, Star, Clapperboard, Layers, Eye, Download, ChevronDown, Compass, Maximize2 } from 'lucide-react'
import moviesData from '../../content/movies.json'

export default function PosterWall({ onEnterFeature }) {
  const [viewMode, setViewMode] = useState('3d-marvel') // '3d-marvel' | 'seamless-collage' | 'master-art'
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [activeGenre, setActiveGenre] = useState('All')
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hoveredMovieId, setHoveredMovieId] = useState(null)
  const wallContainerRef = useRef(null)

  const genres = ['All', 'Action', 'Sci-Fi', 'Romance', 'Drama', 'Comedy']

  // 3D perspective tilt on mouse movement across the combined poster wall
  const handleMouseMove = (e) => {
    if (viewMode !== '3d-marvel' || !wallContainerRef.current) return
    const rect = wallContainerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Dramatic 3D Marvel perspective tilt
    const rotateX = ((y - centerY) / centerY) * -16
    const rotateY = ((x - centerX) / centerX) * 16
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  const isMatched = (movie) => {
    if (activeGenre === 'All') return true
    return movie.genre.toLowerCase().includes(activeGenre.toLowerCase())
  }

  return (
    <section id="poster-wall" className="relative py-24 px-2 sm:px-4 md:px-8 bg-[#060608] overflow-hidden">
      
      {/* Background Volumetric Lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-red-600/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-96 right-10 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-5xl mx-auto text-center mb-8 select-none relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-amber-400/40 text-amber-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-xl shadow-amber-400/10">
          <Clapperboard className="w-3.5 h-3.5 text-amber-400" />
          <span>Archive 01 • The 36-Movie Universe</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif font-black text-white tracking-tight uppercase leading-none">
          THE COMBINED <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-300 to-amber-500">POSTER</span>
        </h2>

        <p className="mt-4 text-xs sm:text-sm md:text-base text-zinc-400 font-sans max-w-2xl mx-auto leading-relaxed">
          All 36 cinematic inspirations unified into one seamless, high-definition master collage. Experience it in Marvel-style 3D perspective or explore the seamless wall.
        </p>

        {/* View Mode Switcher */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mt-6">
          <button
            onClick={() => setViewMode('3d-marvel')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
              viewMode === '3d-marvel'
                ? 'bg-red-600 text-white font-bold shadow-lg shadow-red-600/40 border border-red-500'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>3D Marvel Wall</span>
          </button>

          <button
            onClick={() => setViewMode('seamless-collage')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
              viewMode === 'seamless-collage'
                ? 'bg-amber-400 text-black font-bold shadow-lg shadow-amber-400/30 border border-amber-300'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Seamless Combined Grid</span>
          </button>

          <button
            onClick={() => setViewMode('master-art')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
              viewMode === 'master-art'
                ? 'bg-red-600 text-white font-bold shadow-lg shadow-red-600/40 border border-red-500'
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Master Artwork (HD)</span>
          </button>
        </div>

        {/* Genre Spotlight Pills */}
        <div className="flex items-center justify-center flex-wrap gap-1.5 mt-4">
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all ${
                activeGenre === genre
                  ? 'bg-zinc-100 text-black font-bold'
                  : 'bg-zinc-950/80 text-zinc-500 hover:text-zinc-300 border border-zinc-800/80'
              }`}
            >
              {genre} {genre === 'All' ? `(${moviesData.length})` : ''}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW 1: 3D MARVEL PERSPECTIVE WALL */}
      {viewMode === '3d-marvel' && (
        <div 
          ref={wallContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative max-w-[1400px] mx-auto py-8 px-2 perspective-[1400px] cursor-grab active:cursor-grabbing select-none"
        >
          {/* Floating Marvel 3D Title Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 text-center">
            <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 shadow-2xl">
              <span className="text-[10px] font-mono tracking-[0.35em] text-red-400 uppercase block font-bold">
                Interactive 3D Stage
              </span>
              <span className="text-xl sm:text-3xl font-serif font-black text-white tracking-widest uppercase">
                SHRAVAN'S CINEMA UNIVERSE
              </span>
            </div>
          </div>

          {/* 3D Tilted Poster Plane */}
          <div
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: 'preserve-3d',
              transition: tilt.x === 0 ? 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none'
            }}
            className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-8 gap-1.5 sm:gap-2 p-4 bg-zinc-950/70 border border-zinc-800/80 rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.9)]"
          >
            {moviesData.map((movie) => {
              const matched = isMatched(movie)
              const isHero = movie.hero === true
              const isHovered = hoveredMovieId === movie.id

              return (
                <div
                  key={movie.id}
                  onMouseEnter={() => setHoveredMovieId(movie.id)}
                  onMouseLeave={() => setHoveredMovieId(null)}
                  onClick={() => setSelectedMovie(movie)}
                  style={{
                    transform: isHovered 
                      ? 'translateZ(70px) scale(1.18)' 
                      : 'translateZ(0px) scale(1)',
                    transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    transformStyle: 'preserve-3d'
                  }}
                  className={`relative aspect-[2/3] rounded-lg overflow-hidden cursor-pointer shadow-lg transition-all ${
                    isHero 
                      ? 'ring-2 ring-red-500 shadow-red-500/30' 
                      : ''
                  } ${
                    matched ? 'opacity-100' : 'opacity-25 grayscale'
                  } ${
                    isHovered ? 'z-40 shadow-2xl shadow-amber-400/40 ring-2 ring-amber-400' : 'z-10'
                  }`}
                >
                  <img
                    src={movie.posterUrl || movie.tmdbPoster}
                    alt={movie.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />

                  {/* Hover Overlay with movie details */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-2.5 flex flex-col justify-end text-left transition-opacity duration-200 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <span className="text-[9px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                      {movie.year} • {movie.genre.split('/')[0]}
                    </span>
                    <h4 className="text-xs font-serif font-bold text-white line-clamp-1 leading-tight">
                      {movie.title}
                    </h4>
                    {isHero && (
                      <span className="text-[9px] font-mono text-red-400 font-bold uppercase mt-1">
                        ⭐ HERO PICK
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <p className="text-center text-xs font-mono text-zinc-500 tracking-wider uppercase mt-4">
            Move mouse to tilt camera in 3D • Hover any poster to pop out in perspective
          </p>
        </div>
      )}

      {/* VIEW 2: SEAMLESS COMBINED COLLAGE (MATCHING USER'S IMAGE EXACTLY) */}
      {viewMode === 'seamless-collage' && (
        <div className="max-w-[1300px] mx-auto py-6 px-2">
          <div className="p-2 sm:p-4 bg-zinc-950 border border-amber-400/30 rounded-2xl shadow-2xl">
            <div className="text-center mb-3">
              <span className="text-xs font-mono tracking-widest text-amber-400 uppercase font-bold">
                Combined 36-Poster Collage Canvas
              </span>
            </div>

            {/* Tight 6-column x 6-row seamless grid with 0px gap */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 gap-0 overflow-hidden rounded-xl border-2 border-zinc-800 shadow-2xl bg-black">
              {moviesData.map((movie) => {
                const matched = isMatched(movie)
                const isHero = movie.hero === true
                const isHovered = hoveredMovieId === movie.id

                return (
                  <div
                    key={movie.id}
                    onMouseEnter={() => setHoveredMovieId(movie.id)}
                    onMouseLeave={() => setHoveredMovieId(null)}
                    onClick={() => setSelectedMovie(movie)}
                    className={`relative aspect-[2/3] cursor-pointer transition-all duration-300 group overflow-hidden ${
                      matched ? 'opacity-100' : 'opacity-30'
                    } ${
                      isHovered ? 'z-30 scale-110 shadow-2xl ring-2 ring-amber-400' : 'z-10'
                    }`}
                  >
                    <img
                      src={movie.posterUrl || movie.tmdbPoster}
                      alt={movie.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Subtle poster border line like printed film frames */}
                    <div className="absolute inset-0 border-[0.5px] border-black/40 pointer-events-none" />

                    {/* Hero Badge */}
                    {isHero && (
                      <div className="absolute top-1 left-1 bg-red-600 text-white text-[8px] font-mono px-1 py-0.5 rounded font-bold uppercase tracking-wider">
                        Hero
                      </div>
                    )}

                    {/* Reveal Card on Hover */}
                    <div className="absolute inset-0 bg-black/85 p-2 flex flex-col justify-end text-left opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="text-[9px] font-mono text-amber-400 uppercase font-bold">
                        {movie.year}
                      </span>
                      <h4 className="text-xs font-serif font-bold text-white line-clamp-2 leading-tight">
                        {movie.title}
                      </h4>
                      <p className="text-[10px] text-zinc-400 italic line-clamp-2 mt-1">
                        "{movie.quote || movie.tagline}"
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-mono text-zinc-500 px-2">
              <span>All 36 Curated Movies Tiled Seamlessly</span>
              <span className="text-amber-400 font-semibold">Click any poster for full playbill</span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: SINGLE MASTER COMPOSITE ARTWORK */}
      {viewMode === 'master-art' && (
        <div className="max-w-4xl mx-auto py-6 px-4 text-center">
          <div className="p-4 bg-zinc-950 border border-red-500/40 rounded-3xl shadow-2xl overflow-hidden relative group">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
              <img
                src="/assets/combined-movie-posters-wide.jpg"
                alt="Shravan Kumawat Combined Movie Posters Master Artwork"
                className="w-full h-auto max-h-[75vh] object-contain mx-auto transition-transform duration-500 group-hover:scale-102"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 px-2">
              <div className="text-left">
                <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold block">
                  Unified Master File
                </span>
                <h4 className="text-lg font-serif font-bold text-white">
                  Shravan's 36-Film Composite Artwork (2520 × 1560)
                </h4>
              </div>

              <a
                href="/assets/combined-movie-posters-wide.jpg"
                download="Shravan_Kumawat_Combined_Movie_Posters.jpg"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-xl shadow-red-600/30 transition-all hover:scale-105"
              >
                <Download className="w-4 h-4" />
                <span>Download Master Poster (HD)</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* CTA To Enter WORK Section */}
      <div className="mt-16 text-center select-none">
        <button
          onClick={onEnterFeature}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-bold font-mono text-sm uppercase tracking-widest shadow-2xl shadow-amber-400/20 hover:scale-105 active:scale-95 transition-all group"
        >
          <span>Begin The Feature Film</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </button>
        <p className="text-xs font-mono text-zinc-500 tracking-wider uppercase mt-3">
          Advancing to Act I: The Origin Story
        </p>
      </div>

      {/* Cinema Modal Dialog for Inspecting a Movie */}
      {selectedMovie && (
        <div 
          onClick={() => setSelectedMovie(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-zinc-950 border border-amber-400/40 rounded-2xl overflow-hidden shadow-2xl shadow-black p-6 sm:p-8"
          >
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6">
              <img 
                src={selectedMovie.posterUrl || selectedMovie.tmdbPoster} 
                alt={selectedMovie.title} 
                className="w-36 sm:w-48 aspect-[2/3] object-cover rounded-lg shadow-xl border border-zinc-800 shrink-0 mx-auto"
              />

              <div className="flex-1 text-left flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                      {selectedMovie.genre}
                    </span>
                    <span className="text-xs text-zinc-600">•</span>
                    <span className="text-xs font-mono text-zinc-400">{selectedMovie.year}</span>
                    {selectedMovie.rating && (
                      <span className="flex items-center gap-1 ml-auto text-amber-400 text-xs font-mono font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {selectedMovie.rating}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">
                    {selectedMovie.title}
                  </h3>

                  {selectedMovie.quote && (
                    <blockquote className="border-l-2 border-amber-400 pl-3 my-3 text-sm text-zinc-300 italic">
                      "{selectedMovie.quote}"
                    </blockquote>
                  )}

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-2">
                    {selectedMovie.overview || selectedMovie.tagline}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                    Curated by Shravan Kumawat
                  </span>
                  <button
                    onClick={() => setSelectedMovie(null)}
                    className="text-xs font-mono text-amber-400 hover:underline uppercase tracking-wider"
                  >
                    Close Playbill
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  )
}
