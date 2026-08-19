# Subscription tracking — PayOS + PayPal + Firestore (2026-08-18)

**Trạng thái: thanh toán thật đã chạy (PayOS nội địa + PayPal quốc tế), vài gap quản trị vẫn còn (xem cuối file).** Tài liệu này mô tả chính xác hệ thống "đã trả phí hay chưa" hiện có. Tham chiếu lại file này trước khi sửa bất cứ gì liên quan đến subscription/payment.

Lịch sử: tạo ngày 2026-08-15 khi tài khoản QR code động vẫn đang đăng ký, chưa có webhook thật — giai đoạn đó dùng chuyển khoản thủ công + mã kích hoạt admin phát tay. Cập nhật ngày 2026-08-17: tài khoản PayOS đã sẵn sàng — thay toàn bộ luồng thủ công bằng PayOS thật (`paymentRequests.create()` + webhook `webhooks.verify()`), và chuyển entitlement từ file trong Drive của từng người sang **Firestore trung tâm** (điều kiện bắt buộc để 1 webhook không có session người dùng vẫn ghi được quyền lợi cho đúng người). Cập nhật ngày 2026-08-18: thêm tùy chọn thanh toán **quốc tế qua PayPal** (Orders v2 API, tính USD, capture-on-return thay vì webhook) — PayOS giữ nguyên cho người dùng Việt Nam (VNĐ).

---

## Mô hình: trial 7 ngày + gói trả phí theo thời hạn

Không có khái niệm "gói Pro" cố định — mọi tài khoản đều **mở khoá toàn bộ trong 7 ngày đầu** kể từ lần đăng nhập đầu tiên (`trialStartedAt`, tính bằng đồng hồ server). Sau 7 ngày, nội dung khoá quay lại trạng thái free/locked bình thường (`src/lib/content-access.ts`) cho tới khi tài khoản có `paidUntil` (mua thêm thời hạn) còn hiệu lực.

### Bảng giá (`PRICING_PLANS` trong `subscription-store.ts`)

Mỗi gói có 2 giá: **VNĐ** (PayOS, người dùng Việt Nam) và **USD** (PayPal, người nước ngoài — PayPal không hỗ trợ VND). USD là con số tĩnh gần đúng, không phải chuyển đổi FX live — chỉnh 2 cột cùng lúc khi tỉ giá biến động.

| Gói | Giá VNĐ | Giá USD | Quy đổi/tháng | Tiết kiệm so với mua lẻ theo tháng |
|---|---|---|---|---|
| 1 tháng | 90.000đ | $3.50 | 90.000đ | — (giá tham chiếu) |
| 3 tháng | 240.000đ | $10.00 | 80.000đ | 11% |
| 6 tháng | 420.000đ | $17.00 | 70.000đ | 22% |
| 12 tháng | 720.000đ | $30.00 | 60.000đ | 33% |

1 tháng cố tình là giá/tháng đắt nhất — quy đổi/tháng giảm đều 10.000đ mỗi bậc. **Cập nhật 2026-08-19**: tăng từ bảng giá cũ (50k/130k/220k/360k) — bảng cũ được tính dựa trên chi phí DeepSeek trung bình ~13,7đ/lượt đo **trước khi** sửa lỗi reasoning-mode (xem AGENTS.md mục AI); chi phí thật hiện đang được đo lại qua tab "Token AI" trong admin dashboard trước khi cân nhắc thêm lần nữa. Giá 12 tháng vẫn là suy luận toán học, **chưa qua kiểm chứng thị trường** — điều chỉnh tuỳ ý trong `PRICING_PLANS`.

