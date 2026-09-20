import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeCanvas() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // Scene, Camera, WebGL Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 45

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 3D Cinema Dust Particles & Stars
    const particleCount = 350
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const originalPositions = new Float32Array(particleCount * 3)

    const colorGold = new THREE.Color('#d4af37')
    const colorCyan = new THREE.Color('#00f2fe')
    const colorRed = new THREE.Color('#e50914')

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 110
      const y = (Math.random() - 0.5) * 100
      const z = (Math.random() - 0.5) * 80

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      originalPositions[i * 3] = x
      originalPositions[i * 3 + 1] = y
      originalPositions[i * 3 + 2] = z

      const mixed = Math.random() > 0.6 ? colorGold : Math.random() > 0.3 ? colorCyan : colorRed
      colors[i * 3] = mixed.r
      colors[i * 3 + 1] = mixed.g
      colors[i * 3 + 2] = mixed.b
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
    gradient.addColorStop(0.3, 'rgba(255, 235, 180, 0.8)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 32, 32)
    const particleTexture = new THREE.CanvasTexture(canvas)

    const material = new THREE.PointsMaterial({
      size: 1.9,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const particleSystem = new THREE.Points(geometry, material)
    scene.add(particleSystem)

    // Floating 3D Cinema Film Rings (Golden Gyroscope)
    const ringGroup = new THREE.Group()
    const ringGeo1 = new THREE.TorusGeometry(16, 0.08, 16, 100)
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0.15, wireframe: true })
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1)

    const ringGeo2 = new THREE.TorusGeometry(24, 0.05, 16, 100)
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.12, wireframe: true })
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2)

    ringGroup.add(ring1)
    ringGroup.add(ring2)
    ringGroup.position.z = -15
    scene.add(ringGroup)

    // Interactive mouse & scroll variables
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0
    let scrollY = 0
    let targetScrollZ = 45

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const handleScroll = () => {
      scrollY = window.scrollY
      // Scroll moves camera smoothly through 3D depth
      const scrollProgress = scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1)
      targetScrollZ = 45 - scrollProgress * 15 // Camera dollies closer
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Animation Loop
    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      const delta = clock.getDelta()
      const time = clock.getElapsedTime()

      // Smooth camera interpolation
      targetX += (mouseX * 5 - targetX) * 0.05
      targetY += (-mouseY * 5 - targetY) * 0.05
      camera.position.x = targetX
      camera.position.y = targetY
      camera.position.z += (targetScrollZ - camera.position.z) * 0.05
      camera.lookAt(0, 0, 0)

      // Particle floating oscillation
      const pos = particleSystem.geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += Math.sin(time * 0.8 + i) * 0.02 + 0.015
        if (pos[i * 3 + 1] > 50) {
          pos[i * 3 + 1] = -50
        }
      }
      particleSystem.geometry.attributes.position.needsUpdate = true
      particleSystem.rotation.y = time * 0.02
      particleSystem.rotation.x = time * 0.01

      // Rotate gyroscopic rings
      ring1.rotation.x = time * 0.12
      ring1.rotation.y = time * 0.18
      ring2.rotation.y = time * -0.1
      ring2.rotation.z = time * 0.07

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
