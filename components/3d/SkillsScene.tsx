"use client";

import { Html } from "@react-three/drei";
import { useMemo, useState } from "react";
import { FloatingObject } from "./FloatingObject";
import { ParticleField } from "./ParticleField";
import { CameraController } from "./CameraController";
import type { SkillData } from "@/types";

export function SkillsScene({ skills }: { skills: SkillData[] }) {
  const [active, setActive] = useState<string | null>(null);
  const placed = useMemo(
    () =>
      skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2;
        const radius = 2.4;
        return {
          ...skill,
          position: [
            Math.cos(angle) * radius,
            Math.sin(index) * 0.55,
            Math.sin(angle) * radius * 0.7,
          ] as [number, number, number],
        };
      }),
    [skills],
  );

  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[0, 2, 3]} intensity={18} color="#64f0d0" />
      <CameraController intensity={0.25} />
      <ParticleField count={220} color="#c084fc" radius={10} />
      {placed.map((skill) => (
        <FloatingObject key={skill._id} position={skill.position} speed={0.7}>
          <mesh
            onPointerOver={() => setActive(skill._id)}
            onPointerOut={() => setActive(null)}
          >
            <icosahedronGeometry args={[0.28, 0]} />
            <meshStandardMaterial
              color={skill.accent}
              emissive={skill.accent}
              emissiveIntensity={active === skill._id ? 0.8 : 0.25}
            />
          </mesh>
          <Html center distanceFactor={9} className="pointer-events-none">
            <div className="text-center">
              <div className="text-[10px] tracking-[0.18em] text-white/80">{skill.name}</div>
              {active === skill._id && (
                <div className="mt-1 text-[9px] text-accent">{skill.level}</div>
              )}
            </div>
          </Html>
        </FloatingObject>
      ))}
    </>
  );
}
