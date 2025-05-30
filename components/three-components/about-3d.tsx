"use client"

import { Suspense, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"

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
  loading: () => <FallbackContent isLoading={true} />,
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

function FallbackContent({ isLoading = false }: { isLoading?: boolean }) {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-lg">
      {/* Cool background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/lumora-3d-fallback.png"
          alt="Lumora 3D Background"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center px-4 py-6 rounded-xl bg-black/30 backdrop-blur-md border border-white/10">
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            LUMORA
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center gap-1 mt-2">
              <div className="text-sm text-blue-200">Loading</div>
              <div className="flex gap-1">
                <span
                  className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></span>
                <span
                  className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></span>
                <span
                  className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></span>
              </div>
            </div>
          ) : (
            <div className="text-sm text-blue-200">Innovative Solutions</div>
          )}
        </div>
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
    <div className="w-full h-64 rounded-lg overflow-hidden">
      <Suspense fallback={<FallbackContent isLoading={true} />}>
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
          fallback={<FallbackContent isLoading={true} />}
        >
          <Scene />
        </ThreeCanvas>
      </Suspense>
    </div>
  )
}
