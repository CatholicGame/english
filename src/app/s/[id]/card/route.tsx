import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getShare } from "@/lib/share-store";
import type { SharedConvoPayload } from "@/lib/share-payload";
import { INTENT_LABELS } from "@/components/AiConversationHistory";
import { appOrigin } from "@/lib/app-url";

// A full-transcript "screenshot" card, meant to be attached as an actual image
// file when sharing (native share sheets) — as opposed to the small fixed-size
// opengraph-image.tsx used for link-preview crawlers. Height is estimated from
// content length since ImageResponse needs concrete pixel dimensions up front;
// rendered at 1.5x normal UI scale for a sharper (retina-ish) output image.

const WIDTH = 1560;
const OUTER_PADDING = 48;
const CARD_PADDING = 64;
const BUBBLE_MAX_WIDTH = 1180;
const CHARS_PER_LINE = 56; // message bubbles, fontSize 34
const LINE_HEIGHT = 48;
const SMALL_CHARS_PER_LINE = 68; // feedback/conclusion text, fontSize 30
const SMALL_LINE_HEIGHT = 42;

const ACCENT = "#ec3013";
const ACCENT_DARK = "#7c1405";
const ACCENT_TINT = "#fff2ef";
const SURFACE = "#eae9e9";
const INK = "#201e1d";
const MAX_MESSAGES = 14;

function fmtDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function estimateLines(text: string): number {
  return Math.max(1, Math.ceil(text.length / CHARS_PER_LINE));
}

function estimateSmallLines(text: string): number {
  return Math.max(1, Math.ceil(text.length / SMALL_CHARS_PER_LINE));
}

interface Correction {
  wrong: string;
  correct: string;
}

interface Turn {
  comment?: string;
  corrections?: Correction[];
}

interface SuggestionGroup {
  category: string;
  phrases: string[];
}

function messageHeight(content: string): number {
  return 40 /* role label */ + estimateLines(content) * LINE_HEIGHT + 48 /* bubble padding */ + 24 /* gap */;
}

function turnHeight(turn: Turn | undefined): number {
  if (!turn) return 0;
  const hasCorrections = turn.corrections && turn.corrections.length > 0;
  if (!hasCorrections && !turn.comment) return 0;
  let h = 44 /* "AI Feedback" label */ + 40 /* padding */ + 20 /* gap above */;
  for (const c of turn.corrections ?? []) {
    // wrong/correct render as two stacked lines, either of which can wrap
    h += estimateSmallLines(`❌ "${c.wrong}"`) * SMALL_LINE_HEIGHT + estimateSmallLines(`✅ "${c.correct}"`) * SMALL_LINE_HEIGHT + 16;
  }
  if (turn.comment) h += estimateSmallLines(turn.comment) * SMALL_LINE_HEIGHT + (hasCorrections ? 8 : 0);
  return h;
}

