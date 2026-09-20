import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeCanvas() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // Scene, Perspective Camera, WebGL Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 45

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Deadpool Crimson & Gold Embers
    const particleCount = 420
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const speeds = new Float32Array(particleCount)

    const colorCrimson = new THREE.Color('#e50914')
    const colorDeepRed = new THREE.Color('#991b1b')
    const colorGold = new THREE.Color('#d4af37')
    const colorAmber = new THREE.Color('#f59e0b')

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120
      positions[i * 3 + 1] = (Math.random() - 0.5) * 110
      positions[i * 3 + 2] = (Math.random() - 0.5) * 90

      // Deadpool color palette: red embers, crimson sparks, gold highlights
      const rand = Math.random()
      const c = rand > 0.65 ? colorCrimson : rand > 0.35 ? colorDeepRed : rand > 0.15 ? colorGold : colorAmber
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b

      speeds[i] = Math.random() * 0.03 + 0.015
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Soft Circular Particle Texture
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.3, 'rgba(255, 80, 80, 0.8)')
    gradient.addColorStop(0.7, 'rgba(200, 20, 30, 0.4)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 32, 32)
    const particleTexture = new THREE.CanvasTexture(canvas)

    const material = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const particleSystem = new THREE.Points(geometry, material)
    scene.add(particleSystem)

    // 3D Deadpool Crimson & Gold Film Gyro Rings
    const ringGroup = new THREE.Group()
    const ringGeo1 = new THREE.TorusGeometry(18, 0.1, 16, 100)
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xc81d2c, transparent: true, opacity: 0.22, wireframe: true })
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1)

    const ringGeo2 = new THREE.TorusGeometry(26, 0.06, 16, 100)
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0.18, wireframe: true })
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2)

    ringGroup.add(ring1)
    ringGroup.add(ring2)
    ringGroup.position.z = -20
    scene.add(ringGroup)

    // Mouse & Scroll Tracking
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0
    let targetZ = 45

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1
      const progress = scrollY / maxScroll
      // Zoom out and in as you travel through chapters
      targetZ = 45 - Math.sin(progress * Math.PI * 3) * 12
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Render Loop
    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      const delta = clock.getDelta()
      const time = clock.getElapsedTime()

      // Smooth camera interpolation
      targetX += (mouseX * 6 - targetX) * 0.04
      targetY += (-mouseY * 6 - targetY) * 0.04
      camera.position.x = targetX
      camera.position.y = targetY
      camera.position.z += (targetZ - camera.position.z) * 0.05
      camera.lookAt(0, 0, 0)

      // Embers rising upwards with swirling motion
      const pos = particleSystem.geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += speeds[i] // Move upwards
        pos[i * 3] += Math.sin(time + i) * 0.02 // Gentle sway
        if (pos[i * 3 + 1] > 55) {
          pos[i * 3 + 1] = -55
          pos[i * 3] = (Math.random() - 0.5) * 120
        }
      }
      particleSystem.geometry.attributes.position.needsUpdate = true
      particleSystem.rotation.y = time * 0.02

      // Rotate Gyroscopic Cinema Rings
      ring1.rotation.x = time * 0.14
      ring1.rotation.y = time * 0.2
      ring2.rotation.y = time * -0.12
      ring2.rotation.z = time * 0.09

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden" 
      aria-hidden="true" 
    />
  )
}
