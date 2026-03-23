"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const categories = [
  {
    id: 1,
    name: "Rajputi Sarees",
    subtitle: "Eternal Elegance",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&q=85",
  },
  {
    id: 2,
    name: "Rajputi Poshak",
    subtitle: "Royal Grandeur",
    image: "https://i.pinimg.com/1200x/59/af/32/59af328e444197968994c7b240b5b389.jpg",
  },
  {
    id: 3,
    name: "Lehengas",
    subtitle: "Timeless Grace",
    image: "https://i.pinimg.com/736x/40/e6/1b/40e61bc7d56a9db626ec3f54fb38d768.jpg",
  },
  {
    id: 4,
    name: "Sarees and Blouses",
    subtitle: "Modern Royalty",
    image: "https://i.pinimg.com/736x/9d/b0/8c/9db08c98ce803168e08d80b33316fed7.jpg",
  },
  {
    id: 5,
    name: "Kurta",
    subtitle: "Celebrate in Style",
    image: "https://i.pinimg.com/1200x/ae/7b/3a/ae7b3aa67838af01ed6d25c3c90e2d4d.jpg",
  },
  {
    id: 6,
    name: "Shirts",
    subtitle: "Draped in Luxury",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=85",
  },
];

/* ─── SVG Royal Palace Frame ─── */
const RoyalFrame = ({ hovered }: { hovered: boolean }) => {
  const goldLight = hovered ? "#FFF0B3" : "#FCE08B";
  const goldMid = hovered ? "#D4AF37" : "#C5A028";
  const goldDark = hovered ? "#996515" : "#7A4B0A";

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
        <linearGradient id="royal-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={goldDark} />
          <stop offset="25%" stopColor={goldLight} />
          <stop offset="50%" stopColor={goldMid} />
          <stop offset="75%" stopColor={goldLight} />
          <stop offset="100%" stopColor={goldDark} />
        </linearGradient>
        <filter id="gold-glow">
          <feGaussianBlur stdDeviation={hovered ? "3" : "1.5"} result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="drop-shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.8" />
        </filter>
      </defs>

      {/* Heavy Outer Gold Bevel */}
      <rect x="4" y="4" width="292" height="412" fill="none" stroke="url(#royal-gold)" strokeWidth="6" filter="url(#drop-shadow)" />
      <rect x="8" y="8" width="284" height="404" fill="none" stroke="#3A0811" strokeWidth="2" />
      <rect x="12" y="12" width="276" height="396" fill="none" stroke="url(#royal-gold)" strokeWidth="1.5" />

      {/* Inner Elegant Pinstripe */}
      <rect x="24" y="24" width="252" height="372" fill="none" stroke="url(#royal-gold)" strokeWidth="0.75" opacity="0.6" />

      {/* Ornate Corner Flourishes */}
      <g stroke="url(#royal-gold)" fill="none" strokeWidth="1.5" filter="url(#gold-glow)">
        {/* Top Left */}
        <path d="M 12 36 C 24 36 36 24 36 12" />
        <path d="M 24 36 C 24 30 30 24 36 24" />
        <circle cx="18" cy="18" r="2.5" fill="url(#royal-gold)" />

        {/* Top Right */}
        <path d="M 288 36 C 276 36 264 24 264 12" />
        <path d="M 276 36 C 276 30 270 24 264 24" />
        <circle cx="282" cy="18" r="2.5" fill="url(#royal-gold)" />

        {/* Bottom Left */}
        <path d="M 12 384 C 24 384 36 396 36 408" />
        <path d="M 24 384 C 24 390 30 396 36 396" />
        <circle cx="18" cy="402" r="2.5" fill="url(#royal-gold)" />

        {/* Bottom Right */}
        <path d="M 288 384 C 276 384 264 396 264 408" />
        <path d="M 276 384 C 276 390 270 396 264 396" />
        <circle cx="282" cy="402" r="2.5" fill="url(#royal-gold)" />
      </g>

      {/* Top Royal Crest / Crown Motif */}
      <g transform="translate(150, 22)" filter="url(#gold-glow)">
        <path d="M 0 -8 C 6 -3 10 -4 14 -12 C 10 2 4 4 0 4 C -4 4 -10 2 -14 -12 C -10 -4 -6 -3 0 -8 Z" fill="url(#royal-gold)" />
        <circle cx="0" cy="-14" r="2" fill="url(#royal-gold)" />
        <circle cx="-14" cy="-14" r="1.5" fill="url(#royal-gold)" />
        <circle cx="14" cy="-14" r="1.5" fill="url(#royal-gold)" />
        <path d="M -8 8 L 8 8 M -4 11 L 4 11" stroke="url(#royal-gold)" strokeWidth="1" fill="none" />
      </g>
    </svg>
  );
};

