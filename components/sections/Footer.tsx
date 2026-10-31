"use client";

import { Reveal } from "@/components/animations/Reveal";
import type { ProfileData } from "@/types";

export function Footer({ profile }: { profile: ProfileData }) {
  const links = [
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
    { label: "Email", href: profile.email.includes("@") ? `mailto:${profile.email}` : undefined },
    { label: "Instagram", href: profile.instagram },
  ].filter((item) => item.href);

  return (
    <footer className="section-pad relative overflow-hidden pb-12 pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(100,240,208,0.14),transparent_45%)]" />
      <Reveal>
        <p className="display max-w-5xl text-4xl sm:text-6xl lg:text-8xl">
          Let&apos;s build something amazing.
        </p>
      </Reveal>
      <div className="relative mt-12 flex flex-wrap items-end justify-between gap-8 border-t border-white/10 pt-8">
        <div>
          <p className="text-sm">{profile.name}</p>
          <p className="mt-2 text-xs tracking-[0.2em] uppercase text-muted">{profile.role}</p>
        </div>
        <div className="flex flex-wrap gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs tracking-[0.22em] uppercase text-muted hover:text-accent"
              data-cursor="hover"
              target={link.href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
