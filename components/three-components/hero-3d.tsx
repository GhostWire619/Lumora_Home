"use client"

import { Suspense, useRef, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
import dynamic from "next/dynamic"
import type * as THREE from "three"

// Check WebGL support
function useWebGLSupport() {
  const [isSupported, setIsSupported] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    if (typeof window !== "undefined") {
      try {
        const canvas = document.createElement("canvas")
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
        setIsSupported(!!gl)

        // Clean up
        if (gl) {
          const loseContext = gl.getExtension("WEBGL_lose_context")
          if (loseContext) {
            loseContext.loseContext()
          }
        }
        canvas.remove()
      } catch (e) {
        setIsSupported(false)
      }
    }
  }, [])

  return { isSupported, isClient }
}

// Dynamically import Three.js components
const ThreeCanvas = dynamic(() => import("@react-three/fiber").then((mod) => ({ default: mod.Canvas })), {
  ssr: false,
  loading: () => <HeroFallback isLoading={true} />,
})

function FloatingCube({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3b82f6" metalness={0.7} roughness={0.2} transparent opacity={0.8} />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

      <FloatingCube position={[-3, 0, 0]} />
      <FloatingCube position={[3, 0, 0]} />
      <FloatingCube position={[0, 2, -2]} />
      <FloatingCube position={[0, -2, -2]} />
    </>
  )
}

function HeroFallback({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Cool background with subtle animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black/40 to-purple-900/20"></div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-blue-400/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.3 + Math.random() * 0.7,
              }}
            ></div>
          ))}
        </div>

        {/* Animated gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 animate-pulse"
          style={{ animationDuration: "4s" }}
        ></div>
      </div>

      {/* Loading indicator (only shown when loading) */}
      {isLoading && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10">
            <div className="text-sm text-blue-200">Initializing</div>
            <div className="flex gap-1">
              <span
                className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></span>
              <span
                className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></span>
              <span
                className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Hero3D() {
  const { isSupported, isClient } = useWebGLSupport()

  // Don't render anything until we're on the client
  if (!isClient) {
    return <HeroFallback />
  }

  // If WebGL is not supported, show fallback
  if (!isSupported) {
    return <HeroFallback />
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Suspense fallback={<HeroFallback isLoading={true} />}>
        <ThreeCanvas
          camera={{ position: [0, 0, 8], fov: 75 }}
          onCreated={({ gl }) => {
            // Handle context loss gracefully
            gl.domElement.addEventListener("webglcontextlost", (event) => {
              event.preventDefault()
            })
          }}
        >
          <Scene />
        </ThreeCanvas>
      </Suspense>
    </div>
  )
}
