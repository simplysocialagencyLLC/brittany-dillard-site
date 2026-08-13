import { NextRequest, NextResponse } from "next/server";

// Forwards a "Apply for Box Battle" submission to King Kaly's own admin
// dashboard (tagged with sourcePartnerId there) so his team can also pick
// applicants for a partner battle straight from his /admin/registrations —
// additive only, alongside (not instead of) the existing Google Sheets
// webhook in BattleRegistrationModal.tsx. Server-side so KING_KALY_API_KEY
// never reaches the browser.
export async function POST(req: NextRequest) {
  const apiUrl = process.env.KING_KALY_API_URL;
  const apiKey = process.env.KING_KALY_API_KEY;
  if (!apiUrl || !apiKey) {
    console.error("[REGISTER_PARTNER_BATTLE] KING_KALY_API_URL / KING_KALY_API_KEY not configured");
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  try {
    const res = await fetch(`${apiUrl}/api/partners/brittany-dillard/registrations`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("[REGISTER_PARTNER_BATTLE] forward failed:", err);
    return NextResponse.json({ error: "Forward failed" }, { status: 502 });
  }
}
