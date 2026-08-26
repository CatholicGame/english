"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  isPaidActive,
  isTrialActive,
  PRICING_PLANS,
  trialDaysLeft,
  withPaidExtended,
  type BillingCycle,
  type SubscriptionData,
} from "@/lib/subscription-store";
import type { RevenueOrder } from "@/lib/subscription-db";
import type { DailyTokenUsage } from "@/lib/token-usage-db";
import { dayKey } from "@/lib/utils";
import { Stars } from "@/components/Stars";

type Row = SubscriptionData & { email: string };
type SubAdmin = { email: string; addedBy: string; addedAt: number };
type Role = "super" | "viewer";
type ReviewRow = {
  id: string;
  email: string;
  rating: number;
  comment?: string;
  name?: string;
  createdAt: number;
  updatedAt: number;
  reply?: { message: string; updatedAt: number };
};
type Tab = "subscriptions" | "guests" | "revenue" | "reviews" | "tokens";

const PAGE_SIZE = 20;

function fmtDate(ts?: number): string {
  return ts ? new Date(ts).toLocaleDateString("vi-VN") : "—";
}

/** Preview only — same math as the server's withPaidExtended, so the tooltip
 * matches exactly what clicking "+ Gia hạn" will actually write. */
function previewExtendedUntil(row: Row, cycle: BillingCycle, now: number): number | undefined {
  return withPaidExtended(row, cycle, "", now).paidUntil;
}

function statusOf(row: Row): { label: string; color: string } {
  if (row.debugOverride === "locked") return { label: "Ép khoá", color: "var(--color-danger, #c0392b)" };
  if (row.debugOverride === "unlocked") return { label: "Ép mở khoá", color: "var(--color-accent)" };
  if (isTrialActive(row)) return { label: `Dùng thử (còn ${trialDaysLeft(row)} ngày)`, color: "var(--color-accent)" };
  if (isPaidActive(row)) return { label: "Đã thanh toán", color: "var(--color-accent)" };
  return { label: "Hết hạn", color: "var(--color-danger, #c0392b)" };
}

/** Extend + lock/unlock controls — identical between the desktop table cell
 * and the mobile card, only the surrounding layout (table cell vs card box)
 * differs between the two. */
function AccountActions({
  row,
  busy,
  cycle,
  onCycleChange,
  onExtend,
  extendTitle,
  onToggle,
}: {
  row: Row;
  busy: boolean;
  cycle: BillingCycle;
  onCycleChange: (cycle: BillingCycle) => void;
  onExtend: () => void;
  extendTitle: string | undefined;
  onToggle: (value: "locked" | "unlocked") => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1.5">
        <select
          className="min-w-0 flex-1 rounded-md border px-1.5 py-1 text-[16px] sm:flex-none"
          style={{ borderColor: "var(--color-divider)" }}
          value={cycle}
          onChange={(e) => onCycleChange(e.target.value as BillingCycle)}
        >
          {PRICING_PLANS.map((p) => (
            <option key={p.cycle} value={p.cycle}>
              {p.label}
            </option>
          ))}
        </select>
        <button
          className="btn btn-secondary flex-none"
          disabled={busy || extendTitle == null}
          onClick={onExtend}
          title={extendTitle}
        >
          + Gia hạn
        </button>
      </div>
      <div className="flex gap-1.5">
        <button
          className="flex-1 rounded-full px-2.5 py-1 text-[16px] font-bold sm:flex-none"
          disabled={busy}
          style={{
            background: row.debugOverride === "unlocked" ? "var(--color-accent)" : "var(--color-surface)",
            color: row.debugOverride === "unlocked" ? "#fff" : "var(--color-text)",
            border: row.debugOverride === "unlocked" ? "none" : "1px solid var(--color-divider)",
          }}
          onClick={() => onToggle("unlocked")}
        >
          Ép mở khoá
        </button>
        <button
          className="flex-1 rounded-full px-2.5 py-1 text-[16px] font-bold sm:flex-none"
          disabled={busy}
          style={{
            background: row.debugOverride === "locked" ? "var(--color-accent)" : "var(--color-surface)",
            color: row.debugOverride === "locked" ? "#fff" : "var(--color-text)",
            border: row.debugOverride === "locked" ? "none" : "1px solid var(--color-divider)",
          }}
          onClick={() => onToggle("locked")}
        >
          Ép khoá
        </button>
      </div>
    </div>
  );
}

