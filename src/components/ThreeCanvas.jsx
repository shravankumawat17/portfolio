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

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // =========================================================================
    // 1. PROCEDURAL GLSL WEBGL ATMOSPHERIC SHADER (Elevate 1.0-style background)
    // =========================================================================
    const shaderUniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    }

    const bgVertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.9999, 1.0);
      }
    `

    const bgFragmentShader = `
      precision highp float;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec2 uResolution;
      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < 5; ++i) {
          v += a * noise(p);
          p = rot * p * 2.0 + vec2(17.0, 9.1);
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 p = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
        vec2 m = uMouse * 0.35;

        // Fluid volumetric smoke
        vec2 q = vec2(fbm(p + vec2(0.0, uTime * 0.035) + m),
                      fbm(p + vec2(uTime * 0.025, 0.0) - m));

        vec2 r = vec2(fbm(p + 2.5 * q + vec2(1.7, 9.2) + 0.06 * uTime),
                      fbm(p + 2.5 * q + vec2(8.3, 2.8) + 0.04 * uTime));

        float f = fbm(p + 2.5 * r);

        // Cinema Projector Beam sweeping through smoke
        float beamAngle = dot(normalize(vec2(1.0, -0.65)), p + vec2(-0.25, 0.15));
        float beam = smoothstep(0.65, 0.0, abs(beamAngle)) * 0.12;

        // Deadpool Charcoal & Crimson Atmosphere
        vec3 col = vec3(0.024, 0.024, 0.032);
        vec3 crimson = vec3(0.898, 0.035, 0.078);
        vec3 gold = vec3(0.831, 0.686, 0.216);

        col = mix(col, crimson * 0.28, clamp(f * f * 2.4, 0.0, 1.0));
        col = mix(col, gold * 0.16, clamp(pow(r.x, 3.0) * 1.8, 0.0, 1.0));
        col += gold * beam * (0.7 + 0.3 * sin(uTime * 1.4));

        // Film theater vignette
        float vig = 1.0 - smoothstep(0.4, 1.45, length(p));
        col *= vig;

        gl_FragColor = vec4(col, 0.92);
      }
    `

    const bgMaterial = new THREE.ShaderMaterial({
      vertexShader: bgVertexShader,
      fragmentShader: bgFragmentShader,
      uniforms: shaderUniforms,
      depthTest: false,
      depthWrite: false
    })

    const bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMaterial)
    bgPlane.frustumCulled = false
    scene.add(bgPlane)

    // =========================================================================
    // 2. 3D RISING EMBERS & DEPTH-OF-FIELD SPARK PARTICLES
    // =========================================================================
    const particleCount = 450
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const speeds = new Float32Array(particleCount)

    const colorCrimson = new THREE.Color('#e50914')
    const colorDeepRed = new THREE.Color('#991b1b')
    const colorGold = new THREE.Color('#d4af37')
    const colorAmber = new THREE.Color('#f59e0b')

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 130
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120
      positions[i * 3 + 2] = (Math.random() - 0.5) * 90

      const rand = Math.random()
      const c = rand > 0.65 ? colorCrimson : rand > 0.35 ? colorDeepRed : rand > 0.15 ? colorGold : colorAmber
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b

      speeds[i] = Math.random() * 0.035 + 0.015
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Soft Glow Particle Texture
    const pCanvas = document.createElement('canvas')
    pCanvas.width = 32
    pCanvas.height = 32
    const pCtx = pCanvas.getContext('2d')
    const pGradient = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16)
    pGradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    pGradient.addColorStop(0.35, 'rgba(255, 60, 60, 0.85)')
    pGradient.addColorStop(0.75, 'rgba(200, 20, 30, 0.4)')
    pGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
    pCtx.fillStyle = pGradient
    pCtx.fillRect(0, 0, 32, 32)
    const particleTexture = new THREE.CanvasTexture(pCanvas)

    const particleMaterial = new THREE.PointsMaterial({
      size: 2.4,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const particleSystem = new THREE.Points(geometry, particleMaterial)
    scene.add(particleSystem)

    // =========================================================================
    // 3. 3D INTERACTIVE GYROSCOPIC CINEMA FILM REEL OBJECT
    // =========================================================================
    const reelGroup = new THREE.Group()

    // Outer Film Spool Ring
    const spoolRimGeo = new THREE.TorusGeometry(14, 0.35, 16, 80)
    const spoolRimMat = new THREE.MeshBasicMaterial({ color: 0xc81d2c, wireframe: true, transparent: true, opacity: 0.35 })
    const spoolRim = new THREE.Mesh(spoolRimGeo, spoolRimMat)
    reelGroup.add(spoolRim)

    // Secondary Gold Orbital Ring
    const goldOrbGeo = new THREE.TorusGeometry(20, 0.15, 16, 100)
    const goldOrbMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, wireframe: true, transparent: true, opacity: 0.25 })
    const goldOrb = new THREE.Mesh(goldOrbGeo, goldOrbMat)
    reelGroup.add(goldOrb)

    // Central Spool Hub
    const hubGeo = new THREE.CylinderGeometry(2.5, 2.5, 0.6, 24)
    const hubMat = new THREE.MeshBasicMaterial({ color: 0x18181b, wireframe: true })
    const hub = new THREE.Mesh(hubGeo, hubMat)
    hub.rotation.x = Math.PI / 2
    reelGroup.add(hub)

    // Radial Film Spokes (5 Spokes)
    for (let s = 0; s < 5; s++) {
      const spokeAngle = (s / 5) * Math.PI * 2
      const spokeGeo = new THREE.BoxGeometry(0.25, 13, 0.2)
      const spokeMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0.3 })
      const spoke = new THREE.Mesh(spokeGeo, spokeMat)
      spoke.rotation.z = spokeAngle
      reelGroup.add(spoke)
    }

    reelGroup.position.set(0, 0, -18)
    scene.add(reelGroup)

    // Mouse & Scroll Tracking
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0
    let targetZ = 45

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
      shaderUniforms.uMouse.value.set(mouseX, mouseY)
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1
      const progress = scrollY / maxScroll
      targetZ = 45 - Math.sin(progress * Math.PI * 3) * 12
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      shaderUniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Render Loop
    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      const delta = clock.getDelta()
      const time = clock.getElapsedTime()

      shaderUniforms.uTime.value = time

      // Camera smooth interpolation
      targetX += (mouseX * 7 - targetX) * 0.04
      targetY += (-mouseY * 7 - targetY) * 0.04
      camera.position.x = targetX
      camera.position.y = targetY
      camera.position.z += (targetZ - camera.position.z) * 0.05
      camera.lookAt(0, 0, 0)

      // Embers rising & swirling
      const pos = particleSystem.geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += speeds[i]
        pos[i * 3] += Math.sin(time + i) * 0.025
        if (pos[i * 3 + 1] > 60) {
          pos[i * 3 + 1] = -60
          pos[i * 3] = (Math.random() - 0.5) * 130
        }
      }
      particleSystem.geometry.attributes.position.needsUpdate = true
      particleSystem.rotation.y = time * 0.02

      // Rotate 3D Film Reel & Gyro Rings
      spoolRim.rotation.z = time * 0.25
      spoolRim.rotation.x = Math.sin(time * 0.2) * 0.3
      goldOrb.rotation.y = time * -0.18
      goldOrb.rotation.x = Math.cos(time * 0.25) * 0.25
      reelGroup.rotation.y = mouseX * 0.4
      reelGroup.rotation.x = -mouseY * 0.4

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  )
}
