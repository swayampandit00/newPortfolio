"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import type { ProjectData } from "@/types";

export function Projects({ projects }: { projects: ProjectData[] }) {
  return (
    <section id="projects" className="section-pad py-28">
      <Reveal>
        <SectionHeading
          kicker="03 — Selected work"
          title="Objects built to be explored."
          copy="Every case study is database-driven. Replace placeholders from the admin panel."
        />
      </Reveal>
      <div className="mt-16 space-y-20">
        {projects.map((project, index) => (
          <Reveal key={project._id} delay={0.05}>
            <article className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <Link href={`/projects/${project.slug}`} data-cursor="view" className="group relative overflow-hidden rounded-[2rem] border border-white/10">
                <motion.div
                  className="relative aspect-[16/10] bg-[radial-gradient(circle_at_30%_20%,rgba(100,240,208,0.2),transparent_40%),linear-gradient(135deg,#0b1020,#111827)]"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="absolute inset-6 rounded-[1.4rem] border border-white/10 bg-black/20 backdrop-blur-sm" />
                  <div className="absolute bottom-10 left-10">
                    <p className="font-mono text-xs tracking-[0.3em] text-accent">
                      PROJECT {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 display text-3xl sm:text-5xl">{project.title}</h3>
                  </div>
                </motion.div>
              </Link>
              <div>
                <p className="text-sm leading-7 text-muted">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-white/10 px-3 py-1 text-[10px] tracking-[0.18em] uppercase text-muted">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <MagneticButton href={`/projects/${project.slug}`}>Case study</MagneticButton>
                  {project.liveUrl && <MagneticButton href={project.liveUrl}>Live demo</MagneticButton>}
                  {project.githubUrl && <MagneticButton href={project.githubUrl}>GitHub</MagneticButton>}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