function conclusionHeight(feedback: Record<string, unknown> | undefined): number {
  if (!feedback) return 0;
  let h = 60; // heading + card padding
  if (feedback.phrasesOk !== undefined) h += 56;
  const style = feedback.style;
  if (Array.isArray(style) && style.length > 0) {
    h += 48;
    for (const s of style as string[]) h += estimateSmallLines(`• ${s}`) * SMALL_LINE_HEIGHT;
  }
  if (typeof feedback.styleHighlight === "string" && feedback.styleHighlight) {
    h += 8 + estimateSmallLines(`✅ ${feedback.styleHighlight}`) * SMALL_LINE_HEIGHT;
  }
  const suggestions = feedback.suggestions;
  if (Array.isArray(suggestions) && suggestions.length > 0) {
    h += 20;
    for (const sug of suggestions as SuggestionGroup[]) {
      h += estimateSmallLines(`💡 ${sug.category}: ${sug.phrases?.join(", ") ?? ""}`) * SMALL_LINE_HEIGHT;
    }
  }
  const progress = feedback.progress;
  if (Array.isArray(progress) && progress.length > 0) {
    h += 48;
    for (const p of progress as string[]) h += estimateSmallLines(p) * SMALL_LINE_HEIGHT;
  }
  if (typeof feedback.xpEarned === "number") h += 44;
  return h + 48;
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getShare<SharedConvoPayload>(id);

  if (!data) {
    return new Response("Not found", { status: 404 });
  }

  const shown = data.messages.slice(-MAX_MESSAGES);
  const hiddenCount = data.messages.length - shown.length;

  const feedback = data.feedback;
  const turns = Array.isArray(feedback?.turns) ? (feedback!.turns as Turn[]) : [];
  const style = Array.isArray(feedback?.style) ? (feedback!.style as string[]) : [];
  const suggestions = Array.isArray(feedback?.suggestions) ? (feedback!.suggestions as SuggestionGroup[]) : [];
  const progress = Array.isArray(feedback?.progress) ? (feedback!.progress as string[]) : [];

  let userTurnIndex = -1;
  const bodyHeight = shown.reduce((sum, m) => {
    const isUser = m.role === "user";
    const turn = isUser ? turns[++userTurnIndex] : undefined;
    return sum + messageHeight(m.content) + turnHeight(turn);
  }, 0);

  const headerHeight = 190;
  const footerHeight = 190;
  const height = Math.min(10000, headerHeight + bodyHeight + conclusionHeight(feedback) + footerHeight + OUTER_PADDING * 2 + CARD_PADDING * 2 + (hiddenCount > 0 ? 60 : 0));

  const logoData = await readFile(join(process.cwd(), "src/assets/logo/logo.png"), "base64");
  const logoSrc = `data:image/png;base64,${logoData}`;
  const shareUrl = `${appOrigin()}/s/${id}`;

  userTurnIndex = -1;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: ACCENT_TINT,
          padding: `${OUTER_PADDING}px`,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            background: "#ffffff",
            borderRadius: 24,
            padding: `${CARD_PADDING}px`,
            boxShadow: "0 8px 40px rgba(32, 30, 29, 0.12)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
            <div style={{ display: "flex", fontSize: 32, color: ACCENT_DARK, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700 }}>
              {`${INTENT_LABELS[data.intent] || data.intent} · ${fmtDate(data.sharedAt)}`}
            </div>
            <div style={{ display: "flex", fontSize: 68, fontWeight: 800, color: INK }}>{data.itemLabel}</div>
          </div>

          {hiddenCount > 0 && (
            <div style={{ display: "flex", fontSize: 26, color: ACCENT_DARK, marginBottom: 16 }}>
              {`(đã lược ${hiddenCount} tin nhắn đầu)`}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {shown.map((m, i) => {
              const isUser = m.role === "user";
              const turn = isUser ? turns[++userTurnIndex] : undefined;
              const hasTurnContent = turn && ((turn.corrections && turn.corrections.length > 0) || turn.comment);
              return (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: isUser ? "flex-end" : "flex-start" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      maxWidth: BUBBLE_MAX_WIDTH,
                      background: isUser ? ACCENT_TINT : SURFACE,
                      borderRadius: 14,
                      padding: "20px 26px",
                    }}
                  >
                    <div style={{ display: "flex", fontSize: 24, color: ACCENT_DARK, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8, fontWeight: 700 }}>
                      {isUser ? "You" : "AI"}
                    </div>
                    <div style={{ display: "flex", fontSize: 34, color: INK, lineHeight: 1.4 }}>{m.content}</div>
                  </div>
                  {hasTurnContent && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: BUBBLE_MAX_WIDTH,
                        marginTop: 12,
                        borderLeft: `6px solid ${ACCENT}`,
                        background: ACCENT_TINT,
                        borderRadius: 10,
                        padding: "18px 24px",
                        color: ACCENT_DARK,
                      }}
                    >
                      <div style={{ display: "flex", fontSize: 22, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8, fontWeight: 700 }}>
                        AI Feedback
                      </div>
                      {turn!.corrections?.map((c, j) => (
                        <div key={j} style={{ display: "flex", flexDirection: "column", fontSize: 30, marginBottom: 12, gap: 4 }}>
                          <div style={{ display: "flex" }}>{`❌ "${c.wrong}"`}</div>
                          <div style={{ display: "flex", fontWeight: 700 }}>{`✅ "${c.correct}"`}</div>
                        </div>
                      ))}
                      {turn!.comment && (
                        <div style={{ display: "flex", fontSize: 30, marginTop: turn!.corrections?.length ? 4 : 0 }}>
                          {turn!.comment}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {feedback && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                marginTop: 40,
                background: ACCENT_TINT,
                borderRadius: 16,
                padding: "40px",
                color: ACCENT_DARK,
              }}
            >
              <div style={{ display: "flex", fontSize: 28, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700 }}>Feedback</div>
              {feedback.phrasesOk !== undefined && (
                <div style={{ display: "flex", fontSize: 36, fontWeight: 800, color: INK }}>
                  {feedback.phrasesOk ? "✅ Correct phrase usage!" : "⚠️ Phrase usage needs work"}
                </div>
              )}
              {style.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {style.map((s, i) => (
                    <div key={i} style={{ display: "flex", fontSize: 30 }}>{`• ${s}`}</div>
                  ))}
                </div>
              )}
              {typeof feedback.styleHighlight === "string" && feedback.styleHighlight && (
                <div style={{ display: "flex", fontSize: 30, fontWeight: 800 }}>{`✅ ${feedback.styleHighlight}`}</div>
              )}
              {suggestions.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {suggestions.map((sug, i) => (
                    <div key={i} style={{ display: "flex", fontSize: 30 }}>
                      {`💡 ${sug.category}: ${sug.phrases?.join(", ") ?? ""}`}
                    </div>
                  ))}
                </div>
              )}
              {progress.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {progress.map((p, i) => (
                    <div key={i} style={{ display: "flex", fontSize: 30, fontStyle: "italic" }}>{p}</div>
                  ))}
                </div>
              )}
              {typeof feedback.xpEarned === "number" && (
                <div style={{ display: "flex", fontSize: 32, fontWeight: 800 }}>{`+${feedback.xpEarned} XP`}</div>
              )}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders via satori, not the DOM */}
              <img src={logoSrc} width={72} height={72} style={{ borderRadius: 36 }} alt="" />
              <div style={{ display: "flex", fontSize: 38, fontWeight: 800, color: INK }}>PhrasalUp</div>
            </div>
            <div style={{ display: "flex", fontSize: 26, color: ACCENT_DARK }}>{shareUrl.replace(/^https?:\/\//, "")}</div>
          </div>
        </div>
      </div>
    ),
    { width: WIDTH, height },
  );
}
