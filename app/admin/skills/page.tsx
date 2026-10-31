import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getPortfolio } from "@/lib/data";
import { ResourceForm } from "@/components/admin/ResourceForm";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminSkillsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin");
  const { skills } = await getPortfolio();

  return (
    <div className="grid gap-10 xl:grid-cols-[1fr_1fr]">
      <div>
        <h1 className="display text-4xl">Skills</h1>
        <ResourceForm
          endpoint="/api/skills"
          fields={[
            { name: "name", label: "Name", required: true },
            { name: "category", label: "Category", required: true },
            { name: "level", label: "Level", required: true, placeholder: "Production" },
            { name: "projects", label: "Projects (comma separated)" },
            { name: "accent", label: "Accent color", placeholder: "#64f0d0" },
          ]}
        />
      </div>
      <div className="space-y-3">
        {skills.map((skill) => (
          <article key={skill._id} className="glass flex items-center justify-between rounded-2xl p-4">
            <div>
              <p>{skill.name}</p>
              <p className="text-xs text-muted">{skill.category} / {skill.level}</p>
            </div>
            <DeleteButton endpoint={`/api/skills/${skill._id}`} />
          </article>
        ))}
      </div>
    </div>
  );
}