/* ─── Category Card (Velvet & Gold) ─── */
const CategoryCard = ({ cat }: { cat: typeof categories[0] }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        height: "440px",
        cursor: "pointer",
        userSelect: "none",
        transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s ease",
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? "0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(212,175,55,0.25)"
          : "0 15px 35px rgba(0,0,0,0.9)",
        backgroundColor: "#1C0509", // Deep Velvet Base
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* ── Image Area ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}>
        {/* The Image */}
        <div style={{
          position: "absolute",
          inset: "10px", // Sits just inside the heavy gold frame
          transition: "transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), filter 0.8s ease",
          transform: hovered ? "scale(1.1)" : "scale(1.0)",
          filter: hovered ? "brightness(1.05) contrast(1.1) saturate(1.1)" : "brightness(0.7) contrast(1.15) sepia(30%)",
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

        {/* Rich Vignette Overlay */}
        <div style={{
          position: "absolute",
          inset: "10px",
          background: hovered
            ? "radial-gradient(circle at center, transparent 30%, rgba(28,5,9,0.7) 100%)"
            : "radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(28,5,9,0.9) 100%)",
          transition: "background 0.8s ease",
          pointerEvents: "none",
        }} />
      </div>

      {/* ── SVG Royal Frame Overlay ── */}
      <RoyalFrame hovered={hovered} />

      {/* ── Bottom Content Plaque ── */}
      <div style={{
        position: "absolute",
        bottom: "32px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "85%",
        background: "linear-gradient(145deg, #3A0811, #1C0509)", // Rich Velvet Plaque
        border: "1px solid #D4AF37",
        boxShadow: "0 10px 25px rgba(0,0,0,0.9), inset 0 0 15px rgba(0,0,0,0.8)",
        padding: "16px 20px",
        textAlign: "center",
        zIndex: 20,
        transition: "width 0.5s ease, padding 0.5s ease",
      }}>
        {/* Inner Plaque Border */}
        <div style={{
          position: "absolute",
          inset: "4px",
          border: "1px solid rgba(212,175,55,0.3)",
          pointerEvents: "none",
        }} />

        <p style={{
          color: "#D4AF37",
          fontSize: "0.6rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          fontFamily: "var(--font-label, 'Cinzel', serif)",
          margin: "0 0 6px 0",
          opacity: hovered ? 1 : 0.8,
        }}>
          {cat.subtitle}
        </p>

        <h3 style={{
          color: "#FFF5E1",
          fontSize: "clamp(1.2rem, 1.5vw, 1.6rem)",
          fontWeight: 400,
          fontFamily: "var(--font-display, 'Cormorant Garamond', Georgia, serif)",
          letterSpacing: "0.05em",
          margin: 0,
          textShadow: "0 2px 4px rgba(0,0,0,0.8)",
        }}>
          {cat.name}
        </h3>

        {/* Explore Reveal */}
        <div style={{
          overflow: "hidden",
          maxHeight: hovered ? "40px" : "0px",
          opacity: hovered ? 1 : 0,
          marginTop: hovered ? "12px" : "0",
          transition: "max-height 0.5s ease, opacity 0.4s ease, margin-top 0.4s ease",
        }}>
          <span style={{
            display: "inline-block",
            color: "#D4AF37",
            fontFamily: "var(--font-label, 'Cinzel', serif)",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            borderBottom: "1px solid #D4AF37",
            paddingBottom: "2px",
          }}>
            Enter Treasury
          </span>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Section ─── */
export default function RoyalCategoryShowcase() {
  const [colsWomens, setColsWomens] = useState(4);
  const [colsMens, setColsMens] = useState(2);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setColsWomens(w < 640 ? 1 : w < 1024 ? 2 : 4);
      setColsMens(w < 640 ? 1 : 2);
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
      backgroundColor: "#120204", // Deepest Mahogany/Black
      color: "#FFFFFF",
      fontFamily: "var(--font-display, 'Cormorant Garamond', Georgia, serif)",
      padding: "100px 0 120px 0",
      overflow: "hidden",
    }}>
      {/* ── Velvet Damask Pattern Background ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: 0.15,
        backgroundImage: `radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, transparent 60%), 
          repeating-linear-gradient(45deg, #1C0509 0px, #1C0509 2px, transparent 2px, transparent 8px),
          repeating-linear-gradient(-45deg, #1C0509 0px, #1C0509 2px, transparent 2px, transparent 8px)`,
        zIndex: 0,
      }} />

      <div style={{
        position: "relative",
        zIndex: 10,
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 32px",
      }}>

        {/* ── Royal Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >

          {/* Top Crown Accent */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
            <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
              <path d="M 30 2 L 20 18 L 30 12 L 40 18 Z" fill={gold} opacity="0.9" />
              <path d="M 10 10 L 15 22 L 5 22 Z" fill={gold} opacity="0.6" />
              <path d="M 50 10 L 45 22 L 55 22 Z" fill={gold} opacity="0.6" />
              <line x1="5" y1="28" x2="55" y2="28" stroke={gold} strokeWidth="1.5" opacity="0.8" />
            </svg>
          </div>

          <h2 style={{
            color: "#FFF5E1",
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 400,
            letterSpacing: "0.05em",
            margin: "0 0 16px 0",
            textTransform: "uppercase",
            textShadow: "0 4px 20px rgba(0,0,0,0.8), 0 0 30px rgba(212,175,55,0.2)",
          }}>
            The Royal <span style={{ color: gold, fontStyle: "italic" }}>Treasury</span>
          </h2>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}>
            <div style={{ height: "1px", width: "80px", background: `linear-gradient(to right, transparent, ${gold})` }} />
            <p style={{
              color: gold,
              fontSize: "0.75rem",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              fontFamily: "var(--font-label, 'Cinzel', serif)",
              margin: 0,
            }}>
              Curated Masterpieces
            </p>
            <div style={{ height: "1px", width: "80px", background: `linear-gradient(to left, transparent, ${gold})` }} />
          </div>
        </motion.div>

        {/* ── Women's Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ textAlign: "center", marginBottom: "32px" }}
        >
          <h3 style={{
            color: "#D4AF37",
            fontSize: "1.1rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontFamily: "var(--font-label, 'Cinzel', serif)",
            margin: 0
          }}>
            Women's Collection
          </h3>
          <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, #D4AF37, transparent)", margin: "12px auto 0" }} />
        </motion.div>

        {/* ── Women's Cards Grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${colsWomens}, 1fr)`,
          gap: "40px 32px",
          width: "100%",
          marginBottom: "64px",
        }}>
          {categories.slice(0, 4).map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <CategoryCard cat={cat} />
            </motion.div>
          ))}
        </div>

        {/* ── Men's Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ textAlign: "center", marginBottom: "32px" }}
        >
          <h3 style={{
            color: "#D4AF37",
            fontSize: "1.1rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontFamily: "var(--font-label, 'Cinzel', serif)",
            margin: 0
          }}>
            Men's Collection
          </h3>
          <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, #D4AF37, transparent)", margin: "12px auto 0" }} />
        </motion.div>

        {/* ── Men's Cards Grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${colsMens}, 1fr)`,
          gap: "40px 32px",
          width: colsMens === 2 && colsWomens === 4 ? "calc(50% - 16px)" : "100%",
          margin: "0 auto",
        }}>
          {categories.slice(4, 6).map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <CategoryCard cat={cat} />
            </motion.div>
          ))}
        </div>

        {/* ── Ornate Footer ── */}
        <div style={{
          textAlign: "center",
          marginTop: "80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          <svg width="120" height="20" viewBox="0 0 120 20" fill="none" style={{ marginBottom: "16px" }}>
            <path d="M 0 10 Q 30 0 60 10 T 120 10" stroke={gold} strokeWidth="1" opacity="0.4" fill="none" />
            <circle cx="60" cy="10" r="3" fill={gold} opacity="0.8" />
            <circle cx="20" cy="10" r="1.5" fill={gold} opacity="0.4" />
            <circle cx="100" cy="10" r="1.5" fill={gold} opacity="0.4" />
          </svg>
          <p style={{
            color: gold,
            fontSize: "0.6rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontFamily: "var(--font-label, 'Cinzel', serif)",
            opacity: 0.6,
          }}>
            Purveyors of Luxury &nbsp;·&nbsp; Exquisite Craftsmanship &nbsp;·&nbsp; Legacy Attire
          </p>
        </div>
      </div>
    </section>
  );
}