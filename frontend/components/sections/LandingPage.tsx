"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Heritage Stats Strip ──────────────────────────────────────────────────────
export function HeritageStrip() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const stats = [
    { target: 1842, suffix: "", label: "Year Founded" },
    { target: 180, suffix: "+", label: "Artisan Families" },
    { target: 6, suffix: "", label: "Craft Traditions" },
    { target: 28, suffix: "K+", label: "Royal Clients" },
  ];

  return (
    <div style={{
      position: "relative",
      padding: "clamp(64px, 8vw, 110px) clamp(20px, 5vw, 80px)",
      background: "linear-gradient(135deg, #0E0B02 0%, #0A0800 50%, #0E0B02 100%)",
      borderTop: "1px solid rgba(201,168,76,0.12)",
      borderBottom: "1px solid rgba(201,168,76,0.12)",
      textAlign: "center",
      overflow: "hidden",
    }}>
      {/* Animated gold glow behind */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)",
      }} />

      {/* Floating particles specific to stats for a better look */}
      <div className="dust-container" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", opacity: 0.6 }}>
        {mounted && Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="dust-mote"
            style={{
              position: "absolute",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              background: "rgba(201,168,76,0.3)",
              boxShadow: "0 0 8px rgba(201,168,76,0.5)",
              animation: `float-mote ${Math.random() * 8 + 8}s linear infinite`,
              animationDelay: `-${Math.random() * 15}s`,
            }}
          />
        ))}
      </div>

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: 48, position: "relative", zIndex: 1 }}
      >
        <div style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.45rem",
          fontWeight: 600,
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          color: "rgba(201,168,76,0.5)",
          marginBottom: 10,
        }}>
          A Legacy in Numbers
        </div>
        <div style={{
          width: 40,
          height: 1,
          background: "linear-gradient(90deg, transparent, #C9A84C, transparent)",
          margin: "0 auto",
        }} />
      </motion.div>

      <div style={{
        position: "relative", zIndex: 1,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "clamp(28px, 4vw, 56px)", maxWidth: 1000, margin: "0 auto",
      }}>
        {stats.map(({ target, suffix, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
          >
            <span style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.6rem, 5vw, 4rem)",
              fontWeight: 400, fontStyle: "italic",
              color: "#C9A84C", lineHeight: 1, letterSpacing: "0.02em",
            }}>
              <AnimatedCounter target={target} suffix={suffix} duration={2200 + i * 200} />
            </span>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.52rem", fontWeight: 600, letterSpacing: "0.38em",
              textTransform: "uppercase", color: "rgba(232,213,163,0.35)",
            }}>{label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


// ─── Main Landing Page ────────────────────────────────────────────────────────
export default function LandingPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ background: "#0A0800", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Montserrat:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,400;1,400&display=swap');

        @keyframes lp-fadeUp {
          from { opacity: 0; transform: translateY(26px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lp-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes lp-shimmer {
          0%   { background-position: -400% center; }
          100% { background-position: 400% center; }
        }
        @keyframes lp-float {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(-7px); }
        }
        @keyframes lp-img-reveal {
          from { clip-path: inset(0 100% 0 0); opacity: 0; }
          to   { clip-path: inset(0 0% 0 0);   opacity: 1; }
        }
        @keyframes lp-glow-pulse {
          0%, 100% { box-shadow: 0 8px 60px rgba(0,0,0,0.55), 0 0 40px rgba(201,168,76,0.07), inset 0 1px 0 rgba(201,168,76,0.18), inset 0 -1px 0 rgba(201,168,76,0.05); }
          50%       { box-shadow: 0 8px 60px rgba(0,0,0,0.55), 0 0 70px rgba(201,168,76,0.14), inset 0 1px 0 rgba(201,168,76,0.22), inset 0 -1px 0 rgba(201,168,76,0.08); }
        }

        /* ── Glass panel ── */
        .lp-glass {
          position: relative;
          background: rgba(8, 6, 1, 0.58);
          backdrop-filter: blur(32px) saturate(1.4) brightness(1.1);
          -webkit-backdrop-filter: blur(32px) saturate(1.4) brightness(1.1);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 1px;
          padding: clamp(44px, 5.5vw, 72px) clamp(36px, 5vw, 72px);
          width: 100%;
          max-width: 560px;
          animation: lp-fadeIn 0.8s 0.1s both, lp-glow-pulse 7s 2s ease-in-out infinite;
        }
        /* Corner bracket ornaments */
        .lp-glass::before {
          content: '';
          position: absolute; top: -1px; left: -1px;
          width: 22px; height: 22px;
          border-top: 1px solid rgba(201,168,76,0.65);
          border-left: 1px solid rgba(201,168,76,0.65);
          pointer-events: none;
        }
        .lp-glass::after {
          content: '';
          position: absolute; bottom: -1px; right: -1px;
          width: 22px; height: 22px;
          border-bottom: 1px solid rgba(201,168,76,0.65);
          border-right: 1px solid rgba(201,168,76,0.65);
          pointer-events: none;
        }
        .lp-glass-corner-tr {
          position: absolute; top: -1px; right: -1px;
          width: 22px; height: 22px;
          border-top: 1px solid rgba(201,168,76,0.65);
          border-right: 1px solid rgba(201,168,76,0.65);
          pointer-events: none;
        }
        .lp-glass-corner-bl {
          position: absolute; bottom: -1px; left: -1px;
          width: 22px; height: 22px;
          border-bottom: 1px solid rgba(201,168,76,0.65);
          border-left: 1px solid rgba(201,168,76,0.65);
          pointer-events: none;
        }

        /* ── Typography ── */
        .lp-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.56rem;
          font-weight: 600;
          letter-spacing: 0.52em;
          text-transform: uppercase;
          color: rgba(201,168,76,0.72);
          opacity: 0;
          animation: lp-fadeUp 0.9s 0.25s forwards;
        }
        .lp-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 400;
          font-size: clamp(2.8rem, 4.5vw, 5.2rem);
          line-height: 1.06;
          color: #FAF5E9;
          letter-spacing: 0.01em;
          opacity: 0;
          animation: lp-fadeUp 1.2s 0.42s forwards;
          text-shadow: 0 2px 30px rgba(0,0,0,0.7);
        }
        .lp-title em {
          font-style: italic;
          background: linear-gradient(90deg, #7A5A0A 0%, #F5E6B8 28%, #E2C46A 52%, #F5E6B8 76%, #7A5A0A 100%);
          background-size: 300% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: lp-shimmer 14s linear infinite;
        }
        .lp-sub {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: clamp(0.92rem, 1.3vw, 1.12rem);
          color: rgba(240,228,200,0.58);
          letter-spacing: 0.03em;
          line-height: 1.9;
          opacity: 0;
          animation: lp-fadeUp 1s 0.68s forwards;
        }

        /* ── CTA Button ── */
        .lp-cta {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #C9A84C;
          border: 1px solid rgba(201,168,76,0.48);
          padding: 14px 38px;
          background: transparent;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          transition: color 0.5s;
          opacity: 0;
          animation: lp-fadeUp 0.9s 1.05s forwards;
        }
        .lp-cta::before {
          content: '';
          position: absolute; inset: 0;
          background: #C9A84C;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .lp-cta:hover { color: #0A0800; }
        .lp-cta:hover::before { transform: scaleX(1); }
        .lp-cta span { position: relative; z-index: 1; }
        .lp-cta svg  { position: relative; z-index: 1; }

        /* ── Model image ── */
        .lp-model-wrap {
          position: relative;
          flex: 1;
          min-height: 100vh;
          max-width: 55%;
          overflow: hidden;
        }
        .lp-model-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          animation: lp-img-reveal 1.4s 0.05s cubic-bezier(0.77,0,0.175,1) both;
          filter: brightness(0.92) contrast(1.05) saturate(1.1);
        }
        /* Left edge fade — blends image into panel */
        .lp-model-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(10,8,0,0.92) 0%,
            rgba(10,8,0,0.45) 18%,
            rgba(10,8,0,0.0) 38%,
            rgba(10,8,0,0.0) 75%,
            rgba(10,8,0,0.55) 100%
          );
          pointer-events: none;
        }
        /* Bottom fade */
        .lp-model-fade-b {
          position: absolute;
          bottom: 0; left: 0; right: 0; height: 28%;
          background: linear-gradient(to top, rgba(10,8,0,0.85) 0%, transparent 100%);
          pointer-events: none;
        }
        /* Top fade */
        .lp-model-fade-t {
          position: absolute;
          top: 0; left: 0; right: 0; height: 18%;
          background: linear-gradient(to bottom, rgba(10,8,0,0.7) 0%, transparent 100%);
          pointer-events: none;
        }

        /* ── Scroll indicator ── */
        .lp-scroll {
          position: absolute;
          bottom: 36px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.44rem; letter-spacing: 0.44em; text-transform: uppercase;
          color: rgba(201,168,76,0.34);
          opacity: 0;
          animation: lp-fadeIn 1s 1.6s forwards, lp-float 3.5s 2.6s ease-in-out infinite;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .lp-hero-layout {
            flex-direction: column !important;
            min-height: auto !important;
          }
          .lp-model-wrap {
            max-width: 100% !important;
            width: 100% !important;
            min-height: 60vw !important;
            max-height: 70vh;
          }
          .lp-left-col {
            padding: 52px 24px 64px !important;
            align-items: center !important;
          }
          .lp-glass {
            max-width: 100% !important;
          }
          .lp-model-fade {
            background: linear-gradient(
              to bottom,
              rgba(10,8,0,0.0) 0%,
              rgba(10,8,0,0.0) 60%,
              rgba(10,8,0,0.9) 100%
            ) !important;
          }
        }
      `}</style>

      {/* ══════════════════════════════════════════════
          HERO — split layout: glass panel LEFT, model RIGHT
      ══════════════════════════════════════════════ */}
      <section style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "#0A0800",
      }}>

        {/* Global very subtle arch pattern at low opacity — fills dark areas */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `url('/images/sarohans-arch-bg.png')`,
          backgroundSize: "480px",
          backgroundRepeat: "repeat",
          opacity: 0.045,
          zIndex: 0,
        }} />

        {/* Dynamic Glowing Luxury Orbs */}
        <div className="luxury-orb-1" />
        <div className="luxury-orb-2" />

        {/* ── Layout row ── */}
        <div className="lp-hero-layout" style={{
          display: "flex",
          alignItems: "stretch",
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
        }}>

          {/* ════════════ LEFT — Glassmorphism panel ════════════ */}
          <div className="lp-left-col" style={{
            flex: "0 0 45%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(80px, 8vw, 120px) clamp(32px, 5vw, 72px) clamp(80px, 8vw, 120px) clamp(24px, 5vw, 64px)",
            position: "relative",
            zIndex: 2,
          }}>

            {/* Glass card */}
            <div className="lp-glass">
              <div className="lp-glass-corner-tr" />
              <div className="lp-glass-corner-bl" />

              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>

                {/* Diamond ornament */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 12, marginBottom: 24,
                  opacity: loaded ? 1 : 0, transition: "opacity 1.2s 0.1s",
                }}>
                  <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5))" }} />
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M4.5 0L5.6 3.4L9 4.5L5.6 5.6L4.5 9L3.4 5.6L0 4.5L3.4 3.4Z" fill="#C9A84C" opacity="0.85"/>
                  </svg>
                  <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(201,168,76,0.5), transparent)" }} />
                </div>

                <div className="lp-eyebrow" style={{ marginBottom: 18 }}>
                  Est. Since Generations &nbsp;·&nbsp; Handcrafted in India
                </div>

                <h1 className="lp-title" style={{ marginBottom: 22 }}>
                  Where Heritage<br />Becomes <em>Royalty</em>
                </h1>

                {/* Gold rule */}
                <div style={{
                  width: 52, height: 1,
                  background: "linear-gradient(90deg, #C9A84C, transparent)",
                  marginBottom: 24,
                  opacity: 0, animation: "lp-fadeIn 1s 0.75s forwards",
                }} />

                <p className="lp-sub" style={{ marginBottom: 44 }}>
                  Sarohans brings you the finest handcrafted ethnic wear — each thread
                  woven with centuries of artisan mastery, each drape a story of
                  timeless Indian grandeur.
                </p>

                <Link href="#collections" className="lp-cta">
                  <span>Discover Collections</span>
                  <svg width="18" height="10" viewBox="0 0 20 10" fill="none">
                    <line x1="0" y1="5" x2="15" y2="5" stroke="currentColor" strokeWidth="0.9"/>
                    <polyline points="11,1 15,5 11,9" stroke="currentColor" strokeWidth="0.9" fill="none"/>
                  </svg>
                </Link>

              </div>
            </div>
          </div>

          {/* ════════════ RIGHT — Model photo ════════════ */}
          <div className="lp-model-wrap">
            <img
              src="/images/sarohans-bg.jpg"
              alt="Sarohans — Heritage Fashion"
              className="lp-model-img"
            />
            <div className="lp-model-fade" />
            <div className="lp-model-fade-b" />
            <div className="lp-model-fade-t" />

            {/* Floating collection badge */}
            <div style={{
              position: "absolute", bottom: "clamp(40px, 6vw, 72px)", right: "clamp(24px, 4vw, 52px)",
              background: "rgba(10,8,0,0.62)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(201,168,76,0.28)",
              padding: "16px 24px",
              textAlign: "right",
              opacity: 0,
              animation: "lp-fadeUp 0.9s 1.3s forwards",
            }}>
              <div style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.48rem", fontWeight: 600,
                letterSpacing: "0.4em", textTransform: "uppercase",
                color: "rgba(201,168,76,0.65)", marginBottom: 5,
              }}>New Season</div>
              <div style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.1rem", fontWeight: 400, fontStyle: "italic",
                color: "#FAF5E9", letterSpacing: "0.03em",
              }}>Bridal Lehenga</div>
              <div style={{
                marginTop: 10, height: 1,
                background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.55))",
              }} />
            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="lp-scroll">
          <div style={{
            width: 1, height: 50,
            background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.6), transparent)",
          }} />
          Scroll
        </div>
      </section>
    </div>
  );
}