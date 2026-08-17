# Launch Checklist — hướng tới sản phẩm trả phí

Cập nhật sau quyết định 2026-08-15: **core value của sản phẩm là học từ vựng** (personal dictionary + highlight-on-page + Collocations/Phrasal Verbs cho giao tiếp tự nhiên). Cambridge IELTS Advanced là một track song song, dành cho người cần luyện thi — **không phải trọng tâm chính**. Mọi quyết định về retention, onboarding, và thứ tự ưu tiên bên dưới đều lấy việc học/nhớ từ vựng làm trung tâm trước, IELTS là lớp bổ sung.

Xem thêm bối cảnh chiến lược đầy đủ hơn ở [production-readiness-roadmap.md](./production-readiness-roadmap.md) — file này là checklist hành động cụ thể, được refine lại từ đó.

---

## ✅ Đã xong (2026-08-15)

- [x] Bỏ tài khoản khách (`guest_ok`) — mọi người dùng bắt buộc đăng nhập Google (`src/app/login/LoginScreen.tsx`, `src/proxy.ts`, `src/app/api/share/route.ts`).
- [x] Xác nhận dữ liệu cá nhân hoá đã lưu **ẩn** trong Drive riêng của từng người — kiến trúc `drive.appdata` scope + `appDataFolder` (`src/lib/google-drive.ts`) đã làm đúng việc này từ trước, không cần xây thêm.
- [x] Thanh toán thật qua PayOS (2026-08-17), thay hoàn toàn cơ chế mã kích hoạt thủ công trước đó:
  - `src/lib/subscription-store.ts` — bản ghi entitlement, giờ lưu trong Firestore (`subscriptions/{email}`), không còn trong Drive của từng người.
  - `src/app/api/subscription/route.ts` — GET/PUT sync (thay `/api/drive/subscription` cũ).
  - `src/app/api/payos/create-payment-link/route.ts` + `src/app/api/payos/webhook/route.ts` — tạo link thanh toán PayOS thật, webhook tự động cộng thời hạn khi thanh toán thành công (verify chữ ký HMAC qua `payos.webhooks.verify()`). Không cần admin xác nhận bằng mắt hay phát mã tay nữa. Chi tiết đầy đủ: [subscription-interim-system.md](./subscription-interim-system.md).

---

## 1. Core loop — học & nhớ từ vựng (ưu tiên cao nhất, vì đây là core value)

- [ ] **Spaced repetition cho personal dictionary** — hiện dictionary chỉ lưu + highlight lại trên trang, chưa có lịch ôn tập chủ động (SRS). Đây là tính năng đòn bẩy lớn nhất cho một app từ vựng — nếu chỉ làm 1 việc trong danh sách này, nên là việc này.
- [ ] **Mức độ ghi nhớ theo từ** (mới/đang học/đã thuộc) thay vì nhị phân "đã lưu/chưa lưu" — để SRS ở trên có dữ liệu để xếp lịch.
- [ ] **Widget "từ cần ôn hôm nay"** ở trang chủ — điểm chạm đầu tiên mỗi khi mở app.
- [x] **Streak thống nhất toàn app** (2026-08-15) — `src/lib/use-dashboard-progress.ts` gộp 3 nhật ký hoạt động độc lập (Collocations/Cambridge/Listen A Minute, mỗi module vẫn giữ `ProgressProvider` + `storageKey` riêng của nó) thành 1 streak chung: một ngày tính là "có học" nếu BẤT KỲ module nào có hoạt động. Hiển thị ở trang chủ (khu "Tổng quan": 🔥 streak + biểu đồ 7 ngày + tổng XP + số từ đã lưu) và thay luôn con số streak module-riêng trước đây ở "Today" hub của Collocations — chỉ còn đúng 1 con số streak duy nhất hiển thị ở bất kỳ đâu trong app, tránh gây confusing/mất niềm tin vào số liệu. Trang chủ cũng đổi `statsLabel` tĩnh của từng module card thành số liệu sống (X cụm từ cần ôn / X/Y unit đã xong / X/Y bài đã học).
- [ ] Band điểm Cambridge theo thời gian — chưa làm (cần duyệt lại `ai-convo-store` để trích `overallBand` lịch sử, xem mục "Scope dashboard" đã quyết định hoãn vì IELTS không phải core value).
- [ ] **Drill từ yếu** — tự động tạo bài tập nhắm vào các từ người dùng hay sai/độ tự tin thấp, thay vì bài tập ngẫu nhiên.

## 2. Mở rộng nội dung Collocations/Phrasal Verbs (giao tiếp tự nhiên)

- [ ] Thêm gói collocations/phrasal verbs theo cấp độ (beginner → advanced), hiện có vẻ mới có 1 bộ (`basic-verbs.ts`).
- [ ] Bộ từ vựng theo tình huống giao tiếp thực tế (đặt bàn nhà hàng, phỏng vấn xin việc, small talk...) — bổ sung cho bộ collocations hiện tại.
- [ ] Làm rõ trong UI: Dictionary + Collocations/Phrasal Verbs là core; Listen A Minute là bổ trợ nghe; Cambridge IELTS Advanced là track riêng cho người luyện thi — tránh để người dùng mới thấy IELTS là trọng tâm.

