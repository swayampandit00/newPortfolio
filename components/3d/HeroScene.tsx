"use client";

import { Float } from "@react-three/drei";
import { ParticleField } from "./ParticleField";
import { CameraController } from "./CameraController";
import { useIsMobile } from "@/hooks/useMedia";

function Laptop() {
  return (
    <group position={[1.6, -0.15, 0]} rotation={[0.18, -0.55, 0]}>
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2.2, 0.08, 1.4]} />
        <meshStandardMaterial color="#151821" metalness={0.7} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.78, -0.66]} rotation={[Math.PI * 0.12, 0, 0]}>
        <boxGeometry args={[2.2, 1.4, 0.06]} />
        <meshStandardMaterial color="#10131c" metalness={0.6} roughness={0.22} />
      </mesh>
      <mesh position={[0, 0.78, -0.62]} rotation={[Math.PI * 0.12, 0, 0]}>
        <planeGeometry args={[1.95, 1.15]} />
        <meshStandardMaterial
          color="#64f0d0"
          emissive="#64f0d0"
          emissiveIntensity={0.35}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function CodeShard({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh position={position}>
        <boxGeometry args={[0.9, 0.08, 0.32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
      </mesh>
    </Float>
  );
}

export function HeroScene() {
  const isMobile = useIsMobile();

  return (
    <>
      <color attach="background" args={["#05060c"]} />
      <fog attach="fog" args={["#05060c", 8, 18]} />
      <ambientLight intensity={0.35} />
      <spotLight position={[6, 8, 4]} intensity={40} angle={0.4} penumbra={0.6} color="#7c9cff" />
      <pointLight position={[-4, 2, 2]} intensity={18} color="#64f0d0" />
      <CameraController intensity={isMobile ? 0.12 : 0.42} />
      <ParticleField count={isMobile ? 160 : 420} />
      <Laptop />
      <Float speed={1.4} floatIntensity={0.6}>
        <mesh position={[-2.2, 0.7, -0.4]}>
          <torusGeometry args={[1.05, 0.018, 16, 80]} />
          <meshStandardMaterial color="#7c9cff" emissive="#7c9cff" emissiveIntensity={0.7} />
        </mesh>
      </Float>
      <Float speed={1.1} floatIntensity={0.5}>
        <mesh position={[-1.8, 0.2, 0.4]}>
          <icosahedronGeometry args={[0.42, 0]} />
          <meshPhysicalMaterial
            color="#8ab4ff"
            roughness={0.12}
            metalness={0.15}
            transmission={0.85}
            thickness={0.7}
            transparent
          />
        </mesh>
      </Float>
      <CodeShard position={[-0.2, 1.4, 0.6]} color="#64f0d0" />
      <CodeShard position={[-0.8, 0.9, 1]} color="#c084fc" />
      <CodeShard position={[0.4, 0.4, 1.2]} color="#7c9cff" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.05, 0]}>
        <circleGeometry args={[7, 64]} />
        <meshStandardMaterial color="#070914" metalness={0.3} roughness={0.9} />
      </mesh>
    </>
  );
}
