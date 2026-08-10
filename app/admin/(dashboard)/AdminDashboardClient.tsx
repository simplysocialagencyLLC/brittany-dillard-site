"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Trophy, Users, ChevronLeft, ChevronRight, Calendar, Sparkles } from "lucide-react";
import { markOutcome, type AdminAssignment, type PagedAssignments } from "../actions";
import BattleModal from "./BattleModal";

const MAX_WINNERS = 3;

const OUTCOME_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  scheduled: { bg: "rgba(59,130,246,0.1)", color: "#93c5fd", border: "rgba(59,130,246,0.2)" },
  won: { bg: "rgba(16,185,129,0.12)", color: "#6ee7b7", border: "rgba(16,185,129,0.25)" },
};

function groupKey(a: AdminAssignment) {
  return `${a.battleType}::${a.battleDate}`;
}

export default function AdminDashboardClient({
  initialAssignments,
  initialTotalGroups,
  pageSize,
}: {
  initialAssignments: AdminAssignment[];
  initialTotalGroups: number;
  pageSize: number;
}) {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [outcomeFilter, setOutcomeFilter] = useState("");
  const [error, setError] = useState("");
  const [openBattleKey, setOpenBattleKey] = useState<string | null>(null);

  const queryKey = ["admin-assignments", page, outcomeFilter];

  const { data, isLoading, isFetching } = useQuery({
    queryKey,
    queryFn: async (): Promise<PagedAssignments> => {
      const params = new URLSearchParams({ page: String(page) });
      if (outcomeFilter) params.set("outcome", outcomeFilter);
      const res = await fetch(`/api/admin/assignments?${params}`);
      if (!res.ok) throw new Error("Failed to load");
      return res.json();
    },
    initialData:
      page === 1 && outcomeFilter === ""
        ? { assignments: initialAssignments, totalGroups: initialTotalGroups, page: 1, pageSize }
        : undefined,
    placeholderData: (previousData) => previousData,
    // The underlying fetch is already cache: "no-store" (always live on a
    // fresh load) — this interval is what makes an already-open tab pick up
    // a new selection/outcome/removal from King Kaly's side without the
    // team needing to reload. Only polls while the tab is actually visible
    // (refetchIntervalInBackground defaults to false), so it doesn't waste
    // calls when the dashboard is just sitting in a background tab.
    refetchInterval: 45_000,
  });

  const assignments = data?.assignments ?? [];
  const totalGroups = data?.totalGroups ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalGroups / pageSize));

  const groups = new Map<string, AdminAssignment[]>();
  for (const a of assignments) {
    const key = groupKey(a);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(a);
  }
  const openGroup = openBattleKey ? groups.get(openBattleKey) ?? [] : [];

  const handleOutcome = async (a: AdminAssignment, outcome: "scheduled" | "won" | "lost" | "no_show") => {
    const result = await markOutcome(a.id, outcome);
    queryClient.setQueryData<PagedAssignments | undefined>(queryKey, (prev) =>
      prev
        ? {
            ...prev,
            assignments: prev.assignments.map((x) =>
              x.id === a.id
                ? { ...x, outcome, winnerRank: outcome === "won" ? (result as { winnerRank?: number }).winnerRank ?? null : null }
                : x,
            ),
          }
        : prev,
    );
    return result;
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "1.75rem" }}>
        <div>
          <p style={{ fontSize: "11.5px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#f9a8d4", display: "flex", alignItems: "center", gap: "6px", marginBottom: "0.4rem" }}>
            <Sparkles size={12} /> Partner Battles
          </p>
          <h1 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "2.25rem", color: "#fff", marginBottom: "0.5rem" }}>
            Selected Participants
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", maxWidth: "480px", lineHeight: 1.5 }}>
            Open a battle to review each participant and mark up to {MAX_WINNERS} winners — winners
            are automatically entered into King Kaly&apos;s own Box Battle.
          </p>
        </div>
        <select
          value={outcomeFilter}
          onChange={(e) => {
            setOutcomeFilter(e.target.value);
            setPage(1);
          }}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
            borderRadius: "0.75rem",
            padding: "0.65rem 0.9rem",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <option value="">All Outcomes</option>
          <option value="scheduled">Scheduled</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
          <option value="no_show">No Show</option>
        </select>
      </div>

      {error && (
        <p style={{ color: "#fca5a5", fontSize: "14px", marginBottom: "1.5rem", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "0.75rem", padding: "0.75rem 1rem", fontWeight: 600 }}>
          {error}
        </p>
      )}

      {isLoading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: "1.1rem" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: "148px",
                borderRadius: "1rem",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.05)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, transparent, rgba(236,72,153,0.06), transparent)",
                  animation: "shimmer 1.4s infinite",
                }}
              />
            </div>
          ))}
        </div>
      ) : groups.size === 0 ? (
        <div style={{ textAlign: "center", padding: "5rem 1rem", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "1.25rem" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(236,72,153,0.08)", border: "1px solid rgba(236,72,153,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
            <Users size={20} color="#f9a8d4" />
          </div>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "15px", fontWeight: 600 }}>No one&apos;s been selected yet.</p>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13.5px", marginTop: "0.35rem" }}>
            Check back once King Kaly sends participants your way.
          </p>
        </div>
      ) : (
        // Compact cards, one per battle — participants only render once a
        // specific battle is opened (in the modal), not inline here. Keeps
        // this page light even with many battles at ~9 participants each.
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
            gap: "1.1rem",
            opacity: isFetching ? 0.55 : 1,
            transition: "opacity 0.2s",
          }}
        >
          {Array.from(groups.entries()).map(([key, group]) => {
            const first = group[0];
            const winnerCount = group.filter((a) => a.outcome === "won").length;
            const scheduledCount = group.filter((a) => (a.outcome ?? "scheduled") === "scheduled").length;
            const isFull = winnerCount >= MAX_WINNERS;

            return (
              <button
                key={key}
                onClick={() => setOpenBattleKey(key)}
                className="battle-card"
                style={{
                  textAlign: "left",
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "1.1rem",
                  padding: "0",
                  cursor: "pointer",
                  color: "#fff",
                  overflow: "hidden",
                  transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
                }}
              >
                <div style={{ height: "3px", width: "100%", background: "linear-gradient(90deg, #f9a8d4, #ec4899, #be185d)", opacity: isFull ? 1 : 0.35 }} />
                <div style={{ padding: "1.1rem" }}>
                  <p style={{ fontWeight: 700, fontSize: "17px", fontFamily: "var(--font-playfair), Georgia, serif" }}>{first.battleType} Box Battle</p>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", marginTop: "0.35rem", display: "flex", alignItems: "center", gap: "5px" }}>
                    <Calendar size={12} /> {first.battleDate} {first.assignedTime ? `· ${first.assignedTime} UK` : ""}
                  </p>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.9rem" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "11.5px",
                        fontWeight: 700,
                        padding: "0.3rem 0.65rem",
                        borderRadius: "9999px",
                        background: isFull ? OUTCOME_STYLE.won.bg : "rgba(255,255,255,0.05)",
                        color: isFull ? OUTCOME_STYLE.won.color : "rgba(255,255,255,0.5)",
                        border: `1px solid ${isFull ? OUTCOME_STYLE.won.border : "rgba(255,255,255,0.1)"}`,
                      }}
                    >
                      <Trophy size={11} /> {winnerCount}/{MAX_WINNERS}
                    </span>
                    {scheduledCount > 0 && (
                      <span
                        style={{
                          fontSize: "11.5px",
                          fontWeight: 700,
                          padding: "0.3rem 0.65rem",
                          borderRadius: "9999px",
                          background: OUTCOME_STYLE.scheduled.bg,
                          color: OUTCOME_STYLE.scheduled.color,
                          border: `1px solid ${OUTCOME_STYLE.scheduled.border}`,
                        }}
                      >
                        {scheduledCount} pending
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.9rem", paddingTop: "0.7rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>
                      <Users size={12.5} /> {group.length} participant{group.length === 1 ? "" : "s"}
                    </span>
                    <ChevronRight size={14} color="rgba(249,168,212,0.6)" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "2rem" }}>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>
            Page {page} of {totalPages} · {totalGroups} battle{totalGroups === 1 ? "" : "s"}
          </p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              disabled={page <= 1 || isFetching}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              style={pagerBtnStyle}
            >
              <ChevronLeft size={13} /> Prev
            </button>
            <button
              disabled={page >= totalPages || isFetching}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              style={pagerBtnStyle}
            >
              Next <ChevronRight size={13} />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .battle-card:hover {
          border-color: rgba(236, 72, 153, 0.35) !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px -8px rgba(236, 72, 153, 0.25);
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      {openBattleKey && openGroup.length > 0 && (
        <BattleModal
          group={openGroup}
          onClose={() => setOpenBattleKey(null)}
          onOutcomeChange={async (a, outcome) => {
            setError("");
            try {
              return await handleOutcome(a, outcome);
            } catch (e) {
              setError(e instanceof Error ? e.message : "Failed to update");
              throw e;
            }
          }}
        />
      )}
    </div>
  );
}

const pagerBtnStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "rgba(255,255,255,0.7)",
  borderRadius: "0.6rem",
  padding: "0.5rem 1rem",
  fontSize: "12px",
  fontWeight: 600,
  cursor: "pointer",
};
