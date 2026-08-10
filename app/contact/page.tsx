import type { Metadata } from "next";
import Header from "@/components/Header";
import ContactForm from "./ContactForm";
import ContactFooter from "./ContactFooter";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact — Brit Dillard",
};

const SERVICES = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
    title: "Media & Press",
    desc: "Interviews, features, podcast appearances, and editorial requests.",
    link: { href: "mailto:admin@brittanydillard.org", label: "Email Press Team" },
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    title: "Brand Partnerships",
    desc: "Sponsorships, product placements, and Love Crew collaborations.",
    link: { href: "mailto:admin@brittanydillard.org", label: "Start a Partnership" },
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: "Book Brittany Dillard",
    desc: "Meet & Greets, guest battles, US events, and appearances.",
    link: { href: "#form-panel", label: "Book via Contact Form" },
  },
];

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <Header variant="contact" />

      <main className={styles.main}>
        <div className={styles.contactHero}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
            <div style={{ height: "1px", width: "32px", background: "linear-gradient(to right,transparent,var(--pink))" }}></div>
            <span style={{ fontSize: "10px", letterSpacing: "0.4em", textTransform: "uppercase", fontWeight: 700, color: "var(--pink)" }}>Get in Touch</span>
            <div style={{ height: "1px", width: "32px", background: "linear-gradient(to left,transparent,var(--pink))" }}></div>
          </div>
          <h1>Reach <span className="accent">Brittany</span></h1>
          <p>For media enquiries, brand partnerships, bookings, or just a message to the Love Crew — we read everything and respond to serious enquiries within 48 hours.</p>
        </div>

        <div className={styles.contactGrid}>
          <div className={styles.infoPanel}>
            <div className={styles.infoCard}>
              <div className={styles.label}>Email</div>
              <div className={styles.value}>admin@brittanydillard.org</div>
              <div className={styles.sub}>Replies within 48 hours</div>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.label}>TikTok</div>
              <a href="https://www.tiktok.com/@britdillard?lang=en" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <div className={styles.value}>@britdillard</div>
              </a>
              <div className={styles.sub}>227.2k Love Crew</div>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.label}>Instagram</div>
              <a href="https://www.instagram.com/britdillard/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <div className={styles.value}>@britdillard</div>
              </a>
              <div className={styles.sub}>Behind the scenes</div>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.label}>Based In</div>
              <div className={styles.value}>United States</div>
              <div className={styles.sub}>Primary base</div>
            </div>
            <div className={styles.tagsSection}>
              <div className={styles.label}>Available for</div>
              <div className={styles.tagsWrap}>
                {["Live Battles", "Virtual Collabs", "Brand Deals", "Press", "Events"].map((t) => (
                  <span className={styles.tag} key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div id="form-panel">
            <ContactForm />
          </div>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem 6rem" }}>
          <div className={styles.svcGrid}>
            {SERVICES.map((s) => (
              <div className={styles.svcCard} key={s.title}>
                <div className={styles.svcIcon}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <a href={s.link.href} className={styles.svcLink}>{s.link.label} <ArrowIcon /></a>
              </div>
            ))}
          </div>
        </div>
      </main>

      <ContactFooter />
    </div>
  );
}
