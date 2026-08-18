// Minimal UI language layer (vi/en) for the app interface. This is SEPARATE
// from the AI feedback language (src/lib/ai-lang-prefs.ts): that one controls
// what language the AI writes feedback/explanation prose in; this one controls
// the interface chrome (menus, labels, buttons, banners). The learning content
// itself (modules, lessons, exercises) is intentionally never translated —
// the app teaches English, so the material stays English.
//
// Scope note: strings are translated per-key in `STRINGS` below. Screens not
// yet in the dictionary keep their Vietnamese text (fallback `vi`), so adding
// a language later (or a new key) is purely additive.

"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import type { AiLang } from "./ai-lang-prefs";

/** Same two options as the AI feedback language. */
export type UiLang = AiLang;

interface DictEntry {
  vi: string;
  en: string;
}

/** Flat key → {vi, en} dictionary. `t()` falls back to `vi` then the raw key. */
export const STRINGS: Record<string, DictEntry> = {
  // ─── App header / settings menu ──────────────────────────────────────
  "settings.aria": { vi: "Cài đặt", en: "Settings" },
  "settings.share.label": { vi: "Chia sẻ Vocabulary Builder Pro", en: "Share Vocabulary Builder Pro" },
  "settings.share.text": {
    vi: "Học tiếng Anh cụm động từ & collocations mỗi ngày cùng Vocabulary Builder Pro",
    en: "Learn English phrasal verbs & collocations every day with Vocabulary Builder Pro",
  },
  "settings.aiLang": { vi: "Ngôn ngữ phản hồi AI", en: "AI feedback language" },
  "settings.uiLang": { vi: "Ngôn ngữ giao diện", en: "Interface language" },
  "settings.font": { vi: "Font", en: "Font" },
  "settings.size": { vi: "Size: {pct}%", en: "Size: {pct}%" },
  "settings.voice": { vi: "Giọng đọc", en: "Reading voice" },
  "dictionary.my": { vi: "Từ điển của tôi", en: "My dictionary" },
  "fullscreen.exit": { vi: "Thoát toàn màn hình", en: "Exit fullscreen" },
  "fullscreen.enter": { vi: "Toàn màn hình", en: "Fullscreen" },

  // ─── Auth ────────────────────────────────────────────────────────────
  "auth.account": { vi: "Tài khoản", en: "Account" },
  "auth.signout": { vi: "Đăng xuất", en: "Sign out" },
  "auth.signin": { vi: "Đăng nhập với Google", en: "Sign in with Google" },

  // ─── Subscription / pricing ──────────────────────────────────────────
  "subs.plan": { vi: "Gói dịch vụ", en: "Plan" },
  "subs.activeUntil": { vi: "✓ Đã kích hoạt — dùng được đến {date}", en: "✓ Active — valid until {date}" },
  "subs.trialLeft": { vi: "🎁 Đang dùng thử miễn phí — còn {n} ngày", en: "🎁 Free trial — {n} days left" },
  "subs.trialExpired": { vi: "Hết hạn dùng thử — một số nội dung đã bị khoá.", en: "Trial expired — some content is locked." },
  "subs.bestValue": { vi: "Tốt nhất", en: "Best value" },
  "subs.savePct": { vi: "Tiết kiệm {pct}%", en: "Save {pct}%" },
  "subs.creatingLink": { vi: "Đang tạo link thanh toán...", en: "Creating payment link..." },
  "subs.payPayos": { vi: "Thanh toán {price} qua PayOS", en: "Pay {price} via PayOS" },
  "subs.payosError": { vi: "Không tạo được link thanh toán, thử lại.", en: "Couldn't create payment link, try again." },
  "subs.or": { vi: "hoặc", en: "or" },
  "subs.creatingPaypal": { vi: "Đang tạo link PayPal...", en: "Creating PayPal link..." },
  "subs.payPaypal": { vi: "Thanh toán {price} qua PayPal", en: "Pay {price} via PayPal" },
  "subs.paypalError": { vi: "Không tạo được link PayPal, thử lại.", en: "Couldn't create PayPal link, try again." },
  "subs.footer": {
    vi: "Chọn 1 gói ở trên để thanh toán — PayOS (VNĐ) cho người dùng Việt Nam, hoặc PayPal (USD) cho người nước ngoài. Quyền lợi sẽ tự động kích hoạt ngay sau khi thanh toán thành công.",
    en: "Pick a plan above to pay — PayOS (VND) for Vietnamese users, or PayPal (USD) for international users. Access activates automatically once payment succeeds.",
  },
  "plan.monthly": { vi: "1 tháng", en: "1 month" },
  "plan.quarterly": { vi: "3 tháng", en: "3 months" },
  "plan.semiannual": { vi: "6 tháng", en: "6 months" },
  "plan.yearly": { vi: "12 tháng", en: "12 months" },
  "plan_hook.monthly": { vi: "🧋 bằng 1 cốc trà sữa", en: "🧋 about a bubble tea" },
  "plan_hook.yearly": { vi: "☕ Chưa tới 1.000đ/ngày", en: "☕ under 1,000₫ a day" },

  // ─── Home page ───────────────────────────────────────────────────────
  "home.tagline": { vi: "Chọn chủ đề để bắt đầu luyện tập.", en: "Choose a topic to start practicing." },
  "home.overview": { vi: "Tổng quan", en: "Overview" },
  "home.streak": { vi: "Ngày liên tiếp", en: "Day streak" },
  "home.wordsSaved": { vi: "Từ đã lưu", en: "Words saved" },
  "home.totalXp": { vi: "Tổng XP", en: "Total XP" },
  "home.topics": { vi: "Topics", en: "Topics" },
  "home.soon": { vi: "Soon", en: "Soon" },
  "home.trialLeft": { vi: "🎁 Còn {n} ngày dùng thử — mọi nội dung đang mở khoá", en: "🎁 {n} days of trial left — everything is unlocked" },
  "home.viewPlans": { vi: "Xem gói", en: "View plans" },
  "stat.collocationsDue": { vi: "{n} cụm từ cần ôn hôm nay", en: "{n} phrases due today" },
  "stat.collocationsDone": { vi: "Đã ôn hết cho hôm nay ✓", en: "All caught up for today ✓" },
  "stat.cambridgeDone": { vi: "Đã hoàn thành {done}/{total} unit", en: "Completed {done}/{total} units" },
  "stat.listenDone": { vi: "Đã học {done}/{total} bài", en: "Studied {done}/{total} lessons" },
  "stat.idiomsLearned": { vi: "Đã học {done}/{total} từ", en: "Learned {done}/{total} idioms" },

  // ─── Payment return status ───────────────────────────────────────────
  "pay.confirming": { vi: "⏳ Đang xác nhận thanh toán...", en: "⏳ Confirming payment..." },
  "pay.confirmed": { vi: "✅ Thanh toán thành công — đã kích hoạt gói của bạn!", en: "✅ Payment successful — your plan is active!" },
  "pay.timeout": {
    vi: "Thanh toán đang được xử lý — quyền lợi sẽ tự động cập nhật trong giây lát, thử tải lại trang nếu chưa thấy.",
    en: "Payment is being processed — access will update shortly; try reloading if you don't see it yet.",
  },
  "pay.cancelled": { vi: "Bạn đã huỷ thanh toán.", en: "You cancelled the payment." },

  // ─── Purchase / paywall ──────────────────────────────────────────────
  "purchase.title": { vi: "Mở khoá toàn bộ nội dung", en: "Unlock all content" },
  "purchase.sub": {
    vi: "Chọn gói phù hợp và thanh toán — quyền lợi tự động kích hoạt ngay sau khi thanh toán thành công.",
    en: "Pick a plan and pay — access activates automatically once payment succeeds.",
  },
  "paywall.locked": { vi: "Nội dung này đã bị khoá", en: "This content is locked" },
  "paywall.body": {
    vi: "{what} chỉ mở trong thời gian dùng thử hoặc khi đã kích hoạt gói trả phí. Chọn 1 gói bên dưới để thanh toán.",
    en: "{what} is only available during the trial or with an active paid plan. Pick a plan below to pay.",
  },

  // ─── Login screen ────────────────────────────────────────────────────
  "login.subtitle": {
    vi: "Đăng nhập với Google để đồng bộ tiến độ học tập an toàn giữa các thiết bị.",
    en: "Sign in with Google to sync your learning progress safely across devices.",
  },
  "login.features": { vi: "✨ Xem tính năng nổi bật", en: "✨ See key features" },
  "login.bySigningIn": { vi: "Bằng việc đăng nhập, bạn đồng ý với", en: "By signing in you agree to the" },
  "login.terms": { vi: "Điều khoản dịch vụ", en: "Terms of Service" },
  "login.and": { vi: "và", en: "and" },
  "login.privacy": { vi: "Chính sách quyền riêng tư", en: "Privacy Policy" },
  "login.why": { vi: "Vì sao chọn Vocabulary Builder Pro?", en: "Why choose Vocabulary Builder Pro?" },
  "login.whyBody": {
    vi: "Không chỉ học từ — luyện dùng từ thật với AI: ra quiz riêng cho bạn, trò chuyện, chấm bài tức thì. Xây vốn từ giao tiếp lẫn học thuật, hướng tới IELTS band 6.5–9, nhớ lâu chứ không học vẹt.",
    en: "Not just word lists — practice using real language with AI: personalized quizzes, conversation practice, instant grading. Build everyday and academic vocabulary toward IELTS band 6.5–9, with long-term retention instead of rote learning.",
  },
  "feature.cpv.body": {
    vi: "Không học vẹt: AI tự soạn quiz ngữ cảnh riêng cho từng từ (và giảng vì sao các đáp án khác sai), vào vai bạn trò chuyện để bạn luyện dùng từ trong hội thoại thật, rồi chấm từng câu bạn viết/dịch kèm sửa lỗi tức thì. 7 chế độ ôn tập ngắt quãng lo phần ghi nhớ lâu dài.",
    en: "No rote learning: AI builds a context quiz for every phrase (and explains why the other answers are wrong), roleplays a conversation partner so you use the phrase for real, then grades each sentence you write/translate with instant corrections. 7 spaced-repetition modes handle long-term retention.",
  },
  "feature.cambridge.body": {
    vi: "Không phải danh sách từ suông — mỗi unit bám sát giáo trình Cambridge. AI chấm điểm band IELTS thật cho bài nói & bài viết của bạn, kèm nhận xét chi tiết như giám khảo, và đóng vai đối tác hội thoại để luyện phản xạ như thi thật.",
    en: "Not a bare word list — each unit follows the Cambridge coursebook. AI scores your speaking and writing with real IELTS bands plus detailed examiner-style feedback, and acts as a conversation partner for exam-like practice.",
  },
  "feature.listen.body": {
    vi: "Hàng trăm bài nghe 1 phút theo chủ đề để luyện phản xạ mỗi ngày. Nghe xong, AI bắt chuyện ngay về chính chủ đề đó — vừa luyện nói vừa được AI nhận xét cách diễn đạt của bạn tại chỗ.",
    en: "Hundreds of one-minute listening topics for daily practice. After listening, the AI starts a conversation about the same topic — speaking practice with in-the-moment feedback on how you express yourself.",
  },
  "feature.idiom.body": {
    vi: "Mảnh ghép cuối của bộ ba collocation – phrasal verb – idiom để nói tự nhiên như người bản ngữ. AI sẽ ra quiz, trò chuyện và chấm cách dùng idiom đúng ngữ cảnh — y hệt trải nghiệm bạn đã quen ở các module trên.",
    en: "The final piece of the collocation – phrasal verb – idiom trio for sounding like a native speaker. The AI quizzes, chats, and grades idiom usage in context — the same experience you already know from the other modules.",
  },
  "feature.idiom.badge": { vi: "Sắp ra mắt", en: "Coming soon" },
  "feature.lookup.body": {
    vi: "Đang đọc mà gặp từ lạ hay câu ngữ pháp rối? Bôi đen ngay tại chỗ, ở bất cứ đâu trong app — AI giải nghĩa hoặc phân tích cấu trúc câu tức thì, bằng đúng ngôn ngữ bạn chọn trong Cài đặt.",
    en: "Stuck on an unknown word or a confusing sentence? Select it anywhere in the app — the AI explains the meaning or breaks down the grammar instantly, in the language you chose in Settings.",
  },
  "feature.lookup.title": { vi: "Tra cứu & Ngữ pháp tức thì", en: "Instant Lookup & Grammar" },
  "feature.streak.title": { vi: "Streak & XP", en: "Streak & XP" },
  "feature.streak.body": {
    vi: "Mỗi lần AI chấm bài — quiz, hội thoại, bài viết — bạn nhận XP ngay lập tức. Chuỗi ngày học được giữ vững nhờ động lực thật từ kết quả AI chấm, không phải điểm ảo vô nghĩa.",
    en: "Every time the AI grades you — quiz, conversation, writing — you earn XP instantly. Your study streak is driven by real motivation from real AI grading, not meaningless fake points.",
  },
};

