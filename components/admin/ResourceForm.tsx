"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Field = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
};

export function ResourceForm({
  endpoint,
  method = "POST",
  fields,
  defaults = {},
  onSuccess,
}: {
  endpoint: string;
  method?: "POST" | "PUT";
  fields: Field[];
  defaults?: Record<string, string>;
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const [status, setStatus] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Saving...");
    const form = new FormData(event.currentTarget);
    const payload: Record<string, unknown> = {};
    for (const field of fields) {
      const raw = String(form.get(field.name) || "");
      if (["technologies", "features", "projects", "gallery", "roles"].includes(field.name)) {
        payload[field.name] = raw
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      } else if (field.name === "featured") {
        payload[field.name] = raw === "true" || raw === "on";
      } else if (field.name === "featuredLimit") {
        payload[field.name] = Number(raw);
      } else {
        payload[field.name] = raw;
      }
    }

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      setStatus("Save failed. Check fields and database connection.");
      return;
    }
    setStatus("Saved.");
    event.currentTarget.reset();
    onSuccess?.();
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="glass grid gap-4 rounded-2xl p-5">
      {fields.map((field) => (
        <label key={field.name} className="text-xs tracking-[0.16em] uppercase text-muted">
          {field.label}
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              required={field.required}
              defaultValue={defaults[field.name] || ""}
              rows={4}
              className="mt-2 resize-none"
            />
          ) : (
            <input
              name={field.name}
              type={field.type || "text"}
              required={field.required}
              defaultValue={defaults[field.name] || ""}
              placeholder={field.placeholder}
              className="mt-2"
            />
          )}
        </label>
      ))}
      <button type="submit" className="rounded-full border border-accent/40 bg-accent/10 py-3 text-xs tracking-[0.2em] uppercase text-accent">
        Save
      </button>
      {status && <p className="text-xs text-muted">{status}</p>}
    </form>
  );
}
