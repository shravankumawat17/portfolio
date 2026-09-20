import { useEffect } from 'react'
import cinemaAudio from '../utils/cinemaAudio'

export default function useScrollReveal() {
  useEffect(() => {
    // 1. Reveal animations observer
    const revealElements = document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-zoom'
    )

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      }
    )

    revealElements.forEach((el) => revealObserver.observe(el))

    // 2. Scene transitions sound observer
    const sceneSections = document.querySelectorAll(
      '#start, #act-origin, #act-arsenal, #cinema-vault, #act-missions, #training-montage, #credits'
    )

    let lastSectionId = ''
    const sceneObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const currentId = entry.target.id
            if (currentId && currentId !== lastSectionId) {
              lastSectionId = currentId
              cinemaAudio.playSceneTransitionSound()
            }
          }
        })
      },
      {
        threshold: [0.3],
        rootMargin: '-10% 0px -20% 0px'
      }
    )

    sceneSections.forEach((el) => sceneObserver.observe(el))

    return () => {
      revealObserver.disconnect()
      sceneObserver.disconnect()
    }
  }, [])
}
