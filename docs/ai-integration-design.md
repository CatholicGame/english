# AI Integration Design — DeepSeek API

> Tài liệu thiết kế tích hợp AI cho 3 topic hiện có trong ứng dụng English App

---

## Kiến trúc chung

### Nguyên tắc bảo mật

API Key lưu trong `process.env.DEEPSEEK_API_KEY` — **không bao giờ** gửi xuống client. Mọi request qua Next.js API Route server-side:

```
Browser  →  POST /api/ai  →  Next.js API Route (server)  →  DeepSeek API
         ←  JSON response ←                               ←
```

### Cấu trúc thư mục mới

```
src/
├── app/api/
│   ├── ai/route.ts                 ← API route server-side gọi DeepSeek
│   └── drive/
│       └── ai-convos/route.ts      ← GET/PUT AI conversations (Drive sync)
├── components/
│   ├── AiFeedback.tsx              ← Component hiển thị kết quả (reusable)
│   ├── AiSentencePractice.tsx      ← Viết câu + AI check
│   ├── AiConversation.tsx          ← Hội thoại với AI
│   ├── AiConversationHistory.tsx   ← Xem lại lịch sử hội thoại đã lưu
│   └── AiWritingBand.tsx           ← Hiển thị IELTS band scores
└── lib/
    ├── ai-prompts.ts               ← Prompt templates cho từng intent
    ├── ai-convo-store.ts           ← Data model + localStorage persistence
    └── use-ai-convo-store.ts       ← React hook: localStorage + Drive sync
```

### Intent Types

```typescript
type IntentType =
  | "cpv_sentence_check"       // Topic 1: Kiểm tra câu dùng collocation
  | "cpv_paraphrase"           // Topic 1: Viết lại câu
  | "cpv_conversation"         // Topic 1: Hội thoại
  | "lam_opinion_feedback"     // Topic 2: Phản hồi bài viết quan điểm
  | "lam_discussion"           // Topic 2: Thảo luận chủ đề
  | "cielts_writing_feedback"  // Topic 3: Chấm Writing Task
  | "cielts_speaking_feedback" // Topic 3: Phản hồi Speaking
  | "cielts_vocab_sentence";   // Topic 3: Đặt câu với từ vựng

---

## Lưu trữ AI Conversation (Google Drive)

### Tại sao cần lưu?

Mỗi lần người dùng thực hành với AI (viết câu, hội thoại, chấm bài...) là một lần học có giá trị. Nếu không lưu:
- Không xem lại được feedback cũ → lặp lại lỗi tương tự
- Hội thoại với AI bị mất → phải hỏi lại, tốn API cost
- Không có nhật ký học tập → không thấy được tiến bộ

**Nguyên tắc**: Mọi tương tác AI đều tự động lưu. Người dùng xem lại bất cứ lúc nào.

### Data Model

```typescript
// src/lib/ai-convo-store.ts

interface AiMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
}

interface AiConversation {
  id: string;            // UUID
  intent: IntentType;    // Loại bài tập
  itemKey: string;       // e.g. "do away with", "beauty:discuss"
  itemLabel: string;     // Human-readable label
  messages: AiMessage[]; // Toàn bộ messages trong phiên
  createdAt: number;
  updatedAt: number;
}

