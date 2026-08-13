import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getShare } from "@/lib/share-store";
import type { SharedConvoPayload } from "@/lib/share-payload";
import { shareExcerpt, shareFeedbackHighlight } from "@/lib/share-excerpt";
import { INTENT_LABELS } from "@/components/AiConversationHistory";

export const alt = "PhrasalUp";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getShare<SharedConvoPayload>(id);

  const logoData = await readFile(join(process.cwd(), "src/assets/logo/logo.png"), "base64");
  const logoSrc = `data:image/png;base64,${logoData}`;

  const kicker = data ? INTENT_LABELS[data.intent] || "PhrasalUp" : "PhrasalUp";
  const heading = data?.itemLabel ?? "Học tiếng Anh mỗi ngày";
  const highlight = data ? shareFeedbackHighlight(data) ?? shareExcerpt(data) : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fff2ef",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div style={{ display: "flex", fontSize: 30, color: "#7c1405", letterSpacing: 4, textTransform: "uppercase" }}>
            {kicker}
          </div>
          <div style={{ display: "flex", fontSize: 60, fontWeight: 800, color: "#201e1d", lineHeight: 1.25 }}>
            {heading}
          </div>
          {highlight && (
            <div style={{ display: "flex", fontSize: 32, color: "#4d170e", lineHeight: 1.4, maxWidth: 980 }}>
              {highlight.length > 160 ? highlight.slice(0, 160) + "…" : highlight}
            </div>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders via satori, not the DOM; next/image is not usable here */}
          <img src={logoSrc} width={72} height={72} style={{ borderRadius: 36 }} alt="" />
          <div style={{ display: "flex", fontSize: 38, fontWeight: 800, color: "#201e1d" }}>PhrasalUp</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
