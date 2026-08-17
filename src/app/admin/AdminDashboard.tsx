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
}: {
  subscriptions: Row[];
  role: Role;
  subAdmins: SubAdmin[];
}) {
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);
  const [cycleByEmail, setCycleByEmail] = useState<Record<string, BillingCycle>>({});
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newFreeEmail, setNewFreeEmail] = useState("");
  const isSuper = role === "super";

  // Computed client-side only (not during SSR) so the tooltip's "hạn mới"
  // date never disagrees with what hydration renders — it doesn't need to be
  // live-accurate to the second, just stable once mounted.
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);

  async function extend(row: Row) {
    const email = row.email;
    const cycle = cycleByEmail[email] ?? PRICING_PLANS[0].cycle;
    const plan = PRICING_PLANS.find((p) => p.cycle === cycle);
    const newUntil = fmtDate(previewExtendedUntil(row, cycle, now ?? Date.now()));
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
      <h1 className="text-[22px] font-extrabold">Quản lý subscription</h1>
      <p className="mt-1 text-[13px] text-neutral-600">
        {subscriptions.length} tài khoản. {!isSuper && "Bạn có quyền xem — không thể gia hạn hay khoá/mở khoá."}
      </p>

      {isSuper && (
        <div className="mt-4">
          <h2 className="text-[14px] font-extrabold">Cấp tài khoản miễn phí (unlock toàn bộ)</h2>
          <p className="mt-1 text-[13px] text-neutral-600">
            Nhập email Google bất kỳ — kể cả email chưa từng đăng nhập app — để cấp quyền dùng full miễn phí ngay lập
            tức (không cần thanh toán). Có thể thu hồi lại bằng &ldquo;Ép khoá&rdquo; ở bảng dưới sau khi họ xuất hiện
            trong danh sách.
          </p>
          <div className="mt-2 flex gap-1.5">
            <input
              type="email"
              placeholder="email@vidu.com"
              className="rounded-md border px-2 py-1.5 text-[13px]"
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

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-[13px]">
          <thead>
            <tr className="divider-b text-neutral-600">
              <th className="py-2 pr-3 font-bold">Email</th>
              <th className="py-2 pr-3 font-bold">Trạng thái</th>
              <th className="py-2 pr-3 font-bold">Trial hết hạn</th>
              <th className="py-2 pr-3 font-bold">Paid hết hạn</th>
              <th className="py-2 pr-3 font-bold">Gói gần nhất</th>
              {isSuper && <th className="py-2 pr-3 font-bold">Gia hạn</th>}
              {isSuper && <th className="py-2 pr-3 font-bold">Ép trạng thái</th>}
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((row) => {
              const status = statusOf(row);
              const busy = pending === row.email;
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
                      <div className="flex gap-1.5">
                        <select
                          className="rounded-md border px-1.5 py-1 text-[12px]"
                          style={{ borderColor: "var(--color-divider)" }}
                          value={cycleByEmail[row.email] ?? PRICING_PLANS[0].cycle}
                          onChange={(e) =>
                            setCycleByEmail((prev) => ({ ...prev, [row.email]: e.target.value as BillingCycle }))
                          }
                        >
                          {PRICING_PLANS.map((p) => (
                            <option key={p.cycle} value={p.cycle}>
                              {p.label}
                            </option>
                          ))}
                        </select>
                        <button
                          className="btn btn-secondary"
                          disabled={busy}
                          onClick={() => extend(row)}
                          title={
                            now != null
                              ? `Hạn hiện tại: ${fmtDate(row.paidUntil)} → hạn mới sau khi gia hạn: ${fmtDate(
                                  previewExtendedUntil(row, cycleByEmail[row.email] ?? PRICING_PLANS[0].cycle, now),
                                )}`
                              : undefined
                          }
                        >
                          + Gia hạn
                        </button>
                      </div>
                    </td>
                  )}
                  {isSuper && (
                    <td className="py-2.5 pr-3">
                      <div className="flex gap-1.5">
                        <button
                          className="rounded-full px-2.5 py-1 text-[12px] font-bold"
                          disabled={busy}
                          style={{
                            background: row.debugOverride === "unlocked" ? "var(--color-accent)" : "var(--color-surface)",
                            color: row.debugOverride === "unlocked" ? "#fff" : "var(--color-text)",
                            border: row.debugOverride === "unlocked" ? "none" : "1px solid var(--color-divider)",
                          }}
                          onClick={() => toggleOverride(row.email, row.debugOverride, "unlocked")}
                        >
                          Ép mở khoá
                        </button>
                        <button
                          className="rounded-full px-2.5 py-1 text-[12px] font-bold"
                          disabled={busy}
                          style={{
                            background: row.debugOverride === "locked" ? "var(--color-accent)" : "var(--color-surface)",
                            color: row.debugOverride === "locked" ? "#fff" : "var(--color-text)",
                            border: row.debugOverride === "locked" ? "none" : "1px solid var(--color-divider)",
                          }}
                          onClick={() => toggleOverride(row.email, row.debugOverride, "locked")}
                        >
                          Ép khoá
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isSuper && (
        <div className="mt-8">
          <h2 className="text-[16px] font-extrabold">Sub-admin (chỉ xem)</h2>
          <p className="mt-1 text-[13px] text-neutral-600">
            Sub-admin thấy được bảng trên nhưng không gia hạn hay khoá/mở khoá được.
          </p>

          <div className="mt-3 flex gap-1.5">
            <input
              type="email"
              placeholder="email@vidu.com"
              className="rounded-md border px-2 py-1.5 text-[13px]"
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
              <li key={a.email} className="flex items-center justify-between gap-2 text-[13px]">
                <span>
                  {a.email} <span className="text-neutral-500">— thêm bởi {a.addedBy}, {fmtDate(a.addedAt)}</span>
                </span>
                <button className="btn btn-ghost" disabled={pending === a.email} onClick={() => removeAdmin(a.email)}>
                  Xoá
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
