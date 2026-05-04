"use client";

import { useState } from "react";
import Link from "next/link";

type FormDict = {
  tierLabel: string;
  tiers: Record<string, { name: string; price: string; what: string }>;
  fields: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    telegram: string;
    telegramHint: string;
    business: string;
    businessHint: string;
    businessPlaceholder: string;
  };
  submit: string;
  submitting: string;
  errorNetwork: string;
  errorDefault: string;
  footnote: string;
  successKicker: string;
  successHeading: string;
  successHeadingSuffix: string;
  successText: string;
  successFreeText: string;
  successFreeLink: string;
  successFreeAfter: string;
  successHomeLink: string;
  successMethodLink: string;
};

export default function WaitlistForm({
  tier,
  dict,
  homeHref,
  methodHref,
}: {
  tier: string;
  dict: FormDict;
  homeHref: string;
  methodHref: string;
}) {
  const meta = dict.tiers[tier] || dict.tiers["self-serve"];
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
        setError(data.error || dict.errorDefault);
      } else {
        setSuccess({ position: data.position });
      }
    } catch {
      setError(dict.errorNetwork);
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
          {dict.successKicker}
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
          {dict.successHeading} <span className="italic-display">№{success.position}</span> {dict.successHeadingSuffix}
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", marginBottom: 36, maxWidth: 560 }}>
          {dict.successText}
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--ink-3)", marginBottom: 36, maxWidth: 560 }}>
          {dict.successFreeText}{" "}
          <a
            href="https://github.com/nibrovkina-cyber/natalia-marketing-department"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--ink)", textDecoration: "underline" }}
          >
            {dict.successFreeLink}
          </a>{" "}
          {dict.successFreeAfter}
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link
            href={homeHref}
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
            {dict.successHomeLink}
          </Link>
          <Link
            href={methodHref}
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
            {dict.successMethodLink}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ marginTop: 56, maxWidth: 560 }}>
      <div style={{ marginBottom: 8, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
        {dict.tierLabel} · {meta.name}
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

      <Field label={dict.fields.name} required>
        <input
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={dict.fields.namePlaceholder}
          style={inputStyle}
        />
      </Field>

      <Field label={dict.fields.email} required>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={dict.fields.emailPlaceholder}
          style={inputStyle}
        />
      </Field>

      <Field label={dict.fields.telegram} hint={dict.fields.telegramHint}>
        <input
          type="text"
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
          placeholder="@username"
          style={inputStyle}
        />
      </Field>

      <Field label={dict.fields.business} hint={dict.fields.businessHint}>
        <textarea
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
          placeholder={dict.fields.businessPlaceholder}
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
        {loading ? dict.submitting : dict.submit}
      </button>

      <div
        style={{
          fontSize: 12,
          color: "var(--ink-3)",
          marginTop: 16,
          lineHeight: 1.5,
        }}
      >
        {dict.footnote}
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
