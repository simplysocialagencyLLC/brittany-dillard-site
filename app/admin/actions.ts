"use server";

import { auth } from "@/lib/auth";

export interface AdminAssignment {
  id: string;
  battleType: string;
  battleDate: string;
  assignedTime: string | null;
  outcome: string | null;
  winnerRank: number | null;
  registrantName: string | null;
  registrantHandle: string | null;
  registrantCountry: string | null;
  registrantFollowers: string | null;
  registrantHighestCoins: string | null;
  registrantWillReachTarget: string | null;
  registrantAdditionalInfo: string | null;
}

export interface PagedAssignments {
  assignments: AdminAssignment[];
  totalGroups: number;
  page: number;
  pageSize: number;
}

const EMPTY: PagedAssignments = { assignments: [], totalGroups: 0, page: 1, pageSize: 10 };

// Server-only — the partner API key never reaches the browser. Used for the
// initial server-rendered page (page.tsx); the client-side useQuery on
// subsequent page/filter changes goes through app/api/admin/assignments
// (a browser-callable proxy that does the same server-side key handling).

export async function getAssignments(params?: { page?: number; outcome?: string }): Promise<PagedAssignments> {
  const session = await auth();
  if (!session?.user) return EMPTY;

  const apiUrl = process.env.KING_KALY_API_URL;
  const apiKey = process.env.KING_KALY_API_KEY;
  if (!apiUrl || !apiKey) {
    console.error("[ADMIN] KING_KALY_API_URL / KING_KALY_API_KEY not configured");
    return EMPTY;
  }

  const search = new URLSearchParams({ page: String(params?.page ?? 1) });
  if (params?.outcome) search.set("outcome", params.outcome);

  try {
    const res = await fetch(`${apiUrl}/api/partners/brittany-dillard/assignments?${search}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store",
    });
    if (!res.ok) return EMPTY;
    const data = await res.json();
    return {
      assignments: Array.isArray(data.assignments) ? data.assignments : [],
      totalGroups: data.totalGroups ?? 0,
      page: data.page ?? 1,
      pageSize: data.pageSize ?? 10,
    };
  } catch (err) {
    console.error("[ADMIN] fetch failed:", err);
    return EMPTY;
  }
}

export async function markOutcome(
  assignmentId: string,
  outcome: "scheduled" | "won" | "lost" | "no_show",
) {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Not signed in");

  const apiUrl = process.env.KING_KALY_API_URL;
  const apiKey = process.env.KING_KALY_API_KEY;
  if (!apiUrl || !apiKey) throw new Error("King Kaly API not configured");

  const res = await fetch(
    `${apiUrl}/api/partners/brittany-dillard/assignments/${assignmentId}/outcome`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ outcome, actingUserEmail: session.user.email }),
    },
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Failed to update");
  return data;
}
