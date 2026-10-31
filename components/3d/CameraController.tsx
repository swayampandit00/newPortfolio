"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function CameraController({
  intensity = 0.35,
  lookAt = [0, 0.4, 0],
}: {
  intensity?: number;
  lookAt?: [number, number, number];
}) {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3(...lookAt));

  useEffect(() => {
    target.current.set(...lookAt);
  }, [lookAt]);

  useFrame(() => {
    camera.position.x += (pointer.x * intensity - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * intensity * 0.4 + 1.2 - camera.position.y) * 0.04;
    camera.lookAt(target.current);
  });

  return null;
}
