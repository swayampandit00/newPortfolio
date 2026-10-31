import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getPortfolio } from "@/lib/data";
import { ResourceForm } from "@/components/admin/ResourceForm";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminAchievementsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin");
  const { achievements } = await getPortfolio();

  return (
    <div className="grid gap-10 xl:grid-cols-[1fr_1fr]">
      <div>
        <h1 className="display text-4xl">Achievements</h1>
        <p className="mt-3 mb-8 text-sm text-muted">Leave empty on the public site until you add real values.</p>
        <ResourceForm
          endpoint="/api/achievements"
          fields={[
            { name: "label", label: "Label", required: true },
            { name: "value", label: "Value", required: true },
            { name: "note", label: "Note" },
          ]}
        />
      </div>
      <div className="space-y-3">
        {achievements.length === 0 && <p className="text-sm text-muted">No achievements yet.</p>}
        {achievements.map((item) => (
          <article key={item._id} className="glass flex items-center justify-between rounded-2xl p-4">
            <div>
              <p className="text-2xl text-accent">{item.value}</p>
              <p className="text-sm">{item.label}</p>
            </div>
            <DeleteButton endpoint={`/api/achievements/${item._id}`} />
          </article>
        ))}
      </div>
    </div>
  );
}
