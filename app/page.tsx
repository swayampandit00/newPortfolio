import { getPortfolio } from "@/lib/data";
import { SiteShell } from "@/components/layout/SiteShell";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Services } from "@/components/sections/Services";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getPortfolio();

  return (
    <SiteShell profile={data.profile}>
      <Hero profile={data.profile} />
      <About profile={data.profile} />
      <Skills skills={data.skills} />
      <Projects projects={data.projects} />
      <Experience items={data.experience} />
      <Education items={data.education} />
      <Services items={data.services} />
      <Achievements items={data.achievements} />
      <Contact profile={data.profile} />
    </SiteShell>
  );
}
