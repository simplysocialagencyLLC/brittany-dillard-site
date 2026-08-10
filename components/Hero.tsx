"use client";

import Image from "next/image";
import { useBattleModal } from "./BattleModalProvider";

export default function Hero() {
  const { openModal } = useBattleModal();

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <Image
          src="/hero-bg.svg"
          alt="Hero Background"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <div className="hero-overlay"></div>
      <div className="hero-overlay-bottom"></div>
      <div className="hero-overlay-top"></div>
      <div className="hero-accent-line"></div>

      <div className="hero-content">
        <div style={{ maxWidth: "56rem" }}>
          <div className="hero-eyebrow">
            <div className="line"></div>
            <span>The Queen</span>
            <div className="line" style={{ background: "linear-gradient(to left,transparent,var(--pink))" }}></div>
          </div>
          <h1>Brittany <span className="accent">Dillard</span></h1>
          <div className="hero-divider"></div>
          <div style={{ marginTop: "2.5rem" }}>
            <button className="btn-pink" onClick={openModal} style={{ cursor: "pointer" }}>
              <span>Join my Box Battle</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <div>
              <div className="hero-stat-value">238.2k</div>
              <div className="hero-stat-label">Love Crew</div>
            </div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-divider"></div>
            <div>
              <div className="hero-stat-value">628.7K</div>
              <div className="hero-stat-label">Tiktok Likes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
