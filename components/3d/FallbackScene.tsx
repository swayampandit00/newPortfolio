"use client";

export function FallbackScene({ title }: { title?: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#070914]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(100,240,208,0.16),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(124,156,255,0.16),transparent_40%)]" />
      <div className="absolute inset-0 bg-noise opacity-40" />
      <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/30" />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 animate-spinSlow rounded-full border border-white/10" />
      {title && (
        <p className="absolute bottom-8 left-8 kicker">{title}</p>
      )}
    </div>
  );
}
