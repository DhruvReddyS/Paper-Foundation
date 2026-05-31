import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { categoryLabel, formatDate } from "@/lib/utils";
import { Tilt } from "@/components/ui/Tilt";

export type ArticleCardData = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author?: string;
  publishedAt?: string | Date;
  coverImage?: { url?: string; alt?: string };
  readingTimeMin?: number;
  quickRead?: boolean;
  references?: { title: string }[];
};

export function ArticleCard({ a, variant = "default" }: { a: ArticleCardData; variant?: "default" | "large" | "compact" }) {
  if (variant === "large") {
    return (
      <Tilt intensity={4} className="group block">
        <Link
          href={`/knowledge/${a.slug}`}
          className="lift block rounded-card bg-paper border border-rule overflow-hidden shadow-card hover:shadow-card-hover"
        >
        <div className="aspect-[16/9] bg-paper-2 relative overflow-hidden">
          {a.coverImage?.url ? (
            <Image
              src={a.coverImage.url}
              alt={a.coverImage.alt || a.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <Placeholder />
          )}
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge tone="forest">{categoryLabel(a.category)}</Badge>
            {a.quickRead && <Badge tone="copper">Quick Read</Badge>}
          </div>
        </div>
        <div className="p-7">
          <h3 className="font-serif text-[1.6rem] leading-snug text-forest-deep tracking-tight group-hover:text-forest transition-colors">
            {a.title}
          </h3>
          <p className="mt-3 text-ink/80 leading-relaxed line-clamp-3">{a.excerpt}</p>
          <div className="mt-5 flex items-center gap-3 text-[12px] uppercase tracking-[0.16em] text-ink-2">
            <span>{a.readingTimeMin ?? 5} min read</span>
            <span className="w-1 h-1 rounded-full bg-rule" />
            <span>{formatDate(a.publishedAt)}</span>
            {a.references && a.references.length > 0 && (
              <>
                <span className="w-1 h-1 rounded-full bg-rule" />
                <span>{a.references.length} sources</span>
              </>
            )}
          </div>
        </div>
        </Link>
      </Tilt>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/knowledge/${a.slug}`}
        className="group flex gap-4 py-4 border-b border-rule last:border-0"
      >
        <div className="w-24 h-24 shrink-0 bg-paper-2 rounded-card relative overflow-hidden">
          {a.coverImage?.url ? (
            <Image src={a.coverImage.url} alt={a.coverImage.alt || a.title} fill className="object-cover" />
          ) : (
            <Placeholder small />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.16em] text-sage">{categoryLabel(a.category)}</p>
          <h4 className="mt-1 font-serif text-[1.05rem] leading-snug text-forest-deep group-hover:text-forest transition-colors line-clamp-2">
            {a.title}
          </h4>
          <p className="mt-1 text-[12px] text-ink-2">{a.readingTimeMin ?? 5} min · {formatDate(a.publishedAt)}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/knowledge/${a.slug}`}
      className="group lift block rounded-card bg-paper border border-rule overflow-hidden shadow-card hover:shadow-card-hover"
    >
      <div className="aspect-[16/10] bg-paper-2 relative overflow-hidden">
        {a.coverImage?.url ? (
          <Image src={a.coverImage.url} alt={a.coverImage.alt || a.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        ) : (
          <Placeholder />
        )}
        <Badge tone="forest" className="absolute top-3 left-3">{categoryLabel(a.category)}</Badge>
      </div>
      <div className="p-6">
        <h3 className="font-serif text-[1.25rem] leading-snug text-forest-deep tracking-tight group-hover:text-forest transition-colors">
          {a.title}
        </h3>
        <p className="mt-2.5 text-[14px] text-ink/80 leading-relaxed line-clamp-3">{a.excerpt}</p>
        <div className="mt-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-ink-2">
          <span>{a.readingTimeMin ?? 5} min</span>
          <span className="w-1 h-1 rounded-full bg-rule" />
          <span>{formatDate(a.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}

function Placeholder({ small = false }: { small?: boolean }) {
  return (
    <svg viewBox="0 0 400 240" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <rect width="400" height="240" fill="#F2EDE7" />
      <g opacity="0.6">
        <circle cx="200" cy="120" r={small ? 30 : 60} fill="none" stroke="#2D5F3E" strokeWidth="1" />
        <circle cx="200" cy="120" r={small ? 18 : 38} fill="none" stroke="#8B9D77" strokeWidth="1" />
        <polygon points="160,80 260,70 280,160 180,180" fill="#8B9D77" opacity="0.25" />
        <polygon points="180,100 280,90 300,180 200,200" fill="#2D5F3E" opacity="0.15" />
      </g>
    </svg>
  );
}
