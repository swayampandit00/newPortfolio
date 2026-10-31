"use client";

import { useEffect, useRef } from "react";
import { useIsMobile, useReducedMotion } from "@/hooks/useMedia";

export function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (isMobile || reduced) {
      document.body.classList.add("touch-device");
      return;
    }

    document.body.classList.remove("touch-device");
    const node = cursor.current;
    if (!node) return;

    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const move = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      const target = event.target as HTMLElement | null;
      const mode = target?.closest("[data-cursor]")?.getAttribute("data-cursor");
      node.classList.remove("is-hover", "is-view", "is-explore");
      if (mode === "hover") node.classList.add("is-hover");
      if (mode === "view") node.classList.add("is-view");
      if (mode === "explore") node.classList.add("is-explore");
      if (label.current) {
        label.current.textContent = mode === "view" ? "VIEW" : mode === "explore" ? "EXPLORE" : "";
      }
    };

    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      node.style.left = `${cx}px`;
      node.style.top = `${cy}px`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, [isMobile, reduced]);

  if (isMobile || reduced) return null;

  return (
    <div ref={cursor} className="custom-cursor" aria-hidden>
      <span ref={label} />
    </div>
  );
}
