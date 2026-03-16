"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

/* ─── Gold Corner Accent SVG ─── */
const CornerAccent = ({ position }: { position: "tl" | "tr" | "bl" | "br" }) => {
  const rotation =
    position === "tl" ? 0 :
      position === "tr" ? 90 :
        position === "br" ? 180 :
          270;

  return (
    <svg
      width="48" height="48" viewBox="0 0 48 48" fill="none"
      style={{
        position: "absolute",
        ...(position.includes("t") ? { top: 0 } : { bottom: 0 }),
        ...(position.includes("l") ? { left: 0 } : { right: 0 }),
        transform: `rotate(${rotation}deg)`,
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
      <path d="M 4 4 L 4 24" stroke="#C9A84C" strokeWidth="1" opacity="0.6" />
      <path d="M 4 4 L 24 4" stroke="#C9A84C" strokeWidth="1" opacity="0.6" />
      <circle cx="4" cy="4" r="2" fill="#C9A84C" opacity="0.8" />
    </svg>
  );
};

/* ─── Individual Collection Panel ─── */
const CollectionPanel = ({
  name,
  tagline,
  description,
  image,
  align,
  index,
}: {
  name: string;
  tagline: string;
  description: string;
  image: string;
  align: "left" | "right";
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        flex: 1,
        minHeight: "600px",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transition: "transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), filter 0.8s ease",
          transform: hovered ? "scale(1.08)" : "scale(1.0)",
          filter: hovered
            ? "brightness(0.55) contrast(1.1) saturate(1.1)"
            : "brightness(0.35) contrast(1.15) saturate(0.9)",
        }}
      >
        <img
          src={image}
          alt={`${name} Collection`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
          }}
        />
      </div>

      {/* Dark gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: align === "left"
            ? "linear-gradient(135deg, rgba(10,8,0,0.7) 0%, rgba(10,8,0,0.3) 40%, rgba(10,8,0,0.6) 100%)"
            : "linear-gradient(225deg, rgba(10,8,0,0.7) 0%, rgba(10,8,0,0.3) 40%, rgba(10,8,0,0.6) 100%)",
          transition: "opacity 0.8s ease",
          opacity: hovered ? 0.6 : 1,
          pointerEvents: "none",
        }}
      />

      {/* Bottom gradient for text readability */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60%",
          background: "linear-gradient(to top, rgba(10,8,0,0.95) 0%, rgba(10,8,0,0.4) 50%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Corner Accents */}
      <CornerAccent position="tl" />
      <CornerAccent position="tr" />
      <CornerAccent position="bl" />
      <CornerAccent position="br" />

      {/* Gold border on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: hovered ? "1px solid rgba(201,168,76,0.4)" : "1px solid rgba(201,168,76,0.1)",
          transition: "border-color 0.6s ease",
          pointerEvents: "none",
          zIndex: 15,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "clamp(32px, 5vw, 60px)",
          zIndex: 10,
          textAlign: align,
        }}
      >
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.6rem",
            fontWeight: 500,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "rgba(201,168,76,0.85)",
            margin: "0 0 16px 0",
          }}
        >
          {tagline}
        </motion.p>

        {/* Collection Name */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 + index * 0.2 }}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(3rem, 5vw, 5.5rem)",
            fontWeight: 400,
            color: "#FAF5E9",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: "0 0 8px 0",
            lineHeight: 1,
            textShadow: "0 4px 30px rgba(0,0,0,0.8)",
          }}
        >
          {name}
        </motion.h2>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
          style={{
            width: 60,
            height: 1,
            background: "linear-gradient(90deg, #C9A84C, rgba(201,168,76,0.2))",
            marginBottom: 20,
            transformOrigin: align === "left" ? "left" : "right",
            ...(align === "right" ? { marginLeft: "auto" } : {}),
          }}
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 + index * 0.2 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(0.95rem, 1.2vw, 1.15rem)",
            fontWeight: 400,
            color: "rgba(245,230,192,0.7)",
            lineHeight: 1.7,
            letterSpacing: "0.03em",
            margin: "0 0 32px 0",
            maxWidth: "380px",
            ...(align === "right" ? { marginLeft: "auto", marginRight: 0 } : {}),
          }}
        >
          {description}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.9 + index * 0.2 }}
          style={{
            ...(align === "right" ? { display: "flex", justifyContent: "flex-end" } : {}),
          }}
        >
          <Link
            href={`/${name.toLowerCase()}`}
            className="cat6-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.55rem",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#C9A84C",
              border: "1px solid rgba(201,168,76,0.45)",
              padding: "14px 32px",
              background: "transparent",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              textDecoration: "none",
              transition: "color 0.5s, border-color 0.5s",
            }}
          >
            <span style={{ position: "relative", zIndex: 1 }}>Explore Collection</span>
            <svg width="18" height="10" viewBox="0 0 20 10" fill="none" style={{ position: "relative", zIndex: 1 }}>
              <line x1="0" y1="5" x2="15" y2="5" stroke="currentColor" strokeWidth="0.9" />
              <polyline points="11,1 15,5 11,9" stroke="currentColor" strokeWidth="0.9" fill="none" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ─── Main Section ─── */