// Keyed by itemKey, mỗi itemKey có thể có nhiều conversations
type AiConvoData = Record<string, AiConversation[]>;
```

### Storage Pattern (giống NotesData)

Áp dụng đúng pattern hiện tại cho Notes, chỉ khác docKey prefix:

| Layer | File | Vai trò |
|-------|------|---------|
| **Data model** | `ai-convo-store.ts` | Interface, CRUD, localStorage, merge |
| **React hook** | `use-ai-convo-store.ts` | Shared store, Drive fetch, debounce push |
| **Drive I/O** | `google-drive.ts` (mở rộng) | `readDriveAiConvos/writeDriveAiConvos` docKey: `ai-convos-{k}` |
| **API route** | `api/drive/ai-convos/route.ts` | GET/PUT, xác thực session |

### Luồng đồng bộ

```
1. User luyện tập → AI phản hồi → tự động save localStorage
2. Debounce 1.5s → PUT /api/drive/ai-convos → Drive appDataFolder
3. Mở app lần sau → GET /api/drive/ai-convos → merge (newer wins)
4. User mở History → xem lại conversation cũ
```

### ModuleKey convention

| Module | moduleKey | Drive docKey |
|--------|-----------|--------------|
| Collocations & Phrasal Verbs | `collocations-phrasal-verbs` | `ai-convos-collocations-phrasal-verbs` |
| Listen A Minute | `listen-a-minute` | `ai-convos-listen-a-minute` |
| Cambridge IELTS | `cambridge-vocabulary-ielts-advanced` | `ai-convos-cambridge-vocabulary-ielts-advanced` |

### Component: `AiConversationHistory.tsx`

Hiển thị danh sách conversation đã lưu cho 1 itemKey:

```
📚 History: "do away with"
┌─ Aug 12 ───────────────────────────┐
│ ✍️ Sentence Check · ✅ Correct     │
│ "The company decided to do away    │
│  with all paper forms..."          │
│ [ View Full ]                      │
└────────────────────────────────────┘
┌─ Aug 10 ───────────────────────────┐
│ 💬 Conversation · 4 messages       │
│ AI role-play: business scenario    │
│ [ View Full ]                      │
└────────────────────────────────────┘
```

### Tích hợp vào UI hiện tại

- `VerbDetailClient.tsx` → dưới mỗi item: `AiConversationHistory`
- `LessonClient.tsx` step 4 → dưới mỗi task: history
- `UnitClient.tsx` → cạnh Vocab/Writing/Speaking: history

---

## Topic 1: Collocations & Phrasal Verbs

### Hiện trạng

- **Dữ liệu**: 49 verbs, ~500 items (mỗi item: `term`, `type`, `en`, `vi`, `ex`)
- **Mode luyện tập**: Flash cards, MC, Typing, Matching, Listen & choose, Mixed review
- **Luồng**: `/verbs` → `/verbs/[verb]` → `/run?verb=X&mode=mix`
- **Vấn đề**: Người học biết nghĩa nhưng không biết dùng trong câu thực tế. Thiếu production practice.

### AI Feature #1: Sentence Check (`cpv_sentence_check`)

Người dùng được cho 1 collocation, tự viết câu, AI kiểm tra.

**Giao diện:**
```
✍️ Practice: "do away with" = loại bỏ, xóa bỏ
┌──────────────────────────────────────────┐
│ The company decided to do away with all  │
│ paper forms to go digital.              │
└──────────────────────────────────────────┘
[ Submit for Review ]

┌─ AI Feedback ────────────────────────────┐
│ ✅ Correct usage!                        │
│ 💡 Tip: "do away with" often used for    │
│    rules, systems, traditions.           │
│ 📝 Alternative: "abolished paper forms"  │
└──────────────────────────────────────────┘
```

**Prompt:**
```
You are an English teacher helping a Vietnamese student practice collocations.
Target phrase: "{term}"  |  Meaning: "{en}" / "{vi}"  |  Example: "{ex}"
Student's sentence: "{sentence}"

Evaluate: (1) correct usage? (2) grammar? (3) naturalness?
Respond in JSON: { "correct", "grammarOk", "naturalOk", "feedback",
  "correction", "tip", "alternative" }
```

### AI Feature #2: Paraphrase Challenge (`cpv_paraphrase`)

AI đưa câu thường → người dùng viết lại dùng target collocation.

### AI Feature #3: Mini Conversation (`cpv_conversation`)

AI role-play, buộc dùng 2-3 collocations trong 3-5 lượt hội thoại, sau đó tổng kết.

### Vị trí tích hợp

- `VerbDetailClient.tsx` → nút "Practice with AI" mỗi item
- `RunClient.tsx` → bước AI sau session
- Tạo mới `ai/page.tsx` → trang luyện tập AI riêng

---

## Topic 2: Listen A Minute

### Hiện trạng

- **Dữ liệu**: A-Z topics, clozeTemplate ~150 từ, spellingWords, sentences (timestamp)
- **Các bước**: 1.Listening → 2.Gap fill → 3.Spelling → 4.Extension (checklist + Show sample)
- **Vấn đề**: Extension chỉ là "đọc sample" thụ động, không có feedback

### AI Feature #1: Opinion Feedback (`lam_opinion_feedback`)

Bước Extension: người dùng tự viết câu trả lời → AI feedback.

**Giao diện:**
```
☐ Discuss: Is beauty important in today's society?
┌──────────────────────────────────────────┐
│ I think beauty is quite important        │
│ because people judge others by...        │
└──────────────────────────────────────────┘
[ Get AI Feedback ]  [ Show Sample ]

