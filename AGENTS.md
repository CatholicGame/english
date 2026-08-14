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

## AI response language (single-language, not dual)
- The user picks ONE feedback language in Settings (`AppHeader.tsx` gear menu → "Ngôn ngữ phản hồi AI"), stored via `src/lib/ai-lang-prefs.ts` (`loadAiLangPrefs`/`saveAiLangPrefs`/`currentAiLang`, localStorage, default `"vi"`).
- Every `/api/ai` call must stamp its payload with `aiLang: currentAiLang()` (see `callAi` in `AiSentencePractice.tsx` / `UnitClient.tsx` / `LessonClient.tsx`'s `LessonDiscussion`). `buildPrompt` (`ai-prompts.ts`) reads `payload.aiLang` via the `aiLangOf()`/`feedbackLangNote()` helpers and asks the model for feedback/explanation prose in ONE language only — do NOT generate both English and Vietnamese in the same call (that was the old `vi:` sub-object pattern on `cpv_conversation`; it doubled token cost for no benefit once the user can just pick).
- This only affects evaluation/feedback prose. The practice dialogue itself — the conversation/discussion partner's own chat lines — always stays in English regardless of `aiLang`, since producing English is the point of the exercise. Corrected sentences, example sentences, and target English phrases inside feedback also stay in English even when `aiLang` is `"vi"`; only the surrounding explanation switches language.
- `ConversationFeedback.tsx` still supports an EN/VI toggle for backward compatibility with old saved conversations that have a `vi` sub-object from before this convention — new responses just don't populate one, so the toggle silently doesn't appear.

## Discussion — the open-ended practice mode
- Every AI-practice module (collocations/phrasal-verbs, Cambridge IELTS advanced, Listen A Minute, and any future module) gets a "Discussion" mode alongside "Converse": open-ended chat about the term/topic with no target-phrase requirement, versus "Converse"'s scripted phrase-practice roleplay.
- Backed by the shared `"discussion"` intent (`discussionChat()` in `ai-prompts.ts`) — one function handles start/continue/end phases like `cpvConversationStart` does for Converse. Reuse this one intent across modules (payload is just `{ topic, history?, end? }`); don't fork a per-module copy.
- The end-of-discussion feedback reuses the exact `turns`/`style`/`suggestions`/`progress` shape `ConversationFeedback.tsx` already renders for Converse (minus `phrasesOk`, which doesn't apply — use `wellDone` to gate XP tiering instead), so history/live rendering stay unified for free.

## UI components to reuse, not reinvent
- Any chat-style text entry must use `ChatInput` (`src/components/ChatInput.tsx`) — auto-growing textarea, Enter to send, Shift+Enter for a newline. Never a plain single-line `<input>` for a message box.
- Any "key vocabulary" pill list must show the Vietnamese meaning beneath the English word (`KeyVocab` in `AiConversationHistory.tsx`) — the word alone is not enough for a learner still building vocabulary.
- Any share action must go through `ShareButton` (`src/components/ShareButton.tsx`) — it already handles the Web Share API, clipboard fallback, and image-file attachment. To share structured content (not just a bare URL), POST to `/api/share` via `createShareLink()` (`src/lib/share-client.ts`), which stores the payload in Vercel Blob and returns a short `/s/<id>` link. Never re-encode content into the URL itself (hash/query string) — it breaks link-preview crawlers and produces unusably long links.
  - `getShare()`/`saveShare()` (`src/lib/share-store.ts`) read via `list()` + `fetch(blob.url)`, not `get(pathname)` — the pathname-resolution form of `get()` was silently failing in production (write worked, read didn't) even though it worked locally. If share links start 404ing again, check the Vercel Blob read path first, and check the function logs (both helpers `console.error` on failure) before assuming it's a token/config issue.
  - Every share route (`/s/[id]/page.tsx`, `/s/[id]/opengraph-image.tsx`, `/s/[id]/card/route.tsx`) must stay in sync on how it reads a `SharedConvoPayload` — `opengraph-image` is the small fixed-size link-preview card (crawlers, pasted links), `card` is a full-content, dynamically-tall "screenshot" image meant to be attached as an actual file via `ShareButton`'s `getImageUrl` (native share sheets — WhatsApp, Messages, Zalo) so recipients see the real content without clicking through.
- Any full-screen popup (word lookup, conversation feedback, ...) must use `Modal` (`src/components/Modal.tsx`) — bottom-sheet shell with backdrop-click-to-close and `data-lookup-ignore` already wired in. Don't hand-roll another `fixed inset-0` overlay.
- Any standalone piece of AI-generated text a learner would plausibly want to copy elsewhere — a corrected sentence, a "better example"/alternative phrasing, a rewritten paragraph, a model response/answer, a generated example sentence — must get a `CopyButton` (`src/components/CopyButton.tsx`) next to it. It mirrors `ShareButton`'s idle → copied/error → idle (1.5s) status-swap pattern; pass `text` plus a `className`/`style` matching the surrounding pill/theme (see `AiFeedback.tsx`, `AiBandFeedback.tsx`, `ConversationFeedback.tsx`, `AiConversationHistory.tsx` for the established per-context styling). Skip it for short labels/tips/badges and for live chat transcript bubbles — only content someone would actually want to paste elsewhere.

## Auth gate
- `src/proxy.ts` gates every route except `/login`, `/api/*`, and `/s/*` behind a `gd_session`/`guest_ok` cookie. Any new route meant to be publicly viewable (like a share page) must be added to that allowlist and hidden from `AppHeader`.
- `/api/*` bypasses the proxy gate entirely — any new API route that writes data or should require a session must check the cookie itself (see `src/app/api/share/route.ts` for the pattern).
