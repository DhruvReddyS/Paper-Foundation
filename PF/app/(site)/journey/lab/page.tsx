import type { Metadata } from "next";
import { FiberCard, type Fiber } from "@/components/site/FiberCard";
import { FiberThread } from "@/components/visuals/FiberThread";

export const metadata: Metadata = {
  title: "Lab · Modular Fibers",
  description:
    "Open research at Paper Foundation — modular fibres of evidence on policy, material, supply, chemistry, energy and water.",
};

const fibers: Fiber[] = [
  {
    id: "F-001",
    cat: "POLICY",
    title: "Mandatory recovered-content thresholds in office paper",
    body: "A panel study of 14 procurement frameworks finds that minimum-recovered-content rules — when paired with auditable supply chains — reduce virgin-fibre demand by 22–34% within three procurement cycles.",
    m1: "−28%",
    m1l: "virgin demand",
    m2: "14",
    m2l: "frameworks reviewed",
    year: "2025",
    status: "OPEN",
  },
  {
    id: "F-002",
    cat: "MATERIAL",
    title: "Fibre length retention across recycling cycles",
    body: "Recovered cellulose loses 6–9% of mean fibre length per cycle under standard pulping. Mild enzymatic refining can recover up to 4% per cycle and extend functional life to seven or more generations.",
    m1: "5–7×",
    m1l: "reuse cycles",
    m2: "−9%",
    m2l: "length / cycle",
    year: "2025",
    status: "OPEN",
  },
  {
    id: "F-003",
    cat: "SUPPLY",
    title: "Informal-sector wage economics in dry-waste recovery",
    body: "A 14-city household survey of 6,300 wastepickers and aggregators measured income shares from paper streams. Paper alone contributes 42% of mean monthly earnings; instability is highest in tier-3 cities.",
    m1: "6,300",
    m1l: "respondents",
    m2: "42%",
    m2l: "income share",
    year: "2024",
    status: "OPEN",
  },
  {
    id: "F-004",
    cat: "CHEMICAL",
    title: "Chlorine-free brightening at municipal scale",
    body: "Three-mill pilot of totally-chlorine-free bleaching using ozone + hydrogen peroxide. Effluent AOX falls below detection limits while ISO brightness holds within 1.2 points of the TCF benchmark.",
    m1: "−96%",
    m1l: "AOX effluent",
    m2: "82.4",
    m2l: "ISO brightness",
    year: "2025",
    status: "OPEN",
  },
  {
    id: "F-005",
    cat: "ENERGY",
    title: "Black-liquor cogeneration efficiency map",
    body: "Twelve-mill instrumented study of black-liquor energy recovery. Modern recovery boilers achieve 64–72% thermal efficiency; legacy boilers (n=5) operate at 41% mean with 4× higher SO₂ output.",
    m1: "72%",
    m1l: "recovery η",
    m2: "5",
    m2l: "legacy units",
    year: "2024",
    status: "CLOSED",
  },
  {
    id: "F-006",
    cat: "WATER",
    title: "Closed-loop water systems in writing-paper mills",
    body: "Survey of nine mills operating closed-loop water systems. Mean freshwater intake reduced from 38 to 6.4 m³ per tonne paper, with no measurable impact on machine runnability or sheet strength.",
    m1: "6.4",
    m1l: "m³ / tonne",
    m2: "−83%",
    m2l: "vs. baseline",
    year: "2026",
    status: "OPEN",
  },
];

const filters = ["All", "Policy", "Material", "Chemical", "Energy", "Water", "Supply"];

export default function LabPage() {
  return (
    <div className="relative" style={{ background: "var(--paper)", minHeight: 2400 }}>
      <FiberThread height={2400} opacity={0.18} side="right" offset={64} amplitude={18} />

      <section
        className="relative overflow-hidden"
        style={{ padding: "clamp(110px, 14vw, 160px) 0 60px" }}
      >
        <div className="j-grain" style={{ opacity: 0.35 }} />
        <div className="container relative z-10">
          <div className="flex items-center gap-4 mb-12 flex-wrap">
            <span className="j-pill j-pill--solid">CIRCULARITY LAB</span>
            <span style={{ width: 64, height: 1, background: "var(--rule)" }} />
            <span className="j-mono">06 ACTIVE STUDIES · 04 PEER REVIEWED</span>
          </div>
          <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-12 lg:gap-24 items-end">
            <h1
              className="font-serif text-forest-deep"
              style={{
                fontSize: "clamp(3rem, 7vw, 6rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
                margin: 0,
              }}
            >
              Each finding is a fibre.{" "}
              <em style={{ color: "var(--forest)" }}>Together,</em> they form a
              sheet.
            </h1>
            <div>
              <p className="text-body-lg text-ink-2">
                The Lab is the open research hub of the Foundation. Studies are
                versioned, peer-reviewed, and released into the public domain.
                Hover any fibre to see its full method, dataset and citations.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {filters.map((t, i) => (
                  <button
                    key={t}
                    className={i === 0 ? "j-pill j-pill--solid" : "j-pill"}
                    type="button"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative" style={{ padding: "40px 0 80px" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gridAutoRows: "minmax(280px, auto)",
              gap: 20,
            }}
            className="lg:grid hidden"
          >
            {fibers.map((f, i) => (
              <FiberCard
                key={f.id}
                f={f}
                span={i === 0 ? 4 : i === 1 ? 2 : i === 3 ? 3 : i === 5 ? 3 : 2}
                tall={i === 0 || i === 3}
              />
            ))}
          </div>
          <div className="grid lg:hidden grid-cols-1 md:grid-cols-2 gap-5">
            {fibers.map((f) => (
              <FiberCard key={f.id} f={f} span={1} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative border-t border-rule"
        style={{ background: "var(--paper-2)", padding: "80px 0 140px" }}
      >
        <div className="container">
          <div className="j-mono mb-5">METHOD · OPEN BY DEFAULT</div>
          <h2
            className="font-serif text-forest-deep"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 900,
              margin: 0,
            }}
          >
            Every fibre in this lab carries its working notes — raw data, code,
            dissent, and date of release.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {[
              ["Datasets", "CSV + Parquet"],
              ["Notebooks", "Quarto + R"],
              ["Review", "Public, ≥ 2 reviewers"],
              ["License", "CC BY 4.0"],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-rule pt-4">
                <div className="j-mono mb-2">{k.toUpperCase()}</div>
                <div
                  className="font-serif"
                  style={{ fontSize: 26, lineHeight: 1.2 }}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
