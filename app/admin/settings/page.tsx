import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getPortfolio } from "@/lib/data";
import { ResourceForm } from "@/components/admin/ResourceForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin");
  const { settings } = await getPortfolio();

  return (
    <div className="max-w-2xl">
      <h1 className="display text-4xl">Settings</h1>
      <p className="mt-3 mb-8 text-sm text-muted">SEO title and description for the public site.</p>
      <ResourceForm
        endpoint="/api/settings"
        method="PUT"
        defaults={{
          siteTitle: settings.siteTitle,
          siteDescription: settings.siteDescription,
          ogImage: settings.ogImage,
          featuredLimit: String(settings.featuredLimit),
        }}
        fields={[
          { name: "siteTitle", label: "Site title", required: true },
          { name: "siteDescription", label: "Site description", type: "textarea", required: true },
          { name: "ogImage", label: "OG image URL" },
          { name: "featuredLimit", label: "Featured limit" },
        ]}
      />
    </div>
  );
}
