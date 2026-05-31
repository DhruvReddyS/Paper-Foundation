import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-[8px] font-medium overflow-hidden focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none";

const variants: Record<Variant, string> = {
  primary: "bg-forest text-paper",
  secondary: "bg-transparent text-forest border border-forest",
  ghost: "bg-transparent text-ink",
  dark: "bg-paper text-forest-deep",
};

const variantHoverBg: Record<Variant, string> = {
  primary: "bg-forest-deep",
  secondary: "bg-forest",
  ghost: "bg-paper-2",
  dark: "bg-paper-2",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[15px]",
  lg: "h-12 px-7 text-[15px]",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">;

function Inner({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant: Variant;
}) {
  const hoverText = variant === "secondary" ? "group-hover:text-paper" : "";
  return (
    <>
      <span
        className={cn(
          "absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          variantHoverBg[variant]
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          "relative z-10 inline-flex items-center gap-2 transition-colors",
          hoverText
        )}
      >
        {children}
      </span>
    </>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, "group", variants[variant], sizes[size], className);
  if (href) {
    return (
      <Link href={href} className={classes}>
        <Inner variant={variant}>{children}</Inner>
      </Link>
    );
  }
  return (
    <button className={classes} {...rest}>
      <Inner variant={variant}>{children}</Inner>
    </button>
  );
}
