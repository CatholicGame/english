# Subscription tracking — interim system (chưa hoàn thiện)

**Trạng thái: tạm thời / dummy.** Tài liệu này mô tả chính xác hệ thống "đã trả phí hay chưa" hiện có, vì sao nó chưa hoàn thiện, và checklist cụ thể cần làm khi có tài khoản thanh toán QR code động thật. Tham chiếu lại file này trước khi sửa bất cứ gì liên quan đến subscription/payment.

Bối cảnh: tạo ngày 2026-08-15, khi tài khoản với nhà cung cấp QR code động (để tracking thanh toán + bảo mật) vẫn đang trong quá trình đăng ký, chưa có để tích hợp webhook thật. Cập nhật ngày 2026-08-15 (cùng ngày): bỏ mô hình "Free/Pro" theo tính năng, chuyển sang mô hình **theo thời gian** (trial 3 ngày + gói trả phí theo tháng) — chi tiết bên dưới.

---

## Mô hình hiện tại: trial 3 ngày + gói trả phí theo thời hạn

Không có khái niệm "gói Pro" cố định — mọi tài khoản đều **mở khoá toàn bộ trong 3 ngày đầu** kể từ lần đăng nhập đầu tiên (`trialStartedAt`, tính bằng đồng hồ server, không phải client). Sau 3 ngày, nội dung khoá quay lại trạng thái free/locked bình thường (`src/lib/content-access.ts`) cho tới khi tài khoản có `paidUntil` (mua thêm thời hạn) còn hiệu lực.

### Bảng giá (`PRICING_PLANS` trong `subscription-store.ts`)

| Gói | Giá | Quy đổi/tháng | Tiết kiệm so với mua lẻ theo tháng |
|---|---|---|---|
| 1 tháng | 50.000đ | 50.000đ | — (giá tham chiếu) |
| 3 tháng | 130.000đ | ~43.300đ | 13% |
| 6 tháng | 220.000đ | ~36.700đ | 27% |
| 12 tháng | 360.000đ | 30.000đ | 40% |

1 tháng cố tình là giá/tháng đắt nhất — gói càng dài chiết khấu càng sâu để đẩy người dùng chọn gói dài hơn. Giá 12 tháng (360.000đ) là gợi ý dựa trên việc tiếp nối đường cong chiết khấu 13%→27%→40% một cách mượt (không có cơ sở thị trường nào khác ngoài phép tính này) — **có thể điều chỉnh tuỳ ý**, chỉ cần sửa `PRICING_PLANS` (client) và bảng `PLANS` trong `scripts/generate-activation-code.mjs` (giữ đồng bộ hai nơi).

Mỗi gói có thể có `hook` — 1 câu so sánh ngắn để giá cảm thấy "nhẹ" thay vì trừu tượng (gói 1 tháng: "🧋 bằng 1 cốc trà sữa"; gói 12 tháng: "☕ Chưa tới 1.000đ/ngày"). Gói 12 tháng cũng có badge "Tốt nhất" trong `SubscriptionSettings.tsx`.

### QR code động — đã thiết kế sẵn chỗ cắm, chỉ cần điền thông tin thật

`src/lib/payment-config.ts` là nơi DUY NHẤT cần sửa khi có tài khoản QR code động thật:

```ts
export const BANK_TRANSFER: BankTransferConfig | null = null; // ← điền vào đây
```

Điền `{ bankBin, accountNumber, accountName }` (BIN ngân hàng tra tại vietqr.io/danh-sach-ngan-hang) là xong — UI tự động chuyển từ hiển thị "🚧 đang hoàn tất kênh thanh toán" sang hiển thị QR thật (dùng VietQR image API, ảnh QR động theo từng gói: số tiền + nội dung chuyển khoản được nhúng sẵn trong ảnh, quét là tự điền, không cần gõ tay), không cần sửa thêm chỗ nào khác. `transferNote(email, cycle)` sinh nội dung chuyển khoản ngắn gọn kiểu `PHRASALUP <email-handle> <CYCLE>` để đối chiếu giao dịch (thủ công hoặc tự động sau này) khớp đúng người + đúng gói.

Lưu ý: bản thân VietQR image API chỉ SINH ẢNH QR (miễn phí, không cần tài khoản riêng) — việc tự động phát hiện "tiền đã về" (webhook) vẫn cần nhà cung cấp riêng (Casso, SePay, PayOS...) như bạn đang đăng ký; khi có, phần webhook đó cắm vào chỗ hiện đang là bước "Admin xác nhận bằng mắt" bên dưới.

