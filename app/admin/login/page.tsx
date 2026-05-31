"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const callbackUrl = search.get("callbackUrl") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    const res = await signIn("credentials", { redirect: false, email, password });
    setLoading(false);
    if (res?.error) setErr("Invalid email or password.");
    else router.push(callbackUrl);
  };

  return (
    <div className="min-h-screen bg-admin-surface grid place-items-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 text-forest-deep">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <rect x="3" y="3" width="22" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 9h10M9 13h10M9 17h6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="font-serif text-[16px]">Paper Foundation</span>
          </div>
          <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-ink-2">Admin sign-in</p>
        </div>
        <form
          onSubmit={submit}
          className="bg-white border border-admin-border rounded-card p-7 shadow-card space-y-4"
        >
          <label className="block">
            <span className="text-[12px] uppercase tracking-[0.16em] text-ink-2">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full h-11 px-3.5 rounded-[8px] border border-admin-border focus:border-forest outline-none text-[14px]"
            />
          </label>
          <label className="block">
            <span className="text-[12px] uppercase tracking-[0.16em] text-ink-2">Password</span>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full h-11 px-3.5 rounded-[8px] border border-admin-border focus:border-forest outline-none text-[14px]"
            />
          </label>
          {err && <p className="text-[13px] text-red-700">{err}</p>}
          <button
            disabled={loading}
            className="w-full h-11 bg-forest text-paper rounded-[8px] hover:bg-forest-deep transition-colors text-[14px] disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
