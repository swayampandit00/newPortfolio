"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import type { EducationData } from "@/types";

export function Education({ items }: { items: EducationData[] }) {
  return (
    <section id="education" className="section-pad py-28">
      <Reveal>
        <SectionHeading kicker="05 — Education" title="Volumes on the shelf." />
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {items.map((item, index) => (
          <Reveal key={item._id} delay={index * 0.08}>
            <article className="glass relative overflow-hidden rounded-[1.8rem] p-8">
              <div className="absolute -right-6 -top-8 h-28 w-20 rotate-12 rounded-md bg-gradient-to-br from-electric/40 to-accent/20" />
              <p className="font-mono text-xs tracking-[0.24em] text-accent">{item.duration}</p>
              <h3 className="mt-4 text-2xl">{item.program}</h3>
              <p className="mt-2 text-sm text-muted">{item.institution}</p>
              {item.description && <p className="mt-5 text-sm leading-7 text-muted">{item.description}</p>}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
