"use client";

// Popup shown wherever a learner taps locked content (see src/lib/content-access.ts) —
// reuses SubscriptionSettings so the pricing table + PayOS checkout is defined
// exactly once, whether opened here or from the Settings gear menu.

import { Modal } from "./Modal";
import { SubscriptionSettings } from "./SubscriptionSettings";

export function PurchaseModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      <h2 className="mb-1 text-[17px] font-extrabold">Mở khoá toàn bộ nội dung</h2>
      <p className="mb-3 text-[13px] text-neutral-600">Chọn gói phù hợp và thanh toán — quyền lợi tự động kích hoạt ngay sau khi chuyển khoản thành công.</p>
      <SubscriptionSettings />
    </Modal>
  );
}
