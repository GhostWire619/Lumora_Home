"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  MeshDistortMaterial,
  Sphere,
} from "@react-three/drei";
import type * as THREE from "three";

// Create a simpler 3D component that doesn't rely on custom fonts
function AnimatedLumoraContent() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.01;
      sphereRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group>
      {/* Main animated sphere */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
        <Sphere ref={sphereRef} args={[1.2, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#3B82F6"
            attach="material"
            distort={0.4}
            speed={1.5}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      {/* Glowing orbs */}
      <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[2, 1, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="#475569" />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.7}>
        <mesh position={[-2, -0.5, 1]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#6366F1" />
        </mesh>
      </Float>

      <Float speed={4} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh position={[1.5, -1.5, -1]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshBasicMaterial color="#8B5CF6" />
        </mesh>
      </Float>
    </group>
  );
}

export default function AboutThreeD() {
  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} color="#3B82F6" intensity={2} />
      <pointLight position={[-10, -10, -10]} color="#8B5CF6" intensity={1.5} />
      <AnimatedLumoraContent />
      <Environment preset="city" />
    </Canvas>
  );
}
