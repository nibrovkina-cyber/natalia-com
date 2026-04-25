import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  withDot?: boolean;
  align?: "left" | "center";
  className?: string;
};

/**
 * Editorial supertitle.
 * По handoff: 11-12px, uppercase, letter-spacing 0.22-0.28em, mint color.
 */
export default function Kicker({ children, withDot = false, align = "left", className = "" }: Props) {
  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontSize: 11,
        color: "var(--mint)",
        letterSpacing: "0.26em",
        textTransform: "uppercase",
        fontWeight: 500,
        ...(align === "center" ? { margin: "0 auto" } : {}),
        ...(withDot
          ? {
              padding: "7px 14px 7px 12px",
              borderRadius: 999,
              background: "rgba(91,191,165,0.08)",
              border: "1px solid rgba(91,191,165,0.18)",
            }
          : {}),
      }}
    >
      {withDot && <span className="kicker-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--mint)", boxShadow: "0 0 10px var(--mint)", animation: "kickerPulse 2s ease-in-out infinite" }} />}
      <span>{children}</span>
      <style>{`
        @keyframes kickerPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
      `}</style>
    </div>
  );
}
