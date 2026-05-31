const voices = [
  {
    q: "Recycling without a price floor on paper is a charity, not a system.",
    who: "ANEEL · KABADIWALA UNION · MUMBAI",
  },
  {
    q: "We don't need to choose between forests and paper. We need to choose between which kind of forest.",
    who: "ICFRE FELLOW",
  },
  {
    q: "The most defensible paper is the kind that comes back. Twice. Three times.",
    who: "MILL ENGINEER · KARNATAKA",
  },
  {
    q: "Going digital saved my office a lot of paper. It also added 38 phones.",
    who: "EDUCATION ADMINISTRATOR · KERALA",
  },
  {
    q: "Farm forestry is the quietest climate policy India never advertised.",
    who: "FOREST ECONOMIST",
  },
];

export function VoicesMarquee() {
  const Row = () => (
    <div
      style={{
        display: "inline-flex",
        gap: 64,
        animation: "pf-marquee-band 70s linear infinite",
        whiteSpace: "nowrap",
      }}
    >
      {[...voices, ...voices].map((v, i) => (
        <span
          key={i}
          className="inline-flex items-baseline gap-5"
          style={{ whiteSpace: "normal", maxWidth: 720 }}
        >
          <span
            className="font-serif"
            style={{
              fontSize: 18,
              color: "var(--copper)",
              lineHeight: 0.6,
              flexShrink: 0,
            }}
          >
            &ldquo;
          </span>
          <span
            className="font-serif italic"
            style={{
              fontSize: "clamp(18px, 2vw, 22px)",
              color: "var(--paper)",
              letterSpacing: "-0.005em",
              lineHeight: 1.4,
            }}
          >
            {v.q}
          </span>
          <span
            className="j-mono"
            style={{
              color: "rgba(250,248,245,0.5)",
              flexShrink: 0,
            }}
          >
            — {v.who}
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "rgba(250,248,245,0.25)", flexShrink: 0 }}
          />
        </span>
      ))}
    </div>
  );

  return (
    <section
      className="relative overflow-hidden paper-grain dark-grain"
      style={{
        background: "#1A2B22",
        color: "var(--paper)",
        padding: "clamp(70px, 9vw, 100px) 0",
      }}
    >
      <div className="container mb-9 flex items-center gap-3">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: "var(--copper)",
            animation: "pf-blink 2s ease-in-out infinite",
          }}
        />
        <span className="j-mono" style={{ color: "rgba(250,248,245,0.6)" }}>
          VOICES FROM THE SYSTEM
        </span>
      </div>
      <div
        style={{
          overflow: "hidden",
          maskImage:
            "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        }}
      >
        <Row />
      </div>
    </section>
  );
}
