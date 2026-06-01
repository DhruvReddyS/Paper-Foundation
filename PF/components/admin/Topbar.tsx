"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const titles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/articles": "Articles",
  "/admin/articles/new": "New Article",
  "/admin/myths": "Myths",
  "/admin/myths/new": "New Myth",
  "/admin/resources": "Resources",
  "/admin/resources/new": "New Resource",
  "/admin/inquiries": "Inquiries",
  "/admin/subscribers": "Subscribers",
};

export function Topbar({ email }: { email?: string | null }) {
  const pathname = usePathname();
  let title = titles[pathname];
  if (!title) {
    if (pathname.startsWith("/admin/articles/")) title = "Edit Article";
    else if (pathname.startsWith("/admin/myths/")) title = "Edit Myth";
    else if (pathname.startsWith("/admin/resources/")) title = "Edit Resource";
    else title = "Admin";
  }

  return (
    <header className="h-16 bg-admin-bg border-b border-admin-border flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <h1 className="text-[15px] font-medium text-ink">{title}</h1>
        <Link href="/" target="_blank" className="text-[12px] text-ink-2 hover:text-forest">
          View site ↗
        </Link>
      </div>
      <div className="flex items-center gap-3 text-[13px] text-ink-2">
        <span>{email || "Admin"}</span>
        <div className="w-7 h-7 rounded-full bg-forest text-paper grid place-items-center text-[12px] font-medium">
          {(email || "A")[0]?.toUpperCase()}
        </div>
      </div>
    </header>
  );
}
