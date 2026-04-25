type RiskItemProps = {
  num: string;
  title: string;
  sub: string;
  borderRight?: boolean;
};

export function RiskItem({ num, title, sub, borderRight = true }: RiskItemProps) {
  return (
    <div
      style={{
        padding: "28px 32px",
        borderRight: borderRight ? "1px solid var(--hairline)" : "none",
        display: "flex",
        alignItems: "baseline",
        gap: 18,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--accent)",
          letterSpacing: "0.14em",
        }}
      >
        {num}
      </span>
      <div>
        <div style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>{title}</div>
        <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 4 }}>{sub}</div>
      </div>
    </div>
  );
}
