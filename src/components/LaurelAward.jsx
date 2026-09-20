import React from 'react'

export default function LaurelAward({ title, laurel, year, category }) {
  return (
    <div className="flex flex-col items-center text-center p-4 group transition-transform duration-300 hover:scale-105">
      <div className="relative flex items-center justify-center py-2 px-6">
        {/* Left Laurel Branch */}
        <svg className="w-10 h-16 text-amber-400/70 group-hover:text-amber-400 transition-colors" viewBox="0 0 100 160" fill="currentColor">
          <path d="M50,150 C40,130 20,110 25,85 C27,75 35,70 42,78 C35,60 15,50 20,25 C22,15 30,10 38,18 C28,5 15,-10 25,-25" fill="none" stroke="currentColor" strokeWidth="4" />
          <path d="M25,30 C15,35 10,25 15,15 C20,5 30,15 25,30 Z" />
          <path d="M22,60 C12,65 7,55 12,45 C17,35 27,45 22,60 Z" />
          <path d="M26,90 C16,95 11,85 16,75 C21,65 31,75 26,90 Z" />
          <path d="M35,120 C25,125 20,115 25,105 C30,95 40,105 35,120 Z" />
          <path d="M48,145 C38,148 35,138 40,130 C45,122 53,132 48,145 Z" />
        </svg>

        {/* Award Content */}
        <div className="px-4 text-center">
          <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400/90 font-bold block">
            {laurel}
          </span>
          <h4 className="text-base sm:text-lg font-serif font-bold text-white tracking-wide mt-1">
            {title}
          </h4>
          {year && (
            <span className="text-xs font-mono text-zinc-400 block mt-0.5">
              {year} • {category}
            </span>
          )}
        </div>

        {/* Right Laurel Branch */}
        <svg className="w-10 h-16 text-amber-400/70 group-hover:text-amber-400 transition-colors scale-x-[-1]" viewBox="0 0 100 160" fill="currentColor">
          <path d="M50,150 C40,130 20,110 25,85 C27,75 35,70 42,78 C35,60 15,50 20,25 C22,15 30,10 38,18 C28,5 15,-10 25,-25" fill="none" stroke="currentColor" strokeWidth="4" />
          <path d="M25,30 C15,35 10,25 15,15 C20,5 30,15 25,30 Z" />
          <path d="M22,60 C12,65 7,55 12,45 C17,35 27,45 22,60 Z" />
          <path d="M26,90 C16,95 11,85 16,75 C21,65 31,75 26,90 Z" />
          <path d="M35,120 C25,125 20,115 25,105 C30,95 40,105 35,120 Z" />
          <path d="M48,145 C38,148 35,138 40,130 C45,122 53,132 48,145 Z" />
        </svg>
      </div>
    </div>
  )
}
