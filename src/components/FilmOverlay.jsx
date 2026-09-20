import React from 'react'

export default function FilmOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {/* Film grain noise layer */}
      <div className="absolute inset-0 film-grain opacity-20" />

      {/* Cinematic lens vignette */}
      <div className="absolute inset-0 cinema-vignette" />

      {/* Subtle top & bottom film letterbox borders */}
      <div className="absolute top-0 left-0 right-0 h-2 md:h-3 bg-black/90 border-b border-white/5" />
      <div className="absolute bottom-0 left-0 right-0 h-2 md:h-3 bg-black/90 border-t border-white/5" />
    </div>
  )
}
