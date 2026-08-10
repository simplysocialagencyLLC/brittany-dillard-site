"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header({ variant }: { variant: "home" | "contact" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const homeHref = variant === "home" ? "#home" : "/#home";
  const aboutHref = variant === "home" ? "#about" : "/#about";
  const close = () => setOpen(false);

  return (
    <>
      <header>
        <div className="glow-line"></div>
        <div className="inner">
          <nav>
            <a href={homeHref} className={variant === "home" ? "active" : ""}>Home</a>
            {variant === "contact" && <a href={aboutHref}>About</a>}
          </nav>
          <Link href="/" className="logo-wrap" aria-label="Brittany Dillard home">
            <Image
              src="/logo.png"
              alt="Brittany Dillard"
              width={500}
              height={500}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Link>
          <nav className="right">
            <Link href="/contact" className={variant === "contact" ? "active" : ""}>Contact</Link>
          </nav>
          <button className="mobile-menu" aria-label="Open menu" onClick={() => setOpen(true)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      <div id="mobile-nav" className={open ? "open" : ""}>
        <button id="mobile-nav-close" onClick={close} aria-label="Close menu">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <div className="mobile-links">
          <a href={homeHref} onClick={close} className={variant === "home" ? "active" : ""}>Home</a>
          {variant === "contact" && <a href={aboutHref} onClick={close}>About</a>}
          <Link href="/contact" className={variant === "contact" ? "active" : ""} onClick={close}>Contact</Link>
        </div>
        <div className="divider"></div>
        {variant === "home" ? (
          <Link href="/contact" className="mobile-cta" onClick={close}>Contact Us</Link>
        ) : (
          <a href="mailto:admin@brittanydillard.org" className="mobile-cta" onClick={close}>Email Us</a>
        )}
      </div>
    </>
  );
}