### Luồng hoạt động hiện tại

```
Người dùng đăng nhập Google lần đầu
        │
        ▼
GET /api/drive/subscription trả về rỗng lần đầu → server stamp
trialStartedAt = Date.now() ngay lúc đó, ghi vào Drive → mở khoá 3 ngày
        │
        ▼ (nếu hết 3 ngày mà chưa mua)
Nội dung quay lại khoá bình thường — bấm vào mục khoá bất kỳ đâu
(list Cambridge/Listen/Verbs, trang Write) → mở PurchaseModal
        │
        ▼
Người dùng chọn 1 gói trong popup → hiện QR (nếu đã điền BANK_TRANSFER)
hoặc thông báo "đang hoàn tất kênh thanh toán" (hiện tại) → chuyển khoản
        │
        ▼
Admin (bạn) xác nhận tiền đã về — bằng mắt (tạm thời), qua app ngân hàng/QR provider
        │
        ▼
node scripts/generate-activation-code.mjs <email>
        │  In ra 4 mã (1 mã / gói, HMAC-SHA256 của email+cycle+ACTIVATION_CODE_SECRET)
        ▼
Admin gửi ĐÚNG 1 mã khớp với gói đã thanh toán (nhắn tay — Zalo/Messenger/...)
        │
        ▼
Người dùng nhập mã vào PurchaseModal hoặc Settings → "Gói dịch vụ"
        │
        ▼
POST /api/account/activate → matchActivationCode() thử khớp cả 4 gói,
tự suy ra gói đúng từ chính mã đó (người dùng không cần chọn gói lại) →
withPaidExtended() cộng dồn thời hạn vào paidUntil hiện có → ghi vào
subscription.json trong Drive appDataFolder của CHÍNH người đó
```

### Các file liên quan

| File | Vai trò |
|---|---|
| `src/lib/subscription-store.ts` | `SubscriptionData` (`trialStartedAt`, `paidUntil`, `lastCycle`, `note`, `updatedAt`), `PRICING_PLANS` (kèm `hook` — câu so sánh giá), `isUnlocked`/`isTrialActive`/`isPaidActive`/`trialDaysLeft`, `withPaidExtended`, `mergeSubscription` |
| `src/lib/payment-config.ts` | **Chỗ duy nhất cần sửa khi có QR code động thật** — `BANK_TRANSFER` (hiện `null`), `vietQrImageUrl()`, `transferNote()` |
| `src/lib/activation-code.ts` | `generateActivationCode(email, cycle)` + `matchActivationCode(email, code)` — thử khớp cả 4 gói |
| `scripts/generate-activation-code.mjs` | CLI admin — in ra 4 mã (1/gói) cho 1 email |
| `src/app/api/account/activate/route.ts` | Server route: khớp mã → gói, đọc entitlement hiện tại, cộng dồn thời hạn, ghi vào Drive |
| `src/lib/google-drive.ts` (`readDriveSubscription`/`writeDriveSubscription`) | Đọc/ghi `subscription.json` trong `appDataFolder` — cùng pattern với dictionary/translations |
| `src/app/api/drive/subscription/route.ts` | GET (stamp `trialStartedAt` lần đầu nếu chưa có) / PUT sync giữa client cache và Drive |
| `src/lib/use-subscription-store.ts` | React hook: fetch khi login, cung cấp `isUnlocked`, `trialDaysLeft`, `applyServerSubscription`. Trong lúc chưa fetch xong lần đầu (thiết bị mới), mặc định coi là unlocked để tránh flash nội dung khoá cho người dùng hợp lệ |
| `src/components/SubscriptionSettings.tsx` | Trạng thái (trial còn X ngày / đã kích hoạt đến ngày Y / hết hạn) + bảng giá + ô nhập mã — dùng chung ở Settings VÀ trong `PurchaseModal` |
| `src/components/PurchaseModal.tsx` | Popup (dùng `Modal`) mở khi bấm vào bất kỳ mục nội dung nào đang khoá |
| `src/components/ProPaywallNotice.tsx` | Hiển thị inline (không phải popup) khi truy cập thẳng URL của 1 trang chi tiết đang khoá |

---

## Vì sao đây CHƯA phải hệ thống hoàn thiện — giới hạn đã biết

