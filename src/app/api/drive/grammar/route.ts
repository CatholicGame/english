import { NextResponse, type NextRequest } from "next/server";
import { getValidAccessToken, writeSession } from "@/lib/google-oauth";
import { readDriveGrammar, writeDriveGrammar } from "@/lib/google-drive";
import type { GrammarData } from "@/lib/grammar-store";

function filesChanged(a: Record<string, string> | undefined, b: Record<string, string>): boolean {
  const aKeys = Object.keys(a ?? {});
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return true;
  return bKeys.some((k) => a?.[k] !== b[k]);
}

export async function GET() {
  const auth = await getValidAccessToken();
  if (!auth) return NextResponse.json({ reason: "reauth_required" }, { status: 401 });

  const { data, files } = await readDriveGrammar(auth.accessToken, auth.session);
  if (filesChanged(auth.session.files, files)) {
    await writeSession({ ...auth.session, files });
  }
  return NextResponse.json({ data });
}

export async function PUT(request: NextRequest) {
  const body: GrammarData = await request.json();

  const auth = await getValidAccessToken();
  if (!auth) return NextResponse.json({ reason: "reauth_required" }, { status: 401 });

  const { files } = await writeDriveGrammar(auth.accessToken, auth.session, body);
  if (filesChanged(auth.session.files, files)) {
    await writeSession({ ...auth.session, files });
  }
  return NextResponse.json({ ok: true });
}
