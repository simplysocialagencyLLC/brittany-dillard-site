import type { Battle } from "@/components/UpcomingBattles";

// This feed is public/unauthenticated on King Kaly's side (see
// apps/web/app/api/partners/[slug]/battles/route.ts) — no registrant data,
// and the flyer images themselves are already plain public Cloudinary URLs
// — so this fetch needs KING_KALY_API_URL but not the API key at all.
export async function getUpcomingBattles(): Promise<Battle[]> {
  const apiUrl = process.env.KING_KALY_API_URL;

  if (!apiUrl) {
    console.error("[KING_KALY_API] KING_KALY_API_URL not configured");
    return [];
  }

  try {
    const res = await fetch(`${apiUrl}/api/partners/brittany-dillard/battles`, {
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
