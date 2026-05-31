"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

const items = [
  { label: "Journey", href: "/" },
  { label: "Forestry", href: "/journey/forestry" },
  { label: "Lab", href: "/journey/lab" },
  { label: "Stories", href: "/journey/stories" },
];

export function MorphingDock({
  theme = "light",
}: {
  theme?: "light" | "dark";
}) {
  const pathname = usePathname();
  const dark = theme === "dark";

  return (
    <div
      className="sticky z-40 mx-auto"
      style={{
        top: 24,
        display: "flex",
        justifyContent: "center",
        width: "fit-content",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 10px",
          background: dark ? "rgba(20,28,22,0.62)" : "rgba(255,255,255,0.72)",
          border: `1px solid ${dark ? "rgba(255,255,255,0.10)" : "rgba(45,95,62,0.14)"}`,
          backdropFilter: "blur(14px) saturate(160%)",
          WebkitBackdropFilter: "blur(14px) saturate(160%)",
          borderRadius: 999,
          boxShadow: dark
            ? "0 12px 36px rgba(0,0,0,0.35)"
            : "0 12px 36px rgba(36,30,22,0.10)",
          color: dark ? "var(--paper)" : "var(--ink)",
        }}
      >
        <Link
          href="/"
          style={{
            width: 30,
            height: 30,
            borderRadius: 999,
            background: dark ? "var(--paper)" : "var(--forest)",
            color: dark ? "var(--forest-deep)" : "var(--paper)",
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--font-serif), serif",
            fontStyle: "italic",
            fontSize: 14,
          }}
          aria-label="Home"
        >
          p
        </Link>
        {items.map((it) => {
          const isActive =
            it.href === "/"
              ? pathname === "/"
              : pathname.startsWith(it.href);
          return (
            <Link
              key={it.label}
              href={it.href}
              style={{
                padding: "8px 14px",
                borderRadius: 999,
                fontFamily: "var(--font-mono), monospace",
                fontSize: 10.5,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: isActive
                  ? dark
                    ? "var(--forest-deep)"
                    : "var(--paper)"
                  : "inherit",
                background: isActive
                  ? dark
                    ? "var(--paper)"
                    : "var(--forest)"
                  : "transparent",
                transition: "background .25s ease, color .25s ease",
              }}
            >
              {it.label}
            </Link>
          );
        })}
        <div
          style={{
            width: 1,
            height: 18,
            background: dark
              ? "rgba(255,255,255,0.16)"
              : "rgba(0,0,0,0.10)",
            margin: "0 4px",
          }}
        />
        <Link
          href="/knowledge"
          style={{
            width: 30,
            height: 30,
            borderRadius: 999,
            border: `1px solid ${dark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.14)"}`,
            display: "grid",
            placeItems: "center",
          }}
          aria-label="Search the index"
        >
          <Search size={13} />
        </Link>
      </div>
    </div>
  );
}
