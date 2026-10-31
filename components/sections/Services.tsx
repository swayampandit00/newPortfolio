"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import type { ServiceData } from "@/types";

export function Services({ items }: { items: ServiceData[] }) {
  return (
    <section id="services" className="section-pad py-28">
      <Reveal>
        <SectionHeading kicker="06 — Services" title="Capabilities you can commission." />
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <Reveal key={item._id} delay={index * 0.05}>
            <motion.article
              className="glass h-full rounded-[1.8rem] p-7"
              whileHover={{ y: -10, rotateX: 6, rotateY: -4 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              data-cursor="explore"
            >
              <p className="font-mono text-[10px] tracking-[0.28em] text-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-2xl">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{item.description}</p>
              {item.details && <p className="mt-5 text-xs tracking-wide text-electric">{item.details}</p>}
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
