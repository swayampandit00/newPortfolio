"use client";

import { FormEvent, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/admin/dashboard");
    }
  }, [status, router]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("Invalid credentials.");
      return;
    }
    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="grid min-h-screen place-items-center px-5">
      <form onSubmit={onSubmit} className="glass w-full max-w-md space-y-4 rounded-[2rem] p-8">
        <p className="kicker">Admin</p>
        <h1 className="display text-4xl">Enter the lab</h1>
        <label className="block text-xs tracking-[0.16em] uppercase text-muted">
          Email
          <input name="email" type="email" required className="mt-2" />
        </label>
        <label className="block text-xs tracking-[0.16em] uppercase text-muted">
          Password
          <input name="password" type="password" required className="mt-2" />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full border border-accent/40 bg-accent/10 py-3 text-xs tracking-[0.22em] uppercase text-accent"
        >
          {loading ? "Authenticating..." : "Sign in"}
        </button>
        {error && <p className="text-sm text-rose-300">{error}</p>}
      </form>
    </div>
  );
}
