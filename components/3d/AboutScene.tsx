"use client";

import { Html } from "@react-three/drei";
import { useState } from "react";
import { FloatingObject } from "./FloatingObject";
import { ParticleField } from "./ParticleField";
import { CameraController } from "./CameraController";

const objects = [
  { id: "laptop", label: "Projects", position: [-1.6, 0.2, 0] as [number, number, number], color: "#64f0d0" },
  { id: "book", label: "Education", position: [0.1, -0.15, 0.6] as [number, number, number], color: "#7c9cff" },
  { id: "monitor", label: "Skills", position: [1.7, 0.35, -0.2] as [number, number, number], color: "#c084fc" },
  { id: "profile", label: "About Me", position: [0.2, 1.05, -0.5] as [number, number, number], color: "#f8fafc" },
];

export function AboutScene() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 3, 2]} intensity={20} color="#64f0d0" />
      <CameraController intensity={0.2} lookAt={[0, 0.3, 0]} />
      <ParticleField count={180} radius={8} color="#7c9cff" />
      {objects.map((item) => (
        <FloatingObject key={item.id} position={item.position} speed={0.8 + item.position[0] * 0.1}>
          <mesh
            onPointerOver={() => setActive(item.id)}
            onPointerOut={() => setActive(null)}
          >
            {item.id === "book" ? (
              <boxGeometry args={[0.7, 0.12, 0.95]} />
            ) : item.id === "monitor" ? (
              <boxGeometry args={[1.15, 0.75, 0.08]} />
            ) : item.id === "profile" ? (
              <capsuleGeometry args={[0.28, 0.18, 8, 16]} />
            ) : (
              <boxGeometry args={[0.95, 0.08, 0.62]} />
            )}
            <meshStandardMaterial
              color={item.color}
              emissive={item.color}
              emissiveIntensity={active === item.id ? 0.55 : 0.18}
              metalness={0.5}
              roughness={0.25}
            />
          </mesh>
          {active === item.id && (
            <Html center distanceFactor={8} className="pointer-events-none">
              <div className="rounded-full border border-white/20 bg-black/70 px-3 py-1 text-[10px] tracking-[0.22em] text-accent">
                {item.label}
              </div>
            </Html>
          )}
        </FloatingObject>
      ))}
    </>
  );
}
