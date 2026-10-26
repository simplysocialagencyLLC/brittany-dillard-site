import { NextRequest, NextResponse } from "next/server";

// Forwards the gifting-level screenshot to King Kaly's own upload endpoint
// (apps/web/app/api/upload-screenshot/route.ts there) — the same Vercel Blob
// storage and magic-byte validation his own registration form uses — so the
// resulting URL can be attached to the applicant in his admin. Proxied
// server-side to avoid a cross-origin request from the browser.
export async function POST(req: NextRequest) {
  const apiUrl = process.env.KING_KALY_API_URL;
  if (!apiUrl) {
    console.error("[UPLOAD_SCREENSHOT] KING_KALY_API_URL not configured");
    return NextResponse.json({ error: "Upload is not available right now." }, { status: 503 });
  }

  const formData = await req.formData().catch(() => null);
  const file = formData?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const forward = new FormData();
  forward.append("file", file);

  try {
    const res = await fetch(`${apiUrl}/api/upload-screenshot`, { method: "POST", body: forward });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("[UPLOAD_SCREENSHOT] forward failed:", err);
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 502 });
  }
}
