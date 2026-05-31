"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Lightbulb,
  Library,
  Inbox,
  Mail,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/articles", label: "Articles", icon: FileText },
  { href: "/admin/myths", label: "Myths", icon: Lightbulb },
  { href: "/admin/resources", label: "Resources", icon: Library },
  { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
  { href: "/admin/subscribers", label: "Subscribers", icon: Mail },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex w-60 shrink-0 bg-admin-sidebar text-paper flex-col h-screen sticky top-0">
      <div className="px-5 py-6 border-b border-white/5">
        <Link href="/admin" className="flex items-center gap-2.5 text-paper">
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
            <rect x="3" y="3" width="22" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M9 9h10M9 13h10M9 17h6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span className="font-serif text-[15px] tracking-tight leading-none">
            Paper Foundation
          </span>
        </Link>
        <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-paper/40">Admin</p>
      </div>
      <nav className="flex-1 px-3 py-5 space-y-0.5">
        {nav.map((n) => {
          const active = n.exact ? pathname === n.href : pathname.startsWith(n.href);
          return (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "flex items-center gap-3 h-10 px-3 rounded-[8px] text-[14px] transition-colors",
                active
                  ? "bg-forest text-paper"
                  : "text-paper/75 hover:text-paper hover:bg-white/5"
              )}
            >
              <n.icon size={16} />
              {n.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-white/5">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 h-10 px-3 rounded-[8px] text-[14px] text-paper/70 hover:text-paper hover:bg-white/5 transition-colors"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
