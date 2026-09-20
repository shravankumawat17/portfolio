import React, { useEffect, useState, useRef } from 'react'

export default function DeadpoolKnifeCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [sparks, setSparks] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [angle, setAngle] = useState(-45)
  const prevPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Only enable on non-touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    // Hide default cursor across page
    document.documentElement.classList.add('custom-knife-cursor')

    const handleMouseMove = (e) => {
      setIsVisible(true)
      const dx = e.clientX - prevPos.current.x
      const dy = e.clientY - prevPos.current.y
      
      // Calculate dynamic angle tilt based on movement direction
      if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
        const targetAngle = -45 + Math.min(Math.max(dx * 0.8, -25), 25)
        setAngle(targetAngle)
      }

      setPos({ x: e.clientX, y: e.clientY })
      prevPos.current = { x: e.clientX, y: e.clientY }

      // Check if hovering over clickable element
      const target = e.target
      const isClickable = target && (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('[role="button"]') ||
        target.classList.contains('clickable') ||
        window.getComputedStyle(target).cursor === 'pointer'
      )
      setIsHovered(!!isClickable)
    }

    const handleMouseDown = (e) => {
      setIsClicking(true)
      
      // Spawn small crimson & gold sparks on click
      const newSparks = Array.from({ length: 5 }).map((_, i) => ({
        id: Date.now() + i,
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6 - 2,
        color: Math.random() > 0.4 ? '#e50914' : '#d4af37',
        size: Math.random() * 3 + 2,
        life: 1
      }))
      setSparks(prev => [...prev.slice(-10), ...newSparks])

      setTimeout(() => setIsClicking(false), 180)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.documentElement.classList.remove('custom-knife-cursor')
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  // Spark physics tick
  useEffect(() => {
    if (sparks.length === 0) return
    const frame = requestAnimationFrame(() => {
      setSparks(prev => 
        prev
          .map(s => ({
            ...s,
            x: s.x + s.vx,
            y: s.y + s.vy,
            life: s.life - 0.08
          }))
          .filter(s => s.life > 0)
      )
    })
    return () => cancelAnimationFrame(frame)
  }, [sparks])

  if (!isVisible) return null

  return (
    <>
      {/* Click Sparks */}
      {sparks.map(s => (
        <div
          key={s.id}
          className="fixed rounded-full pointer-events-none z-[10000]"
          style={{
            left: s.x,
            top: s.y,
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: s.color,
            opacity: s.life,
            boxShadow: `0 0 6px ${s.color}`,
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.05s linear'
          }}
        />
      ))}

      {/* Main Deadpool Knife / Katana Cursor */}
      <div
        className="fixed pointer-events-none z-[9999] will-change-transform"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-3px, -3px) rotate(${angle + (isClicking ? -30 : 0)}deg) scale(${isHovered ? 1.2 : 0.95})`,
          transformOrigin: '3px 3px',
          transition: isClicking 
            ? 'transform 0.08s cubic-bezier(0.1, 0.9, 0.2, 1)' 
            : 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      >
        {/* SVG Vector Deadpool Combat Knife / Tanto */}
        <svg
          width="34"
          height="34"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-[0_2px_8px_rgba(229,9,20,0.65)]"
        >
          {/* Blade Spine (Titanium Silver) */}
          <path
            d="M4 4 L26 12 L22 16 L6 8 Z"
            fill="#e4e4e7"
            stroke="#71717a"
            strokeWidth="0.8"
          />

          {/* Blade Cutting Edge (Deadpool Crimson Razor Edge) */}
          <path
            d="M4 4 L22 16 L18 19 L4 6 Z"
            fill="#e50914"
            opacity="0.95"
          />
          
          {/* Blade Full-Length Blood Groove / Fuller (Gleam) */}
          <line
            x1="7"
            y1="7"
            x2="20"
            y2="13"
            stroke="#ffffff"
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity={isHovered ? '1' : '0.6'}
          />

          {/* Knife Guard / Tsuba (Charcoal & Gold trim) */}
          <rect
            x="20"
            y="13"
            width="6"
            height="9"
            rx="1.5"
            transform="rotate(-25 20 13)"
            fill="#18181b"
            stroke="#d4af37"
            strokeWidth="1"
          />

          {/* Hilt / Grip (Tsuka - Red & Black Diamond Wrap) */}
          <path
            d="M24 16 L40 28 L37 32 L21 20 Z"
            fill="#991b1b"
            stroke="#18181b"
            strokeWidth="0.8"
          />
          {/* Diamond Cord Pattern Over Hilt */}
          <line x1="25" y1="18" x2="36" y2="29" stroke="#18181b" strokeWidth="1.2" />
          <line x1="29" y1="16" x2="38" y2="25" stroke="#18181b" strokeWidth="1.2" />
          <line x1="24" y1="21" x2="33" y2="32" stroke="#18181b" strokeWidth="1.2" />

          {/* Pommel / Kashira (Deadpool Mini Mask Accent at base) */}
          <circle
            cx="40"
            cy="30"
            r="3.5"
            fill="#e50914"
            stroke="#0a0a0c"
            strokeWidth="1.2"
          />
          <circle cx="39.2" cy="29.5" r="0.8" fill="#ffffff" />
          <circle cx="40.8" cy="29.5" r="0.8" fill="#ffffff" />

          {/* Blade Tip Spark Point (Exact click coordinates 4, 4) */}
          <circle
            cx="4"
            cy="4"
            r={isHovered ? '2' : '1.2'}
            fill={isHovered ? '#fbbf24' : '#ffffff'}
            className="animate-pulse"
          />
        </svg>

        {/* Hover Aura Glow */}
        {isHovered && (
          <div 
            className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-red-600/30 blur-sm pointer-events-none animate-ping" 
          />
        )}
      </div>
    </>
  )
}
