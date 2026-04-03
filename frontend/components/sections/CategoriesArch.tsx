"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

/* ─── SVG Arch Frame ─── */
const ArchFrame = ({ hovered }: { hovered: boolean }) => {
  const goldOuter = hovered ? "#F5E6B8" : "#C9A84C";
  const goldInner = hovered ? "#E2C46A" : "#8B6914";

  return (
    <svg
      viewBox="0 0 300 440"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 10,
        transition: "filter 0.6s ease",
        filter: hovered ? "drop-shadow(0 0 12px rgba(201,168,76,0.35))" : "none",
      }}
    >
      <defs>
        <linearGradient id="arch-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={goldInner} />
          <stop offset="30%" stopColor={goldOuter} />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="70%" stopColor={goldOuter} />
          <stop offset="100%" stopColor={goldInner} />
        </linearGradient>
        <clipPath id="arch-clip">
          <path d="M 20 440 L 20 160 Q 20 20 150 20 Q 280 20 280 160 L 280 440 Z" />
        </clipPath>
      </defs>

      {/* Outer arch border — main heavy stroke */}
      <path
        d="M 14 440 L 14 155 Q 14 10 150 10 Q 286 10 286 155 L 286 440"
        fill="none"
        stroke="url(#arch-gold)"
        strokeWidth="4"
        style={{
          transition: "stroke-width 0.6s ease",
          strokeWidth: hovered ? 5 : 4,
        }}
      />

      {/* Inner arch border — thin elegant line */}
      <path
        d="M 24 440 L 24 162 Q 24 28 150 28 Q 276 28 276 162 L 276 440"
        fill="none"
        stroke="url(#arch-gold)"
        strokeWidth="1"
        opacity="0.5"
      />

      {/* Decorative pinstripe at bottom */}
      <line x1="14" y1="438" x2="286" y2="438" stroke="url(#arch-gold)" strokeWidth="2" />
      <line x1="24" y1="434" x2="276" y2="434" stroke="url(#arch-gold)" strokeWidth="0.5" opacity="0.4" />

      {/* Top Keystone diamond */}
      <g transform="translate(150, 12)">
        <path
          d="M 0 -6 L 5 0 L 0 6 L -5 0 Z"
          fill="url(#arch-gold)"
          opacity={hovered ? 1 : 0.7}
          style={{ transition: "opacity 0.5s ease" }}
        />
      </g>

      {/* Corner filigree — bottom left */}
      <g stroke="url(#arch-gold)" fill="none" strokeWidth="1" opacity={hovered ? 0.9 : 0.5} style={{ transition: "opacity 0.5s ease" }}>
        <path d="M 18 430 C 26 430 34 422 34 414" />
        <path d="M 22 426 C 26 426 30 422 30 418" />
        <circle cx="20" cy="432" r="1.5" fill="url(#arch-gold)" />
      </g>

      {/* Corner filigree — bottom right */}
      <g stroke="url(#arch-gold)" fill="none" strokeWidth="1" opacity={hovered ? 0.9 : 0.5} style={{ transition: "opacity 0.5s ease" }}>
        <path d="M 282 430 C 274 430 266 422 266 414" />
        <path d="M 278 426 C 274 426 270 422 270 418" />
        <circle cx="280" cy="432" r="1.5" fill="url(#arch-gold)" />
      </g>

      {/* Side flourishes — left */}
      <path d="M 16 200 C 8 220 8 240 16 260" stroke="url(#arch-gold)" strokeWidth="0.8" fill="none" opacity="0.35" />

      {/* Side flourishes — right */}
      <path d="M 284 200 C 292 220 292 240 284 260" stroke="url(#arch-gold)" strokeWidth="0.8" fill="none" opacity="0.35" />
    </svg>
  );
};

/* ─── Category Card ─── */
const archMask = `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 440' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 20 440 L 20 160 Q 20 20 150 20 Q 280 20 280 160 L 280 440 Z' fill='black' /%3E%3C/svg%3E")`;

