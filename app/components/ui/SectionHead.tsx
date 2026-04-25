import { ReactNode } from "react";

type SectionHeadProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  size?: "lg" | "md";
};

/**
 * Editorial section header — kicker + h2 + right-aligned description.
 * Pattern from Claude Design v2 design-system.html (.section-head)
 */
export function SectionHead({ eyebrow, title, description, size = "lg" }: SectionHeadProps) {
  const titleSize =
    size === "lg" ? "clamp(32px, 4vw, 52px)" : "clamp(28px, 3vw, 40px)";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: 32,
        paddingBottom: 28,
        borderBottom: "1px solid var(--hairline-2)",
        marginBottom: 56,
        flexWrap: "wrap",
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--ink-3)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {eyebrow}
        </div>
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: titleSize,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>
      {description && (
        <div
          style={{
            fontSize: 14,
            color: "var(--ink-3)",
            maxWidth: 380,
            lineHeight: 1.5,
            textAlign: "right",
          }}
        >
          {description}
        </div>
      )}
    </div>
  );
}
