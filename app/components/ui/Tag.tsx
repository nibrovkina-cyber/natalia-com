import { ReactNode } from "react";
import { cn } from "../../lib/utils";

type TagProps = {
  variant?: "default" | "accent" | "solid";
  withDot?: boolean;
  children: ReactNode;
  className?: string;
};

export function Tag({ variant = "default", withDot = false, children, className }: TagProps) {
  const base =
    "inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase px-[10px] py-[6px] border";
  const variants = {
    default: "border-[var(--hairline)] text-[var(--ink-2)] bg-transparent",
    accent: "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-soft)]",
    solid: "border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)]",
  };
  return (
    <span className={cn(base, variants[variant], className)} style={{ fontFamily: "var(--font-mono)" }}>
      {withDot && (
        <span
          className="w-1.5 h-1.5 rounded-full inline-block"
          style={{ background: variant === "default" ? "var(--accent)" : "currentColor" }}
        />
      )}
      {children}
    </span>
  );
}
