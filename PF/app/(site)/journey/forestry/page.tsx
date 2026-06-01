import type { Metadata } from "next";
import { RootSystemDiagram } from "@/components/visuals/RootSystemDiagram";
import { FiberThread } from "@/components/visuals/FiberThread";

export const metadata: Metadata = {
  title: "Forestry · The Root System",
  description:
    "What sustains pulpwood — the canopy, the trunk, the soil layers, and the mycorrhizal network beneath.",
};

const facts: Array<[string, string]> = [
  ["~70%", "of Indian fibre intake is agri-residue + farm forestry"],
  ["72 yr", "mean rotation in a working forest"],
  ["1,300 km / m³", "mycorrhizal hyphal length in healthy soil"],
  ["+38%", "soil-carbon retention vs. monoculture baseline"],
];

const acts: Array<[string, string, string]> = [
  [
    "Y 00–05",
    "Establish",
    "Native saplings co-planted with cover crop. Soil chemistry mapped at 12 sites per hectare.",
  ],
  [
    "Y 05–25",
    "Tend",
    "Thinning at year 8 and 15. Continuous canopy cover maintained above 60%.",
  ],
  [
    "Y 25–55",
    "Mature",
    "Selective harvest of upper canopy only. Understory and biodiversity audits annually.",
  ],
  [
    "Y 55–72",
    "Renew",
    "Final harvest in coupes. Replanting begins year 71. Stand carbon stocked: ~412 t / ha.",
  ],
];

export default function ForestryPage() {
  return (
    <div className="relative" style={{ background: "#F2EDE7" }}>
      <FiberThread height={4400} opacity={0.18} side="left" offset={64} amplitude={20} />

      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #E8E0D5 0%, #F2EDE7 80%, #ECE5DC 100%)",
          padding: "clamp(110px, 14vw, 160px) 0 80px",
        }}
      >
        <div className="j-grain" style={{ opacity: 0.45 }} />
        <div className="container relative z-10">
          <div className="flex items-center gap-4 mb-12 flex-wrap">
            <span className="j-pill">CHAPTER II · FORESTRY</span>
            <span style={{ width: 64, height: 1, background: "var(--rule)" }} />
            <span className="j-mono">FILED 04.2025 · UPDATED 02.2026</span>
          </div>
          <h1
            className="font-serif text-forest-deep"
            style={{
              fontSize: "clamp(3.5rem, 8.5vw, 7.5rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
              margin: 0,
              maxWidth: 1180,
            }}
          >
            The forest is not<br />
            what you see.<br />
            <em style={{ color: "var(--forest)" }}>It is what holds.</em>
          </h1>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-12 lg:gap-20 mt-16 items-end">
            <p className="text-body-lg max-w-3xl text-ink">
              Sustainable pulp does not grow from a tree alone. It grows from
              the soil chemistry beneath it, the mycorrhizal lattice that ties
              one tree to its neighbours, and the rotational discipline that
              governs both. This page reads from the canopy down — through the
              trunk, through the floor, and into the system that decides whether
              a forest stays a forest.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {facts.map(([v, l]) => (
                <div key={l} className="pt-3.5 border-t border-rule">
                  <div
                    className="font-serif text-forest"
                    style={{ fontSize: 30, lineHeight: 1 }}
                  >
                    {v}
                  </div>
                  <div className="j-mono mt-2">{l.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RootSystemDiagram />

      <section
        className="relative overflow-hidden paper-grain dark-grain"
        style={{
          background: "var(--forest-deep)",
          color: "var(--paper)",
          padding: "100px 0 140px",
        }}
      >
        <div className="container relative z-10">
          <div className="j-mono" style={{ color: "rgba(250,248,245,0.6)", marginBottom: 24 }}>
            SEVENTY-TWO YEARS, IN FOUR ACTS
          </div>
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 980,
              margin: 0,
            }}
          >
            A working forest is a slow contract<br /> between three generations.
          </h2>
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20 relative"
          >
            <div
              className="hidden lg:block"
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 18,
                height: 1,
                background: "rgba(250,248,245,0.18)",
              }}
            />
            {acts.map(([yr, title, body]) => (
              <div key={yr} className="relative">
                <div
                  className="hidden lg:block"
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: "#C4956A",
                    position: "absolute",
                    top: 14,
                    left: 0,
                    boxShadow: "0 0 0 4px rgba(196,149,106,0.18)",
                  }}
                />
                <div
                  className="j-mono"
                  style={{ color: "#C4956A", paddingTop: 40, marginBottom: 14 }}
                >
                  {yr}
                </div>
                <div
                  className="font-serif"
                  style={{ fontSize: 28, lineHeight: 1.1, marginBottom: 14 }}
                >
                  {title}
                </div>
                <p
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.7,
                    color: "rgba(250,248,245,0.74)",
                  }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
