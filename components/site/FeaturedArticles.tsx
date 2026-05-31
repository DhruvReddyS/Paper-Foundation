import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ArticleCard, type ArticleCardData } from "./ArticleCard";

export function FeaturedArticles({ articles }: { articles: ArticleCardData[] }) {
  if (articles.length === 0) return null;
  const [lead, ...rest] = articles;

  return (
    <section className="section-y">
      <div className="container">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <p className="text-caption uppercase tracking-[0.18em] text-sage mb-3">From the Knowledge Hub</p>
            <h2 className="font-serif text-h2 md:text-[2.5rem] text-forest-deep leading-tight">
              Read the evidence.
            </h2>
          </div>
          <Link href="/knowledge" className="text-[14px] editorial-link text-forest">
            All articles →
          </Link>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
          <Reveal><ArticleCard a={lead} variant="large" /></Reveal>
          <div className="space-y-6">
            {rest.slice(0, 2).map((a, i) => (
              <Reveal key={a.slug} delay={0.1 * (i + 1)}>
                <ArticleCard a={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
