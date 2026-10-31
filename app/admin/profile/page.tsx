import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getPortfolio } from "@/lib/data";
import { ResourceForm } from "@/components/admin/ResourceForm";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin");
  const { profile } = await getPortfolio();

  return (
    <div className="max-w-2xl">
      <h1 className="display text-4xl">Profile</h1>
      <p className="mt-3 mb-8 text-sm text-muted">This identity appears across the public experience.</p>
      <ResourceForm
        endpoint="/api/profile"
        method="PUT"
        defaults={{
          name: profile.name,
          role: profile.role,
          tagline: profile.tagline,
          roles: profile.roles.join(", "),
          bio: profile.bio,
          email: profile.email,
          github: profile.github,
          linkedin: profile.linkedin,
          instagram: profile.instagram,
          location: profile.location,
          availability: profile.availability,
        }}
        fields={[
          { name: "name", label: "Name", required: true },
          { name: "role", label: "Role", required: true },
          { name: "tagline", label: "Tagline" },
          { name: "roles", label: "Roles (comma separated)" },
          { name: "bio", label: "Bio", type: "textarea", required: true },
          { name: "email", label: "Email", required: true },
          { name: "github", label: "GitHub" },
          { name: "linkedin", label: "LinkedIn" },
          { name: "instagram", label: "Instagram" },
          { name: "location", label: "Location" },
          { name: "availability", label: "Availability" },
        ]}
      />
    </div>
  );
}
