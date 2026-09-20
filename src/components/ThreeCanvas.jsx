import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeCanvas() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 40

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Ambient 3D Cinema Dust Particles & Embers
    const particleCount = 280
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    const colorGold = new THREE.Color('#d4af37')
    const colorRed = new THREE.Color('#e50914')
    const colorBlue = new THREE.Color('#3b6ea5')

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 90
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60

      const mixedColor = Math.random() > 0.6 ? colorGold : Math.random() > 0.3 ? colorRed : colorBlue
      colors[i * 3] = mixedColor.r
      colors[i * 3 + 1] = mixedColor.g
      colors[i * 3 + 2] = mixedColor.b

      sizes[i] = Math.random() * 2.5 + 1.0
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    // Particle Material with Soft Circular Point
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.3, 'rgba(255,240,200,0.8)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 32, 32)
    const particleTexture = new THREE.CanvasTexture(canvas)

    const material = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const particleSystem = new THREE.Points(geometry, material)
    scene.add(particleSystem)

    // Floating 3D Film Reel Rings (Golden Cinema Gyroscopes)
    const ringGroup = new THREE.Group()
    const ringGeo1 = new THREE.TorusGeometry(14, 0.08, 16, 100)
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0.15, wireframe: true })
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1)

    const ringGeo2 = new THREE.TorusGeometry(20, 0.05, 16, 100)
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xc81d2c, transparent: true, opacity: 0.12, wireframe: true })
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2)

    ringGroup.add(ring1)
    ringGroup.add(ring2)
    ringGroup.position.z = -15
    scene.add(ringGroup)

    // Mouse interactive movement
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Resize Handler
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

      // Smooth camera interpolation following mouse
      targetX += (mouseX * 4 - targetX) * 0.04
      targetY += (-mouseY * 4 - targetY) * 0.04
      camera.position.x = targetX
      camera.position.y = targetY
      camera.lookAt(0, 0, 0)

      // Particle slow drift & oscillation
      const posArray = particleSystem.geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += Math.sin(time + i) * 0.015 + 0.02
        // Wrap around vertically
        if (posArray[i * 3 + 1] > 40) {
          posArray[i * 3 + 1] = -40
        }
      }
      particleSystem.geometry.attributes.position.needsUpdate = true
      particleSystem.rotation.y = time * 0.02

      // Rotate 3D Gyroscope Film Rings
      ring1.rotation.x = time * 0.15
      ring1.rotation.y = time * 0.2
      ring2.rotation.y = time * -0.12
      ring2.rotation.z = time * 0.08

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
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
