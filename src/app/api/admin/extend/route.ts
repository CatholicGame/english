import { NextResponse, type NextRequest } from "next/server";
import { readSession } from "@/lib/google-oauth";
import { resolveAdminRole } from "@/lib/admin";
import { getSubscription, setSubscription } from "@/lib/subscription-db";
import { withPaidExtended, DEFAULT_SUBSCRIPTION, PRICING_PLANS, type BillingCycle } from "@/lib/subscription-store";

export async function POST(request: NextRequest) {
  const session = await readSession();
  const role = await resolveAdminRole(session?.user.email);
  if (role !== "super") {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email : null;
  const cycle = body?.cycle as BillingCycle | undefined;
  if (!email || !PRICING_PLANS.some((p) => p.cycle === cycle)) {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const current = await getSubscription(email);
  const updated = withPaidExtended(
    current ?? DEFAULT_SUBSCRIPTION,
    cycle as BillingCycle,
    `Admin gia hạn thủ công bởi ${session!.user.email}`,
  );
  await setSubscription(email, updated);
  return NextResponse.json({ ok: true, subscription: updated });
}
