"use client";

import { useRef } from "react";

function VideoCard({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };
  return (
    <div className="video-card" style={{ cursor: "pointer", position: "relative", overflow: "hidden" }} onClick={toggle}>
      <video ref={ref} src={src} preload="metadata" playsInline muted loop style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "2rem", display: "block" }} />
      <div className="video-play-btn" style={{ pointerEvents: "none" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
        </svg>
      </div>
    </div>
  );
}

export default function LiveExperiences() {
  return (
    <section className="live-section" id="gallery">
      <div className="container live-grid">
        <div className="video-pair">
          <VideoCard src="/live-video-1.mp4" />
          <VideoCard src="/live-video-2.mp4" />
        </div>
        <div className="live-text">
          <div className="label">Live Experiences</div>
          <h3>Tune In to the <span className="accent">Love Crew</span><br />Live Daily.</h3>
          <p>238.2k tune in every day. Catch the battles, the blessings, and the love of the most beloved dancing queen on TikTok.</p>
          <a href="https://www.tiktok.com/@britdillard?lang=en" target="_blank" rel="noopener noreferrer" className="btn-dark" style={{ background: "var(--pink)", boxShadow: "0 20px 40px rgba(236,72,153,0.2)" }}>
            Watch Live · 10AM US
          </a>
        </div>
      </div>
    </section>
  );
}
