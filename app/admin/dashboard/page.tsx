import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getPortfolio } from "@/lib/data";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin");
  const data = await getPortfolio();

  const cards = [
    ["Projects", data.projects.length, "/admin/projects"],
    ["Skills", data.skills.length, "/admin/skills"],
    ["Experience", data.experience.length, "/admin/experience"],
    ["Services", data.services.length, "/admin/services"],
  ];

  return (
    <div>
      <h1 className="display text-4xl">Dashboard</h1>
      <p className="mt-3 text-sm text-muted">
        Content is live on the public site as soon as it is saved.
        {process.env.MONGODB_URI ? " Database connected." : " Running on seed/fallback data until MONGODB_URI is set."}
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value, href]) => (
          <Link key={String(label)} href={String(href)} className="glass rounded-2xl p-6">
            <p className="text-xs tracking-[0.18em] uppercase text-muted">{label}</p>
            <p className="mt-3 display text-4xl text-accent">{value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
