"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export function CampaignBanner() {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem("pf-banner-dismissed-v1");
    if (!dismissed) setHidden(false);
  }, []);

  if (hidden) return null;

  return (
    <div className="bg-forest-deep text-paper text-[13px]">
      <div className="container flex items-center justify-between gap-4 py-2.5">
        <p className="leading-snug">
          <span className="hidden sm:inline opacity-80">India Paper Awareness Week, 12–18 May ·{" "}
          </span>
          <Link href="/knowledge" className="underline decoration-copper underline-offset-4 hover:text-copper">
            Read the evidence brief
          </Link>
        </p>
        <button
          aria-label="Dismiss"
          className="opacity-70 hover:opacity-100"
          onClick={() => {
            localStorage.setItem("pf-banner-dismissed-v1", "1");
            setHidden(true);
          }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
