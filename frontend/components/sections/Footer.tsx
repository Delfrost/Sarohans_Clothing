"use client";

import React, { useEffect } from "react";
import Image from "next/image";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_COLUMNS = [
  {
    heading: "About",
    links: ["Our Story", "Craftsmanship", "Heritage", "Careers"],
  },
  {
    heading: "Explore",
    links: ["New Arrivals", "Bridal Collection", "Festive Collection", "Best Sellers", "Lookbook"],
  },
  {
    heading: "Customer Care",
    links: ["Track Order", "Shipping Policy", "Returns & Exchanges", "FAQs", "Contact Us"],
  },
];

// ─── Background image from public/images ──────────────────────────────────────
const BG_IMAGE = "/images/sarohans-footer-bg.jpg";

// ─── CSS injected once into <head> via useEffect ──────────────────────────────
const FOOTER_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cinzel:wght@400;500;600&family=IM+Fell+English:ital@0;1&display=swap');

  @keyframes sf-fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .sf-footer {
    position: relative;
    overflow: hidden;
    min-height: 520px;
    background-color: #0A0806;
    font-family: 'Cormorant Garamond', Georgia, serif;
  }

  .sf-bg {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center 30%;
    filter: brightness(0.42) saturate(0.55);
    transform: scale(1.04);
  }

  .sf-overlay {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(10,8,6,0.5) 0%, rgba(10,8,6,0.80) 55%, rgba(10,8,6,0.97) 100%),
      radial-gradient(ellipse 120% 80% at 50% 100%, rgba(201,168,76,0.06) 0%, transparent 70%);
  }

  .sf-top-border {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #C9A84C 25%, #E8C97A 50%, #C9A84C 75%, transparent);
  }

  .sf-content {
    position: relative;
    z-index: 2;
    max-width: 1280px;
    margin: 0 auto;
    padding: 72px 40px 0;
  }

  .sf-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    gap: 48px 40px;
  }

  .sf-col {
    animation: sf-fadeUp 0.8s ease both;
  }
  .sf-col:nth-child(1) { animation-delay: 0.05s; }
  .sf-col:nth-child(2) { animation-delay: 0.15s; }
  .sf-col:nth-child(3) { animation-delay: 0.25s; }
  .sf-col:nth-child(4) { animation-delay: 0.35s; }

  /* Brand col */
  .sf-logo-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .sf-brand-name {
    font-family: 'Cinzel', serif;
    font-size: 1.7rem;
    font-weight: 500;
    letter-spacing: 0.22em;
    color: #E8C97A;
    text-transform: uppercase;
    line-height: 1;
  }

  .sf-tagline-rule {
    width: 44px;
    height: 1px;
    background: linear-gradient(90deg, #C9A84C, transparent);
    margin-bottom: 14px;
  }

  .sf-desc {
    font-family: 'IM Fell English', serif;
    font-style: italic;
    font-size: 0.94rem;
    line-height: 1.8;
    color: rgba(245,230,192,0.72);
    margin-bottom: 28px;
    max-width: 255px;
  }

  .sf-contacts {
    list-style: none;
    padding: 0; margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .sf-contacts li {
    display: flex;
    align-items: flex-start;
    gap: 9px;
    font-size: 0.81rem;
    letter-spacing: 0.04em;
    color: rgba(245,230,192,0.58);
    line-height: 1.55;
  }

  .sf-ci { color: #C9A84C; flex-shrink: 0; margin-top: 1px; display: flex; }

  /* Nav cols */
  .sf-col-heading {
    font-family: 'Cinzel', serif;
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.36em;
    text-transform: uppercase;
    color: #C9A84C;
    margin-bottom: 5px;
  }

  .sf-col-rule {
    width: 30px; height: 1px;
    background: #C9A84C;
    opacity: 0.55;
    margin-bottom: 20px;
  }

  .sf-links {
    list-style: none;
    padding: 0; margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .sf-link {
    text-decoration: none;
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.95rem;
    letter-spacing: 0.06em;
    color: rgba(245,230,192,0.65);
    position: relative;
    display: inline-block;
    transition: color 0.32s ease;
  }

  .sf-link::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 0;
    width: 0; height: 1px;
    background: #E8C97A;
    transition: width 0.32s ease;
  }

  .sf-link:hover { color: #E8C97A; }
  .sf-link:hover::after { width: 100%; }

  /* Divider */
  .sf-divider-wrap {
    position: relative;
    z-index: 2;
    margin: 60px 0 0;
    padding: 0 40px;
  }

  .sf-divider-inner {
    max-width: 1280px;
    margin: 0 auto;
  }

  .sf-divider-line {
    width: 100%; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201,168,76,0.35) 15%, #C9A84C 50%, rgba(201,168,76,0.35) 85%, transparent);
    position: relative;
  }

  .sf-diamond {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 7px; height: 7px;
    background: #C9A84C;
    border: 1px solid #E8C97A;
  }

  /* Bottom bar */
  .sf-bottom {
    position: relative;
    z-index: 2;
    max-width: 1280px;
    margin: 0 auto;
    padding: 22px 40px 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .sf-copy {
    font-family: 'Cinzel', serif;
    font-size: 0.72rem;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: rgba(201,168,76,0.52);
  }

  .sf-copy span { color: rgba(201,168,76,0.78); }

  .sf-socials {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .sf-social {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px; height: 35px;
    border: 1px solid rgba(201,168,76,0.28);
    border-radius: 50%;
    color: rgba(201,168,76,0.62);
    text-decoration: none;
    transition: all 0.32s ease;
    position: relative;
    overflow: hidden;
  }

  .sf-social::before {
    content: '';
    position: absolute; inset: 0;
    background: rgba(201,168,76,0.15);
    border-radius: 50%;
    transform: scale(0);
    transition: transform 0.32s ease;
  }

  .sf-social:hover {
    color: #E8C97A;
    border-color: #C9A84C;
    box-shadow: 0 0 12px rgba(201,168,76,0.18);
  }

  .sf-social:hover::before { transform: scale(1); }
  .sf-social svg { position: relative; z-index: 1; }

  /* Responsive */
  @media (max-width: 1024px) {
    .sf-grid { grid-template-columns: 1fr 1fr; gap: 44px 36px; }
  }

  @media (max-width: 640px) {
    .sf-content { padding: 48px 24px 0; }
    .sf-grid { grid-template-columns: 1fr; gap: 34px; }
    .sf-divider-wrap { padding: 0 24px; }
    .sf-desc { max-width: 100%; }
    .sf-bottom {
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 20px 24px 32px;
      gap: 14px;
    }
  }
`;

// ─── Icons ─────────────────────────────────────────────────────────────────────

const IconLocation = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
  </svg>
);

const IconPhone = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
  </svg>
);

const IconMail = () => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
  </svg>
);

const IconInstagram = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
);

const IconPinterest = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.64 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.135-1.867 3.135-4.561 0-2.386-1.715-4.054-4.163-4.054-2.836 0-4.498 2.127-4.498 4.326 0 .856.33 1.773.741 2.274a.3.3 0 01.069.286c-.076.312-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
  </svg>
);

const IconFacebook = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
  </svg>
);

const Emblem = () => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 44, height: 44 }}>
    <circle cx="24" cy="24" r="22" stroke="#C9A84C" strokeWidth="1"/>
    <circle cx="24" cy="24" r="18" stroke="#C9A84C" strokeWidth="0.5" strokeDasharray="2 3"/>
    <path d="M24 8 Q27 16 24 20 Q21 16 24 8Z" fill="#C9A84C" opacity="0.85"/>
    <path d="M24 40 Q27 32 24 28 Q21 32 24 40Z" fill="#C9A84C" opacity="0.85"/>
    <path d="M8 24 Q16 27 20 24 Q16 21 8 24Z" fill="#C9A84C" opacity="0.85"/>
    <path d="M40 24 Q32 27 28 24 Q32 21 40 24Z" fill="#C9A84C" opacity="0.85"/>
    <path d="M12.7 12.7 Q18.5 18 17.2 21.5 Q13.7 20.2 12.7 12.7Z" fill="#C9A84C" opacity="0.55"/>
    <path d="M35.3 35.3 Q29.5 30 30.8 26.5 Q34.3 27.8 35.3 35.3Z" fill="#C9A84C" opacity="0.55"/>
    <path d="M35.3 12.7 Q30 18.5 26.5 17.2 Q27.8 13.7 35.3 12.7Z" fill="#C9A84C" opacity="0.55"/>
    <path d="M12.7 35.3 Q18 29.5 21.5 30.8 Q20.2 34.3 12.7 35.3Z" fill="#C9A84C" opacity="0.55"/>
    <circle cx="24" cy="24" r="4" fill="#C9A84C"/>
    <circle cx="24" cy="24" r="2.5" fill="#0A0806"/>
  </svg>
);

// ─── Component ─────────────────────────────────────────────────────────────────

export default function SarohansFooter() {
  // Inject CSS once into <head> — avoids globals.css dependency
  useEffect(() => {
    const id = "sarohans-footer-styles";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = FOOTER_CSS;
    document.head.appendChild(style);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  return (
    <footer className="sf-footer">
      {/* Background */}
      <div className="sf-bg" style={{ backgroundImage: `url('${BG_IMAGE}')` }} />
      <div className="sf-overlay" />
      <div className="sf-top-border" />

      {/* Grid */}
      <div className="sf-content">
        <div className="sf-grid">

          {/* COL 1 — Brand */}
          <div className="sf-col">
            <div className="sf-logo-row">
              <Emblem />
              <span className="sf-brand-name">Sarohans</span>
            </div>
            <div className="sf-tagline-rule" />
            <p className="sf-desc">
              Crafting timeless ethnic wear with heritage craftsmanship and modern elegance.
            </p>
            <ul className="sf-contacts">
              <li>
                <span className="sf-ci"><IconLocation /></span>
                <span>14 Mehrauli Heritage Lane,<br />New Delhi – 110 030, India</span>
              </li>
              <li>
                <span className="sf-ci"><IconPhone /></span>
                <span>+91 98200 77341</span>
              </li>
              <li>
                <span className="sf-ci"><IconMail /></span>
                <span>care@sarohans.com</span>
              </li>
            </ul>
          </div>

          {/* COL 2–4 — Nav */}
          {NAV_COLUMNS.map((col) => (
            <div key={col.heading} className="sf-col">
              <h4 className="sf-col-heading">{col.heading}</h4>
              <div className="sf-col-rule" />
              <ul className="sf-links">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="sf-link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* Gold divider */}
      <div className="sf-divider-wrap">
        <div className="sf-divider-inner">
          <div className="sf-divider-line">
            <div className="sf-diamond" />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="sf-bottom">
        <p className="sf-copy">© 2026 <span>Sarohans</span>. All Rights Reserved.</p>
        <div className="sf-socials">
          <a href="#" aria-label="Instagram" className="sf-social"><IconInstagram /></a>
          <a href="#" aria-label="Pinterest" className="sf-social"><IconPinterest /></a>
          <a href="#" aria-label="Facebook"  className="sf-social"><IconFacebook /></a>
        </div>
      </div>
    </footer>
  );
}