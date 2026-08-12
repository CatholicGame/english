import { NextResponse, type NextRequest } from "next/server";
import { getValidAccessToken, writeSession } from "@/lib/google-oauth";
import { readDriveAiConvos, writeDriveAiConvos } from "@/lib/google-drive";
import type { AiConvoData } from "@/lib/ai-convo-store";

function filesChanged(a: Record<string, string> | undefined, b: Record<string, string>): boolean {
  const aKeys = Object.keys(a ?? {});
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return true;
  return bKeys.some((k) => a?.[k] !== b[k]);
}

export async function GET(request: NextRequest) {
  const storageKey = request.nextUrl.searchParams.get("key");
  if (!storageKey) return NextResponse.json({ error: "missing key" }, { status: 400 });

  const auth = await getValidAccessToken();
  if (!auth) return NextResponse.json({ reason: "reauth_required" }, { status: 401 });

  const { data, files } = await readDriveAiConvos(auth.accessToken, auth.session, storageKey);
  if (filesChanged(auth.session.files, files)) {
    await writeSession({ ...auth.session, files });
  }
  return NextResponse.json({ data });
}

export async function PUT(request: NextRequest) {
  const storageKey = request.nextUrl.searchParams.get("key");
  if (!storageKey) return NextResponse.json({ error: "missing key" }, { status: 400 });

  const body: AiConvoData = await request.json();

  const auth = await getValidAccessToken();
  if (!auth) return NextResponse.json({ reason: "reauth_required" }, { status: 401 });

  const { files } = await writeDriveAiConvos(auth.accessToken, auth.session, storageKey, body);
  if (filesChanged(auth.session.files, files)) {
    await writeSession({ ...auth.session, files });
  }
  return NextResponse.json({ ok: true });
}