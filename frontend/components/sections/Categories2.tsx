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

/* ─── SVG Boundary Door Frame (Ogee Arch with Jali & Bells) ─── */
const BoundaryDoor = ({ glowing }: { glowing: boolean }) => {
  const gId = glowing ? "gg-on" : "gg-off";
  const fId = glowing ? "gf-on" : "gf-off";
  const jaliId = glowing ? "jali-on" : "jali-off";
  const c0 = glowing ? "#ffe566" : "#7a5c10";
  const c1 = glowing ? "#FFD700" : "#C9A84C";
  const c2 = glowing ? "#fffbe0" : "#E8D5A3";
  const blur = glowing ? "3" : "0.8";

  return (
    <svg
      viewBox="0 0 300 420"
      preserveAspectRatio="none"
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
        {/* Intricate Jali (Lattice) Pattern for Spandrels */}
        <pattern id={jaliId} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 8 0 L 16 8 L 8 16 L 0 8 Z" fill="none" stroke={`url(#${gId})`} strokeWidth="0.6" opacity="0.25"/>
          <circle cx="8" cy="8" r="1.5" fill={`url(#${gId})`} opacity="0.3"/>
        </pattern>
      </defs>

      {/* Solid spandrels to mask the image */}
      <path
        d="M 0 0 L 150 0 L 150 30 C 90 100, 16 100, 16 200 L 16 0 Z"
        fill="#080500" opacity="0.95" vectorEffect="non-scaling-stroke"
      />
      <path
        d="M 300 0 L 150 0 L 150 30 C 210 100, 284 100, 284 200 L 284 0 Z"
        fill="#080500" opacity="0.95" vectorEffect="non-scaling-stroke"
      />

      {/* Jali pattern fill applied precisely over the spandrels */}
      <path
        d="M 0 0 L 150 0 L 150 30 C 90 100, 16 100, 16 200 L 16 0 Z"
        fill={`url(#${jaliId})`} vectorEffect="non-scaling-stroke"
      />
      <path
        d="M 300 0 L 150 0 L 150 30 C 210 100, 284 100, 284 200 L 284 0 Z"
        fill={`url(#${jaliId})`} vectorEffect="non-scaling-stroke"
      />

      {/* Outer absolute card boundary */}
      <rect x="2" y="2" width="296" height="416" rx="2" fill="none"
        stroke={`url(#${gId})`} strokeWidth="1.5" filter={`url(#${fId})`}
        vectorEffect="non-scaling-stroke" />

      {/* Secondary inset boundary line */}
      <rect x="10" y="10" width="280" height="400" rx="1" fill="none"
        stroke={`url(#${gId})`} strokeWidth="1" opacity="0.4"
        vectorEffect="non-scaling-stroke" />

      {/* Main Ogee Archway Opening Line */}
      <path
        d="M 16 420 L 16 200 C 16 100, 90 100, 150 30 C 210 100, 284 100, 284 200 L 284 420"
        fill="none" stroke={`url(#${gId})`} strokeWidth="3.5" filter={`url(#${fId})`}
        vectorEffect="non-scaling-stroke"
      />

      {/* Inner offset curve for 3D depth */}
      <path
        d="M 24 420 L 24 205 C 24 115, 95 115, 150 48 C 205 115, 276 115, 276 205 L 276 420"
        fill="none" stroke={`url(#${gId})`} strokeWidth="1" opacity="0.5"
        vectorEffect="non-scaling-stroke"
      />

      {/* Decorative Door Jambs / Side Pillars */}
      <rect x="2" y="200" width="14" height="220" fill={`url(#${gId})`} opacity="0.08" vectorEffect="non-scaling-stroke" />
      <rect x="284" y="200" width="14" height="220" fill={`url(#${gId})`} opacity="0.08" vectorEffect="non-scaling-stroke" />
      
      {/* Pillar details & lines */}
      <line x1="9" y1="200" x2="9" y2="420" stroke={`url(#${gId})`} strokeWidth="1" opacity="0.3" />
      <line x1="291" y1="200" x2="291" y2="420" stroke={`url(#${gId})`} strokeWidth="1" opacity="0.3" />

      {/* Pillar Capitals */}
      <rect x="12" y="195" width="20" height="5" fill="#080500" stroke={`url(#${gId})`} strokeWidth="1.5" filter={`url(#${fId})`}/>
      <rect x="268" y="195" width="20" height="5" fill="#080500" stroke={`url(#${gId})`} strokeWidth="1.5" filter={`url(#${fId})`}/>

      {/* Hanging Geometric Temple Bells inside the Spandrels */}
      <g filter={`url(#${fId})`} opacity="0.9">
        {/* Left Bell */}
        <line x1="45" y1="0" x2="45" y2="90" stroke={`url(#${gId})`} strokeWidth="1" opacity="0.6"/>
        <path d="M 35 90 L 55 90 L 50 110 L 40 110 Z" fill="none" stroke={`url(#${gId})`} strokeWidth="1.5" />
        <circle cx="45" cy="113" r="2.5" fill={`url(#${gId})`} />
        {/* Right Bell */}
        <line x1="255" y1="0" x2="255" y2="90" stroke={`url(#${gId})`} strokeWidth="1" opacity="0.6"/>
        <path d="M 245 90 L 265 90 L 260 110 L 250 110 Z" fill="none" stroke={`url(#${gId})`} strokeWidth="1.5" />
        <circle cx="255" cy="113" r="2.5" fill={`url(#${gId})`} />
      </g>

      {/* Ground Threshold */}
      <line x1="16" y1="410" x2="284" y2="410" stroke={`url(#${gId})`} strokeWidth="2" opacity="0.8" vectorEffect="non-scaling-stroke" />
      <line x1="24" y1="404" x2="276" y2="404" stroke={`url(#${gId})`} strokeWidth="1" opacity="0.4" vectorEffect="non-scaling-stroke" />

      {/* Grand Keystone Finial at Apex */}
      <g filter={`url(#${fId})`}>
        <path d="M 150 10 L 156 20 L 150 30 L 144 20 Z" fill={`url(#${gId})`} opacity="0.95" />
        <circle cx="150" cy="5" r="3.5" fill={`url(#${gId})`} />
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
      {/* Outer Glow Base */}
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
      }}>
        {/* Parallax Image */}
        <div style={{
          position: "absolute",
          inset: 0,
          transition: "transform 0.8s cubic-bezier(0.23,1,0.32,1)",
          transform: hovered ? "scale(1.12)" : "scale(1.0)",
        }}>
          <img
            src={cat.image}
            alt={cat.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              opacity: hovered ? 0.85 : 0.65,
              transition: "opacity 0.5s ease",
            }}
          />
        </div>

        {/* Gradient overlay inside the door */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.4) 38%, rgba(5,3,0,0.1) 65%, transparent 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 42%, rgba(5,3,0,0.15) 68%, rgba(0,0,0,0.2) 100%)",
          transition: "background 0.5s ease",
        }} />
      </div>

      {/* Massive Boundary Door SVG */}
      <BoundaryDoor glowing={hovered} />

      {/* Hanging Pendant Star - repositioned below the new finial */}
      <div style={{
        position: "absolute",
        top: "42px", 
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
        padding: "0 20px 32px",
        textAlign: "center",
        zIndex: 20,
      }}>
        <p style={{
          color: "#C9A84C",
          fontSize: "0.65rem",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          fontFamily: "var(--font-label, 'Cinzel', serif)",
          opacity: hovered ? 1 : 0.6,
          transition: "opacity 0.3s ease",
          marginBottom: "6px",
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

        {/* Explore Button */}
        <div style={{
          overflow: "hidden",
          maxHeight: hovered ? "56px" : "0px",
          opacity: hovered ? 1 : 0,
          marginTop: hovered ? "16px" : "0",
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
              padding: "10px 24px",
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "20px" }}>
            <div style={{ height: "1px", flex: 1, maxWidth: "180px", background: `linear-gradient(to right, transparent, ${gold})` }} />
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
              <path d="M16 2 L18 12 L28 12 L20 18 L23 28 L16 22 L9 28 L12 18 L4 12 L14 12Z" fill={gold} opacity="0.9" />
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

        {/* ── Cards Grid ── */}
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

        {/* ── Bottom Ornament ── */}
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