"use client";

import { useState, useEffect } from "react";

const categories = [
  {
    id: 1,
    name: "Bridal Collection",
    subtitle: "Eternal Elegance",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=85",
  },
  {
    id: 2,
    name: "Sherwanis",
    subtitle: "Royal Grandeur",
    image: "https://i.pinimg.com/1200x/90/29/d8/9029d88b83c3bc133ba833f8930f1c8a.jpg",
  },
  {
    id: 3,
    name: "Sarees",
    subtitle: "Timeless Grace",
    image: "https://i.pinimg.com/736x/40/e6/1b/40e61bc7d56a9db626ec3f54fb38d768.jpg",
  },
  {
    id: 4,
    name: "Indo-Western",
    subtitle: "Modern Royalty",
    image: "https://i.pinimg.com/736x/9d/b0/8c/9db08c98ce803168e08d80b33316fed7.jpg",
  },
  {
    id: 5,
    name: "Festive Wear",
    subtitle: "Celebrate in Style",
    image: "https://i.pinimg.com/1200x/ae/7b/3a/ae7b3aa67838af01ed6d25c3c90e2d4d.jpg",
  },
  {
    id: 6,
    name: "Lehengas",
    subtitle: "Draped in Luxury",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=85",
  },
];

/* ─── SVG Mughal Arch ─── */
const MughalArch = ({ glowing }: { glowing: boolean }) => {
  const gId = glowing ? "gg-on" : "gg-off";
  const fId = glowing ? "gf-on" : "gf-off";
  const c0 = glowing ? "#ffe566" : "#7a5c10";
  const c1 = glowing ? "#FFD700" : "#C9A84C";
  const c2 = glowing ? "#fffbe0" : "#E8D5A3";
  const blur = glowing ? "2.5" : "0.6";

  return (
    <svg
      viewBox="0 0 300 420"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <defs>
        <linearGradient id={gId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={c0} />
          <stop offset="30%"  stopColor={c1} />
          <stop offset="50%"  stopColor={c2} />
          <stop offset="70%"  stopColor={c1} />
          <stop offset="100%" stopColor={c0} />
        </linearGradient>
        <filter id={fId}>
          <feGaussianBlur stdDeviation={blur} result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Outer frame */}
      <rect x="8" y="8" width="284" height="404" rx="2"
        fill="none" stroke={`url(#${gId})`} strokeWidth="3" filter={`url(#${fId})`} />
      <rect x="14" y="14" width="272" height="392" rx="2"
        fill="none" stroke={`url(#${gId})`} strokeWidth="1" opacity="0.55" />

      {/* Corner — TL */}
      <g fill={`url(#${gId})`} filter={`url(#${fId})`} opacity="0.9">
        <circle cx="22" cy="22" r="5" />
        <circle cx="36" cy="22" r="2.5" />
        <circle cx="22" cy="36" r="2.5" />
        <path d="M18 18 Q30 20 32 18 Q30 30 18 32 Q20 20 18 18Z"
          fill="none" stroke={`url(#${gId})`} strokeWidth="1.5" />
      </g>
      {/* Corner — TR */}
      <g fill={`url(#${gId})`} filter={`url(#${fId})`} opacity="0.9">
        <circle cx="278" cy="22" r="5" />
        <circle cx="264" cy="22" r="2.5" />
        <circle cx="278" cy="36" r="2.5" />
        <path d="M282 18 Q270 20 268 18 Q270 30 282 32 Q280 20 282 18Z"
          fill="none" stroke={`url(#${gId})`} strokeWidth="1.5" />
      </g>
      {/* Corner — BL */}
      <g fill={`url(#${gId})`} filter={`url(#${fId})`} opacity="0.9">
        <circle cx="22" cy="398" r="5" />
        <circle cx="36" cy="398" r="2.5" />
        <circle cx="22" cy="384" r="2.5" />
      </g>
      {/* Corner — BR */}
      <g fill={`url(#${gId})`} filter={`url(#${fId})`} opacity="0.9">
        <circle cx="278" cy="398" r="5" />
        <circle cx="264" cy="398" r="2.5" />
        <circle cx="278" cy="384" r="2.5" />
      </g>

      {/* Mughal arch outer */}
      <path d="M 30 200 L 30 118 Q 30 28 150 28 Q 270 28 270 118 L 270 200"
        fill="none" stroke={`url(#${gId})`} strokeWidth="3.5" filter={`url(#${fId})`} />
      {/* Mughal arch inner */}
      <path d="M 44 200 L 44 124 Q 44 50 150 50 Q 256 50 256 124 L 256 200"
        fill="none" stroke={`url(#${gId})`} strokeWidth="1.2" opacity="0.5" />

      {/* Keystone */}
      <g filter={`url(#${fId})`}>
        <path d="M 136 30 Q 150 18 164 30 Q 157 50 150 54 Q 143 50 136 30Z"
          fill={`url(#${gId})`} opacity="0.9" />
        <circle cx="150" cy="30" r="4" fill={`url(#${gId})`} />
      </g>

      {/* Pillar florals */}
      <g fill="none" stroke={`url(#${gId})`} strokeWidth="1.2" opacity="0.65" filter={`url(#${fId})`}>
        <circle cx="30" cy="215" r="7" /><circle cx="30" cy="215" r="4" />
        <line x1="30" y1="206" x2="30" y2="196" />
        <line x1="22" y1="211" x2="13" y2="207" />
        <line x1="38" y1="211" x2="47" y2="207" />
      </g>
      <g fill="none" stroke={`url(#${gId})`} strokeWidth="1.2" opacity="0.65" filter={`url(#${fId})`}>
        <circle cx="270" cy="215" r="7" /><circle cx="270" cy="215" r="4" />
        <line x1="270" y1="206" x2="270" y2="196" />
        <line x1="262" y1="211" x2="253" y2="207" />
        <line x1="278" y1="211" x2="287" y2="207" />
      </g>

      {/* Side panel accents */}
      <g fill="none" stroke={`url(#${gId})`} strokeWidth="0.8" opacity="0.38">
        <rect x="18" y="232" width="16" height="20" rx="8" />
        <rect x="18" y="260" width="16" height="20" rx="8" />
        <rect x="18" y="288" width="16" height="20" rx="8" />
        <rect x="18" y="316" width="16" height="20" rx="8" />
      </g>
      <g fill="none" stroke={`url(#${gId})`} strokeWidth="0.8" opacity="0.38">
        <rect x="266" y="232" width="16" height="20" rx="8" />
        <rect x="266" y="260" width="16" height="20" rx="8" />
        <rect x="266" y="288" width="16" height="20" rx="8" />
        <rect x="266" y="316" width="16" height="20" rx="8" />
      </g>

      {/* Bottom band */}
      <line x1="20" y1="366" x2="280" y2="366"
        stroke={`url(#${gId})`} strokeWidth="1" opacity="0.5" />
      <g fill={`url(#${gId})`} opacity="0.6">
        <polygon points="90,366 95,358 100,366 95,374" />
        <polygon points="148,366 153,358 158,366 153,374" />
        <polygon points="206,366 211,358 216,366 211,374" />
      </g>

      {/* Door handle */}
      <g filter={`url(#${fId})`}>
        <circle cx="150" cy="306" r="6" fill={`url(#${gId})`} />
        <circle cx="150" cy="306" r="3.5" fill="none" stroke={`url(#${gId})`} strokeWidth="1" />
      </g>

      {/* Top frieze */}
      <g fill="none" stroke={`url(#${gId})`} strokeWidth="0.7" opacity="0.4">
        <path d="M 56 84 Q 66 77 76 84 Q 86 77 96 84 Q 106 77 116 84" />
        <path d="M 184 84 Q 194 77 204 84 Q 214 77 224 84 Q 234 77 244 84" />
      </g>
    </svg>
  );
};

