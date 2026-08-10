"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  ChevronLeft,
  ChevronDown,
  Trophy,
  XCircle,
  UserX,
  RotateCcw,
  AtSign,
  MapPin,
  Star,
  Hash,
  Target,
  FileText,
} from "lucide-react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import type { AdminAssignment } from "../actions";

type Outcome = "scheduled" | "won" | "lost" | "no_show";

const MAX_WINNERS = 3;

const OUTCOME_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  scheduled: { bg: "rgba(59,130,246,0.1)", color: "#93c5fd", border: "rgba(59,130,246,0.25)" },
  won: { bg: "rgba(16,185,129,0.1)", color: "#6ee7b7", border: "rgba(16,185,129,0.25)" },
  lost: { bg: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "rgba(255,255,255,0.12)" },
  no_show: { bg: "rgba(239,68,68,0.1)", color: "#fca5a5", border: "rgba(239,68,68,0.25)" },
};

const OUTCOME_LABEL: Record<Outcome, string> = {
  scheduled: "reset them to scheduled",
  won: "mark them as the winner",
  lost: "mark them as lost",
  no_show: "mark them as a no-show",
};

function initials(name: string | null) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "?";
}

function DetailRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: React.ReactNode }) {
  return (
    <div style={{ padding: "0.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexShrink: 0 }}>
        <div style={{ width: "26px", height: "26px", borderRadius: "8px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={12} color="rgba(255,255,255,0.4)" />
        </div>
        <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
      </div>
      <span style={{ fontSize: "13px", fontWeight: 600, color: "#fff", textAlign: "right", maxWidth: "58%", lineHeight: 1.4, wordBreak: "break-word" }}>
        {value || <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>—</span>}
      </span>
    </div>
  );
}

/**
 * Roster (list) -> Detail (single participant + actions) drill-down — same
 * pattern as King Kaly's internal apps/admin/.../PartnerBattleModal.tsx.
 * Nothing about individual participants renders on the page itself, only
 * inside this modal, only once a specific battle is opened.
 *
 * Portal-rendered (attaches to document.body, outside the layout's own
 * colored wrapper div) — `color: "#fff"` is set explicitly on the card root
 * below so every text node inherits white by default instead of falling
 * through to the marketing site's global `color: black` on <body>. That was
 * the exact cause of the earlier black-text-on-black-background bug.
 */
export default function BattleModal({
  group,
  onClose,
  onOutcomeChange,
}: {
  group: AdminAssignment[];
  onClose: () => void;
  onOutcomeChange: (a: AdminAssignment, outcome: Outcome) => Promise<{ winnerRank?: number } | void>;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [confirmOutcome, setConfirmOutcome] = useState<{ a: AdminAssignment; outcome: Outcome } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const first = group[0];
  if (!first) return null;
  const winnerCount = group.filter((a) => a.outcome === "won").length;
  const selected = group.find((a) => a.id === selectedId) ?? null;

  const selectParticipant = (id: string) => {
    setSelectedId(id);
    setShowDetails(false);
  };

  const runOutcome = async () => {
    if (!confirmOutcome) return;
    setBusy(true);
    setError("");
    try {
      await onOutcomeChange(confirmOutcome.a, confirmOutcome.outcome);
      setConfirmOutcome(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update");
    } finally {
      setBusy(false);
    }
  };

  return createPortal(
    <div style={{ position: "fixed", inset: 0, zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }} onClick={onClose} />
      <div
        style={{
          position: "relative",
          zIndex: 10,
          color: "#fff",
          background: "#0c0c0c",
          border: "1px solid rgba(236,72,153,0.15)",
          borderRadius: "1.5rem",
          width: "100%",
          maxWidth: "480px",
          maxHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 40px 90px rgba(0,0,0,0.6)",
        }}
      >
        {/* Accent stripe, matching the site's pink gradient motif */}
        <div style={{ height: "3px", width: "100%", flexShrink: 0, background: "linear-gradient(90deg, #f9a8d4, #ec4899, #be185d)" }} />

        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", background: "rgba(236,72,153,0.03)" }}>
          <div style={{ minWidth: 0 }}>
            {selected && (
              <button
                onClick={() => setSelectedId(null)}
                style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", fontWeight: 700, color: "#f9a8d4", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: "0.5rem" }}
              >
                <ChevronLeft size={13} /> Back to participants
              </button>
            )}
            <p style={{ fontWeight: 700, fontSize: "16px", fontFamily: "var(--font-playfair), Georgia, serif" }}>{first.battleType} Box Battle</p>
            <p style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.4)", marginTop: "0.2rem" }}>
              {first.battleDate} {first.assignedTime ? `· ${first.assignedTime} UK` : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
          >
            <X size={13} color="rgba(255,255,255,0.6)" />
          </button>
        </div>

        <div style={{ overflowY: "auto" }}>
          {error && (
            <p style={{ margin: "1rem 1.5rem 0", fontSize: "12px", fontWeight: 600, color: "#fca5a5", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "0.75rem", padding: "0.6rem 0.9rem" }}>
              {error}
            </p>
          )}

          {!selected ? (
            <>
              <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "11.5px",
                    fontWeight: 700,
                    padding: "0.3rem 0.7rem",
                    borderRadius: "9999px",
                    background: winnerCount >= MAX_WINNERS ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.05)",
                    color: winnerCount >= MAX_WINNERS ? "#6ee7b7" : "rgba(255,255,255,0.5)",
                  }}
                >
                  <Trophy size={11} /> {winnerCount}/{MAX_WINNERS} winners
                </span>
                <span style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.35)" }}>{group.length} participant{group.length === 1 ? "" : "s"}</span>
              </div>

              <div>
                {group.map((a) => {
                  const style = OUTCOME_STYLE[a.outcome ?? "scheduled"];
                  return (
                    <button
                      key={a.id}
                      onClick={() => selectParticipant(a.id)}
                      style={{
                        width: "100%",
                        padding: "0.875rem 1.5rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid rgba(255,255,255,0.03)",
                        cursor: "pointer",
                        textAlign: "left",
                        color: "#fff",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(236,72,153,0.06)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "rgba(236,72,153,0.1)", border: "1px solid rgba(236,72,153,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#f9a8d4", flexShrink: 0 }}>
                        {initials(a.registrantName)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "14px", fontWeight: 600 }}>
                          {a.registrantName} {a.winnerRank && <span style={{ color: "#f9a8d4" }}>#{a.winnerRank}</span>}
                        </p>
                        <p style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.35)" }}>@{a.registrantHandle}</p>
                      </div>
                      <span style={{ fontSize: "10.5px", fontWeight: 700, textTransform: "uppercase", padding: "0.3rem 0.6rem", borderRadius: "9999px", background: style.bg, color: style.color, border: `1px solid ${style.border}`, flexShrink: 0 }}>
                        {(a.outcome ?? "scheduled").replace("_", " ")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: "46px", height: "46px", borderRadius: "50%", background: "rgba(236,72,153,0.1)", border: "1px solid rgba(236,72,153,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, color: "#f9a8d4", flexShrink: 0 }}>
                  {initials(selected.registrantName)}
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: "18px", fontWeight: 700, fontFamily: "var(--font-playfair), Georgia, serif" }}>{selected.registrantName}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginTop: "0.3rem", fontSize: "12.5px", color: "rgba(255,255,255,0.4)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><AtSign size={11} /> {selected.registrantHandle}</span>
                    {selected.registrantCountry && (
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><MapPin size={11} /> {selected.registrantCountry}</span>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1.25rem" }}>
                <span style={{ fontSize: "11.5px", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Status</span>
                {(() => {
                  const s = OUTCOME_STYLE[selected.outcome ?? "scheduled"];
                  return (
                    <span style={{ fontSize: "10.5px", fontWeight: 700, textTransform: "uppercase", padding: "0.3rem 0.6rem", borderRadius: "9999px", background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
                      {(selected.outcome ?? "scheduled").replace("_", " ")}
                      {selected.winnerRank ? ` #${selected.winnerRank}` : ""}
                    </span>
                  );
                })()}
              </div>

              {/* Registration details — collapsed by default */}
              <div style={{ marginTop: "1.5rem" }}>
                <button
                  onClick={() => setShowDetails((v) => !v)}
                  style={{
                    width: "100%",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 0.9rem",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "0.75rem",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "12.5px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  <span>{showDetails ? "Hide" : "Show"} Registration Details</span>
                  <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: showDetails ? "rotate(180deg)" : "none" }} />
                </button>

                {showDetails && (
                  <div style={{ marginTop: "0.5rem", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.75rem", padding: "0 1rem" }}>
                    <DetailRow icon={MapPin} label="Country" value={selected.registrantCountry} />
                    <DetailRow icon={Star} label="Followers" value={selected.registrantFollowers} />
                    <DetailRow icon={Hash} label="Highest Coins" value={selected.registrantHighestCoins} />
                    <DetailRow icon={Target} label="Will Reach 100k+" value={selected.registrantWillReachTarget} />
                    {selected.registrantAdditionalInfo && (
                      <div style={{ padding: "0.75rem 0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                          <div style={{ width: "26px", height: "26px", borderRadius: "8px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <FileText size={12} color="rgba(255,255,255,0.4)" />
                          </div>
                          <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Additional Info</span>
                        </div>
                        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", lineHeight: 1.5, whiteSpace: "pre-wrap", paddingLeft: "34px" }}>{selected.registrantAdditionalInfo}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div style={{ marginTop: "1.5rem" }}>
                <p style={{ fontSize: "11.5px", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "0.6rem" }}>Actions</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  <button
                    disabled={selected.outcome === "won" || (winnerCount >= MAX_WINNERS && selected.outcome !== "won")}
                    onClick={() => setConfirmOutcome({ a: selected, outcome: "won" })}
                    style={primaryActionBtnStyle()}
                  >
                    <Trophy size={13} /> Winner
                  </button>
                  <button
                    disabled={selected.outcome === "lost"}
                    onClick={() => setConfirmOutcome({ a: selected, outcome: "lost" })}
                    style={actionBtnStyle("rgba(255,255,255,0.65)")}
                  >
                    <XCircle size={13} /> Lost
                  </button>
                  <button
                    disabled={selected.outcome === "no_show"}
                    onClick={() => setConfirmOutcome({ a: selected, outcome: "no_show" })}
                    style={actionBtnStyle("#f87171")}
                  >
                    <UserX size={13} /> No Show
                  </button>
                  <button
                    disabled={selected.outcome === "scheduled"}
                    onClick={() => setConfirmOutcome({ a: selected, outcome: "scheduled" })}
                    style={actionBtnStyle("#60a5fa")}
                  >
                    <RotateCcw size={13} /> Reset
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={!!confirmOutcome}
        onClose={() => setConfirmOutcome(null)}
        onConfirm={runOutcome}
        loading={busy}
        title={confirmOutcome ? `${confirmOutcome.a.registrantName}?` : ""}
        description={
          confirmOutcome
            ? `You're about to ${OUTCOME_LABEL[confirmOutcome.outcome]}.${
                confirmOutcome.outcome === "won"
                  ? " This automatically enters them into King Kaly's own Box Battle."
                  : ""
              }`
            : undefined
        }
        confirmLabel={confirmOutcome?.outcome === "won" ? "Confirm Winner" : "Confirm"}
        danger={confirmOutcome?.outcome === "no_show"}
      />
    </div>,
    document.body,
  );
}

function actionBtnStyle(color: string): React.CSSProperties {
  return {
    height: "42px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${color}55`,
    color,
    borderRadius: "0.7rem",
    fontSize: "12.5px",
    fontWeight: 700,
    cursor: "pointer",
  };
}

function primaryActionBtnStyle(): React.CSSProperties {
  return {
    height: "42px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    background: "linear-gradient(135deg, #10b981, #059669)",
    border: "1px solid rgba(16,185,129,0.4)",
    color: "#fff",
    borderRadius: "0.7rem",
    fontSize: "12px",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(16,185,129,0.25)",
  };
}
