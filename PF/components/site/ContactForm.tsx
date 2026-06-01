"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

const types = [
  { value: "general", label: "General" },
  { value: "partnership", label: "Partnership" },
  { value: "press", label: "Press" },
  { value: "research", label: "Research" },
  { value: "volunteer", label: "Volunteer" },
];

export function ContactForm({ defaultType }: { defaultType?: string }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    org: "",
    type: defaultType && types.some((t) => t.value === defaultType) ? defaultType : "general",
    message: "",
    website: "", // honeypot
  });
  const [state, setState] = useState<"idle" | "loading" | "done" | "err">("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setError(null);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not send");
      setState("done");
    } catch (err) {
      setState("err");
      setError((err as Error).message);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {state === "done" ? (
        <motion.div
          key="ok"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-card border border-rule bg-paper p-10 text-center shadow-card"
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-forest text-paper grid place-items-center mb-5">
            <Check size={22} />
          </div>
          <h3 className="font-serif text-h3 text-forest-deep">Thank you — your message is in.</h3>
          <p className="mt-3 text-ink/75 leading-relaxed">
            We read every message and reply within a few working days. If your note is urgent or
            press-related, please mention that in the subject.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={submit}
          className="space-y-5"
        >
          <input
            type="text"
            value={form.website}
            onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Name" required>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className={fieldCls}
              />
            </Field>
            <Field label="Email" required>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={fieldCls}
              />
            </Field>
            <Field label="Organisation">
              <input
                value={form.org}
                onChange={(e) => setForm((f) => ({ ...f, org: e.target.value }))}
                className={fieldCls}
              />
            </Field>
            <Field label="Type" required>
              <select
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                className={fieldCls}
              >
                {types.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Message" required>
            <textarea
              required
              rows={6}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full px-4 py-3 rounded-[8px] border border-rule bg-paper focus:bg-paper-2/30 outline-none focus:border-forest transition-colors text-[15px] resize-none"
            />
          </Field>
          {error && <p className="text-[13px] text-red-700">{error}</p>}
          <div className="pt-2">
            <Button size="lg" variant="primary">
              {state === "loading" ? "Sending…" : "Send message"}
            </Button>
          </div>
          <p className="text-[12px] text-ink-2">
            By submitting, you agree we can store your message and reply by email. We do not
            share contact details with third parties.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

const fieldCls =
  "w-full h-12 px-4 rounded-[8px] border border-rule bg-paper focus:bg-paper-2/30 outline-none focus:border-forest transition-colors text-[15px]";

function Field({
  label,
  children,
  required,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[12px] uppercase tracking-[0.16em] text-ink-2 mb-2">
        {label}
        {required && <span className="text-copper"> *</span>}
      </span>
      {children}
    </label>
  );
}
