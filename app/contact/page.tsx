import type { Metadata } from "next";
import { getPortfolio } from "@/lib/data";
import { SiteShell } from "@/components/layout/SiteShell";
import { Contact } from "@/components/sections/Contact";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send a message from the control room.",
};

export default async function ContactPage() {
  const data = await getPortfolio();
  return (
    <SiteShell profile={data.profile}>
      <div className="pt-24">
        <Contact profile={data.profile} />
      </div>
    </SiteShell>
  );
}