const STORAGE_KEY = "english-ui-lang";

let cached: UiLang | null = null;

function loadLang(): UiLang {
  if (typeof window === "undefined") return "vi";
  if (cached) return cached;
  try {
    cached = localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "vi";
  } catch {
    cached = "vi";
  }
  return cached;
}

const listeners = new Set<() => void>();

function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function persist(lang: UiLang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // quota / private mode
  }
}

export function setUiLang(lang: UiLang) {
  cached = lang;
  persist(lang);
  if (typeof document !== "undefined") document.documentElement.lang = lang;
  listeners.forEach((l) => l());
}

/** Pure lookup used by `t` — also exported for non-hook call sites. */
export function translate(
  lang: UiLang,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const entry = STRINGS[key];
  let text = entry ? entry[lang] ?? entry.vi : key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replaceAll(`{${k}}`, String(v));
    }
  }
  return text;
}

/** Reactive UI-language hook. `t` re-renders whenever the language changes. */
export type TranslateFn = (key: string, vars?: Record<string, string | number>) => string;

export function useUiLang() {
  const lang = useSyncExternalStore<UiLang>(subscribe, loadLang, () => "vi");
  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);
  const t = useCallback<TranslateFn>(
    (key, vars) => translate(lang, key, vars),
    [lang],
  );
  return { lang, setUiLang, t };
}



