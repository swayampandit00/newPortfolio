"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const MARKS = [0, 25, 50, 75, 100];

export function Preloader({ onDone }: { onDone?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        const next = Math.min(100, prev + (prev < 70 ? 2.4 : 1.1));
        return next;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    const timeout = setTimeout(() => {
      setVisible(false);
      onDone?.();
    }, 700);
    return () => clearTimeout(timeout);
  }, [progress, onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#05060c]"
          exit={{ opacity: 0, filter: "blur(12px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(100,240,208,0.12),transparent_45%)]" />
          <div className="relative flex flex-col items-center">
            <motion.div
              className="h-28 w-28 rounded-full border border-accent/40"
              animate={{ rotate: 360, scale: [1, 1.08, 1] }}
              transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, scale: { duration: 2.4, repeat: Infinity } }}
            />
            <motion.div
              className="absolute h-16 w-16 rounded-full border border-electric/50"
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
            <p className="mt-16 font-mono text-5xl tracking-[0.18em] text-foreground">
              {String(Math.round(progress)).padStart(3, "0")}
            </p>
            <div className="mt-6 flex gap-6 text-[10px] tracking-[0.3em] text-muted">
              {MARKS.map((mark) => (
                <span key={mark} className={progress >= mark ? "text-accent" : ""}>
                  {mark}%
                </span>
              ))}
            </div>
            <p className="mt-8 kicker">Initializing experience</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
