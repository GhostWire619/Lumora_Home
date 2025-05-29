"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Text3D, Environment, MeshTransmissionMaterial } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building, Target, Rocket, Heart, Users, Award, Globe, TrendingUp } from "lucide-react"
import { useRef } from "react"
import type * as THREE from "three"
import Image from "next/image"

function AnimatedLumoraText() {
  const textRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.01
    }
  })

  // Create particles
  const particleCount = 100
  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10
  }

  return (
    <group>
      {/* Floating particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#3B82F6" transparent opacity={0.6} />
      </points>

      {/* Main LUMORA text */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
        <Text3D
          ref={textRef}
          font="/fonts/Geist_Bold.json"
          size={0.8}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={8}
          position={[0, 0, 0]}
          scale={[1.2, 1.2, 1.2]}
        >
          LUMORA
          <MeshTransmissionMaterial
            color="#3B82F6"
            thickness={0.5}
            roughness={0.1}
            transmission={0.9}
            ior={1.5}
            chromaticAberration={0.1}
            backside
          />
        </Text3D>
      </Float>

      {/* Glowing orbs around text */}
      <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[2, 1, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#475569" />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.7}>
        <mesh position={[-2, -0.5, 1]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#6366F1" />
        </mesh>
      </Float>

      <Float speed={3.5} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh position={[1.5, -1, -1]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#3B82F6" />
        </mesh>
      </Float>
    </group>
  )
}

const stats = [
  {
    number: "49+",
    label: "Projects Delivered",
    icon: Award,
    color: "from-blue-500 to-blue-600",
    description: "Successfully completed projects across various industries",
  },
  {
    number: "25+",
    label: "Happy Clients",
    icon: Users,
    color: "from-emerald-500 to-emerald-600",
    description: "Satisfied clients worldwide who trust our expertise",
  },
  {
    number: "99.8%",
    label: "Client Satisfaction",
    icon: Heart,
    color: "from-red-500 to-red-600",
    description: "Exceptional service quality and client satisfaction rate",
  },
  {
    number: "4+",
    label: "Countries Served",
    icon: Globe,
    color: "from-purple-500 to-purple-600",
    description: "Global reach with local expertise and understanding",
  },
]

const values = [
  {
    icon: Target,
    title: "Precision Excellence",
    description:
      "Every pixel, every interaction, every detail crafted to perfection with meticulous attention to quality and user experience.",
    color: "from-blue-600 to-indigo-600",
    image: "/images/team-collaboration.png",
  },
  {
    icon: Rocket,
    title: "Innovation Leadership",
    description:
      "Pushing boundaries with cutting-edge technology, creative solutions, and forward-thinking approaches to digital challenges.",
    color: "from-purple-600 to-pink-600",
    image: "/images/analytics.png",
  },
  {
    icon: Heart,
    title: "Passionate Commitment",
    description:
      "We love what we do, and it shows in every project we deliver. Our passion drives us to exceed expectations consistently.",
    color: "from-red-600 to-orange-600",
    image: "/images/team-collaboration.png",
  },
]

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

export default function About() {
  return (
    <section id="about" className="py-20 px-4 relative overflow-hidden bg-background">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/10 via-background to-purple-950/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Enhanced Left Content */}
          <div>
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full border border-blue-500/30 mb-8">
              <Building className="w-5 h-5 text-blue-600 mr-3" />
              <span className="text-sm font-semibold text-blue-600 tracking-wide uppercase">About Lumora</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold mb-8 text-foreground leading-tight">
              Professional Digital
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Excellence
              </span>
            </h2>

            <div className="space-y-6 mb-10">
              <p className="text-xl text-muted-foreground leading-relaxed">
                We're a premier digital agency specializing in enterprise-grade solutions that transform businesses and
                drive measurable growth. Our team combines strategic thinking with technical expertise to deliver
                exceptional results.
              </p>

              <div className="bg-gradient-to-r from-blue-50/10 to-purple-50/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                  <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                  Our Mission
                </h3>
                <p className="text-muted-foreground">
                  To illuminate possibilities through innovative technology solutions that empower businesses to thrive
                  in the digital age while maintaining the highest standards of quality and service excellence.
                </p>
              </div>
            </div>

            <Button
              onClick={() => smoothScrollTo("services")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore Our Services
              <Rocket className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Enhanced 3D Element - Zoomed In */}
          <div className="h-96 relative">
            <Canvas camera={{ position: [0, 0, 6] }}>
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} color="#3B82F6" intensity={2} />
              <pointLight position={[-10, -10, -10]} color="#8B5CF6" intensity={1.5} />
              <spotLight position={[0, 10, 0]} color="#6366F1" intensity={1} />
              <AnimatedLumoraText />
              <Environment preset="night" />
            </Canvas>
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={index}
                className="group relative overflow-hidden bg-card/80 backdrop-blur-sm border-2 border-gray-700/30 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                <CardContent className="relative z-10 p-6 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div
                    className={`text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-foreground font-semibold mb-2">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Enhanced Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Core{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Values</span>
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do and drive our commitment to excellence in every project.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card
                  key={index}
                  className="group relative overflow-hidden bg-card/80 backdrop-blur-sm border-2 border-gray-700/30 hover:border-blue-500/50 transition-all duration-700 transform hover:scale-105"
                >
                  {/* Image Background */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={value.image || "/placeholder.svg"}
                      alt={value.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${value.color} opacity-80`} />

                    {/* Icon */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {value.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>

                  {/* Hover Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none`}
                  />
                </Card>
              )
            })}
          </div>
        </div>

        {/* Team Excellence Section */}
        <div className="text-center">
          <Card className="relative overflow-hidden bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 backdrop-blur-sm border border-blue-500/30">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <CardContent className="relative z-10 p-12">
              <div className="flex items-center justify-center mb-6">
                <Users className="w-12 h-12 text-blue-600 mr-4" />
                <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Meet Our Expert Team
                </h3>
              </div>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Our diverse team of designers, developers, strategists, and innovators work collaboratively to bring
                your vision to life with unmatched expertise and dedication to excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  onClick={() => smoothScrollTo("contact")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full text-lg shadow-lg"
                >
                  Work With Us
                  <Heart className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white font-semibold px-8 py-4 rounded-full text-lg"
                >
                  Our Portfolio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
