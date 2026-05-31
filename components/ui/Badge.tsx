import { cn } from "@/lib/cn";
import { type ReactNode } from "react";

type Tone = "forest" | "sage" | "copper" | "outline" | "amber" | "red" | "neutral";

const tones: Record<Tone, string> = {
  forest: "bg-forest text-paper",
  sage: "bg-sage text-paper",
  copper: "bg-copper text-paper",
  outline: "bg-transparent text-forest border border-forest/30",
  amber: "bg-amber-100 text-amber-900 border border-amber-200",
  red: "bg-red-100 text-red-900 border border-red-200",
  neutral: "bg-paper-2 text-ink border border-rule",
};

export function Badge({
  children,
  tone = "forest",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-[3px] text-[12px] font-medium tracking-[0.02em]",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
