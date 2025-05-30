"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Sphere,
  MeshDistortMaterial,
  Environment,
  Float,
} from "@react-three/drei";

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
  );
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
  );
}

export default function HeroThreeD() {
  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} color="#3B82F6" intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#475569" intensity={0.8} />
      <AnimatedSphere />
      <SecondaryOrb />
      <Environment preset="night" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </Canvas>
  );
}
