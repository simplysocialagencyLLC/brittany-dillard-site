"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, Loader2 } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  loading?: boolean;
  danger?: boolean;
}

// Same API shape as king-kaly's apps/admin/components/shared/ConfirmDialog —
// styled to this site's dark/pink theme instead of the King Kaly admin's
// light theme.
export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  loading = false,
  danger = false,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div style={{ position: "fixed", inset: 0, zIndex: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }} onClick={onClose} />
      <div
        style={{
          position: "relative",
          color: "#fff",
          background: "#111",
          border: "1px solid rgba(236,72,153,0.25)",
          borderRadius: "1.25rem",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
          width: "100%",
          maxWidth: "380px",
          padding: "1.75rem",
        }}
      >
        {danger && (
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(239,68,68,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <AlertTriangle size={20} color="#f87171" />
            </div>
          </div>
        )}
        <h2 style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontSize: "18px", fontWeight: 700, color: "#fff", textAlign: "center", marginBottom: "0.5rem" }}>
          {title}
        </h2>
        {description && (
          <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.5)", textAlign: "center", marginBottom: "1.5rem", lineHeight: 1.6 }}>
            {description}
          </p>
        )}
        {!description && <div style={{ marginBottom: "1rem" }} />}
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            onClick={onClose}
            disabled={loading}
            style={{
              flex: 1,
              padding: "0.65rem 1rem",
              borderRadius: "0.75rem",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "transparent",
              color: "rgba(255,255,255,0.7)",
              fontSize: "13.5px",
              fontWeight: 600,
              cursor: "pointer",
              opacity: loading ? 0.5 : 1,
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            style={{
              flex: 1,
              padding: "0.65rem 1rem",
              borderRadius: "0.75rem",
              border: "none",
              background: danger ? "#ef4444" : "linear-gradient(135deg, #ec4899, #be185d)",
              color: "#fff",
              fontSize: "13.5px",
              fontWeight: 700,
              cursor: "pointer",
              opacity: loading ? 0.6 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            {loading && <Loader2 size={13} style={{ animation: "spin 0.8s linear infinite" }} />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
