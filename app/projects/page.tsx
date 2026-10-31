import type { Metadata } from "next";
import { getPortfolio } from "@/lib/data";
import { SiteShell } from "@/components/layout/SiteShell";
import { Projects } from "@/components/sections/Projects";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected work and case studies.",
};

export default async function ProjectsPage() {
  const data = await getPortfolio();
  return (
    <SiteShell profile={data.profile}>
      <div className="pt-24">
        <Projects projects={data.projects} />
      </div>
    </SiteShell>
  );
}
