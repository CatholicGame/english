import { NextResponse, type NextRequest } from "next/server";
import { saveShare } from "@/lib/share-store";

export async function POST(request: NextRequest) {
  const hasSession = request.cookies.get("gd_session") ?? request.cookies.get("guest_ok");
  if (!hasSession) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    if (!payload || typeof payload !== "object") {
      return NextResponse.json({ ok: false, error: "invalid payload" }, { status: 400 });
    }
    const id = await saveShare(payload);
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : "Share failed" },
      { status: 500 },
    );
  }
}
