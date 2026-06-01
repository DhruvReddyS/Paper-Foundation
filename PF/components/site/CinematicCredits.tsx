import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { foundation } from "@/lib/foundation";

const credits: Array<[string, string]> = [
  ["DIRECTION", "Research & Editorial"],
  ["BASE", `${foundation.address.city}, ${foundation.address.state}`],
  ["PARTNERS", "Forum of Print Lovers · Industry & Academia"],
  ["LICENSE", "CC BY 4.0"],
];

export function CinematicCredits() {
  return (
    <section
      className="relative overflow-hidden paper-grain dark-grain"
      style={{
        background: "#0F1B14",
        color: "var(--paper)",
        padding: "clamp(80px, 12vw, 140px) 0 90px",
      }}
    >
      <div className="container relative z-10">
        <div className="j-mono" style={{ color: "rgba(250,248,245,0.6)", marginBottom: 28 }}>
          ── CREDITS · PAPER FOUNDATION
        </div>
        <h2
          className="font-serif"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.875rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: 1080,
            margin: 0,
          }}
        >
          A standing institute for the<br />
          <em style={{ color: "#C4956A" }}>evidence</em> behind everyday paper.
        </h2>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10"
          style={{
            marginTop: 80,
            paddingTop: 48,
            borderTop: "1px solid rgba(250,248,245,0.14)",
          }}
        >
          {credits.map(([k, v]) => (
            <div key={k}>
              <div className="j-mono" style={{ color: "rgba(250,248,245,0.55)", marginBottom: 8 }}>
                {k}
              </div>
              <div
                className="font-serif"
                style={{ fontSize: 22, lineHeight: 1.3 }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-end" style={{ marginTop: 72 }}>
          <div
            className="font-serif italic"
            style={{
              fontSize: 22,
              color: "rgba(250,248,245,0.78)",
              maxWidth: 720,
              lineHeight: 1.5,
            }}
          >
            &ldquo;The most sustainable sheet of paper is the one that quietly
            comes back.&rdquo;
            <div
              className="j-mono mt-3.5"
              style={{
                fontStyle: "normal",
                fontSize: 11,
                color: "rgba(250,248,245,0.55)",
              }}
            >
              — PAPER FOUNDATION · EDITORIAL DESK
            </div>
          </div>
          <div className="lg:justify-self-end">
            <Link
              href="/get-involved"
              className="inline-flex items-center gap-2.5 px-6 h-12 rounded-[8px] bg-paper text-forest-deep hover:bg-paper-2 transition-colors text-[14px] font-medium"
            >
              Become a member <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