async function callApi(path: string, body: unknown) {
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${path} failed: ${res.status}`);
}

export function AdminDashboard({
  subscriptions,
  guests,
  role,
  subAdmins,
  reviews,
  orders,
  tokenUsage,
}: {
  subscriptions: Row[];
  guests: Row[];
  role: Role;
  subAdmins: SubAdmin[];
  reviews: ReviewRow[];
  orders: RevenueOrder[];
  tokenUsage: DailyTokenUsage[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("subscriptions");
  const [pending, setPending] = useState<string | null>(null);
  const [cycleByEmail, setCycleByEmail] = useState<Record<string, BillingCycle>>({});
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newFreeEmail, setNewFreeEmail] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const isSuper = role === "super";

  const filtered = subscriptions.filter((r) => r.email.toLowerCase().includes(search.trim().toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function updateSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  // Computed client-side only (not during SSR) so the tooltip's "hạn mới"
  // date never disagrees with what hydration renders — it doesn't need to be
  // live-accurate to the second, just stable once mounted.
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);

  async function extend(row: Row) {
    if (now == null) return; // button is disabled until this loads, shouldn't happen
    const email = row.email;
    const cycle = cycleByEmail[email] ?? PRICING_PLANS[0].cycle;
    const plan = PRICING_PLANS.find((p) => p.cycle === cycle);
    const newUntil = fmtDate(previewExtendedUntil(row, cycle, now));
    const confirmed = window.confirm(
      `Gia hạn ${email} thêm gói "${plan?.label ?? cycle}"?\nHạn sử dụng mới sẽ là: ${newUntil}`,
    );
    if (!confirmed) return;

    setPending(email);
    try {
      await callApi("/api/admin/extend", { email, cycle });
      router.refresh();
    } catch {
      alert("Gia hạn thất bại, thử lại sau.");
    } finally {
      setPending(null);
    }
  }

  async function toggleOverride(email: string, current: Row["debugOverride"], value: "locked" | "unlocked") {
    setPending(email);
    try {
      await callApi("/api/admin/lock", { email, override: current === value ? "none" : value });
      router.refresh();
    } catch {
      alert("Cập nhật thất bại, thử lại sau.");
    } finally {
      setPending(null);
    }
  }

  async function grantFree() {
    const email = newFreeEmail.trim();
    if (!email) return;
    setPending("__grant_free__");
    try {
      await callApi("/api/admin/lock", { email, override: "unlocked" });
      setNewFreeEmail("");
      router.refresh();
    } catch {
      alert("Cấp tài khoản miễn phí thất bại, thử lại sau.");
    } finally {
      setPending(null);
    }
  }

  async function addAdmin() {
    const email = newAdminEmail.trim();
    if (!email) return;
    setPending("__add_admin__");
    try {
      await callApi("/api/admin/manage", { action: "add", email });
      setNewAdminEmail("");
      router.refresh();
    } catch {
      alert("Thêm sub-admin thất bại, thử lại sau.");
    } finally {
      setPending(null);
    }
  }

  async function removeAdmin(email: string) {
    setPending(email);
    try {
      await callApi("/api/admin/manage", { action: "remove", email });
      router.refresh();
    } catch {
      alert("Xoá sub-admin thất bại, thử lại sau.");
    } finally {
      setPending(null);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 py-8">
      <div className="divider-b sticky top-12 z-30 flex justify-start gap-1 bg-bg">
        {([
          { id: "subscriptions", label: "Subscription" },
          { id: "guests", label: `Khách vãng lai${guests.length ? ` (${guests.length})` : ""}` },
          { id: "revenue", label: "Doanh thu" },
          { id: "reviews", label: `Đánh giá${reviews.length ? ` (${reviews.length})` : ""}` },
          { id: "tokens", label: "Token AI" },
        ] as const).map((tb) => (
          <button
            key={tb.id}
            type="button"
            className="px-3 py-3 text-[16px] font-extrabold"
            style={{
              color: tab === tb.id ? "var(--color-accent)" : "var(--color-neutral-600)",
              borderBottom: tab === tb.id ? "2px solid var(--color-accent)" : "2px solid transparent",
            }}
            onClick={() => setTab(tb.id)}
          >
            {tb.label}
          </button>
        ))}
      </div>

      {tab === "guests" && <GuestsTab guests={guests} />}

      {tab === "revenue" && <RevenueTab orders={orders} />}

      {tab === "reviews" && <ReviewsTab reviews={reviews} isSuper={isSuper} />}

      {tab === "tokens" && <TokenUsageTab usage={tokenUsage} />}

      {tab === "subscriptions" && (
      <>
      <h1 className="mt-6 text-[22px] font-extrabold">Quản lý subscription</h1>
      <p className="mt-1 text-[16px] text-neutral-600">
        {search ? `${filtered.length}/${subscriptions.length}` : subscriptions.length} tài khoản
        {totalPages > 1 && ` — trang ${safePage}/${totalPages}`}.{" "}
        {!isSuper && "Bạn có quyền xem — không thể gia hạn hay khoá/mở khoá."}
      </p>

      {isSuper && (
        <div className="mt-4">
          <h2 className="text-[17px] font-extrabold">Cấp tài khoản miễn phí (unlock toàn bộ)</h2>
          <p className="mt-1 text-[16px] text-neutral-600">
            Nhập email Google bất kỳ — kể cả email chưa từng đăng nhập app — để cấp quyền dùng full miễn phí ngay lập
            tức (không cần thanh toán). Có thể thu hồi lại bằng &ldquo;Ép khoá&rdquo; ở bảng dưới sau khi họ xuất hiện
            trong danh sách.
          </p>
          <div className="mt-2 flex flex-col gap-1.5 sm:flex-row">
            <input
              type="email"
              placeholder="email@vidu.com"
              className="min-w-0 flex-1 rounded-md border px-2 py-1.5 text-[16px]"
              style={{ borderColor: "var(--color-divider)" }}
              value={newFreeEmail}
              onChange={(e) => setNewFreeEmail(e.target.value)}
            />
            <button className="btn btn-secondary" disabled={pending === "__grant_free__"} onClick={grantFree}>
              + Cấp miễn phí
            </button>
          </div>
        </div>
      )}

      <input
        type="search"
        placeholder="Tìm theo email..."
        className="mt-4 w-full rounded-md border px-2 py-1.5 text-[16px] sm:max-w-xs"
        style={{ borderColor: "var(--color-divider)" }}
        value={search}
        onChange={(e) => updateSearch(e.target.value)}
      />

      {filtered.length === 0 && (
        <p className="mt-4 text-[16px] text-neutral-600">Không tìm thấy tài khoản nào khớp với &ldquo;{search}&rdquo;.</p>
      )}

      {/* Desktop / tablet: table. Hidden below sm — a data table with 5+
          columns just doesn't fit a portrait phone screen without horizontal
          scrolling, which is what made this unusable on mobile. */}
      <div className="mt-4 hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[860px] text-left text-[16px]">
          <thead>
            <tr className="divider-b text-neutral-600">
              <th className="py-2 pr-3 font-bold">Email</th>
              <th className="py-2 pr-3 font-bold">Trạng thái</th>
              <th className="py-2 pr-3 font-bold">Trial hết hạn</th>
              <th className="py-2 pr-3 font-bold">Paid hết hạn</th>
              <th className="py-2 pr-3 font-bold">Gói gần nhất</th>
              {isSuper && <th className="py-2 pr-3 font-bold">Hành động</th>}
            </tr>
          </thead>
          <tbody>
            {pageItems.map((row) => {
              const status = statusOf(row);
              const busy = pending === row.email;
              const cycle = cycleByEmail[row.email] ?? PRICING_PLANS[0].cycle;
              return (
                <tr key={row.email} className="divider-b align-top">
                  <td className="py-2.5 pr-3 font-semibold">{row.email}</td>
                  <td className="py-2.5 pr-3">
                    <span className="rounded-full px-2 py-0.5 text-[16px] font-bold" style={{ color: status.color }}>
                      {status.label}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3">{fmtDate(row.trialStartedAt || undefined)}</td>
                  <td className="py-2.5 pr-3">{fmtDate(row.paidUntil)}</td>
                  <td className="py-2.5 pr-3">{PRICING_PLANS.find((p) => p.cycle === row.lastCycle)?.label ?? "—"}</td>
                  {isSuper && (
                    <td className="py-2.5 pr-3">
                      <AccountActions
                        row={row}
                        busy={busy}
                        cycle={cycle}
                        onCycleChange={(next) => setCycleByEmail((prev) => ({ ...prev, [row.email]: next }))}
                        onExtend={() => extend(row)}
                        extendTitle={
                          now != null
                            ? `Hạn hiện tại: ${fmtDate(row.paidUntil)} → hạn mới sau khi gia hạn: ${fmtDate(
                                previewExtendedUntil(row, cycle, now),
                              )}`
                            : undefined
                        }
                        onToggle={(value) => toggleOverride(row.email, row.debugOverride, value)}
                      />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile portrait: one stacked card per account instead of the table. */}
      <div className="mt-4 flex flex-col gap-3 sm:hidden">
        {pageItems.map((row) => {
          const status = statusOf(row);
          const busy = pending === row.email;
          const cycle = cycleByEmail[row.email] ?? PRICING_PLANS[0].cycle;
          return (
            <div key={row.email} className="border p-3" style={{ borderColor: "var(--color-divider)" }}>
              <div className="flex items-start justify-between gap-2">
                <span className="min-w-0 flex-1 font-semibold break-all">{row.email}</span>
                <span
                  className="flex-none rounded-full px-2 py-0.5 text-[16px] font-bold"
                  style={{ color: status.color }}
                >
                  {status.label}
                </span>
              </div>
              <dl className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-[16px] text-neutral-600">
                <div>
                  <dt className="inline">Trial hết hạn: </dt>
                  <dd className="inline text-ink">{fmtDate(row.trialStartedAt || undefined)}</dd>
                </div>
                <div>
                  <dt className="inline">Paid hết hạn: </dt>
                  <dd className="inline text-ink">{fmtDate(row.paidUntil)}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="inline">Gói gần nhất: </dt>
                  <dd className="inline text-ink">
                    {PRICING_PLANS.find((p) => p.cycle === row.lastCycle)?.label ?? "—"}
                  </dd>
                </div>
              </dl>
              {isSuper && (
                <div className="mt-3">
                  <AccountActions
                    row={row}
                    busy={busy}
                    cycle={cycle}
                    onCycleChange={(next) => setCycleByEmail((prev) => ({ ...prev, [row.email]: next }))}
                    onExtend={() => extend(row)}
                    extendTitle={
                      now != null
                        ? `Hạn hiện tại: ${fmtDate(row.paidUntil)} → hạn mới sau khi gia hạn: ${fmtDate(
                            previewExtendedUntil(row, cycle, now),
                          )}`
                        : undefined
                    }
                    onToggle={(value) => toggleOverride(row.email, row.debugOverride, value)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="mt-3 flex items-center justify-center gap-3 text-[16px]">
          <button className="btn btn-secondary" disabled={safePage <= 1} onClick={() => setPage(safePage - 1)}>
            ‹ Trước
          </button>
          <span className="text-neutral-600">
            Trang {safePage}/{totalPages}
          </span>
          <button
            className="btn btn-secondary"
            disabled={safePage >= totalPages}
            onClick={() => setPage(safePage + 1)}
          >
            Sau ›
          </button>
        </div>
      )}

      {isSuper && (
        <div className="mt-8">
          <h2 className="text-[19px] font-extrabold">Sub-admin (chỉ xem)</h2>
          <p className="mt-1 text-[16px] text-neutral-600">
            Sub-admin thấy được bảng trên nhưng không gia hạn hay khoá/mở khoá được.
          </p>

          <div className="mt-3 flex flex-col gap-1.5 sm:flex-row">
            <input
              type="email"
              placeholder="email@vidu.com"
              className="min-w-0 flex-1 rounded-md border px-2 py-1.5 text-[16px]"
              style={{ borderColor: "var(--color-divider)" }}
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
            />
            <button className="btn btn-secondary" disabled={pending === "__add_admin__"} onClick={addAdmin}>
              + Thêm sub-admin
            </button>
          </div>

          <ul className="mt-3 flex flex-col gap-1.5">
            {subAdmins.length === 0 && <li className="text-[16px] text-neutral-600">Chưa có sub-admin nào.</li>}
            {subAdmins.map((a) => (
              <li key={a.email} className="flex flex-col gap-1 text-[16px] sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                <span className="break-all">
                  {a.email} <span className="text-neutral-500">— thêm bởi {a.addedBy}, {fmtDate(a.addedAt)}</span>
                </span>
                <button className="btn btn-ghost self-start" disabled={pending === a.email} onClick={() => removeAdmin(a.email)}>
                  Xoá
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      </>
      )}
    </div>
  );
}

/** Inline compose box for the single owner reply on a review — collapsed to
 * just a button until opened, mirrors Play Store's "reply to review" flow. */
function ReplyBox({ review, onSaved }: { review: ReviewRow; onSaved: () => void }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(review.reply?.message ?? "");
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    try {
      await callApi("/api/admin/review-reply", { id: review.id, message });
      setOpen(false);
      onSaved();
    } catch {
      alert("Gửi phản hồi thất bại, thử lại sau.");
    } finally {
      setSaving(false);
    }
  }

  if (!open) {
    return (
      <button type="button" className="btn btn-ghost mt-2 text-[16px]" onClick={() => setOpen(true)}>
        {review.reply ? "Sửa phản hồi" : "↩ Trả lời"}
      </button>
    );
  }

  return (
    <div className="mt-2 flex flex-col gap-1.5">
      <textarea
        className="input w-full resize-none text-[16px]"
        rows={2}
        placeholder="Viết phản hồi công khai tới người đánh giá này..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="flex gap-1.5">
        <button type="button" className="btn btn-primary text-[16px]" disabled={saving} onClick={save}>
          {saving ? "Đang lưu..." : "Lưu phản hồi"}
        </button>
        <button type="button" className="btn btn-secondary text-[16px]" disabled={saving} onClick={() => setOpen(false)}>
          Huỷ
        </button>
      </div>
    </div>
  );
}

function GuestsTab({ guests }: { guests: Row[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(guests.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = guests.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const today = dayKey(new Date());
  const activeCount = guests.filter((g) => isTrialActive(g)).length;

  return (
    <div className="mt-6">
      <h1 className="text-[22px] font-extrabold">Khách vãng lai (chưa đăng nhập)</h1>
      <p className="mt-1 text-[16px] text-neutral-600">
        {guests.length} khách từng ghé không đăng nhập, {activeCount} còn trong 7 ngày dùng thử
        {totalPages > 1 && ` — trang ${safePage}/${totalPages}`}. ID chỉ là mã ẩn danh gắn với trình duyệt của họ,
        không phải danh tính thật.
      </p>

      {guests.length === 0 && <p className="mt-4 text-[16px] text-neutral-600">Chưa có khách vãng lai nào.</p>}

      {guests.length > 0 && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-[16px]">
            <thead>
              <tr className="divider-b text-neutral-600">
                <th className="py-2 pr-3 font-bold">ID</th>
                <th className="py-2 pr-3 font-bold">Bắt đầu</th>
                <th className="py-2 pr-3 font-bold">Trạng thái</th>
                <th className="py-2 pr-3 font-bold">AI hôm nay</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((g) => {
                const id = g.email.slice("guest:".length);
                const active = isTrialActive(g);
                return (
                  <tr key={g.email} className="divider-b align-top">
                    <td className="py-2.5 pr-3 font-mono text-[15px]">{id.slice(0, 8)}…</td>
                    <td className="py-2.5 pr-3">{fmtDate(g.trialStartedAt || undefined)}</td>
                    <td className="py-2.5 pr-3">
                      <span
                        className="rounded-full px-2 py-0.5 text-[16px] font-bold"
                        style={{ color: active ? "var(--color-accent)" : "var(--color-danger, #c0392b)" }}
                      >
                        {active ? `Còn ${trialDaysLeft(g)} ngày` : "Hết hạn"}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3 tabular-nums">{g.aiCallsDate === today ? (g.aiCallsToday ?? 0) : 0}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-3 flex items-center justify-center gap-3 text-[16px]">
          <button className="btn btn-secondary" disabled={safePage <= 1} onClick={() => setPage(safePage - 1)}>
            ‹ Trước
          </button>
          <span className="text-neutral-600">
            Trang {safePage}/{totalPages}
          </span>
          <button className="btn btn-secondary" disabled={safePage >= totalPages} onClick={() => setPage(safePage + 1)}>
            Sau ›
          </button>
        </div>
      )}
    </div>
  );
}

function fmtMoney(amount: number, currency: "VND" | "USD"): string {
  return currency === "VND" ? `${amount.toLocaleString("vi-VN")} đ` : `$${amount.toLocaleString("en-US")}`;
}

function RevenueTab({ orders }: { orders: RevenueOrder[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = orders.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const totalVnd = orders.filter((o) => o.currency === "VND").reduce((sum, o) => sum + o.amount, 0);
  const totalUsd = orders.filter((o) => o.currency === "USD").reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="mt-6">
      <h1 className="text-[22px] font-extrabold">Doanh thu</h1>
      <p className="mt-1 text-[16px] text-neutral-600">
        {orders.length} giao dịch đã thanh toán. Tổng: {fmtMoney(totalVnd, "VND")}
        {totalUsd > 0 && ` + ${fmtMoney(totalUsd, "USD")}`}
        {totalPages > 1 && `, trang ${safePage}/${totalPages}`}.
      </p>

      {orders.length === 0 && <p className="mt-4 text-[16px] text-neutral-600">Chưa có giao dịch nào.</p>}

      {orders.length > 0 && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-[16px]">
            <thead>
              <tr className="divider-b text-neutral-600">
                <th className="py-2 pr-3 font-bold">Email</th>
                <th className="py-2 pr-3 font-bold">Cổng</th>
                <th className="py-2 pr-3 font-bold">Gói</th>
                <th className="py-2 pr-3 font-bold">Số tiền</th>
                <th className="py-2 pr-3 font-bold">Ngày thanh toán</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((o) => (
                <tr key={`${o.method}:${o.id}`} className="divider-b align-top">
                  <td className="py-2.5 pr-3 font-semibold">{o.email}</td>
                  <td className="py-2.5 pr-3">{o.method === "payos" ? "PayOS" : "PayPal"}</td>
                  <td className="py-2.5 pr-3">{PRICING_PLANS.find((p) => p.cycle === o.cycle)?.label ?? o.cycle}</td>
                  <td className="py-2.5 pr-3">{fmtMoney(o.amount, o.currency)}</td>
                  <td className="py-2.5 pr-3">{fmtDate(o.paidAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-3 flex items-center justify-center gap-3 text-[16px]">
          <button className="btn btn-secondary" disabled={safePage <= 1} onClick={() => setPage(safePage - 1)}>
            ‹ Trước
          </button>
          <span className="text-neutral-600">
            Trang {safePage}/{totalPages}
          </span>
          <button className="btn btn-secondary" disabled={safePage >= totalPages} onClick={() => setPage(safePage + 1)}>
            Sau ›
          </button>
        </div>
      )}
    </div>
  );
}

function ReviewsTab({ reviews, isSuper }: { reviews: ReviewRow[]; isSuper: boolean }) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState<string | null>(null);
  const totalPages = Math.max(1, Math.ceil(reviews.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = reviews.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const avgRating = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  async function remove(id: string) {
    if (!window.confirm("Xoá đánh giá này khỏi trang công khai?")) return;
    setDeleting(id);
    try {
      await callApi("/api/admin/review-delete", { id });
      router.refresh();
    } catch {
      alert("Xoá thất bại, thử lại sau.");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="mt-6">
      <h1 className="text-[22px] font-extrabold">Đánh giá (công khai trên /reviews)</h1>
      <p className="mt-1 text-[16px] text-neutral-600">
        {reviews.length} đánh giá
        {reviews.length > 0 && ` — trung bình ${avgRating.toFixed(1)}/5 ⭐`}
        {totalPages > 1 && ` — trang ${safePage}/${totalPages}`}.{" "}
        {!isSuper && "Bạn có quyền xem — không thể xoá."}
      </p>

      {reviews.length === 0 && <p className="mt-4 text-[16px] text-neutral-600">Chưa có đánh giá nào.</p>}

      <div className="mt-4 flex flex-col gap-3">
        {pageItems.map((r) => (
          <div key={r.id} className="border p-3" style={{ borderColor: "var(--color-divider)" }}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <span className="flex flex-col gap-0.5">
                <span className="flex items-center gap-2">
                  <Stars value={r.rating} size={15} />
                  <span className="text-[16px] font-extrabold">{r.name || "Ẩn danh"}</span>
                </span>
                <span className="text-[16px] font-bold text-neutral-500">{r.email}</span>
              </span>
              <span className="flex flex-none flex-col items-end gap-1">
                <span className="text-[16px] text-neutral-500">{new Date(r.updatedAt).toLocaleString("vi-VN")}</span>
                {isSuper && (
                  <button
                    type="button"
                    className="btn btn-ghost text-[16px] text-red-600"
                    disabled={deleting === r.id}
                    onClick={() => remove(r.id)}
                  >
                    Xoá
                  </button>
                )}
              </span>
            </div>
            {r.comment && <p className="mt-2 text-[16px] leading-relaxed">{r.comment}</p>}
            {r.reply && (
              <div className="mt-2 border-l-2 pl-2.5" style={{ borderColor: "var(--color-accent)" }}>
                <span className="label-xs text-accent">Phản hồi của bạn</span>
                <p className="mt-0.5 text-[16px] leading-relaxed">{r.reply.message}</p>
              </div>
            )}
            {isSuper && <ReplyBox review={r} onSaved={() => router.refresh()} />}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-3 flex items-center justify-center gap-3 text-[16px]">
          <button className="btn btn-secondary" disabled={safePage <= 1} onClick={() => setPage(safePage - 1)}>
            ‹ Trước
          </button>
          <span className="text-neutral-600">
            Trang {safePage}/{totalPages}
          </span>
          <button className="btn btn-secondary" disabled={safePage >= totalPages} onClick={() => setPage(safePage + 1)}>
            Sau ›
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Token AI usage ───────────────────────────────────────────────

type RangePreset = "7" | "30" | "90" | "all";

const RANGE_PRESETS: { id: RangePreset; label: string; days: number | null }[] = [
  { id: "7", label: "7 ngày", days: 7 },
  { id: "30", label: "30 ngày", days: 30 },
  { id: "90", label: "90 ngày", days: 90 },
  { id: "all", label: "Tất cả", days: null },
];

function fmtCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return Math.round(n).toLocaleString("vi-VN");
}

/** e.g. "2026-08-19" → "19/8" */
function fmtShortDate(dateKey: string): string {
  const [, m, d] = dateKey.split("-");
  return `${Number(d)}/${Number(m)}`;
}

/** Rounds a max value up to a "clean" gridline ceiling (1/2/5/10 × 10^n) —
 * never an arbitrary max-of-data value, which produces ugly gridline labels. */
function niceCeil(n: number): number {
  if (n <= 0) return 10;
  const exp = Math.floor(Math.log10(n));
  const base = 10 ** exp;
  const mult = n / base;
  const niceMult = mult <= 1 ? 1 : mult <= 2 ? 2 : mult <= 5 ? 5 : 10;
  return niceMult * base;
}

/** Single-series (total tokens/day) bar chart — one hue (the app's own accent
 * token, already used everywhere else), no legend needed per the dataviz
 * convention for a single series. Bars are the hit target for hover/focus
 * (see dataviz skill's interaction.md): each bar's full column width is the
 * target, wider than the painted bar itself, so it's actually hittable on a
 * dense range. Every value shown here is also in the "Xem bảng theo ngày"
 * table toggle below — the tooltip enhances, it never gates. */
function TokenChart({ data }: { data: { date: string; tokens: number }[] }) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const VB_W = 1000;
  const VB_H = 240;
  const padLeft = 46;
  const padRight = 10;
  const padTop = 12;
  const padBottom = 26;
  const plotW = VB_W - padLeft - padRight;
  const plotH = VB_H - padTop - padBottom;

  const maxVal = niceCeil(Math.max(...data.map((d) => d.tokens), 1));
  const n = data.length;
  const slot = plotW / Math.max(n, 1);
  const barW = Math.max(3, Math.min(24, slot * 0.6));
  const labelEvery = Math.max(1, Math.ceil(n / 8));
  const gridSteps = [0, 0.5, 1];

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full" style={{ height: 220, overflow: "visible" }} role="img" aria-label="Biểu đồ tổng token AI theo ngày">
        {gridSteps.map((s) => {
          const y = padTop + plotH * (1 - s);
          return (
            <g key={s}>
              <line x1={padLeft} x2={VB_W - padRight} y1={y} y2={y} style={{ stroke: "var(--color-divider)" }} strokeWidth={1} />
              <text x={padLeft - 6} y={y + 4} textAnchor="end" fontSize={11} style={{ fill: "var(--color-neutral-600)" }}>
                {fmtCompact(maxVal * s)}
              </text>
            </g>
          );
        })}
        {data.map((d, i) => {
          const x = padLeft + slot * i + (slot - barW) / 2;
          const h = maxVal > 0 ? (d.tokens / maxVal) * plotH : 0;
          const y = padTop + plotH - h;
          const isHover = hoverIdx === i;
          return (
            <g key={d.date}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={Math.max(h, d.tokens > 0 ? 2 : 0)}
                rx={4}
                style={{ fill: "var(--color-accent)" }}
                opacity={isHover ? 1 : 0.85}
              />
              {i % labelEvery === 0 && (
                <text x={padLeft + slot * i + slot / 2} y={VB_H - 8} textAnchor="middle" fontSize={10} style={{ fill: "var(--color-neutral-600)" }}>
                  {fmtShortDate(d.date)}
                </text>
              )}
              {/* Hit target spans the full column, not just the painted bar —
                  a thin bar on a 90-day range is only a few px wide. */}
              <rect
                x={padLeft + slot * i}
                y={padTop}
                width={slot}
                height={plotH}
                fill="transparent"
                tabIndex={0}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx((cur) => (cur === i ? null : cur))}
                onFocus={() => setHoverIdx(i)}
                onBlur={() => setHoverIdx((cur) => (cur === i ? null : cur))}
              />
            </g>
          );
        })}
      </svg>
      {hoverIdx != null && (
        <div
          className="pointer-events-none absolute rounded px-2 py-1 text-[16px] font-bold whitespace-nowrap text-white"
          style={{
            background: "var(--color-text)",
            left: `${((padLeft + slot * hoverIdx + slot / 2) / VB_W) * 100}%`,
            top: 0,
            transform: "translate(-50%, -100%)",
          }}
        >
          {fmtShortDate(data[hoverIdx].date)}: {data[hoverIdx].tokens.toLocaleString("vi-VN")} token
        </div>
      )}
    </div>
  );
}

function TokenUsageTab({ usage }: { usage: DailyTokenUsage[] }) {
  const [range, setRange] = useState<RangePreset>("30");
  const [showTable, setShowTable] = useState(false);
  const [page, setPage] = useState(1);

  const cutoff = useMemo(() => {
    const preset = RANGE_PRESETS.find((p) => p.id === range);
    if (!preset?.days) return null;
    const d = new Date();
    d.setDate(d.getDate() - (preset.days - 1));
    return d.toISOString().slice(0, 10);
  }, [range]);

  const filtered = useMemo(() => (cutoff ? usage.filter((u) => u.date >= cutoff) : usage), [usage, cutoff]);

  const dailyTotals = useMemo(() => {
    const map = new Map<string, number>();
    for (const u of filtered) {
      map.set(u.date, (map.get(u.date) ?? 0) + u.promptTokens + u.completionTokens);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([date, tokens]) => ({ date, tokens }));
  }, [filtered]);

  const perUser = useMemo(() => {
    const map = new Map<string, { email: string; tokens: number; reasoningTokens: number; calls: number }>();
    for (const u of filtered) {
      const cur = map.get(u.email) ?? { email: u.email, tokens: 0, reasoningTokens: 0, calls: 0 };
      cur.tokens += u.promptTokens + u.completionTokens;
      cur.reasoningTokens += u.reasoningTokens;
      cur.calls += u.calls;
      map.set(u.email, cur);
    }
    return [...map.values()].sort((a, b) => b.tokens - a.tokens);
  }, [filtered]);

  const totalTokensSum = dailyTotals.reduce((s, d) => s + d.tokens, 0);
  const totalCalls = filtered.reduce((s, u) => s + u.calls, 0);
  const avgPerCall = totalCalls ? Math.round(totalTokensSum / totalCalls) : 0;

  const totalPages = Math.max(1, Math.ceil(perUser.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = perUser.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="mt-6">
      <h1 className="text-[22px] font-extrabold">Mức tiêu thụ token AI</h1>
      <p className="mt-1 text-[16px] text-neutral-600">
        Tổng hợp token DeepSeek theo tài khoản, để phát hiện chi phí bất thường (ví dụ: reasoning mode âm thầm bật lại).
      </p>

      {/* Date range filter — one row, above everything it scopes, so the KPI
          row, chart, and per-account table below always agree on the slice. */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {RANGE_PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            className="rounded-full px-3 py-1.5 text-[16px] font-bold"
            style={{
              background: range === p.id ? "var(--color-accent)" : "var(--color-surface)",
              color: range === p.id ? "#fff" : "var(--color-text)",
              border: range === p.id ? "none" : "1px solid var(--color-divider)",
            }}
            onClick={() => {
              setRange(p.id);
              setPage(1);
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-[2px] bg-[color:var(--color-divider)]">
        <div className="bg-bg p-3">
          <div className="text-[20px] leading-none font-extrabold tabular-nums">{fmtCompact(totalTokensSum)}</div>
          <div className="label-xs mt-1 text-neutral-600">Tổng token</div>
        </div>
        <div className="bg-bg p-3">
          <div className="text-[20px] leading-none font-extrabold tabular-nums">{totalCalls.toLocaleString("vi-VN")}</div>
          <div className="label-xs mt-1 text-neutral-600">Tổng lượt gọi AI</div>
        </div>
        <div className="bg-bg p-3">
          <div className="text-[20px] leading-none font-extrabold tabular-nums">{fmtCompact(avgPerCall)}</div>
          <div className="label-xs mt-1 text-neutral-600">TB token / lượt</div>
        </div>
      </div>

      {dailyTotals.length === 0 ? (
        <p className="mt-4 text-[16px] text-neutral-600">Chưa có dữ liệu token trong khoảng thời gian này.</p>
      ) : (
        <div className="mt-4">
          <TokenChart data={dailyTotals} />
          <button type="button" className="btn btn-ghost mt-1 text-[16px]" onClick={() => setShowTable((v) => !v)}>
            {showTable ? "Ẩn bảng theo ngày" : "Xem bảng theo ngày"}
          </button>
          {showTable && (
            <div className="mt-2 max-h-[240px] overflow-y-auto rounded border" style={{ borderColor: "var(--color-divider)" }}>
              <table className="w-full text-left text-[16px]">
                <thead>
                  <tr className="divider-b text-neutral-600">
                    <th className="px-2 py-1.5 font-bold">Ngày</th>
                    <th className="px-2 py-1.5 font-bold">Token</th>
                  </tr>
                </thead>
                <tbody>
                  {[...dailyTotals].reverse().map((d) => (
                    <tr key={d.date} className="divider-b">
                      <td className="px-2 py-1.5 tabular-nums">{d.date}</td>
                      <td className="px-2 py-1.5 tabular-nums">{d.tokens.toLocaleString("vi-VN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <h2 className="mt-6 text-[19px] font-extrabold">Theo tài khoản</h2>
      {perUser.length === 0 ? (
        <p className="mt-2 text-[16px] text-neutral-600">Không có dữ liệu.</p>
      ) : (
        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-[16px]">
            <thead>
              <tr className="divider-b text-neutral-600">
                <th className="py-2 pr-3 font-bold">Email</th>
                <th className="py-2 pr-3 font-bold">Token</th>
                <th className="py-2 pr-3 font-bold">Trong đó suy luận</th>
                <th className="py-2 pr-3 font-bold">Lượt gọi</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((u) => (
                <tr key={u.email} className="divider-b align-top">
                  <td className="py-2.5 pr-3 font-semibold">{u.email}</td>
                  <td className="py-2.5 pr-3 tabular-nums">{fmtCompact(u.tokens)}</td>
                  <td className="py-2.5 pr-3 tabular-nums">{u.reasoningTokens > 0 ? fmtCompact(u.reasoningTokens) : "—"}</td>
                  <td className="py-2.5 pr-3 tabular-nums">{u.calls.toLocaleString("vi-VN")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-3 flex items-center justify-center gap-3 text-[16px]">
          <button className="btn btn-secondary" disabled={safePage <= 1} onClick={() => setPage(safePage - 1)}>
            ‹ Trước
          </button>
          <span className="text-neutral-600">
            Trang {safePage}/{totalPages}
          </span>
          <button className="btn btn-secondary" disabled={safePage >= totalPages} onClick={() => setPage(safePage + 1)}>
            Sau ›
          </button>
        </div>
      )}
    </div>
  );
}
