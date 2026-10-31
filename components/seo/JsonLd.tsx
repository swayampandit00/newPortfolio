import { defaultPortfolio } from "@/lib/seed";
import type { ProfileData } from "@/types";

export function JsonLd({ profile }: { profile: ProfileData }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: profile.email.includes("@") ? profile.email : undefined,
    url: process.env.NEXTAUTH_URL || "http://localhost:3000",
    sameAs: [profile.github, profile.linkedin, profile.instagram].filter(Boolean),
    description: defaultPortfolio.settings.siteDescription,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
