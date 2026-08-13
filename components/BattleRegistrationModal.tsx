"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { parseFollowerCount } from "@/lib/followers";

// Same ceiling King Kaly's own registration form enforces
// (packages/lib/src/giftingLevel.ts's MAX_PLAUSIBLE_LEVEL) — kept in sync
// by hand since this repo can't import that shared package.
const MAX_PLAUSIBLE_LEVEL = 100;

// Preserved exactly from the original site — posts to Brittany's existing
// Google Apps Script webhook (reads e.postData.contents, emails + saves to a
// Sheet), completely separate from King Kaly's own registration system.
// no-cors + text/plain keeps this a "simple request" so no CORS preflight is
// needed; the response is opaque, so success here just means the request was
// sent, not that the sheet write succeeded.
const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbyI6RHX-31uEQms4x7k8ecJE2_5Q864hsEYoSB3h3SM9mBTHVwlI3JsoITg4bK_256A/exec";

const OFFICIALS = ["Country Box Battle", "Most Handsome Box Battle", "Most Beautiful Box Battle", `Love Box Official Winner's Edition`];
const LEAGUES = ["A4 - A1 league", "B4 - B1 league", "C4 - C1 League", "D4 - D1 League"];

type FormState = {
  name: string;
  tiktok: string;
  coinsTarget: string;
  followers: string;
  official: string;
  country: string;
  league: string;
  giftingLevel: string;
  highestCoins: string;
  contactPref: string;
  email: string;
  whatsapp: string;
};

const EMPTY: FormState = {
  name: "", tiktok: "", coinsTarget: "", followers: "", official: "",
  country: "", league: "", giftingLevel: "", highestCoins: "",
  contactPref: "", email: "", whatsapp: "",
};

