import { NextResponse, type NextRequest } from "next/server";
import { getValidAccessToken, writeSession } from "@/lib/google-oauth";
import { readDriveSubscription, writeDriveSubscription } from "@/lib/google-drive";
import { matchActivationCode } from "@/lib/activation-code";
import { withPaidExtended, DEFAULT_SUBSCRIPTION, PRICING_PLANS } from "@/lib/subscription-store";

export async function POST(request: NextRequest) {
  const auth = await getValidAccessToken();
  if (!auth) return NextResponse.json({ ok: false, error: "reauth_required" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code : "";
  if (!code) return NextResponse.json({ ok: false, error: "missing code" }, { status: 400 });

  const cycle = matchActivationCode(auth.session.user.email, code);
  if (!cycle) {
    return NextResponse.json({ ok: false, error: "invalid_code" }, { status: 400 });
  }

  const { data: current } = await readDriveSubscription(auth.accessToken, auth.session);
  const plan = PRICING_PLANS.find((p) => p.cycle === cycle);
  const subscription = withPaidExtended(
    current ?? DEFAULT_SUBSCRIPTION,
    cycle,
    `Kích hoạt thủ công gói ${plan?.label ?? cycle} sau khi xác nhận thanh toán qua QR code`,
  );
  const { files } = await writeDriveSubscription(auth.accessToken, auth.session, subscription);
  await writeSession({ ...auth.session, files: { ...(auth.session.files ?? {}), ...files } });

  return NextResponse.json({ ok: true, subscription });
}
