"use client";

import { useEffect, useState } from "react";
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

type Row = SubscriptionData & { email: string };
type SubAdmin = { email: string; addedBy: string; addedAt: number };
type Role = "super" | "viewer";
type FeedbackRow = { id: string; email: string; rating: number; message?: string; context: "settings" | "prompt"; createdAt: number };
type Tab = "subscriptions" | "feedback";

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
          className="min-w-0 flex-1 rounded-md border px-1.5 py-1 text-[12px] sm:flex-none"
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
          className="flex-1 rounded-full px-2.5 py-1 text-[12px] font-bold sm:flex-none"
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
          className="flex-1 rounded-full px-2.5 py-1 text-[12px] font-bold sm:flex-none"
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
  role,
  subAdmins,
  feedback,
}: {
  subscriptions: Row[];
  role: Role;
  subAdmins: SubAdmin[];
  feedback: FeedbackRow[];
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
    <div className="mx-auto max-w-[1100px] px-4 py-8">
      <div className="divider-b flex gap-1">
        {([
          { id: "subscriptions", label: "Subscription" },
          { id: "feedback", label: `Phản hồi${feedback.length ? ` (${feedback.length})` : ""}` },
        ] as const).map((tb) => (
          <button
            key={tb.id}
            type="button"
            className="px-3 py-3 text-[13px] font-extrabold"
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

      {tab === "feedback" && <FeedbackTab feedback={feedback} />}

      {tab === "subscriptions" && (
      <>
      <h1 className="mt-6 text-[22px] font-extrabold">Quản lý subscription</h1>
      <p className="mt-1 text-[13px] text-neutral-600">
        {search ? `${filtered.length}/${subscriptions.length}` : subscriptions.length} tài khoản
        {totalPages > 1 && ` — trang ${safePage}/${totalPages}`}.{" "}
        {!isSuper && "Bạn có quyền xem — không thể gia hạn hay khoá/mở khoá."}
      </p>

      {isSuper && (
        <div className="mt-4">
          <h2 className="text-[14px] font-extrabold">Cấp tài khoản miễn phí (unlock toàn bộ)</h2>
          <p className="mt-1 text-[13px] text-neutral-600">
            Nhập email Google bất kỳ — kể cả email chưa từng đăng nhập app — để cấp quyền dùng full miễn phí ngay lập
            tức (không cần thanh toán). Có thể thu hồi lại bằng &ldquo;Ép khoá&rdquo; ở bảng dưới sau khi họ xuất hiện
            trong danh sách.
          </p>
          <div className="mt-2 flex flex-col gap-1.5 sm:flex-row">
            <input
              type="email"
              placeholder="email@vidu.com"
              className="min-w-0 flex-1 rounded-md border px-2 py-1.5 text-[13px]"
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
        className="mt-4 w-full rounded-md border px-2 py-1.5 text-[13px] sm:max-w-xs"
        style={{ borderColor: "var(--color-divider)" }}
        value={search}
        onChange={(e) => updateSearch(e.target.value)}
      />

      {filtered.length === 0 && (
        <p className="mt-4 text-[13px] text-neutral-600">Không tìm thấy tài khoản nào khớp với &ldquo;{search}&rdquo;.</p>
      )}

      {/* Desktop / tablet: table. Hidden below sm — a data table with 5+
          columns just doesn't fit a portrait phone screen without horizontal
          scrolling, which is what made this unusable on mobile. */}
      <div className="mt-4 hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[860px] text-left text-[13px]">
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
                    <span className="rounded-full px-2 py-0.5 text-[12px] font-bold" style={{ color: status.color }}>
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
                  className="flex-none rounded-full px-2 py-0.5 text-[12px] font-bold"
                  style={{ color: status.color }}
                >
                  {status.label}
                </span>
              </div>
              <dl className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-[12px] text-neutral-600">
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
        <div className="mt-3 flex items-center justify-center gap-3 text-[13px]">
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
          <h2 className="text-[16px] font-extrabold">Sub-admin (chỉ xem)</h2>
          <p className="mt-1 text-[13px] text-neutral-600">
            Sub-admin thấy được bảng trên nhưng không gia hạn hay khoá/mở khoá được.
          </p>

          <div className="mt-3 flex flex-col gap-1.5 sm:flex-row">
            <input
              type="email"
              placeholder="email@vidu.com"
              className="min-w-0 flex-1 rounded-md border px-2 py-1.5 text-[13px]"
              style={{ borderColor: "var(--color-divider)" }}
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
            />
            <button className="btn btn-secondary" disabled={pending === "__add_admin__"} onClick={addAdmin}>
              + Thêm sub-admin
            </button>
          </div>

          <ul className="mt-3 flex flex-col gap-1.5">
            {subAdmins.length === 0 && <li className="text-[13px] text-neutral-600">Chưa có sub-admin nào.</li>}
            {subAdmins.map((a) => (
              <li key={a.email} className="flex flex-col gap-1 text-[13px] sm:flex-row sm:items-center sm:justify-between sm:gap-2">
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

function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ color: "var(--color-accent)" }}>
      {"★".repeat(rating)}
      <span style={{ color: "var(--color-divider)" }}>{"★".repeat(5 - rating)}</span>
    </span>
  );
}

function FeedbackTab({ feedback }: { feedback: FeedbackRow[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(feedback.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = feedback.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const avgRating = feedback.length ? feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length : 0;

  return (
    <div className="mt-6">
      <h1 className="text-[22px] font-extrabold">Phản hồi người dùng</h1>
      <p className="mt-1 text-[13px] text-neutral-600">
        {feedback.length} lượt đánh giá
        {feedback.length > 0 && ` — trung bình ${avgRating.toFixed(1)}/5 ⭐`}
        {totalPages > 1 && ` — trang ${safePage}/${totalPages}`}.
      </p>

      {feedback.length === 0 && <p className="mt-4 text-[13px] text-neutral-600">Chưa có phản hồi nào.</p>}

      <div className="mt-4 flex flex-col gap-3">
        {pageItems.map((f) => (
          <div key={f.id} className="border p-3" style={{ borderColor: "var(--color-divider)" }}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-[15px]">
                <Stars rating={f.rating} />
                <span className="text-[12px] font-bold text-neutral-600">{f.email}</span>
              </span>
              <span className="text-[12px] text-neutral-500">
                {new Date(f.createdAt).toLocaleString("vi-VN")} · {f.context === "prompt" ? "gợi ý tự động" : "menu Cài đặt"}
              </span>
            </div>
            {f.message && <p className="mt-2 text-[13px] leading-relaxed">{f.message}</p>}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-3 flex items-center justify-center gap-3 text-[13px]">
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
