const ICONS = {
  battle: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  ),
  crown: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
      <path d="M5 21h14" />
    </svg>
  ),
  megaphone: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
      <path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" />
      <path d="M8 6v8" />
    </svg>
  ),
  tiktok: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
      <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
      <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />
      <path d="M4 22h16" />
    </svg>
  ),
};

const ITEMS: { icon?: keyof typeof ICONS; text: string; sub?: boolean }[] = [
  { icon: "battle", text: "Box Battle Platform" },
  { text: "Live Daily · 10AM US", sub: true },
  { icon: "crown", text: "238.2k Love Crew" },
  { text: "Destiny Helpers", sub: true },
  { icon: "megaphone", text: "Advertising Available" },
  { text: "Join the Battle", sub: true },
  { icon: "tiktok", text: "TikTok's #1 Dance Live" },
  { text: "Saturday Specials", sub: true },
];

export default function MarqueeBanner() {
  const items = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee-banner">
      <div className="marquee-track marquee-fast">
        {items.map((item, i) => (
          <div className="marquee-item" key={i}>
            {item.icon && <span className="icon">{ICONS[item.icon]}</span>}
            <span className={item.sub ? "text text-sub" : "text"}>{item.text}</span>
            <div className={`dot ${item.sub ? "dot-gray" : "dot-pink"}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
