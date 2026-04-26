import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer
      style={{
        background: "var(--navy)",
        color: "rgba(245,243,239,0.55)",
        padding: "32px 0",
        fontSize: 12,
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>© 2026 natashabrovkina.com · ИП Бровкина&nbsp;Н.</div>
        <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          <Link href="/method" style={{ color: "inherit", textDecoration: "none" }}>Метод</Link>
          <Link href="/gallery" style={{ color: "inherit", textDecoration: "none" }}>Кейсы</Link>
          <Link href="/pricing" style={{ color: "inherit", textDecoration: "none" }}>Тарифы</Link>
          <Link href="/tool" style={{ color: "inherit", textDecoration: "none" }}>Студия</Link>
          <a
            href="https://t.me/NATASHABROVKINA"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Telegram @NATASHABROVKINA
          </a>
        </div>
      </div>
    </footer>
  );
}
