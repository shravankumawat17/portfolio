import React, { useState, useEffect, useRef } from 'react'
import { Sparkles, Star, Film } from 'lucide-react'
import { fetchMovieMetadata } from '../../services/tmdb'

export default function PosterCard({ movie, onSelect }) {
  const [metadata, setMetadata] = useState(null)
  const [imgError, setImgError] = useState(false)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  const isHero = movie.hero === true

  useEffect(() => {
    let isMounted = true
    fetchMovieMetadata(movie).then((data) => {
      if (isMounted && data) {
        setMetadata(data)
      }
    })
    return () => { isMounted = false }
  }, [movie])

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    // Max tilt 12 degrees
    const rotateX = ((y - centerY) / centerY) * -12
    const rotateY = ((x - centerX) / centerX) * 12
    setRotate({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 })
  }

  const resolvedUrl = metadata?.posterUrl || movie.posterUrl || movie.tmdbPoster
  const posterSrc = !imgError && resolvedUrl ? resolvedUrl : null

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect && onSelect(movie, metadata)}
      style={{
        transform: `perspective(800px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: rotate.x === 0 ? 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none'
      }}
      className={`relative group rounded-xl overflow-hidden cursor-pointer select-none bg-zinc-900 border transition-all duration-300 ${
        isHero 
          ? 'border-red-600/60 shadow-[0_0_35px_rgba(200,29,44,0.35)] hover:border-red-500 hover:shadow-[0_0_50px_rgba(200,29,44,0.6)]' 
          : 'border-zinc-800 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-400/10'
      }`}
    >
      {/* Aspect Ratio Container */}
      <div className={`w-full relative ${isHero ? 'aspect-[2/3] min-h-[380px] sm:min-h-[460px]' : 'aspect-[2/3]'}`}>
        
        {/* Poster Image */}
        {posterSrc ? (
          <img
            src={posterSrc}
            alt={movie.title}
            onError={() => setImgError(true)}
            loading="lazy"
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* Stylized Fallback Cinema Card */
          <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-zinc-800 via-zinc-900 to-black text-left">
            <div className="flex items-center justify-between text-zinc-500">
              <Film className="w-5 h-5 text-amber-400/70" />
              <span className="text-xs font-mono">{movie.year}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">
                {movie.genre}
              </span>
              <h3 className="text-lg font-serif font-bold text-white mt-1 leading-tight">
                {movie.title}
              </h3>
              <p className="text-xs text-zinc-400 italic line-clamp-3 mt-2">
                "{movie.quote || movie.tagline}"
              </p>
            </div>
            <div className="text-[10px] font-mono tracking-wider text-zinc-600 uppercase">
              Cinema Archive • Reel #{movie.id.slice(0, 4)}
            </div>
          </div>
        )}

        {/* Hero Marker Banner */}
        {isHero && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-mono font-bold tracking-widest uppercase shadow-lg shadow-red-600/40">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Hero Selection</span>
          </div>
        )}

        {/* Rating badge */}
        {metadata?.rating && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-amber-400 text-xs font-mono font-bold border border-white/10">
            <Star className="w-3 h-3 fill-amber-400" />
            <span>{metadata.rating}</span>
          </div>
        )}

        {/* Cinematic Gradient Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

        {/* Content reveal on hover & base info */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex flex-col justify-end text-left">
          <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">
            {movie.genre} • {movie.year}
          </span>
          <h3 className="text-base sm:text-lg font-serif font-bold text-white leading-snug group-hover:text-amber-200 transition-colors">
            {movie.title}
          </h3>

          <p className="text-xs text-zinc-300/90 italic mt-1.5 line-clamp-2 transform translate-y-1 group-hover:translate-y-0 transition-transform">
            "{movie.quote || movie.tagline}"
          </p>

          {/* Interactive cue */}
          <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-amber-400/90">View Logline →</span>
            <span className="text-zinc-500 uppercase">{movie.hero ? 'Shravan’s Top Pick' : 'Inspiration'}</span>
          </div>
        </div>

      </div>
    </div>
  )
}
