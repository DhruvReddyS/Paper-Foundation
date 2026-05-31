export function FiberThread({
  height = 4000,
  color = "var(--forest)",
  opacity = 0.18,
  side = "left",
  offset = 80,
  amplitude = 24,
}: {
  height?: number;
  color?: string;
  opacity?: number;
  side?: "left" | "right";
  offset?: number;
  amplitude?: number;
}) {
  const segs = Math.ceil(height / 180);
  let d = `M ${offset} 0`;
  for (let i = 0; i < segs; i++) {
    const y0 = i * 180 + 90;
    const y1 = (i + 1) * 180;
    const x = offset + (i % 2 === 0 ? amplitude : -amplitude);
    d += ` Q ${x} ${y0} ${offset} ${y1}`;
  }
  return (
    <svg
      width="200"
      height={height}
      viewBox={`0 0 200 ${height}`}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        [side]: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeOpacity={opacity}
        strokeWidth="1"
        strokeDasharray="2 6"
      />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeOpacity={opacity * 1.4}
        strokeWidth="1"
        strokeDasharray="80 1200"
        style={{ animation: "pf-ribbon-flow 22s linear infinite" }}
      />
    </svg>
  );
}
