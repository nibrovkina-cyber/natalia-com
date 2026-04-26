import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "natashabrovkina.com — AI Marketing Studio из 16 агентов на методологии Ogilvy / Schwartz / Hopkins";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// OG-image для шеринга в соцсетях. Editorial-стиль матчит бренд:
// cream фон, ink текст, accent оранжевый акцент, JetBrains Mono для meta.
// Шрифты загружаем через Google Fonts CSS API во время render.
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#F7F4EE",
          color: "#1F1B16",
          padding: "80px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Top kicker */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontFamily: "monospace",
            fontSize: 18,
            color: "#8A8175",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          <span style={{ width: 10, height: 10, borderRadius: 999, background: "#D9542B" }} />
          <span>NATASHABROVKINA.COM · AI MARKETING STUDIO</span>
        </div>

        {/* Main headline — Editorial Playfair-style */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.0,
              fontWeight: 600,
              letterSpacing: "-0.025em",
              maxWidth: 1000,
              fontFamily: "serif",
            }}
          >
            Удвоила выручку
          </div>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.0,
              fontWeight: 600,
              letterSpacing: "-0.025em",
              fontFamily: "serif",
            }}
          >
            20 малых бизнесов.
          </div>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.05,
              fontWeight: 500,
              fontStyle: "italic",
              color: "#8A8175",
              letterSpacing: "-0.015em",
              fontFamily: "serif",
              marginTop: 8,
            }}
          >
            Без команды.
          </div>
        </div>

        {/* Bottom row — methodology + author */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(31,27,22,0.15)",
            paddingTop: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 16,
                color: "#8A8175",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              16 AI-АГЕНТОВ · OGILVY · SCHWARTZ · HOPKINS
            </div>
            <div
              style={{
                fontSize: 22,
                color: "#4A4339",
                fontFamily: "serif",
                marginTop: 4,
              }}
            >
              — Наталья Бровкина · Москва · Лос-Анджелес
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 22px",
              background: "#1F1B16",
              color: "#F7F4EE",
              borderRadius: 999,
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 999, background: "#D9542B" }} />
            <span>natashabrovkina.com</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
