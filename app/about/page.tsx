import type { Metadata } from "next";
import { getPortfolio } from "@/lib/data";
import { SiteShell } from "@/components/layout/SiteShell";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Services } from "@/components/sections/Services";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description: "About the studio, skills, and education.",
};

export default async function AboutPage() {
  const data = await getPortfolio();
  return (
    <SiteShell profile={data.profile}>
      <div className="pt-24">
        <About profile={data.profile} />
        <Skills skills={data.skills} />
        <Education items={data.education} />
        <Services items={data.services} />
      </div>
    </SiteShell>
  );
}
