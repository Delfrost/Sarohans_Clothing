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

/* ─── SVG Boundary Door Frame (Art Deco Geometric Style) ─── */
const DecoBoundaryDoor = ({ glowing }: { glowing: boolean }) => {
  const gId = glowing ? "gg-deco-on" : "gg-deco-off";
  const fId = glowing ? "gf-deco-on" : "gf-deco-off";
  const pinstripeId = glowing ? "pinstripe-on" : "pinstripe-off";
  
  const c0 = glowing ? "#FEECA9" : "#8A6A1C";
  const c1 = glowing ? "#D4AF37" : "#A68022";
  const c2 = glowing ? "#FFFFFF" : "#E8D5A3";
  const blur = glowing ? "3.5" : "1";

  // Deco Stepped Door Outline
  const doorOutline = "M 20 420 L 20 130 L 60 90 L 60 55 L 90 25 L 150 25 L 210 25 L 240 55 L 240 90 L 280 130 L 280 420";

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
          <stop offset="0%"   stopColor={c1} />
          <stop offset="25%"  stopColor={c0} />
          <stop offset="50%"  stopColor={c2} />
          <stop offset="75%"  stopColor={c0} />
          <stop offset="100%" stopColor={c1} />
        </linearGradient>
        <filter id={fId}>
          <feGaussianBlur stdDeviation={blur} result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Deco Pinstripe Pattern for Spandrels */}
        <pattern id={pinstripeId} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <line x1="4" y1="0" x2="4" y2="8" stroke={`url(#${gId})`} strokeWidth="0.8" opacity="0.15"/>
        </pattern>
      </defs>

      {/* Solid spandrels to mask the corners into a stepped geometric arch */}
      <path
        d="M 0 0 L 150 0 L 150 25 L 90 25 L 60 55 L 60 90 L 20 130 L 20 420 L 0 420 Z"
        fill="#050402" opacity="0.98" vectorEffect="non-scaling-stroke"
      />
      <path
        d="M 300 0 L 150 0 L 150 25 L 210 25 L 240 55 L 240 90 L 280 130 L 280 420 L 300 420 Z"
        fill="#050402" opacity="0.98" vectorEffect="non-scaling-stroke"
      />

      {/* Pinstripe overlay on the spandrels */}
      <path
        d="M 0 0 L 150 0 L 150 25 L 90 25 L 60 55 L 60 90 L 20 130 L 20 420 L 0 420 Z"
        fill={`url(#${pinstripeId})`} vectorEffect="non-scaling-stroke"
      />
      <path
        d="M 300 0 L 150 0 L 150 25 L 210 25 L 240 55 L 240 90 L 280 130 L 280 420 L 300 420 Z"
        fill={`url(#${pinstripeId})`} vectorEffect="non-scaling-stroke"
      />

      {/* Outer absolute card boundary - Double Line */}
      <rect x="2" y="2" width="296" height="416" fill="none"
        stroke={`url(#${gId})`} strokeWidth="1.5" filter={`url(#${fId})`}
        vectorEffect="non-scaling-stroke" />
      <rect x="8" y="8" width="284" height="404" fill="none"
        stroke={`url(#${gId})`} strokeWidth="0.75" opacity="0.6"
        vectorEffect="non-scaling-stroke" />

      {/* Deco Corner Accents */}
      <path d="M 2 16 L 16 16 L 16 2" fill="none" stroke={`url(#${gId})`} strokeWidth="2" filter={`url(#${fId})`}/>
      <path d="M 298 16 L 284 16 L 284 2" fill="none" stroke={`url(#${gId})`} strokeWidth="2" filter={`url(#${fId})`}/>
      <path d="M 2 404 L 16 404 L 16 418" fill="none" stroke={`url(#${gId})`} strokeWidth="2" filter={`url(#${fId})`}/>
      <path d="M 298 404 L 284 404 L 284 418" fill="none" stroke={`url(#${gId})`} strokeWidth="2" filter={`url(#${fId})`}/>

      {/* Stepped Door Outlines (Receding Effect) */}
      <path
        d={doorOutline}
        fill="none" stroke={`url(#${gId})`} strokeWidth="3" filter={`url(#${fId})`}
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={doorOutline}
        fill="none" stroke={`url(#${gId})`} strokeWidth="1.5" opacity="0.7"
        transform="scale(0.92, 0.95)" transform-origin="150 420"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={doorOutline}
        fill="none" stroke={`url(#${gId})`} strokeWidth="0.75" opacity="0.3"
        transform="scale(0.84, 0.90)" transform-origin="150 420"
        vectorEffect="non-scaling-stroke"
      />

      {/* Deco Center Top Finial / Diamond Motif */}
      <g filter={`url(#${fId})`}>
        <polygon points="150,5 170,18 150,45 130,18" fill={`url(#${gId})`} opacity="0.95" />
        <polygon points="150,12 162,20 150,38 138,20" fill="#050402" />
        <polygon points="150,18 155,23 150,30 145,23" fill={`url(#${gId})`} />
      </g>

      {/* Geometric Base / Threshold */}
      <rect x="20" y="408" width="260" height="4" fill={`url(#${gId})`} opacity="0.8" filter={`url(#${fId})`}/>
      <line x1="28" y1="404" x2="272" y2="404" stroke={`url(#${gId})`} strokeWidth="1" opacity="0.5" />
      <line x1="36" y1="400" x2="264" y2="400" stroke={`url(#${gId})`} strokeWidth="0.5" opacity="0.3" />
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
        transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        flexShrink: 0,
      }}
    >
      {/* Sharp Deco Shadow Box */}
      <div style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        transition: "box-shadow 0.6s ease",
        boxShadow: hovered
          ? "0 20px 40px rgba(0,0,0,0.9), 0 0 50px rgba(212,175,55,0.3)"
          : "0 10px 20px rgba(0,0,0,0.7), 0 0 10px rgba(212,175,55,0.05)",
      }} />

      {/* Card shell */}
      <div style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "#050402",
      }}>
        {/* Parallax Image with Vintage Cinematic Grading */}
        <div style={{
          position: "absolute",
          inset: 0,
          transition: "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease, opacity 0.6s ease",
          transform: hovered ? "scale(1.15)" : "scale(1.0)",
          filter: hovered ? "grayscale(0%) contrast(1.1) brightness(1.0)" : "grayscale(45%) contrast(1.2) brightness(0.7) sepia(20%)",
          opacity: hovered ? 0.9 : 0.6,
        }}>
          <img
            src={cat.image}
            alt={cat.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Stark Geometric Gradient Overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(to top, rgba(5,4,2,0.98) 0%, rgba(5,4,2,0.5) 35%, transparent 60%)"
            : "linear-gradient(to top, rgba(5,4,2,0.95) 0%, rgba(5,4,2,0.7) 40%, rgba(5,4,2,0.2) 100%)",
          transition: "background 0.6s ease",
        }} />
      </div>

      {/* Massive Boundary Deco Door SVG */}
      <DecoBoundaryDoor glowing={hovered} />

      {/* Hanging Geometric Diamond Pendant */}
      <div style={{
        position: "absolute",
        top: "48px", 
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: hovered ? 1 : 0.3,
        transition: "opacity 0.5s ease",
      }}>
        <svg width="12" height="30" viewBox="0 0 12 30">
          <polygon points="6,0 12,8 6,16 0,8" fill="#D4AF37" />
          <polygon points="6,12 10,18 6,24 2,18" fill="none" stroke="#D4AF37" strokeWidth="1" />
          <line x1="6" y1="24" x2="6" y2="30" stroke="#D4AF37" strokeWidth="1" />
        </svg>
      </div>

      {/* Bottom text */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "0 20px 36px",
        textAlign: "center",
        zIndex: 20,
      }}>
        <p style={{
          color: "#D4AF37",
          fontSize: "0.6rem",
          letterSpacing: "0.45em",
          textTransform: "uppercase",
          fontFamily: "var(--font-label, 'Arial', sans-serif)",
          fontWeight: 600,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.4s ease",
          marginBottom: "8px",
        }}>
          {cat.subtitle}
        </p>

        <h3 style={{
          color: "#FFFFFF",
          fontSize: "clamp(1.2rem, 1.5vw, 1.6rem)",
          fontWeight: 300,
          fontFamily: "var(--font-display, 'Times New Roman', serif)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          textShadow: hovered
            ? "0 0 30px rgba(212,175,55,0.7)"
            : "0 4px 12px rgba(0,0,0,1)",
          transition: "text-shadow 0.5s ease",
          margin: 0,
        }}>
          {cat.name}
        </h3>

        {/* Deco Explore Button - Sharp & Boxy */}
        <div style={{
          overflow: "hidden",
          maxHeight: hovered ? "60px" : "0px",
          opacity: hovered ? 1 : 0,
          marginTop: hovered ? "18px" : "0",
          transition:
            "max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease, margin-top 0.4s ease",
        }}>
          <button
            style={{
              background: "transparent",
              border: "1px solid #D4AF37",
              color: "#FFFFFF",
              fontFamily: "var(--font-label, 'Arial', sans-serif)",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              padding: "12px 28px",
              cursor: "pointer",
              borderRadius: "0", // Strict Deco geometric corners
              boxShadow: "0 0 20px rgba(212,175,55,0.15)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "#D4AF37";
              el.style.color = "#050402";
              el.style.boxShadow = "0 0 35px rgba(212,175,55,0.6)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "transparent";
              el.style.color = "#FFFFFF";
              el.style.boxShadow = "0 0 20px rgba(212,175,55,0.15)";
            }}
          >
            Discover
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

  const gold = "#D4AF37";

  return (
    <section style={{
      position: "relative",
      width: "100%",
      overflow: "hidden",
      backgroundColor: "#050402",
      fontFamily: "var(--font-display, 'Times New Roman', serif)",
    }}>
      {/* Deco Geometric Grid Background */}
      <div style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: 0.08,
        backgroundImage: `
          linear-gradient(to right, ${gold} 1px, transparent 1px),
          linear-gradient(to bottom, ${gold} 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        backgroundPosition: "center",
      }} />

      {/* Subtle Radial Glow in Center */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "80%",
        height: "80%",
        background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "relative",
        zIndex: 10,
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "80px 32px 90px",
      }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          
          {/* Deco Header Motif */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", marginBottom: "24px" }}>
            <div style={{ height: "1px", flex: 1, maxWidth: "150px", background: `linear-gradient(to right, transparent, ${gold})` }} />
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
              <path d="M 4 20 L 20 4 L 36 20 M 10 20 L 20 10 L 30 20 M 16 20 L 20 16 L 24 20" stroke={gold} strokeWidth="1.5" opacity="0.8" />
            </svg>
            <div style={{ height: "1px", flex: 1, maxWidth: "150px", background: `linear-gradient(to left, transparent, ${gold})` }} />
          </div>

          <p style={{
            color: gold,
            fontSize: "0.7rem",
            letterSpacing: "0.55em",
            fontWeight: 600,
            textTransform: "uppercase",
            fontFamily: "var(--font-label, 'Arial', sans-serif)",
            marginBottom: "16px",
          }}>
            Bombay Deco Glamour
          </p>

          <h2 style={{
            color: "#FFFFFF",
            fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
            fontWeight: 300,
            fontFamily: "var(--font-display, 'Times New Roman', serif)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textShadow: "0 10px 40px rgba(212,175,55,0.15), 0 2px 4px rgba(0,0,0,0.9)",
            margin: 0,
            lineHeight: "1.1",
          }}>
            The Legacy<br/>Collection
          </h2>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
            <div style={{ width: "3px", height: "30px", background: gold, opacity: 0.5 }} />
          </div>
        </div>

        {/* ── Cards Grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: "32px",
          width: "100%",
        }}>
          {categories.map((cat) => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
        </div>

        {/* ── Bottom Ornament ── */}
        <div style={{ textAlign: "center", marginTop: "80px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "20px",
          }}>
            <div style={{ height: "1px", flex: 1, maxWidth: "200px", background: `linear-gradient(to right, transparent, ${gold})` }} />
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <div style={{ width: "6px", height: "6px", background: "transparent", border: `1px solid ${gold}` }} />
              <div style={{ width: "8px", height: "8px", background: gold }} />
              <div style={{ width: "6px", height: "6px", background: "transparent", border: `1px solid ${gold}` }} />
            </div>
            <div style={{ height: "1px", flex: 1, maxWidth: "200px", background: `linear-gradient(to left, transparent, ${gold})` }} />
          </div>
          <p style={{
            color: gold,
            fontSize: "0.65rem",
            letterSpacing: "0.45em",
            fontWeight: 600,
            textTransform: "uppercase",
            fontFamily: "var(--font-label, 'Arial', sans-serif)",
            opacity: 0.5,
          }}>
            Modernity Meets Tradition &nbsp;·&nbsp; Est. 1928
          </p>
        </div>
      </div>
    </section>
  );
}