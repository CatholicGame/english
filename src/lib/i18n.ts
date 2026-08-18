// Minimal UI language layer (vi/en) for the app interface. This is SEPARATE
// from the AI feedback language (src/lib/ai-lang-prefs.ts): that one controls
// what language the AI writes feedback/explanation prose in; this one controls
// the interface chrome (menus, labels, buttons, banners). The learning content
// itself (modules, lessons, exercises) is intentionally never translated.
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

/** Flat key {vi, en} dictionary. `t()` falls back to `vi` then the raw key. */
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
  "subs.activeUntil": { vi: "✓ Đã kích hoạt. Dùng được đến {date}", en: "✓ Active. Valid until {date}" },
  "subs.trialLeft": { vi: "🎁 Đang dùng thử miễn phí. Còn {n} ngày", en: "🎁 Free trial. {n} days left" },
  "subs.trialExpired": { vi: "Hết hạn dùng thử. Một số nội dung đã bị khoá.", en: "Trial expired. Some content is locked." },
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
    vi: "Chọn 1 gói ở trên để thanh toán: PayOS (VNĐ) cho người dùng Việt Nam, hoặc PayPal (USD) cho người nước ngoài. Quyền lợi sẽ tự động kích hoạt ngay sau khi thanh toán thành công.",
    en: "Pick a plan above to pay: PayOS (VND) for Vietnamese users, or PayPal (USD) for international users. Access activates automatically once payment succeeds.",
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
  "home.trialLeft": { vi: "🎁 Còn {n} ngày dùng thử. Mọi nội dung đang mở khoá", en: "🎁 {n} days of trial left. Everything is unlocked" },
  "home.viewPlans": { vi: "Xem gói", en: "View plans" },
  "stat.collocationsDue": { vi: "{n} cụm từ cần ôn hôm nay", en: "{n} phrases due today" },
  "stat.collocationsDone": { vi: "Đã ôn hết cho hôm nay ✓", en: "All caught up for today ✓" },
  "stat.cambridgeDone": { vi: "Đã hoàn thành {done}/{total} unit", en: "Completed {done}/{total} units" },
  "stat.listenDone": { vi: "Đã học {done}/{total} bài", en: "Studied {done}/{total} lessons" },
  "stat.idiomsLearned": { vi: "Đã học {done}/{total} từ", en: "Learned {done}/{total} idioms" },

  // ─── Payment return status ───────────────────────────────────────────
  "pay.confirming": { vi: "⏳ Đang xác nhận thanh toán...", en: "⏳ Confirming payment..." },
  "pay.confirmed": { vi: "✅ Thanh toán thành công. Đã kích hoạt gói của bạn!", en: "✅ Payment successful. Your plan is active!" },
  "pay.timeout": {
    vi: "Thanh toán đang được xử lý. Quyền lợi sẽ tự động cập nhật trong giây lát. Thử tải lại trang nếu chưa thấy.",
    en: "Payment is being processed. Access will update shortly. Try reloading if you don't see it yet.",
  },
  "pay.cancelled": { vi: "Bạn đã huỷ thanh toán.", en: "You cancelled the payment." },

  // ─── Purchase / paywall ──────────────────────────────────────────────
  "purchase.title": { vi: "Mở khoá toàn bộ nội dung", en: "Unlock all content" },
  "purchase.sub": {
    vi: "Chọn gói phù hợp và thanh toán. Quyền lợi tự động kích hoạt ngay sau khi thanh toán thành công.",
    en: "Pick a plan and pay. Access activates automatically once payment succeeds.",
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
    vi: "Không chỉ học từ. Luyện dùng từ thật với AI: ra quiz riêng cho bạn, trò chuyện, chấm bài tức thì. Xây vốn từ giao tiếp lẫn học thuật, hướng tới IELTS band 6.5-9, nhớ lâu chứ không học vẹt.",
    en: "Not just word lists. Practice using real language with AI: personalized quizzes, conversation practice, instant grading. Build everyday and academic vocabulary toward IELTS band 6.5-9, with long-term retention instead of rote learning.",
  },
  "feature.cpv.why": {
    vi: "Cụm động từ (phrasal verbs) và collocations chiếm phần lớn tiếng Anh người bản ngữ dùng mỗi ngày, nhưng nghĩa của chúng thường không thể đoán từ từng từ riêng lẻ. Không nắm chúng, bạn sẽ nghe hiểu chậm và nói nghe như 'dịch từng chữ'.",
    en: "Phrasal verbs and collocations make up a huge share of everyday native English, yet their meaning usually can't be guessed from the individual words. Skip them and you'll listen slowly and sound like you're translating word-by-word.",
  },
  "feature.cpv.how": {
    vi: "Thay vì học thuộc danh sách, Vocabulary Builder Pro nhóm từ theo nghĩa gốc của động từ, để AI tự soạn quiz theo ngữ cảnh (kèm giải thích vì sao đáp án khác sai), cho bạn hội thoại thật để dùng từ, và 7 chế độ ôn tập ngắt quãng giúp nhớ lâu.",
    en: "Instead of rote lists, Vocabulary Builder Pro groups phrases by the core meaning of the verb, has AI build context quizzes (explaining why the wrong answers are wrong), roleplays real conversations so you actually use the phrases, and 7 spaced-repetition modes lock them in long-term.",
  },
  "feature.cambridge.why": {
    vi: "IELTS điểm cao đòi hỏi vốn từ học thuật và phối hợp cả 4 kỹ năng. Một danh sách từ suông không đưa bạn tới đó được.",
    en: "A high IELTS band needs academic vocabulary plus all four skills working together. A bare word list can't get you there.",
  },
  "feature.cambridge.how": {
    vi: "Mỗi unit bám sát giáo trình Cambridge: bài nghe, đọc, nói, viết tương tác hoàn chỉnh. AI chấm bài nói/viết của bạn theo band IELTS thật với nhận xét chi tiết như giám khảo.",
    en: "Every unit follows the Cambridge coursebook: full interactive listening, reading, speaking and writing tasks. The AI grades your speaking and writing with real IELTS bands and detailed examiner-style feedback.",
  },
  "feature.listen.why": {
    vi: "Nghe hiểu là kỹ năng cần luyện đều mỗi ngày với lượng nhỏ. Nghe chủ đề ngắn giúp tai quen dần với tốc độ tự nhiên, đồng thời tích lũy kiến thức nền để nói và viết về sau.",
    en: "Listening is a skill that needs small daily practice. Short topics let your ear gradually adjust to natural speed while building background knowledge you'll reuse for speaking and writing.",
  },
  "feature.listen.how": {
    vi: "Hàng trăm bài nghe 1 phút được sắp xếp theo bảng chữ cái, phủ đa dạng chủ đề. Nghe xong, bạn điền từ còn thiếu, sửa chính tả, rồi AI bắt chuyện ngay về chính chủ đề đó để luyện nói.",
    en: "Hundreds of one-minute topics organized A-Z across a wide range of subjects. After listening, fill in the gaps, fix the spelling, then the AI starts a conversation about the very same topic to practice speaking.",
  },
  "feature.idiom.why": {
    vi: "Idioms là thứ tạo nên chất 'bản ngữ', nhưng gần như không thể dịch từng từ. Nắm đúng idioms giúp bạn nghe người bản xứ không bị lạc, và diễn đạt sắc sảo, tự nhiên.",
    en: "Idioms are what make you sound native, yet they're almost impossible to translate word-for-word. Understanding them keeps you from getting lost when natives speak, and lets you express yourself sharply and naturally.",
  },
  "feature.idiom.how": {
    vi: "Mỗi idiom đi kèm câu chuyện nguồn gốc lịch sử để bạn hiểu vì sao nó ra đời, nhớ tự nhiên không học vẹt, cùng ví dụ, quiz và hội thoại AI để luyện dùng đúng ngữ cảnh.",
    en: "Every idiom comes with its historical origin story so you understand why it exists, remember it naturally without rote learning, and practice using it in the right context with examples, quizzes, and AI conversations.",
  },
  "feature.lookup.body": {
    vi: "Đang đọc mà gặp từ lạ hay câu ngữ pháp rối? Bôi đen ngay tại chỗ, ở bất cứ đâu trong app. AI giải nghĩa hoặc phân tích cấu trúc câu tức thì, bằng đúng ngôn ngữ bạn chọn trong Cài đặt.",
    en: "Stuck on an unknown word or a confusing sentence? Select it anywhere in the app. The AI explains the meaning or breaks down the grammar instantly, in the language you chose in Settings.",
  },
  "feature.lookup.title": { vi: "Tra cứu & Ngữ pháp tức thì", en: "Instant Lookup & Grammar" },
  "feature.streak.title": { vi: "Streak & XP", en: "Streak & XP" },
  "feature.streak.body": {
    vi: "Mỗi lần AI chấm bài, dù là quiz, hội thoại hay bài viết, bạn nhận XP ngay lập tức. Chuỗi ngày học được giữ vững nhờ động lực thật từ kết quả AI chấm, không phải điểm ảo vô nghĩa.",
    en: "Every time the AI grades you, whether quiz, conversation or writing, you earn XP instantly. Your study streak is driven by real motivation from real AI grading, not meaningless fake points.",
  },
  "feature.whyLabel": { vi: "Tại sao cần học?", en: "Why learn this?" },
  "feature.howLabel": { vi: "Vocabulary Builder Pro giúp thế nào?", en: "How Vocabulary Builder Pro helps" },

  // ─── Login: learning-path stage headers ───────────────────────────────
  "feature.stage.vocab": { vi: "🌱 Giai đoạn 1 · Xây vốn từ vựng", en: "🌱 Stage 1 · Build your vocabulary" },
  "feature.stage.vocab.desc": {
    vi: "Bắt đầu từ nền móng: nắm chắc collocations, phrasal verbs và tra cứu mọi từ mới ngay tại chỗ.",
    en: "Start with the foundation: master collocations, phrasal verbs, and look up any new word right where you meet it.",
  },
  "feature.stage.communicate": { vi: "🗣️ Giai đoạn 2 · Giao tiếp tự nhiên", en: "🗣️ Stage 2 · Communicate naturally" },
  "feature.stage.communicate.desc": {
    vi: "Biến vốn từ thành lời nói: idioms đúng ngữ cảnh và phản xạ nghe nói với AI mỗi ngày.",
    en: "Turn vocabulary into speech: context-perfect idioms and daily listening and speaking reflexes with AI.",
  },
  "feature.stage.ielts": { vi: "🎯 Giai đoạn 3 · Nâng cao IELTS", en: "🎯 Stage 3 · Advanced IELTS" },
  "feature.stage.ielts.desc": {
    vi: "Đưa mọi kỹ năng lên tầm band 6.5-9 theo giáo trình Cambridge, được AI chấm điểm như giám khảo thật.",
    en: "Level everything up to band 6.5-9 on the Cambridge syllabus, graded by AI like a real examiner.",
  },
  "feature.stage.system": { vi: "⚙️ Trải nghiệm học liền mạch", en: "⚙️ Seamless learning experience" },
  "feature.stage.system.desc": {
    vi: "Mọi công cụ nằm gọn trong app, từ đã tra được highlight ngay trong bài, XP và streak giữ nhịp học mỗi ngày. Mạch học không bao giờ đứt quãng.",
    en: "Every tool lives inside the app, looked-up words light up in your reading, and XP/streaks keep the daily rhythm. Your flow never breaks.",
  },
  "feature.allinone.title": { vi: "Tất cả trong một", en: "All in one" },
  "feature.allinone.body": {
    vi: "Tra cứu từ, phân tích ngữ pháp, từ điển cá nhân và trò chuyện với AI đều nằm ngay trong app. Không cần thoát ra tham khảo tài nguyên khác, việc học không bao giờ bị gián đoạn.",
    en: "Word lookup, grammar analysis, your personal dictionary, and AI chat all live inside the app. No need to leave for outside resources, so learning never gets interrupted.",
  },
  "feature.highlight.title": { vi: "Từ đã tra được highlight", en: "Looked-up words highlighted" },
  "feature.highlight.body": {
    vi: "Mọi từ bạn từng tra cứu được tô màu ngay trong bài đọc. Vô tình bắt gặp lại từng từ thường xuyên hơn, não ghi nhớ lâu hơn rất nhiều so với học một lần rồi quên.",
    en: "Every word you've ever looked up is highlighted right in your reading. You keep bumping into it, which cements it far better than learning it once and forgetting.",
  },

  // ─── User guide (gear menu + first-run onboarding) ───────────────────
  "settings.guide": { vi: "Hướng dẫn sử dụng", en: "User guide" },
  "guide.title": { vi: "Hướng dẫn sử dụng", en: "User guide" },
  "guide.subtitle": { vi: "Những điều cần biết để bắt đầu nhanh nhất.", en: "Everything you need to start fast." },
  "guide.start.title": { vi: "🚀 Bắt đầu: lộ trình 3 giai đoạn", en: "🚀 Getting started: the 3-stage path" },
  "guide.start.body": {
    vi: "App dạy tiếng Anh theo lộ trình: giai đoạn 1 xây vốn từ vựng (Collocations & Phrasal Verbs), giai đoạn 2 giao tiếp tự nhiên (Idioms, Listen A Minute), giai đoạn 3 nâng cao IELTS (Cambridge IELTS Advanced). Bắt đầu từ Collocations, rồi mở dần các module khác.",
    en: "The app teaches English along a path: stage 1 builds vocabulary (Collocations & Phrasal Verbs), stage 2 natural communication (Idioms, Listen A Minute), stage 3 IELTS mastery (Cambridge IELTS Advanced). Start with Collocations, then open the rest.",
  },
  "guide.practice.title": { vi: "✏️ Luyện tập & động lực", en: "✏️ Practice & motivation" },
  "guide.practice.body": {
    vi: "Mỗi module có nhiều chế độ luyện: quiz, viết, dịch, hội thoại với AI và discussion tự do. Mỗi lần AI chấm bài bạn nhận XP; streak cộng dồn mỗi ngày học. Xem tiến độ ở trang chủ.",
    en: "Every module has several practice modes: quizzes, writing, translation, AI conversation and free discussion. Every AI-graded attempt earns XP; your streak grows each day you study. Track progress on the home page.",
  },
  "guide.ai.title": { vi: "🤖 AI trong app", en: "🤖 How the AI helps" },
  "guide.ai.body": {
    vi: "AI tự soạn quiz theo ngữ cảnh, đóng vai đối tác hội thoại, và chấm bài nói/viết theo band IELTS (module Cambridge). Ngôn ngữ phản hồi chọn trong Settings, mục 'Ngôn ngữ phản hồi AI' (Tiếng Việt hoặc English).",
    en: "The AI builds context-based quizzes, roleplays a conversation partner, and grades speaking/writing with IELTS bands (Cambridge module). Pick the feedback language in Settings, the 'AI feedback language' section (Vietnamese or English).",
  },
  "guide.lookup.title": { vi: "🔍 Tra cứu & highlight", en: "🔍 Lookup & highlights" },
  "guide.lookup.body": {
    vi: "Bôi đen bất kỳ từ hoặc câu nào trong app, rồi chọn 'Tra cứu' để xem nghĩa, hoặc 'Ngữ pháp' để AI phân tích cấu trúc. Từ đã tra được tự động tô màu trong bài đọc để bạn gặp lại và nhớ lâu hơn. Tất cả được lưu ở trang Từ điển.",
    en: "Select any word or sentence in the app, then tap 'Lookup' for the meaning, or 'Grammar' for AI structure analysis. Looked-up words are automatically highlighted in your reading so you meet them again and remember longer. Everything is saved on the Dictionary page.",
  },
  "guide.payment.title": { vi: "💳 Thanh toán & quyền lợi", en: "💳 Payment & access" },
  "guide.payment.body": {
    vi: "Mọi tài khoản có 7 ngày dùng thử với toàn bộ nội dung mở khoá. Hết thời gian thử, chọn gói để tiếp tục: PayOS (VNĐ) cho người Việt Nam, PayPal (USD) cho người nước ngoài. Quyền lợi tự động kích hoạt sau khi thanh toán thành công.",
    en: "Every account gets a 7-day trial with everything unlocked. After the trial, pick a plan: PayOS (VND) for Vietnamese users, PayPal (USD) for international users. Access activates automatically once payment succeeds.",
  },

  // ─── First-run onboarding ────────────────────────────────────────────
  "onboarding.welcome.title": { vi: "Chào mừng đến Vocabulary Builder Pro", en: "Welcome to Vocabulary Builder Pro" },
  "onboarding.welcome.body": {
    vi: "App dạy tiếng Anh theo 3 giai đoạn: 🌱 xây vốn từ vựng, 🗣️ giao tiếp tự nhiên, 🎯 nâng cao IELTS. Bạn có thể bắt đầu ngay với Collocations & Phrasal Verbs.",
    en: "The app teaches English in 3 stages: 🌱 build vocabulary, 🗣️ communicate naturally, 🎯 IELTS mastery. You can start right away with Collocations & Phrasal Verbs.",
  },
  "onboarding.lookup.title": { vi: "Bôi đen là tra được ngay", en: "Select any text to look it up" },
  "onboarding.lookup.body": {
    vi: "Gặp từ lạ hay câu ngữ pháp rối? Bôi đen ngay tại chỗ, rồi chọn 'Tra cứu' để xem nghĩa, hoặc 'Ngữ pháp' để AI phân tích cấu trúc. Mọi thứ diễn ra ngay trong app. Không cần thoát ra tìm tài liệu khác.",
    en: "Stuck on a word or a confusing sentence? Select it right there, then tap 'Lookup' for the meaning, or 'Grammar' for AI structure analysis. Everything happens inside the app. No need to leave for other resources.",
  },
  "onboarding.highlight.title": { vi: "Từ đã tra sẽ được highlight", en: "Looked-up words stay highlighted" },
  "onboarding.highlight.body": {
    vi: "Những từ bạn từng tra cứu tự động được tô màu trong bài đọc. Bạn vô tình bắt gặp lại mỗi ngày và nhớ lâu hơn hẳn. Xem lại tất cả ở trang Từ điển.",
    en: "Words you've looked up are automatically highlighted in your reading. You keep running into them daily and remember them far longer. Review them all on the Dictionary page.",
  },
  "onboarding.next": { vi: "Tiếp", en: "Next" },
  "onboarding.skip": { vi: "Bỏ qua", en: "Skip" },
  "onboarding.done": { vi: "Bắt đầu học 🚀", en: "Start learning 🚀" },

  // ─── Collocations writing practice ───────────────────────────────────
  "write.groupHelp": {
    vi: "Chọn nhóm động từ (do, go, ...). AI sẽ tự chọn những collocation/phrasal verb phù hợp nhất trong nhóm để dựng bài, không cần dùng hết.",
    en: "Pick verb groups (do, go, ...). The AI chooses the collocations/phrasal verbs that best fit the passage from them; you don't need to use them all.",
  },
  "write.promptTopicAndGroup": { vi: "Chọn một chủ đề và ít nhất một nhóm động từ để bắt đầu.", en: "Pick a topic and at least one verb group to start." },
  "write.promptTopic": { vi: "Chọn một chủ đề ở trên để bắt đầu.", en: "Pick a topic above to start." },
  "write.promptGroup": { vi: "Chọn ít nhất một nhóm động từ để bắt đầu.", en: "Pick at least one verb group to start." },
  "lock.badge": { vi: "Khoá", en: "Locked" },

  // ─── Login ───────────────────────────────────────────────────────────
  "login.interfaceLang": { vi: "Ngôn ngữ giao diện", en: "Interface language" },

  // ─── Shared across practice screens ──────────────────────────────────
  "discussion.prompt": {
    vi: "Đặt câu hỏi hoặc chia sẻ ý kiến của bạn về “{term}” để bắt đầu cuộc thảo luận.",
    en: "Ask a question or share your thoughts about “{term}” to start the discussion.",
  },
  "lookup.lookup": { vi: "🔍 Tra cứu", en: "🔍 Look up" },
  "lookup.grammar": { vi: "📐 Ngữ pháp", en: "📐 Grammar" },
  "quota.low": {
    vi: "⚠️ Google Drive của bạn chỉ còn {gb} trống. Tiến độ học có thể không đồng bộ được.",
    en: "⚠️ Your Google Drive only has {gb} left. Study progress may not sync.",
  },
  "quota.cleanup": { vi: "Hãy dọn bớt dung lượng Drive.", en: "Free up some Drive space." },

  // ─── Cambridge unit labels ───────────────────────────────────────────
  "unit.sampleLoading": { vi: "Đang tạo đoạn văn mẫu...", en: "Generating sample passage..." },
  "unit.sampleButton": { vi: "📝 Xem đoạn văn mẫu Writing Task 2", en: "📝 See sample Writing Task 2 passage" },
  "unit.sampleLabel": { vi: "📝 Đoạn văn mẫu Writing Task 2", en: "📝 Sample Writing Task 2 passage" },
  "unit.explain": { vi: "Xem giải thích chi tiết", en: "See detailed explanation" },
  "unit.keyIdea": { vi: "🌟 Ý chính", en: "🌟 Key idea" },
  "unit.synonyms": { vi: "Từ đồng nghĩa", en: "Synonyms" },
  "unit.antonyms": { vi: "Trái nghĩa", en: "Antonyms" },
  "unit.examples": { vi: "📌 Ví dụ", en: "📌 Examples" },

  // ─── Idiom detail labels ─────────────────────────────────────────────
  "idiom.learned": { vi: "Đã thuộc", en: "Learned" },
  "idiom.concept": { vi: "📖 Khái niệm", en: "📖 Meaning" },
  "idiom.origin": { vi: "📜 Nguồn gốc", en: "📜 Origin" },
  "idiom.remember": { vi: "🧠 Bạn có nhớ thành ngữ này không?", en: "🧠 Do you remember this idiom?" },
  "idiom.review": { vi: "🔁 Cần ôn lại", en: "🔁 Need review" },
  "idiom.known": { vi: "✅ Đã nhớ", en: "✅ Got it" },
  "idiom.practice": { vi: "🤖 Luyện tập với AI", en: "🤖 Practice with AI" },
  "idiom.examples": { vi: "✏️ Ví dụ", en: "✏️ Examples" },
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

/** Pure lookup used by `t`; also exported for non-hook call sites. */
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



