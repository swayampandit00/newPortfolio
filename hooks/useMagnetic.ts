"use client";

import { useRef, type MouseEvent } from "react";

export function useMagnetic<T extends HTMLElement>(strength = 0.28) {
  const ref = useRef<T>(null);

  function onMouseMove(event: MouseEvent<T>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    node.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }

  function onMouseLeave() {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "translate(0px, 0px)";
  }

  return { ref, onMouseMove, onMouseLeave };
}
