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

/* ─── SVG Contemporary Editorial Mask (Pill / Stadium Shape) ─── */
const EditorialMask = ({ hovered }: { hovered: boolean }) => {
  const accentColor = hovered ? "#111111" : "#D1C8BC";
  const bgColor = "#FDFBF7"; // Matches the main section background exactly

  return (
    <svg
      viewBox="0 0 300 460"
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
      {/* Solid background mask with a counter-clockwise pill hole.
        Outer: Clockwise rect. Inner: Counter-clockwise pill.
      */}
      <path
        d="
          M 0 0 L 300 0 L 300 460 L 0 460 Z
          M 260 150
          A 110 110 0 0 0 40 150
          L 40 310
          A 110 110 0 0 0 260 310
          Z
        "
        fill={bgColor}
        vectorEffect="non-scaling-stroke"
      />

      {/* Delicate structural outline tracking the hole */}
      <path
        d="
          M 260 150
          A 110 110 0 0 0 40 150
          L 40 310
          A 110 110 0 0 0 260 310
          Z
        "
        fill="none"
        stroke={accentColor}
        strokeWidth={hovered ? "1.5" : "1"}
        style={{ transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }}
        vectorEffect="non-scaling-stroke"
      />

      {/* Minimalist Editorial Grid Lines */}
      <g stroke={accentColor} strokeWidth="1" opacity={hovered ? "0.8" : "0.4"} style={{ transition: "all 0.6s ease" }}>
        {/* Top/Bottom center registration marks */}
        <line x1="150" y1="0" x2="150" y2="20" />
        <line x1="150" y1="440" x2="150" y2="460" />
        {/* Left/Right center registration marks */}
        <line x1="0" y1="230" x2="20" y2="230" />
        <line x1="280" y1="230" x2="300" y2="230" />
      </g>

      {/* Tiny corner crosshairs */}
      <g stroke={accentColor} strokeWidth="1" opacity={hovered ? "0.6" : "0.3"} style={{ transition: "all 0.6s ease" }}>
        <path d="M 35 40 L 45 40 M 40 35 L 40 45" />
        <path d="M 255 40 L 265 40 M 260 35 L 260 45" />
        <path d="M 35 420 L 45 420 M 40 415 L 40 425" />
        <path d="M 255 420 L 265 420 M 260 415 L 260 425" />
      </g>
    </svg>
  );
};

