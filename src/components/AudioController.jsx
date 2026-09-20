import React, { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioCtxRef = useRef(null)
  const gainNodeRef = useRef(null)
  const oscRef = useRef(null)

  const toggleAudio = () => {
    if (!isPlaying) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext
        const ctx = new AudioContext()
        audioCtxRef.current = ctx

        // Gentle projector hum oscillator
        const osc = ctx.createOscillator()
        const filter = ctx.createBiquadFilter()
        const gain = ctx.createGain()

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(60, ctx.currentTime) // 60Hz projector electrical hum

        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(140, ctx.currentTime)

        // Very soft volume
        gain.gain.setValueAtTime(0.015, ctx.currentTime)

        osc.connect(filter)
        filter.connect(gain)
        gain.connect(ctx.destination)

        osc.start()
        oscRef.current = osc
        gainNodeRef.current = gain
        setIsPlaying(true)
      } catch (e) {
        console.warn('Web Audio API not supported', e)
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close()
      }
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close()
      }
    }
  }, [])

  return (
    <button
      onClick={toggleAudio}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/60 transition-all hover:border-amber-400/50 backdrop-blur-md"
      title={isPlaying ? 'Mute projector ambience' : 'Play cinema projector ambience'}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="hidden sm:inline text-amber-400">Audio ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden sm:inline">Sound</span>
        </>
      )}
    </button>
  )
}
