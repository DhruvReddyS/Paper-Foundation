import { connectDB } from "@/lib/db";
import { ArticleModel } from "@/lib/models";
import { KnowledgeHub } from "@/components/site/KnowledgeHub";
import { MeshGradient } from "@/components/ui/MeshGradient";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Knowledge Hub",
  description:
    "Source-cited articles on paper, recycling, circularity, and the Indian paper ecosystem — the editorial library of Paper Foundation.",
};

async function getArticles() {
  try {
    await connectDB();
    const docs = await ArticleModel.find({ status: "published" })
      .sort({ featured: -1, publishedAt: -1 })
      .lean();
    return docs.map((d) => ({
      _id: String(d._id),
      slug: d.slug,
      title: d.title,
      excerpt: d.excerpt,
      category: d.category,
      author: d.author,
      publishedAt: d.publishedAt ? d.publishedAt.toString() : undefined,
      coverImage: d.coverImage || undefined,
      readingTimeMin: d.readingTimeMin,
      quickRead: d.quickRead,
      featured: d.featured,
      tags: d.tags,
      references:
        d.references?.map((r: { title: string }) => ({ title: r.title })) || [],
    }));
  } catch {
    return [];
  }
}

export default async function KnowledgePage() {
  const articles = await getArticles();
  const published = articles.length;
  return (
    <>
      <section className="relative overflow-hidden paper-grain border-b border-rule">
        <MeshGradient
          palette={[
            "rgba(45,95,62,0.28)",
            "rgba(139,157,119,0.36)",
            "rgba(196,149,106,0.28)",
          ]}
          opacity={0.4}
        />
        <div
          className="container relative z-10"
          style={{ padding: "clamp(110px, 14vw, 160px) 0 clamp(60px, 8vw, 90px)" }}
        >
          <div className="flex items-center gap-4 mb-9 flex-wrap">
            <span className="j-pill">EDITORIAL · KNOWLEDGE HUB</span>
            <span style={{ width: 64, height: 1, background: "var(--rule)" }} />
            <span className="j-mono">
              {String(published).padStart(2, "0")} ARTICLES · ALL CC BY 4.0
            </span>
          </div>
          <h1
            className="font-serif text-forest-deep"
            style={{
              fontSize: "clamp(2.75rem, 7.5vw, 6.5rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
              margin: 0,
            }}
          >
            Read what the research<br />
            <em style={{ color: "var(--forest)" }}>actually says</em>.
          </h1>
          <div className="mt-12 grid lg:grid-cols-[1fr_360px] gap-12 lg:gap-20 items-end">
            <p
              className="text-body-lg leading-relaxed"
              style={{ maxWidth: 720, color: "var(--ink)" }}
            >
              The editorial library of Paper Foundation. Long-form, source-cited
              articles on paper, recycling, forestry, circularity and the
              Indian paper ecosystem. Every claim links to its primary source —
              FAO, CPPRI, IPMA, MoEFCC, TERI, EPA WARM, CEPI, peer-reviewed
              journals. Every correction is dated and visible.
            </p>
            <div className="grid grid-cols-2 gap-5">
              {[
                ["Inline", "Source-trail citations"],
                ["Public", "Corrections policy"],
                ["CC BY 4.0", "Open republication"],
                ["JSON-LD", "Schema-tagged"],
              ].map(([v, l]) => (
                <div key={l} className="pt-3 border-t border-rule">
                  <div
                    className="font-serif text-forest"
                    style={{ fontSize: 22, lineHeight: 1.1 }}
                  >
                    {v}
                  </div>
                  <div className="j-mono mt-1.5">{l.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Editorial board strip */}
        <div className="border-t border-rule" style={{ background: "var(--paper-2)" }}>
          <div className="container py-7 grid sm:grid-cols-3 gap-7">
            {[
              [
                "01 · QUESTION",
                "Each article begins with a question — from readers, classrooms, mills, or policy desks.",
              ],
              [
                "02 · SOURCE",
                "We gather primary data and read it ourselves. No press releases. No second-hand summaries.",
              ],
              [
                "03 · REVIEW",
                "Every article is read by at least one external reader before publication — often someone whose view it might challenge.",
              ],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="j-mono text-forest mb-2">{k}</div>
                <p className="text-ink leading-relaxed" style={{ fontSize: 14.5 }}>
                  {v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KnowledgeHub articles={articles} />
    </>
  );
}
