import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// Browser-facing proxy for the admin dashboard's useQuery — the King Kaly
// API key stays server-side (env var), never sent to the client. Session-
// gated so this can't be hit by anyone who isn't logged into /admin.
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const apiUrl = process.env.KING_KALY_API_URL;
  const apiKey = process.env.KING_KALY_API_KEY;
  if (!apiUrl || !apiKey) {
    return NextResponse.json({ error: "King Kaly API not configured" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const outcome = searchParams.get("outcome") || "";

  const params = new URLSearchParams({ page });
  if (outcome) params.set("outcome", outcome);

  try {
    const res = await fetch(`${apiUrl}/api/partners/brittany-dillard/assignments?${params}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("[ADMIN_ASSIGNMENTS_PROXY] fetch failed:", err);
    return NextResponse.json({ error: "Failed to reach King Kaly API" }, { status: 502 });
  }
}
