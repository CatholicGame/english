import { NextResponse, type NextRequest } from "next/server";
import { getValidAccessToken, writeSession } from "@/lib/google-oauth";
import { readDriveTranslations, writeDriveTranslations } from "@/lib/google-drive";
import type { TranslationData } from "@/lib/translation-store";

function filesChanged(a: Record<string, string> | undefined, b: Record<string, string>): boolean {
  const aKeys = Object.keys(a ?? {});
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return true;
  return bKeys.some((k) => a?.[k] !== b[k]);
}

export async function GET() {
  const auth = await getValidAccessToken();
  if (!auth) return NextResponse.json({ reason: "reauth_required" }, { status: 401 });

  const { data, files } = await readDriveTranslations(auth.accessToken, auth.session);
  if (filesChanged(auth.session.files, files)) {
    await writeSession({ ...auth.session, files });
  }
  return NextResponse.json({ data });
}

export async function PUT(request: NextRequest) {
  const body: TranslationData = await request.json();

  const auth = await getValidAccessToken();
  if (!auth) return NextResponse.json({ reason: "reauth_required" }, { status: 401 });

  const { files } = await writeDriveTranslations(auth.accessToken, auth.session, body);
  if (filesChanged(auth.session.files, files)) {
    await writeSession({ ...auth.session, files });
  }
  return NextResponse.json({ ok: true });
}
