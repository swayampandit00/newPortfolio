import type { Metadata } from "next";
import { getPortfolio } from "@/lib/data";
import { SiteShell } from "@/components/layout/SiteShell";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Achievements } from "@/components/sections/Achievements";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Experience",
  description: "Timeline of roles, education, and signals.",
};

export default async function ExperiencePage() {
  const data = await getPortfolio();
  return (
    <SiteShell profile={data.profile}>
      <div className="pt-24">
        <Experience items={data.experience} />
        <Education items={data.education} />
        <Achievements items={data.achievements} />
      </div>
    </SiteShell>
  );
}
