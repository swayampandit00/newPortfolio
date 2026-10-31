import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import type { ProfileData } from "@/types";

export function SiteShell({
  profile,
  children,
}: {
  profile: ProfileData;
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd profile={profile} />
      <Navbar name={profile.name} />
      <main>{children}</main>
      <Footer profile={profile} />
    </>
  );
}
