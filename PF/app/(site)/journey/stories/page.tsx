import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Stories · Field Chapters",
  description:
    "Five field chapters from a working paper system — cooperatives, mills, schools, forests and municipalities.",
};

type Story = {
  ch: string;
  loc: string;
  year: string;
  title: string;
  lead: string;
  metric: string;
  mlabel: string;
  accent: string;
  bg: string;
  ink: "light" | "dark";
};

const stories: Story[] = [
  {
    ch: "I",
    loc: "Muzaffarnagar, UP",
    year: "2022 → 2025",
    title:
      "A cooperative of 412 kabadiwalas builds the first formal aggregation depot west of Delhi.",
    lead: "When Reema Devi inherited her father's scrap business in 2019, she ran it from a single shed. By 2025 her cooperative aggregates 38 tonnes of paper a day for three regional mills.",
    metric: "38 t/day",
    mlabel: "recovered fibre throughput",
    accent: "#C4956A",
    bg: "#1F2A22",
    ink: "light",
  },
  {
    ch: "II",
    loc: "Coimbatore, TN",
    year: "2023 → 2026",
    title:
      "A sixty-year-old kraft mill closes its water loop and becomes a regional anchor.",
    lead: "Sundaram Papers, founded 1964, had been drawing 3.1 ML/day from a depleted aquifer. Over twenty-eight months the mill rebuilt its water system and now draws less than 0.5 ML/day.",
    metric: "−84%",
    mlabel: "freshwater intake reduction",
    accent: "#8B9D77",
    bg: "#F2EDE7",
    ink: "dark",
  },
  {
    ch: "III",
    loc: "Khordha, Odisha",
    year: "2021 → 2026",
    title:
      "A schools programme rewrites the textbook economy of one district.",
    lead: "Across 312 government schools, end-of-year textbooks are now collected, repaired, rebound, and returned. The pilot saved an estimated 41 tonnes of new pulp in its first three years.",
    metric: "312",
    mlabel: "schools, one district",
    accent: "#2D5F3E",
    bg: "#FAF8F5",
    ink: "dark",
  },
  {
    ch: "IV",
    loc: "Idukki, Kerala",
    year: "2020 → ongoing",
    title: "A 72-year forestry rotation begins its 17th cycle.",
    lead: "The Idukki working-forest plan is the oldest continuous rotational forestry record in southern India. Its 2024 audit found soil carbon up 38% on baseline, with bird diversity within 4% of the adjacent reserve.",
    metric: "+38%",
    mlabel: "soil carbon vs. baseline",
    accent: "#C4956A",
    bg: "#244D32",
    ink: "light",
  },
  {
    ch: "V",
    loc: "Pune, Maharashtra",
    year: "2024 → ongoing",
    title:
      "A municipal corporation rebuilds its waste contract around paper.",
    lead: "Pune Municipal Corporation's new contract separates dry paper from co-mingled MRF streams at the ward level. Audits report a 2.3× increase in recovered tonnage and a 19% drop in landfill diversion costs.",
    metric: "2.3×",
    mlabel: "recovered tonnage",
    accent: "#8B9D77",
    bg: "#0F1B14",
    ink: "light",
  },
];

