import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getPortfolio } from "@/lib/data";
import { ResourceForm } from "@/components/admin/ResourceForm";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminExperiencePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin");
  const { experience } = await getPortfolio();

  return (
    <div className="grid gap-10 xl:grid-cols-[1fr_1fr]">
      <div>
        <h1 className="display text-4xl">Experience</h1>
        <ResourceForm
          endpoint="/api/experience"
          fields={[
            { name: "role", label: "Role", required: true },
            { name: "company", label: "Company", required: true },
            { name: "duration", label: "Duration", required: true },
            { name: "year", label: "Year", required: true },
            { name: "description", label: "Description", type: "textarea", required: true },
            { name: "technologies", label: "Technologies (comma separated)" },
          ]}
        />
      </div>
      <div className="space-y-3">
        {experience.map((item) => (
          <article key={item._id} className="glass rounded-2xl p-4">
            <div className="flex justify-between">
              <h2>{item.role}</h2>
              <DeleteButton endpoint={`/api/experience/${item._id}`} />
            </div>
            <p className="text-sm text-muted">{item.company} · {item.duration}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