Mỗi gói có thể có `hook` — 1 câu so sánh ngắn để giá cảm thấy "nhẹ" (gói 1 tháng: "🧋 chưa tới 2 cốc trà sữa"; gói 12 tháng: "📅 Chỉ 2.000đ/ngày"). Gói 12 tháng có badge "Tốt nhất" trong `SubscriptionSettings.tsx`. Ngoài ra còn 1 dòng nhấn mạnh giá trị chung, tính động từ `AI_DAILY_CALL_LIMIT` và giá gói rẻ nhất theo tháng: "Chưa tới Xđ/lượt luyện cùng AI, kể cả khi dùng hết 100 lượt mỗi ngày" (`subs.aiCostHook` trong `i18n.ts`, tính trong `SubscriptionSettings.tsx`).

### Vì sao entitlement chuyển sang Firestore

Trước đây `SubscriptionData` là 1 file JSON trong `appDataFolder` Drive riêng của từng người, ghi bằng access token lấy từ session cookie của chính họ. Điều đó hoạt động tốt cho luồng "người dùng tự bấm nút redeem trong app" — nhưng **webhook PayOS gọi thẳng vào server, không có cookie của trình duyệt ai cả**, nên không có access token nào để ghi vào Drive của "người vừa thanh toán". Đây là lý do bắt buộc phải có 1 nguồn dữ liệu trung tâm mà server có thể ghi mà không cần phiên đăng nhập của người dùng — chọn Firestore vì đã sẵn có `firebase-admin`, đơn giản hơn tự dựng Postgres cho 1 bảng khoá theo email.

Hai collection cho PayOS:
- `subscriptions/{email}` — 1 bản ghi `SubscriptionData` mỗi tài khoản (thay thế hoàn toàn cho file trong Drive).
- `payos_orders/{orderCode}` — 1 bản ghi mỗi lần tạo link thanh toán (`{ email, cycle, priceVnd, status, createdAt, paidAt }`), để webhook (chỉ có `orderCode`, không biết email) tra ngược ra đúng người + đúng gói, và để 1 webhook bị gửi lặp (PayOS có thể retry) không cộng dồn thời hạn 2 lần (`markOrderPaidOnce` dùng Firestore transaction).

Thêm 1 collection cho PayPal:
- `paypal_orders/{paypalOrderId}` — cùng shape/luồng như `payos_orders` nhưng key bằng id PayPal trả về (`{ email, cycle, priceUsd, status, createdAt, paidAt }`). Id này được PayPal echo lại trên redirect (`?paypal=success&token=<id>`) và cần cho bước capture; `status: "paid"` chỉ được set server-side ngay sau khi PayPal xác nhận capture `COMPLETED` (`markPaypalOrderPaidOnce` — transaction chống capture lặp cộng thời hạn 2 lần).

### Luồng hoạt động hiện tại

```
Người dùng đăng nhập Google lần đầu
        │
        ▼
GET /api/subscription trả về rỗng lần đầu → server stamp
trialStartedAt = Date.now() ngay lúc đó, ghi vào Firestore → mở khoá 7 ngày
        │
        ▼ (nếu hết 7 ngày mà chưa mua)
Nội dung quay lại khoá bình thường — bấm vào mục khoá bất kỳ đâu
(list Cambridge/Listen/Verbs, trang Write) → mở PurchaseModal
        │
        ▼
Người dùng chọn 1 gói trong popup → bấm "Thanh toán qua PayOS" (VNĐ)
        │
        ▼
POST /api/payos/create-payment-link → sinh orderCode (ms-epoch), gọi
payos.paymentRequests.create({orderCode, amount, description, returnUrl, cancelUrl}),
ghi payos_orders/{orderCode} = {email, cycle, priceVnd, status:"pending"} → trả
checkoutUrl về client → client redirect thẳng (window.location.href) sang
trang thanh toán do PayOS host
        │
        ▼
Người dùng quét QR / chuyển khoản trên trang PayOS
        │
        ▼ (song song, không đồng bộ với redirect trở lại)
PayOS gọi POST /api/payos/webhook (không có session, xác thực bằng chữ ký
HMAC-SHA256 với checksum key qua payos.webhooks.verify()) → tra
payos_orders/{orderCode} → markOrderPaidOnce() (transaction, chống webhook
lặp) → withPaidExtended(cycle) → ghi subscriptions/{email}
        │
        ▼
PayOS redirect trình duyệt về returnUrl (`/?payos=success`) → HomePage tự
poll GET /api/subscription vài lần (webhook có thể đến trễ hơn redirect 1
chút) cho tới khi thấy paidUntil mới, hoặc timeout sau ~12s
```

