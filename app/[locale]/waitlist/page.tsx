import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import WaitlistForm from "./WaitlistForm";

export const metadata = {
  title: "Лист ожидания · natashabrovkina.com",
  description: "Hosted-инструмент с 16 AI-агентами скоро. Запишись — пришлю первой.",
};

type SearchParams = { tier?: string };

export default async function WaitlistPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { tier = "self-serve" } = await searchParams;

  return (
    <div style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
      <SiteNav variant="light" />

      <main style={{ maxWidth: 820, margin: "0 auto", padding: "100px 48px 160px" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--ink-3)",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginBottom: 28,
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--accent)",
            }}
          />
          <span>Hosted-инструмент · скоро</span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(48px, 7vw, 88px)",
            fontWeight: 600,
            letterSpacing: "-0.035em",
            lineHeight: 0.98,
            maxWidth: 760,
          }}
        >
          Запишись —{" "}
          <span className="italic-display">пришлю первой</span>{" "}
          когда будет готово.
        </h1>

        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 19,
            lineHeight: 1.55,
            color: "var(--ink-2)",
            maxWidth: 640,
            marginTop: 28,
          }}
        >
          Hosted-инструмент с&nbsp;16 AI-агентами без&nbsp;возни с&nbsp;API ключами,
          с&nbsp;Brand Memory и&nbsp;Team Mode. Запускаю в&nbsp;ближайшие недели.
        </p>

        <div
          style={{
            marginTop: 36,
            padding: "24px 28px",
            background: "var(--bg-card)",
            border: "1px solid var(--hairline)",
            maxWidth: 640,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--accent)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Что получишь как ранний подписчик
          </div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              fontSize: 14,
              lineHeight: 1.5,
              color: "var(--ink-2)",
            }}
          >
            <li>— Письмо за 7 дней до запуска с приоритетным доступом</li>
            <li>— Скидка −20% на первую подписку (для первых 50)</li>
            <li>— Закрытый Telegram-чат с другими ранними клиентами</li>
            <li>— Возможность сказать что добавить в инструмент до релиза</li>
          </ul>
        </div>

        <WaitlistForm tier={tier} />

        <div
          style={{
            marginTop: 80,
            paddingTop: 40,
            borderTop: "1px solid var(--hairline-2)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--ink-3)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Пока ждёшь
          </div>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.65,
              color: "var(--ink-2)",
              marginBottom: 16,
            }}
          >
            Open-source версия инструмента уже работает. 16 агентов запускаются
            локально в&nbsp;Claude Code со&nbsp;своим Anthropic-ключом —{" "}
            <a
              href="https://github.com/nibrovkina-cyber/natalia-marketing-department"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--ink)",
                textDecoration: "none",
                borderBottom: "1.5px solid var(--ink)",
                paddingBottom: 2,
              }}
            >
              скачать на GitHub
            </a>
            .
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--ink-2)" }}>
            Если хочешь чтобы я лично собрала маркетинг под твой бизнес за 30 дней —{" "}
            <a
              href="https://t.me/NATASHABROVKINA"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--ink)",
                textDecoration: "none",
                borderBottom: "1.5px solid var(--ink)",
                paddingBottom: 2,
              }}
            >
              @NATASHABROVKINA в&nbsp;Telegram
            </a>
            .
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
