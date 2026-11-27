import { ImageResponse } from "next/og";
import { hasLocale, locales } from "@/lib/i18n";

// Preview image shown when a link to the site is shared (LinkedIn, WhatsApp, X, ...).
export const alt = "Ștefan D., systems engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const subtitle = { en: "systems engineer.", ro: "inginer de sisteme." };

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const sub = hasLocale(lang) ? subtitle[lang] : subtitle.en;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          backgroundColor: "#F5F2EB",
          color: "#1A1A1A",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, marginBottom: 28 }}>
          <span style={{ color: "#4A7C59" }}>~/stefan</span>
          <span style={{ color: "#6B6B6B", margin: "0 14px" }}>$</span>
          <span>whoami</span>
        </div>
        <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -2 }}>Ștefan D.</div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 48, color: "#6B6B6B", marginTop: 12 }}>
          {sub}
          <div style={{ width: 26, height: 48, backgroundColor: "#4A7C59", marginLeft: 10 }} />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 96,
            right: 96,
            display: "flex",
            justifyContent: "space-between",
            borderTop: "2px solid #D4D0C8",
            paddingTop: 24,
            fontSize: 28,
            color: "#6B6B6B",
          }}
        >
          <span>stefantech.space</span>
          <span>math · science · absurd ideas</span>
        </div>
      </div>
    ),
    size
  );
}
