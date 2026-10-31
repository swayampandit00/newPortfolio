"use client";

import dynamic from "next/dynamic";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { FallbackScene } from "@/components/3d/FallbackScene";
import { useWebGL, useReducedMotion, useIsMobile } from "@/hooks/useMedia";
import type { SkillData } from "@/types";

const SceneCanvas = dynamic(
  () => import("@/components/3d/SceneCanvas").then((m) => m.SceneCanvas),
  { ssr: false },
);
const SkillsScene = dynamic(
  () => import("@/components/3d/SkillsScene").then((m) => m.SkillsScene),
  { ssr: false },
);

export function Skills({ skills }: { skills: SkillData[] }) {
  const mobile = useIsMobile();
  const webgl = useWebGL();
  const reduced = useReducedMotion();
  const show3d = webgl && !reduced && !mobile;

  return (
    <section id="skills" className="section-pad relative py-28">
      <Reveal>
        <SectionHeading
          kicker="02 — Skill universe"
          title="A constellation of tools in orbit."
          copy="Hover a node to inspect the discipline. Levels stay qualitative — no invented percentages."
        />
      </Reveal>
      <div className="mt-12 h-[520px] overflow-hidden rounded-[2rem] border border-white/10">
        {show3d ? (
          <SceneCanvas className="h-full w-full" camera={{ position: [0, 1.4, 7], fov: 42 }}>
            <SkillsScene skills={skills} />
          </SceneCanvas>
        ) : (
          <FallbackScene title="Skills" />
        )}
      </div>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {skills.map((skill, index) => (
          <Reveal key={skill._id} delay={index * 0.04}>
            <article
              className="glass rounded-2xl p-4 transition hover:-translate-y-1"
              data-cursor="explore"
            >
              <p className="text-sm">{skill.name}</p>
              <p className="mt-1 text-[11px] tracking-[0.18em] uppercase text-muted">
                {skill.category} / {skill.level}
              </p>
              {skill.projects.length > 0 && (
                <p className="mt-3 text-xs text-accent/80">{skill.projects.join(", ")}</p>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
