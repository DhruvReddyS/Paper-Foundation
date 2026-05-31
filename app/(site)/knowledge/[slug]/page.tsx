import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import { ArticleModel, type Article } from "@/lib/models";
import { categoryLabel, formatDate } from "@/lib/utils";
import { ReadingProgress } from "@/components/site/ReadingProgress";
import { ArticleBody } from "@/components/site/ArticleBody";
import { ArticleCard } from "@/components/site/ArticleCard";
import { ArticleHero } from "@/components/site/ArticleHero";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let doc;
  try {
    await connectDB();
    doc = await ArticleModel.findOne({ slug, status: "published" }).lean();
  } catch {
    doc = null;
  }
  if (!doc) return { title: "Article not found" };
  return {
    title: doc.seo?.title || doc.title,
    description: doc.seo?.description || doc.excerpt,
    openGraph: {
      title: doc.title,
      description: doc.excerpt,
      type: "article",
      images:
        doc.seo?.ogImage || doc.coverImage?.url
          ? [doc.seo?.ogImage || doc.coverImage?.url || ""]
          : [],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let doc: Article | null = null;
  let related: Article[] = [];
  try {
    await connectDB();
    doc = (await ArticleModel.findOne({ slug, status: "published" }).lean()) as Article | null;
    if (doc) {
      related = (await ArticleModel.find({
        status: "published",
        _id: { $ne: doc._id },
        category: doc.category,
      })
        .limit(3)
        .lean()) as Article[];
    }
  } catch {
    notFound();
  }
  if (!doc) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: doc.title,
    description: doc.excerpt,
    author: { "@type": "Organization", name: doc.author || "Paper Foundation" },
    datePublished: doc.publishedAt,
    publisher: { "@type": "Organization", name: "Paper Foundation" },
    image: doc.coverImage?.url || undefined,
  };

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <ArticleHero
          title={doc.title}
          excerpt={doc.excerpt}
          category={doc.category}
          author={doc.author}
          publishedAt={doc.publishedAt || undefined}
          readingTimeMin={doc.readingTimeMin}
          coverImage={doc.coverImage || undefined}
          quickRead={doc.quickRead}
          refCount={doc.references?.length || 0}
        />

        {/* Reading body with sticky TOC + margin notes */}
        <div
          className="container max-w-6xl"
          style={{ padding: "clamp(48px, 8vw, 96px) 0" }}
        >
          <ArticleBody html={doc.body} references={doc.references || []} />
        </div>

        {/* References */}
        {doc.references && doc.references.length > 0 && (
          <section
            className="border-t border-rule"
            style={{ background: "var(--paper-2)", padding: "clamp(60px, 8vw, 100px) 0" }}
          >
            <div className="container max-w-3xl">
              <div className="j-mono mb-4 text-forest">REFERENCES · {doc.references.length}</div>
              <h2
                className="font-serif text-forest-deep mb-9"
                style={{
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.015em",
                }}
              >
                Where this article&apos;s evidence comes from.
              </h2>
              <ol className="space-y-5 text-[14px]">
                {doc.references.map(
                  (r: { title: string; org: string; url: string; note?: string }, i: number) => (
                    <li
                      key={i}
                      className="grid grid-cols-[3rem_1fr] gap-4 border-b border-rule pb-5 last:border-0"
                    >
                      <span className="font-mono text-forest text-[13px] pt-1">
                        [{String(i + 1).padStart(2, "0")}]
                      </span>
                      <div>
                        <p className="text-ink font-medium leading-snug">{r.title}</p>
                        <p className="text-ink-2 mt-1 text-[13px]">{r.org}</p>
                        {r.note && (
                          <p className="text-ink-2 mt-1.5 italic text-[13px]">{r.note}</p>
                        )}
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-forest underline text-[13px] mt-2 inline-block break-all"
                        >
                          {r.url}
                        </a>
                      </div>
                    </li>
                  )
                )}
              </ol>
            </div>
          </section>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section
            className="border-t border-rule"
            style={{ padding: "clamp(60px, 8vw, 100px) 0" }}
          >
            <div className="container max-w-6xl">
              <div className="flex items-end justify-between mb-9 flex-wrap gap-4">
                <div>
                  <div className="j-mono mb-3 text-forest">CONTINUE READING</div>
                  <h2
                    className="font-serif text-forest-deep"
                    style={{
                      fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                      lineHeight: 1.08,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    More from <em className="text-forest">{categoryLabel(doc.category)}</em>.
                  </h2>
                </div>
                <Link href="/knowledge" className="editorial-link text-forest text-[14px]">
                  All articles →
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <ArticleCard
                    key={String(r._id)}
                    a={{
                      slug: r.slug,
                      title: r.title,
                      excerpt: r.excerpt,
                      category: r.category,
                      publishedAt: r.publishedAt || undefined,
                      coverImage: r.coverImage || undefined,
                      readingTimeMin: r.readingTimeMin,
                    }}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* End cap */}
        <section
          className="relative overflow-hidden paper-grain dark-grain"
          style={{
            background: "#0F1B14",
            color: "var(--paper)",
            padding: "clamp(80px, 12vw, 140px) 0",
          }}
        >
          <div className="container max-w-4xl relative z-10">
            <span className="j-mono" style={{ color: "rgba(250,248,245,0.6)" }}>
              END · ARTICLE
            </span>
            <h3
              className="font-serif mt-5"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Built from <em style={{ color: "#C4956A" }}>primary sources</em>,<br />
              corrected in public.
            </h3>
            <p
              className="mt-7 max-w-2xl"
              style={{
                fontSize: 17,
                lineHeight: 1.7,
                color: "rgba(250,248,245,0.78)",
              }}
            >
              Spotted a missing citation, an outdated figure, or a misframed
              claim? Write to the corrections desk. We respond within five
              working days and post dated correction notes on the article above.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/contact?type=general"
                className="inline-flex items-center gap-2 px-6 h-12 rounded-[8px] bg-paper text-forest-deep hover:bg-paper-2 transition-colors text-[14px] font-medium"
              >
                Submit a correction
              </Link>
              <Link
                href="/#test-assumptions"
                className="inline-flex items-center gap-2 px-6 h-12 rounded-[8px] border text-[14px] font-medium"
                style={{
                  borderColor: "rgba(250,248,245,0.3)",
                  color: "var(--paper)",
                }}
              >
                Test your assumptions
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