### Luồng hoạt động — PayPal (quốc tế, USD)

Khác PayOS ở 1 điểm quan trọng: **PayPal chỉ "duyệt" (approve), tiền chỉ chuyển khi server gọi capture** — vì vậy không cần webhook cho bản đầu, capture-on-return là đồng bộ và không thể mất tiền mà không có quyền lợi.

```
Người dùng chọn 1 gói → bấm "Thanh toán qua PayPal" (USD)
        │
        ▼
POST /api/paypal/create-order → server gọi PayPal Orders v2 API
(POST /v2/checkout/orders, intent=CAPTURE, amount USD, return/cancel URL) →
ghi paypal_orders/{paypalOrderId} = {email, cycle, priceUsd, status:"pending"}
→ trả approveUrl (link rel=approve) về client → redirect sang trang duyệt
do PayPal host
        │
        ▼
Người nước ngoài đăng nhập/duyệt trên PayPal
        │
        ▼
PayPal redirect về returnUrl `/?paypal=success&token=<paypalOrderId>` (hoặc
`/?paypal=cancel` nếu huỷ) → HomePage gọi POST /api/paypal/capture
        │
        ▼
/api/paypal/capture (có session của chính người mua — kiểm tra
order.email === session.email) → capturePayPalOrder() (POST
/v2/checkout/orders/{id}/capture) → nếu status COMPLETED →
markPaypalOrderPaidOnce() (transaction, chống capture lặp) →
withPaidExtended(cycle) → ghi subscriptions/{email} → poll refetch tới khi
thấy paidUntil mới
```

### Các file liên quan

