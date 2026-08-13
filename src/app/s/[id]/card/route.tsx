import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getShare } from "@/lib/share-store";
import type { SharedConvoPayload } from "@/lib/share-payload";
import { INTENT_LABELS } from "@/components/AiConversationHistory";

// A full-transcript "screenshot" card, meant to be attached as an actual image
// file when sharing (native share sheets) — as opposed to the small fixed-size
// opengraph-image.tsx used for link-preview crawlers. Height is estimated from
// content length since ImageResponse needs concrete pixel dimensions up front.

const WIDTH = 1080;
const PADDING = 56;
const BUBBLE_MAX_WIDTH = 860;
const CHARS_PER_LINE = 52; // ~28px font in an 860px-wide bubble
const LINE_HEIGHT = 40;
const MAX_MESSAGES = 14;

function fmtDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function estimateLines(text: string): number {
  return Math.max(1, Math.ceil(text.length / CHARS_PER_LINE));
}

function messageHeight(content: string): number {
  return 28 /* role label */ + estimateLines(content) * LINE_HEIGHT + 24 /* bubble padding */ + 16 /* gap */;
}

function feedbackHeight(feedback: Record<string, unknown> | undefined): number {
  if (!feedback) return 0;
  let h = 90; // heading + phrasesOk line + card padding
  const grammarIssues = feedback.grammarIssues;
  if (Array.isArray(grammarIssues)) h += 32 + grammarIssues.length * 30;
  if (feedback.naturalness) h += estimateLines(String(feedback.naturalness)) * 30;
  if (feedback.tip) h += estimateLines(String(feedback.tip)) * 30;
  if (feedback.encouragement) h += estimateLines(String(feedback.encouragement)) * 30;
  if (typeof feedback.xpEarned === "number") h += 30;
  return h + 24;
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getShare<SharedConvoPayload>(id);

  if (!data) {
    return new Response("Not found", { status: 404 });
  }

  const shown = data.messages.slice(-MAX_MESSAGES);
  const hiddenCount = data.messages.length - shown.length;

  const headerHeight = 170;
  const footerHeight = 130;
  const bodyHeight = shown.reduce((sum, m) => sum + messageHeight(m.content), 0) + feedbackHeight(data.feedback) + (hiddenCount > 0 ? 40 : 0);
  const height = Math.min(8000, headerHeight + bodyHeight + footerHeight + PADDING * 2);

  const logoData = await readFile(join(process.cwd(), "src/assets/logo/logo.png"), "base64");
  const logoSrc = `data:image/png;base64,${logoData}`;

  const feedback = data.feedback;
  const grammarIssues = Array.isArray(feedback?.grammarIssues) ? (feedback!.grammarIssues as unknown[]).map(String) : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#f3f2f2",
          padding: `${PADDING}px`,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          <div style={{ display: "flex", fontSize: 26, color: "#7c1405", letterSpacing: 3, textTransform: "uppercase" }}>
            {INTENT_LABELS[data.intent] || data.intent} · {fmtDate(data.sharedAt)}
          </div>
          <div style={{ display: "flex", fontSize: 48, fontWeight: 800, color: "#201e1d" }}>{data.itemLabel}</div>
        </div>

        {hiddenCount > 0 && (
          <div style={{ display: "flex", fontSize: 22, color: "#7c1405", marginBottom: 12 }}>
            (đã lược {hiddenCount} tin nhắn đầu)
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {shown.map((m, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: BUBBLE_MAX_WIDTH,
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                background: m.role === "user" ? "#fff2ef" : "#eae9e9",
                borderRadius: 10,
                padding: "14px 18px",
              }}
            >
              <div style={{ display: "flex", fontSize: 20, color: "#7c1405", textTransform: "uppercase", letterSpacing: 2, marginBottom: 6 }}>
                {m.role === "user" ? "You" : "AI"}
              </div>
              <div style={{ display: "flex", fontSize: 28, color: "#201e1d", lineHeight: 1.4 }}>{m.content}</div>
            </div>
          ))}
        </div>

        {feedback && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginTop: 24,
              background: "#fff2ef",
              borderRadius: 10,
              padding: "24px",
              color: "#7c1405",
            }}
          >
            <div style={{ display: "flex", fontSize: 24, letterSpacing: 2, textTransform: "uppercase" }}>Feedback</div>
            {feedback.phrasesOk !== undefined && (
              <div style={{ display: "flex", fontSize: 30, fontWeight: 800, color: "#201e1d" }}>
                {feedback.phrasesOk ? "✅ Correct phrase usage!" : "⚠️ Phrase usage needs work"}
              </div>
            )}
            {grammarIssues.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {grammarIssues.map((g, i) => (
                  <div key={i} style={{ display: "flex", fontSize: 24 }}>• {g}</div>
                ))}
              </div>
            )}
            {typeof feedback.naturalness === "string" && <div style={{ display: "flex", fontSize: 24 }}>🗣 {feedback.naturalness}</div>}
            {typeof feedback.tip === "string" && <div style={{ display: "flex", fontSize: 24 }}>💡 {feedback.tip}</div>}
            {typeof feedback.encouragement === "string" && <div style={{ display: "flex", fontSize: 24, fontStyle: "italic" }}>{feedback.encouragement}</div>}
            {typeof feedback.xpEarned === "number" && (
              <div style={{ display: "flex", fontSize: 26, fontWeight: 800 }}>+{feedback.xpEarned} XP</div>
            )}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: "auto", paddingTop: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders via satori, not the DOM */}
          <img src={logoSrc} width={56} height={56} style={{ borderRadius: 28 }} alt="" />
          <div style={{ display: "flex", fontSize: 30, fontWeight: 800, color: "#201e1d" }}>PhrasalUp</div>
        </div>
      </div>
    ),
    { width: WIDTH, height },
  );
}
