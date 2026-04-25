type ProcessPhaseProps = {
  week: string;
  big: string;
  title: string;
  body: string;
  deliv: string;
  borderRight?: boolean;
};

export function ProcessPhase({ week, big, title, body, deliv, borderRight = true }: ProcessPhaseProps) {
  return (
    <div
      style={{
        padding: 28,
        background: "var(--bg-card)",
        borderRight: borderRight ? "1px solid var(--hairline)" : "none",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--ink-3)",
            letterSpacing: "0.14em",
          }}
        >
          {week}
        </span>
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: 36,
            color: "var(--accent)",
            fontWeight: 500,
            lineHeight: 1,
          }}
        >
          {big}
        </span>
      </div>
      <h3
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          marginBottom: 12,
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--ink-2)", marginBottom: 20, flex: 1 }}>{body}</p>
      <div
        style={{
          paddingTop: 16,
          borderTop: "1px solid var(--hairline-2)",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--accent)",
          letterSpacing: "0.06em",
        }}
      >
        → {deliv}
      </div>
    </div>
  );
}