| File | Vai trò |
|---|---|
| `src/lib/subscription-store.ts` | `SubscriptionData`, `PRICING_PLANS` (mỗi gói có `priceVnd` + `priceUsd`), `isUnlocked`/`isTrialActive`/`isPaidActive`/`trialDaysLeft`, `withPaidExtended`, `mergeSubscription` |
| `src/lib/firebase-admin.ts` | Khởi tạo Firebase Admin SDK singleton (đọc `FIREBASE_PROJECT_ID`/`FIREBASE_CLIENT_EMAIL`/`FIREBASE_PRIVATE_KEY`) |
| `src/lib/subscription-db.ts` | Firestore CRUD: `getSubscription`/`setSubscription` (collection `subscriptions`), `createPendingOrder`/`getOrder`/`markOrderPaidOnce` (collection `payos_orders`), `createPendingPaypalOrder`/`getPaypalOrder`/`markPaypalOrderPaidOnce` (collection `paypal_orders`) |
| `src/lib/payos-client.ts` | Singleton `new PayOS()` (SDK tự đọc `PAYOS_CLIENT_ID`/`PAYOS_API_KEY`/`PAYOS_CHECKSUM_KEY` từ env) |
| `src/lib/paypal-client.ts` | Client PayPal Orders v2 API thuần fetch: OAuth2 client-credentials (`PAYPAL_CLIENT_ID`/`PAYPAL_SECRET`, chọn base URL theo `PAYPAL_ENV`), `createPayPalOrder` (trả `approveUrl`), `capturePayPalOrder` (trả true nếu `status === "COMPLETED"`) — secret chỉ tồn tại server-side |
| `src/app/api/subscription/route.ts` | GET (stamp `trialStartedAt` lần đầu nếu chưa có, đọc từ Firestore) / PUT (dùng bởi `DebugUnlockToggle`) — thay thế `/api/drive/subscription` cũ |
| `src/app/api/payos/create-payment-link/route.ts` | Server route: sinh orderCode, gọi PayOS tạo link thanh toán, ghi `payos_orders` pending |
| `src/app/api/payos/webhook/route.ts` | Server route PayOS gọi thẳng (không qua proxy session gate — mọi `/api/*` đã bypass sẵn) — verify chữ ký, cộng thời hạn, đánh dấu order đã thanh toán |
| `src/app/api/paypal/create-order/route.ts` | Server route (cần session): gọi `createPayPalOrder` với giá USD, ghi `paypal_orders` pending, trả `approveUrl` về client |
| `src/app/api/paypal/capture/route.ts` | Server route (cần session, kiểm tra `order.email === session.email`): gọi `capturePayPalOrder`, nếu `COMPLETED` → `markPaypalOrderPaidOnce` + `withPaidExtended` + ghi `subscriptions/{email}` — thay cho webhook (PayPal chỉ chuyển tiền khi mình capture) |
| `src/app/api/paypal/webhook/route.ts` | Server route PayPal gọi thẳng (không session) — verify chữ ký qua `verify-webhook-signature` API (`PAYPAL_WEBHOOK_ID`), event `PAYMENT.CAPTURE.COMPLETED` → tra `paypal_orders` bằng `supplementary_data.related_ids.order_id` → `markPaypalOrderPaidOnce` (transaction) → cấp quyền. **Safety net** cho case capture thành công nhưng bước ghi Firestore/trình duyệt bị lỗi — happy path vẫn do capture-on-return |
| `src/lib/use-subscription-store.ts` | React hook: fetch khi login, cung cấp `isUnlocked`, `trialDaysLeft`, `refetch` (dùng cho polling sau khi quay lại từ PayOS), `setDebugOverride` |
| `src/app/page.tsx` | `usePaymentReturn()` — đọc `?payos=success|cancel` lẫn `?paypal=success|cancel` (kèm `token` cho PayPal, capture trước khi poll), poll `refetch()` tới khi thấy `paidUntil` mới hoặc timeout |
| `src/components/SubscriptionSettings.tsx` | Trạng thái + bảng giá (hiện cả VNĐ lẫn USD) + 2 nút: "Thanh toán qua PayOS" (redirect `checkoutUrl`) và "Thanh toán qua PayPal" (redirect `approveUrl`) — dùng chung ở Settings VÀ trong `PurchaseModal` |
| `src/components/PurchaseModal.tsx` | Popup (dùng `Modal`) mở khi bấm vào bất kỳ mục nội dung nào đang khoá |
| `src/components/ProPaywallNotice.tsx` | Hiển thị inline (không phải popup) khi truy cập thẳng URL của 1 trang chi tiết đang khoá |
| `src/components/DebugUnlockToggle.tsx` | **DEBUG ONLY** — vẫn giữ tạm thời để test trong lúc xác nhận PayOS chạy ổn định thật sự trên production; xoá theo `debugOverride` khi đã tin tưởng luồng webhook (xem gap bên dưới) |

---

## Env vars cần có

