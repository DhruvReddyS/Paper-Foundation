"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function FactOfWeek() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "done" | "err">("idle");
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent || !email) return;
    setState("loading");
    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent: true, source: "homepage" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not subscribe");
      setState("done");
    } catch (err) {
      setState("err");
      setMsg((err as Error).message);
    }
  };

  return (
    <section className="section-y">
      <div className="container">
        <div className="grid lg:grid-cols-2 rounded-card overflow-hidden border border-rule shadow-card">
          <div className="bg-paper-2 p-10 md:p-14 paper-grain">
            <p className="text-caption uppercase tracking-[0.18em] text-sage mb-3">
              Last week's fact
            </p>
            <p className="font-serif text-[1.6rem] md:text-[1.85rem] leading-snug text-forest-deep">
              "The water needed to make a tonne of paper in Indian mills has dropped roughly 40%
              since 2000 — and continues to fall."
            </p>
            <p className="mt-4 text-[13px] uppercase tracking-[0.16em] text-ink-2">
              Source · CPPRI
            </p>
          </div>
          <div className="bg-paper p-10 md:p-14">
            <p className="text-caption uppercase tracking-[0.18em] text-copper mb-3">
              Fact of the Week
            </p>
            <h3 className="font-serif text-h2 text-forest-deep leading-tight">
              One short, sourced fact in your inbox. Every Friday.
            </h3>
            <p className="mt-4 text-ink/80 leading-relaxed max-w-md">
              No fundraising emails, no campaigns. Just one well-cited fact about paper,
              recycling, or circularity — short enough to read in under a minute.
            </p>

            {state === "done" ? (
              <div className="mt-8 flex items-center gap-3 text-forest">
                <Check size={20} />
                <p>Subscribed — look for the next Friday brief.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-8 space-y-4">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.in"
                    className="flex-1 h-12 px-4 rounded-[8px] border border-rule bg-paper-2/50 focus:bg-paper outline-none focus:border-forest transition-colors text-[15px]"
                  />
                  <button
                    type="submit"
                    disabled={state === "loading" || !consent}
                    className="h-12 px-5 rounded-[8px] bg-forest text-paper hover:bg-forest-deep disabled:opacity-40 transition-colors inline-flex items-center gap-2 text-sm"
                  >
                    {state === "loading" ? "…" : (
                      <>
                        Subscribe <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </div>
                <label className="flex items-start gap-3 text-[13px] text-ink-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 accent-forest"
                  />
                  <span>
                    I consent to receiving the weekly Fact email. We don't sell or share emails.
                    Unsubscribe with one click any time.
                  </span>
                </label>
                {state === "err" && <p className="text-[13px] text-red-700">{msg}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
