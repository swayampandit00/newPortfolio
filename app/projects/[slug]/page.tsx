import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPortfolio, getProjectBySlug } from "@/lib/data";
import { SiteShell } from "@/components/layout/SiteShell";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/animations/Reveal";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const [project, data] = await Promise.all([
    getProjectBySlug(params.slug),
    getPortfolio(),
  ]);
  if (!project) notFound();

  const blocks = [
    ["Overview", project.overview],
    ["Problem", project.problem],
    ["Solution", project.solution],
    ["Challenges", project.challenges],
    ["Result", project.result],
  ].filter(([, value]) => value);

  return (
    <SiteShell profile={data.profile}>
      <article className="section-pad pb-24 pt-36">
        <p className="kicker">{project.category}</p>
        <h1 className="display mt-5 max-w-5xl text-5xl sm:text-7xl">{project.title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-muted">{project.description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl && <MagneticButton href={project.liveUrl}>Live demo</MagneticButton>}
          {project.githubUrl && <MagneticButton href={project.githubUrl}>GitHub</MagneticButton>}
          <MagneticButton href="/projects">All work</MagneticButton>
        </div>
        <div className="mt-16 aspect-[16/8] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(100,240,208,0.18),transparent_35%),linear-gradient(135deg,#0b1020,#151b2c)]" />
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            {blocks.map(([title, copy]) => (
              <Reveal key={title}>
                <h2 className="text-3xl">{title}</h2>
                <p className="mt-4 max-w-2xl text-sm leading-8 text-muted">{copy}</p>
              </Reveal>
            ))}
            {project.features.length > 0 && (
              <Reveal>
                <h2 className="text-3xl">Features</h2>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {project.features.map((feature) => (
                    <li key={feature}>— {feature}</li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
          <aside className="lg:col-span-4">
            <div className="glass sticky top-28 rounded-[1.6rem] p-6">
              <p className="text-[10px] tracking-[0.24em] uppercase text-muted">Technology</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="rounded-full border border-white/10 px-3 py-1 text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
        <p className="mt-20 text-xs tracking-[0.2em] uppercase text-muted">
          <Link href="/projects">Back to projects</Link>
        </p>
      </article>
    </SiteShell>
  );
}
