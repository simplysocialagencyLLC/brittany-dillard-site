import type { Battle } from "@/components/UpcomingBattles";

// Server-only — KING_KALY_API_KEY must never reach the client bundle. This
// fetch happens in a Server Component (app/page.tsx), not in the browser.
export async function getUpcomingBattles(): Promise<Battle[]> {
  const apiUrl = process.env.KING_KALY_API_URL;
  const apiKey = process.env.KING_KALY_API_KEY;

  if (!apiUrl || !apiKey) {
    console.error("[KING_KALY_API] KING_KALY_API_URL / KING_KALY_API_KEY not configured");
    return [];
  }

  try {
    const res = await fetch(`${apiUrl}/api/partners/brittany-dillard/battles`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      // "king-kaly-battles" tag lets King Kaly's admin push an immediate
      // update via /api/revalidate the moment a selection, flyer, or
      // removal changes something here — the 60s revalidate is just a
      // fallback in case that on-demand call ever fails to land.
      next: { revalidate: 60, tags: ["king-kaly-battles"] },
    });
    if (!res.ok) {
      console.error(`[KING_KALY_API] ${res.status} ${res.statusText}`);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data.battles) ? data.battles : [];
  } catch (err) {
    console.error("[KING_KALY_API] fetch failed:", err);
    return [];
  }
}
