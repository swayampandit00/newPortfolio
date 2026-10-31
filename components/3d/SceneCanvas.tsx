"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";
import { useIsMobile, useReducedMotion } from "@/hooks/useMedia";

export function SceneCanvas({
  children,
  className = "",
  camera = { position: [0, 1.2, 6.4], fov: 42 },
}: {
  children: ReactNode;
  className?: string;
  camera?: { position: [number, number, number]; fov: number };
}) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  return (
    <div className={className}>
      <Canvas
        dpr={isMobile || reduced ? [1, 1.2] : [1, 1.75]}
        camera={camera}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduced ? "demand" : "always"}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
