"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const links = [
  { href: "/journey/forestry", label: "Forestry" },
  { href: "/journey/lab", label: "Lab" },
  { href: "/journey/stories", label: "Stories" },
  { href: "/knowledge", label: "Knowledge" },
  { href: "/myths", label: "Myths" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300",
        scrolled
          ? "bg-paper/85 backdrop-blur-md border-b border-rule/70"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container flex h-16 md:h-[72px] items-center justify-between">
        <Logo />
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative text-[14px] tracking-[0.01em] px-3 py-2 transition-colors group",
                  active ? "text-forest-deep" : "text-ink hover:text-forest"
                )}
              >
                <span className="relative z-10">{l.label}</span>
                <span
                  className="absolute left-3 right-3 bottom-1 h-[1.5px] bg-forest origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ transform: active ? "scaleX(1)" : undefined }}
                />
                {active && (
                  <motion.span
                    layoutId="navIndicatorBg"
                    className="absolute inset-0 bg-paper-2 rounded-[6px] -z-0"
                    transition={{ type: "spring", stiffness: 250, damping: 25 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <Button href="/contact" variant="secondary" size="sm">
            Contact
          </Button>
        </div>
        <button
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-[8px] text-forest-deep"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-rule bg-paper"
          >
            <nav className="container py-4 flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="py-3 text-[15px] border-b border-rule/60 last:border-0"
                >
                  {l.label}
                </Link>
              ))}
              <div className="pt-4">
                <Button href="/contact" variant="primary" size="md" className="w-full">
                  Contact
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
