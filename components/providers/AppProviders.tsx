"use client";

import { SessionProvider } from "next-auth/react";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { PageTransition } from "@/components/animations/PageTransition";
import { useEffect, useState } from "react";
import { Preloader } from "@/components/ui/Preloader";
import { usePathname } from "next/navigation";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const [booted, setBooted] = useState(isAdmin);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.body.classList.add("reduced-motion");
      setBooted(true);
    }
  }, []);

  return (
    <SessionProvider>
      {!isAdmin && !booted && <Preloader onDone={() => setBooted(true)} />}
      <SmoothScroll />
      <CustomCursor />
      <PageTransition>{children}</PageTransition>
    </SessionProvider>
  );
}