┌─ AI Feedback ────────────────────────────┐
│ 📊 Grammar: 4/5 — minor article issue    │
│ 📝 Vocabulary: Try "superficial" instead │
│ 💡 Content: Clear. Add a counter-example.│
│ ✏️ Corrected: "I think beauty is..."     │
└──────────────────────────────────────────┘
```

**Prompt:**
```
Student answered a discussion question about "{topic}".
Question: "{question}"  |  Answer: "{answer}"
JSON: { "grammarScore", "grammarNotes", "vocabScore",
  "vocabNotes", "contentNotes", "corrected", "encouragement" }
```

### AI Feature #2: Discussion Partner (`lam_discussion`)

AI hỏi 3 câu mở rộng về chủ đề, phản hồi tự nhiên, tổng kết cuối.

### Vị trí tích hợp

- `LessonClient.tsx` step 4 → textarea + AI feedback + AI discussion

---

## Topic 3: Cambridge Vocabulary for IELTS Advanced

### Hiện trạng

- **Dữ liệu**: 25 units, 9 loại step: vocab, listening_cloze, sort, type_fill, fill_mc, reading_tfng, reveal_pairs, speaking, writing_task
- **Speaking**: Cue card + timer, không feedback — chỉ "Done"
- **Writing**: Textarea + model answer, không chấm điểm
- **Vấn đề**: 2 kỹ năng quan trọng nhất thiếu feedback hoàn toàn

### AI Feature #1: Writing Feedback (`cielts_writing_feedback`)

Chấm theo 4 tiêu chí IELTS: Task Achievement/Task Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy.

**Giao diện:**
```
📝 Writing Task 1
[Prompt + chart data như hiện tại]
┌──────────────────────────────────────────┐
│ (textarea người dùng viết)               │
└──────────────────────────────────────────┘
147 words
[ Get AI Feedback ]  [ Show Model ]

┌─ IELTS Band Assessment ──────────────────┐
│ Task Achievement:     Band 6             │
│ Coherence & Cohesion: Band 6.5           │
│ Lexical Resource:     Band 5.5           │
│ Grammatical Range:    Band 6             │
│ 📝 Estimated Overall: Band 6             │
│ 🔧 Corrections:                          │
│  • "graph show" → "graph shows"          │
│ 💡 Use more varied trend vocabulary      │
└──────────────────────────────────────────┘
```

**Prompt:**
```
You are an IELTS examiner. Task {taskNumber}: "{prompt}"
Response: "{draft}"

Evaluate using official IELTS criteria. Respond in JSON:
{
  "taskAchievement": { "band": number, "comment": "..." },
  "coherence": { "band": number, "comment": "..." },
  "lexicalResource": { "band": number, "comment": "..." },
  "grammaticalRange": { "band": number, "comment": "..." },
  "overallBand": number,
  "corrections": [{ "original", "corrected", "explanation" }],
  "suggestions": ["tip1", "tip2"],
  "rewrittenParagraph": "..."
}
```

### AI Feature #2: Speaking Feedback (`cielts_speaking_feedback`)

Người dùng gõ text câu trả lời → AI chấm Fluency, Lexical Resource, Grammar (text-only, bỏ qua pronunciation).

### AI Feature #3: Vocabulary Sentence (`cielts_vocab_sentence`)

Trong Vocab step, thêm "Use in a sentence" → AI kiểm tra academic context, IELTS readiness.

### Vị trí tích hợp

- `VocabStepView` → nút "Practice with AI"

---

## Thiết kế API Route (`src/app/api/ai/route.ts`)

```typescript
import { NextResponse, type NextRequest } from "next/server";

const DEEPSEEK_BASE = "https://api.deepseek.com/v1";
const MODEL = "deepseek-chat";

function apiKey(): string {
  const v = process.env.DEEPSEEK_API_KEY;
  if (!v) throw new Error("DEEPSEEK_API_KEY is not set");
  return v;
}

async function callDeepSeek(systemPrompt: string, userMsg: string, temp = 0.3) {
  const res = await fetch(`${DEEPSEEK_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey()}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMsg },
      ],
      temperature: temp,
      response_format: { type: "json_object" },
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DeepSeek ${res.status}: ${err}`);
  }
  const data = await res.json();
  return JSON.parse(data.choices?.[0]?.message?.content);
}

