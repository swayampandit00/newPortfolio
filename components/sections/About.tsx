"use client";

import dynamic from "next/dynamic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { FallbackScene } from "@/components/3d/FallbackScene";
import { useWebGL, useReducedMotion } from "@/hooks/useMedia";
import type { ProfileData } from "@/types";

const SceneCanvas = dynamic(
  () => import("@/components/3d/SceneCanvas").then((m) => m.SceneCanvas),
  { ssr: false },
);
const AboutScene = dynamic(
  () => import("@/components/3d/AboutScene").then((m) => m.AboutScene),
  { ssr: false },
);

export function About({ profile }: { profile: ProfileData }) {
  const webgl = useWebGL();
  const reduced = useReducedMotion();
  const show3d = webgl && !reduced;

  return (
    <section id="about" className="section-pad relative py-28 lg:py-36">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionHeading
            kicker="01 — Identity"
            title="A digital laboratory, not a landing page."
            copy={profile.bio}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              ["Location", profile.location || "YOUR LOCATION"],
              ["Availability", profile.availability],
              ["Email", profile.email],
              ["Focus", profile.role],
            ].map(([label, value]) => (
              <div key={label} className="glass rounded-2xl p-5">
                <p className="text-[10px] tracking-[0.24em] uppercase text-muted">{label}</p>
                <p className="mt-2 text-sm">{value}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.15} className="h-[420px] overflow-hidden rounded-[2rem] border border-white/10">
          {show3d ? (
            <SceneCanvas className="h-full w-full" camera={{ position: [0, 1, 5.4], fov: 40 }}>
              <AboutScene />
            </SceneCanvas>
          ) : (
            <FallbackScene title="About room" />
          )}
        </Reveal>
      </div>
    </section>
  );
}
