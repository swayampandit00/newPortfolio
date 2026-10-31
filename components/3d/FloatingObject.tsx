"use client";

import { useRef, useState, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function FloatingObject({
  children,
  speed = 1,
  amplitude = 0.18,
  position = [0, 0, 0],
  hoverScale = 1.08,
}: {
  children: ReactNode;
  speed?: number;
  amplitude?: number;
  position?: [number, number, number];
  hoverScale?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const scale = useRef(new THREE.Vector3(1, 1, 1));

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime() * speed;
    group.current.position.y = position[1] + Math.sin(t) * amplitude;
    group.current.rotation.y += 0.004 * speed;
    const target = hovered ? hoverScale : 1;
    scale.current.set(target, target, target);
    group.current.scale.lerp(scale.current, 0.08);
  });

  return (
    <group
      ref={group}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {children}
    </group>
  );
}