export async function POST(request: NextRequest) {
  try {
    const { intent, payload } = await request.json();
    if (!intent) {
      return NextResponse.json({ ok: false, error: "missing intent" }, { status: 400 });
    }
    const { systemPrompt, userMessage, temperature } = buildPrompt(intent, payload);
    const result = await callDeepSeek(systemPrompt, userMessage, temperature);
    return NextResponse.json({ ok: true, data: result });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
```

---

## Prompt Engineering Guidelines

| Nguyên tắc | Áp dụng |
|-----------|---------|
| **JSON mode** | Luôn dùng `response_format: { type: "json_object" }` để parse an toàn |
| **Role rõ ràng** | Xác định role: "English teacher", "IELTS examiner", "Conversation partner" |
| **Temperature** | 0.2-0.3 cho chấm điểm/chữa bài, 0.7-0.8 cho hội thoại |
| **B1-B2 target** | Điều chỉnh ngôn ngữ phù hợp trình độ người học |
| **Few-shot** | Với intent phức tạp (IELTS band), thêm 1-2 example trong system prompt |
| **Max tokens** | 1024 cho response (feedback + corrections) |
| **Rate limiting** | 10 requests/phút/user để tránh lạm dụng |
| **Language** | Feedback chính bằng tiếng Anh (immersion), giải thích thêm bằng tiếng Việt nếu cần |

---

## Component UI (Reusable)

### `AiFeedback.tsx`

Component dùng chung hiển thị kết quả AI:

```typescript
interface AiFeedbackProps {
  loading: boolean;
  result: AiResult | null;
  error: string | null;
  onRetry?: () => void;
  variant: "sentence" | "ielts_band" | "general";
}
// Hiển thị:
// - loading: "AI is analyzing your response..."
// - error: thông báo lỗi + nút retry
// - result: render theo variant
```

### Các component AI theo topic

```
src/components/
├── AiFeedback.tsx            ← Reusable feedback display
├── AiSentencePractice.tsx    ← Topic 1: viết câu + AI check
├── AiParaphraseChallenge.tsx ← Topic 1: paraphrase challenge
├── AiConversation.tsx        ← Topic 1+2: hội thoại với AI
├── AiOpinionFeedback.tsx     ← Topic 2: feedback bài viết
└── AiWritingBand.tsx         ← Topic 3: IELTS band scores display
```

---

## Kế hoạch triển khai

| Phase | Nội dung | Ưu tiên | Độ phức tạp |
|-------|---------|---------|-------------|
| **1. Foundation** | `api/ai/route.ts`, `ai-prompts.ts`, `AiFeedback.tsx`, `.env` | 🔴 Cao | ⭐ |
| **2. Topic 1** | Sentence check, Paraphrase, Conversation → integrate VerbDetail + RunClient | 🔴 Cao | ⭐⭐ |
| **3. Topic 3** | Writing band scoring, Speaking feedback, Vocab sentences → integrate UnitClient | 🟡 TB | ⭐⭐⭐ |
| **4. Topic 2** | Opinion feedback, Discussion partner → integrate LessonClient | 🟢 Thấp | ⭐⭐ |
| **5. Polish** | Rate limit, error handling, retry, usage analytics | 🟢 Thấp | ⭐ |

### Lý do ưu tiên Topic 1 trước

1. **Dữ liệu đơn giản nhất**: term + meaning + example → prompt đơn giản, dễ test
2. **Impact lớn nhất**: 49 verbs × ~500 collocations → kho bài tập khổng lồ
3. **Làm nền tảng**: Các component (AiSentencePractice, AiFeedback) tái sử dụng được cho Topic 2 & 3
4. **Ít rủi ro**: Feedback đơn giản (correct/incorrect), không cần band score phức tạp

### Tổng kết AI Features

| Topic | Features | Số lượng intent |
|-------|---------|-----------------|
| Collocations & Phrasal Verbs | Sentence check, Paraphrase, Conversation | 3 |
| Listen A Minute | Opinion feedback, Discussion partner | 2 |
| Cambridge IELTS Advanced | Writing band, Speaking feedback, Vocab sentence | 3 |
| **Tổng** | | **8 intents** |