| Biến | Lấy ở đâu |
|---|---|
| `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` | Firebase Console → Project settings → Service accounts → Generate new private key |
| `PAYOS_CLIENT_ID`, `PAYOS_API_KEY`, `PAYOS_CHECKSUM_KEY` | Trang "Tạo kênh thanh toán" trên PayOS dashboard (my.payos.vn) |
| `PAYPAL_CLIENT_ID`, `PAYPAL_SECRET` | PayPal Developer Dashboard (developer.paypal.com) → Apps & Credentials → REST API apps (sandbox và live có bộ riêng) |
| `PAYPAL_ENV` | `sandbox` khi dev/test (base URL `api-m.sandbox.paypal.com`), `live` trên production (`api-m.paypal.com`) |
| `PAYPAL_WEBHOOK_ID` | Webhook ID từ PayPal Developer → app → Webhooks, sau khi đăng ký URL `https://<domain-thật>/api/paypal/webhook` với event `PAYMENT.CAPTURE.COMPLETED` (sandbox và live có id riêng — `webhook_id` này dùng cho verify chữ ký, không thể tự suy ra) |
| `NEXT_PUBLIC_APP_URL` | Domain thật đang deploy — dùng để build `returnUrl`/`cancelUrl` khi tạo payment link ở server (fallback hiện tại trong `src/lib/app-url.ts` là domain cũ `phrasalup.vercel.app`, **cần cập nhật lại domain thật** trước khi payment link hoạt động đúng) |

Ngoài ra: cần đăng ký webhook URL (`https://<domain-thật>/api/payos/webhook`) trên PayOS dashboard (hoặc gọi `payos.webhooks.confirm(url)` — SDK có sẵn hàm này nhưng chưa được gọi ở đâu trong code, hiện đang giả định đăng ký thủ công qua dashboard).

---

## Gap còn lại (biết trước, chưa làm)

1. **Không có cách thu hồi (revoke).** Chưa có route/admin action nào để huỷ quyền truy cập của 1 người (hoàn tiền, tranh chấp, gian lận) — chỉ có thể cộng thêm qua `withPaidExtended`, không trừ được.
2. **Không có admin dashboard.** Muốn biết ai đã thanh toán/còn bao nhiêu thời hạn phải tự vào Firestore Console tra thủ công theo email — chưa có UI tổng hợp.
3. **`DebugUnlockToggle` + `debugOverride` vẫn còn.** Giữ tạm để kiểm tra webhook PayOS chạy đúng trên production trước khi tự tin xoá hẳn — không có lý do chính đáng để giữ lâu dài sau khi đã xác nhận ổn định.
4. **`payos.webhooks.confirm()` chưa được gọi trong code** — đăng ký webhook URL hiện đang làm thủ công qua PayOS dashboard, không tự động qua deploy.
5. **Giá 12 tháng (360.000đ) là suy luận toán học, chưa qua kiểm chứng thị trường.**
6. **`NEXT_PUBLIC_APP_URL` cần trỏ đúng domain thật** (xem bảng env vars) — nếu thiếu, `returnUrl`/`cancelUrl` sẽ dùng fallback domain cũ và PayOS/PayPal sẽ redirect sai chỗ sau khi thanh toán.
7. **PayPal webhook là safety net, không phải nguồn cấp quyền chính.** Đã tích hợp `/api/paypal/webhook` (verify chữ ký qua `verify-webhook-signature` + `PAYPAL_WEBHOOK_ID`) cho event `PAYMENT.CAPTURE.COMPLETED` — nó cứu case capture thành công ở PayPal nhưng bước ghi Firestore/trình duyệt không hoàn tất. Happy path vẫn là capture-on-return đồng bộ. **Bắt buộc**: đăng ký webhook URL trên PayPal dashboard (để nhận `PAYPAL_WEBHOOK_ID`) — URL phải public (không phải localhost), nên khi test local có thể dùng ngrok/preview deploy.
8. **Giá USD là con số tĩnh gần đúng** (2/5,5/9/15 USD) — chỉnh cùng `priceVnd` trong `PRICING_PLANS` khi tỉ giá biến động; chưa có FX rate tự động.
9. **Tài khoản PayPal cho merchant Việt Nam** — nhận được tiền quốc tế nhưng nên xác nhận chính sách hiện hành (giới hạn giữ tiền, rút về ngân hàng VN) với PayPal trước khi quảng bá kênh này.

---

*Xem thêm: [production-readiness-roadmap.md](./production-readiness-roadmap.md), [launch-checklist.md](./launch-checklist.md), `AGENTS.md` mục "Subscription / paid access".*
