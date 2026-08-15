import { NextResponse, type NextRequest } from "next/server";
import { getValidAccessToken, writeSession } from "@/lib/google-oauth";
import { writeDriveSubscription } from "@/lib/google-drive";
import { verifyActivationCode } from "@/lib/activation-code";
import { withPlanActivated } from "@/lib/subscription-store";

export async function POST(request: NextRequest) {
  const auth = await getValidAccessToken();
  if (!auth) return NextResponse.json({ ok: false, error: "reauth_required" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code : "";
  if (!code) return NextResponse.json({ ok: false, error: "missing code" }, { status: 400 });

  if (!verifyActivationCode(auth.session.user.email, code)) {
    return NextResponse.json({ ok: false, error: "invalid_code" }, { status: 400 });
  }

  const subscription = withPlanActivated("Kích hoạt thủ công sau khi xác nhận thanh toán qua QR code");
  const { files } = await writeDriveSubscription(auth.accessToken, auth.session, subscription);
  await writeSession({ ...auth.session, files: { ...(auth.session.files ?? {}), ...files } });

  return NextResponse.json({ ok: true, subscription });
}
