/**
 * Follower counts are collected as free text ("40k", "3.5k followers",
 * "10,000", "43,9k" from European users typing a decimal comma, etc.)
 * because forcing a bare number would fight how people actually describe
 * their follower count. This extracts a best-effort numeric value so the
 * form can give live "≈ N followers" feedback, matching what King Kaly's
 * own registration form does.
 *
 * Copied verbatim from king-kaly/packages/lib/src/followers.ts to keep
 * follower-count parsing identical between the two sites — this repo isn't
 * part of that pnpm workspace, so it can't import the shared package.
 */
function startsWithSuffix(tail: string, word: string): boolean {
  if (!tail.startsWith(word)) return false;
  const after = tail.slice(word.length);
  if (after === "") return true;
  const c = after[0];
  if (!/[a-z]/.test(c)) return true;
  if (after.startsWith("follow")) return true;
  return false;
}

export function parseFollowerCount(raw: string | null | undefined): number | null {
  if (raw == null) return null;
  let s = String(raw).trim();
  if (!s) return null;

  s = s.replace(/[’'•·]/g, (c) => (c === "•" || c === "·" ? "." : ""));

  const lower = s.toLowerCase();

  const m = lower.match(/\d[\d.,\s]*\d|\d/);
  if (!m) return null;

  const numPart = m[0].trim();
  const matchEnd = (m.index ?? 0) + m[0].length;
  const tail = lower.slice(matchEnd, matchEnd + 15).replace(/^\s+/, "");

  let multiplier = 1;
  if (startsWithSuffix(tail, "million")) multiplier = 1_000_000;
  else if (startsWithSuffix(tail, "thousand")) multiplier = 1_000;
  else if (startsWithSuffix(tail, "m")) multiplier = 1_000_000;
  else if (startsWithSuffix(tail, "k")) multiplier = 1_000;

  const hasSuffix = multiplier > 1;

  const hasComma = numPart.includes(",");
  const hasDot = numPart.includes(".");
  const hasSpace = /\d\s+\d/.test(numPart);

  let normalized = numPart;

  if (hasComma && hasDot) {
    normalized = normalized.replace(/,/g, "");
  } else if (hasComma) {
    const parts = normalized.split(",");
    const last = parts[parts.length - 1];
    if (hasSuffix && last.length <= 2) {
      normalized = parts.slice(0, -1).join("").replace(/\s/g, "") + "." + last;
    } else {
      normalized = normalized.replace(/,/g, "");
    }
  } else if (hasDot) {
    const parts = normalized.split(".");
    const last = parts[parts.length - 1];
    if (!hasSuffix && parts.length > 1 && last.length === 3) {
      normalized = normalized.replace(/\./g, "");
    }
  }

  if (hasSpace) {
    normalized = normalized.replace(/\s+/g, "");
  }

  const n = parseFloat(normalized);
  if (!Number.isFinite(n)) return null;

  const result = Math.round(n * multiplier);
  return result > 0 ? result : null;
}
