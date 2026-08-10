"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const GIFTERS = [
  { rank: 1, name: "King Kaly", handle: "@king_kaly", url: "https://www.tiktok.com/@king_kaly?lang=en", img: "/gifter-king-kaly.png" },
  { rank: 2, name: "Tina Lee", handle: "@tinaleemh", url: "https://www.tiktok.com/@tinaleemh", img: "/gifter-tina-lee.png" },
  { rank: 3, name: "Kym Nicholls", handle: "@kymnicholls", url: "https://www.tiktok.com/@kymnicholls?lang=en", img: "/gifter-kym-nicholls.png" },
  { rank: 4, name: "Ava Rose", handle: "@_avarose_pooh", url: "https://www.tiktok.com/@avarose_pooh?lang=en", img: "/gifter-ava-rose.png" },
  { rank: 5, name: "Mayra Torres", handle: "@mayraa.torrescoll", url: "https://www.tiktok.com/@mayraa.torrescoll?_r=1&_t=ZT-96HPxwQur1R", img: "/gifter-mayra-torres.png" },
];

export default function TopGifters() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            wrap.querySelectorAll(".waterfall-card").forEach((card) => card.classList.add("drop-in"));
            observer.unobserve(wrap);
          }
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-dark" id="about">
      <div className="glow"></div>
      <div className="container">
        <div style={{ maxWidth: "42rem" }}>
          <div className="section-label">
            <div className="line"></div>
            <span>The Love Crew</span>
          </div>
          <h2 className="section-title">Monthly Top <span className="accent">Gifters</span>.</h2>
        </div>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", maxWidth: "36rem", marginBottom: "2.5rem", marginTop: "-0.5rem" }}>
          To join this list, you have to gift on Brittany Dillard&apos;s livestream. All your gifting is calculated each month.
        </p>
        <div className="cards-scroll scroll-hide" id="gifters-waterfall" ref={wrapRef}>
          {GIFTERS.map((g) => (
            <div className="card-gifter waterfall-card" key={g.handle}>
              <div className="card-img" style={{ position: "relative" }}>
                <Image src={g.img} alt={g.name} fill style={{ objectFit: "cover", borderRadius: "1.75rem" }} />
              </div>
              <div className="card-body">
                <div className="card-tag"><div className="line"></div><span>Top Gifter #{g.rank}</span></div>
                <h3 className="card-name">{g.name}</h3>
                <div className="card-footer">
                  <a href={g.url} target="_blank" rel="noopener noreferrer" className="card-handle">{g.handle}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
