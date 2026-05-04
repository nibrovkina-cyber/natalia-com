"use client";

import { useState } from "react";
import Link from "next/link";

const TIER_LABELS: Record<string, { name: string; price: string; what: string }> = {
  "self-serve": {
    name: "II — Инструмент · Self-serve",
    price: "2 990 ₽ / месяц",
    what: "16 AI-агентов в hosted-UI без своего API ключа · безлимит",
  },
  personal: {
    name: "III — Со мной · Personal",
    price: "49 000 ₽ разово",
    what: "Я лично 30 дней под ключ · 3 места в месяц",
  },
};

export default function WaitlistForm({ tier }: { tier: string }) {
  const meta = TIER_LABELS[tier] || TIER_LABELS["self-serve"];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [business, setBusiness] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ position: number } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, name, email, telegram, business }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Ошибка отправки");
      } else {
        setSuccess({ position: data.position });
      }
    } catch {
      setError("Ошибка сети. Попробуй ещё раз.");
    }
    setLoading(false);
  }

  if (success) {
    return (
      <div style={{ padding: "48px 0" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--accent)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          ✓ Записано
        </div>
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 600,
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
            marginBottom: 24,
          }}
        >
          Ты <span className="italic-display">№{success.position}</span> в листе ожидания
        </h2>
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.65,
            color: "var(--ink-2)",
            marginBottom: 36,
            maxWidth: 560,
          }}
        >
          Когда инструмент будет готов — пришлю первой по&nbsp;email с&nbsp;ранним
          доступом и&nbsp;скидкой −20% для&nbsp;первых&nbsp;50 подписчиков.
        </p>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--ink-3)",
            marginBottom: 36,
            maxWidth: 560,
          }}
        >
          Пока могу{" "}
          <a
            href="https://github.com/nibrovkina-cyber/natalia-marketing-department"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--ink)", textDecoration: "underline" }}
          >
            скачать бесплатную версию на&nbsp;GitHub
          </a>{" "}
          — всё работает локально со&nbsp;своим Anthropic-ключом.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 22px",
              background: "var(--ink)",
              color: "var(--bg)",
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            На главную →
          </Link>
          <Link
            href="/method"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "14px 22px",
              border: "1px solid var(--hairline)",
              color: "var(--ink)",
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Читать метод →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ marginTop: 56, maxWidth: 560 }}>
      <div style={{ marginBottom: 8, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
        Тариф · {meta.name}
      </div>
      <div
        style={{
          fontSize: 14,
          color: "var(--ink-2)",
          marginBottom: 28,
          paddingBottom: 28,
          borderBottom: "1px solid var(--hairline-2)",
        }}
      >
        <div style={{ fontWeight: 600, color: "var(--ink)" }}>{meta.price}</div>
        <div>{meta.what}</div>
      </div>

      <Field label="Имя" required>
        <input
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Наталья"
          style={inputStyle}
        />
      </Field>

      <Field label="Email" required>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="naталья@example.com"
          style={inputStyle}
        />
      </Field>

      <Field label="Telegram" hint="Опционально — пришлю личный код раннего доступа">
        <input
          type="text"
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
          placeholder="@username"
          style={inputStyle}
        />
      </Field>

      <Field label="Что за бизнес" hint="Опционально — настрою агентов под твою нишу">
        <textarea
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
          placeholder="Стоматология в Москве, средний чек 18 000 ₽, 4 врача."
          rows={3}
          style={{ ...inputStyle, resize: "vertical", minHeight: 80 }}
        />
      </Field>

      {error && (
        <div
          style={{
            padding: "12px 16px",
            background: "var(--accent-soft)",
            color: "var(--accent)",
            fontSize: 14,
            marginBottom: 20,
          }}
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "16px 22px",
          background: loading ? "var(--ink-3)" : "var(--ink)",
          color: "var(--bg)",
          fontFamily: "var(--font-sans)",
          fontSize: 15,
          fontWeight: 500,
          letterSpacing: "-0.005em",
          border: 0,
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background .2s ease",
        }}
      >
        {loading ? "Записываю…" : "Записаться в лист ожидания →"}
      </button>

      <div
        style={{
          fontSize: 12,
          color: "var(--ink-3)",
          marginTop: 16,
          lineHeight: 1.5,
        }}
      >
        Пришлю один email когда инструмент будет готов. Без рассылок и спама.
        Никому не передаю данные.
      </div>
    </form>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  background: "var(--bg-card)",
  border: "1px solid var(--hairline)",
  fontFamily: "var(--font-sans)",
  fontSize: 15,
  color: "var(--ink)",
  outline: "none",
};

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 24 }}>
      <label
        style={{
          display: "block",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--ink-3)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        {label} {required && <span style={{ color: "var(--accent)" }}>*</span>}
        {hint && (
          <span style={{ marginLeft: 12, fontSize: 11, color: "var(--ink-3)", textTransform: "none", letterSpacing: 0 }}>
            {hint}
          </span>
        )}
      </label>
      {children}
    </div>
  );
}
