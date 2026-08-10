import Link from "next/link";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header variant="home" />
      <main
        style={{
          minHeight: "100vh",
          paddingTop: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--black)",
          textAlign: "center",
          padding: "72px 1.5rem 4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: "50%",
            borderRadius: "50%",
            filter: "blur(160px)",
            opacity: 0.35,
            background: "radial-gradient(circle, rgba(236,72,153,0.18), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", maxWidth: "36rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
            <div style={{ height: "1px", width: "32px", background: "linear-gradient(to right,transparent,var(--pink))" }} />
            <span style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 700, color: "var(--pink)" }}>
              Lost in the Arena
            </span>
            <div style={{ height: "1px", width: "32px", background: "linear-gradient(to left,transparent,var(--pink))" }} />
          </div>

          <h1
            style={{
              fontFamily: "var(--serif)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 0.9,
              fontSize: "clamp(5rem, 18vw, 10rem)",
              marginBottom: "1rem",
              background: "linear-gradient(135deg, var(--pink), var(--pink-light))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </h1>

          <p
            style={{
              fontFamily: "var(--serif)",
              fontWeight: 700,
              color: "var(--white)",
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              marginBottom: "1rem",
            }}
          >
            This page didn&apos;t make the cut.
          </p>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px", lineHeight: 1.6, marginBottom: "2.5rem" }}>
            The page you&apos;re looking for got knocked out of the box battle — check the link, or head back
            and catch what&apos;s live.
          </p>

          <Link href="/" className="btn-pink" style={{ textDecoration: "none" }}>
            <span>Back to Home</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </main>
    </>
  );
}
