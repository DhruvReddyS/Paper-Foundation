"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";

type Toast = { id: number; kind: "ok" | "err"; message: string };

const ToastCtx = createContext<(t: Omit<Toast, "id">) => void>(() => {});

let counter = 0;
const listeners: ((t: Toast) => void)[] = [];

export function toast(t: Omit<Toast, "id">) {
  const toast: Toast = { ...t, id: ++counter };
  listeners.forEach((l) => l(toast));
}

export function useToast() {
  return useContext(ToastCtx);
}

export function AdminToaster() {
  const [items, setItems] = useState<Toast[]>([]);
  if (typeof window !== "undefined" && listeners.length === 0) {
    listeners.push((t) => {
      setItems((prev) => [...prev, t]);
      setTimeout(() => {
        setItems((prev) => prev.filter((x) => x.id !== t.id));
      }, 3500);
    });
  }
  return (
    <div className="fixed bottom-5 right-5 z-50 space-y-2">
      <AnimatePresence>
        {items.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-card shadow-card border text-[13px] min-w-[260px] ${
              t.kind === "ok"
                ? "bg-white border-admin-border text-ink"
                : "bg-white border-red-200 text-red-900"
            }`}
          >
            {t.kind === "ok" ? (
              <CheckCircle2 size={16} className="text-forest" />
            ) : (
              <AlertCircle size={16} className="text-red-600" />
            )}
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