export default function StoriesPage() {
  return (
    <div className="relative" style={{ background: "var(--paper)" }}>
      <section
        className="relative"
        style={{ padding: "clamp(100px, 12vw, 140px) 0 56px" }}
      >
        <div className="j-grain" style={{ opacity: 0.35 }} />
        <div className="container relative z-10">
          <div className="flex items-center gap-4 mb-9 flex-wrap">
            <span className="j-pill">CHAPTER IV · STORIES</span>
            <span style={{ width: 48, height: 1, background: "var(--rule)" }} />
            <span className="j-mono">SCROLL HORIZONTALLY ↦</span>
          </div>
          <div className="grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-12 lg:gap-20 items-end">
            <h1
              className="font-serif text-forest-deep"
              style={{
                fontSize: "clamp(2.75rem, 6.5vw, 5.75rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
                margin: 0,
              }}
            >
              Field chapters from a<br />
              <em style={{ color: "var(--forest)" }}>working system.</em>
            </h1>
            <div className="lg:pb-2.5">
              <p className="text-body-lg text-ink-2 max-w-md">
                Five places where the paper system did not arrive in policy
                documents, but in trucks, in pulpers, in classrooms, and in the
                soil. Each chapter is a year of work — and counting.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="relative"
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          paddingBottom: 30,
          scrollbarWidth: "thin",
        }}
      >
        <div
          className="flex gap-6"
          style={{
            padding: "0 max(2rem, calc((100vw - 1200px) / 2))",
            minWidth: "max-content",
          }}
        >
          {stories.map((s, i) => (
            <StoryPanel key={s.ch} s={s} i={i} total={stories.length} />
          ))}
          <div
            style={{
              flex: "0 0 420px",
              minHeight: 720,
              padding: 48,
              borderRadius: 4,
              border: "1px dashed var(--rule)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background: "transparent",
            }}
          >
            <div>
              <div className="j-mono mb-4">VI · NEXT CHAPTER</div>
              <h3
                className="font-serif"
                style={{
                  fontSize: 32,
                  lineHeight: 1.15,
                  letterSpacing: "-0.015em",
                  margin: 0,
                }}
              >
                The next field study is yours.
              </h3>
              <p
                className="mt-5 text-ink-2"
                style={{ fontSize: 15, lineHeight: 1.65, maxWidth: 320 }}
              >
                Working on a paper system — municipal, mill, school, household?
                Submit a chapter to the field log and we&apos;ll review within four
                weeks.
              </p>
            </div>
            <Button href="/contact?type=research" variant="primary">
              Propose a chapter <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      </div>

      <section style={{ padding: "40px 0 80px" }}>
        <div className="container">
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <span className="j-mono">
              INDEX · {String(stories.length).padStart(2, "0")} CHAPTERS
            </span>
            <span style={{ flex: 1, height: 1, background: "var(--rule)" }} />
            <span className="j-mono">↤ ↦ KEYBOARD · TRACKPAD · DRAG</span>
          </div>
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${stories.length}, 1fr)`,
              gap: 4,
            }}
          >
            {stories.map((s, i) => (
              <div
                key={s.ch}
                style={{
                  height: 4,
                  background: i === 0 ? "var(--forest)" : "var(--rule)",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-t border-rule"
        style={{ background: "var(--paper-2)", padding: "80px 0" }}
      >
        <div className="container max-w-3xl text-center">
          <p className="j-mono mb-3.5">A LIVING ARCHIVE</p>
          <h2
            className="font-serif text-forest-deep"
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
            }}
          >
            Each chapter is the start of a longer file. Read more in the{" "}
            <Link href="/knowledge" className="editorial-link text-forest">
              Knowledge Hub
            </Link>
            .
          </h2>
        </div>
      </section>
    </div>
  );
}

function StoryPanel({
  s,
  i,
  total,
}: {
  s: Story;
  i: number;
  total: number;
}) {
  const dark = s.ink === "light";
  return (
    <article
      className="relative overflow-hidden"
      style={{
        flex: "0 0 min(720px, 88vw)",
        minHeight: 720,
        background: s.bg,
        color: dark ? "var(--paper)" : "var(--ink)",
        borderRadius: 4,
        padding: "clamp(32px, 5vw, 56px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid var(--rule)",
      }}
    >
      <div
        className={dark ? "j-grain j-grain--dark" : "j-grain"}
        style={dark ? { opacity: 0.42 } : { opacity: 0.5 }}
      />
      <svg
        width="28"
        height="28"
        aria-hidden="true"
        style={{ position: "absolute", top: 24, right: 24, opacity: 0.5 }}
      >
        <path
          d="M28 0 L28 12 M28 0 L16 0"
          stroke={dark ? "var(--paper)" : "var(--ink-2)"}
          strokeWidth="0.7"
        />
      </svg>

      <div style={{ position: "relative", zIndex: 2 }}>
        <div className="flex items-baseline gap-5 mb-7">
          <span
            className="font-serif"
            style={{
              fontSize: 84,
              lineHeight: 1,
              color: s.accent,
              letterSpacing: "-0.02em",
            }}
          >
            {s.ch}
          </span>
          <div>
            <div
              className="j-mono"
              style={{ color: dark ? "rgba(250,248,245,0.6)" : "var(--ink-2)" }}
            >
              {s.loc.toUpperCase()}
            </div>
            <div
              className="j-mono mt-1.5"
              style={{ color: dark ? "rgba(250,248,245,0.45)" : "var(--ink-2)" }}
            >
              {s.year}
            </div>
          </div>
        </div>

        <h3
          className="font-serif"
          style={{
            fontSize: 32,
            lineHeight: 1.18,
            letterSpacing: "-0.015em",
            color: dark ? "var(--paper)" : "var(--ink)",
            margin: 0,
            maxWidth: 580,
          }}
        >
          {s.title}
        </h3>

        <p
          className="font-serif italic mt-7"
          style={{
            fontSize: 17,
            lineHeight: 1.6,
            color: dark ? "rgba(250,248,245,0.78)" : "var(--ink-2)",
            maxWidth: 580,
          }}
        >
          {s.lead}
        </p>
      </div>

      <div
        className="flex items-end justify-between gap-7"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div style={{ borderLeft: `2px solid ${s.accent}`, paddingLeft: 18 }}>
          <div
            className="font-serif"
            style={{
              fontSize: 60,
              lineHeight: 1,
              color: s.accent,
              letterSpacing: "-0.02em",
            }}
          >
            {s.metric}
          </div>
          <div
            className="j-mono mt-2.5"
            style={{
              color: dark ? "rgba(250,248,245,0.62)" : "var(--ink-2)",
            }}
          >
            {s.mlabel.toUpperCase()}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            className="j-mono mb-3"
            style={{
              color: dark ? "rgba(250,248,245,0.45)" : "var(--ink-2)",
            }}
          >
            CHAPTER {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
          <span
            className="inline-flex items-center gap-2 border-b pb-0.5"
            style={{
              color: s.accent,
              borderColor: s.accent,
              fontWeight: 500,
            }}
          >
            Read in full <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </article>
  );
}
