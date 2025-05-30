"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamically import Three.js components to prevent SSR issues
const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => ({ default: mod.Canvas })), { ssr: false })
const Text3D = dynamic(() => import("@react-three/drei").then((mod) => ({ default: mod.Text3D })), { ssr: false })
const OrbitControls = dynamic(() => import("@react-three/drei").then((mod) => ({ default: mod.OrbitControls })), {
  ssr: false,
})

function LumoraText() {
  return (
    <Text3D
      font="/fonts/Geist_Bold.json"
      size={0.8}
      height={0.2}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.02}
      bevelSize={0.02}
      bevelOffset={0}
      bevelSegments={5}
      position={[-2, 0, 0]}
      scale={[1.2, 1.2, 1.2]}
    >
      LUMORA
      <meshStandardMaterial color="#3b82f6" metalness={0.3} roughness={0.4} />
    </Text3D>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <LumoraText />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
    </>
  )
}

export default function About3D() {
  return (
    <div className="w-full h-64 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              LUMORA
            </div>
          </div>
        }
      >
        <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  )
}