const CategoryCard = ({ cat }: { cat: (typeof categories)[0] }) => {
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
        transition:
          "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.7s ease",
        transform: hovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered
          ? "0 30px 60px rgba(0,0,0,0.8), 0 0 50px rgba(201,168,76,0.18)"
          : "0 12px 30px rgba(0,0,0,0.7)",
        backgroundColor: "#0A0800",
        flexShrink: 0,
      }}
    >
      {/* ── Image with arch clip ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          WebkitMaskImage: archMask,
          WebkitMaskSize: "100% 100%",
          maskImage: archMask,
          maskSize: "100% 100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transition:
              "transform 1.4s cubic-bezier(0.25, 1, 0.5, 1), filter 0.8s ease",
            transform: hovered ? "scale(1.12)" : "scale(1.0)",
            filter: hovered
              ? "brightness(0.85) contrast(1.1) saturate(1.15)"
              : "brightness(0.55) contrast(1.15) saturate(0.85) sepia(15%)",
          }}
        >
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

        {/* Vignette inside arch */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: hovered
              ? "linear-gradient(to top, rgba(10,8,0,0.95) 0%, rgba(10,8,0,0.4) 35%, transparent 70%)"
              : "linear-gradient(to top, rgba(10,8,0,0.98) 0%, rgba(10,8,0,0.55) 40%, rgba(10,8,0,0.15) 70%)",
            transition: "background 0.8s ease",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ── SVG Arch Frame ── */}
      <ArchFrame hovered={hovered} />

      {/* ── Bottom Content ── */}
      <div
        style={{
          position: "absolute",
          bottom: "28px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          textAlign: "center",
          zIndex: 20,
        }}
      >
        <p
          style={{
            color: "#C9A84C",
            fontSize: "0.55rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            margin: "0 0 8px 0",
            opacity: hovered ? 1 : 0.7,
            transition: "opacity 0.4s ease",
          }}
        >
          {cat.subtitle}
        </p>

        {/* Gold divider */}
        <div
          style={{
            width: hovered ? 50 : 30,
            height: 1,
            background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
            margin: "0 auto 10px",
            transition: "width 0.5s ease",
          }}
        />

        <h3
          style={{
            color: "#FAF5E9",
            fontSize: "clamp(1.2rem, 1.5vw, 1.65rem)",
            fontWeight: 400,
            fontFamily: "'Playfair Display', Georgia, serif",
            letterSpacing: "0.04em",
            margin: 0,
            textShadow: "0 2px 10px rgba(0,0,0,0.9)",
          }}
        >
          {cat.name}
        </h3>

        {/* Hover-reveal CTA */}
        <div
          style={{
            overflow: "hidden",
            maxHeight: hovered ? "40px" : "0px",
            opacity: hovered ? 1 : 0,
            marginTop: hovered ? "14px" : "0",
            transition:
              "max-height 0.5s ease, opacity 0.4s ease, margin-top 0.4s ease",
          }}
        >
          <span
            style={{
              display: "inline-block",
              color: "#C9A84C",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.55rem",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              borderBottom: "1px solid rgba(201,168,76,0.5)",
              paddingBottom: "3px",
            }}
          >
            Explore Collection
          </span>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Section ─── */
export default function ArchCategoryShowcase() {
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
    <section
      id="collections"
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#0A0800",
        color: "#FFFFFF",
        fontFamily: "'Playfair Display', Georgia, serif",
        padding: "100px 0 120px 0",
        overflow: "hidden",
      }}
    >
      {/* Subtle background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.07,
          backgroundImage: `radial-gradient(ellipse at center, rgba(201,168,76,0.1) 0%, transparent 60%)`,
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 32px",
        }}
      >
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: "72px" }}
        >
          {/* Arch icon */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <svg width="50" height="32" viewBox="0 0 50 32" fill="none">
              <path
                d="M 5 32 L 5 16 Q 5 2 25 2 Q 45 2 45 16 L 45 32"
                stroke="#C9A84C"
                strokeWidth="1.5"
                fill="none"
                opacity="0.7"
              />
              <path
                d="M 10 32 L 10 18 Q 10 6 25 6 Q 40 6 40 18 L 40 32"
                stroke="#C9A84C"
                strokeWidth="0.8"
                fill="none"
                opacity="0.35"
              />
              <path d="M 25 2 L 27 5 L 25 8 L 23 5 Z" fill="#C9A84C" opacity="0.6" />
            </svg>
          </div>

          <h2
            style={{
              color: "#FAF5E9",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 400,
              letterSpacing: "0.04em",
              margin: "0 0 16px 0",
              textShadow:
                "0 4px 20px rgba(0,0,0,0.7), 0 0 20px rgba(201,168,76,0.1)",
            }}
          >
            The Royal{" "}
            <span style={{ color: "#C9A84C", fontStyle: "italic" }}>
              Treasury
            </span>
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "18px",
            }}
          >
            <div
              style={{
                height: "1px",
                width: "80px",
                background:
                  "linear-gradient(to right, transparent, rgba(201,168,76,0.5))",
              }}
            />
            <p
              style={{
                color: "rgba(201,168,76,0.6)",
                fontSize: "0.6rem",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                margin: 0,
              }}
            >
              Curated Masterpieces
            </p>
            <div
              style={{
                height: "1px",
                width: "80px",
                background:
                  "linear-gradient(to left, transparent, rgba(201,168,76,0.5))",
              }}
            />
          </div>
        </motion.div>

        {/* ── Card Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: "44px 36px",
            width: "100%",
          }}
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.75,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <CategoryCard cat={cat} />
            </motion.div>
          ))}
        </div>

        {/* ── Footer Ornament ── */}
        <div
          style={{
            textAlign: "center",
            marginTop: "80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <svg
            width="100"
            height="18"
            viewBox="0 0 100 18"
            fill="none"
            style={{ marginBottom: "14px" }}
          >
            <path
              d="M 0 9 Q 25 0 50 9 T 100 9"
              stroke="#C9A84C"
              strokeWidth="0.8"
              opacity="0.35"
              fill="none"
            />
            <circle cx="50" cy="9" r="2.5" fill="#C9A84C" opacity="0.6" />
            <circle cx="15" cy="9" r="1" fill="#C9A84C" opacity="0.3" />
            <circle cx="85" cy="9" r="1" fill="#C9A84C" opacity="0.3" />
          </svg>
          <p
            style={{
              color: "rgba(201,168,76,0.4)",
              fontSize: "0.5rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
            }}
          >
            Purveyors of Luxury &nbsp;·&nbsp; Exquisite Craftsmanship
            &nbsp;·&nbsp; Legacy Attire
          </p>
        </div>
      </div>
    </section>
  );
}
