# Production Readiness Roadmap — hướng tới sản phẩm trả phí

Ghi lại từ buổi đánh giá hiện trạng codebase (2026-08-15). Mục tiêu: xác định việc cần làm để ship production và khiến người dùng thấy đủ giá trị để trả phí. Sắp xếp theo mức ưu tiên — P0 chặn mọi thứ phía sau, P1 cần trước khi mời trả phí, P2/P3 làm sau khi có người dùng trả phí đầu tiên.

> **Cập nhật cùng ngày**: xem [launch-checklist.md](./launch-checklist.md) để có checklist hành động cụ thể hơn, đã refine theo quyết định core value = học từ vựng (không phải IELTS) và theo các quyết định về auth/thanh toán tạm thời đã chốt.

## 0. Bối cảnh hiện tại

- **Modules đã có**: Collocations & Phrasal Verbs, Cambridge IELTS Advanced (Writing/Speaking band feedback), Listen A Minute, AI Discussion/Converse, personal dictionary + highlight-on-page, XP gamification, share links (`/s/[id]`).
- **Auth**: `src/proxy.ts` chỉ gate bằng cookie `gd_session`/`guest_ok` — không có khái niệm "tài khoản" hay "gói dịch vụ" ở backend.
- **Data**: sống ở `localStorage`, sync qua **Google Drive cá nhân của chính người dùng** (`src/lib/google-drive.ts`) — không có DB trung tâm nào lưu trạng thái người dùng.
- **AI**: mọi request đi qua `src/app/api/ai/route.ts` gọi DeepSeek, không giới hạn `max_tokens`, không rate limit, không đếm quota theo người dùng.
- **Chưa có**: thanh toán (Stripe/VNPay/Momo/pricing page), analytics (PostHog/GA), PWA manifest, rate limiting.

---

## P0 — Chặn mọi thứ phía sau

### 1. Mô hình tài khoản & sở hữu dữ liệu thật
Hiện tại không có cách nào biết "user X đang trả phí gói Y" — mọi request chỉ mang theo cookie `guest_ok` giống hệt nhau cho mọi người. Trước khi thu tiền cần:
- Một bảng `users` thật (DB — Postgres/Supabase/PlanetScale...) với id, email, trạng thái subscription.
- Quyết định: dữ liệu học tập (dictionary, XP, hội thoại) tiếp tục sync Drive cá nhân (giữ được lợi thế "dữ liệu của bạn, bạn giữ"), nhưng **trạng thái gói trả phí phải nằm ở server**, không thể chỉ dựa vào client.
- Session cần gắn với `userId` thay vì cookie boolean, để middleware (`src/proxy.ts`) và mọi API route có thể kiểm tra quyền truy cập theo từng người.

### 2. Kiểm soát chi phí AI
`callDeepSeek` trong `src/app/api/ai/route.ts` không có `max_tokens`, không rate limit, không quota. Với traffic thật, chi phí AI tăng tuyến tính không kiểm soát là rủi ro tài chính trực tiếp — cần làm **trước khi** mở đăng ký công khai:
- Đếm số lượt gọi AI theo `userId`/ngày (Redis hoặc cột trong DB).
- Giới hạn theo gói: free N lượt/ngày, paid không giới hạn hoặc cao hơn hẳn.
- Set `max_tokens` hợp lý theo từng intent (feedback ngắn không cần token cap bằng bài luận dài).

---

## P1 — Cần trước khi mời người dùng trả phí

### 3. Thanh toán
- Chưa có trang pricing, chưa có tích hợp thanh toán nào.
- Với người dùng Việt Nam: ưu tiên Momo/VNPay/ZaloPay bên cạnh (hoặc thay vì) Stripe — tỷ lệ chuyển đổi cao hơn nhiều so với thẻ quốc tế.
- Cần: trang pricing, checkout flow, webhook xử lý gia hạn/hết hạn, trang quản lý subscription cho user.

### 4. Onboarding & giá trị trong 5 phút đầu
- Hiện tại vào app thấy nhiều module cùng lúc, không có gợi ý "bắt đầu từ đâu" hay placement test.
- Đề xuất luồng: chọn trình độ hiện tại → 1 bài thử miễn phí có AI feedback ngay lập tức → cho thấy giá trị cụ thể (band điểm, lỗi sai được sửa) → mới mời nâng cấp.
- Đây là điểm quyết định người dùng mới có quay lại hay không — ưu tiên cao dù không phải "hạ tầng".

---

## P2 — Tăng trưởng & giữ chân sau khi có người trả phí đầu tiên

### 5. Cơ chế giữ chân & hiển thị tiến bộ
- XP/streak đã có ở `collocations-phrasal-verbs` (`src/lib/progress-context.tsx`) nhưng dàn trải, chưa thống nhất toàn app.
- Cần 1 dashboard tổng: band IELTS theo thời gian, streak toàn app (không chỉ 1 module), tổng số từ đã học trong dictionary.
- Đây là lý do chính khiến người dùng duy trì gói trả phí thay vì hủy sau tháng đầu.

### 6. Analytics/observability
- Không có PostHog/GA/Mixpanel nào trong codebase — hiện đang "ship mù": không biết feature nào được dùng, drop-off ở đâu trong funnel trả phí.
- Tối thiểu: track các event then chốt (hoàn thành bài tập, mở paywall, bắt đầu/hủy subscription, lỗi AI) trước khi tối ưu conversion.

### 7. Pháp lý & tin cậy
- Cần Privacy Policy + Terms of Service trước khi thu tiền, và trước khi xin quyền Google Drive của người dùng khác (OAuth hiện có vẻ chỉ cấu hình cho 1 tài khoản cá nhân — cần xem lại consent screen/verification của Google OAuth app khi mở cho nhiều người dùng thật).

---

## P3 — Polish (làm sau khi có traction)

- PWA manifest (chưa tìm thấy `manifest.json`/`manifest.ts`) — quan trọng nếu muốn trải nghiệm gần app di động.
- Mở rộng nội dung: thêm unit/topic mới, đa dạng band điểm IELTS.
- Referral program, thông báo nhắc học (push notification/email).

---

## Việc nên làm ngay tiếp theo (đề xuất)

1. Thiết kế lại auth/data model để hỗ trợ multi-user thật (P0 #1) — mọi việc khác đều phụ thuộc vào đây.
2. Dựng usage-quota cho `/api/ai` (P0 #2) — độc lập với #1, có thể làm song song, bảo vệ ngay chi phí hiện tại.
