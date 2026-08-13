<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# PhrasalUp feature conventions

These apply to every AI-practice feature (collocations/phrasal-verbs, Cambridge IELTS advanced, and any future module) — follow them by default, don't wait to be asked.

## Gamification
- Every learner-facing AI activity that produces an evaluation must award XP via `addGlobalXP()` (`@/lib/global-score`) — no exercise should go unrewarded.
- Convention: 10 XP per correct item / 2 XP per incorrect item for granular per-sentence exercises (see `submitTranslateBatch`). For a whole-session task (e.g. finishing a full conversation, not just one sentence), scale up modestly — 20/8 is the established pair (see `endAndFeedback` in `AiSentencePractice.tsx` / `UnitClient.tsx`).
- Always surface the amount inline where the feedback is shown: `+{xpEarned} XP` in accent color, computed client-side and stored on the feedback object itself (not requested from the AI).

## Persist anything the learner should be able to revisit
- Any AI response worth reviewing later (feedback, scoring, corrections — not just chat turns) must be saved via `appendMessages()` (`useAiConvoStore`) so it survives a refresh and syncs to Drive. If it only lives in a `useState`, it's gone on reload — that's a bug, not a shortcut.
- `AiHistoryMessage` (`src/components/AiConversationHistory.tsx`) is the single dispatch point that decides how to render a saved AI JSON payload in history (by shape: `results[]` → `BatchReviewContent`, `overallBand` → `AiBandFeedback`, `phrasesOk`/`grammarIssues` → `ConversationFeedback`, `feedback`/`correction`/`correct` → `SentenceCheckContent`). Adding a new feedback shape means adding a dispatch branch here, not duplicating rendering in the screen that produced it — history view and live view must never drift apart.

## Bilingual feedback (EN/VI)
- Learner-facing AI evaluation text should ship bilingual when practical: English field(s) plus a `vi` sub-object with a natural (not literal) Vietnamese explanation of the same feedback, from the same AI call (see the `cpv_conversation` end-of-conversation prompt in `ai-prompts.ts`).
- Render with an EN/VI tab toggle (`ConversationFeedback.tsx` is the reference implementation) that only appears when `vi` data is actually present, so responses without it degrade gracefully to English-only.

## UI components to reuse, not reinvent
- Any chat-style text entry must use `ChatInput` (`src/components/ChatInput.tsx`) — auto-growing textarea, Enter to send, Shift+Enter for a newline. Never a plain single-line `<input>` for a message box.
- Any "key vocabulary" pill list must show the Vietnamese meaning beneath the English word (`KeyVocab` in `AiConversationHistory.tsx`) — the word alone is not enough for a learner still building vocabulary.
- Any share action must go through `ShareButton` (`src/components/ShareButton.tsx`) — it already handles the Web Share API, clipboard fallback, and logo-file attachment. To share structured content (not just a bare URL), POST to `/api/share` via `createShareLink()` (`src/lib/share-client.ts`), which stores the payload in Vercel Blob and returns a short `/s/<id>` link. Never re-encode content into the URL itself (hash/query string) — it breaks link-preview crawlers and produces unusably long links.

## Auth gate
- `src/proxy.ts` gates every route except `/login`, `/api/*`, and `/s/*` behind a `gd_session`/`guest_ok` cookie. Any new route meant to be publicly viewable (like a share page) must be added to that allowlist and hidden from `AppHeader`.
- `/api/*` bypasses the proxy gate entirely — any new API route that writes data or should require a session must check the cookie itself (see `src/app/api/share/route.ts` for the pattern).
