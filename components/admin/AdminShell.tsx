"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/achievements", label: "Achievements" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#070914] text-foreground">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-white/10 p-6 lg:block">
        <p className="kicker">Control</p>
        <p className="mt-3 text-lg">Admin Lab</p>
        <nav className="mt-10 space-y-1">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded-xl px-3 py-2 text-sm text-muted transition hover:bg-white/5 hover:text-foreground",
                pathname === link.href && "bg-accent/10 text-accent",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin" })}
          className="mt-10 text-xs tracking-[0.18em] uppercase text-muted"
        >
          Sign out
        </button>
      </aside>
      <div className="lg:pl-64">
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-4 lg:px-10">
          <p className="text-sm text-muted">Portfolio CMS</p>
          <Link href="/" className="text-xs tracking-[0.18em] uppercase text-accent">
            View site
          </Link>
        </header>
        <div className="px-5 py-8 lg:px-10">{children}</div>
      </div>
    </div>
  );
}