/* ─── Category Card ─── */
const CategoryCard = ({ cat, index }: { cat: typeof categories[0], index: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        height: "460px",
        cursor: "pointer",
        userSelect: "none",
        backgroundColor: "#FDFBF7", // Match section background
        overflow: "hidden",
      }}
    >
      {/* Image Layer (Sits at the very back)
        We remove the dark gradients entirely for this airy, light theme.
      */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease",
        transform: hovered ? "scale(1.12)" : "scale(1.0)",
        filter: hovered ? "brightness(0.95)" : "brightness(1.05) saturate(0.9)",
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

      {/* Solid White SVG Mask Layer covering everything except the pill shape */}
      <EditorialMask hovered={hovered} />

      {/* ─── Foreground Text Layer (Sits on top of the solid white mask) ─── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none" }}>
        
        {/* Index Number (Top Left) */}
        <div style={{
          position: "absolute",
          top: "30px",
          left: "25px",
          color: hovered ? "#111111" : "#8D837B",
          fontFamily: "var(--font-label, 'Helvetica Neue', Arial, sans-serif)",
          fontSize: "0.6rem",
          letterSpacing: "0.15em",
          fontWeight: 500,
          transition: "color 0.4s ease",
        }}>
          N° 0{index + 1}
        </div>

        {/* Subtitle (Top Center - Inside the arc of the pill) */}
        <div style={{
          position: "absolute",
          top: "60px",
          width: "100%",
          textAlign: "center",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(-10px)",
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}>
          <span style={{
            backgroundColor: "#FDFBF7", // Subtle background to ensure readability over the image
            padding: "4px 12px",
            color: "#111111",
            fontFamily: "var(--font-label, 'Helvetica Neue', Arial, sans-serif)",
            fontSize: "0.55rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            borderRadius: "20px",
          }}>
            {cat.subtitle}
          </span>
        </div>

        {/* Title (Bottom Center - Overlapping the mask and image beautifully) */}
        <div style={{
          position: "absolute",
          bottom: "40px",
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          <h3 style={{
            color: "#111111",
            fontSize: "clamp(1.6rem, 2vw, 2rem)",
            fontWeight: 400,
            fontFamily: "var(--font-display, 'Didot', 'Bodoni MT', 'Playfair Display', serif)",
            fontStyle: "italic",
            letterSpacing: "0.02em",
            margin: "0 0 16px 0",
            transform: hovered ? "translateY(-8px)" : "translateY(0)",
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}>
            {cat.name}
          </h3>

          {/* Minimalist Explore Text */}
          <div style={{
            overflow: "hidden",
            height: "20px",
            position: "relative",
          }}>
            <span style={{
              display: "block",
              color: "#111111",
              fontFamily: "var(--font-label, 'Helvetica Neue', Arial, sans-serif)",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontWeight: 600,
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}>
              Explore
            </span>
            {/* Animated Underline */}
            <div style={{
              position: "absolute",
              bottom: "0",
              left: "50%",
              width: hovered ? "100%" : "0%",
              height: "1px",
              backgroundColor: "#111111",
              transform: "translateX(-50%)",
              transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            }} />
          </div>
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

  return (
    <section style={{
      position: "relative",
      width: "100%",
      backgroundColor: "#FDFBF7", // Crisp Alabaster / Cream
      color: "#111111", // Stark Charcoal
      fontFamily: "var(--font-display, 'Didot', 'Bodoni MT', 'Playfair Display', serif)",
      padding: "100px 0",
    }}>
      <div style={{
        position: "relative",
        zIndex: 10,
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 32px",
      }}>

        {/* ── Editorial Header ── */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          
          <p style={{
            color: "#8D837B",
            fontSize: "0.7rem",
            letterSpacing: "0.4em",
            fontWeight: 500,
            textTransform: "uppercase",
            fontFamily: "var(--font-label, 'Helvetica Neue', Arial, sans-serif)",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px"
          }}>
            <span style={{ width: "30px", height: "1px", backgroundColor: "#D1C8BC" }} />
            The Curation
            <span style={{ width: "30px", height: "1px", backgroundColor: "#D1C8BC" }} />
          </p>

          <h2 style={{
            color: "#111111",
            fontSize: "clamp(2.8rem, 5vw, 4.5rem)",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            margin: "0",
            lineHeight: "1.1",
          }}>
            Modern <span style={{ fontStyle: "italic", color: "#6A5D50" }}>Heritage</span>
          </h2>

          <div style={{ 
            marginTop: "32px", 
            display: "flex", 
            justifyContent: "center" 
          }}>
            <div style={{ 
              width: "1px", 
              height: "40px", 
              backgroundColor: "#111111", 
              opacity: 0.3 
            }} />
          </div>
        </div>

        {/* ── Cards Grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: "40px 24px", // More vertical gap for an airy feel
          width: "100%",
        }}>
          {categories.map((cat, index) => (
            <CategoryCard key={cat.id} cat={cat} index={index} />
          ))}
        </div>

        {/* ── Bottom Editorial Footer ── */}
        <div style={{ 
          textAlign: "center", 
          marginTop: "100px",
          paddingTop: "40px",
          borderTop: "1px solid #EBE4DA" 
        }}>
          <p style={{
            color: "#8D837B",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "var(--font-label, 'Helvetica Neue', Arial, sans-serif)",
          }}>
            Volume I &nbsp;·&nbsp; Artisanal Craft &nbsp;·&nbsp; Fall / Winter
          </p>
        </div>
      </div>
    </section>
  );
}