/* ─── Category Card ─── */
const CategoryCard = ({ cat }: { cat: typeof categories[0] }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        height: "420px",
        cursor: "pointer",
        userSelect: "none",
        transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
        transform: hovered ? "translateY(-7px) scale(1.013)" : "translateY(0) scale(1)",
        flexShrink: 0,
      }}
    >
      {/* Glow ring */}
      <div style={{
        position: "absolute",
        inset: 0,
        borderRadius: "2px",
        pointerEvents: "none",
        zIndex: 1,
        transition: "box-shadow 0.5s ease",
        boxShadow: hovered
          ? "0 0 48px rgba(201,168,76,0.5), 0 0 96px rgba(201,168,76,0.18), 0 18px 50px rgba(0,0,0,0.85)"
          : "0 0 14px rgba(201,168,76,0.07), 0 8px 28px rgba(0,0,0,0.6)",
      }} />

      {/* Card shell */}
      <div style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "#0d0a02",
        border: "1px solid rgba(201,168,76,0.13)",
      }}>
        {/* Image */}
        <div style={{
          position: "absolute",
          inset: 0,
          transition: "transform 0.7s cubic-bezier(0.23,1,0.32,1)",
          transform: hovered ? "scale(1.08)" : "scale(1.0)",
        }}>
          <img
            src={cat.image}
            alt={cat.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              opacity: hovered ? 0.8 : 0.6,
              transition: "opacity 0.5s ease",
            }}
          />
        </div>

        {/* Gradient overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.5) 38%, rgba(5,3,0,0.15) 65%, rgba(0,0,0,0.25) 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.38) 42%, rgba(5,3,0,0.1) 68%, rgba(0,0,0,0.3) 100%)",
          transition: "background 0.5s ease",
        }} />

        {/* Shimmer sweep */}
        {hovered && (
          <div style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(110deg, transparent 25%, rgba(232,213,163,0.07) 50%, transparent 75%)",
            pointerEvents: "none",
          }} />
        )}
      </div>

      {/* SVG arch */}
      <MughalArch glowing={hovered} />

      {/* Top star */}
      <div style={{
        position: "absolute",
        top: "20px",
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex: 20,
      }}>
        <span style={{
          color: "#C9A84C",
          fontSize: "0.6rem",
          opacity: hovered ? 0.95 : 0.35,
          transition: "opacity 0.4s ease, text-shadow 0.4s ease",
          textShadow: hovered ? "0 0 14px rgba(201,168,76,0.95)" : "none",
        }}>✦</span>
      </div>

      {/* Bottom text */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "0 20px 24px",
        textAlign: "center",
        zIndex: 20,
      }}>
        <p style={{
          color: "#C9A84C",
          fontSize: "0.6rem",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          fontFamily: "var(--font-label, 'Cinzel', serif)",
          opacity: hovered ? 1 : 0.6,
          transition: "opacity 0.3s ease",
          marginBottom: "4px",
        }}>
          {cat.subtitle}
        </p>

        <h3 style={{
          color: "#F5EDD6",
          fontSize: "clamp(1.1rem, 1.4vw, 1.5rem)",
          fontWeight: 300,
          fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
          letterSpacing: "0.08em",
          textShadow: hovered
            ? "0 0 28px rgba(201,168,76,0.6)"
            : "0 2px 8px rgba(0,0,0,0.9)",
          transition: "text-shadow 0.4s ease",
          margin: 0,
        }}>
          {cat.name}
        </h3>

        {/* CTA */}
        <div style={{
          overflow: "hidden",
          maxHeight: hovered ? "56px" : "0px",
          opacity: hovered ? 1 : 0,
          marginTop: hovered ? "12px" : "0",
          transition:
            "max-height 0.45s cubic-bezier(0.23,1,0.32,1), opacity 0.35s ease, margin-top 0.3s ease",
        }}>
          <button
            style={{
              background: "transparent",
              border: "1px solid #C9A84C",
              color: "#FAF5E9",
              fontFamily: "var(--font-label, 'Cinzel', serif)",
              fontSize: "0.6rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              padding: "8px 22px",
              cursor: "pointer",
              boxShadow: "0 0 18px rgba(201,168,76,0.28)",
              transition: "background 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "rgba(201,168,76,0.12)";
              el.style.boxShadow = "0 0 30px rgba(201,168,76,0.5)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "transparent";
              el.style.boxShadow = "0 0 18px rgba(201,168,76,0.28)";
            }}
          >
            Explore Collection
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Section ─── */
export default function RoyalCategoryShowcase() {
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCols(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const gold = "#C9A84C";

  return (
    <section style={{
      position: "relative",
      width: "100%",
      overflow: "hidden",
      background:
        "radial-gradient(ellipse at 50% 0%, #1c1200 0%, #0A0800 45%, #050505 100%)",
      fontFamily: "var(--font-display, 'Cormorant Garamond', Georgia, serif)",
    }}>
      {/* Grid texture */}
      <div style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: 0.05,
        backgroundImage: `
          repeating-linear-gradient(0deg,  transparent, transparent 40px, rgba(201,168,76,0.2) 40px, rgba(201,168,76,0.2) 41px),
          repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(201,168,76,0.2) 40px, rgba(201,168,76,0.2) 41px)
        `,
      }} />

      <div style={{
        position: "relative",
        zIndex: 10,
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "64px 32px 72px",
      }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "20px" }}>
            <div style={{ height: "1px", flex: 1, maxWidth: "180px", background: `linear-gradient(to right, transparent, ${gold})` }} />
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
              <path d="M16 2 L18 12 L28 12 L20 18 L23 28 L16 22 L9 28 L12 18 L4 12 L14 12Z"
                fill={gold} opacity="0.9" />
            </svg>
            <div style={{ height: "1px", flex: 1, maxWidth: "180px", background: `linear-gradient(to left, transparent, ${gold})` }} />
          </div>

          <p style={{
            color: gold,
            fontSize: "0.65rem",
            letterSpacing: "0.48em",
            textTransform: "uppercase",
            fontFamily: "var(--font-label, 'Cinzel', serif)",
            marginBottom: "12px",
          }}>
            The House of Elegance
          </p>

          <h2 style={{
            color: "#F5E6B8",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 300,
            fontFamily: "var(--font-display, 'Cormorant Garamond', serif)",
            letterSpacing: "0.07em",
            textShadow: "0 0 50px rgba(201,168,76,0.22), 0 2px 4px rgba(0,0,0,0.85)",
            margin: 0,
          }}>
            Explore Our Collections
          </h2>

          <p style={{
            color: gold,
            fontSize: "0.7rem",
            letterSpacing: "0.32em",
            fontFamily: "var(--font-label, 'Cinzel', serif)",
            opacity: 0.5,
            marginTop: "12px",
          }}>
            ✦ &nbsp; Crafted for the Connoisseur &nbsp; ✦
          </p>
        </div>

        {/* ── Cards grid — pure CSS grid via inline style ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: "28px",
          width: "100%",
        }}>
          {categories.map((cat) => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
        </div>

        {/* ── Bottom ornament ── */}
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "16px",
          }}>
            <div style={{ height: "1px", flex: 1, maxWidth: "220px", background: `linear-gradient(to right, transparent, ${gold})` }} />
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {[5, 8, 5].map((s, i) => (
                <div key={i} style={{
                  width: s, height: s,
                  background: gold,
                  transform: "rotate(45deg)",
                }} />
              ))}
            </div>
            <div style={{ height: "1px", flex: 1, maxWidth: "220px", background: `linear-gradient(to left, transparent, ${gold})` }} />
          </div>
          <p style={{
            color: gold,
            fontSize: "0.6rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            fontFamily: "var(--font-label, 'Cinzel', serif)",
            opacity: 0.42,
          }}>
            Est. Since the Mughal Era &nbsp;·&nbsp; Crafted with Devotion
          </p>
        </div>
      </div>
    </section>
  );
}