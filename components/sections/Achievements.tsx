"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import type { AchievementData } from "@/types";

export function Achievements({ items }: { items: AchievementData[] }) {
  if (!items.length) return null;

  return (
    <section id="achievements" className="section-pad py-28">
      <Reveal>
        <SectionHeading kicker="07 — Signals" title="Only the numbers you provide." />
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Reveal key={item._id}>
            <article className="glass rounded-[1.6rem] p-6">
              <p className="display text-5xl text-accent">{item.value}</p>
              <p className="mt-3 text-sm">{item.label}</p>
              {item.note && <p className="mt-2 text-xs text-muted">{item.note}</p>}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
