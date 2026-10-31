"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export function Navbar({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-all duration-500 sm:px-8",
        scrolled ? "pt-3" : "pt-5",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-500",
          scrolled ? "border-white/10 bg-black/55 backdrop-blur-xl" : "border-white/5 bg-white/5 backdrop-blur-md",
        )}
      >
        <Link href="/" className="flex items-center gap-3" data-cursor="hover">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-accent/40 text-[11px] tracking-[0.2em] text-accent">
            {initials || "YN"}
          </span>
          <span className="hidden text-xs tracking-[0.24em] uppercase sm:block">{name}</span>
        </Link>
        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] tracking-[0.22em] uppercase text-muted transition hover:text-foreground"
              data-cursor="hover"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <MagneticButton href="/contact" className="hidden sm:inline-flex">
            Let&apos;s Talk
          </MagneticButton>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            data-cursor="hover"
          >
            <span className="relative block h-3 w-4">
              <span className={cn("absolute inset-x-0 top-0 h-px bg-white transition", open && "translate-y-1.5 rotate-45")} />
              <span className={cn("absolute inset-x-0 bottom-0 h-px bg-white transition", open && "-translate-y-1.5 -rotate-45")} />
            </span>
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#05060c]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-full flex-col justify-between px-8 py-28">
              <div className="space-y-5">
                {LINKS.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.08 * index }}
                  >
                    <Link
                      href={link.href}
                      className="display block text-4xl"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <MagneticButton href="/contact" onClick={() => setOpen(false)}>
                Let&apos;s Talk
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
