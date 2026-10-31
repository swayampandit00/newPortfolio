"use client";

import { useRouter } from "next/navigation";

export function DeleteButton({ endpoint }: { endpoint: string }) {
  const router = useRouter();

  async function onClick() {
    const confirmed = window.confirm("Remove this record?");
    if (!confirmed) return;
    await fetch(endpoint, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button type="button" onClick={onClick} className="text-xs tracking-[0.16em] uppercase text-rose-300">
      Remove
    </button>
  );
}