1. **Entitlement không có nguồn sự thật (source of truth) tập trung.** Bản ghi nằm trong Drive của chính người dùng — họ có thể tự sửa file đó (dù bị ẩn, Google Drive API vẫn cho phép người sở hữu OAuth token của chính họ đọc/ghi `appDataFolder` bằng công cụ khác). Chấp nhận được ở giai đoạn thử nghiệm với vài người dùng tin cậy, **không được dùng khi mở rộng công khai**.
2. **Không có cách thu hồi.** Không có API/route nào để admin revoke quyền truy cập của 1 người (vd. hoàn tiền, tranh chấp, gian lận) — chỉ có thể cộng thêm thời hạn, không trừ được.
3. **Nội dung gate theo `isUnlocked` (trial HOẶC đã trả phí)** — `src/lib/content-access.ts` khoá Cambridge Unit 2+, Listen A Minute (trừ 1 bài), và Collocations/Phrasal Verbs (trừ verb "do") — bao gồm cả trang danh sách, trang chi tiết, VÀ các luồng ôn tập tổng hợp ("Today" hub, "Start review", `run?verbs=...`, trang Write đều lọc verb bị khoá khỏi pool). Xem mục 4 trong [launch-checklist.md](./launch-checklist.md) để biết chi tiết. Edge case còn lại: mistakes đã lưu từ trước lúc bị khoá không được lọc lại — chấp nhận được vì hậu quả nhỏ (chỉ ảnh hưởng nếu 1 người từng trả phí rồi hết hạn).
4. **Không có admin dashboard.** Muốn biết ai đã kích hoạt/còn bao nhiêu thời hạn phải tự nhớ hoặc tra thủ công (không có danh sách tập trung — vì dữ liệu nằm rải rác trong Drive của từng người).
5. **Mã kích hoạt không gắn với 1 lần dùng.** Cùng 1 mã (email+gói cố định) có thể nhập lại nhiều lần/nhiều thiết bị mà vẫn hợp lệ, mỗi lần nhập lại sẽ CỘNG DỒN thêm 1 chu kỳ nữa vào `paidUntil` (không phải lỗ hổng nghiêm trọng vì phải đúng email đó mới tính ra mã đúng, nhưng không có audit log ai đã redeem lúc nào — một người vô tình nhập lại mã cũ 2 lần sẽ được cộng dư thời hạn).
6. **Giá 12 tháng là suy luận toán học, chưa qua kiểm chứng thị trường** — xem bảng giá ở trên.

## Việc PHẢI làm khi có tài khoản QR code động thật

- [ ] Điền `BANK_TRANSFER` trong `src/lib/payment-config.ts` (`bankBin`, `accountNumber`, `accountName`) — UI (QR ảnh động theo từng gói) tự chạy, không cần sửa gì khác.
- [ ] Tích hợp webhook từ nhà cung cấp QR code (nhận sự kiện thanh toán thành công tự động, không cần admin xác nhận bằng mắt) — vẫn map thẳng vào `withPaidExtended(cycle)` theo gói khách chọn.
- [ ] Chuyển entitlement từ "file trong Drive người dùng" sang **DB trung tâm** (bảng `subscriptions` khoá theo `userId`/email) — đây là điều kiện tiên quyết để hệ thống đáng tin cậy cho billing thật (xem thêm mục "Mô hình tài khoản & sở hữu dữ liệu thật" trong [production-readiness-roadmap.md](./production-readiness-roadmap.md)).
- [ ] Thêm route/admin action để revoke quyền truy cập (hoàn tiền, tranh chấp, gian lận) — hiện chỉ có thể cộng thêm, không trừ được.
- [ ] Xoá `scripts/generate-activation-code.mjs`, `src/lib/activation-code.ts`, `/api/account/activate` — không mở rộng thêm cơ chế mã thủ công, thay hẳn bằng webhook.
- [ ] Thêm audit log ai đã redeem mã nào lúc nào (khắc phục giới hạn #5).
- [ ] Cân nhắc giữ hay bỏ việc đồng bộ trạng thái subscription qua Drive: nếu đã có DB trung tâm làm nguồn sự thật, việc cache vào Drive không còn cần thiết cho tính đúng đắn — có thể bỏ để giảm bề mặt tấn công (mục 1 ở trên).
- [ ] Xác nhận lại giá 12 tháng (360.000đ) hoặc điều chỉnh theo dữ liệu thực tế/phản hồi thị trường thay vì suy luận toán học ban đầu.

---

*Xem thêm: [production-readiness-roadmap.md](./production-readiness-roadmap.md) (bối cảnh chiến lược tổng thể), [launch-checklist.md](./launch-checklist.md) (checklist hành động theo mức ưu tiên), `AGENTS.md` mục "Subscription / paid access" (convention ngắn cho AI agent khi code trong repo này).*
