export default function GravitasQ() {
  return (
    <section className="section-dark" style={{ background: "#050505" }}>
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem" }}>
        <div className="flex items-center justify-center gap-4 mb-8">
          <div style={{ height: "1px", width: "40px", background: "rgba(236,72,153,0.5)" }}></div>
          <span style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: "var(--pink)" }}>Official Partnerships</span>
          <div style={{ height: "1px", width: "40px", background: "rgba(236,72,153,0.5)" }}></div>
        </div>
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 900, color: "var(--white)", textAlign: "center", fontSize: "clamp(2.5rem,5vw,4rem)", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
          Join{" "}
          <span style={{ background: "linear-gradient(90deg,var(--pink),var(--pink-light),var(--pink))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Gravitas Q
          </span>
        </h2>
        <p className="text-center mx-auto max-w-xl mb-16" style={{ color: "var(--white)", fontSize: "15px", lineHeight: 1.6 }}>
          Join Gravitas Q Agency to make sure your account is protected and you have the support to thrive as a TikTok Live Host.
        </p>

        <div className="grid-2" style={{ gap: "2rem", maxWidth: "52rem", margin: "0 auto", alignItems: "start" }}>
          <a href="https://www.tiktok.com/t/ZMh8gbmvG/" target="_blank" rel="noopener noreferrer" className="agency-card">
            <h3>Gravitas Q</h3>
            <p>Join Gravitas Q Agency which spans to US - Canada - Ireland - UK - New Zealand - Australia. Thrive as a LIVE Host with Gravitas Q.</p>
            <div className="check-list">
              <div className="check-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21.801 10A10 10 0 1 1 17 3.335" /><path d="m9 11 3 3L22 4" /></svg>
                <span>UK Based Agency</span>
              </div>
              <div className="check-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21.801 10A10 10 0 1 1 17 3.335" /><path d="m9 11 3 3L22 4" /></svg>
                <span>Agency Battles Monthly</span>
              </div>
              <div className="check-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21.801 10A10 10 0 1 1 17 3.335" /><path d="m9 11 3 3L22 4" /></svg>
                <span>Teaching and Coaching available</span>
              </div>
            </div>
            <div className="cta-btn">Join Agency</div>
          </a>
          <div className="agency-card" style={{ minHeight: "400px", padding: 0, overflow: "hidden" }}>
            <video controls playsInline style={{ width: "100%", height: "100%", minHeight: "400px", objectFit: "cover", display: "block", borderRadius: "1.5rem" }}>
              <source src="/gravitas-q.mov" type="video/quicktime" />
              <source src="/gravitas-q.mov" type="video/mp4" />
              Your browser does not support this video.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
