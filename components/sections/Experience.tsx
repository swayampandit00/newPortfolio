"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { GsapTimeline } from "@/components/animations/GsapTimeline";
import type { ExperienceData } from "@/types";

export function Experience({ items }: { items: ExperienceData[] }) {
  return (
    <section id="experience" className="section-pad py-28">
      <Reveal>
        <SectionHeading
          kicker="04 — Timeline"
          title="A path drawn through systems."
        />
      </Reveal>
      <GsapTimeline>
      <div className="relative mt-16">
        <div className="timeline-line absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-accent/70 via-white/10 to-transparent sm:left-1/2" />
        <div className="space-y-12">
          {items.map((item, index) => (
            <Reveal key={item._id} delay={index * 0.08}>
              <article className="timeline-node relative grid gap-4 sm:grid-cols-2">
                <div className={`${index % 2 ? "sm:col-start-2" : "sm:pr-16 sm:text-right"} pl-12 sm:pl-0`}>
                  <p className="font-mono text-xs tracking-[0.28em] text-accent">{item.year}</p>
                  <h3 className="mt-2 text-2xl">{item.role}</h3>
                  <p className="mt-1 text-sm text-muted">{item.company} · {item.duration}</p>
                  <p className="mt-4 text-sm leading-7 text-muted">{item.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2 sm:justify-end">
                    {item.technologies.map((tech) => (
                      <span key={tech} className="text-[10px] tracking-[0.16em] uppercase text-electric">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="absolute left-[0.65rem] top-2 h-3 w-3 rounded-full bg-accent shadow-glow sm:left-[calc(50%-6px)]" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
      </GsapTimeline>
    </section>
  );
}
