import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getPortfolio } from "@/lib/data";
import { ResourceForm } from "@/components/admin/ResourceForm";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminEducationPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin");
  const { education } = await getPortfolio();

  return (
    <div className="grid gap-10 xl:grid-cols-[1fr_1fr]">
      <div>
        <h1 className="display text-4xl">Education</h1>
        <ResourceForm
          endpoint="/api/education"
          fields={[
            { name: "institution", label: "Institution", required: true },
            { name: "program", label: "Program", required: true },
            { name: "duration", label: "Duration", required: true },
            { name: "description", label: "Description", type: "textarea" },
          ]}
        />
      </div>
      <div className="space-y-3">
        {education.map((item) => (
          <article key={item._id} className="glass rounded-2xl p-4">
            <div className="flex justify-between">
              <h2>{item.program}</h2>
              <DeleteButton endpoint={`/api/education/${item._id}`} />
            </div>
            <p className="text-sm text-muted">{item.institution}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
