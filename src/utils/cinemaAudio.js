// Cinema Audio Engine: Continuous Marvel Intro BGM + Mechanical Film Reel Scroll Sound Effects
// Pure Web Audio API & Native HTML5 Audio (Zero external libraries)

class CinemaAudioEngine {
  constructor() {
    this.marvelAudio = null
    this.audioCtx = null
    this.isMuted = false
    this.isPlayingBgm = false
    this.lastScrollTime = 0
    this.lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0
    this.initialized = false

    if (typeof window !== 'undefined') {
      this.init()
    }
  }

  init() {
    if (this.initialized) return
    this.initialized = true

    try {
      // 1. Initialize Marvel Intro Soundtrack Audio Element
      const audio = new Audio('/assets/marvel-intro.mp4')
      audio.preload = 'auto'
      audio.volume = 0.8
      audio.loop = true // Keep Marvel intro song playing long and continuous across the site
      this.marvelAudio = audio
      window.__portfolioMarvelAudio = audio

      audio.addEventListener('play', () => {
        this.isPlayingBgm = true
        this.notifyStateChange()
      })

      audio.addEventListener('pause', () => {
        this.isPlayingBgm = false
        this.notifyStateChange()
      })
    } catch (e) {
      console.warn('Could not initialize Marvel Audio track', e)
    }

    // Bind scroll sound listener
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true })
  }

  getAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.audioCtx = new AudioCtx()
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {})
    }
    return this.audioCtx
  }

  playMarvelIntro() {
    if (!this.marvelAudio || this.isMuted) return
    try {
      if (this.marvelAudio.paused) {
        const playPromise = this.marvelAudio.play()
        if (playPromise) {
          playPromise.then(() => {
            this.isPlayingBgm = true
            this.notifyStateChange()
          }).catch((err) => {
            console.warn('Audio play request interrupted or prevented by browser:', err)
          })
        }
      }
    } catch (e) {
      console.warn('Error playing Marvel intro audio:', e)
    }
  }

  pauseMarvelIntro() {
    if (this.marvelAudio && !this.marvelAudio.paused) {
      this.marvelAudio.pause()
      this.isPlayingBgm = false
      this.notifyStateChange()
    }
  }

  toggleSound() {
    if (this.isPlayingBgm) {
      this.pauseMarvelIntro()
      this.isMuted = true
    } else {
      this.isMuted = false
      this.playMarvelIntro()
    }
    this.notifyStateChange()
  }

  notifyStateChange() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('cinema-audio-state', {
          detail: {
            isPlaying: this.isPlayingBgm && !this.isMuted,
            isMuted: this.isMuted
          }
        })
      )
    }
  }

  // Mechanical 35mm projector gate click on scroll movement
  handleScroll() {
    if (this.isMuted) return
    const now = performance.now()
    const currentY = window.scrollY
    const delta = Math.abs(currentY - this.lastScrollY)

    // Trigger tick every ~45px of scroll travel, throttled to max once every 75ms
    if (delta > 35 && now - this.lastScrollTime > 75) {
      this.playScrollSprocketClick(delta)
      this.lastScrollTime = now
      this.lastScrollY = currentY
    }
  }

  playScrollSprocketClick(delta = 40) {
    if (this.isMuted) return
    const ctx = this.getAudioContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      // Soft 35mm film frame click tick
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      // Modulate pitch slightly based on scroll velocity (1100Hz - 1600Hz)
      const freq = Math.min(1600, 1100 + delta * 3)
      osc.frequency.setValueAtTime(freq, now)

      const duration = 0.018
      // Very soft gain: 0.025 (subtle tactile feedback, non-intrusive)
      gain.gain.setValueAtTime(0.025, now)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + duration + 0.01)
    } catch (e) {}
  }

  // Cinematic sub-bass swell when arriving at a new major scene
  playSceneTransitionSound() {
    if (this.isMuted) return
    const ctx = this.getAudioContext()
    if (!ctx) return

    try {
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(65, now)
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.3)
      osc.frequency.exponentialRampToValueAtTime(55, now + 1.2)

      gain.gain.setValueAtTime(0.001, now)
      gain.gain.linearRampToValueAtTime(0.06, now + 0.25)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 1.25)
    } catch (e) {}
  }
}

export const cinemaAudio = new CinemaAudioEngine()
export default cinemaAudio