export default function SaroHansShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 900);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const centerY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#0A0800",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes cat6-shimmer {
          0% { background-position: -300% center; }
          100% { background-position: 300% center; }
        }
        @keyframes cat6-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .cat6-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #C9A84C;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cat6-cta:hover {
          color: #0A0800 !important;
          border-color: #C9A84C !important;
        }
        .cat6-cta:hover::before {
          transform: scaleX(1);
        }
        @media (max-width: 899px) {
          .cat6-split { flex-direction: column !important; }
          .cat6-divider-vertical { display: none !important; }
          .cat6-divider-horizontal { display: flex !important; }
        }
        @media (min-width: 900px) {
          .cat6-divider-horizontal { display: none !important; }
        }
      `}</style>

      {/* ═══════ Section Header ═══════ */}
      <div style={{ padding: "100px 0 0 0", textAlign: "center", position: "relative", zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.5rem",
              fontWeight: 500,
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "rgba(201,168,76,0.7)",
              margin: "0 0 20px 0",
            }}
          >
            Two Legacies &nbsp;·&nbsp; One Heritage
          </p>

          {/* Heading with SARO + HANS reveal */}
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 400,
              color: "#FAF5E9",
              letterSpacing: "0.04em",
              margin: "0 0 12px 0",
              lineHeight: 1.15,
            }}
          >
            Discover{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #8B6914 0%, #F5E6B8 28%, #E2C46A 52%, #F5E6B8 76%, #8B6914 100%)",
                backgroundSize: "300% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "cat6-shimmer 12s linear infinite",
                fontStyle: "italic",
              }}
            >
              Saro
            </span>
            <span style={{ color: "rgba(201,168,76,0.4)", fontWeight: 300, margin: "0 4px" }}>&</span>
            <span
              style={{
                background: "linear-gradient(90deg, #8B6914 0%, #F5E6B8 28%, #E2C46A 52%, #F5E6B8 76%, #8B6914 100%)",
                backgroundSize: "300% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "cat6-shimmer 12s linear infinite",
                fontStyle: "italic",
              }}
            >
              Hans
            </span>
          </h2>

          {/* Brand reveal subtext */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)",
              fontWeight: 400,
              color: "rgba(245,230,192,0.55)",
              letterSpacing: "0.06em",
              margin: "0 0 60px 0",
              lineHeight: 1.6,
            }}
          >
            Together, they are{" "}
            <span
              style={{
                color: "#C9A84C",
                fontWeight: 600,
                letterSpacing: "0.12em",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.85em",
              }}
            >
              SAROHANS
            </span>
          </p>
        </motion.div>
      </div>

      {/* ═══════ Split-Screen Panels ═══════ */}
      <div
        className="cat6-split"
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          position: "relative",
        }}
      >
        {/* SARO — Women's Collection */}
        <CollectionPanel
          name="Saro"
          tagline="Women's Collection"
          description="Grace woven into every thread — from timeless sarees to regal lehengas, each piece celebrates the strength and beauty of the modern Indian woman."
          image="https://i.pinimg.com/736x/a6/ac/a0/a6aca042d20fe5dc626efc44ec13fe4b.jpg"
          align="left"
          index={0}
        />

        {/* ── Center Gold Divider (Desktop) ── */}
        <motion.div
          className="cat6-divider-vertical"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "1px",
            zIndex: 30,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Glowing line */}
          <div
            style={{
              flex: 1,
              width: "1px",
              background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.5) 20%, rgba(201,168,76,0.5) 80%, transparent)",
            }}
          />

          {/* Center diamond emblem */}
          <motion.div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              y: centerY,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                background: "rgba(10,8,0,0.9)",
                border: "1px solid rgba(201,168,76,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: "rotate(45deg)",
                boxShadow: "0 0 30px rgba(201,168,76,0.15)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: "rotate(-45deg)" }}>
                <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z" fill="#C9A84C" opacity="0.9" />
              </svg>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Horizontal Divider (Mobile) ── */}
        <div
          className="cat6-divider-horizontal"
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            padding: "32px 0",
            background: "#0A0800",
          }}
        >
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4))" }} />
          <div
            style={{
              width: 32,
              height: 32,
              border: "1px solid rgba(201,168,76,0.4)",
              transform: "rotate(45deg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#0A0800",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ transform: "rotate(-45deg)" }}>
              <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z" fill="#C9A84C" opacity="0.8" />
            </svg>
          </div>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(201,168,76,0.4), transparent)" }} />
        </div>

        {/* HANS — Men's Collection */}
        <CollectionPanel
          name="Hans"
          tagline="Men's Collection"
          description="Commanding presence, refined tradition — from distinguished sherwanis to bold indo-western fusion, crafted for the modern king."
          image="https://i.pinimg.com/736x/d9/39/8a/d9398a72cc4643a479017465c6130fed.jpg"
          align="right"
          index={1}
        />
      </div>

      {/* ═══════ Bottom Heritage Tag ═══════ */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        style={{
          textAlign: "center",
          padding: "60px 24px 80px",
          background: "#0A0800",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 16 }}>
          <div style={{ height: "1px", width: 80, background: "linear-gradient(to right, transparent, rgba(201,168,76,0.4))" }} />
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path d="M4.5 0L5.6 3.4L9 4.5L5.6 5.6L4.5 9L3.4 5.6L0 4.5L3.4 3.4Z" fill="#C9A84C" opacity="0.6" />
          </svg>
          <div style={{ height: "1px", width: 80, background: "linear-gradient(to left, transparent, rgba(201,168,76,0.4))" }} />
        </div>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.5rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(201,168,76,0.45)",
            margin: 0,
          }}
        >
          Saro for Her &nbsp;·&nbsp; Hans for Him &nbsp;·&nbsp; Sarohans for Legacy
        </p>
      </motion.div>
    </section>
  );
}