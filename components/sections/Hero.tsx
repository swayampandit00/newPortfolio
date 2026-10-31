"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FallbackScene } from "@/components/3d/FallbackScene";
import { useWebGL, useIsMobile, useReducedMotion } from "@/hooks/useMedia";
import type { ProfileData } from "@/types";

const SceneCanvas = dynamic(
  () => import("@/components/3d/SceneCanvas").then((m) => m.SceneCanvas),
  { ssr: false },
);
const HeroScene = dynamic(
  () => import("@/components/3d/HeroScene").then((m) => m.HeroScene),
  { ssr: false },
);

export function Hero({ profile }: { profile: ProfileData }) {
  const webgl = useWebGL();
  const mobile = useIsMobile();
  const reduced = useReducedMotion();
  const show3d = webgl && !reduced;

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        {show3d ? (
          <SceneCanvas className="h-full w-full">
            <HeroScene />
          </SceneCanvas>
        ) : (
          <FallbackScene title="Lab online" />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060c]/20 via-[#05060c]/35 to-[#05060c]" />
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end section-pad pb-20 pt-32">
        <p className="kicker">Hello, I&apos;m</p>
        <h1 className="mt-5 display max-w-6xl text-5xl sm:text-7xl lg:text-[9rem]">
          {profile.name.split("").map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              className="inline-block"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.04 * index, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs tracking-[0.28em] text-accent sm:text-sm">
          {profile.roles.map((role) => (
            <span key={role}>{role}</span>
          ))}
        </div>
        <p className="mt-6 max-w-xl text-sm leading-7 text-muted">{profile.bio}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <MagneticButton href="/projects">View my work</MagneticButton>
          <MagneticButton href="/contact" className="border-accent/40 bg-accent/10">
            Contact me
          </MagneticButton>
        </div>
        {!mobile && (
          <p className="mt-16 text-[10px] tracking-[0.3em] text-muted">SCROLL TO ENTER THE LAB</p>
        )}
      </div>
    </section>
  );
}
