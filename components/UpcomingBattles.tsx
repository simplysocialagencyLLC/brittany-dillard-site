"use client";

import { useRef } from "react";
import Image from "next/image";
import { useBattleModal } from "./BattleModalProvider";

export interface Battle {
  battleType: string;
  battleDate: string;
  day: string;
  date: string;
  time: string;
  flyerUrl: string | null;
}

function downloadBattleImage(img: string, title: string) {
  const name = title.trim().replace(/[^a-z0-9 ]/gi, "").replace(/\s+/g, "-").toLowerCase() + ".png";
  const a = document.createElement("a");
  a.href = img;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export default function UpcomingBattles({ battles }: { battles: Battle[] }) {
  const { openModal } = useBattleModal();
  const withFlyers = battles.filter((b) => b.flyerUrl);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Same pattern as King Kaly's own "Upcoming Box Battles" section: date
  // pills don't hold refs of their own — they look up the matching card by
  // its data-id and scrollIntoView it, relying on the container's
  // scroll-snap CSS (already present in globals.css) to settle it in view.
  const uniqueDates = Array.from(new Set(withFlyers.map((b) => b.battleDate)));

  const scrollToBattle = (id: string) => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector(`[data-id="${id}"]`);
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <section className="section-dark" id="archives" style={{ background: "#050505", paddingBottom: "12rem" }}>
      <div className="container" style={{ maxWidth: "1400px" }}>
        <div className="section-label section-label-dark">
          <div className="line" style={{ background: "rgba(236,72,153,0.5)" }}></div>
          <span style={{ color: "var(--pink)" }}>The Arena Schedule</span>
        </div>
        <h2 className="section-title" style={{ fontSize: "clamp(2.5rem,5vw,5rem)" }}>
          Upcoming Official <span className="accent" style={{ fontStyle: "italic" }}>Box Battles.</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", maxWidth: "32rem", marginBottom: "1rem" }}>
          These are the participant of the upcoming official box battles. To join the official box battle.
        </p>
        <p style={{ color: "var(--pink)", fontStyle: "italic", fontSize: "0.75rem", marginBottom: "2rem" }}>
          NOTE: To enter the Love Box Official you MUST have won the daily box battle with at least 10k in the last 2 months.
        </p>
        <button className="btn-pink" onClick={openModal} style={{ marginBottom: "3rem", cursor: "pointer" }}>
          Apply for Box Battle
        </button>

        {withFlyers.length === 0 ? (
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>No battles scheduled yet — check back soon.</p>
        ) : (
          <>
            <div className="flex gap-3 scroll-hide mb-8" style={{ overflowX: "auto", paddingBottom: "0.5rem" }}>
              {uniqueDates.map((battleDate) => {
                const first = withFlyers.find((b) => b.battleDate === battleDate)!;
                return (
                  <div
                    className="date-pill"
                    key={battleDate}
                    onClick={() => scrollToBattle(`${first.battleType}-${first.battleDate}`)}
                  >
                    <span className="day-text">{first.day}</span>
                    <span className="month-text">{first.date.split(" ")[0]}</span>
                  </div>
                );
              })}
            </div>

            <div className="cards-scroll scroll-hide" style={{ gap: "2rem" }} ref={scrollRef}>
              {withFlyers.map((b) => (
                <div className="card-battle" key={`${b.battleType}-${b.battleDate}`} data-id={`${b.battleType}-${b.battleDate}`}>
                  <div className="card-img" style={{ position: "relative" }}>
                    <Image src={b.flyerUrl!} alt={b.battleType} fill style={{ objectFit: "cover", borderRadius: "inherit", display: "block" }} />
                  </div>
                  <div className="card-body" style={{ padding: "0 0.5rem 0.5rem" }}>
                    <div className="card-meta">
                      <span className="day">{b.day}</span>
                      <span className="sep"></span>
                      <span className="date">{b.date}</span>
                    </div>
                    <h3 className="card-title">{b.battleType}</h3>
                    <div className="flex justify-between items-center">
                      <span className="card-time">{b.time}</span>
                      <div
                        className="download-btn"
                        onClick={() => downloadBattleImage(b.flyerUrl!, b.battleType)}
                        title="Download poster"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M12 15V3" />
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <path d="m7 10 5 5 5-5" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
