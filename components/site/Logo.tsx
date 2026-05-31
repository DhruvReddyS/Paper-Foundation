import Link from "next/link";
import Image from "next/image";

export function Logo({ tone = "forest" }: { tone?: "forest" | "paper" }) {
  const text = tone === "paper" ? "text-paper" : "text-forest-deep";
  return (
    <Link
      href="/"
      aria-label="Paper Foundation home"
      className={`group inline-flex items-center gap-2.5 ${text}`}
    >
      <span className="relative w-8 h-8 shrink-0">
        <Image
          src="/brand/logo.png"
          alt="Paper Foundation"
          fill
          sizes="32px"
          className="object-contain"
          priority
        />
      </span>
      <span className="font-serif text-[17px] tracking-tight leading-none">
        Paper Foundation
      </span>
    </Link>
  );
}
