import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getPortfolio } from "@/lib/data";
import { ResourceForm } from "@/components/admin/ResourceForm";
import { DeleteButton } from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin");
  const { services } = await getPortfolio();

  return (
    <div className="grid gap-10 xl:grid-cols-[1fr_1fr]">
      <div>
        <h1 className="display text-4xl">Services</h1>
        <ResourceForm
          endpoint="/api/services"
          fields={[
            { name: "title", label: "Title", required: true },
            { name: "description", label: "Description", type: "textarea", required: true },
            { name: "details", label: "Details", type: "textarea" },
          ]}
        />
      </div>
      <div className="space-y-3">
        {services.map((item) => (
          <article key={item._id} className="glass rounded-2xl p-4">
            <div className="flex justify-between">
              <h2>{item.title}</h2>
              <DeleteButton endpoint={`/api/services/${item._id}`} />
            </div>
            <p className="mt-2 text-sm text-muted">{item.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
