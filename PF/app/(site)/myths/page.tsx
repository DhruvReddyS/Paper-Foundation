import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import { MythModel } from "@/lib/models";
import { MythsImmersive } from "@/components/site/MythsImmersive";
import { MeshGradient } from "@/components/ui/MeshGradient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Myths vs Facts",
  description:
    "Common assumptions about paper, recycling, and sustainability — and what the evidence actually shows. A growing library of evidence-backed corrections.",
};

async function getMyths() {
  try {
    await connectDB();
    const docs = await MythModel.find({ status: "published" })
      .sort({ featured: -1, createdAt: -1 })
      .lean();
    return docs.map((d) => ({
      _id: String(d._id),
      slug: d.slug,
      myth: d.myth,
      fact: d.fact,
      explanation: d.explanation,
      category: d.category,
      sources: d.sources || [],
    }));
  } catch {
    return [];
  }
}

export default async function MythsPage() {
  const myths = await getMyths();
  return (
    <>
      {/* Cinematic hero */}
      <section className="relative overflow-hidden paper-grain">
        <MeshGradient
          palette={[
            "rgba(45,95,62,0.32)",
            "rgba(196,149,106,0.35)",
            "rgba(139,157,119,0.38)",
          ]}
          opacity={0.45}
        />
        <div
          className="container relative z-10 max-w-5xl"
          style={{ padding: "clamp(110px, 14vw, 160px) 0 clamp(60px, 8vw, 100px)" }}
        >
          <div className="flex items-center gap-4 mb-9 flex-wrap">
            <span className="j-pill">CHAPTER · MYTHS vs FACTS</span>
            <span style={{ width: 64, height: 1, background: "var(--rule)" }} />
            <span className="j-mono">
              {String(myths.length).padStart(2, "0")} ENTRIES · UPDATED MONTHLY
            </span>
          </div>
          <h1
            className="font-serif text-forest-deep"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
              margin: 0,
            }}
          >
            What people say.<br />
            <span
              style={{
                fontStyle: "italic",
                color: "var(--forest)",
                position: "relative",
                display: "inline-block",
              }}
            >
              What the evidence shows
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: "-0.05em",
                  height: 8,
                  width: "100%",
                  background: "var(--copper)",
                  opacity: 0.35,
                  zIndex: -1,
                }}
              />
            </span>
            .
          </h1>
          <div className="mt-12 grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-20 items-end">
            <p
              className="text-body-lg leading-relaxed"
              style={{ maxWidth: 720, color: "var(--ink)" }}
            >
              Public conversations about paper, recycling, forestry, and
              circularity are shaped by intuitions that often outlive the
              evidence. This is our living archive of common assumptions paired
              with what credible research, Indian industry data, and primary
              sources actually report.
            </p>
            <div className="grid grid-cols-2 gap-5">
              {[
                ["~30%", "India recovery rate"],
                ["~70%", "agri-residue + farm-forestry"],
                ["5–7×", "cycles per fibre"],
                ["24+", "myths catalogued"],
              ].map(([v, l]) => (
                <div key={l} className="pt-3 border-t border-rule">
                  <div
                    className="font-serif text-forest"
                    style={{ fontSize: 26, lineHeight: 1 }}
                  >
                    {v}
                  </div>
                  <div className="j-mono mt-1.5">{l.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How we work strip */}
        <div
          className="border-t border-rule"
          style={{ background: "var(--paper-2)" }}
        >
          <div className="container py-7 grid sm:grid-cols-3 gap-7">
            {[
              [
                "01 · CLAIM",
                "We start with a real, widely-repeated claim — heard in classrooms, policy papers, or popular media.",
              ],
              [
                "02 · CHECK",
                "We test it against the strongest primary source we can find. Where data is contested, we say so.",
              ],
              [
                "03 · CORRECT",
                "If we get it wrong, we say so on this page with the date of correction. No silent edits.",
              ],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="j-mono text-forest mb-2">{k}</div>
                <p
                  className="text-ink leading-relaxed"
                  style={{ fontSize: 14.5 }}
                >
                  {v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MythsImmersive myths={myths} />
    </>
  );
}
