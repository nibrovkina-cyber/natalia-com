type TestimonialCardProps = {
  quote: string;
  initials: string;
  name: string;
  role: string;
  /** Index in 3-col grid for striped backgrounds (0-based) */
  index?: number;
  borderRight?: boolean;
  borderTop?: boolean;
};

export function TestimonialCard({
  quote,
  initials,
  name,
  role,
  index = 0,
  borderRight = true,
  borderTop = false,
}: TestimonialCardProps) {
  return (
    <div
      style={{
        padding: "32px 28px 28px",
        background: index % 2 === 0 ? "var(--bg-card)" : "var(--bg)",
        borderRight: borderRight ? "1px solid var(--hairline)" : "none",
        borderTop: borderTop ? "1px solid var(--hairline)" : "none",
        height: "100%",
      }}
    >
      <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--ink)", margin: "0 0 24px" }}>{quote}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "var(--accent-soft)",
            color: "var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.04em",
          }}
        >
          {initials}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{name}</div>
          <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{role}</div>
        </div>
      </div>
    </div>
  );
}
