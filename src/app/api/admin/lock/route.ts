import { NextResponse, type NextRequest } from "next/server";
import { readSession } from "@/lib/google-oauth";
import { resolveAdminRole } from "@/lib/admin";
import { getSubscription, setSubscription } from "@/lib/subscription-db";
import { withDebugOverride, DEFAULT_SUBSCRIPTION } from "@/lib/subscription-store";

type OverrideChoice = "locked" | "unlocked" | "none";

export async function POST(request: NextRequest) {
  const session = await readSession();
  const role = await resolveAdminRole(session?.user.email);
  if (role !== "super") {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email : null;
  const override = body?.override as OverrideChoice | undefined;
  if (!email || !override || !["locked", "unlocked", "none"].includes(override)) {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const current = await getSubscription(email);
  const updated = withDebugOverride(current ?? DEFAULT_SUBSCRIPTION, override === "none" ? null : override);
  await setSubscription(email, updated);
  return NextResponse.json({ ok: true, subscription: updated });
}
