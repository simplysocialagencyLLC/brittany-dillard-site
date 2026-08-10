import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

// Called by King Kaly's admin (packages/lib/src/partnerRevalidate.ts) right
// after a selection, flyer, or removal changes something that feeds the
// "Upcoming Battles" section on the homepage — so it updates immediately
// instead of waiting out the fetch cache's time-based revalidation
// (lib/king-kaly.ts). Bearer-secret authenticated (REVALIDATE_SECRET),
// separate from KING_KALY_API_KEY since this is the reverse call direction.
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret || !token || token !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Next 16's revalidateTag requires a cache-life profile as the 2nd arg —
  // "max" here just means "no additional expire ceiling", not the tag's TTL
  revalidateTag("king-kaly-battles", "max");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
