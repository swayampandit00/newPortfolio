"use client";

import { FormEvent, useState } from "react";
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
const ContactScene = dynamic(
  () => import("@/components/3d/ContactScene").then((m) => m.ContactScene),
  { ssr: false },
);

export function Contact({ profile }: { profile: ProfileData }) {
  const webgl = useWebGL();
  const reduced = useReducedMotion();
  const show3d = webgl && !reduced;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setError("Message could not be sent. Try again in a moment.");
    }
  }

  return (
    <section id="contact" className="section-pad py-28">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionHeading
            kicker="08 — Transmission"
            title="Send a signal."
            copy="Name, email, subject, and message are required. Messages land in MongoDB when the database is connected."
          />
          <div className="mt-8 h-64 overflow-hidden rounded-[1.8rem] border border-white/10">
            {show3d ? (
              <SceneCanvas className="h-full w-full" camera={{ position: [0, 1, 4.6], fov: 42 }}>
                <ContactScene />
              </SceneCanvas>
            ) : (
              <FallbackScene title="Control room" />
            )}
          </div>
          <p className="mt-6 text-sm text-muted">{profile.email}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="glass space-y-4 rounded-[2rem] p-6 sm:p-8">
            <label className="block text-xs tracking-[0.18em] uppercase text-muted">
              Name
              <input name="name" required minLength={2} className="mt-2" />
            </label>
            <label className="block text-xs tracking-[0.18em] uppercase text-muted">
              Email
              <input name="email" type="email" required className="mt-2" />
            </label>
            <label className="block text-xs tracking-[0.18em] uppercase text-muted">
              Subject
              <input name="subject" required minLength={3} className="mt-2" />
            </label>
            <label className="block text-xs tracking-[0.18em] uppercase text-muted">
              Message
              <textarea name="message" required minLength={10} rows={5} className="mt-2 resize-none" />
            </label>
            <div className="hidden" aria-hidden>
              <input name="website" tabIndex={-1} autoComplete="off" />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-full border border-accent/40 bg-accent/10 py-3 text-xs tracking-[0.24em] uppercase text-accent transition hover:bg-accent/20 disabled:opacity-60"
              data-cursor="hover"
            >
              {status === "loading" ? "Sending..." : status === "success" ? "Message sent" : "Send message"}
            </button>
            {status === "error" && <p className="text-sm text-rose-300">{error}</p>}
            {status === "success" && <p className="text-sm text-accent">Transmission received.</p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
