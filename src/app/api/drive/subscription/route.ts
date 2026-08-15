import { NextResponse, type NextRequest } from "next/server";
import { getValidAccessToken, writeSession } from "@/lib/google-oauth";
import { readDriveSubscription, writeDriveSubscription } from "@/lib/google-drive";
import type { SubscriptionData } from "@/lib/subscription-store";

function filesChanged(a: Record<string, string> | undefined, b: Record<string, string>): boolean {
  const aKeys = Object.keys(a ?? {});
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return true;
  return bKeys.some((k) => a?.[k] !== b[k]);
}

export async function GET() {
  const auth = await getValidAccessToken();
  if (!auth) return NextResponse.json({ reason: "reauth_required" }, { status: 401 });

  const { data, files } = await readDriveSubscription(auth.accessToken, auth.session);
  if (filesChanged(auth.session.files, files)) {
    await writeSession({ ...auth.session, files });
  }

  // First time this account is ever seen — stamp the 7-day trial start using
  // the server clock (not the client's), and persist it immediately so it's
  // never re-stamped later.
  if (!data) {
    const started: SubscriptionData = { trialStartedAt: Date.now(), updatedAt: Date.now() };
    await writeDriveSubscription(auth.accessToken, auth.session, started);
    return NextResponse.json({ data: started });
  }

  return NextResponse.json({ data });
}

export async function PUT(request: NextRequest) {
  const body: SubscriptionData = await request.json();

  const auth = await getValidAccessToken();
  if (!auth) return NextResponse.json({ reason: "reauth_required" }, { status: 401 });

  const { files } = await writeDriveSubscription(auth.accessToken, auth.session, body);
  if (filesChanged(auth.session.files, files)) {
    await writeSession({ ...auth.session, files });
  }
  return NextResponse.json({ ok: true });
}
