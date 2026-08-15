# Subscription tracking — interim system (chưa hoàn thiện)

**Trạng thái: tạm thời / dummy.** Tài liệu này mô tả chính xác hệ thống "đã trả phí hay chưa" hiện có, vì sao nó chưa hoàn thiện, và checklist cụ thể cần làm khi có tài khoản thanh toán QR code động thật. Tham chiếu lại file này trước khi sửa bất cứ gì liên quan đến subscription/payment.

Bối cảnh: tạo ngày 2026-08-15, khi tài khoản với nhà cung cấp QR code động (để tracking thanh toán + bảo mật) vẫn đang trong quá trình đăng ký, chưa có để tích hợp webhook thật.

---

## Luồng hoạt động hiện tại

```
Người dùng chuyển khoản qua QR code (thủ công, ngoài hệ thống)
        │
        ▼
Admin (bạn) xác nhận tiền đã về — bằng mắt, qua app ngân hàng/QR provider
        │
        ▼
node scripts/generate-activation-code.mjs <email>
        │  (HMAC-SHA256 của email + ACTIVATION_CODE_SECRET → mã 8 ký tự)
        ▼
Admin gửi mã cho người dùng (nhắn tay — Zalo/Messenger/...)
        │
        ▼
Người dùng đăng nhập Google → Settings (⚙️) → "Gói dịch vụ" → nhập mã
        │
        ▼
POST /api/account/activate → verifyActivationCode() so khớp lại bằng
cùng công thức HMAC → nếu khớp: ghi { plan: "pro", source: "manual_dummy", ... }
vào file subscription.json trong Drive appDataFolder của CHÍNH người đó
        │
        ▼
Client cache localStorage + hiển thị "✓ Đang dùng gói Pro (kích hoạt thủ công)"
```

### Các file liên quan

| File | Vai trò |
|---|---|
| `src/lib/subscription-store.ts` | Định nghĩa `SubscriptionData` (`plan`, `source`, `activatedAt`, `note`, `updatedAt`) + localStorage load/persist/merge |
| `src/lib/activation-code.ts` | Sinh & xác minh mã kích hoạt (HMAC-SHA256 của email + `ACTIVATION_CODE_SECRET`) |
| `scripts/generate-activation-code.mjs` | CLI admin dùng để tạo mã cho 1 email cụ thể |
| `src/app/api/account/activate/route.ts` | Server route xác minh mã, ghi entitlement vào Drive |
| `src/lib/google-drive.ts` (`readDriveSubscription`/`writeDriveSubscription`) | Đọc/ghi `subscription.json` trong `appDataFolder` — cùng pattern với dictionary/translations |
| `src/app/api/drive/subscription/route.ts` | GET/PUT sync giữa client cache và Drive |
| `src/lib/use-subscription-store.ts` | React hook: fetch khi login, cung cấp `isPro`, `applyServerSubscription` |
| `src/components/SubscriptionSettings.tsx` | UI trong Settings — hiển thị trạng thái + ô nhập mã |

---

## Vì sao đây CHƯA phải hệ thống hoàn thiện — giới hạn đã biết

1. **Entitlement không có nguồn sự thật (source of truth) tập trung.** Bản ghi "đã trả phí" nằm trong Drive của chính người dùng — họ có thể tự sửa file đó (dù bị ẩn, Google Drive API vẫn cho phép người sở hữu OAuth token của chính họ đọc/ghi `appDataFolder` bằng công cụ khác). Chấp nhận được ở giai đoạn thử nghiệm với vài người dùng tin cậy, **không được dùng khi mở rộng công khai**.
2. **Không có hạn sử dụng/gia hạn.** `activatedAt` chỉ là mốc thời gian, không có `expiresAt` hay job kiểm tra hết hạn — một khi kích hoạt là "Pro" vĩnh viễn.
3. **Không có cách thu hồi.** Không có API/route nào để admin revoke quyền Pro của 1 người (vd. hoàn tiền, tranh chấp).
4. **`isPro` gate nội dung (cập nhật 2026-08-15).** `src/lib/content-access.ts` khoá Cambridge Unit 2+, Listen A Minute (trừ 1 bài), và Collocations/Phrasal Verbs (trừ verb "do") theo `isPro` — bao gồm cả trang danh sách, trang chi tiết, VÀ các luồng ôn tập tổng hợp ("Today" hub, "Start review", `run?verbs=...`, trang Write đều lọc verb bị khoá khỏi pool). Xem mục 4 trong [launch-checklist.md](./launch-checklist.md) để biết chi tiết. Edge case còn lại: mistakes đã lưu từ trước lúc bị khoá không được lọc lại — chấp nhận được vì chưa có cơ chế downgrade/hết hạn (mục 2 bên dưới).
5. **Không có admin dashboard.** Muốn biết ai đã kích hoạt phải tự nhớ hoặc tra thủ công (không có danh sách tập trung — vì dữ liệu nằm rải rác trong Drive của từng người).
6. **Mã kích hoạt không hết hạn và không gắn với 1 lần dùng.** Cùng 1 mã tính từ email có thể nhập lại nhiều lần/nhiều thiết bị mà vẫn hợp lệ (không phải lỗ hổng nghiêm trọng vì phải đúng email đó mới tính ra mã đúng, nhưng không có audit log ai đã redeem lúc nào).

## Việc PHẢI làm khi có tài khoản QR code động thật

- [ ] Tích hợp webhook từ nhà cung cấp QR code (nhận sự kiện thanh toán thành công tự động, không cần admin xác nhận bằng mắt).
- [ ] Chuyển entitlement từ "file trong Drive người dùng" sang **DB trung tâm** (bảng `subscriptions` khoá theo `userId`/email) — đây là điều kiện tiên quyết để hệ thống đáng tin cậy cho billing thật (xem thêm mục "Mô hình tài khoản & sở hữu dữ liệu thật" trong [production-readiness-roadmap.md](./production-readiness-roadmap.md)).
- [ ] Thêm `expiresAt` + job/logic kiểm tra hết hạn, gia hạn tự động hoặc nhắc gia hạn.
- [ ] Thêm route/admin action để revoke quyền Pro (hoàn tiền, tranh chấp, gian lận).
- [ ] Xoá `scripts/generate-activation-code.mjs`, `src/lib/activation-code.ts`, `/api/account/activate` — không mở rộng thêm cơ chế mã thủ công, thay hẳn bằng webhook.
- [ ] Quyết định & implement thực sự: gói Free giới hạn gì, gói Pro mở khoá gì — rồi mới gate theo `isPro` ở các tính năng liên quan (xem checklist mục 4 trong [launch-checklist.md](./launch-checklist.md)).
- [ ] Cân nhắc giữ hay bỏ việc đồng bộ trạng thái subscription qua Drive: nếu đã có DB trung tâm làm nguồn sự thật, việc cache vào Drive không còn cần thiết cho tính đúng đắn — có thể bỏ để giảm bề mặt tấn công (mục 1 ở trên).

---

*Xem thêm: [production-readiness-roadmap.md](./production-readiness-roadmap.md) (bối cảnh chiến lược tổng thể), [launch-checklist.md](./launch-checklist.md) (checklist hành động theo mức ưu tiên), `AGENTS.md` mục "Subscription / paid access" (convention ngắn cho AI agent khi code trong repo này).*
