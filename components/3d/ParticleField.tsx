"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ParticleField({
  count = 420,
  color = "#64f0d0",
  radius = 14,
}: {
  count?: number;
  color?: string;
  radius?: number;
}) {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      data[i3] = (Math.random() - 0.5) * radius * 2;
      data[i3 + 1] = (Math.random() - 0.5) * radius;
      data[i3 + 2] = (Math.random() - 0.5) * radius * 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(data, 3));
    return geo;
  }, [count, radius]);

  useFrame(({ clock }) => {
    if (!points.current) return;
    points.current.rotation.y = clock.getElapsedTime() * 0.018;
    points.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.08) * 0.05;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color={color}
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  );
}