export default function BattleRegistrationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [data, setData] = useState<FormState>(EMPTY);
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState<Set<keyof FormState>>(new Set());
  const [status, setStatus] = useState<"form" | "success" | "error">("form");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Reset form state each time the modal transitions closed -> open. Adjusted
  // directly during render (React's documented pattern for "state that
  // depends on a changed prop") instead of via useEffect+setState, which
  // would commit the stale render first and then immediately re-render.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setData(EMPTY);
      setFileName("");
      setErrors(new Set());
      setStatus("form");
    }
  }

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const set = (field: keyof FormState) => (value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev.has(field)) return prev;
      const next = new Set(prev);
      next.delete(field);
      return next;
    });
  };

  // Same checks King Kaly's own registration form runs client-side, so a
  // Brittany-sourced applicant that lands in his admin has the same
  // reliably-parseable followers/gifting-level data a native one would.
  const followersParsed = parseFollowerCount(data.followers);
  const giftingLevelValid =
    data.giftingLevel.trim() === "" ||
    Number(data.giftingLevel.trim()) <= MAX_PLAUSIBLE_LEVEL;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const missing = new Set<keyof FormState>();
    (Object.keys(data) as (keyof FormState)[]).forEach((key) => {
      if (!data[key].trim()) missing.add(key);
    });
    if (data.followers.trim() && followersParsed === null) missing.add("followers");
    if (data.giftingLevel.trim() && !giftingLevelValid) missing.add("giftingLevel");
    if (missing.size > 0) {
      setErrors(missing);
      return;
    }

    setSubmitting(true);
    const payload = {
      name: data.name.trim(),
      tiktok_username: data.tiktok.trim(),
      can_meet_100k: data.coinsTarget,
      followers: data.followers.trim(),
      which_official: data.official,
      country: data.country.trim(),
      league: data.league,
      gifting_level: data.giftingLevel.trim(),
      highest_coins: data.highestCoins.trim(),
      contact_preference: data.contactPref,
      email: data.email.trim(),
      whatsapp: data.whatsapp.trim(),
      screenshot_filename: fileName,
    };

    fetch(WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload),
    })
      .then(() => {
        setStatus("success");
      })
      .catch(() => {
        setErrorMsg("Could not reach the server. Please check your connection and try again.");
        setStatus("error");
      })
      .finally(() => setSubmitting(false));

    // Additive: also feeds this applicant into King Kaly's own admin
    // dashboard (see app/api/register-partner-battle/route.ts) so his team
    // can select from these applicants for a partner battle too. Entirely
    // independent of the Sheets webhook above — its success/failure never
    // touches `status`/`errorMsg`, so it can't affect what the applicant sees.
    fetch("/api/register-partner-battle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name.trim(),
        tiktokUsername: data.tiktok.trim(),
        willReachTarget: data.coinsTarget,
        followers: data.followers.trim(),
        official: data.official,
        country: data.country.trim(),
        league: data.league,
        giftingLevel: data.giftingLevel.trim(),
        highestCoins: data.highestCoins.trim(),
        contactMethod: data.contactPref,
        email: data.email.trim(),
        whatsapp: data.whatsapp.trim(),
      }),
    }).catch(() => {});
  };

  return (
    <div id="battleModal" role="dialog" aria-modal="true" aria-labelledby="bm-title" className="open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bm-card">
        <button className="bm-close" onClick={onClose} aria-label="Close">&times;</button>

        {status === "success" && (
          <div className="bm-success" style={{ display: "block" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M21.801 10A10 10 0 1 1 17 3.335" /><path d="m9 11 3 3L22 4" /></svg>
            <h3>Registration submitted successfully!</h3>
            <p>Thanks for signing up for the Love Box Box Battle. Brit will be in touch soon!</p>
          </div>
        )}

        {status === "error" && (
          <div className="bm-success" style={{ display: "block" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth={1.5}><circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
            <h3 style={{ color: "#ec4899" }}>Submission Failed</h3>
            <p>{errorMsg}</p>
            <button className="bm-submit" style={{ marginTop: "1.5rem" }} onClick={() => setStatus("form")}>Try Again</button>
          </div>
        )}

        {status === "form" && (
          <div>
            <h2 className="bm-title" id="bm-title">Registration Form</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="bm-field">
                <label className="bm-label" htmlFor="bm-name">Your Name <span className="req">*</span></label>
                <input className="bm-input" type="text" id="bm-name" value={data.name} onChange={(e) => set("name")(e.target.value)} placeholder="Enter your answer" style={errors.has("name") ? { borderColor: "#ec4899" } : undefined} />
              </div>

              <div className="bm-field">
                <label className="bm-label" htmlFor="bm-tiktok">Your TikTok Username <span className="req">*</span></label>
                <input className="bm-input" type="text" id="bm-tiktok" value={data.tiktok} onChange={(e) => set("tiktok")(e.target.value.replace(/^@+/, ""))} placeholder="@username" style={errors.has("tiktok") ? { borderColor: "#ec4899" } : undefined} />
              </div>

              <hr className="bm-divider" />

              <div className="bm-field">
                <label className="bm-label">If you were to join the box battle, will you be able to meet up with 100k coins and Above target? <span className="req">*</span></label>
                <div className="bm-radio-group" style={errors.has("coinsTarget") ? { outline: "2px solid #ec4899" } : undefined}>
                  {["Yes", "No", "Maybe"].map((v) => (
                    <label className="bm-radio-option" key={v}>
                      <input type="radio" name="coins_target" value={v} checked={data.coinsTarget === v} onChange={() => set("coinsTarget")(v)} />
                      <span>{v}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bm-field">
                <label className="bm-label" htmlFor="bm-followers">How many followers do you have? <span className="req">*</span></label>
                <input className="bm-input" type="text" id="bm-followers" value={data.followers} onChange={(e) => set("followers")(e.target.value)} placeholder="e.g. 5000 or 5k" style={errors.has("followers") ? { borderColor: "#ec4899" } : undefined} />
                {data.followers.trim() !== "" && (
                  <p style={{ marginTop: "0.5rem", fontSize: "13px", color: followersParsed !== null ? "rgba(255,255,255,0.4)" : "var(--pink)" }}>
                    {followersParsed !== null
                      ? `≈ ${followersParsed.toLocaleString()} followers`
                      : "We couldn't find a number in that — please include one, e.g. 5000 or 5k."}
                  </p>
                )}
              </div>

              <hr className="bm-divider" />

              <div className="bm-field">
                <label className="bm-label">Which Official will you like to join? <span className="req">*</span></label>
                <div className="bm-radio-group" style={errors.has("official") ? { outline: "2px solid #ec4899" } : undefined}>
                  {OFFICIALS.map((v) => (
                    <label className="bm-radio-option" key={v}>
                      <input type="radio" name="official" value={v} checked={data.official === v} onChange={() => set("official")(v)} />
                      <span>{v}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bm-field">
                <label className="bm-label" htmlFor="bm-country">Which Country will you be representing? <span className="req">*</span></label>
                <input className="bm-input" type="text" id="bm-country" value={data.country} onChange={(e) => set("country")(e.target.value)} placeholder="e.g. Nigeria" style={errors.has("country") ? { borderColor: "#ec4899" } : undefined} />
              </div>

              <hr className="bm-divider" />

              <div className="bm-field">
                <label className="bm-label">Which League are you on? <span className="req">*</span></label>
                <div className="bm-radio-group" style={errors.has("league") ? { outline: "2px solid #ec4899" } : undefined}>
                  {LEAGUES.map((v) => (
                    <label className="bm-radio-option" key={v}>
                      <input type="radio" name="league" value={v} checked={data.league === v} onChange={() => set("league")(v)} />
                      <span>{v}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bm-field">
                <label className="bm-label" htmlFor="bm-gift-level">What&apos;s your Gifting level? <span className="req">*</span></label>
                <input
                  className="bm-input"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  id="bm-gift-level"
                  value={data.giftingLevel}
                  onChange={(e) => set("giftingLevel")(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  placeholder="e.g. 19"
                  style={errors.has("giftingLevel") ? { borderColor: "#ec4899" } : undefined}
                />
                {data.giftingLevel.trim() !== "" && !giftingLevelValid && (
                  <p style={{ marginTop: "0.5rem", fontSize: "13px", color: "var(--pink)" }}>
                    {`Must be ${MAX_PLAUSIBLE_LEVEL} or less.`}
                  </p>
                )}
              </div>

              <div className="bm-field">
                <label className="bm-label">Attach a screenshot of your Gifting Level <span className="req">*</span></label>
                <span className="bm-sample-label">Sample screenshot:</span>
                <Image className="bm-sample-img" src="/gifting-screenshot-sample.jpeg" alt="Sample gifting level screenshot" width={240} height={228} />
                <label className="bm-file-wrap" htmlFor="bm-gift-screenshot">
                  <span className="bm-file-btn">Choose File</span>
                  <span className="bm-file-name" style={fileName ? { color: "rgba(255,255,255,0.8)" } : undefined}>{fileName || "Select your image"}</span>
                  <input type="file" id="bm-gift-screenshot" accept="image/*" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")} />
                </label>
              </div>

              <div className="bm-field">
                <label className="bm-label" htmlFor="bm-highest-coins">What is the highest coins you have received in a box game? <span className="req">*</span></label>
                <input className="bm-input" type="text" id="bm-highest-coins" value={data.highestCoins} onChange={(e) => set("highestCoins")(e.target.value)} placeholder="Enter your answer" style={errors.has("highestCoins") ? { borderColor: "#ec4899" } : undefined} />
              </div>

              <hr className="bm-divider" />

              <div className="bm-field">
                <label className="bm-label">How would you like to receive additional information about the event? <span className="req">*</span></label>
                <div className="bm-radio-group" style={errors.has("contactPref") ? { outline: "2px solid #ec4899" } : undefined}>
                  {["Phone call", "Email", "Text"].map((v) => (
                    <label className="bm-radio-option" key={v}>
                      <input type="radio" name="contact_pref" value={v} checked={data.contactPref === v} onChange={() => set("contactPref")(v)} />
                      <span>{v}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bm-field">
                <label className="bm-label" htmlFor="bm-email">Email Address <span className="req">*</span></label>
                <input className="bm-input" type="email" id="bm-email" value={data.email} onChange={(e) => set("email")(e.target.value)} placeholder="you@example.com" style={errors.has("email") ? { borderColor: "#ec4899" } : undefined} />
              </div>

              <div className="bm-field">
                <label className="bm-label" htmlFor="bm-whatsapp">WhatsApp Number including Country code <span className="req">*</span></label>
                <input className="bm-input" type="tel" id="bm-whatsapp" value={data.whatsapp} onChange={(e) => set("whatsapp")(e.target.value)} placeholder="+234..." style={errors.has("whatsapp") ? { borderColor: "#ec4899" } : undefined} />
              </div>

              <button type="submit" className="bm-submit" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Registration"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
