"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  once?: boolean;
  as?: "div" | "section" | "article";
  className?: string;
};

/**
 * Scroll-triggered reveal wrapper.
 * Sets `visible` class when element enters viewport.
 * Respects prefers-reduced-motion (see globals.css).
 */
export default function Reveal({ children, delay = 0, once = true, as = "div", className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          if (once) obs.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, once]);

  const Tag = as;
  return (
    <Tag ref={ref as never} className={`reveal ${visible ? "visible" : ""} ${className}`}>
      {children}
    </Tag>
  );
}
