"use client";

const items = [
  { k: "CPPRI · '24", v: "domestic recovery rate · ~30%" },
  { k: "IPMA · '24", v: "agri-residue + farm-forestry share · ~70%" },
  { k: "CEPI · '23", v: "cycles per fibre · 5–7" },
  { k: "FAO FRA · '20", v: "planted forests · 290 Mha" },
  { k: "EPA WARM · '23", v: "lifecycle model · open" },
  { k: "MoEFCC · '22", v: "EPR notification · paper packaging" },
  { k: "TERI · '23", v: "informal recovery workforce · 1.5–4 M" },
  { k: "ICFRE · '23", v: "farm forestry · multiple states" },
  { k: "The Shift Project · '19", v: "digital ICT footprint · ~4% global GHG" },
];

function Row() {
  return (
    <div
      style={{
        display: "inline-flex",
        gap: 48,
        animation: "pf-marquee-band 55s linear infinite",
        whiteSpace: "nowrap",
      }}
    >
      {[...items, ...items, ...items].map((it, i) => (
        <span key={i} className="inline-flex items-center gap-3.5">
          <span className="font-mono text-[11px] tracking-[0.16em] text-copper">
            {it.k}
          </span>
          <span className="font-serif text-[22px] md:text-[26px] text-ink tracking-[-0.005em]">
            {it.v}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-rule" />
        </span>
      ))}
    </div>
  );
}

export function EvidenceMarquee() {
  return (
    <section
      className="bg-paper border-y border-rule overflow-hidden"
      style={{ perspective: 1000 }}
    >
      <div className="container py-5 flex items-center gap-3">
        <span
          className="w-1.5 h-1.5 rounded-full bg-forest-light"
          style={{ animation: "pf-blink 2s ease-in-out infinite" }}
        />
        <span className="pf-eyebrow">Evidence index · live</span>
      </div>
      <div
        style={{
          transform: "rotateX(8deg)",
          transformOrigin: "center",
          overflow: "hidden",
          maskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
        className="pb-8"
      >
        <Row />
      </div>
    </section>
  );
}
