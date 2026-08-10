import Image from "next/image";
import Link from "next/link";
import styles from "./contact.module.css";

export default function ContactFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <Link href="/" aria-label="Home">
            <Image src="/logo.png" alt="Brittany Dillard" width={64} height={64} className={styles.footerLogoImg} style={{ height: "64px", width: "auto", objectFit: "contain" }} />
          </Link>
          <div className={styles.footerSocial}>
            <a href="https://www.instagram.com/britdillard/" target="_blank" rel="noopener noreferrer" title="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="https://www.tiktok.com/@britdillard?lang=en" target="_blank" rel="noopener noreferrer" title="TikTok">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.89 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.14 15.7 6.34 6.34 0 0 0 9.48 22a6.34 6.34 0 0 0 6.34-6.34V9.19a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.62z" />
              </svg>
            </a>
            <a href="mailto:admin@brittanydillard.org" title="Email">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>
        </div>
        <div className={styles.footerBottomRow}>
          <p className={styles.copy}>© 2026 Brittany Dillard Official. All Rights Reserved.</p>
          <div className={styles.footerLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
          <p className={styles.built}>Home of the Love Crew</p>
        </div>
      </div>
    </footer>
  );
}
