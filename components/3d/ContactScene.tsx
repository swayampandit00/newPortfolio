"use client";

import { Float } from "@react-three/drei";
import { ParticleField } from "./ParticleField";
import { CameraController } from "./CameraController";

export function ContactScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[-2, 2, 3]} intensity={22} color="#7c9cff" />
      <pointLight position={[3, 1, 1]} intensity={16} color="#64f0d0" />
      <CameraController intensity={0.22} lookAt={[0, 0.2, 0]} />
      <ParticleField count={260} color="#7c9cff" />
      <Float speed={1.2} floatIntensity={0.8}>
        <mesh position={[0, 0.2, 0]}>
          <torusKnotGeometry args={[0.7, 0.08, 128, 16]} />
          <meshStandardMaterial color="#64f0d0" emissive="#64f0d0" emissiveIntensity={0.35} metalness={0.8} roughness={0.2} />
        </mesh>
      </Float>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
        <circleGeometry args={[4.5, 48]} />
        <meshStandardMaterial color="#070914" />
      </mesh>
    </>
  );
}
