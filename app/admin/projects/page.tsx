import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getPortfolio } from "@/lib/data";
import { ResourceForm } from "@/components/admin/ResourceForm";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin");
  const { projects } = await getPortfolio();

  return (
    <div className="grid gap-10 xl:grid-cols-[1fr_1fr]">
      <div>
        <h1 className="display text-4xl">Projects</h1>
        <p className="mt-3 mb-8 text-sm text-muted">Add a case study. Thumbnail can be a remote image URL.</p>
        <ResourceForm
          endpoint="/api/projects"
          fields={[
            { name: "title", label: "Title", required: true },
            { name: "slug", label: "Slug" },
            { name: "description", label: "Description", type: "textarea", required: true },
            { name: "overview", label: "Overview", type: "textarea" },
            { name: "problem", label: "Problem", type: "textarea" },
            { name: "solution", label: "Solution", type: "textarea" },
            { name: "features", label: "Features (comma separated)" },
            { name: "challenges", label: "Challenges", type: "textarea" },
            { name: "result", label: "Result", type: "textarea" },
            { name: "thumbnail", label: "Thumbnail URL" },
            { name: "technologies", label: "Technologies (comma separated)" },
            { name: "githubUrl", label: "GitHub URL" },
            { name: "liveUrl", label: "Live URL" },
            { name: "category", label: "Category" },
            { name: "featured", label: "Featured (true/false)", placeholder: "true" },
          ]}
        />
      </div>
      <div className="space-y-4">
        {projects.map((project) => (
          <article key={project._id} className="glass rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg">{project.title}</h2>
                <p className="mt-1 text-xs text-muted">/{project.slug}</p>
              </div>
              <DeleteButton endpoint={`/api/projects/${project.slug}`} />
            </div>
            <p className="mt-3 text-sm text-muted">{project.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
