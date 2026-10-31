"use client";

import { Float } from "@react-three/drei";
import { ParticleField } from "./ParticleField";
import { CameraController } from "./CameraController";

export function ProjectScene({ accent = "#64f0d0" }: { accent?: string }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight position={[3, 4, 4]} intensity={30} color={accent} />
      <CameraController intensity={0.18} />
      <ParticleField count={120} color={accent} radius={6} />
      <Float speed={1.5} floatIntensity={0.7}>
        <mesh>
          <boxGeometry args={[2.4, 1.5, 0.08]} />
          <meshStandardMaterial color="#10131c" metalness={0.6} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[2.15, 1.25]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.28} />
        </mesh>
      </Float>
    </>
  );
}
