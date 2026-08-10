import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <Image src="/logo.png" alt="Brittany Dillard" width={200} height={120} style={{ width: "200px", height: "120px", objectFit: "contain" }} />
            </div>
            <p className="tagline">North America&apos;s #1 Dancing LIVE Stream and Battle Platform, where everyone comes to receive and give love daily.</p>
            <div className="social-links">
              <a href="https://www.instagram.com/britdillard/" target="_blank" rel="noopener noreferrer" title="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://www.tiktok.com/@britdillard?lang=en" target="_blank" rel="noopener noreferrer" title="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.89 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.14 15.7 6.34 6.34 0 0 0 9.48 22a6.34 6.34 0 0 0 6.34-6.34V9.19a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.62z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-nav-grid">
            <div className="footer-nav">
              <h4>Explore</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Battles</a></li>
              </ul>
            </div>
            <div className="footer-nav">
              <h4>Community</h4>
              <ul></ul>
            </div>
            <div className="footer-nav">
              <h4>Direct</h4>
              <ul>
                <li><span className="email">admin@brittanydillard.org</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copy">© 2026 Brittany Dillard Official. All Rights Reserved.</p>
          <div className="links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
          <p className="built">Home of the Love Crew</p>
        </div>
      </div>
    </footer>
  );
}
