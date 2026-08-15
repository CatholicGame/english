import { NextResponse, type NextRequest } from "next/server";
import { getValidAccessToken, writeSession } from "@/lib/google-oauth";
import { readDriveListenCustomCloze, writeDriveListenCustomCloze } from "@/lib/google-drive";
import type { CustomClozeData } from "@/lib/listen-custom-cloze-store";

function filesChanged(a: Record<string, string> | undefined, b: Record<string, string>): boolean {
  const aKeys = Object.keys(a ?? {});
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return true;
  return bKeys.some((k) => a?.[k] !== b[k]);
}

export async function GET() {
  const auth = await getValidAccessToken();
  if (!auth) return NextResponse.json({ reason: "reauth_required" }, { status: 401 });

  const { data, files } = await readDriveListenCustomCloze(auth.accessToken, auth.session);
  if (filesChanged(auth.session.files, files)) {
    await writeSession({ ...auth.session, files });
  }
  return NextResponse.json({ data });
}

export async function PUT(request: NextRequest) {
  const body: CustomClozeData = await request.json();

  const auth = await getValidAccessToken();
  if (!auth) return NextResponse.json({ reason: "reauth_required" }, { status: 401 });

  const { files } = await writeDriveListenCustomCloze(auth.accessToken, auth.session, body);
  if (filesChanged(auth.session.files, files)) {
    await writeSession({ ...auth.session, files });
  }
  return NextResponse.json({ ok: true });
}