## 3. Onboarding & activation

- [ ] Luồng first-run: hỏi nhanh mục tiêu (giao tiếp hàng ngày / công việc / luyện thi) → dẫn thẳng vào module phù hợp thay vì màn hình chọn module ngang hàng.
- [ ] "Win" đầu tiên trong 5 phút: 1 bài tra từ + feedback AI ngay, thấy giá trị cụ thể trước khi mời nâng cấp.

## 4. Thanh toán & giới hạn theo gói

- [x] **Gate nội dung theo `isUnlocked`** (2026-08-15) — `src/lib/content-access.ts` + `isUnlocked` từ `useSubscriptionStore()` (true trong lúc trial 7 ngày HOẶC còn thời hạn trả phí) giờ khoá:
  - Cambridge IELTS Advanced: chỉ Unit 1 free, Unit 2 trở đi khoá (`FREE_CAMBRIDGE_UNIT`).
  - Listen A Minute: chỉ 1 bài free (`FREE_LISTEN_LESSON_SLUG = "accidents"`), còn lại khoá.
  - Collocations/Phrasal Verbs: chỉ động từ "do" free (`FREE_VERB`), còn lại khoá.
  - List item vẫn hiện (mờ + badge 🔒 Khoá) thay vì ẩn hẳn; **bấm/chạm vào mở `PurchaseModal`** (bảng giá + ô nhập mã) thay vì không phản hồi như trước. Truy cập thẳng URL trang chi tiết đang khoá thì hiện `ProPaywallNotice` inline (cùng nội dung, không phải popup).
  - Đã lọc luôn các luồng ôn tập tổng hợp: "Today" hub (`collocations-phrasal-verbs/page.tsx`), "Start review"/`run?verbs=...` (`RunClient.tsx`), và chọn verb để viết luận (`write/page.tsx`) — cả 3 đều loại verb bị khoá khỏi pool trước khi tính stats/tạo câu hỏi/cho chọn, thay vì chỉ chặn ở trang danh sách + chi tiết.
  - Còn lại duy nhất 1 edge case chưa xử lý: mistakes đã lưu (`loadMistakes`) từ trước khi bị khoá (vd. hết hạn trả phí) không bị lọc lại — không đáng lo, hậu quả nhỏ.
- [x] **Thay "Free/Pro" bằng mô hình trial + gói theo thời hạn** (2026-08-15) — mọi tài khoản mở khoá toàn bộ 7 ngày đầu (`trialStartedAt`, stamp server-side), sau đó khoá lại bình thường cho tới khi mua thêm thời hạn: 1 tháng 50k / 3 tháng 130k / 6 tháng 220k / 12 tháng 360k (`PRICING_PLANS`, xem bảng chiết khấu trong [subscription-interim-system.md](./subscription-interim-system.md)).
- [x] **Webhook thanh toán thật (PayOS)** (2026-08-17) — xem mục "Thanh toán thật qua PayOS" ở trên. Entitlement chuyển sang Firestore (`subscriptions/{email}`) vì webhook không có session người dùng để ghi Drive.
- [ ] Xác nhận lại giá gói 12 tháng (360k là suy luận toán học tiếp nối đường cong chiết khấu 13%/27%, chưa qua kiểm chứng thị trường) — xem [subscription-interim-system.md](./subscription-interim-system.md).
- [ ] Revoke path + admin dashboard cho entitlement (xem gap trong [subscription-interim-system.md](./subscription-interim-system.md)) — vẫn chưa làm.

## 5. Kiểm soát chi phí AI

- [ ] Quota số lượt gọi AI/ngày theo gói (free thấp, pro cao/không giới hạn) — hiện `/api/ai` không có giới hạn nào.
- [ ] `max_tokens` hợp lý theo từng intent trong `callDeepSeek` (`src/app/api/ai/route.ts`).

## 6. Đo lường

- [ ] Analytics tối thiểu (PostHog/GA): số từ mới học/ngày, tỉ lệ hoàn thành ôn tập, tỉ lệ redeem mã kích hoạt, tỉ lệ quay lại sau N ngày. Hiện không có bất kỳ tracking nào.

## 7. Pháp lý

- [ ] Privacy Policy + Terms of Service — bắt buộc trước khi công khai, vì giờ mọi người dùng bắt buộc đăng nhập Google và có thể sắp thu phí.
- [ ] Rà lại Google OAuth consent screen/verification khi mở cho nhiều người dùng thật (không chỉ 1 tài khoản cá nhân như hiện tại).

---

## Gợi ý thứ tự làm tiếp theo

1. SRS cho personal dictionary (mục 1) — đúng core value, giá trị rõ ràng nhất cho người dùng trả phí.
2. Quota AI (mục 5) — bảo vệ chi phí trước khi mời thêm người dùng thật.
3. Xác nhận giá gói 12 tháng + cân nhắc tích hợp QR code động thật khi tài khoản nhà cung cấp sẵn sàng (mục 4).
