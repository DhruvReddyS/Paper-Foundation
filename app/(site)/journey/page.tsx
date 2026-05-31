import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PaperState } from "@/components/visuals/PaperState";

export const metadata: Metadata = {
  title: "The Journey · Four Chapters",
  description:
    "Four documentary chapters on India's paper system — Forestry, Lab, Stories, and the lifecycle home page.",
};

const chapters = [
  {
    href: "/",
    n: "01",
    label: "Lifecycle",
    state: "crumple" as const,
    title: "How a sheet of paper comes home.",
    body: "The four-stage scrollytelling arc — Discard, Recover, Blend, Reform — on the home page.",
  },
  {
    href: "/journey/forestry",
    n: "02",
    label: "Forestry",
    state: "recover" as const,
    title: "The Root System.",
    body: "Sky to bedrock. Canopy, trunk, soil horizons, and the mycorrhizal lattice beneath sustainable pulpwood.",
  },
  {
    href: "/journey/lab",
    n: "03",
    label: "Lab",
    state: "blend" as const,
    title: "Modular Fibers.",
    body: "Open-research bento — six fibre studies on policy, material, supply, chemistry, energy and water.",
  },
  {
    href: "/journey/stories",
    n: "04",
    label: "Stories",
    state: "reform" as const,
    title: "Field chapters from a working system.",
    body: "Five horizontally-scrolled chapters — cooperatives, mills, schools, forests, municipalities.",
  },
];

export default function JourneyIndex() {
  return (
    <div className="relative" style={{ background: "var(--paper)" }}>
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0F1B14 0%, #1A2B22 100%)",
          color: "var(--paper)",
          padding: "clamp(110px, 14vw, 160px) 0 100px",
        }}
      >
        <div className="j-grain j-grain--dark" />
        <div className="container relative z-10">
          <div className="flex items-center gap-4 mb-10 flex-wrap">
            <span className="pf-chip pf-chip--dark">THE JOURNEY · INDEX</span>
            <span style={{ width: 48, height: 1, background: "rgba(250,248,245,0.4)" }} />
            <span className="j-mono j-mono--paper">FOUR CHAPTERS · 22 MINUTES</span>
          </div>
          <h1
            className="font-serif"
            style={{
              fontSize: "clamp(2.75rem, 7vw, 6rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              margin: 0,
              maxWidth: 1080,
            }}
          >
            An evidence-led study,<br />
            in <em style={{ color: "#C4956A" }}>four chapters</em>.
          </h1>
          <p
            className="mt-8 max-w-2xl leading-relaxed"
            style={{ fontSize: 18, color: "rgba(250,248,245,0.78)" }}
          >
            Each chapter stands on its own. Read them in order — Lifecycle,
            Forestry, Lab, Stories — or jump straight to the one you came for.
          </p>
        </div>
      </section>

      <section style={{ padding: "clamp(60px, 8vw, 100px) 0 140px" }}>
        <div className="container grid md:grid-cols-2 gap-5 lg:gap-7">
          {chapters.map((c) => (
            <Link
              key={c.n}
              href={c.href}
              className="group lift block rounded-card border border-rule bg-paper shadow-card hover:shadow-card-hover overflow-hidden"
            >
              <div
                className="relative grid grid-cols-[1fr_auto] gap-5 items-center"
                style={{ padding: "clamp(28px, 4vw, 40px)" }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="j-mono text-forest">{c.n}</span>
                    <span style={{ flex: 1, height: 1, background: "var(--rule)" }} />
                    <span className="j-mono">{c.label.toUpperCase()}</span>
                  </div>
                  <h3
                    className="font-serif text-forest-deep group-hover:text-forest transition-colors"
                    style={{
                      fontSize: "clamp(1.5rem, 2.6vw, 2.125rem)",
                      lineHeight: 1.1,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {c.title}
                  </h3>
                  <p className="mt-3 text-ink-2 leading-relaxed max-w-md">
                    {c.body}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-forest text-[14px]">
                    Open the chapter <ArrowRight size={14} />
                  </span>
                </div>
                <div className="hidden sm:block">
                  <PaperState state={c.state} width={180} height={200} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
