"use client"

import { Suspense, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import dynamic from "next/dynamic"
import type * as THREE from "three"

// Dynamically import Three.js components to prevent SSR issues
const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => ({ default: mod.Canvas })), { ssr: false })

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

export default function Hero3D() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  )
}
