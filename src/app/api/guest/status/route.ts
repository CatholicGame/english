import { NextResponse } from "next/server";
import { guestDaysLeft, isGuestTrialActive, readGuestSession } from "@/lib/guest-cookie";

export async function GET() {
  const guest = await readGuestSession();
  if (!guest) return NextResponse.json({ active: false, daysLeft: 0 });
  const active = isGuestTrialActive(guest);
  return NextResponse.json({ active, daysLeft: active ? guestDaysLeft(guest) : 0 });
}
