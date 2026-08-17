import { NextResponse, type NextRequest } from "next/server";
import { readSession } from "@/lib/google-oauth";
import { getSubscription, setSubscription } from "@/lib/subscription-db";
import type { SubscriptionData } from "@/lib/subscription-store";

export async function GET() {
  const session = await readSession();
  if (!session) return NextResponse.json({ reason: "reauth_required" }, { status: 401 });

  const data = await getSubscription(session.user.email);

  // First time this account is ever seen — stamp the 7-day trial start using
  // the server clock (not the client's), and persist it immediately so it's
  // never re-stamped later.
  if (!data) {
    const started: SubscriptionData = { trialStartedAt: Date.now(), updatedAt: Date.now() };
    await setSubscription(session.user.email, started);
    return NextResponse.json({ data: started });
  }

  return NextResponse.json({ data });
}

export async function PUT(request: NextRequest) {
  const body: SubscriptionData = await request.json();

  const session = await readSession();
  if (!session) return NextResponse.json({ reason: "reauth_required" }, { status: 401 });

  await setSubscription(session.user.email, body);
  return NextResponse.json({ ok: true });
}
