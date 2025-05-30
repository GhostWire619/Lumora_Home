"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Environment, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

function AnimatedSphere() {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <Sphere visible args={[1, 100, 200]} scale={2.5}>
        <MeshDistortMaterial
          color="#3B82F6"
          attach="material"
          distort={0.6}
          speed={1.8}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  )
}

function SecondaryOrb() {
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere visible args={[0.5, 50, 100]} scale={1.2} position={[3, 1, -2]}>
        <MeshDistortMaterial
          color="#475569"
          attach="material"
          distort={0.4}
          speed={2.2}
          roughness={0.2}
          metalness={0.7}
        />
      </Sphere>
    </Float>
  )
}

export default function Hero() {
  const smoothScrollTo = (elementId: string) => {
    if (typeof window === "undefined") return

    const element = document.getElementById(elementId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Enhanced Three.js Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} color="#3B82F6" intensity={1} />
          <pointLight position={[-10, -10, -10]} color="#475569" intensity={0.8} />
          <AnimatedSphere />
          <SecondaryOrb />
          <Environment preset="night" />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-background/70 to-slate-900/30 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
        <div className="mb-6 inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-blue-500/30">
          <Sparkles className="w-4 h-4 text-blue-400 mr-2" />
          <span className="text-sm font-medium text-blue-300">Professional Digital Solutions</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight">
          Illuminate Your <span className="text-blue-600">Vision</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          We create professional digital experiences that drive business growth with cutting-edge technology and
          strategic design.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => smoothScrollTo("contact")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 w-full sm:w-auto"
          >
            Start Your Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            onClick={() => smoothScrollTo("services")}
            className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white font-semibold px-6 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
          >
            View Our Services
          </Button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full opacity-60 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-slate-500/20 rounded-full opacity-60 animate-bounce" />
      <div className="absolute top-1/2 left-5 w-12 h-12 bg-blue-600/20 rounded-full opacity-60 animate-ping" />
    </section>
  )
}
