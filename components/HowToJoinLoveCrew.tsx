export default function HowToJoinLoveCrew() {
  return (
    <section className="section-white" id="outreach">
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "0 1.5rem" }}>
        <div className="flex items-center justify-center gap-4 mb-8">
          <div style={{ height: "1px", width: "40px", background: "rgba(236,72,153,0.5)" }}></div>
          <span style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 900, color: "var(--pink-dark)" }}>The Love Crew</span>
          <div style={{ height: "1px", width: "40px", background: "rgba(236,72,153,0.5)" }}></div>
        </div>
        <h2 className="section-title-dark mb-6">How to Join the <span className="accent-gradient">Love Crew</span></h2>
        <p className="text-center mx-auto max-w-xl mb-16" style={{ color: "var(--gray-700)", fontSize: "15px", lineHeight: 1.6, fontWeight: 500 }}>
          There is only one way to become part of the Love Crew. It is simple, free, and open to everyone around the world.
        </p>

        <div className="grid-3" style={{ gap: "3rem" }}>
          <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-content">
              <h3>Open Your TikTok App</h3>
              <p>Go to my profile and hit the &quot;Follow&quot; button under my profile picture.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-content">
              <h3>Join The Bulletin Board</h3>
              <p>Click the link below to join Brittany Dillard&apos;s Bulletin Board. We post Live Content and updates here daily.</p>
            </div>
          </div>
          <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-content">
              <h3>Stay Notified</h3>
              <p>Hit the notification bell at the top right of my profile so you always know when we&apos;re LIVE!</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <a
            href="https://www.tiktok.com/t/ZT9LnHGS1Vx8m-eaHGx/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "12px", borderRadius: "9999px", padding: "1rem 2rem", fontSize: "13px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.12em", background: "var(--white)", border: "1px solid rgba(236,72,153,0.2)", color: "var(--pink-dark)", textDecoration: "none", boxShadow: "0 10px 30px rgba(236,72,153,0.15)", transition: "all 0.3s" }}
          >
            <span>Join the Bulletin Board</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
