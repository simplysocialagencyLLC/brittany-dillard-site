export default function HowToJoinBoxBattle() {
  return (
    <section className="section-dark" style={{ background: "#07080E" }}>
      <div className="container">
        <div className="grid-2 grid-2-lg" style={{ gap: "4rem", alignItems: "center" }}>
          <div>
            <div className="section-label"><div className="line"></div><span>Daily Box Battles</span></div>
            <h2 style={{ fontFamily: "var(--serif)", fontWeight: 900, color: "var(--white)", fontSize: "clamp(1.8rem,4vw,3rem)", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "3rem" }}>
              How to Join the{" "}
              <span style={{ background: "linear-gradient(90deg,var(--pink),var(--pink-light),var(--pink))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Love Box
              </span>{" "}
              Box Battles
            </h2>
            <div className="flex flex-col gap-6">
              <div className="how-step">
                <div className="how-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 7v14" />
                    <path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
                    <path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5" />
                    <rect x="3" y="7" width="18" height="4" rx="1" />
                  </svg>
                </div>
                <div className="how-text"><h3>1. Gifting Anybody</h3><p>Support the host or the guests during the live session.</p></div>
              </div>
              <div className="how-step">
                <div className="how-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <div className="how-text"><h3>2. Double Tap</h3><p>Achieve 5K likes and above to show your support.</p></div>
              </div>
              <div className="how-step">
                <div className="how-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="m10 9-3 3 3 3" />
                    <path d="m14 15 3-3-3-3" />
                    <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                  </svg>
                </div>
                <div className="how-text"><h3>3. Message Top Gifters</h3><p>Reach out to my top gifters for replacement opportunities.</p></div>
              </div>
            </div>
          </div>
          <div>
            <div style={{ position: "relative", aspectRatio: "4/5", maxWidth: "420px", margin: "0 auto", borderRadius: "2rem", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 30px 60px rgba(0,0,0,0.4)" }}>
              <video controls playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: "2rem" }}>
                <source src="/box-battle-info.mov" type="video/quicktime" />
                <source src="/box-battle-info.mov" type="video/mp4" />
                Your browser does not support this video.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
