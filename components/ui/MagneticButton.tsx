"use client";

import Link from "next/link";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function MagneticButton({
  href,
  children,
  className,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const linkMag = useMagnetic<HTMLAnchorElement>(0.22);
  const buttonMag = useMagnetic<HTMLButtonElement>(0.22);
  const classes = cn(
    "inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs tracking-[0.22em] uppercase transition duration-300 hover:border-accent/60 hover:bg-accent/10",
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        ref={linkMag.ref}
        onMouseMove={linkMag.onMouseMove}
        onMouseLeave={linkMag.onMouseLeave}
        onClick={onClick}
        className={classes}
        data-cursor="hover"
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={buttonMag.ref}
      onMouseMove={buttonMag.onMouseMove}
      onMouseLeave={buttonMag.onMouseLeave}
      onClick={onClick}
      className={classes}
      data-cursor="hover"
      type="button"
    >
      {children}
    </button>
  );
}
