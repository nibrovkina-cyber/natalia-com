"use client";

import { useEffect, useRef } from "react";

/**
 * Animated 16-agent neural network canvas.
 *
 * Renders 16 pulsing nodes connected by subtle lines that "fire" sequentially.
 * Drop into hero as background or product-preview replacement.
 *
 * Inspired by v0.dev / Cursor hero motion.
 */
export default function AgentNetwork({
  height = 460,
  density = 16,
  className = "",
}: {
  height?: number;
  density?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];

    type Node = {
      x: number; y: number;
      baseR: number;
      label: string;
      method: "ogilvy" | "schwartz" | "hopkins";
      phase: number;
    };

    type Pulse = {
      from: number;
      to: number;
      t: number;     // 0..1
      speed: number;
    };

    const ROLES = [
      { l: "I", m: "ogilvy" },   { l: "II", m: "schwartz" }, { l: "III", m: "hopkins" }, { l: "IV", m: "ogilvy" },
      { l: "V", m: "hopkins" },  { l: "VI", m: "schwartz" }, { l: "VII", m: "ogilvy" },  { l: "VIII", m: "hopkins" },
      { l: "IX", m: "ogilvy" },  { l: "X", m: "schwartz" },  { l: "XI", m: "schwartz" }, { l: "XII", m: "ogilvy" },
      { l: "XIII", m: "ogilvy" },{ l: "XIV", m: "schwartz" },{ l: "XV", m: "hopkins" },  { l: "XVI", m: "hopkins" },
    ] as const;

    function methodColor(m: Node["method"], alpha = 1) {
      // Read CSS vars for palette consistency
      const styles = getComputedStyle(document.documentElement);
      const accent = styles.getPropertyValue("--accent").trim() || "#D9542B";
      const ink = styles.getPropertyValue("--ink").trim() || "#1F1B16";
      const ink3 = styles.getPropertyValue("--ink-3").trim() || "#8A8175";

      const map = { ogilvy: accent, schwartz: ink3, hopkins: ink };
      const hex = (map[m] || accent) as string;
      // Allow alpha overlay
      if (alpha === 1) return hex;
      return hexToRgba(hex, alpha);
    }

    function hexToRgba(hex: string, alpha: number) {
      let h = hex.replace("#", "");
      if (h.length === 3) h = h.split("").map((c) => c + c).join("");
      const num = parseInt(h, 16);
      const r = (num >> 16) & 255;
      const g = (num >> 8) & 255;
      const b = num & 255;
      return `rgba(${r},${g},${b},${alpha})`;
    }

    function setup() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Layout 16 nodes in 4×4 grid с лёгким jitter
      const cols = 4;
      const rows = 4;
      const padX = w * 0.12;
      const padY = h * 0.18;
      const stepX = (w - padX * 2) / (cols - 1);
      const stepY = (h - padY * 2) / (rows - 1);

      nodes = [];
      let i = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const role = ROLES[i % ROLES.length];
          nodes.push({
            x: padX + c * stepX + (Math.random() - 0.5) * 12,
            y: padY + r * stepY + (Math.random() - 0.5) * 12,
            baseR: 4 + Math.random() * 2,
            label: role.l,
            method: role.m,
            phase: Math.random() * Math.PI * 2,
          });
          i++;
        }
      }
    }

    function spawnPulse() {
      if (nodes.length < 2) return;
      const from = Math.floor(Math.random() * nodes.length);
      let to = Math.floor(Math.random() * nodes.length);
      while (to === from) to = Math.floor(Math.random() * nodes.length);
      pulses.push({ from, to, t: 0, speed: 0.005 + Math.random() * 0.008 });
    }

    let lastSpawn = 0;
    function frame(time: number) {
      ctx.clearRect(0, 0, w, h);

      // Background: subtle radial halo
      const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.6);
      const halo = methodColor("ogilvy", 0.08);
      g.addColorStop(0, halo);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Connecting lines (only nearby pairs)
      const t = time * 0.001;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          const maxDist = Math.min(w, h) * 0.32;
          if (dist > maxDist) continue;
          const alpha = (1 - dist / maxDist) * 0.18 + Math.sin(t * 0.5 + i + j) * 0.04;
          ctx.strokeStyle = methodColor("hopkins", Math.max(0, alpha));
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Pulses (firing along edges)
      ctx.lineWidth = 1.5;
      for (const p of pulses) {
        p.t += p.speed;
        const a = nodes[p.from];
        const b = nodes[p.to];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 22);
        grad.addColorStop(0, methodColor("ogilvy", 0.55));
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, 22, 0, Math.PI * 2);
        ctx.fill();
      }
      pulses = pulses.filter((p) => p.t < 1);

      // Spawn pulses occasionally
      if (time - lastSpawn > 220) {
        if (pulses.length < 5) spawnPulse();
        lastSpawn = time;
      }

      // Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulse = (Math.sin(t * 1.4 + n.phase) + 1) / 2; // 0..1
        const r = n.baseR * (1 + pulse * 0.5);

        // Outer halo
        const haloGrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 5);
        haloGrad.addColorStop(0, methodColor(n.method, 0.4 + pulse * 0.3));
        haloGrad.addColorStop(1, "transparent");
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 5, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = methodColor(n.method, 1);
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    setup();
    rafRef.current = requestAnimationFrame(frame);

    const onResize = () => setup();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [density]);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height,
        overflow: "hidden",
        borderRadius: 18,
        background: "var(--ink)",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 28,
          top: 24,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(247,244,238,0.55)",
        }}
      >
        natalia · 16 agents · live
      </div>
      <div
        style={{
          position: "absolute",
          right: 28,
          top: 24,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--accent)",
        }}
      >
        ● running
      </div>
      <div
        style={{
          position: "absolute",
          left: 28,
          right: 28,
          bottom: 24,
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgba(247,244,238,0.55)",
        }}
      >
        <span>
          <span style={{ color: "var(--accent)" }}>●</span> Ogilvy
        </span>
        <span>
          <span style={{ color: "var(--ink-3)" }}>●</span> Schwartz
        </span>
        <span>
          <span style={{ color: "var(--bg)" }}>●</span> Hopkins
        </span>
      </div>
    </div>
  );
}
