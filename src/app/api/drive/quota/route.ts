import { NextResponse } from "next/server";
import { getValidAccessToken } from "@/lib/google-oauth";
import { getDriveStorageQuota } from "@/lib/google-drive";

export async function GET() {
  const auth = await getValidAccessToken();
  if (!auth) return NextResponse.json({ reason: "reauth_required" }, { status: 401 });

  try {
    const quota = await getDriveStorageQuota(auth.accessToken);
    return NextResponse.json(quota);
  } catch {
    return NextResponse.json({ error: "quota_fetch_failed" }, { status: 502 });
  }
}
