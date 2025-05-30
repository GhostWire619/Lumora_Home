"use client"

import { Suspense, useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Check if we're in the browser and WebGL is supported
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

// Dynamically import Three.js components with error handling
const ThreeCanvas = dynamic(() => import("@react-three/fiber").then((mod) => ({ default: mod.Canvas })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
        Loading LUMORA...
      </div>
    </div>
  ),
})

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

function FallbackContent() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
      <div className="text-center">
        <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          LUMORA
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Innovative Solutions</div>
      </div>
    </div>
  )
}

export default function About3D() {
  const { isSupported, isClient } = useWebGLSupport()

  // Don't render anything until we're on the client
  if (!isClient) {
    return <FallbackContent />
  }

  // If WebGL is not supported, show fallback
  if (!isSupported) {
    return <FallbackContent />
  }

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
      <Suspense fallback={<FallbackContent />}>
        <ThreeCanvas
          camera={{ position: [0, 0, 6], fov: 75 }}
          onCreated={({ gl }) => {
            // Handle context loss
            gl.domElement.addEventListener("webglcontextlost", (event) => {
              event.preventDefault()
              console.log("WebGL context lost")
            })

            gl.domElement.addEventListener("webglcontextrestored", () => {
              console.log("WebGL context restored")
            })
          }}
          fallback={<FallbackContent />}
        >
          <Scene />
        </ThreeCanvas>
      </Suspense>
    </div>
  )
}
