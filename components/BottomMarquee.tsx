const ITEMS = [
  "North America's #1 Dancing LIVE Host - Box Battle Host",
  "Actor | Model | Professional Dancer",
  "238.2k Love Crew · Growing Daily",
];

export default function BottomMarquee() {
  const items = [...ITEMS, ...ITEMS];
  return (
    <div className="bottom-marquee" style={{ overflow: "hidden" }}>
      <div className="marquee-track" style={{ animationDuration: "30s" }}>
        {items.map((text, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "3rem", padding: "0 3rem", flexShrink: 0 }}>
            <span className="text" style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 700, color: "var(--gray-700)" }}>{text}</span>
            <div className="dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(236,72,153,0.2)" }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
